// Script to regenerate Package C audio with speaker prefixes using SDK
// Run with: bun run scripts/regenerate-package-c-sdk.ts

import fs from 'fs';
import path from 'path';
import ZAI from 'z-ai-web-dev-sdk';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio', 'package_C');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// All scripts with speaker prefixes
const allScripts: { id: number; script: string }[] = [
  // Part A (Questions 1-30)
  { id: 1, script: "Woman: I'm having trouble deciding which courses to take next semester. Man: Why not talk to your academic advisor? She helped me choose courses that fit my schedule perfectly. Narrator: What does the man suggest the woman do?" },
  { id: 2, script: "Man: Did you hear that the university is building a new recreation center? Woman: Yes, and about time too! The current gym is always overcrowded. Narrator: What does the woman imply?" },
  { id: 3, script: "Woman: I thought the biology exam was going to be impossible. Man: You're telling me! I studied all night and still wasn't prepared for half the questions. Narrator: What does the man mean?" },
  { id: 4, script: "Man: I've been trying to reach Professor Williams all week, but she's never in her office. Woman: Didn't you know? She's at a conference in Boston until Friday. Narrator: What does the woman mean?" },
  { id: 5, script: "Woman: Would you mind if I borrowed your notes from yesterday's lecture? Man: Not at all. But let me warn you – my handwriting is almost impossible to read. Narrator: What does the man imply?" },
  { id: 6, script: "Man: I'm thinking about joining the debate team. Woman: That sounds perfect for you. You always have such strong opinions! Narrator: What does the woman mean?" },
  { id: 7, script: "Woman: The library is closing early today for maintenance. Man: Oh no! I still need to return these books before the fine doubles tomorrow. Narrator: What will the man probably do?" },
  { id: 8, script: "Man: I can't believe how much the cafeteria food has improved. Woman: You can say that again! I actually look forward to lunch now. Narrator: What does the woman mean?" },
  { id: 9, script: "Woman: Did you finish reading the article for tomorrow's discussion? Man: I'm only halfway through. It's incredibly dense and hard to follow. Narrator: What does the man imply about the article?" },
  { id: 10, script: "Man: I heard you got accepted into the study abroad program in Spain. Congratulations! Woman: Thanks! I'm nervous about the language barrier, but excited about the opportunity. Narrator: How does the woman feel about the program?" },
  { id: 11, script: "Woman: The printer in the computer lab is broken again. Man: That makes three times this month. Maybe we should just get a new one. Narrator: What does the man imply?" },
  { id: 12, script: "Man: I didn't see you at the football game on Saturday. Woman: I had planned to go, but my car broke down on the way there. Narrator: What happened to the woman?" },
  { id: 13, script: "Woman: Are you going to the career workshop this afternoon? Man: I hadn't planned on it, but since you're going, I might as well tag along. Narrator: What does the man mean?" },
  { id: 14, script: "Man: I've been working on this chemistry lab report for hours, but I just can't make sense of the data. Woman: Why don't you ask the teaching assistant? Narrator: What does the woman suggest?" },
  { id: 15, script: "Woman: I'm thinking about changing my major to economics. Man: Really? I thought you loved psychology. What changed your mind? Narrator: What can be inferred about the woman?" },
  { id: 16, script: "Man: The tickets for the spring concert sold out in less than an hour! Woman: I'm not surprised. The band is incredibly popular on campus. Narrator: What does the woman mean?" },
  { id: 17, script: "Woman: I can't find my student ID card anywhere. Man: Have you checked the lost and found at the security office? Narrator: What does the man suggest?" },
  { id: 18, script: "Man: Are you coming to the study group tonight? Woman: I'd like to, but I promised my roommate I'd help her move furniture. Narrator: What will the woman probably do tonight?" },
  { id: 19, script: "Woman: Did you understand what Professor Chen meant by paradigm shift? Man: I was confused too, so I looked it up after class. Narrator: What did the man do?" },
  { id: 20, script: "Man: I heard the university is offering free guitar lessons this semester. Woman: That's great! I've always wanted to learn an instrument. Narrator: What does the woman imply?" },
  { id: 21, script: "Woman: Why didn't you come to the environmental club meeting yesterday? Man: I completely forgot about it. Narrator: What does the man mean?" },
  { id: 22, script: "Man: Do you think Professor Martinez will extend the deadline? Woman: Based on past experience, I wouldn't count on it. Narrator: What does the woman imply?" },
  { id: 23, script: "Woman: I'm really impressed with your presentation today. Man: Thanks! I was so nervous beforehand that I almost didn't show up. Narrator: What does the man mean?" },
  { id: 24, script: "Man: The coffee shop on campus is having a half-price sale this week. Woman: That explains why there's such a long line every morning! Narrator: What does the woman mean?" },
  { id: 25, script: "Woman: I just found out I got the summer internship at the museum! Man: That's fantastic! All your hard work has finally paid off. Narrator: What does the man mean?" },
  { id: 26, script: "Man: Have you started studying for finals yet? Woman: Not really. I'm still trying to catch up on all the reading I missed. Narrator: What is the woman's current situation?" },
  { id: 27, script: "Woman: I can't decide between taking statistics or calculus. Man: If you're planning to go to graduate school in psychology, statistics would be more useful. Narrator: What does the man imply?" },
  { id: 28, script: "Man: Did you hear that the campus bookstore is closing permanently? Woman: Yes, it's unfortunate. But the online textbooks are much cheaper anyway. Narrator: What does the woman mean?" },
  { id: 29, script: "Woman: The new policy requires students to park in the remote lot. Man: That's going to add at least twenty minutes to my commute. Narrator: What does the man imply?" },
  { id: 30, script: "Man: I'm thinking of dropping my physics class. Woman: Before you do, why not talk to the professor? Narrator: What does the woman suggest?" },
  // Part B (Questions 31-38) - Shorter versions
  { id: 31, script: "Narrator: Listen to a conversation between a student and an advisor. Student: I'm thinking about changing my major to environmental science. Advisor: That's a significant change. Have you looked at the requirements? Narrator: Why does the student want to change majors?" },
  { id: 32, script: "Narrator: What does the advisor say the student will need?" },
  { id: 33, script: "Narrator: How long will it take the student to graduate after changing majors?" },
  { id: 34, script: "Narrator: What does the advisor offer to help the student find?" },
  { id: 35, script: "Narrator: Listen to a conversation about a research project. Professor: You want to study bee populations? Student: Yes, I'd like to investigate how pesticides affect bees. Narrator: What is the main topic?" },
  { id: 36, script: "Narrator: What has the student already done for the research?" },
  { id: 37, script: "Narrator: What does the professor say the student needs to do before collecting data?" },
  { id: 38, script: "Narrator: When will the professor review the student's proposal?" },
  // Part C (Questions 39-50) - Shorter versions
  { id: 39, script: "Narrator: Listen to a lecture about chocolate. Professor: Chocolate has a fascinating history. It began in Mesoamerica where the Olmecs first cultivated cacao around 1500 BCE. Narrator: Where did cacao cultivation first begin?" },
  { id: 40, script: "Narrator: What does the speaker say about the Aztecs and cacao?" },
  { id: 41, script: "Narrator: How did Europeans change the chocolate drink?" },
  { id: 42, script: "Narrator: What potential benefit does dark chocolate have?" },
  { id: 43, script: "Narrator: Listen to a lecture about volcanoes. Professor: Volcanoes form at tectonic plate boundaries. There are three main types: shield, stratovolcanoes, and cinder cones. Narrator: What is the main topic?" },
  { id: 44, script: "Narrator: Which type of volcano has broad, gently sloping sides?" },
  { id: 45, script: "Narrator: What benefit of volcanic activity does the professor mention?" },
  { id: 46, script: "Narrator: Why do scientists monitor active volcanoes?" },
  { id: 47, script: "Narrator: Listen to a lecture about the printing press. Professor: The printing press revolutionized communication. Before it, books were hand-copied and extremely expensive. Narrator: What problem did the printing press solve?" },
  { id: 48, script: "Narrator: What was Gutenberg's profession before inventing the printing press?" },
  { id: 49, script: "Narrator: What was the first major book printed in Europe?" },
  { id: 50, script: "Narrator: What effect did the printing press have on society?" },
];

async function main() {
  console.log('🎵 Package C Audio Generator (using SDK with Speaker Prefixes)');
  console.log('==============================================================\n');

  // Initialize ZAI
  console.log('Initializing Z-AI SDK...');
  const zai = await ZAI.create();
  console.log('SDK initialized!\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allScripts.length; i++) {
    const { id, script } = allScripts[i];
    const filename = `pC_q${id}.wav`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log(`[${i + 1}/${allScripts.length}] Generating: ${filename}`);

    try {
      // Truncate if needed
      const truncatedScript = script.slice(0, 1000);

      // Generate TTS
      const response = await zai.audio.tts.create({
        input: truncatedScript,
        voice: 'tongtong',
        speed: 1.0,
        response_format: 'wav',
        stream: false,
      });

      // Get buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));

      // Save to file
      fs.writeFileSync(outputPath, buffer);

      console.log(`   ✓ Success! (${Math.round(buffer.length / 1024)}KB)`);
      successCount++;

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`   ✗ Failed: ${error}`);
      failCount++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n==============================================================');
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
