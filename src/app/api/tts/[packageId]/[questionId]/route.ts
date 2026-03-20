import { NextRequest, NextResponse } from 'next/server';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import ZAI from 'z-ai-web-dev-sdk';

// TTS API Route for TOEFL ITP Listening Questions
// Generates audio on-demand and caches it

const AUDIO_DIR = join(process.cwd(), 'public', 'audio');

// Package imports - using dynamic imports to avoid issues
async function getListeningQuestions(pkgId: string) {
  if (pkgId === 'A') {
    const pkg = await import('@/data/packages/package-a');
    return pkg.packageA?.listening || pkg.packageAListening || [];
  } else if (pkgId === 'B') {
    const pkg = await import('@/data/packages/package-b');
    return pkg.packageB?.listening || pkg.listening || [];
  } else if (pkgId === 'C') {
    const pkg = await import('@/data/packages/package-c');
    return pkg.packageC?.listening || pkg.listening || [];
  } else if (pkgId === 'D') {
    const pkg = await import('@/data/packages/package-d');
    return pkg.packageD?.listening || pkg.listening || [];
  }
  return [];
}

// Singleton ZAI instance
let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAIInstance() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// Ensure audio directory exists
function ensureAudioDir() {
  if (!existsSync(AUDIO_DIR)) {
    mkdirSync(AUDIO_DIR, { recursive: true });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ packageId: string; questionId: string }> }
) {
  try {
    const { packageId, questionId } = await params;
    const pkgId = packageId.toUpperCase();
    const qId = parseInt(questionId, 10);
    
    if (!['A', 'B', 'C', 'D'].includes(pkgId)) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }
    
    if (isNaN(qId) || qId < 1 || qId > 50) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 });
    }
    
    ensureAudioDir();
    
    const filename = `listening_${pkgId}_q${qId}.wav`;
    const outputPath = join(AUDIO_DIR, filename);
    
    // Check if file already exists
    if (existsSync(outputPath)) {
      try {
        const stats = statSync(outputPath);
        if (stats.size > 1000) {
          // File exists, redirect to static file
          return NextResponse.redirect(new URL(`/audio/${filename}`, req.url));
        }
      } catch (e) {
        // Continue to generate
      }
    }
    
    // Get the question's audioScript
    const listeningQuestions = await getListeningQuestions(pkgId);
    const question = listeningQuestions.find((q: { id: number; audioScript?: string }) => q.id === qId);
    
    if (!question || !question.audioScript) {
      return NextResponse.json({ error: 'Question not found or no audioScript' }, { status: 404 });
    }
    
    // Generate TTS audio
    const zai = await getZAIInstance();
    
    // Truncate if needed
    let text = question.audioScript;
    if (text.length > 1000) {
      const truncated = text.substring(0, 1000);
      const lastSentence = Math.max(truncated.lastIndexOf('.'), truncated.lastIndexOf('?'), truncated.lastIndexOf('!'));
      if (lastSentence > 700) {
        text = truncated.substring(0, lastSentence + 1);
      } else {
        text = truncated + '...';
      }
    }
    
    const response = await zai.audio.tts.create({
      input: text,
      voice: 'tongtong',
      speed: 1.0,
      response_format: 'wav',
      stream: false
    });
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));
    
    // Save to cache
    try {
      writeFileSync(outputPath, buffer);
    } catch (e) {
      // Ignore write errors, still return audio
    }
    
    // Return audio
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
    
  } catch (error: unknown) {
    console.error('TTS API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate audio';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
