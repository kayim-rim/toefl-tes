// Midtrans Payment Gateway Integration
// Using Snap API for payment processing
import { createHash } from 'crypto';

interface MidtransTransactionRequest {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details?: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  item_details?: {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }[];
  callbacks?: {
    finish?: string;
  };
}

interface MidtransSnapResponse {
  token: string;
  redirect_url: string;
}

interface MidtransNotification {
  order_id: string;
  status_code: string;
  gross_amount: string;
  transaction_status: 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'failure';
  fraud_status?: 'accept' | 'challenge' | 'deny';
  payment_type: string;
  transaction_time: string;
  transaction_id: string;
  signature_key: string;
}

// Tier pricing configuration
export const TIER_PRICING = {
  tes: {
    price: 10000,
    name: 'Paket Tes',
    description: 'Akses penuh semua paket soal selama 1 tahun',
  },
  student: {
    price: 25000,
    name: 'Paket Student',
    description: 'Akses penuh + Learning Class selama 1 tahun',
  },
} as const;

/**
 * Generate signature key for Midtrans notification verification
 */
export function generateSignatureKey(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string
): string {
  const input = orderId + statusCode + grossAmount + serverKey;
  return createHash('sha512').update(input).digest('hex');
}

/**
 * Verify Midtrans notification signature
 */
export function verifyNotificationSignature(
  notification: MidtransNotification,
  serverKey: string
): boolean {
  const expectedSignature = generateSignatureKey(
    notification.order_id,
    notification.status_code,
    notification.gross_amount,
    serverKey
  );
  return expectedSignature === notification.signature_key;
}

/**
 * Create Snap transaction and get payment token
 */
export async function createSnapTransaction(params: {
  orderId: string;
  amount: number;
  customerEmail?: string;
  customerName?: string;
  tier: 'tes' | 'student';
}): Promise<MidtransSnapResponse> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

  if (!serverKey) {
    throw new Error('MIDTRANS_SERVER_KEY is not configured');
  }

  const baseUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

  const tierInfo = TIER_PRICING[params.tier];

  const transactionData: MidtransTransactionRequest = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.amount,
    },
    customer_details: {
      email: params.customerEmail,
      first_name: params.customerName?.split(' ')[0] || 'User',
      last_name: params.customerName?.split(' ').slice(1).join(' ') || '',
    },
    item_details: [
      {
        id: params.tier,
        price: params.amount,
        quantity: 1,
        name: tierInfo.name,
      },
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://toefl-tes.vercel.app'}/pricing?payment=finish`,
    },
  };

  // Create Basic Auth header
  const authString = Buffer.from(serverKey + ':').toString('base64');

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Midtrans API Error:', errorText);
    throw new Error(`Midtrans API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get transaction status from Midtrans
 */
export async function getTransactionStatus(orderId: string): Promise<MidtransNotification> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

  if (!serverKey) {
    throw new Error('MIDTRANS_SERVER_KEY is not configured');
  }

  const baseUrl = isProduction
    ? `https://api.midtrans.com/v2/${orderId}/status`
    : `https://api.sandbox.midtrans.com/v2/${orderId}/status`;

  const authString = Buffer.from(serverKey + ':').toString('base64');

  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get transaction status: ${response.status}`);
  }

  return response.json();
}

/**
 * Parse order ID to extract user ID and tier
 * Format: TOEFL-{userId}-{tier}-{timestamp}
 */
export function parseOrderId(orderId: string): { userId: string; tier: 'tes' | 'student' } | null {
  const parts = orderId.split('-');
  if (parts.length < 4 || parts[0] !== 'TOEFL') {
    return null;
  }

  const tier = parts[2] as 'tes' | 'student';
  if (tier !== 'tes' && tier !== 'student') {
    return null;
  }

  // userId might contain dashes, so we need to reconstruct it
  const userId = parts[1];

  return { userId, tier };
}

/**
 * Generate order ID
 */
export function generateOrderId(userId: string, tier: 'tes' | 'student'): string {
  const timestamp = Date.now();
  return `TOEFL-${userId}-${tier}-${timestamp}`;
}

export type { MidtransNotification, MidtransSnapResponse };
