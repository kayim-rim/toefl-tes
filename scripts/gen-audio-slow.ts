#!/usr/bin/env bun
/**
 * Generate TTS audio files with retry and longer delays
 * Run: bun run scripts/gen-audio-slow.ts B
 */

import ZAI from 'z-ai-web-dev-sdk';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const AUDIO_DIR = join(process.cwd(), 'public', 'audio');
const pkgId = process.argv[2]?.toUpperCase() || 'B';
const startFrom = parseInt(process.argv[3]) || 1;

if (!existsSync(AUDIO_DIR)) {
  mkdirSync(AUDIO_DIR, { recursive: true });
}

// Dynamic import for packages
async function getListeningQuestions(pkg: string) {
  if (pkg === 'A') {
    const mod = await import('../src/data/packages/package-a');
    return mod.packageA?.listening || mod.packageAListening || [];
  } else if (pkg === 'B') {
    const mod = await import('../src/data/packages/package-b');
    return mod.packageB?.listening || mod.listening || [];
  } else if (pkg === 'C') {
    const mod = await import('../src/data/packages/package-c');
    return mod.packageC?.listening || mod.listening || [];
  } else if (pkg === 'D') {
    const mod = await import('../src/data/packages/package-d');
    return mod.packageD?.listening || mod.listening || [];
  }
  return [];
}

function truncateForTTS(text: string, maxLength = 1000): string {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSentence = Math.max(truncated.lastIndexOf('.'), truncated.lastIndexOf('?'), truncated.lastIndexOf('!'));
  return lastSentence > 700 ? truncated.substring(0, lastSentence + 1) : truncated + '...';
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithRetry(zai: any, text: string, outputPath: string, maxRetries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await zai.audio.tts.create({
        input: text,
        voice: 'tongtong',
        speed: 1.0,
        response_format: 'wav',
        stream: false
      });

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));
      writeFileSync(outputPath, buffer);
      return true;
    } catch (e: any) {
      if (e.message?.includes('429') || e.message?.includes('Too many requests')) {
        const waitTime = attempt * 10000; // 10s, 20s, 30s
        console.log(`     Rate limited, waiting ${waitTime/1000}s...`);
        await sleep(waitTime);
      } else {
        throw e;
      }
    }
  }
  return false;
}

async function main() {
  console.log(`\n🎤 Package ${pkgId} - Starting from Q${startFrom}`);
  
  const listeningQuestions = await getListeningQuestions(pkgId);
  console.log(`   Total questions: ${listeningQuestions.length}`);
  
  const zai = await ZAI.create();
  let generated = 0, skipped = 0, failed = 0;

  for (const q of listeningQuestions) {
    if (q.id < startFrom) continue;
    
    const filename = `listening_${pkgId}_q${q.id}.wav`;
    const outputPath = join(AUDIO_DIR, filename);

    // Skip if exists
    if (existsSync(outputPath)) {
      try {
        const stats = statSync(outputPath);
        if (stats.size > 1000) {
          console.log(`  ✓ Q${q.id} (exists)`);
          skipped++;
          continue;
        }
      } catch (e) {}
    }

    if (!q.audioScript) {
      console.log(`  ✗ Q${q.id} - No audioScript`);
      failed++;
      continue;
    }

    const text = truncateForTTS(q.audioScript);
    console.log(`  ⏳ Q${q.id} generating...`);

    try {
      const success = await generateWithRetry(zai, text, outputPath);
      if (success) {
        console.log(`     ✓ Q${q.id} done`);
        generated++;
      } else {
        console.log(`     ✗ Q${q.id} failed after retries`);
        failed++;
      }
    } catch (e: any) {
      console.log(`     ✗ Q${q.id} error: ${e.message?.substring(0, 50)}`);
      failed++;
    }

    // Wait 3 seconds between requests to avoid rate limit
    await sleep(3000);
  }

  console.log(`\n📊 Package ${pkgId}: ${generated} generated, ${skipped} skipped, ${failed} failed`);
}

main().catch(console.error);
