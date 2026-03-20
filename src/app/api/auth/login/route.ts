import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase/server';
import { hashPassword } from '@/lib/auth';

const SESSION_COOKIE = 'toefl_session';

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

    // Check if user is admin (admin can't login here)
    if (user.role === 'admin') {
      return NextResponse.json({ error: 'Admin harus login di /admin/login' }, { status: 401 });
    }

    // Verify password
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Create session data
    const sessionUser = {
      id: user.id,
      username: user.email,
      name: user.name,
      role: user.role as 'student' | 'admin',
    };

    // Encode session
    const sessionData = Buffer.from(JSON.stringify(sessionUser)).toString('base64');

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set cookie manually in response
    response.cookies.set(SESSION_COOKIE, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
