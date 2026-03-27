import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Nama diperlukan' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email tidak valid' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with free tier
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        name: name.trim(),
        role: 'student',
        tier: 'free',
        tier_expires_at: null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Gagal membuat akun' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        tier: newUser.tier,
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
