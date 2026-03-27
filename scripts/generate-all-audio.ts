#!/usr/bin/env bun
/**
 * Generate TTS audio files for all TOEFL ITP listening questions
 * Uses z-ai-web-dev-sdk CLI for text-to-speech synthesis
 * 
 * Usage: bun run scripts/generate-all-audio.ts
 */

import { $ } from 'bun';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Audio output directory
const AUDIO_DIR = join(process.cwd(), 'public', 'audio');

// Ensure audio directory exists
if (!existsSync(AUDIO_DIR)) {
  mkdirSync(AUDIO_DIR, { recursive: true });
}

// Import question packages
interface ListeningQuestion {
  id: number;
  part: 'A' | 'B' | 'C';
  audioScript: string;
}

interface QuestionPackage {
  id: string;
  listening: ListeningQuestion[];
}

// Load packages dynamically
async function loadPackages(): Promise<Record<string, QuestionPackage>> {
  const packages: Record<string, QuestionPackage> = {};
  
  const packageIds = ['A', 'B', 'C', 'D'];
  
  for (const pkgId of packageIds) {
    try {
      const module = await import(`../src/data/packages/package-${pkgId.toLowerCase()}.ts`);
      const pkg = module[`package${pkgId}`] || module.default;
      if (pkg && pkg.listening) {
        packages[pkgId] = pkg;
        console.log(`✓ Loaded Package ${pkgId}: ${pkg.listening.length} questions`);
      }
    } catch (error) {
      console.error(`✗ Failed to load Package ${pkgId}:`, error);
    }
  }
  
  return packages;
}

// Generate audio using z-ai CLI
async function generateAudio(text: string, outputPath: string): Promise<boolean> {
  try {
    // Truncate text if too long (max ~500 chars for TTS)
    const truncatedText = text.length > 500 ? text.substring(0, 500) + '...' : text;
    
    // Use z-ai CLI for TTS
    const result = await $`z-ai tts --text "${truncatedText}" --output ${outputPath} --format wav`.quiet();
    
    return result.exitCode === 0;
  } catch (error) {
    console.error(`Failed to generate audio: ${error}`);
    return false;
  }
}

// Main function
async function main() {
  console.log('🎤 TOEFL ITP Audio Generator');
  console.log('='.repeat(50));
  console.log(`Output directory: ${AUDIO_DIR}`);
  console.log('');
  
  // Load all packages
  const packages = await loadPackages();
  
  if (Object.keys(packages).length === 0) {
    console.error('No packages loaded. Exiting.');
    process.exit(1);
  }
  
  let totalGenerated = 0;
  let totalFailed = 0;
  
  // Generate audio for each package
  for (const [pkgId, pkg] of Object.entries(packages)) {
    console.log(`\n📦 Processing Package ${pkgId}...`);
    console.log(`   Total questions: ${pkg.listening.length}`);
    
    let pkgGenerated = 0;
    let pkgFailed = 0;
    
    for (const question of pkg.listening) {
      const filename = `listening_${pkgId}_q${question.id}.wav`;
      const outputPath = join(AUDIO_DIR, filename);
      
      // Skip if file already exists
      if (existsSync(outputPath)) {
        console.log(`   ✓ [${pkgGenerated + pkgFailed + 1}/${pkg.listening.length}] ${filename} (exists)`);
        pkgGenerated++;
        continue;
      }
      
      // Generate audio
      const success = await generateAudio(question.audioScript, outputPath);
      
      if (success) {
        console.log(`   ✓ [${pkgGenerated + pkgFailed + 1}/${pkg.listening.length}] ${filename}`);
        pkgGenerated++;
      } else {
        console.log(`   ✗ [${pkgGenerated + pkgFailed + 1}/${pkg.listening.length}] ${filename} (failed)`);
        pkgFailed++;
        
        // Wait a bit on failure (rate limiting)
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    totalGenerated += pkgGenerated;
    totalFailed += pkgFailed;
    
    console.log(`   Package ${pkgId} complete: ${pkgGenerated} generated, ${pkgFailed} failed`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Total generated: ${totalGenerated}`);
  console.log(`   Total failed: ${totalFailed}`);
  console.log(`   Output directory: ${AUDIO_DIR}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
