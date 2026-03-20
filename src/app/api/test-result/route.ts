import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientSimple } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClientSimple();
    const body = await req.json();
    
    const {
      name,
      institution,
      packageId,
      listeningScore,
      structureScore,
      readingScore,
      totalScore,
      listeningRaw,
      structureRaw,
      readingRaw,
      answers
    } = body;

    // Validate required fields
    if (!name || !packageId) {
      return NextResponse.json(
        { error: 'Name and package ID are required' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        name,
        institution: institution || null,
        package_id: packageId,
        listening_score: listeningScore || 0,
        structure_score: structureScore || 0,
        reading_score: readingScore || 0,
        total_score: totalScore || 0,
        listening_raw: listeningRaw || 0,
        structure_raw: structureRaw || 0,
        reading_raw: readingRaw || 0,
        answers: answers || null
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id
    });
  } catch (error) {
    console.error('Save Test Result Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to save test result',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClientSimple();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      results: data
    });
  } catch (error) {
    console.error('Get Test Results Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get test results',
      },
      { status: 500 }
    );
  }
}
