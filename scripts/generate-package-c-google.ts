// Generate Package C Audio using Google Translate TTS (Free)
// Format: Speaker prefix (Man:, Woman:, Narrator:) included
// Run: bun run scripts/generate-package-c-google.ts

import fs from 'fs';
import path from 'path';
import https from 'https';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio', 'package_C');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Google Translate TTS (Free, no auth required)
async function downloadGoogleTTS(text: string, outputPath: string, lang = 'en'): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Limit text length (Google TTS has ~200 char limit per request)
    const truncatedText = text.slice(0, 200);
    const encodedText = encodeURIComponent(truncatedText);
    
    // Google Translate TTS URL
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${lang}&client=tw-ob`;
    
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://translate.google.com/'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          https.get(redirectUrl, (redirectResponse) => {
            if (redirectResponse.statusCode === 200) {
              redirectResponse.pipe(file);
              file.on('finish', () => {
                file.close();
                resolve(true);
              });
            } else {
              fs.unlinkSync(outputPath);
              resolve(false);
            }
          }).on('error', (err) => {
            fs.unlinkSync(outputPath);
            resolve(false);
          });
        } else {
          fs.unlinkSync(outputPath);
          resolve(false);
        }
      } else {
        fs.unlinkSync(outputPath);
        resolve(false);
      }
    }).on('error', (err) => {
      fs.unlinkSync(outputPath);
      resolve(false);
    });
  });
}

// Use Voice RSS API (free tier available) or fallback to browser-based TTS
// Alternative: Use the project's own TTS API route
async function generateAudioViaAPI(text: string, outputPath: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch('http://localhost:3000/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'tongtong', speed: 1.0 })
      });
      
      if (!response.ok) {
        console.log('   API failed, status:', response.status);
        resolve(false);
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.audioUrl) {
        // Convert base64 to buffer and save
        const base64 = data.audioUrl.replace('data:audio/wav;base64,', '');
        const buffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(outputPath, buffer);
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log('   API error:', error);
      resolve(false);
    }
  });
}

// All scripts with speaker prefixes
const allScripts: { id: number; script: string }[] = [
  // Part A (Questions 1-30) - Short conversations with speaker labels
  { id: 1, script: "Woman: I'm having trouble deciding which courses to take next semester. Man: Why not talk to your academic advisor? She helped me choose courses that fit my schedule perfectly. Narrator: What does the man suggest the woman do?" },
  { id: 2, script: "Man: Did you hear that the university is building a new recreation center? Woman: Yes, and about time too! The current gym is always overcrowded. Narrator: What does the woman imply?" },
  { id: 3, script: "Woman: I thought the biology exam was going to be impossible. Man: You're telling me! I studied all night and still wasn't prepared for half the questions. Narrator: What does the man mean?" },
  { id: 4, script: "Man: I've been trying to reach Professor Williams all week, but she's never in her office. Woman: Didn't you know? She's at a conference in Boston until Friday. Narrator: What does the woman mean?" },
  { id: 5, script: "Woman: Would you mind if I borrowed your notes from yesterday's lecture? Man: Not at all. But let me warn you, my handwriting is almost impossible to read. Narrator: What does the man imply?" },
  { id: 6, script: "Man: I'm thinking about joining the debate team. Woman: That sounds perfect for you. You always have such strong opinions! Narrator: What does the woman mean?" },
  { id: 7, script: "Woman: The library is closing early today for maintenance. Man: Oh no! I still need to return these books before the fine doubles tomorrow. Narrator: What will the man probably do?" },
  { id: 8, script: "Man: I can't believe how much the cafeteria food has improved. Woman: You can say that again! I actually look forward to lunch now. Narrator: What does the woman mean?" },
  { id: 9, script: "Woman: Did you finish reading the article for tomorrow's discussion? Man: I'm only halfway through. It's incredibly dense and hard to follow. Narrator: What does the man imply about the article?" },
  { id: 10, script: "Man: I heard you got accepted into the study abroad program in Spain. Congratulations! Woman: Thanks! I'm nervous about the language barrier, but excited about the opportunity. Narrator: How does the woman feel about the program?" },
  { id: 11, script: "Woman: The printer in the computer lab is broken again. Man: That makes three times this month. Maybe we should just get a new one. Narrator: What does the man imply?" },
  { id: 12, script: "Man: I didn't see you at the football game on Saturday. Woman: I had planned to go, but my car broke down on the way there. Narrator: What happened to the woman?" },
  { id: 13, script: "Woman: Are you going to the career workshop this afternoon? Man: I hadn't planned on it, but since you're going, I might as well tag along. Narrator: What does the man mean?" },
  { id: 14, script: "Man: I've been working on this chemistry lab report for hours, but I just can't make sense of the data. Woman: Why don't you ask the teaching assistant? She explained similar problems in last week's review session. Narrator: What does the woman suggest?" },
  { id: 15, script: "Woman: I'm thinking about changing my major to economics. Man: Really? I thought you loved psychology. What changed your mind? Narrator: What can be inferred about the woman?" },
  { id: 16, script: "Man: The tickets for the spring concert sold out in less than an hour! Woman: I'm not surprised. The band is incredibly popular on campus. Narrator: What does the woman mean?" },
  { id: 17, script: "Woman: I can't find my student ID card anywhere. I need it to check out books. Man: Have you checked the lost and found at the security office? Narrator: What does the man suggest?" },
  { id: 18, script: "Man: Are you coming to the study group tonight? Woman: I'd like to, but I promised my roommate I'd help her move furniture. Narrator: What will the woman probably do tonight?" },
  { id: 19, script: "Woman: Did you understand what Professor Chen meant by paradigm shift? Man: I was confused too, so I looked it up after class. It basically means a fundamental change in approach. Narrator: What did the man do?" },
  { id: 20, script: "Man: I heard the university is offering free guitar lessons this semester. Woman: That's great! I've always wanted to learn an instrument. Narrator: What does the woman imply?" },
  { id: 21, script: "Woman: Why didn't you come to the environmental club meeting yesterday? Man: I completely forgot about it. Was anything important discussed? Narrator: What does the man mean?" },
  { id: 22, script: "Man: Do you think Professor Martinez will extend the deadline for the research paper? Woman: Based on past experience, I wouldn't count on it. Narrator: What does the woman imply?" },
  { id: 23, script: "Woman: I'm really impressed with your presentation today. Man: Thanks! I was so nervous beforehand that I almost didn't show up. Narrator: What does the man mean?" },
  { id: 24, script: "Man: The coffee shop on campus is having a half-price sale this week. Woman: That explains why there's such a long line every morning! Narrator: What does the woman mean?" },
  { id: 25, script: "Woman: I just found out I got the summer internship at the museum! Man: That's fantastic! All your hard work applying has finally paid off. Narrator: What does the man mean?" },
  { id: 26, script: "Man: Have you started studying for finals yet? Woman: Not really. I'm still trying to catch up on all the reading I missed during the semester. Narrator: What is the woman's current situation?" },
  { id: 27, script: "Woman: I can't decide between taking statistics or calculus next semester. Man: If you're planning to go to graduate school in psychology, statistics would be more useful. Narrator: What does the man imply?" },
  { id: 28, script: "Man: Did you hear that the campus bookstore is closing permanently next month? Woman: Yes, it's unfortunate. But the online textbooks are much cheaper anyway. Narrator: What does the woman mean?" },
  { id: 29, script: "Woman: The new policy requires students to park in the remote lot and take a shuttle. Man: That's going to add at least twenty minutes to my commute. Narrator: What does the man imply?" },
  { id: 30, script: "Man: I'm thinking of dropping my physics class. Woman: Before you do, why not talk to the professor? Maybe you can get some extra help. Narrator: What does the woman suggest?" },
  
  // Part B (Questions 31-38) - Longer conversations with full speaker labels
  { id: 31, script: "Narrator: Listen to a conversation between a student and an academic advisor. Student: I'm thinking about changing my major from business to environmental science. Advisor: That's a significant change. What's driving this decision? Student: I took an environmental studies elective last semester and found it fascinating. Advisor: Have you looked at the requirements? You'll need additional biology, chemistry, and math courses. Narrator: Why does the student want to change majors?" },
  { id: 32, script: "Narrator: What does the advisor say the student will need?" },
  { id: 33, script: "Narrator: How long will it take the student to graduate after changing majors?" },
  { id: 34, script: "Narrator: What does the advisor offer to help the student find?" },
  { id: 35, script: "Narrator: Listen to a conversation between a professor and a student about a research project. Professor: So, you want to study bee populations for your senior thesis? Student: Yes, Professor. I'd like to investigate how pesticide use affects local bee populations. Professor: That's an important topic. You'll need access to several apiaries and permission from local farmers. Narrator: What is the main topic of the conversation?" },
  { id: 36, script: "Narrator: What has the student already done for the research?" },
  { id: 37, script: "Narrator: What does the professor say the student needs to do before collecting data?" },
  { id: 38, script: "Narrator: When will the professor review the student's proposal?" },
  
  // Part C (Questions 39-50) - Academic talks with speaker labels
  { id: 39, script: "Narrator: Listen to a lecture about the history of chocolate. Professor: Chocolate has a fascinating history that spans thousands of years. The story begins in Mesoamerica, where the ancient Olmec civilization first cultivated the cacao tree around 1500 BCE. The Maya later developed a bitter, spicy drink from cacao beans. Narrator: Where did the cultivation of cacao first begin?" },
  { id: 40, script: "Narrator: What does the speaker say about the Aztecs and cacao?" },
  { id: 41, script: "Narrator: How did Europeans change the chocolate drink?" },
  { id: 42, script: "Narrator: According to the lecture, what potential benefit does dark chocolate have?" },
  { id: 43, script: "Narrator: Listen to a lecture about volcanoes. Professor: Volcanoes are one of Earth's most dramatic natural phenomena. They form primarily at the boundaries of tectonic plates. There are three main types: shield volcanoes, stratovolcanoes, and cinder cones. Narrator: What is the main topic of the lecture?" },
  { id: 44, script: "Narrator: Which type of volcano has broad, gently sloping sides?" },
  { id: 45, script: "Narrator: What benefit of volcanic activity does the professor mention?" },
  { id: 46, script: "Narrator: Why do scientists monitor active volcanoes?" },
  { id: 47, script: "Narrator: Listen to a lecture about the invention of the printing press. Professor: The invention of the printing press in the 15th century revolutionized human communication. Before this invention, books were hand-copied by monks and scribes, making them extremely expensive and rare. Narrator: What problem did the printing press solve?" },
  { id: 48, script: "Narrator: What was Gutenberg's profession before inventing the printing press?" },
  { id: 49, script: "Narrator: According to the lecture, what was the first major book printed in Europe?" },
  { id: 50, script: "Narrator: What effect did the printing press have on society?" },
];

async function main() {
  console.log('🎵 Package C Audio Generator (Google TTS / Local API)');
  console.log('======================================================\n');

  console.log(`Found ${allScripts.length} audio scripts to generate.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allScripts.length; i++) {
    const { id, script } = allScripts[i];
    const filename = `pC_q${id}.wav`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists and is larger than 10KB
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 10000) {
        console.log(`[${i + 1}/${allScripts.length}] ✓ Already exists: ${filename} (${Math.round(stats.size / 1024)}KB)`);
        successCount++;
        continue;
      }
    }

    console.log(`[${i + 1}/${allScripts.length}] Generating: ${filename}`);
    console.log(`   Script: ${script.slice(0, 60)}...`);

    // Try local API first
    let success = await generateAudioViaAPI(script, outputPath);
    
    if (!success) {
      console.log('   Local API failed, trying Google TTS...');
      success = await downloadGoogleTTS(script, outputPath);
    }

    if (success) {
      const stats = fs.statSync(outputPath);
      console.log(`   ✓ Success! (${Math.round(stats.size / 1024)}KB)`);
      successCount++;
    } else {
      console.log(`   ✗ Failed!`);
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n======================================================');
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
