import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { verifyPassword, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Find user by email (username field is used as email)
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', username)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Akses ditolak. Halaman ini untuk admin saja.' }, { status: 403 });
    }

    // Verify password
    if (!verifyPassword(password, user.password || '')) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Set session
    await setSessionCookie({
      id: user.id,
      username: user.email,
      name: user.name,
      role: 'admin',
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
