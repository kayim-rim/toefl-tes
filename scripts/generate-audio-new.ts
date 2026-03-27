#!/usr/bin/env bun
/**
 * Generate TTS audio files for all TOEFL ITP listening questions
 * Uses z-ai CLI for text-to-speech synthesis
 * 
 * Usage: bun run scripts/generate-audio-new.ts
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// Audio output directory
const AUDIO_DIR = join(process.cwd(), 'public', 'audio');

// Ensure audio directory exists
if (!existsSync(AUDIO_DIR)) {
  mkdirSync(AUDIO_DIR, { recursive: true });
}

// Audio scripts for Package A (extracted from toefl-packages-new.ts)
const packageAAudioScripts: { id: number; audioScript: string }[] = [
  { id: 1, audioScript: "Have you seen my calculator? It was right here a minute ago. Did you look under your book? I'm always losing things that way. What does the woman imply?" },
  { id: 2, audioScript: "I really want to take astronomy, but my course load this spring is too heavy already. The summer session might be a good idea, since you'll be working on campus anyway. What does the man suggest the woman do?" },
  { id: 3, audioScript: "Professor Clark, I'd like to repeat the experiment from last class. Is there a possibility I could use the lab over the weekend? It'll be locked, but you can get the key from the security office. Make sure you return it when you're finished. What does the woman imply about the man?" },
  { id: 4, audioScript: "I really like your sweatshirt! I don't think I've ever seen a design like that before. Yeah, it's pretty cool, isn't it? My parents were in Japan last year and brought it back for me. What does the man mean?" },
  { id: 5, audioScript: "Are you free tonight? I'm meeting a few friends at the restaurant on Main Street. Oh, I'd love to. But I already have dinner plans for tonight. Another time perhaps. What does the woman mean?" },
  { id: 6, audioScript: "I just registered for the research conference—the deadline is tomorrow. It doesn't take long though—you simply go to the conference Web site. I guess I'd better do that today, huh? I have a little time before I teach my next class. What can be inferred about the man?" },
  { id: 7, audioScript: "That's a great bike! Where'd you get it? You know that sporting goods store on Harrison Street—they've been running tremendous sales all summer! What does the woman imply?" },
  { id: 8, audioScript: "So, how much was your plane ticket? More than I could really afford—I had to dip into my savings. What does the woman imply?" },
  { id: 9, audioScript: "Professor Jones, we had a power failure in my dorm last night, so I wasn't able to finish my paper. Could I hand it in tomorrow? I understand that things sometimes do come up, but I don't make any exceptions. I made that clear in the first class… and the library was open till midnight… What does the professor mean?" },
  { id: 10, audioScript: "I'm thinking of moving off-campus next semester, but since I don't have a car, I'd need to stay pretty close by. Any suggestions? It just so happens the people who live downstairs from me are moving next month, so their apartment might be available, and it's only a block away from the university. If you're interested, I'll look into it for you. What can be inferred about the man?" },
  { id: 11, audioScript: "What an awful movie! A total waste of time! You can say that again! What does the woman mean?" },
  { id: 12, audioScript: "I hear your sister got into a prestigious university. I bet she was checking her mail every day for her acceptance letter. Yes, she was a little nervous until she found out last week. What does the man imply about his sister?" },
  { id: 13, audioScript: "I'm really sorry I'm late for the meeting. My car wouldn't start, and I had to take the bus. That's okay. We're still waiting for Mark. What does the woman imply?" },
  { id: 14, audioScript: "Wow, you seem to be in a really good mood today. What's the secret? Dunno. I guess some mornings you wake up feeling great, and some mornings you don't. What does the man mean?" },
  { id: 15, audioScript: "I'd think twice about taking a history class next year. There's not a single good professor in the whole history department. Look. That's what you said last semester about the sociology department. And I'm very glad I didn't pay any attention to what you said. What does the woman mean?" },
  { id: 16, audioScript: "I know we're supposed to meet at five in the library, but something came up unexpectedly. Would you mind changing it to six? Not at all. My schedule's very flexible. What does the man mean?" },
  { id: 17, audioScript: "Can you believe it? A 20-page term paper and a final exam. What does Professor Johnson think? That we don't have any classes but his? Wait a second. I'm sure he said it was either one or the other. What does the man imply?" },
  { id: 18, audioScript: "I'm really happy I got that athletic scholarship, but I'm embarrassed by the big fuss all my friends are making. Well it is quite an accomplishment. Of course your friends are happy for you! What does the man mean?" },
  { id: 19, audioScript: "My computer screen is flashing… and I can't get it to stop. Oh, a similar thing happened to me the other day. I'll bet together we can figure out what to do. What will the woman probably do next?" },
  { id: 20, audioScript: "There's quite a crowd at the health center today. I'm surprised so many people are interested in getting a free blood pressure test. Come to think of it, I haven't had mine checked in a while. Guess I'll go get in line… What does the man mean?" },
  { id: 21, audioScript: "I can't believe I actually graduated and I'm leaving tonight. I enjoyed studying with you this semester. Same here. And hey—don't forget to drop me a line once in a while. Let me know how the new job goes. What does the woman mean?" },
  { id: 22, audioScript: "Look at the fancy pen I just found under this bench. It looks expensive. Oh. So THAT's where it went! What does the woman imply?" },
  { id: 23, audioScript: "I don't know what I was thinking of when I gave you those directions. Oh, don't worry about it. I made it before the conference began. I didn't have to drive that much out of my way. What can be inferred from this conversation?" },
  { id: 24, audioScript: "Now that you've had a chance to read our proposal to renovate the campus café, do you think the university will approve it? Actually, I've been so busy, I haven't had a chance to look at it yet. What does the woman mean?" },
  { id: 25, audioScript: "Wow, I've already taken one of those pills for my headache, but it's still bothering me. Well, why not take another? The recommended dose is one or two, depending on how bad it is. What does the woman suggest the man do?" },
  { id: 26, audioScript: "What's Phil doing here? I thought he was taking the fall semester off. Didn't you hear that his parents talked him out of it? What does the man imply about Phil?" },
  { id: 27, audioScript: "A florist told me that if I want to keep flowers looking fresh, I should cut a bit off the stems before putting them in water. I wonder if it really works… Someone told me the same thing and the bouquet I had did last longer. Anyway, it can't hurt, can it? What does the woman imply?" },
  { id: 28, audioScript: "That was a fascinating lecture, but the questions from the audience afterward were mostly irrelevant to the topic! Yes, I totally agree. I would've preferred less of that and more of the speaker. What does the man imply?" },
  { id: 29, audioScript: "I just found out my dentist retired last month. Do you have one you'd recommend? Yeah. In fact, I have a checkup there next week. Say, I've even got his card with me, if you want to wait a minute while I get it out. What does the man mean?" },
  { id: 30, audioScript: "Tomorrow I have my big presentation in anthropology class… I'm really worried about speaking in front of the class. You always say that, and then you always do really well. You have nothing to worry about. What does the woman imply?" },
  // Part B - Questions 31-38
  { id: 31, audioScript: "Listen to a conversation between two students. So how was the singing competition last weekend? You don't wanna know. What d'ya mean? Wasn't it near the beach?… That should've been fun! It should've been fun, but we only came in second place… not only that, but we weren't even really able to enjoy the beach either. What are the students mainly discussing?" },
  { id: 32, audioScript: "What does the woman say about the winners of the competition?" },
  { id: 33, audioScript: "How did the man spend his weekend?" },
  { id: 34, audioScript: "What does the woman say about her weekend schedule?" },
  { id: 35, audioScript: "Listen to a conversation between a student and an art professor. Professor, I really like those sculptures by Brancusi. They have such simple, elegant lines. Yes, they do. Were there any other sculptors doing work like that? Well, yes, there was a sculptor named Isamu Noguchi. Noguchi actually worked in Brancusi's studio for a time, so Brancusi was one of several important influences on his work. What is the conversation mainly about?" },
  { id: 36, audioScript: "What kind of work did Noguchi's father do?" },
  { id: 37, audioScript: "According to the professor, what did Noguchi learn to do when he was a child in Japan?" },
  { id: 38, audioScript: "What can be inferred about Noguchi's relationship with Brancusi?" },
  // Part C - Questions 39-50
  { id: 39, audioScript: "Listen to part of a lecture in a marketing class. Senses play an important role in consumer decision-making. Shoppers like to… sniff a piece of fish… or listen to a stereo before buying it. But the power of touch was not fully understood by researchers until recently. Evidence is showing that consumers who're able to handle merchandise are more likely to buy it—and pay more for it. What is the main purpose of the lecture?" },
  { id: 40, audioScript: "According to the professor, what psychological feeling do shoppers tend to have when they touch an item of merchandise?" },
  { id: 41, audioScript: "Why does the professor mention sweaters on shelves?" },
  { id: 42, audioScript: "Listen to a talk in a history class. Let me warn you against a mistake that historians often make—they sometimes assume that people in the past used the same concepts we do. What is the main purpose of the talk?" },
  { id: 43, audioScript: "What was on the Mesopotamian tablet mentioned in the talk?" },
  { id: 44, audioScript: "According to the professor, what had been assumed about the Mesopotamians?" },
  { id: 45, audioScript: "Listen to a talk in a biology class. A really surprising discovery was made up in Canada recently… some fossilized animal footprints they found in some sandstone there. What is the talk mainly about?" },
  { id: 46, audioScript: "According to the professor, what question does the discovery in Canada help answer?" },
  { id: 47, audioScript: "Why does the professor mention stonecutters?" },
  { id: 48, audioScript: "Listen to a lecture about sleep in a psychology class. Sleep is essential for our health and well-being. When we don't get enough sleep, we accumulate what scientists call sleep debt. What is the main topic of the lecture?" },
  { id: 49, audioScript: "Why does the speaker mention driving?" },
  { id: 50, audioScript: "According to the lecture, what is a circadian rhythm?" }
];

// Generate audio for a single question
async function generateAudio(id: number, audioScript: string, pkgId: string): Promise<boolean> {
  const filename = `listening_${pkgId}_q${id}.wav`;
  const outputPath = join(AUDIO_DIR, filename);
  
  // Skip if exists
  if (existsSync(outputPath)) {
    console.log(`  ✓ ${filename} (exists)`);
    return true;
  }
  
  try {
    // Truncate if too long
    const text = audioScript.length > 500 ? audioScript.substring(0, 500) + '...' : audioScript;
    
    // Use z-ai CLI for TTS
    execSync(`z-ai tts --text "${text.replace(/"/g, '\\"')}" --output ${outputPath} --format wav`, {
      timeout: 30000,
      stdio: 'pipe'
    });
    
    console.log(`  ✓ ${filename}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${filename} (failed)`);
    return false;
  }
}

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Main function
async function main() {
  console.log('🎤 Generating Audio Files for TOEFL ITP Questions');
  console.log('='.repeat(50));
  console.log(`Output: ${AUDIO_DIR}`);
  console.log('');
  
  let generated = 0;
  let failed = 0;
  
  // Generate Package A
  console.log('📦 Package A:');
  for (const item of packageAAudioScripts) {
    const success = await generateAudio(item.id, item.audioScript, 'A');
    if (success) generated++;
    else failed++;
    
    // Delay to avoid rate limiting
    await delay(1000);
  }
  
  console.log('');
  console.log('='.repeat(50));
  console.log(`✓ Generated: ${generated}`);
  console.log(`✗ Failed: ${failed}`);
  console.log('='.repeat(50));
  
  console.log('\n⏳ Note: Run this script for each package (B, C, D) to generate all audio files.');
  console.log('Audio files are generated slowly to avoid rate limiting.');
}

main().catch(console.error);
