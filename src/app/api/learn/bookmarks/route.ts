import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

// GET - Fetch user's bookmarks
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseServerClientSimple();

    const { data: bookmarks, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return NextResponse.json({ bookmarks: [] });
    }

    return NextResponse.json({ bookmarks: bookmarks || [] });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    return NextResponse.json({ bookmarks: [] });
  }
}

// POST - Add bookmark
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionType, questionId } = await req.json();

    if (!questionType || !questionId) {
      return NextResponse.json({ error: 'Question type dan ID diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    // Check if bookmark exists
    const { data: existing } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', user.id)
      .eq('question_type', questionType)
      .eq('question_id', questionId)
      .single();

    if (existing) {
      return NextResponse.json({ success: true, message: 'Bookmark sudah ada' });
    }

    // Insert new bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: user.id,
        question_type: questionType,
        question_id: questionId,
      });

    if (error) {
      console.error('Error adding bookmark:', error);
      return NextResponse.json({ error: 'Gagal menambah bookmark' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Add bookmark error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

// DELETE - Remove bookmark
export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const questionType = searchParams.get('questionType');
    const questionId = searchParams.get('questionId');

    if (!questionType || !questionId) {
      return NextResponse.json({ error: 'Question type dan ID diperlukan' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('question_type', questionType)
      .eq('question_id', parseInt(questionId));

    if (error) {
      console.error('Error removing bookmark:', error);
      return NextResponse.json({ error: 'Gagal menghapus bookmark' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
