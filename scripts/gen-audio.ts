#!/usr/bin/env bun
/**
 * Generate TTS audio files for TOEFL ITP listening questions
 * Run for a specific package: bun run scripts/gen-audio.ts A
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, statSync } from 'fs';
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
console.log(`   First question ID: ${listeningQuestions[0]?.id}`);
console.log(`   First audioScript: ${listeningQuestions[0]?.audioScript?.substring(0, 50)}...`);

function escapeForCLI(text: string): string {
  return text.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/'/g, "'\"'\"'");
}

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
      execSync(`z-ai tts -i "${escapeForCLI(text)}" -o "${outputPath}" -f wav`, { timeout: 60000, stdio: 'pipe' });
      
      if (existsSync(outputPath)) {
        console.log(`  ✓ ${filename} (new)`);
        generated++;
      } else {
        console.log(`  ✗ ${filename} (not created)`);
        failed++;
      }
    } catch (e: any) {
      console.log(`  ✗ ${filename} (error)`);
      failed++;
    }
    
    await delay(600);
  }
  
  console.log(`\n📊 Package ${pkgId}: ${generated} generated, ${skipped} skipped, ${failed} failed`);
}

main().catch(console.error);
