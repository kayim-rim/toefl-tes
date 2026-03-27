import { NextResponse } from 'next/server';
import { verifyNotificationSignature, parseOrderId, type MidtransNotification } from '@/lib/midtrans';
import { createSupabaseServerClientSimple } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const notification: MidtransNotification = await request.json();

    console.log('Received Midtrans notification:', {
      order_id: notification.order_id,
      status_code: notification.status_code,
      transaction_status: notification.transaction_status,
      payment_type: notification.payment_type,
    });

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error('MIDTRANS_SERVER_KEY not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const isValidSignature = verifyNotificationSignature(notification, serverKey);
    if (!isValidSignature) {
      console.error('Invalid signature for order:', notification.order_id);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse order ID to get user ID and tier
    const orderInfo = parseOrderId(notification.order_id);
    if (!orderInfo) {
      console.error('Invalid order ID format:', notification.order_id);
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const { userId, tier } = orderInfo;

    // Check transaction status
    const isSuccess =
      notification.transaction_status === 'settlement' ||
      notification.transaction_status === 'capture';

    const isPending = notification.transaction_status === 'pending';

    const isFailed =
      notification.transaction_status === 'deny' ||
      notification.transaction_status === 'cancel' ||
      notification.transaction_status === 'expire' ||
      notification.transaction_status === 'failure';

    // Update payment status in database
    const supabase = createSupabaseServerClientSimple();

    if (isSuccess) {
      // Calculate expiration date (1 year from now)
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      // Update user tier
      const { error: updateError } = await supabase
        .from('users')
        .update({
          tier: tier,
          tier_expires_at: expiresAt.toISOString(),
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating user tier:', updateError);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
      }

      // Update payment status
      await supabase
        .from('payments')
        .update({
          status: 'success',
          payment_method: notification.payment_type,
          gateway_transaction_id: notification.transaction_id,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', notification.order_id);

      console.log(`Successfully upgraded user ${userId} to ${tier}`);

    } else if (isPending) {
      // Update payment status to pending
      await supabase
        .from('payments')
        .update({
          status: 'pending',
          payment_method: notification.payment_type,
          updated_at: new Date().toISOString(),
        })
        .eq('id', notification.order_id);

    } else if (isFailed) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({
          status: 'failed',
          payment_method: notification.payment_type,
          updated_at: new Date().toISOString(),
        })
        .eq('id', notification.order_id);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
