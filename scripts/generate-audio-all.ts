#!/usr/bin/env bun
/**
 * Generate TTS audio files for all TOEFL ITP listening questions
 * Uses z-ai CLI for text-to-speech synthesis with proper rate limiting
 * 
 * Usage: bun run scripts/generate-audio-all.ts
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const AUDIO_DIR = join(process.cwd(), 'public', 'audio');

// Create audio directory if not exists
if (!existsSync(AUDIO_DIR)) {
  mkdirSync(AUDIO_DIR, { recursive: true });
}

// Audio scripts organized by package and question ID
const allAudioScripts: Record<string, Record<number, string>> = {
  A: {
    1: "Have you seen my calculator? It was right here a minute ago. Did you look under your book? I'm always losing things that way. What does the woman imply?",
    2: "I really want to take astronomy, but my course load this spring is too heavy already. The summer session might be a good idea, since you'll be working on campus anyway. What does the man suggest the woman do?",
    3: "Professor Clark, I'd like to repeat the experiment from last class. Is there a possibility I could use the lab over the weekend? It'll be locked, but you can get the key from the security office. What does the woman imply about the man?",
    4: "I really like your sweatshirt! I don't think I've ever seen a design like that before. Yeah, it's pretty cool, isn't it? My parents were in Japan last year and brought it back for me. What does the man mean?",
    5: "Are you free tonight? I'm meeting a few friends at the restaurant on Main Street. Oh, I'd love to. But I already have dinner plans for tonight. Another time perhaps. What does the woman mean?",
    6: "I just registered for the research conference. The deadline is tomorrow. It doesn't take long though. You simply go to the conference Web site. I guess I'd better do that today, huh? What can be inferred about the man?",
    7: "That's a great bike! Where'd you get it? You know that sporting goods store on Harrison Street. They've been running tremendous sales all summer! What does the woman imply?",
    8: "So, how much was your plane ticket? More than I could really afford. I had to dip into my savings. What does the woman imply?",
    9: "Professor Jones, we had a power failure in my dorm last night, so I wasn't able to finish my paper. Could I hand it in tomorrow? I understand that things sometimes do come up, but I don't make any exceptions. What does the professor mean?",
    10: "I'm thinking of moving off-campus next semester, but since I don't have a car, I'd need to stay pretty close by. Any suggestions? It just so happens the people who live downstairs from me are moving next month. What can be inferred about the man?",
    11: "What an awful movie! A total waste of time! You can say that again! What does the woman mean?",
    12: "I hear your sister got into a prestigious university. I bet she was checking her mail every day for her acceptance letter. Yes, she was a little nervous until she found out last week. What does the man imply about his sister?",
    13: "I'm really sorry I'm late for the meeting. My car wouldn't start, and I had to take the bus. That's okay. We're still waiting for Mark. What does the woman imply?",
    14: "Wow, you seem to be in a really good mood today. What's the secret? Dunno. I guess some mornings you wake up feeling great, and some mornings you don't. What does the man mean?",
    15: "I'd think twice about taking a history class next year. There's not a single good professor in the whole history department. Look. That's what you said last semester about the sociology department. And I'm very glad I didn't pay any attention to what you said. What does the woman mean?",
    16: "I know we're supposed to meet at five in the library, but something came up unexpectedly. Would you mind changing it to six? Not at all. My schedule's very flexible. What does the man mean?",
    17: "Can you believe it? A twenty-page term paper and a final exam. What does Professor Johnson think? That we don't have any classes but his? Wait a second. I'm sure he said it was either one or the other. What does the man imply?",
    18: "I'm really happy I got that athletic scholarship, but I'm embarrassed by the big fuss all my friends are making. Well it is quite an accomplishment. Of course your friends are happy for you! What does the man mean?",
    19: "My computer screen is flashing and I can't get it to stop. Oh, a similar thing happened to me the other day. I'll bet together we can figure out what to do. What will the woman probably do next?",
    20: "There's quite a crowd at the health center today. I'm surprised so many people are interested in getting a free blood pressure test. Come to think of it, I haven't had mine checked in a while. Guess I'll go get in line. What does the man mean?",
    21: "I can't believe I actually graduated and I'm leaving tonight. I enjoyed studying with you this semester. Same here. And hey, don't forget to drop me a line once in a while. What does the woman mean?",
    22: "Look at the fancy pen I just found under this bench. It looks expensive. Oh. So THAT's where it went! What does the woman imply?",
    23: "I don't know what I was thinking of when I gave you those directions. Oh, don't worry about it. I made it before the conference began. What can be inferred from this conversation?",
    24: "Now that you've had a chance to read our proposal to renovate the campus cafe, do you think the university will approve it? Actually, I've been so busy, I haven't had a chance to look at it yet. What does the woman mean?",
    25: "Wow, I've already taken one of those pills for my headache, but it's still bothering me. Well, why not take another? The recommended dose is one or two. What does the woman suggest the man do?",
    26: "What's Phil doing here? I thought he was taking the fall semester off. Didn't you hear that his parents talked him out of it? What does the man imply about Phil?",
    27: "A florist told me that if I want to keep flowers looking fresh, I should cut a bit off the stems before putting them in water. I wonder if it really works. Someone told me the same thing and the bouquet I had did last longer. What does the woman imply?",
    28: "That was a fascinating lecture, but the questions from the audience afterward were mostly irrelevant to the topic. Yes, I totally agree. I would've preferred less of that and more of the speaker. What does the man imply?",
    29: "I just found out my dentist retired last month. Do you have one you'd recommend? Yeah. In fact, I have a checkup there next week. What does the man mean?",
    30: "Tomorrow I have my big presentation in anthropology class. I'm really worried about speaking in front of the class. You always say that, and then you always do really well. What does the woman imply?",
    // Part B - Longer conversations
    31: "Listen to a conversation between two students. So how was the singing competition last weekend? You don't wanna know. What are the students mainly discussing?",
    32: "What does the woman say about the winners of the competition?",
    33: "How did the man spend his weekend?",
    34: "What does the woman say about her weekend schedule?",
    35: "Listen to a conversation between a student and an art professor. Professor, I really like those sculptures by Brancusi. They have such simple, elegant lines. What is the conversation mainly about?",
    36: "What kind of work did Noguchi's father do?",
    37: "According to the professor, what did Noguchi learn to do when he was a child in Japan?",
    38: "What can be inferred about Noguchi's relationship with Brancusi?",
    // Part C - Academic talks
    39: "Listen to part of a lecture in a marketing class. Senses play an important role in consumer decision-making. Shoppers like to sniff a piece of fish or listen to a stereo before buying it. What is the main purpose of the lecture?",
    40: "According to the professor, what psychological feeling do shoppers tend to have when they touch an item of merchandise?",
    41: "Why does the professor mention sweaters on shelves?",
    42: "Listen to a talk in a history class. Let me warn you against a mistake that historians often make. They sometimes assume that people in the past used the same concepts we do. What is the main purpose of the talk?",
    43: "What was on the Mesopotamian tablet mentioned in the talk?",
    44: "According to the professor, what had been assumed about the Mesopotamians?",
    45: "Listen to a talk in a biology class. A really surprising discovery was made up in Canada recently. Some fossilized animal footprints they found in some sandstone there. What is the talk mainly about?",
    46: "According to the professor, what question does the discovery in Canada help answer?",
    47: "Why does the professor mention stonecutters?",
    48: "Listen to a lecture about sleep in a psychology class. Sleep is essential for our health and well-being. When we don't get enough sleep, we accumulate what scientists call sleep debt. What is the main topic of the lecture?",
    49: "Why does the speaker mention driving?",
    50: "According to the lecture, what is a circadian rhythm?"
  },
  B: {
    1: "I'm really struggling with this chemistry assignment. Have you tried visiting the tutoring center? What does the man suggest?",
    2: "I was going to order pizza, but the restaurant is closed. There's a new Thai place that delivers until midnight. What does the woman mean?",
    3: "Did you submit the application before the deadline? Just barely. I finished it five minutes before it was due. What does the man mean?",
    4: "How was your flight to London? Terrible. There was so much turbulence I thought we were going to crash. What does the woman imply about her flight?",
    5: "I can't believe how much the rent has increased. That's the housing market these days. Everything keeps going up. What does the man mean?",
    6: "Would you like to join the hiking club? I'd like to, but my weekends are completely booked. What does the woman mean?",
    7: "The professor said the exam would cover chapters five through ten. That's a relief. I thought it would be comprehensive. What does the man mean?",
    8: "I've been trying to call Dr. Smith all morning. Her line has been busy. She must be on a conference call. What does the woman imply?",
    9: "Should we take the stairs or the elevator? It's only the third floor. The stairs would be faster. What does the man suggest?",
    10: "I heard you're switching majors. Yes, I realized biology wasn't the right fit for me. What does the woman mean?",
    11: "The deadline for the scholarship application is tomorrow. I know. I've been working on my essay all week. What does the man mean?",
    12: "How was the wedding reception? It was beautiful. The bride looked absolutely stunning. What does the woman say about the wedding?",
    13: "I need to return these shoes. They don't fit properly. Do you have the receipt? What does the man ask about?",
    14: "Are you coming to the department meeting this afternoon? I have a dentist appointment at three, so I'll be late. What does the woman mean?",
    15: "I can't get this software to work on my computer. Have you checked if your operating system is compatible? What does the man suggest?",
    16: "The team won every game this season. It was an undefeated season! The coach really knew what he was doing. What does the woman imply?",
    17: "I'm not sure which elective to take next semester. Why don't you talk to your academic advisor? What does the man recommend?",
    18: "Did you hear about the power outage downtown? Yes, the traffic lights were out for hours. What happened downtown?",
    19: "I'm thinking of joining the debate team. You'd be great at it. You always have convincing arguments. What does the man mean?",
    20: "The graduation ceremony is outdoors this year. Let's hope it doesn't rain. Last year was a disaster. What does the woman imply?",
    21: "Have you seen the new art exhibition at the museum? Not yet, but I've heard it's worth seeing. What does the man mean?",
    22: "I've decided to learn Spanish. That's a great idea. It will be useful for your career in international business. Why does the woman support the decision?",
    23: "The cafeteria is so crowded today. It's always like this during lunch hour. We should come earlier next time. What does the man suggest?",
    24: "I didn't see you at the committee meeting yesterday. I had a family emergency. Why was the woman absent?",
    25: "Are you going to renew your gym membership? I haven't been in months. It would be a waste of money. What does the man mean?",
    26: "Did you finish reading the novel for literature class? I couldn't put it down. I finished it in two days. What does the woman mean?",
    27: "The research paper is due next Monday. That gives us the weekend to finish it. What does the man mean?",
    28: "Would you like to try the new restaurant downtown? I've been meaning to go there. Let's make a reservation. What does the woman mean?",
    29: "I heard you're moving to Seattle. That's the plan. I got a job offer from a tech company there. Why is the man moving?",
    30: "I'm having trouble with my computer. It keeps freezing. You should back up your files before it gets worse. What does the woman advise?",
    31: "Listen to a conversation between a student and a university housing coordinator. Hi, I'm looking for off-campus housing for next semester. Why does the student visit the housing coordinator?",
    32: "What is the student's monthly budget?",
    33: "What advantage of having a roommate is mentioned?",
    34: "What documents are needed for the application?",
    35: "Listen to a conversation between two students discussing a group project. Have you started working on the marketing presentation? What are the students discussing?",
    36: "When is the presentation due?",
    37: "Which section will Student B work on?",
    38: "Where will the students meet tomorrow?",
    39: "Listen to a lecture about the human brain. The human brain is one of the most complex organs in the body. What is the main topic of the lecture?",
    40: "What is the function of the frontal lobe?",
    41: "What can happen if the hippocampus is damaged?",
    42: "What is neuroplasticity?",
    43: "Listen to a talk about renewable energy sources. Renewable energy comes from sources that are naturally replenished. What is the main purpose of the talk?",
    44: "What is a limitation of solar energy mentioned in the talk?",
    45: "According to the talk, what advantage do offshore wind farms have?",
    46: "What is mentioned as a disadvantage of large hydropower dams?",
    47: "Listen to a lecture about the Industrial Revolution. The Industrial Revolution began in Britain in the late 18th century. When did the Industrial Revolution begin?",
    48: "Which natural resources did Britain have in abundance?",
    49: "Which industry was first to be transformed by industrialization?",
    50: "What resulted from the harsh working conditions?"
  },
  C: {
    1: "I'm thinking about taking a summer course in economics. Have you considered taking it during the regular semester instead? What does the man suggest?",
    2: "The library closes at nine tonight. I know. I need to finish this chapter before I leave. What does the woman mean?",
    3: "Did you enjoy the concert last night? It was amazing! The band played all their greatest hits. What does the woman mean?",
    4: "I can't find my keys anywhere. Have you checked your jacket pockets? You might have left them there. What does the woman suggest?",
    5: "Would you like to go to the museum exhibit with me? I'd love to, but I have to study for my exam tomorrow. What does the woman mean?",
    6: "The coffee in this cafe is excellent. It's the best I've had in a long time. What does the man mean?",
    7: "I need to return this book to the library. Don't forget it's due tomorrow. What does the woman remind the man to do?",
    8: "Are you going to the student government meeting? I wasn't planning to, but I guess I should. What does the man mean?",
    9: "The professor's lecture was so confusing. I couldn't follow his explanation at all. What does the woman mean?",
    10: "I heard you got a promotion. Congratulations! Thank you. It was a pleasant surprise. What does the man mean?",
    11: "Should we study together for the final? That sounds like a good idea. When should we meet? What does the woman suggest?",
    12: "The new restaurant downtown is supposed to be great. I've heard mixed reviews about it. What does the woman mean?",
    13: "I can't believe how fast this semester went by. It seems like it just started yesterday. What does the man mean?",
    14: "Would you mind if I borrowed your notes from yesterday's class? Not at all. Let me get them for you. What does the woman mean?",
    15: "I'm having trouble with my research paper. Have you talked to your advisor about it? What does the man suggest?",
    16: "The weather forecast says it's going to rain tomorrow. I hope they're wrong. I was planning a picnic. What does the woman mean?",
    17: "Did you submit your application for the study abroad program? I'm still working on it. The deadline is next week. What does the man mean?",
    18: "This textbook is really expensive. Have you looked for a used copy online? What does the woman suggest?",
    19: "I'm thinking about changing my major. That's a big decision. Have you talked to your parents about it? What does the man imply?",
    20: "The campus bookstore is having a sale this week. I heard. I need to get some supplies. What does the woman mean?",
    21: "I didn't do well on the test. Don't worry about it. There's always next time. What does the woman mean?",
    22: "Are you coming to the party on Saturday? I wouldn't miss it for the world. What does the man mean?",
    23: "I need to find an apartment near campus. The housing office has a list of available places. What does the woman suggest?",
    24: "The professor extended the deadline for our paper. That's a relief. I was worried I wouldn't finish in time. What does the man mean?",
    25: "Would you like to join our study group? I'd be happy to. When do you usually meet? What does the woman mean?",
    26: "I can't find a parking space anywhere. You might want to try the lot behind the gym. What does the man suggest?",
    27: "The food in the cafeteria has improved. It's much better than it was last year. What does the woman mean?",
    28: "I'm thinking about getting a part-time job. The career center has listings for student positions. What does the man suggest?",
    29: "Did you hear about the new policy? Yes, it's going to affect everyone on campus. What does the woman mean?",
    30: "I need help with my computer. Have you tried contacting the IT help desk? What does the man suggest?",
    31: "Listen to a conversation between a student and an advisor. I'm thinking about changing my major from business to environmental science. Why does the student want to change majors?",
    32: "What concerns does the advisor express?",
    33: "How many more credits does the student need?",
    34: "What does the advisor suggest?",
    35: "Listen to a conversation between a student and a professor. I'd like to ask about the research project. What is the conversation mainly about?",
    36: "What is the student's concern?",
    37: "What does the professor suggest?",
    38: "What will the student probably do next?",
    39: "Listen to a lecture about the history of chocolate. Chocolate has a rich history that spans thousands of years. What is the main topic of the lecture?",
    40: "Where did chocolate originate?",
    41: "How did the Spanish change chocolate?",
    42: "When did chocolate become widely available in Europe?",
    43: "Listen to a talk about volcanoes. Volcanoes are openings in the Earth's surface. What is the main purpose of the talk?",
    44: "What determines a volcano's shape?",
    45: "Why are volcanoes sometimes beneficial?",
    46: "What warning signs of volcanic eruption are mentioned?",
    47: "Listen to a lecture about the invention of the printing press. The printing press was invented by Johannes Gutenberg. What is the main topic of the lecture?",
    48: "What was unique about Gutenberg's invention?",
    49: "How did the printing press change society?",
    50: "What happened to the price of books after the printing press?"
  },
  D: {
    1: "I'm having trouble with my chemistry assignment. Have you gone to the tutoring center? What does the man suggest?",
    2: "The library is closing in ten minutes. I need to check out these books first. What does the woman mean?",
    3: "Did you like the movie last night? It wasn't what I expected. What does the man mean?",
    4: "I'm planning to visit my parents this weekend. That sounds nice. How often do you get to see them? What does the woman ask about?",
    5: "The new student center is really impressive. It has everything we need. What does the woman mean?",
    6: "I need to drop this class. Have you talked to your advisor about it? What does the man suggest?",
    7: "Are you going to the career fair tomorrow? I hadn't planned on it, but maybe I should. What does the woman mean?",
    8: "This textbook is really helpful. I agree. The examples are very clear. What does the man mean?",
    9: "I can't decide between these two courses. What are the pros and cons of each? What does the woman suggest?",
    10: "The professor's office hours are at three. I have a class then. Can I make an appointment? What does the man ask about?",
    11: "I heard you're graduating early. Yes, I took summer courses to finish ahead of schedule. What does the woman mean?",
    12: "Should we form a study group? That's a great idea. We can meet at the library. What does the man suggest?",
    13: "I'm worried about the final exam. Don't be. You've been studying all semester. What does the woman mean?",
    14: "The new gym has great equipment. I haven't been there yet. Want to go together sometime? What does the man suggest?",
    15: "I need to find a roommate for next semester. Have you tried the housing board? What does the woman suggest?",
    16: "Are you coming to the department picnic? I wouldn't miss it. What does the man mean?",
    17: "I can't believe how much reading we have. I know. I've been spending hours in the library. What does the woman mean?",
    18: "The bus schedule has changed. I didn't know that. Thanks for telling me. What does the man mean?",
    19: "I'm looking for a summer internship. The career center has many listings. What does the woman suggest?",
    20: "Did you finish the group project? We're almost done. Just need to review everything. What does the man mean?",
    21: "I'm thinking about joining a club. There are so many to choose from. What does the woman mean?",
    22: "The deadline for the scholarship is Friday. I know. I'm working on my application now. What does the man mean?",
    23: "Would you like to get coffee sometime? I'd like that. What does the woman mean?",
    24: "I can't find my student ID card. Have you checked your backpack? What does the man suggest?",
    25: "The cafeteria menu has changed. I noticed. The options are better now. What does the woman mean?",
    26: "Are you going to the lecture this afternoon? I'm not sure. I have a lot of work to do. What does the man mean?",
    27: "I need to return this library book. It's due tomorrow. Don't forget to renew it if you need more time. What does the woman remind the man?",
    28: "The professor posted the exam results. I got a better grade than I expected. What does the man mean?",
    29: "I'm thinking about buying a laptop. What features are you looking for? What does the woman ask about?",
    30: "The campus concert was excellent. The band played for over two hours. What does the man mean?",
    31: "Listen to a conversation between a student and a librarian. I'm looking for sources for my research paper on renewable energy. Why does the student visit the librarian?",
    32: "What is the student's research topic?",
    33: "What does the librarian suggest?",
    34: "What will the student probably do next?",
    35: "Listen to a conversation between two students. Have you started the presentation on social media? What are the students mainly discussing?",
    36: "What is the focus of their presentation?",
    37: "What do they need to include?",
    38: "When will they meet again?",
    39: "Listen to a lecture about neutron stars. Neutron stars are among the most fascinating objects in the universe. What is the main topic of the lecture?",
    40: "How are neutron stars formed?",
    41: "What makes neutron stars unique?",
    42: "What are pulsars?",
    43: "Listen to a talk about inflation in economics. Inflation is a general increase in prices over time. What is the main purpose of the talk?",
    44: "What causes inflation?",
    45: "How does inflation affect consumers?",
    46: "How can governments control inflation?",
    47: "Listen to a lecture about coral reefs. Coral reefs are among the most diverse ecosystems on Earth. What is the main topic of the lecture?",
    48: "Why are coral reefs important?",
    49: "What threatens coral reefs?",
    50: "What can be done to protect coral reefs?"
  }
};

// Helper to escape quotes for command line
function escapeForCLI(text: string): string {
  return text.replace(/"/g, '\\"').replace(/\n/g, ' ');
}

// Generate audio for a single question
function generateAudio(pkg: string, id: number, audioScript: string): boolean {
  const filename = `listening_${pkg}_q${id}.wav`;
  const outputPath = join(AUDIO_DIR, filename);
  
  if (existsSync(outputPath)) {
    console.log(`  ✓ ${filename} (exists)`);
    return true;
  }
  
  try {
    const text = audioScript.length > 500 
      ? audioScript.substring(0, 500) + '...' 
      : audioScript;
    
    execSync(
      `z-ai tts -i "${escapeForCLI(text)}" -o "${outputPath}" -f wav`,
      { timeout: 30000, stdio: 'pipe' }
    );
    
    console.log(`  ✓ ${filename}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${filename} (failed)`);
    return false;
  }
}

// Delay helper
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  console.log('🎤 Generating Audio Files for TOEFL ITP Questions');
  console.log('='.repeat(50));
  console.log(`Output: ${AUDIO_DIR}`);
  console.log('');
  
  let totalGenerated = 0;
  let totalFailed = 0;
  
  for (const [pkg, questions] of Object.entries(allAudioScripts)) {
    console.log(`\n📦 Package ${pkg}:`);
    
    const ids = Object.keys(questions).map(Number).sort((a, b) => a - b);
    let pkgGenerated = 0;
    let pkgFailed = 0;
    
    for (const id of ids) {
      const success = generateAudio(pkg, id, questions[id]);
      if (success) {
        pkgGenerated++;
        totalGenerated++;
      } else {
        pkgFailed++;
        totalFailed++;
      }
      
      // Small delay to avoid rate limiting
      await delay(500);
    }
    
    console.log(`   Package ${pkg} complete: ${pkgGenerated} ok, ${pkgFailed} failed`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Total generated: ${totalGenerated}`);
  console.log(`   Total failed: ${totalFailed}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
