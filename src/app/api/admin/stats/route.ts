import { NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Get total users (students only)
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    // Get total tests
    const { count: totalTests } = await supabase
      .from('test_results')
      .select('*', { count: 'exact', head: true });

    // Get completed progress
    const { count: totalProgress } = await supabase
      .from('learning_progress')
      .select('*', { count: 'exact', head: true })
      .eq('completed', true);

    // Get average score
    const { data: testResults } = await supabase
      .from('test_results')
      .select('total_score');

    const avgScore = testResults && testResults.length > 0 
      ? Math.round(testResults.reduce((sum, t) => sum + (t.total_score || 0), 0) / testResults.length)
      : 0;

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalTests: totalTests || 0,
      totalProgress: totalProgress || 0,
      avgScore,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
