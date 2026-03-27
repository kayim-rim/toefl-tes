import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    
    // Only admins are allowed to delete test results
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Only admins can delete results' },
        { status: 403 }
      );
    }

    const supabase = createSupabaseServerClientSimple();

    const { error } = await supabase
      .from('test_results')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Delete Test Result Error:', error);

    return NextResponse.json(
      { error: 'Failed to delete test result' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClientSimple();

    const { data: result, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !result) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Get Test Result Error:', error);

    return NextResponse.json(
      { error: 'Failed to get test result' },
      { status: 500 }
    );
  }
}
