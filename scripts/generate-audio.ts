// Script to generate all TOEFL listening audio files
// Run with: bun run scripts/generate-audio.ts

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Audio scripts from each package (simplified - just use the text directly)
const audioScripts: { packageId: string; questionId: number; script: string }[] = [];

// Package A Listening Scripts (50 questions)
const packageAScripts = [
  "Did the director call about the meeting? Yes, she called to cancel it. What does the woman mean?",
  "Would you like to see the new horror movie with me tonight? I'd rather stay home and read a book. What does the woman imply?",
  "I've had such a terrible day. You think you've had problems? Listen to what happened to me! What does the woman mean?",
  "Have you read that new novel everyone's talking about? Anna told me all about it, so I feel like I have. What does the man mean?",
  "I'm trying to finish this project, but I'm getting hungry. Why don't we take a break and grab some lunch together? What does the man suggest?",
  "Do you know why Rose didn't come to the party? I haven't the faintest idea. What does the man mean?",
  "Could you lend me twenty dollars until payday? I wish I could, but I'm broke myself. What does the woman mean?",
  "Did you make that sweater yourself? Actually, my sister made it for me. It's her specialty. What does the man mean?",
  "How did your job interview go? I couldn't have been more pleased with the way it went. What does the man mean?",
  "What did you think of the speaker? She dropped a few pins in the middle of her speech. What does the woman mean?",
  "Would you like to see a menu? No, thank you. I already know what I want to order. Where does this conversation probably take place?",
  "You have quite a few overdue books. I know. I've been meaning to return them, but I keep forgetting. What does the man imply?",
  "The ice on the lake looks thick enough for skating. I think we should wait until it's been tested. What does the woman suggest?",
  "Have you ever been to Las Vegas? I've always wanted to go, but I've never had the chance. What does the woman mean?",
  "Are you going to the International Conference in Frankfurt? I'm still on the fence about it. What does the man mean?",
  "Anna's entered her short stories in the competition. I hope she wins. She certainly deserves to. What does the woman mean?",
  "Anna seems very nervous about her presentation tomorrow. She doesn't need to be. She's well prepared. What does the man imply about Anna?",
  "I've been working on this paper for weeks. Maybe you should take a break and come back to it later. What does the woman suggest?",
  "Who's going to drive Emily to her piano lesson? Her teacher offered to pick her up. Who will take Emily to her lesson?",
  "Why isn't John here? The meeting's about to start. He's still looking for an apartment. What does the man mean?",
  "I forgot my book again. You always leave something behind when you come here. What does the woman imply?",
  "You look down. What's wrong? Nothing really. I've just been homesick lately. What does the man mean?",
  "I'm thinking of applying for that job at the bookstore. I think you'd be perfect for it. What does the woman mean?",
  "How are you feeling today? Much better, thanks. I was pretty sick yesterday. What does the man mean?",
  "Joe's going on the roller coaster again. I don't know how he can enjoy those dangerous rides. What does the woman mean?",
  "What do you think of my new car? It's exactly what I've always wanted. What does the man mean?",
  "Is Charlie coming to the wedding? Yes, his sister is getting married in Virginia this summer. What does the woman say about Charlie?",
  "Let's ask Jessica to join us. She lives closer than anyone else, so she's the logical choice. What does the woman mean?",
  "How was your meeting with Chris? He couldn't have been friendlier. What does the man mean?",
  "Johnny forgot to hand in his assignment. That's not like him. He's usually so responsible. What does the woman mean?",
  // Part B - Longer conversations
  "Listen to a conversation between a student and an advisor. I'd like to sign up for the Work and Study Program. Are you looking for a job on campus? Yes, I need to earn some money. I'm a sophomore now, so I have some free time. You need to maintain good grades while working. The program allows up to 20 hours per week. I understand. Can I start right away? First, you need to fill out this form and find a job at the Job Centre. Why does the student go to see the advisor?",
  "Why can the student work now?",
  "Why does the advisor mention grades?",
  "What will the student probably do next?",
  "Listen to a conversation between a student and a professor. Professor Adams, I'd like to take your Shakespeare class next semester. That's an advanced course. Have you taken any literature classes? I'm taking Literature 101 now, and I really enjoy it. That's a freshman class. You should wait until you have more credits. But I love Shakespeare's plays. I suggest you take more literature courses first, then sign up next year. Why does the student talk to the professor?",
  "Why is the professor concerned?",
  "Why is the student hesitant about the professor's suggestion?",
  "What does the professor suggest the student do?",
  "What will the student probably do?",
  "What can be inferred about the student?",
  // Part C - Talks
  "Listen to a talk about the origin of the moon. The Moon has fascinated humans for centuries. There are several theories about how the Moon was formed. The capture theory suggests that the Moon was formed elsewhere in the solar system and was captured by Earth's gravity. However, this theory has problems because the Moon would have a strange orbital path if it were captured. The fission theory proposes that the Moon was once part of Earth and split off due to rapid rotation. This explains why the Moon is made of similar materials as Earth. However, the Moon is too small for this to be likely. The most accepted theory today is the giant impact hypothesis. It suggests that a Mars-sized object collided with Earth about 4.5 billion years ago, and the debris from this collision eventually formed the Moon. What is the main topic of the talk?",
  "What is a problem with the capture theory?",
  "What is an advantage of the fission theory?",
  "What is a problem with the fission theory?",
  "Which theory is most accepted today?",
  "Listen to a lecture about sleep. Sleep is essential for our health and well-being. When we don't get enough sleep, we accumulate what scientists call sleep debt. This debt can have serious effects on our bodies and minds. Sleep deprivation can lead to decreased attention, slower thinking, and poor memory. Studies show that driving while sleep-deprived can be as dangerous as driving under the influence of alcohol. Circadian rhythms are our body's natural sleep-wake cycle. When we disrupt this cycle, for example by staying up late or working night shifts, we can experience various health problems. Most adults need 7-9 hours of sleep per night, though individual needs vary. What is the main topic of the lecture?",
  "Why does the speaker mention circadian rhythms?",
  "Why does the speaker mention driving?",
  "According to the lecture, what is a danger of sleep deprivation?",
  "How much sleep do most adults need?"
];

// Add package A scripts
packageAScripts.forEach((script, index) => {
  audioScripts.push({
    packageId: 'A',
    questionId: index + 1,
    script: script
  });
});

// For packages B, C, D - use similar scripts but with slight variations
// For now, we'll use the same scripts structure
['B', 'C', 'D'].forEach(pkgId => {
  packageAScripts.forEach((script, index) => {
    audioScripts.push({
      packageId: pkgId,
      questionId: index + 1,
      script: script
    });
  });
});

// Generate audio file using z-ai CLI
function generateAudio(script: string, outputPath: string): boolean {
  try {
    // Truncate script if too long (max 1024 chars)
    const truncatedScript = script.slice(0, 1000);
    
    // Use z-ai CLI to generate TTS
    const escapedScript = truncatedScript.replace(/"/g, '\\"').replace(/'/g, "'\\''");
    execSync(`z-ai tts -i "${escapedScript}" -o "${outputPath}" --voice tongtong --speed 1.0 --format wav`, {
      timeout: 60000,
      stdio: 'pipe'
    });
    
    return fs.existsSync(outputPath);
  } catch (error) {
    console.error(`Error generating audio:`, error);
    return false;
  }
}

// Main function
async function main() {
  console.log('🎵 TOEFL Audio Generator');
  console.log('========================\n');

  console.log(`Found ${audioScripts.length} audio scripts to generate.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < audioScripts.length; i++) {
    const { packageId, questionId, script } = audioScripts[i];
    const filename = `listening_${packageId}_q${questionId}.wav`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 1000) {
        console.log(`[${i + 1}/${audioScripts.length}] ✓ Already exists: ${filename}`);
        successCount++;
        continue;
      }
    }

    console.log(`[${i + 1}/${audioScripts.length}] Generating: ${filename}`);
    console.log(`   Script preview: ${script.slice(0, 60)}...`);

    const success = generateAudio(script, outputPath);

    if (success) {
      console.log(`   ✓ Success!`);
      successCount++;
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));
    } else {
      console.log(`   ✗ Failed!`);
      failCount++;
      
      // Longer delay on failure
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log('\n========================');
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
