import { NextRequest, NextResponse } from 'next/server';
import { audioCache, generateCacheKey } from '@/lib/audio-cache';

// Singleton ZAI instance
let zaiInstance: Awaited<ReturnType<typeof import('z-ai-web-dev-sdk').default.create>> | null = null;

async function getZAIInstance() {
  if (!zaiInstance) {
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'tongtong', speed = 1.0 } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Check cache first
    const cacheKey = generateCacheKey(text, voice, speed);
    const cached = audioCache.get(cacheKey);
    
    if (cached) {
      return NextResponse.json({
        success: true,
        audioUrl: cached.audioUrl,
        size: cached.size,
        cached: true
      });
    }

    // Get ZAI instance (reused)
    const zai = await getZAIInstance();

    // Limit text to 1024 characters (API constraint)
    const truncatedText = text.slice(0, 1024);

    // Generate TTS audio using WAV format
    const response = await zai.audio.tts.create({
      input: truncatedText,
      voice: voice,
      speed: speed,
      response_format: 'wav',
      stream: false,
    });

    // Get array buffer from Response object
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    // Convert to base64 for audio playback
    const base64 = buffer.toString('base64');
    const audioUrl = `data:audio/wav;base64,${base64}`;

    // Cache the result
    audioCache.set(cacheKey, audioUrl, buffer.length);

    // Return audio URL
    return NextResponse.json({
      success: true,
      audioUrl: audioUrl,
      size: buffer.length,
      cached: false
    });
  } catch (error) {
    console.error('TTS API Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate speech',
      },
      { status: 500 }
    );
  }
}
