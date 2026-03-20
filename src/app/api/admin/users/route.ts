import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { getCurrentUser, hashPassword } from '@/lib/auth';

// GET - List all users
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Get all students with their progress and test counts
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        role,
        created_at
      `)
      .eq('role', 'student')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
    }

    // Get progress counts for each user
    const { data: progressData } = await supabase
      .from('learning_progress')
      .select('user_id, completed')
      .eq('completed', true);

    const { data: testResults } = await supabase
      .from('test_results')
      .select('user_id');

    // Count progress and tests for each user
    const progressCounts: Record<string, number> = {};
    const testCounts: Record<string, number> = {};

    progressData?.forEach(p => {
      if (p.user_id) {
        progressCounts[p.user_id] = (progressCounts[p.user_id] || 0) + 1;
      }
    });

    testResults?.forEach(t => {
      if (t.user_id) {
        testCounts[t.user_id] = (testCounts[t.user_id] || 0) + 1;
      }
    });

    // Format response
    const formattedUsers = users?.map(u => ({
      id: u.id,
      username: u.email, // Use email as username
      name: u.name,
      status: 'active',
      createdAt: u.created_at,
      _count: {
        progress: progressCounts[u.id] || 0,
        testResults: testCounts[u.id] || 0,
      },
    })) || [];

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, password, name } = await req.json();

    if (!username || !password || !name) {
      return NextResponse.json({ error: 'Semua field diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Check if email exists (using email field as username)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', username)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 });
    }

    // Create user (using email field as username)
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: username, // Use email field for username
        password: hashPassword(password),
        name,
        role: 'student',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Gagal membuat user' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.email,
        name: newUser.name,
        status: 'active',
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
