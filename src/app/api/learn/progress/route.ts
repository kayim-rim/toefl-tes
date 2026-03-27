import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

// GET - Fetch user's learning progress
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseServerClientSimple();

    const { data: progress, error } = await supabase
      .from('learning_progress')
      .select('skill_id, answered, correct, completed')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching progress:', error);
      return NextResponse.json({ progress: {} });
    }

    // Convert to object format for easy lookup
    const progressMap: Record<string, { answered: number; correct: number; completed: boolean }> = {};
    progress?.forEach(p => {
      progressMap[p.skill_id] = {
        answered: p.answered || 0,
        correct: p.correct || 0,
        completed: p.completed || false,
      };
    });

    return NextResponse.json({ progress: progressMap });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json({ progress: {} });
  }
}

// POST - Save/update learning progress
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { skillId, answered, correct, completed } = await req.json();

    if (!skillId) {
      return NextResponse.json({ error: 'Skill ID diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Check if progress exists
    const { data: existing } = await supabase
      .from('learning_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('skill_id', skillId)
      .single();

    let error;
    if (existing) {
      // Update existing
      const result = await supabase
        .from('learning_progress')
        .update({
          answered: answered || 0,
          correct: correct || 0,
          completed: completed || false,
        })
        .eq('id', existing.id);
      error = result.error;
    } else {
      // Insert new
      const result = await supabase
        .from('learning_progress')
        .insert({
          user_id: user.id,
          skill_id: skillId,
          answered: answered || 0,
          correct: correct || 0,
          completed: completed || false,
        });
      error = result.error;
    }

    if (error) {
      console.error('Error saving progress:', error);
      return NextResponse.json({ error: 'Gagal menyimpan progress' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save progress error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
