import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase/server';
import { verifyPassword, setSessionCookie } from '@/lib/auth';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const clientId = getClientIdentifier(req);
    const rateLimit = checkRateLimit(`login:${clientId}`, RATE_LIMITS.LOGIN);

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
      return NextResponse.json({ error: 'Username diperlukan' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 1) {
      return NextResponse.json({ error: 'Password diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Find user by email (username field is used as email)
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, password')
      .eq('email', username.trim().toLowerCase())
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Check if user is admin (admin can't login here)
    if (user.role === 'admin') {
      return NextResponse.json({ error: 'Admin harus login di /admin/login' }, { status: 401 });
    }

    // Verify password using secure comparison
    if (!verifyPassword(password, user.password)) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Create secure session using the new signed cookie system
    await setSessionCookie({
      id: user.id,
      username: user.email,
      name: user.name,
      role: user.role as 'student' | 'admin',
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
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
