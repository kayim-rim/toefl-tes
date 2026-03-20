import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { hashPassword, verifyPassword, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user || user.status !== 'active') {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Check if user is admin (admin can't login here)
    if (user.role === 'admin') {
      return NextResponse.json({ error: 'Admin harus login di /admin/login' }, { status: 401 });
    }

    // Verify password
    if (!verifyPassword(password, user.password || '')) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Set session
    await setSessionCookie({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role as 'student' | 'admin',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
