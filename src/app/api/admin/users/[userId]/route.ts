import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

// PATCH - Update user status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const userId = resolvedParams.userId;
    const { status } = await req.json();

    if (!status || !['active', 'inactive'].includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
    }

    const supabase = createSupabaseServerClientSimple();

    const { error } = await supabase
      .from('users')
      .update({ status })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: 'Gagal mengupdate user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const userId = resolvedParams.userId;

    const supabase = createSupabaseServerClientSimple();

    // Delete user's progress first
    await supabase
      .from('learning_progress')
      .delete()
      .eq('user_id', userId);

    // Delete user's bookmarks
    await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId);

    // Delete user's test results
    await supabase
      .from('test_results')
      .delete()
      .eq('user_id', userId);

    // Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json({ error: 'Gagal menghapus user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
