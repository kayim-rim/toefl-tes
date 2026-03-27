import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createSnapTransaction, generateOrderId, TIER_PRICING } from '@/lib/midtrans';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Silakan login terlebih dahulu.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { tier } = body;

    // Validate tier
    if (tier !== 'tes' && tier !== 'student') {
      return NextResponse.json(
        { error: 'Tier tidak valid. Pilih "tes" atau "student".' },
        { status: 400 }
      );
    }

    // Check if user already has this tier or higher
    const supabase = await createSupabaseServerClient();
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('tier, tier_expires_at')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { error: 'Gagal mengambil data user.' },
        { status: 500 }
      );
    }

    // Check if user already has the requested tier or higher
    if (userData?.tier === tier || userData?.tier === 'student') {
      return NextResponse.json(
        { error: 'Anda sudah memiliki paket ini atau paket yang lebih tinggi.' },
        { status: 400 }
      );
    }

    // Get pricing
    const pricing = TIER_PRICING[tier];

    // Generate order ID
    const orderId = generateOrderId(user.id, tier);

    // Create Midtrans transaction
    const snapResponse = await createSnapTransaction({
      orderId,
      amount: pricing.price,
      customerEmail: user.username, // username is email
      customerName: user.name,
      tier,
    });

    // Store transaction in database for tracking
    const { error: insertError } = await supabase
      .from('payments')
      .insert({
        id: orderId,
        user_id: user.id,
        package_id: tier, // Using tier as package_id
        amount: pricing.price,
        status: 'pending',
        payment_gateway: 'midtrans',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error storing payment:', insertError);
      // Continue anyway, we can track via Midtrans
    }

    return NextResponse.json({
      success: true,
      token: snapResponse.token,
      redirect_url: snapResponse.redirect_url,
      order_id: orderId,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat transaksi. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
