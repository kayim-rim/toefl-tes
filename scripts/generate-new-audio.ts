#!/usr/bin/env bun
/**
 * Generate TTS audio files for all TOEFL ITP listening questions from new packages
 * Uses z-ai CLI for text-to-speech synthesis with proper rate limiting
 * 
 * Usage: bun run scripts/generate-new-audio.ts
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs';
import { join } from 'path';

const AUDIO_DIR = join(process.cwd(), 'public', 'audio');

// Create audio directory if not exists
if (!existsSync(AUDIO_DIR)) {
  mkdirSync(AUDIO_DIR, { recursive: true });
}

// Import all packages with correct export names
const packageA = require('../src/data/packages/package-a');
const packageB = require('../src/data/packages/package-b');
const packageC = require('../src/data/packages/package-c');
const packageD = require('../src/data/packages/package-d');

// Extract listening questions from each package
const packages: Record<string, any[]> = {
  A: packageA.packageAListening || packageA.packageB?.listening || [],
  B: packageB.packageB?.listening || packageB.listening || [],
  C: packageC.packageC?.listening || packageC.listening || [],
  D: packageD.packageD?.listening || packageD.listening || []
};

// Debug: show what we found
console.log('Package A listening:', packages.A?.length || 0, 'questions');
console.log('Package B listening:', packages.B?.length || 0, 'questions');
console.log('Package C listening:', packages.C?.length || 0, 'questions');
console.log('Package D listening:', packages.D?.length || 0, 'questions');

// Helper to escape quotes for command line
function escapeForCLI(text: string): string {
  return text.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/'/g, "'\"'\"'");
}

// Truncate text to max 1024 characters for TTS API
function truncateForTTS(text: string, maxLength: number = 1000): string {
  if (text.length <= maxLength) return text;
  
  // Try to truncate at a sentence boundary
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastExclaim = truncated.lastIndexOf('!');
  const lastSentence = Math.max(lastPeriod, lastQuestion, lastExclaim);
  
  if (lastSentence > maxLength * 0.7) {
    return truncated.substring(0, lastSentence + 1);
  }
  return truncated + '...';
}

// Generate audio for a single question
function generateAudio(pkg: string, id: number, audioScript: string): { success: boolean; skipped: boolean } {
  const filename = `listening_${pkg}_q${id}.wav`;
  const outputPath = join(AUDIO_DIR, filename);
  
  // Check if file exists with content
  if (existsSync(outputPath)) {
    try {
      const stats = statSync(outputPath);
      if (stats.size > 1000) { // File has meaningful content
        console.log(`  ✓ ${filename} (exists, ${Math.round(stats.size / 1024)}KB)`);
        return { success: true, skipped: true };
      }
    } catch (e) {
      // Continue to regenerate
    }
  }
  
  try {
    const text = truncateForTTS(audioScript);
    
    // Use z-ai CLI for TTS
    execSync(
      `z-ai tts -i "${escapeForCLI(text)}" -o "${outputPath}" -f wav`,
      { timeout: 60000, stdio: 'pipe' }
    );
    
    // Verify file was created
    if (existsSync(outputPath)) {
      const stats = statSync(outputPath);
      console.log(`  ✓ ${filename} (${Math.round(stats.size / 1024)}KB)`);
      return { success: true, skipped: false };
    } else {
      console.log(`  ✗ ${filename} (file not created)`);
      return { success: false, skipped: false };
    }
  } catch (error: any) {
    console.log(`  ✗ ${filename} (failed: ${error.message?.substring(0, 50) || 'unknown error'})`);
    return { success: false, skipped: false };
  }
}

// Delay helper
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  console.log('\n🎤 Generating Audio Files for TOEFL ITP Questions (New Packages)');
  console.log('='.repeat(60));
  console.log(`Output: ${AUDIO_DIR}`);
  console.log('');
  
  let totalGenerated = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  
  for (const [pkgId, listeningQuestions] of Object.entries(packages)) {
    console.log(`\n📦 Package ${pkgId}:`);
    
    if (!listeningQuestions || !Array.isArray(listeningQuestions) || listeningQuestions.length === 0) {
      console.log(`   ⚠️  No listening questions found for package ${pkgId}`);
      continue;
    }
    
    let pkgGenerated = 0;
    let pkgFailed = 0;
    let pkgSkipped = 0;
    
    for (const question of listeningQuestions) {
      if (!question.audioScript) {
        console.log(`  ⚠️  Q${question.id} - No audioScript found`);
        pkgFailed++;
        totalFailed++;
        continue;
      }
      
      const result = generateAudio(pkgId, question.id, question.audioScript);
      
      if (result.success) {
        if (result.skipped) {
          pkgSkipped++;
          totalSkipped++;
        } else {
          pkgGenerated++;
          totalGenerated++;
        }
      } else {
        pkgFailed++;
        totalFailed++;
      }
      
      // Small delay to avoid rate limiting (only for new generations)
      if (!result.skipped) {
        await delay(800);
      }
    }
    
    console.log(`   Package ${pkgId} complete: ${pkgGenerated} generated, ${pkgSkipped} skipped, ${pkgFailed} failed`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Total generated: ${totalGenerated}`);
  console.log(`   Total skipped (already exist): ${totalSkipped}`);
  console.log(`   Total failed: ${totalFailed}`);
  console.log(`   Total audio files: ${totalGenerated + totalSkipped}`);
  console.log('='.repeat(60));
  
  // List generated files
  const files = readdirSync(AUDIO_DIR).filter(f => f.endsWith('.wav'));
  console.log(`\n📁 Audio directory contains ${files.length} WAV files`);
}

main().catch(console.error);
