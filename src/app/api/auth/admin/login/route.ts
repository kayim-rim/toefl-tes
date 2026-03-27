import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { verifyPassword, setSessionCookie } from '@/lib/auth';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check (async - uses Supabase for persistence)
    const clientId = getClientIdentifier(req);
    const rateLimit = await checkRateLimit(`admin-login:${clientId}`, RATE_LIMITS.LOGIN);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Terlalu banyak percobaan login. Coba lagi dalam beberapa menit.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    const body = await req.json();
    const { username, password } = body;

    // Input validation
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json({ error: 'Email diperlukan' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 1) {
      return NextResponse.json({ error: 'Password diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Find user by email (username field is used as email)
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, password, tier, tier_expires_at')
      .eq('email', username.trim().toLowerCase())
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Akses ditolak. Halaman ini untuk admin saja.' }, { status: 403 });
    }

    // Verify password using bcrypt (async)
    const isValidPassword = await verifyPassword(password, user.password || '');
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    // Create secure session using the new signed cookie system
    // Admin gets full access (student tier equivalent)
    await setSessionCookie({
      id: user.id,
      username: user.email,
      name: user.name,
      role: 'admin',
      tier: 'student', // Admin has full access
      tierExpiresAt: null, // Never expires for admin
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
