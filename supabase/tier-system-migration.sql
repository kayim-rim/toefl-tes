-- =====================================================
-- TIER SYSTEM MIGRATION
-- TOEFL ITP Preparation - Fase 1
-- =====================================================

-- 1. Create ENUM for user tier
CREATE TYPE user_tier AS ENUM ('free', 'tes', 'student');

-- 2. Add tier columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier user_tier DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- 3. Create subscription_packages table
CREATE TABLE IF NOT EXISTS subscription_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  tier user_tier NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  duration_days INTEGER NOT NULL, -- NULL means lifetime
  description TEXT,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  package_id UUID REFERENCES subscription_packages(id) ON DELETE SET NULL,
  amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, paid, failed, expired, cancelled
  payment_method VARCHAR(50), -- manual, midtrans, xendit, voucher
  payment_gateway VARCHAR(20), -- midtrans, xendit, null for manual
  gateway_transaction_id VARCHAR(100),
  gateway_response JSONB,
  voucher_id UUID, -- will be referenced later
  notes TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create vouchers table (for manual activation)
CREATE TABLE IF NOT EXISTS vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,
  tier user_tier NOT NULL,
  duration_days INTEGER NOT NULL,
  price DECIMAL(12,2) DEFAULT 0, -- how much this voucher is worth
  max_uses INTEGER DEFAULT 1, -- how many times can be used
  used_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE, -- when this voucher code expires
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Add voucher reference to payments
ALTER TABLE payments ADD COLUMN IF NOT EXISTS voucher_id UUID REFERENCES vouchers(id) ON DELETE SET NULL;

-- 7. Create subscriptions table (history of user subscriptions)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  tier user_tier NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, expired, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Insert default subscription packages
INSERT INTO subscription_packages (name, tier, price, duration_days, description, features, display_order) VALUES
('Paket Tes - 1 Tahun', 'tes', 10000, 365, 'Akses semua paket soal TOEFL ITP selama 1 tahun',
 '["Semua paket soal (A, B, C, D)", "Pembahasan lengkap", "Soal-soal baru rutin", "History & Analytics", "Sertifikat"]'::jsonb, 1),
('Paket Student - 1 Tahun', 'student', 25000, 365, 'Akses penuh semua fitur termasuk Learning Class',
 '["Semua fitur Paket Tes", "Learning Class lengkap", "Latihan per skill", "Progress tracking detail", "Priority support"]'::jsonb, 2);

-- 9. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_tier ON users(tier);
CREATE INDEX IF NOT EXISTS idx_users_tier_expires ON users(tier_expires_at) WHERE tier_expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_vouchers_code ON vouchers(code);
CREATE INDEX IF NOT EXISTS idx_vouchers_active ON vouchers(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- 10. Create function to check and update expired tiers
CREATE OR REPLACE FUNCTION check_tier_expiry()
RETURNS void AS $$
BEGIN
  UPDATE users
  SET tier = 'free', tier_expires_at = NULL
  WHERE tier != 'free'
    AND tier_expires_at IS NOT NULL
    AND tier_expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 11. Enable RLS (Row Level Security)
ALTER TABLE subscription_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 12. RLS Policies for subscription_packages (public read)
CREATE POLICY "Packages are viewable by everyone" ON subscription_packages
  FOR SELECT USING (is_active = true);

-- 13. RLS Policies for payments (user can see their own)
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid()::text = user_id::text OR user_id IS NULL);

-- 14. RLS Policies for vouchers (admin only for sensitive operations)
CREATE POLICY "Vouchers are viewable by everyone for validation" ON vouchers
  FOR SELECT USING (is_active = true);

-- 15. RLS Policies for subscriptions (user can see their own)
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- =====================================================
-- HELPER VIEWS
-- =====================================================

-- View for active subscriptions
CREATE OR REPLACE VIEW active_subscriptions AS
SELECT 
  s.id,
  s.user_id,
  u.username,
  u.name,
  u.email,
  s.tier,
  s.started_at,
  s.expires_at,
  s.status,
  CASE 
    WHEN s.expires_at IS NULL THEN true
    WHEN s.expires_at > NOW() THEN true
    ELSE false
  END as is_active
FROM subscriptions s
JOIN users u ON s.user_id = u.id
WHERE s.status = 'active';

-- View for user tier summary
CREATE OR REPLACE VIEW user_tier_summary AS
SELECT 
  u.id,
  u.username,
  u.name,
  u.email,
  u.tier,
  u.tier_expires_at,
  CASE 
    WHEN u.tier = 'free' THEN 'Seumur hidup'
    WHEN u.tier_expires_at IS NULL THEN 'Tanpa batas'
    ELSE to_char(u.tier_expires_at, 'DD Mon YYYY')
  END as expiry_text,
  CASE 
    WHEN u.tier = 'free' THEN true
    WHEN u.tier_expires_at IS NULL THEN true
    WHEN u.tier_expires_at > NOW() THEN true
    ELSE false
  END as is_active
FROM users u
WHERE u.role = 'user';

-- =====================================================
-- SAMPLE VOUCHERS (for testing)
-- =====================================================

-- Generate some sample vouchers (remove in production)
-- INSERT INTO vouchers (code, tier, duration_days, price, max_uses, notes) VALUES
-- ('TESTVOUCHER1', 'tes', 365, 10000, 10, 'Sample voucher for testing'),
-- ('STUDENTVOUCHER1', 'student', 365, 25000, 5, 'Sample student voucher');

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE subscription_packages IS 'Daftar paket berlangganan yang tersedia';
COMMENT ON TABLE payments IS 'Record pembayaran dari user';
COMMENT ON TABLE vouchers IS 'Kode voucher untuk aktivasi manual';
COMMENT ON TABLE subscriptions IS 'History subscription user';
COMMENT ON COLUMN users.tier IS 'Tier user: free, tes, student';
COMMENT ON COLUMN users.tier_expires_at IS 'Tanggal expired tier, NULL = seumur hidup untuk free atau tidak ada batasan';
