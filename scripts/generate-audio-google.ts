// Script to generate audio files using Google Translate TTS (free)
// Run with: bun run scripts/generate-audio-google.ts

import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');

// Package B Listening Questions
const packageBListening = [
  // PART A - Short Conversations (30 questions)
  { id: 1, part: 'A', audioScript: "I'm really struggling with this chemistry assignment. Have you tried visiting the tutoring center? What does the man suggest?" },
  { id: 2, part: 'A', audioScript: "I was going to order pizza, but the restaurant is closed. There's a new Thai place that delivers until midnight. What does the woman mean?" },
  { id: 3, part: 'A', audioScript: 'Did you submit the application before the deadline? Just barely. I finished it five minutes before it was due. What does the man mean?' },
  { id: 4, part: 'A', audioScript: 'How was your flight to London? Terrible. There was so much turbulence I thought we were going to crash. What does the woman imply about her flight?' },
  { id: 5, part: 'A', audioScript: "I can't believe how much the rent has increased. That's the housing market these days. Everything keeps going up. What does the man mean?" },
  { id: 6, part: 'A', audioScript: "Would you like to join the hiking club? I'd like to, but my weekends are completely booked. What does the woman mean?" },
  { id: 7, part: 'A', audioScript: "The professor said the exam would cover chapters five through ten. That's a relief. I thought it would be comprehensive. What does the man mean?" },
  { id: 8, part: 'A', audioScript: "I've been trying to call Dr. Smith all morning. Her line has been busy. She must be on a conference call. What does the woman imply?" },
  { id: 9, part: 'A', audioScript: "Should we take the stairs or the elevator? It's only the third floor. The stairs would be faster. What does the man suggest?" },
  { id: 10, part: 'A', audioScript: "I heard you're switching majors. Yes, I realized biology wasn't the right fit for me. What does the woman mean?" },
  { id: 11, part: 'A', audioScript: "The deadline for the scholarship application is tomorrow. I know. I've been working on my essay all week. What does the man mean?" },
  { id: 12, part: 'A', audioScript: 'How was the wedding reception? It was beautiful. The bride looked absolutely stunning. What does the woman say about the wedding?' },
  { id: 13, part: 'A', audioScript: "I need to return these shoes. They don't fit properly. Do you have the receipt? What does the man ask about?" },
  { id: 14, part: 'A', audioScript: 'Are you coming to the department meeting this afternoon? I have a dentist appointment at three, so I\'ll be late. What does the woman mean?' },
  { id: 15, part: 'A', audioScript: "I can't get this software to work on my computer. Have you checked if your operating system is compatible? What does the man suggest?" },
  { id: 16, part: 'A', audioScript: 'The team won every game this season. It was an undefeated season! The coach really knew what he was doing. What does the woman imply?' },
  { id: 17, part: 'A', audioScript: "I'm not sure which elective to take next semester. Why don't you talk to your academic advisor? What does the man recommend?" },
  { id: 18, part: 'A', audioScript: 'Did you hear about the power outage downtown? Yes, the traffic lights were out for hours. It caused a huge traffic jam. What happened downtown?' },
  { id: 19, part: 'A', audioScript: "I'm thinking of joining the debate team. You'd be great at it. You always have convincing arguments. What does the man mean?" },
  { id: 20, part: 'A', audioScript: 'The graduation ceremony is outdoors this year. Let\'s hope it doesn\'t rain. Last year was a disaster. What does the woman imply?' },
  { id: 21, part: 'A', audioScript: "Have you seen the new art exhibition at the museum? Not yet, but I've heard it's worth seeing. What does the man mean?" },
  { id: 22, part: 'A', audioScript: "I've decided to learn Spanish. That's a great idea. It will be useful for your career in international business. Why does the woman support the decision?" },
  { id: 23, part: 'A', audioScript: 'The cafeteria is so crowded today. It\'s always like this during lunch hour. We should come earlier next time. What does the man suggest?' },
  { id: 24, part: 'A', audioScript: "I didn't see you at the committee meeting yesterday. I had a family emergency. I'll get the minutes from Sarah. Why was the woman absent?" },
  { id: 25, part: 'A', audioScript: 'Are you going to renew your gym membership? I haven\'t been in months. It would be a waste of money. What does the man mean?' },
  { id: 26, part: 'A', audioScript: 'Did you finish reading the novel for literature class? I couldn\'t put it down. I finished it in two days. What does the woman mean?' },
  { id: 27, part: 'A', audioScript: 'The research paper is due next Monday. That gives us the weekend to finish it. What does the man mean?' },
  { id: 28, part: 'A', audioScript: "Would you like to try the new restaurant downtown? I've been meaning to go there. Let's make a reservation. What does the woman mean?" },
  { id: 29, part: 'A', audioScript: "I heard you're moving to Seattle. That's the plan. I got a job offer from a tech company there. Why is the man moving?" },
  { id: 30, part: 'A', audioScript: "I'm having trouble with my computer. It keeps freezing. You should back up your files before it gets worse. What does the woman advise?" },

  // PART B - Longer Conversations (8 questions)
  { id: 31, part: 'B', audioScript: "Listen to a conversation between a student and a university housing coordinator. Hi, I'm looking for off-campus housing for next semester. Can you help me? Of course. We maintain a list of approved apartments near campus. What's your budget? I can afford around eight hundred dollars a month, including utilities. That should get you a studio or a shared apartment. Have you considered having a roommate? I'd prefer living alone, but I'm open to it if it means a better place. Roommates can significantly reduce costs. We also have a roommate matching service. That sounds helpful. What documents do I need to apply? You'll need proof of income or a guarantor, and your student ID. Most landlords also require a security deposit. Why does the student visit the housing coordinator?" },
  { id: 32, part: 'B', audioScript: "What is the student's monthly budget?" },
  { id: 33, part: 'B', audioScript: "What advantage of having a roommate is mentioned?" },
  { id: 34, part: 'B', audioScript: "What documents are needed for the application?" },
  { id: 35, part: 'B', audioScript: "Listen to a conversation between two students discussing a group project. Have you started working on the marketing presentation? Not yet. I've been focusing on the research paper. When is it due? Next Thursday. We should divide the work among the four of us. What sections need to be covered? Market analysis, competitor research, marketing strategy, and financial projections. I'm good with numbers, so I can handle the financial projections. Perfect. I'll do the market analysis. We should meet tomorrow to assign the other sections. Let's meet at the library at three o'clock. The study rooms are quieter there. What are the students discussing?" },
  { id: 36, part: 'B', audioScript: "When is the presentation due?" },
  { id: 37, part: 'B', audioScript: "Which section will Student B work on?" },
  { id: 38, part: 'B', audioScript: "Where will the students meet tomorrow?" },

  // PART C - Academic Talks (12 questions)
  { id: 39, part: 'C', audioScript: "Listen to a lecture about the human brain. The human brain is one of the most complex organs in the body. Weighing approximately three pounds, it contains about 86 billion neurons, each connected to thousands of other neurons. This intricate network is responsible for our thoughts, memories, emotions, and bodily functions. The brain is divided into several regions, each with specific functions. The frontal lobe, located at the front of the brain, is responsible for reasoning, planning, and voluntary movement. The temporal lobe, on the sides, processes auditory information and plays a crucial role in memory formation. The hippocampus, a small structure deep within the brain, is essential for forming new memories. Damage to this area can result in amnesia, the inability to create new memories. Interestingly, the hippocampus is one of the few brain regions where new neurons continue to form throughout life, a process called neurogenesis. Recent research has shown that the brain remains plastic throughout life. This neuroplasticity allows the brain to reorganize itself by forming new neural connections, which is essential for learning and recovery from brain injuries. What is the main topic of the lecture?" },
  { id: 40, part: 'C', audioScript: "What is the function of the frontal lobe?" },
  { id: 41, part: 'C', audioScript: "What can happen if the hippocampus is damaged?" },
  { id: 42, part: 'C', audioScript: "What is neuroplasticity?" },
  { id: 43, part: 'C', audioScript: "Listen to a talk about renewable energy sources. Renewable energy comes from sources that are naturally replenished on a human timescale. Unlike fossil fuels, which take millions of years to form, renewable sources provide a sustainable alternative for meeting our energy needs while reducing environmental impact. Solar energy harnesses the power of the sun through photovoltaic cells or solar thermal collectors. The cost of solar panels has decreased dramatically over the past decade, making it increasingly competitive with traditional energy sources. However, solar energy production depends on weather conditions and daylight hours. Wind energy is another rapidly growing renewable source. Wind turbines convert the kinetic energy of wind into electricity. Offshore wind farms, located in bodies of water, can capture stronger and more consistent winds than land-based installations. Denmark generates over 40 percent of its electricity from wind power. Hydropower, generated from moving water, remains the largest source of renewable electricity globally. While it produces minimal greenhouse gas emissions during operation, large dams can disrupt local ecosystems and displace communities. Small-scale hydropower projects offer a more environmentally friendly alternative. What is the main purpose of the talk?" },
  { id: 44, part: 'C', audioScript: "What is a limitation of solar energy mentioned in the talk?" },
  { id: 45, part: 'C', audioScript: "According to the talk, what advantage do offshore wind farms have?" },
  { id: 46, part: 'C', audioScript: "What is mentioned as a disadvantage of large hydropower dams?" },
  { id: 47, part: 'C', audioScript: "Listen to a lecture about the Industrial Revolution. The Industrial Revolution, which began in Britain in the late 18th century, marked a fundamental shift in human history. It transformed economies from agricultural to industrial, changing how goods were produced and how people lived and worked. Several factors contributed to Britain's leading role in industrialization. The country had abundant coal and iron deposits, essential for powering steam engines and building machinery. Britain also had a strong banking system that provided capital for investment, and a vast colonial empire that supplied raw materials and markets for finished goods. The textile industry was among the first to be transformed. The invention of the spinning jenny and the power loom dramatically increased cloth production. Factories replaced cottage industries, and workers moved from rural areas to cities seeking employment. The social consequences were profound. Working conditions in factories were often harsh, with long hours and low wages. Child labor was common, and cities became overcrowded. These conditions eventually led to labor reforms and the rise of labor unions, which advocated for better working conditions and workers' rights. When did the Industrial Revolution begin?" },
  { id: 48, part: 'C', audioScript: "Which natural resources did Britain have in abundance?" },
  { id: 49, part: 'C', audioScript: "Which industry was first to be transformed by industrialization?" },
  { id: 50, part: 'C', audioScript: "What resulted from the harsh working conditions?" },
];

async function downloadTTS(text: string, outputPath: string): Promise<boolean> {
  try {
    // Use Google Translate TTS endpoint (free, no auth required)
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=en&client=tw-ob`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(outputPath, buffer);
    return true;
  } catch (error) {
    return false;
  }
}

async function generateAudio() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating audio for ${packageBListening.length} questions...`);
  console.log('Using Google Translate TTS (free)\n');
  
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < packageBListening.length; i++) {
    const question = packageBListening[i];
    
    // Calculate the audio filename
    let audioFilename: string;
    if (question.part === 'A') {
      audioFilename = `package_B_part_A_q${question.id}.wav`;
    } else if (question.part === 'B') {
      const partBIndex = question.id - 30;
      audioFilename = `package_B_part_B_q${partBIndex}.wav`;
    } else {
      const partCIndex = question.id - 38;
      audioFilename = `package_B_part_C_q${partCIndex}.wav`;
    }
    
    const outputPath = path.join(OUTPUT_DIR, audioFilename);
    
    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`[${i + 1}/${packageBListening.length}] Skipped (exists): ${audioFilename}`);
      successCount++;
      continue;
    }

    try {
      console.log(`[${i + 1}/${packageBListening.length}] Generating: ${audioFilename}`);
      
      // Truncate text if too long
      let text = question.audioScript;
      if (text.length > 200) {
        text = text.slice(0, 200) + '...';
        console.log(`  Warning: Text truncated to 200 chars (Google TTS limit)`);
      }

      const success = await downloadTTS(text, outputPath);
      
      if (success) {
        console.log(`  ✓ Saved: ${audioFilename}`);
        successCount++;
      } else {
        throw new Error('Download failed');
      }
      
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error: any) {
      console.error(`  ✗ Error: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

// Run the script
generateAudio().catch(console.error);
