#!/usr/bin/env bun
/**
 * Generate TTS audio files using z-ai-web-dev-sdk directly
 * Run for a specific package: bun run scripts/gen-audio-sdk.ts A
 */

import ZAI from 'z-ai-web-dev-sdk';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const AUDIO_DIR = join(process.cwd(), 'public', 'audio');
const pkgId = process.argv[2]?.toUpperCase() || 'A';

if (!existsSync(AUDIO_DIR)) {
  mkdirSync(AUDIO_DIR, { recursive: true });
}

// Import the correct package and extract listening questions
let listeningQuestions: any[] = [];

if (pkgId === 'A') {
  const pkg = require('../src/data/packages/package-a');
  listeningQuestions = pkg.packageA?.listening || pkg.packageAListening || [];
} else if (pkgId === 'B') {
  const pkg = require('../src/data/packages/package-b');
  listeningQuestions = pkg.packageB?.listening || pkg.listening || [];
} else if (pkgId === 'C') {
  const pkg = require('../src/data/packages/package-c');
  listeningQuestions = pkg.packageC?.listening || pkg.listening || [];
} else if (pkgId === 'D') {
  const pkg = require('../src/data/packages/package-d');
  listeningQuestions = pkg.packageD?.listening || pkg.listening || [];
}

console.log(`\n🎤 Package ${pkgId}: ${listeningQuestions.length} questions`);

function truncateForTTS(text: string, maxLength: number = 1000): string {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSentence = Math.max(truncated.lastIndexOf('.'), truncated.lastIndexOf('?'), truncated.lastIndexOf('!'));
  if (lastSentence > maxLength * 0.7) return truncated.substring(0, lastSentence + 1);
  return truncated + '...';
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const zai = await ZAI.create();
  let generated = 0, skipped = 0, failed = 0;
  
  for (const q of listeningQuestions) {
    const filename = `listening_${pkgId}_q${q.id}.wav`;
    const outputPath = join(AUDIO_DIR, filename);
    
    // Skip if exists with content
    if (existsSync(outputPath)) {
      try {
        const stats = statSync(outputPath);
        if (stats.size > 1000) {
          console.log(`  ✓ ${filename} (exists)`);
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
    
    try {
      const text = truncateForTTS(q.audioScript);
      
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
      console.log(`  ✓ ${filename} (${Math.round(buffer.length / 1024)}KB)`);
      generated++;
      
      // Delay to avoid rate limiting
      await delay(1000);
      
    } catch (e: any) {
      console.log(`  ✗ ${filename} (${e.message?.substring(0, 60) || 'error'})`);
      failed++;
      // Longer delay on error
      await delay(2000);
    }
  }
  
  console.log(`\n📊 Package ${pkgId}: ${generated} generated, ${skipped} skipped, ${failed} failed`);
}

main().catch(console.error);
