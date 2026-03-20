// Script to regenerate Package C audio with speaker prefixes
// Uses the conversation field which already has "Man:", "Woman:", "Narrator:" prefixes
// Run with: bun run scripts/regenerate-package-c-audio.ts

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio', 'package_C');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Part A Conversations (Questions 1-30) - Short conversations
// Format: "Woman: ... Man: ..." with Narrator for question
const partAConversations: { id: number; script: string }[] = [
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
  { id: 14, script: "Man: I've been working on this chemistry lab report for hours, but I just can't make sense of the data. Woman: Why don't you ask the teaching assistant? She explained similar problems in last week's review session. Narrator: What does the woman suggest?" },
  { id: 15, script: "Woman: I'm thinking about changing my major to economics. Man: Really? I thought you loved psychology. What changed your mind? Narrator: What can be inferred about the woman?" },
  { id: 16, script: "Man: The tickets for the spring concert sold out in less than an hour! Woman: I'm not surprised. The band is incredibly popular on campus. Narrator: What does the woman mean?" },
  { id: 17, script: "Woman: I can't find my student ID card anywhere. I need it to check out books. Man: Have you checked the lost and found at the security office? Narrator: What does the man suggest?" },
  { id: 18, script: "Man: Are you coming to the study group tonight? Woman: I'd like to, but I promised my roommate I'd help her move furniture. Narrator: What will the woman probably do tonight?" },
  { id: 19, script: "Woman: Did you understand what Professor Chen meant by 'paradigm shift'? Man: I was confused too, so I looked it up after class. It basically means a fundamental change in approach. Narrator: What did the man do?" },
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
];

// Part B Conversations (Questions 31-38) - Longer conversations
const partBConversation1 = "Narrator: Listen to a conversation between a student and an academic advisor. Student: I'm thinking about changing my major from business to environmental science. Advisor: That's a significant change. What's driving this decision? Student: I took an environmental studies elective last semester and found it fascinating. I've realized that I want to work on climate change issues, not sit in an office all day. Advisor: That's a great reason. Have you looked at the requirements for environmental science? You'll need additional biology, chemistry, and math courses. Student: I have. It will probably take me an extra semester to graduate, but I think it's worth it. Advisor: That's realistic. Let me help you plan out your courses so you can transition smoothly. Also, there are several environmental internships available this summer that could give you experience in the field. Student: That sounds perfect. I'd love to get some hands-on experience.";

const partBQuestions1 = [
  { id: 31, script: partBConversation1 + " Narrator: Why does the student want to change majors?" },
  { id: 32, script: "Narrator: What does the advisor say the student will need?" },
  { id: 33, script: "Narrator: How long will it take the student to graduate after changing majors?" },
  { id: 34, script: "Narrator: What does the advisor offer to help the student find?" },
];

const partBConversation2 = "Narrator: Listen to a conversation between a professor and a student about a research project. Professor: So, you want to study bee populations for your senior thesis? Student: Yes, Professor. I've been reading about colony collapse disorder, and I'd like to investigate how pesticide use affects local bee populations. Professor: That's an important topic. Have you thought about your methodology? You'll need access to several apiaries and permission from local farmers. Student: I've already contacted three beekeepers who are willing to let me study their hives. I'm also planning to survey farmers about their pesticide use. Professor: Excellent preparation. You'll need to submit your proposal to the ethics committee before you can begin data collection. Student: I've drafted the proposal. Would you be willing to review it before I submit it? Professor: Of course. Bring it to my office hours on Thursday, and we'll go over it together.";

const partBQuestions2 = [
  { id: 35, script: partBConversation2 + " Narrator: What is the main topic of the conversation?" },
  { id: 36, script: "Narrator: What has the student already done for the research?" },
  { id: 37, script: "Narrator: What does the professor say the student needs to do before collecting data?" },
  { id: 38, script: "Narrator: When will the professor review the student's proposal?" },
];

// Part C Talks (Questions 39-50) - Academic talks
const partCTalk1 = "Narrator: Listen to a lecture about the history of chocolate. Professor: Chocolate has a fascinating history that spans thousands of years. The story begins in Mesoamerica, where the ancient Olmec civilization first cultivated the cacao tree around 1500 BCE. The Olmecs were followed by the Maya, who developed a bitter, spicy drink made from ground cacao beans, water, and chili peppers. This drink was called 'xocolatl,' which means 'bitter water.' The Aztecs later adopted cacao and considered it a gift from the gods. Cacao beans became so valuable that they were used as currency. When Spanish conquistadors arrived in the 16th century, they brought cacao back to Europe. However, Europeans found the bitter drink unappealing until they added sugar and milk. By the 19th century, technological advances made it possible to produce solid chocolate. In 1847, the first chocolate bar was created in England. Today, chocolate is a billion-dollar industry, with the average person consuming about 3 kilograms per year. Interestingly, recent research suggests that dark chocolate, consumed in moderation, may have health benefits due to its antioxidant content.";

const partCQuestions1 = [
  { id: 39, script: partCTalk1 + " Narrator: Where did the cultivation of cacao first begin?" },
  { id: 40, script: "Narrator: What does the speaker say about the Aztecs and cacao?" },
  { id: 41, script: "Narrator: How did Europeans change the chocolate drink?" },
  { id: 42, script: "Narrator: According to the lecture, what potential benefit does dark chocolate have?" },
];

const partCTalk2 = "Narrator: Listen to a lecture about volcanoes. Professor: Volcanoes are one of Earth's most dramatic natural phenomena. They form primarily at the boundaries of tectonic plates, where molten rock called magma rises to the surface. There are three main types of volcanoes: shield volcanoes, stratovolcanoes, and cinder cones. Shield volcanoes, like those in Hawaii, have broad, gently sloping sides formed by flowing lava. Stratovolcanoes, also called composite volcanoes, have steep sides and are built from alternating layers of lava and ash. Famous examples include Mount Fuji in Japan and Mount St. Helens in the United States. Cinder cones are the smallest type, formed from volcanic debris. Volcanic eruptions can be devastating, but they also bring benefits. Volcanic soil is extremely fertile, which is why many people live near active volcanoes despite the risks. Additionally, volcanic activity creates geothermal energy, a renewable power source. Scientists monitor active volcanoes closely to predict eruptions and protect nearby populations.";

const partCQuestions2 = [
  { id: 43, script: partCTalk2 + " Narrator: What is the main topic of the lecture?" },
  { id: 44, script: "Narrator: Which type of volcano has broad, gently sloping sides?" },
  { id: 45, script: "Narrator: What benefit of volcanic activity does the professor mention?" },
  { id: 46, script: "Narrator: Why do scientists monitor active volcanoes?" },
];

const partCTalk3 = "Narrator: Listen to a lecture about the invention of the printing press. Professor: The invention of the printing press in the 15th century revolutionized human communication. Before this invention, books were hand-copied by monks and scribes, making them extremely expensive and rare. Only the wealthiest individuals and institutions could afford to own books. Around 1440, Johannes Gutenberg, a German goldsmith, developed a printing press that used movable metal type. This invention allowed books to be produced quickly and cheaply. Gutenberg's famous Bible, completed around 1455, was the first major book printed in Europe using this technology. The impact of the printing press was enormous. Literacy rates increased dramatically as books became more affordable. Ideas could spread rapidly across Europe, leading to the Renaissance, the Protestant Reformation, and the Scientific Revolution. The printing press is often considered one of the most important inventions in human history, laying the foundation for the information age we live in today.";

const partCQuestions3 = [
  { id: 47, script: partCTalk3 + " Narrator: What problem did the printing press solve?" },
  { id: 48, script: "Narrator: What was Gutenberg's profession before inventing the printing press?" },
  { id: 49, script: "Narrator: According to the lecture, what was the first major book printed in Europe?" },
  { id: 50, script: "Narrator: What effect did the printing press have on society?" },
];

// Combine all scripts
const allScripts = [
  ...partAConversations,
  ...partBQuestions1,
  ...partBQuestions2,
  ...partCQuestions1,
  ...partCQuestions2,
  ...partCQuestions3,
];

// Generate audio file using z-ai CLI
function generateAudio(script: string, outputPath: string): boolean {
  try {
    // Use z-ai CLI to generate TTS
    const escapedScript = script.replace(/"/g, '\\"').replace(/`/g, '\\`');
    execSync(`z-ai tts -i "${escapedScript}" -o "${outputPath}" --voice tongtong --speed 1.0 --format wav`, {
      timeout: 120000,
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
  console.log('🎵 Package C Audio Regenerator (with Speaker Prefixes)');
  console.log('======================================================\n');

  console.log(`Found ${allScripts.length} audio scripts to generate.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allScripts.length; i++) {
    const { id, script } = allScripts[i];
    const filename = `pC_q${id}.wav`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists and is larger than 5KB
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 5000) {
        console.log(`[${i + 1}/${allScripts.length}] ✓ Already exists: ${filename} (${Math.round(stats.size / 1024)}KB)`);
        successCount++;
        continue;
      } else {
        console.log(`[${i + 1}/${allScripts.length}] ⚠ File too small, regenerating: ${filename}`);
      }
    }

    console.log(`[${i + 1}/${allScripts.length}] Generating: ${filename}`);
    console.log(`   Script preview: ${script.slice(0, 80)}...`);

    const success = generateAudio(script, outputPath);

    if (success) {
      const stats = fs.statSync(outputPath);
      console.log(`   ✓ Success! (${Math.round(stats.size / 1024)}KB)`);
      successCount++;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      console.log(`   ✗ Failed!`);
      failCount++;
      
      // Longer delay on failure
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log('\n======================================================');
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
