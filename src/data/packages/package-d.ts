// TOEFL ITP Package D - Practice Questions
// Contains 140 questions: 50 Listening, 40 Structure, 50 Reading
// All questions are different from Packages A, B, and C

export interface ListeningQuestion {
  id: number;
  part: 'A' | 'B' | 'C';
  conversation?: string;
  talk?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  audioScript: string;
}

export interface StructureQuestion {
  id: number;
  type: 'structure' | 'written';
  sentence: string;
  options?: string[];
  underlinedParts?: string[];
  correctAnswer: number;
}

export interface ReadingPassage {
  id: number;
  title: string;
  text: string;
  questions: ReadingQuestion[];
}

export interface ReadingQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuestionPackage {
  id: string;
  name: string;
  description: string;
  listening: ListeningQuestion[];
  structure: StructureQuestion[];
  reading: ReadingPassage[];
}

// =============================================
// LISTENING SECTION - 50 Questions
// =============================================

const listening: ListeningQuestion[] = [
  // ==========================================
  // PART A - Short Conversations (30 questions)
  // ==========================================
  {
    id: 1,
    part: 'A',
    conversation: 'Woman: I heard you dropped your chemistry class. Was it too difficult?\nMan: Actually, it conflicted with my work schedule at the bookstore.',
    question: 'Why did the man drop the chemistry class?',
    options: [
      'The class was too hard.',
      'He had a scheduling conflict.',
      'He needed to work more hours.',
      'The professor was unavailable.'
    ],
    correctAnswer: 1,
    audioScript: 'I heard you dropped your chemistry class. Was it too difficult? Actually, it conflicted with my work schedule at the bookstore. Why did the man drop the chemistry class?'
  },
  {
    id: 2,
    part: 'A',
    conversation: 'Man: The university is building a new recreation center next to the gym.\nWoman: Finally! I\'ve been waiting for better facilities since my freshman year.',
    question: 'What does the woman imply?',
    options: [
      'She doesn\'t like the current gym.',
      'She wants the new center to open immediately.',
      'She has been waiting a long time for this.',
      'She thinks the project is too expensive.'
    ],
    correctAnswer: 2,
    audioScript: 'The university is building a new recreation center next to the gym. Finally! I\'ve been waiting for better facilities since my freshman year. What does the woman imply?'
  },
  {
    id: 3,
    part: 'A',
    conversation: 'Woman: Would you mind if I borrowed your notes from yesterday\'s lecture?\nMan: Sure, but I should warn you my handwriting is terrible.',
    question: 'What does the man mean?',
    options: [
      'He doesn\'t want to lend his notes.',
      'His notes may be difficult to read.',
      'He didn\'t attend the lecture.',
      'He left his notes at home.'
    ],
    correctAnswer: 1,
    audioScript: 'Would you mind if I borrowed your notes from yesterday\'s lecture? Sure, but I should warn you my handwriting is terrible. What does the man mean?'
  },
  {
    id: 4,
    part: 'A',
    conversation: 'Man: I need to return this library book, but the library closes at five today.\nWoman: I\'m heading that direction anyway. I can drop it off for you.',
    question: 'What will the woman probably do?',
    options: [
      'Go to the library with the man.',
      'Return the book for the man.',
      'Ask the man to return the book later.',
      'Remind the man about the library hours.'
    ],
    correctAnswer: 1,
    audioScript: 'I need to return this library book, but the library closes at five today. I\'m heading that direction anyway. I can drop it off for you. What will the woman probably do?'
  },
  {
    id: 5,
    part: 'A',
    conversation: 'Woman: Professor Martinez said the exam would cover chapters one through five.\nMan: That\'s a relief! I thought we\'d be tested on the whole book.',
    question: 'What does the man mean?',
    options: [
      'He is worried about the exam.',
      'He has read the whole book.',
      'He feels better about the exam scope.',
      'He thinks the exam will be easy.'
    ],
    correctAnswer: 2,
    audioScript: 'Professor Martinez said the exam would cover chapters one through five. That\'s a relief! I thought we\'d be tested on the whole book. What does the man mean?'
  },
  {
    id: 6,
    part: 'A',
    conversation: 'Man: I\'m thinking about applying to graduate school in the fall.\nWoman: You\'d better get started on your applications. The deadlines are coming up fast.',
    question: 'What does the woman suggest?',
    options: [
      'The man should wait until next year.',
      'The man needs to act quickly.',
      'Graduate school is not a good idea.',
      'The deadlines have already passed.'
    ],
    correctAnswer: 1,
    audioScript: 'I\'m thinking about applying to graduate school in the fall. You\'d better get started on your applications. The deadlines are coming up fast. What does the woman suggest?'
  },
  {
    id: 7,
    part: 'A',
    conversation: 'Woman: The cafeterias are always so crowded during lunch hour.\nMan: Tell me about it! I\'ve started eating at eleven just to avoid the rush.',
    question: 'What does the man mean?',
    options: [
      'He doesn\'t eat lunch anymore.',
      'He dislikes the cafeteria food.',
      'He has changed his eating schedule.',
      'He thinks the crowds are improving.'
    ],
    correctAnswer: 2,
    audioScript: 'The cafeterias are always so crowded during lunch hour. Tell me about it! I\'ve started eating at eleven just to avoid the rush. What does the man mean?'
  },
  {
    id: 8,
    part: 'A',
    conversation: 'Man: I can\'t find my student ID card anywhere. I need it for the exam tomorrow.\nWoman: Have you checked the lost and found at the security office?',
    question: 'What does the woman suggest the man do?',
    options: [
      'Apply for a new ID card.',
      'Look for his card at security.',
      'Ask the professor for permission.',
      'Search his dormitory room.'
    ],
    correctAnswer: 1,
    audioScript: 'I can\'t find my student ID card anywhere. I need it for the exam tomorrow. Have you checked the lost and found at the security office? What does the woman suggest the man do?'
  },
  {
    id: 9,
    part: 'A',
    conversation: 'Woman: That was the best concert I\'ve attended all year!\nMan: I know! And the tickets were surprisingly affordable too.',
    question: 'What do the speakers agree about?',
    options: [
      'The concert was expensive.',
      'The concert was excellent.',
      'The tickets were hard to get.',
      'The performance was disappointing.'
    ],
    correctAnswer: 1,
    audioScript: 'That was the best concert I\'ve attended all year! I know! And the tickets were surprisingly affordable too. What do the speakers agree about?'
  },
  {
    id: 10,
    part: 'A',
    conversation: 'Man: Are you going to the career fair this afternoon?\nWoman: I wasn\'t planning to, but I suppose I should bring my resume just in case.',
    question: 'What can be inferred about the woman?',
    options: [
      'She will definitely attend the career fair.',
      'She has no interest in the career fair.',
      'She might change her mind about attending.',
      'She has already found a job.'
    ],
    correctAnswer: 2,
    audioScript: 'Are you going to the career fair this afternoon? I wasn\'t planning to, but I suppose I should bring my resume just in case. What can be inferred about the woman?'
  },
  {
    id: 11,
    part: 'A',
    conversation: 'Woman: I\'ve been working on this research paper for weeks, and I\'m still not satisfied with it.\nMan: Sometimes you just have to know when to stop revising.',
    question: 'What does the man imply?',
    options: [
      'The woman should continue revising.',
      'The paper cannot be improved further.',
      'The woman may be overworking her paper.',
      'The professor will accept any version.'
    ],
    correctAnswer: 2,
    audioScript: 'I\'ve been working on this research paper for weeks, and I\'m still not satisfied with it. Sometimes you just have to know when to stop revising. What does the man imply?'
  },
  {
    id: 12,
    part: 'A',
    conversation: 'Man: Did you hear that the campus bookstore is having a huge sale on textbooks?\nWoman: That\'s great news! I\'ve already spent way too much this semester.',
    question: 'What does the woman mean?',
    options: [
      'She plans to buy more textbooks.',
      'She is happy about the sale.',
      'She has no money left for books.',
      'She thinks the sale is unnecessary.'
    ],
    correctAnswer: 1,
    audioScript: 'Did you hear that the campus bookstore is having a huge sale on textbooks? That\'s great news! I\'ve already spent way too much this semester. What does the woman mean?'
  },
  {
    id: 13,
    part: 'A',
    conversation: 'Woman: The professor said we need to form groups of four for the project.\nMan: I already have two people. Would you and your roommate like to join us?',
    question: 'What does the man imply?',
    options: [
      'He needs two more group members.',
      'His group is already complete.',
      'He wants to work alone.',
      'He is looking for a new roommate.'
    ],
    correctAnswer: 0,
    audioScript: 'The professor said we need to form groups of four for the project. I already have two people. Would you and your roommate like to join us? What does the man imply?'
  },
  {
    id: 14,
    part: 'A',
    conversation: 'Man: I thought you were going to declare your major this semester.\nWoman: I was, but I\'m still undecided between psychology and sociology.',
    question: 'What does the woman mean?',
    options: [
      'She has declared her major.',
      'She is unable to choose a major.',
      'She decided not to attend college.',
      'She is leaning toward psychology.'
    ],
    correctAnswer: 1,
    audioScript: 'I thought you were going to declare your major this semester. I was, but I\'m still undecided between psychology and sociology. What does the woman mean?'
  },
  {
    id: 15,
    part: 'A',
    conversation: 'Woman: Have you seen the new documentary about climate change?\nMan: No, but I\'ve heard it\'s really eye-opening.',
    question: 'What does the man mean?',
    options: [
      'He has seen the documentary.',
      'The documentary is not worth watching.',
      'He has heard good things about it.',
      'He doesn\'t believe in climate change.'
    ],
    correctAnswer: 2,
    audioScript: 'Have you seen the new documentary about climate change? No, but I\'ve heard it\'s really eye-opening. What does the man mean?'
  },
  {
    id: 16,
    part: 'A',
    conversation: 'Man: I\'m having trouble understanding this chapter on quantum mechanics.\nWoman: Why don\'t we form a study group? Sometimes discussing things helps.',
    question: 'What does the woman suggest?',
    options: [
      'The man should drop the course.',
      'They should study together.',
      'The professor should explain better.',
      'The chapter is not important.'
    ],
    correctAnswer: 1,
    audioScript: 'I\'m having trouble understanding this chapter on quantum mechanics. Why don\'t we form a study group? Sometimes discussing things helps. What does the woman suggest?'
  },
  {
    id: 17,
    part: 'A',
    conversation: 'Woman: The deadline for the scholarship application is next Friday.\nMan: That gives me barely enough time to get all my recommendations together.',
    question: 'What does the man imply?',
    options: [
      'He has already submitted his application.',
      'He doesn\'t need any recommendations.',
      'He is concerned about the time limit.',
      'The deadline has been extended.'
    ],
    correctAnswer: 2,
    audioScript: 'The deadline for the scholarship application is next Friday. That gives me barely enough time to get all my recommendations together. What does the man imply?'
  },
  {
    id: 18,
    part: 'A',
    conversation: 'Man: I heard your brother got accepted to law school. Congratulations!\nWoman: Thanks! He\'s been working toward this for three years.',
    question: 'What does the woman imply?',
    options: [
      'Her brother\'s acceptance was unexpected.',
      'Her brother prepared for a long time.',
      'Law school is easy to get into.',
      'Her brother didn\'t want to go to law school.'
    ],
    correctAnswer: 1,
    audioScript: 'I heard your brother got accepted to law school. Congratulations! Thanks! He\'s been working toward this for three years. What does the woman imply?'
  },
  {
    id: 19,
    part: 'A',
    conversation: 'Woman: I\'m thinking about joining the debate club this semester.\nMan: You should! It\'s a great way to improve your public speaking skills.',
    question: 'What does the man mean?',
    options: [
      'The debate club is difficult to join.',
      'The woman should not join the club.',
      'The debate club would benefit the woman.',
      'Public speaking is not important.'
    ],
    correctAnswer: 2,
    audioScript: 'I\'m thinking about joining the debate club this semester. You should! It\'s a great way to improve your public speaking skills. What does the man mean?'
  },
  {
    id: 20,
    part: 'A',
    conversation: 'Man: The weather forecast says it\'s going to rain this weekend.\nWoman: That\'s too bad. I was planning a picnic in the park.',
    question: 'What does the woman mean?',
    options: [
      'She is happy about the forecast.',
      'She will cancel her picnic.',
      'She loves rainy weather.',
      'She never trusts weather forecasts.'
    ],
    correctAnswer: 1,
    audioScript: 'The weather forecast says it\'s going to rain this weekend. That\'s too bad. I was planning a picnic in the park. What does the woman mean?'
  },
  {
    id: 21,
    part: 'A',
    conversation: 'Woman: I can\'t believe how expensive parking has become on campus!\nMan: I know. I\'ve started taking the bus instead of driving.',
    question: 'What does the man imply?',
    options: [
      'He still drives to campus.',
      'Parking fees haven\'t changed.',
      'He found a cheaper parking lot.',
      'He changed his transportation method.'
    ],
    correctAnswer: 3,
    audioScript: 'I can\'t believe how expensive parking has become on campus! I know. I\'ve started taking the bus instead of driving. What does the man imply?'
  },
  {
    id: 22,
    part: 'A',
    conversation: 'Man: Did you finish reading the novel for our literature class?\nWoman: I\'m only halfway through, but I can\'t put it down!',
    question: 'What does the woman mean?',
    options: [
      'She doesn\'t like the novel.',
      'She finds the novel very engaging.',
      'She has finished reading the novel.',
      'She hasn\'t started reading yet.'
    ],
    correctAnswer: 1,
    audioScript: 'Did you finish reading the novel for our literature class? I\'m only halfway through, but I can\'t put it down! What does the woman mean?'
  },
  {
    id: 23,
    part: 'A',
    conversation: 'Woman: The professor\'s office hours are from two to four today.\nMan: Perfect! That gives me time to grab lunch first.',
    question: 'What will the man probably do?',
    options: [
      'Skip lunch and go to office hours.',
      'Eat lunch before visiting the professor.',
      'Meet the professor at a different time.',
      'Cancel his appointment with the professor.'
    ],
    correctAnswer: 1,
    audioScript: 'The professor\'s office hours are from two to four today. Perfect! That gives me time to grab lunch first. What will the man probably do?'
  },
  {
    id: 24,
    part: 'A',
    conversation: 'Man: Have you seen the new student center? It just opened last week.\nWoman: Not yet, but I\'ve heard it has a great coffee shop.',
    question: 'What does the woman mean?',
    options: [
      'She has visited the student center.',
      'She knows about a feature of the new building.',
      'She doesn\'t like coffee.',
      'She thinks the old center was better.'
    ],
    correctAnswer: 1,
    audioScript: 'Have you seen the new student center? It just opened last week. Not yet, but I\'ve heard it has a great coffee shop. What does the woman mean?'
  },
  {
    id: 25,
    part: 'A',
    conversation: 'Woman: I\'m so behind on my reading for history class.\nMan: Maybe you should cut down on your work hours at the restaurant.',
    question: 'What does the man suggest?',
    options: [
      'The woman should drop history class.',
      'The woman works too much.',
      'The woman should read faster.',
      'The restaurant is a good place to study.'
    ],
    correctAnswer: 1,
    audioScript: 'I\'m so behind on my reading for history class. Maybe you should cut down on your work hours at the restaurant. What does the man suggest?'
  },
  {
    id: 26,
    part: 'A',
    conversation: 'Man: I didn\'t see you at the basketball game last night.\nWoman: I had to study for my organic chemistry midterm.',
    question: 'Why didn\'t the woman attend the game?',
    options: [
      'She doesn\'t like basketball.',
      'She had an exam to prepare for.',
      'She was working late.',
      'She didn\'t have tickets.'
    ],
    correctAnswer: 1,
    audioScript: 'I didn\'t see you at the basketball game last night. I had to study for my organic chemistry midterm. Why didn\'t the woman attend the game?'
  },
  {
    id: 27,
    part: 'A',
    conversation: 'Woman: Did you get the email about the class being cancelled tomorrow?\nMan: No! Thanks for letting me know. I would have shown up for nothing.',
    question: 'What can be inferred about the man?',
    options: [
      'He didn\'t receive the notification.',
      'He already knew about the cancellation.',
      'He never checks his email.',
      'He was planning to skip class anyway.'
    ],
    correctAnswer: 0,
    audioScript: 'Did you get the email about the class being cancelled tomorrow? No! Thanks for letting me know. I would have shown up for nothing. What can be inferred about the man?'
  },
  {
    id: 28,
    part: 'A',
    conversation: 'Man: I\'m not sure if I should take an internship or focus on my research project.\nWoman: Why not talk to your academic advisor? They might help you weigh the options.',
    question: 'What does the woman suggest?',
    options: [
      'The man should do both activities.',
      'The man should seek advice.',
      'Research projects are more important.',
      'Internships are a waste of time.'
    ],
    correctAnswer: 1,
    audioScript: 'I\'m not sure if I should take an internship or focus on my research project. Why not talk to your academic advisor? They might help you weigh the options. What does the woman suggest?'
  },
  {
    id: 29,
    part: 'A',
    conversation: 'Woman: I heard you\'re planning to study abroad next semester.\nMan: That\'s right! I\'m going to Spain to improve my Spanish.',
    question: 'Why is the man going to Spain?',
    options: [
      'To teach English.',
      'To learn the language.',
      'To visit family.',
      'To conduct research.'
    ],
    correctAnswer: 1,
    audioScript: 'I heard you\'re planning to study abroad next semester. That\'s right! I\'m going to Spain to improve my Spanish. Why is the man going to Spain?'
  },
  {
    id: 30,
    part: 'A',
    conversation: 'Man: I can\'t believe the semester is almost over!\nWoman: I know. It feels like it just started yesterday.',
    question: 'What do the speakers agree on?',
    options: [
      'The semester has passed quickly.',
      'They are glad the semester is ending.',
      'The semester was too difficult.',
      'They want to take more classes.'
    ],
    correctAnswer: 0,
    audioScript: 'I can\'t believe the semester is almost over! I know. It feels like it just started yesterday. What do the speakers agree on?'
  },

  // ==========================================
  // PART B - Longer Conversations (8 questions)
  // ==========================================
  {
    id: 31,
    part: 'B',
    conversation: 'Narrator: Listen to a conversation between a student and a librarian.\nWoman: Hi, I need help finding some sources for my research paper on renewable energy.\nMan: Sure, I can help with that. What specific aspect of renewable energy are you focusing on?\nWoman: I\'m writing about the economic benefits of solar power adoption in developing countries.\nMan: Interesting topic. Let me show you our databases. The best place to start would be the environmental science database. We also have some excellent economic journals that might have relevant articles.\nWoman: Do I need a special password to access these databases?\nMan: No, you can access them from any computer on campus using your student ID. If you want to access them from home, you\'ll need to set up a VPN connection. I can email you the instructions for that.\nWoman: That would be great, thanks! Also, I heard the library has some documentaries on solar energy.\nMan: Yes, we have a small collection in the media center on the third floor. You can check them out for up to a week.',
    question: 'What is the student\'s research topic?',
    options: [
      'The history of renewable energy',
      'Economic advantages of solar power in developing nations',
      'How to install solar panels',
      'Comparing different types of renewable energy'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a conversation between a student and a librarian. Hi, I need help finding some sources for my research paper on renewable energy. Sure, I can help with that. What specific aspect of renewable energy are you focusing on? I\'m writing about the economic benefits of solar power adoption in developing countries. What is the student\'s research topic?'
  },
  {
    id: 32,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'How can the student access the databases from home?',
    options: [
      'Use her student ID directly',
      'Visit the library in person',
      'Set up a VPN connection',
      'Ask the librarian for a password'
    ],
    correctAnswer: 2,
    audioScript: 'How can the student access the databases from home?'
  },
  {
    id: 33,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Where are the documentaries located?',
    options: [
      'On the first floor',
      'In the media center on the third floor',
      'In the science building',
      'At the front desk'
    ],
    correctAnswer: 1,
    audioScript: 'Where are the documentaries located?'
  },
  {
    id: 34,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What does the librarian offer to send the student?',
    options: [
      'A list of recommended books',
      'VPN setup instructions',
      'Access to paid journals',
      'A documentary about solar energy'
    ],
    correctAnswer: 1,
    audioScript: 'What does the librarian offer to send the student?'
  },
  {
    id: 35,
    part: 'B',
    conversation: 'Narrator: Listen to a conversation between two students.\nMan: Hey Sarah, how did your presentation go in Professor Johnson\'s class?\nWoman: Actually, it went really well! I was nervous at first, but once I started talking about my research, I felt more confident.\nMan: What was your topic again?\nWoman: I analyzed the effects of social media on political participation among young voters. I found some really interesting data showing that people who are active on social media are more likely to vote and attend political events.\nMan: That sounds fascinating. Did Professor Johnson have any feedback?\nWoman: He suggested I expand the research and maybe submit it to the undergraduate research journal. He thinks it could make a real contribution to the field.\nMan: That\'s amazing! Are you going to do it?\nWoman: I think so. I\'ll need to collect more data and refine my analysis, but I have until the end of the semester to submit.',
    question: 'What was the woman\'s presentation about?',
    options: [
      'The history of social media',
      'Young voters and political participation on social media',
      'How to create effective social media campaigns',
      'Professor Johnson\'s research methods'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a conversation between two students. Hey Sarah, how did your presentation go in Professor Johnson\'s class? Actually, it went really well! I was nervous at first, but once I started talking about my research, I felt more confident. What was the woman\'s presentation about?'
  },
  {
    id: 36,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What did Professor Johnson suggest the woman do?',
    options: [
      'Change her research topic',
      'Present at a conference',
      'Submit her work to a research journal',
      'Collect more survey responses'
    ],
    correctAnswer: 2,
    audioScript: 'What did Professor Johnson suggest the woman do?'
  },
  {
    id: 37,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'According to the woman, what did her research show?',
    options: [
      'Social media has no effect on voting',
      'Young people don\'t use social media for politics',
      'Social media users are more politically active',
      'Traditional media is more influential than social media'
    ],
    correctAnswer: 2,
    audioScript: 'According to the woman, what did her research show?'
  },
  {
    id: 38,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'When is the deadline for the research journal submission?',
    options: [
      'Next week',
      'In one month',
      'At the end of the semester',
      'There is no deadline mentioned'
    ],
    correctAnswer: 2,
    audioScript: 'When is the deadline for the research journal submission?'
  },

  // ==========================================
  // PART C - Academic Talks/Lectures (12 questions)
  // ==========================================
  {
    id: 39,
    part: 'C',
    talk: 'Narrator: Listen to part of a lecture in an astronomy class.\nMan: Today we\'ll discuss neutron stars, which are among the most fascinating objects in our universe. When a massive star dies, it explodes in what we call a supernova. What remains after this explosion can become a neutron star. These stars are incredibly dense - so dense that a teaspoon of neutron star material would weigh about a billion tons on Earth! Neutron stars also spin very rapidly, sometimes hundreds of times per second. When they emit beams of radiation that sweep past Earth like a lighthouse beam, we call them pulsars. Scientists have discovered over 2,000 pulsars since the first one was identified in 1967. These objects help us understand the extreme physics that exists in our universe.',
    question: 'What is the main topic of the lecture?',
    options: [
      'How stars are born',
      'The characteristics of neutron stars',
      'Different types of supernovas',
      'The history of astronomy'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to part of a lecture in an astronomy class. Today we\'ll discuss neutron stars, which are among the most fascinating objects in our universe. When a massive star dies, it explodes in what we call a supernova. What remains after this explosion can become a neutron star. What is the main topic of the lecture?'
  },
  {
    id: 40,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the professor, how much would a teaspoon of neutron star material weigh on Earth?',
    options: [
      'A few pounds',
      'About a million tons',
      'Approximately a billion tons',
      'The weight was not mentioned'
    ],
    correctAnswer: 2,
    audioScript: 'According to the professor, how much would a teaspoon of neutron star material weigh on Earth?'
  },
  {
    id: 41,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What does the professor compare pulsars to?',
    options: [
      'A telescope',
      'A lighthouse',
      'A clock',
      'A microscope'
    ],
    correctAnswer: 1,
    audioScript: 'What does the professor compare pulsars to?'
  },
  {
    id: 42,
    part: 'C',
    talk: 'Same talk as above',
    question: 'When was the first pulsar discovered?',
    options: [
      'In 1957',
      'In 1967',
      'In 1977',
      'In 1987'
    ],
    correctAnswer: 1,
    audioScript: 'When was the first pulsar discovered?'
  },
  {
    id: 43,
    part: 'C',
    talk: 'Narrator: Listen to a lecture in an economics class.\nWoman: Today I want to talk about inflation and its effects on the economy. Inflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall. Central banks, like the Federal Reserve in the United States, try to maintain a moderate level of inflation, usually around two percent per year. This is considered healthy for economic growth. However, when inflation becomes too high, it can be devastating. People\'s savings lose value, and businesses struggle to plan for the future. On the other hand, deflation, or falling prices, can also be harmful as it may lead to reduced consumer spending. The ideal situation is price stability with low, predictable inflation.',
    question: 'What is the main purpose of this lecture?',
    options: [
      'To explain the history of the Federal Reserve',
      'To describe different types of currency',
      'To discuss inflation and its economic effects',
      'To argue against government regulation'
    ],
    correctAnswer: 2,
    audioScript: 'Listen to a lecture in an economics class. Today I want to talk about inflation and its effects on the economy. Inflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall. What is the main purpose of this lecture?'
  },
  {
    id: 44,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the professor, what inflation rate do central banks typically try to maintain?',
    options: [
      'Zero percent',
      'Around two percent',
      'Five percent or higher',
      'Ten percent'
    ],
    correctAnswer: 1,
    audioScript: 'According to the professor, what inflation rate do central banks typically try to maintain?'
  },
  {
    id: 45,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Why does the professor mention deflation?',
    options: [
      'To show that falling prices can also be harmful',
      'To recommend it as a solution to inflation',
      'To compare American and European economies',
      'To explain how central banks operate'
    ],
    correctAnswer: 0,
    audioScript: 'Why does the professor mention deflation?'
  },
  {
    id: 46,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What happens to savings during high inflation?',
    options: [
      'They increase in value',
      'They remain stable',
      'They lose value',
      'They are protected by the government'
    ],
    correctAnswer: 2,
    audioScript: 'What happens to savings during high inflation?'
  },
  {
    id: 47,
    part: 'C',
    talk: 'Narrator: Listen to a lecture in a marine biology class.\nMan: Coral reefs are among the most diverse ecosystems on Earth, often called the rainforests of the sea. They cover less than one percent of the ocean floor, yet they support about 25 percent of all marine species. Corals are actually animals, not plants, and they have a symbiotic relationship with tiny algae called zooxanthellae. These algae live inside the coral and provide them with nutrients through photosynthesis. In return, the coral provides the algae with a protected environment. However, coral reefs are under serious threat from climate change. Rising ocean temperatures cause coral bleaching, where corals expel their algae and turn white. Without their algae partners, corals often die. Scientists estimate that we\'ve lost about 50 percent of the world\'s coral reefs in the past 30 years.',
    question: 'What is the main topic of the lecture?',
    options: [
      'Types of marine animals',
      'The relationship between coral and algae',
      'Coral reefs and their environmental threats',
      'How to protect ocean ecosystems'
    ],
    correctAnswer: 2,
    audioScript: 'Listen to a lecture in a marine biology class. Coral reefs are among the most diverse ecosystems on Earth, often called the rainforests of the sea. They cover less than one percent of the ocean floor, yet they support about 25 percent of all marine species. What is the main topic of the lecture?'
  },
  {
    id: 48,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What percentage of marine species do coral reefs support?',
    options: [
      'Less than one percent',
      'About 25 percent',
      'Approximately 50 percent',
      'Over 75 percent'
    ],
    correctAnswer: 1,
    audioScript: 'What percentage of marine species do coral reefs support?'
  },
  {
    id: 49,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What happens during coral bleaching?',
    options: [
      'Coral absorbs more algae',
      'Coral expels its algae and turns white',
      'Coral grows faster',
      'Coral produces more nutrients'
    ],
    correctAnswer: 1,
    audioScript: 'What happens during coral bleaching?'
  },
  {
    id: 50,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the lecture, how much of the world\'s coral reefs have been lost in the past 30 years?',
    options: [
      'About 25 percent',
      'Approximately 50 percent',
      'Nearly 75 percent',
      'Almost 90 percent'
    ],
    correctAnswer: 1,
    audioScript: 'According to the lecture, how much of the world\'s coral reefs have been lost in the past 30 years?'
  }
];

// =============================================
// STRUCTURE SECTION - 40 Questions
// =============================================

const structure: StructureQuestion[] = [
  // ==========================================
  // Questions 1-15: Sentence Completion
  // ==========================================
  {
    id: 1,
    type: 'structure',
    sentence: 'The Amazon River, ______ is the second longest river in the world, flows through several South American countries.',
    options: [
      'that',
      'which',
      'what',
      'it'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'structure',
    sentence: 'By the time she graduated from college, she ______ three different internships.',
    options: [
      'completed',
      'has completed',
      'had completed',
      'completes'
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    type: 'structure',
    sentence: 'The more carefully you plan your essay, ______ it will be.',
    options: [
      'the better organized',
      'better organized',
      'the best organized',
      'as well organized'
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    type: 'structure',
    sentence: 'Neither the professor nor the students ______ aware of the schedule change.',
    options: [
      'was',
      'were',
      'is',
      'has been'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    type: 'structure',
    sentence: 'The ancient ruins, ______ discovered by archaeologists in 1922, have attracted millions of visitors.',
    options: [
      'were',
      'which were',
      'that was',
      'they were'
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    type: 'structure',
    sentence: 'Had the company invested in renewable energy earlier, it ______ millions of dollars in operating costs.',
    options: [
      'would save',
      'would have saved',
      'will save',
      'had saved'
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    type: 'structure',
    sentence: 'The committee recommended that the proposal ______ immediately.',
    options: [
      'be approved',
      'is approved',
      'was approved',
      'to be approved'
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'structure',
    sentence: '______ the cold weather, the outdoor concert attracted a large audience.',
    options: [
      'Despite of',
      'In spite',
      'Despite',
      'Although'
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    type: 'structure',
    sentence: 'The new policy requires all employees ______ safety training annually.',
    options: [
      'attend',
      'attending',
      'to attend',
      'attended'
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    type: 'structure',
    sentence: 'The results of the study were ______ than the researchers had anticipated.',
    options: [
      'more significant',
      'most significant',
      'significant',
      'more significance'
    ],
    correctAnswer: 0
  },
  {
    id: 11,
    type: 'structure',
    sentence: 'Not until the late 19th century ______ the right to vote in national elections.',
    options: [
      'women gained',
      'did women gain',
      'women did gain',
      'gain women'
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    type: 'structure',
    sentence: 'The scientists are still trying to determine ______ caused the sudden climate shift.',
    options: [
      'that',
      'what',
      'which it',
      'whatever'
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    type: 'structure',
    sentence: 'The museum possesses one of ______ collections of ancient artifacts in the world.',
    options: [
      'the finest',
      'finest',
      'the fine',
      'a finest'
    ],
    correctAnswer: 0
  },
  {
    id: 14,
    type: 'structure',
    sentence: '______ to understand quantum mechanics requires years of study.',
    options: [
      'To attempting',
      'Attempting',
      'The attempt',
      'By attempting'
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    type: 'structure',
    sentence: 'The CEO, along with several senior executives, ______ attending the conference next week.',
    options: [
      'are',
      'is',
      'were',
      'have been'
    ],
    correctAnswer: 1
  },

  // ==========================================
  // Questions 16-40: Error Identification
  // ==========================================
  {
    id: 16,
    type: 'written',
    sentence: 'The amount of (A) tourists visiting the national park (B) have increased (C) significantly over the past decade (D).',
    underlinedParts: [
      'amount of',
      'visiting',
      'have increased',
      'over the past decade'
    ],
    correctAnswer: 2
  },
  {
    id: 17,
    type: 'written',
    sentence: 'Despite (A) the heavy rain, the football match (B) continued as (C) schedule (D).',
    underlinedParts: [
      'Despite',
      'continued',
      'as',
      'schedule'
    ],
    correctAnswer: 3
  },
  {
    id: 18,
    type: 'written',
    sentence: 'The researchers (A) spent several months (B) to collect (C) data for their study (D).',
    underlinedParts: [
      'spent',
      'to collect',
      'for their study',
      'several months'
    ],
    correctAnswer: 1
  },
  {
    id: 19,
    type: 'written',
    sentence: 'Neither (A) of the candidates (B) were (C) prepared for the difficult interview questions (D).',
    underlinedParts: [
      'Neither',
      'were',
      'prepared for',
      'questions'
    ],
    correctAnswer: 1
  },
  {
    id: 20,
    type: 'written',
    sentence: 'The company\'s (A) new marketing strategy has proven (B) to be more effective (C) than their competitors (D).',
    underlinedParts: [
      'company\'s',
      'has proven',
      'more effective',
      'than their competitors'
    ],
    correctAnswer: 3
  },
  {
    id: 21,
    type: 'written',
    sentence: 'The number of students (A) which (B) applied to the program exceeded (C) the university\'s expectations (D).',
    underlinedParts: [
      'number of students',
      'which',
      'exceeded',
      'expectations'
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    type: 'written',
    sentence: 'Having finished (A) the assignment, the professor (B) allowed the students (C) to leave early (D).',
    underlinedParts: [
      'Having finished',
      'the professor',
      'allowed the students',
      'to leave early'
    ],
    correctAnswer: 1
  },
  {
    id: 23,
    type: 'written',
    sentence: 'The archaeological team (A) has been working (B) on this site (C) since five years (D).',
    underlinedParts: [
      'has been working',
      'on this site',
      'since five years',
      'The archaeological team'
    ],
    correctAnswer: 2
  },
  {
    id: 24,
    type: 'written',
    sentence: 'Each of the committee members (A) have (B) been asked to submit (C) their recommendations by Friday (D).',
    underlinedParts: [
      'Each of the committee members',
      'have',
      'to submit',
      'by Friday'
    ],
    correctAnswer: 1
  },
  {
    id: 25,
    type: 'written',
    sentence: 'The new environmental regulations (A) requires (B) companies to reduce (C) their carbon emissions significantly (D).',
    underlinedParts: [
      'regulations',
      'requires',
      'to reduce',
      'significantly'
    ],
    correctAnswer: 1
  },
  {
    id: 26,
    type: 'written',
    sentence: 'The scientist, along with (A) her assistants, are (B) conducting (C) experiments in the laboratory (D).',
    underlinedParts: [
      'along with',
      'are',
      'conducting',
      'in the laboratory'
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    type: 'written',
    sentence: 'The more (A) you practice, the (B) easier (C) the test will seem (D).',
    underlinedParts: [
      'The more',
      'the',
      'easier',
      'will seem'
    ],
    correctAnswer: 2
  },
  {
    id: 28,
    type: 'written',
    sentence: 'It is essential (A) that the report (B) submits (C) before the deadline (D).',
    underlinedParts: [
      'It is essential',
      'that the report',
      'submits',
      'before the deadline'
    ],
    correctAnswer: 2
  },
  {
    id: 29,
    type: 'written',
    sentence: 'The ancient manuscript (A) was discovered (B) lying (C) among a pile of old books (D).',
    underlinedParts: [
      'was discovered',
      'lying',
      'among a pile',
      'old books'
    ],
    correctAnswer: 2
  },
  {
    id: 30,
    type: 'written',
    sentence: 'The painting (A) which (B) it was stolen (C) from the museum has been recovered (D).',
    underlinedParts: [
      'The painting',
      'which',
      'it was stolen',
      'has been recovered'
    ],
    correctAnswer: 2
  },
  {
    id: 31,
    type: 'written',
    sentence: 'Because (A) the severe weather conditions, (B) the flight was (C) cancelled (D).',
    underlinedParts: [
      'Because',
      'the severe weather conditions',
      'was',
      'cancelled'
    ],
    correctAnswer: 0
  },
  {
    id: 32,
    type: 'written',
    sentence: 'The students (A) were surprising (B) to learn that (C) the exam had been postponed (D).',
    underlinedParts: [
      'The students',
      'were surprising',
      'to learn that',
      'had been postponed'
    ],
    correctAnswer: 1
  },
  {
    id: 33,
    type: 'written',
    sentence: 'The company (A) decided to (B) rise (C) prices due to increased production costs (D).',
    underlinedParts: [
      'The company',
      'decided to',
      'rise',
      'due to'
    ],
    correctAnswer: 2
  },
  {
    id: 34,
    type: 'written',
    sentence: 'Despite of (A) his lack (B) of experience, he was offered (C) the position (D).',
    underlinedParts: [
      'Despite of',
      'lack',
      'was offered',
      'the position'
    ],
    correctAnswer: 0
  },
  {
    id: 35,
    type: 'written',
    sentence: 'The data (A) suggests (B) that the new medication is (C) highly effective (D).',
    underlinedParts: [
      'The data',
      'suggests',
      'is',
      'highly effective'
    ],
    correctAnswer: 1
  },
  {
    id: 36,
    type: 'written',
    sentence: 'The more (A) faster (B) the processor, the better (C) the computer performs (D).',
    underlinedParts: [
      'The more',
      'faster',
      'the better',
      'performs'
    ],
    correctAnswer: 1
  },
  {
    id: 37,
    type: 'written',
    sentence: 'She is one of the (A) most (B) dedicated student (C) in the entire program (D).',
    underlinedParts: [
      'one of the',
      'most',
      'student',
      'entire program'
    ],
    correctAnswer: 2
  },
  {
    id: 38,
    type: 'written',
    sentence: 'The professor suggested (A) that the students (B) to review (C) the material before the exam (D).',
    underlinedParts: [
      'suggested',
      'that the students',
      'to review',
      'before the exam'
    ],
    correctAnswer: 2
  },
  {
    id: 39,
    type: 'written',
    sentence: 'A large number (A) of the population (B) believes (C) that climate change is a serious threat (D).',
    underlinedParts: [
      'A large number',
      'of the population',
      'believes',
      'is a serious threat'
    ],
    correctAnswer: 0
  },
  {
    id: 40,
    type: 'written',
    sentence: 'The novel, (A) that (B) was published last year, (C) has become a bestseller (D).',
    underlinedParts: [
      'The novel',
      'that',
      'was published last year',
      'has become'
    ],
    correctAnswer: 1
  }
];

// =============================================
// READING SECTION - 50 Questions (5 passages)
// =============================================

const reading: ReadingPassage[] = [
  {
    id: 1,
    title: 'The Development of Vaccines',
    text: `The history of vaccination represents one of medicine's greatest achievements in the fight against infectious diseases. The concept of immunization can be traced back to ancient times, but it was not until the late 18th century that the first true vaccine was developed.

In 1796, English physician Edward Jenner made a groundbreaking discovery. He observed that milkmaids who contracted cowpox, a relatively mild disease, rarely developed smallpox, which was one of the most deadly diseases of the time. Jenner hypothesized that exposure to cowpox provided protection against smallpox. To test this theory, he inoculated an eight-year-old boy with material from cowpox lesions and later exposed him to smallpox. The boy did not develop the disease, confirming Jenner's hypothesis. This marked the birth of vaccination, a term derived from "vacca," the Latin word for cow.

The next major advancement came in the late 19th century through the work of Louis Pasteur. Pasteur developed the germ theory of disease and created vaccines for several diseases, including anthrax and rabies. His approach involved weakening or "attenuating" pathogens so they could stimulate the immune system without causing disease. This technique became fundamental to vaccine development.

The 20th century witnessed an explosion in vaccine research and development. Scientists created vaccines for numerous diseases including polio, measles, mumps, rubella, and influenza. Perhaps the greatest triumph was the global eradication of smallpox in 1980, accomplished through an intensive worldwide vaccination campaign led by the World Health Organization.

Modern vaccine technology has continued to evolve. Recent innovations include mRNA vaccines, which teach cells how to make a protein that triggers an immune response. This technology proved crucial during the COVID-19 pandemic, enabling the rapid development of effective vaccines. Scientists are now exploring applications of this technology for other diseases, including cancer and HIV.

Despite these successes, vaccines face ongoing challenges. Some populations lack access to essential vaccines, while others resist vaccination due to misinformation. Addressing these barriers remains crucial for global public health.`,
    questions: [
      { id: 1, question: 'What is the main idea of the passage?', options: ['Edward Jenner was the most important scientist in vaccine history', 'Vaccines have evolved significantly from ancient practices to modern technology', 'Smallpox was the deadliest disease in history', 'The World Health Organization eradicated all infectious diseases'], correctAnswer: 1 },
      { id: 2, question: 'The word "groundbreaking" in paragraph 2 is closest in meaning to', options: ['destructive', 'pioneering', 'controversial', 'unexpected'], correctAnswer: 1 },
      { id: 3, question: 'According to the passage, how did Edward Jenner develop the first vaccine?', options: ['By studying ancient medical texts', 'By observing milkmaids who had cowpox', 'By working with Louis Pasteur', 'By developing mRNA technology'], correctAnswer: 1 },
      { id: 4, question: 'The word "attenuating" in paragraph 3 refers to', options: ['strengthening', 'weakening', 'eliminating', 'multiplying'], correctAnswer: 1 },
      { id: 5, question: 'What does the author imply about Louis Pasteur\'s contribution to vaccine development?', options: ['It was more significant than Jenner\'s work', 'It established principles still used today', 'It was limited to studying rabies', 'It contradicted earlier scientific beliefs'], correctAnswer: 1 },
      { id: 6, question: 'According to paragraph 4, what was a major achievement of the 20th century?', options: ['The development of the first vaccine', 'The creation of mRNA technology', 'The global eradication of smallpox', 'The discovery of germ theory'], correctAnswer: 2 },
      { id: 7, question: 'The word "triumph" in paragraph 4 is closest in meaning to', options: ['failure', 'victory', 'experiment', 'controversy'], correctAnswer: 1 },
      { id: 8, question: 'What does the passage say about mRNA vaccines?', options: ['They were developed by Edward Jenner', 'They can only be used for COVID-19', 'They work by teaching cells to make specific proteins', 'They have completely replaced traditional vaccines'], correctAnswer: 2 },
      { id: 9, question: 'Which of the following is mentioned as a current challenge for vaccines?', options: ['Lack of scientific knowledge about immunity', 'Resistance due to misinformation', 'Inability to create new vaccine types', 'Opposition from medical professionals'], correctAnswer: 1 },
      { id: 10, question: 'Where in the passage does the author discuss the origin of the word "vaccination"?', options: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 5'], correctAnswer: 1 }
    ]
  },
  {
    id: 2,
    title: 'The Psychology of Decision Making',
    text: `Every day, humans make thousands of decisions, from trivial choices about what to eat to life-changing decisions about careers and relationships. Psychologists and behavioral economists have long studied how people make decisions and why they often deviate from purely rational choices.

Traditional economic theory assumed that humans are rational actors who always make decisions that maximize their self-interest. However, research over the past several decades has challenged this assumption. Daniel Kahneman and Amos Tversky, pioneers in behavioral economics, demonstrated that human decision-making is influenced by numerous cognitive biases.

One of the most significant biases they identified is loss aversion. People feel the pain of losing something about twice as strongly as they feel the pleasure of gaining something of equivalent value. This bias explains why investors often hold onto losing stocks too long, hoping to avoid realizing a loss, while selling winning stocks too quickly to lock in gains.

Another important concept is the availability heuristic. People tend to judge the probability of events based on how easily examples come to mind. For instance, after hearing news about a plane crash, many people overestimate the dangers of flying, even though statistically, air travel is one of the safest forms of transportation. Media coverage of dramatic events can significantly distort risk perception.

The framing effect also plays a crucial role in decision-making. The same information presented differently can lead to different choices. In one famous study, when a medical treatment was described as having a "90 percent survival rate," more people chose it than when it was described as having a "10 percent mortality rate," even though the statistics are identical.

Understanding these biases has practical applications. Governments and organizations now use "nudges" – subtle changes in how choices are presented – to encourage better decisions. For example, making retirement savings enrollment automatic (with the option to opt out) significantly increases participation rates compared to requiring employees to actively enroll. These insights have transformed fields from public policy to marketing to healthcare.`,
    questions: [
      { id: 11, question: 'What is the main purpose of the passage?', options: ['To criticize traditional economic theory', 'To explain how cognitive biases affect decision-making', 'To argue that humans cannot make rational choices', 'To describe the history of psychology'], correctAnswer: 1 },
      { id: 12, question: 'The word "deviate" in paragraph 1 is closest in meaning to', options: ['depart', 'benefit', 'learn', 'agree'], correctAnswer: 0 },
      { id: 13, question: 'According to traditional economic theory, how do humans make decisions?', options: ['By following their emotions', 'By maximizing self-interest rationally', 'By consulting with others', 'By avoiding all risks'], correctAnswer: 1 },
      { id: 14, question: 'What does the passage say about loss aversion?', options: ['It causes people to prefer losses over gains', 'It makes losses feel more significant than equivalent gains', 'It affects only financial decisions', 'It was discovered by traditional economists'], correctAnswer: 1 },
      { id: 15, question: 'The word "equivalent" in paragraph 3 is closest in meaning to', options: ['similar', 'equal', 'lesser', 'greater'], correctAnswer: 1 },
      { id: 16, question: 'According to paragraph 4, why might someone overestimate the danger of flying?', options: ['Because they have personal experience with crashes', 'Because crashes are easy to recall due to media coverage', 'Because flying is actually very dangerous', 'Because they distrust airlines'], correctAnswer: 1 },
      { id: 17, question: 'The phrase "availability heuristic" refers to', options: ['Making decisions based on easily remembered examples', 'Choosing what is most convenient', 'Consulting available experts', 'Using technology for decisions'], correctAnswer: 0 },
      { id: 18, question: 'What does the study about medical treatment demonstrate?', options: ['That people prefer lower survival rates', 'That framing can influence choices even with identical facts', 'That medical treatments are usually unsuccessful', 'That patients should not be given statistics'], correctAnswer: 1 },
      { id: 19, question: 'According to the passage, what is a "nudge"?', options: ['A type of cognitive bias', 'A subtle change in how choices are presented', 'A government regulation', 'A type of medical treatment'], correctAnswer: 1 },
      { id: 20, question: 'Which paragraph discusses the practical applications of behavioral economics research?', options: ['Paragraph 2', 'Paragraph 3', 'Paragraph 5', 'Paragraph 6'], correctAnswer: 3 }
    ]
  },
  {
    id: 3,
    title: 'The Physics of Black Holes',
    text: `Black holes are among the most mysterious and fascinating objects in the universe. These regions of spacetime have gravitational fields so intense that nothing, not even light, can escape once it passes a boundary called the event horizon.

The concept of black holes emerged from Albert Einstein's theory of general relativity, published in 1915. Einstein's equations predicted that massive objects could warp spacetime so dramatically that a point of infinite density could form. However, Einstein himself was skeptical that such objects could exist in reality. It was not until the 1960s that physicists began to take the possibility seriously, and the term "black hole" was coined by physicist John Wheeler in 1967.

Black holes form when massive stars collapse at the end of their life cycles. When a star at least 20 times more massive than our Sun exhausts its nuclear fuel, it can no longer support itself against gravitational collapse. The core collapses inward, and if the remaining mass is sufficient, a black hole forms. Alternatively, supermassive black holes, millions to billions of times the Sun's mass, reside at the centers of most galaxies, including our own Milky Way.

Despite their name, black holes are not completely invisible. As matter falls toward a black hole, it forms an accretion disk of superheated gas that emits powerful X-rays. Astronomers can detect these emissions to locate black holes. In 2019, the Event Horizon Telescope collaboration captured the first direct image of a black hole's event horizon, a landmark achievement in astronomy.

Black holes present profound theoretical challenges. The "information paradox" suggests that information about matter falling into a black hole might be lost forever, contradicting quantum mechanics. Physicists continue to debate this problem, as it reveals tensions between general relativity and quantum theory.

Recent research has revealed unexpected connections between black holes and other areas of physics. Theoretical work suggests that black holes might behave like holograms, encoding three-dimensional information on a two-dimensional surface. These insights may ultimately help unify our understanding of gravity with quantum mechanics, one of physics' greatest unsolved problems.`,
    questions: [
      { id: 21, question: 'What is the main topic of the passage?', options: ['The life cycles of stars', 'The characteristics and significance of black holes', 'Albert Einstein\'s contributions to physics', 'The history of astronomical discoveries'], correctAnswer: 1 },
      { id: 22, question: 'The word "intense" in paragraph 1 is closest in meaning to', options: ['weak', 'extreme', 'mysterious', 'theoretical'], correctAnswer: 1 },
      { id: 23, question: 'According to the passage, what is the event horizon?', options: ['The center of a black hole', 'The boundary beyond which nothing can escape', 'The disk of matter around a black hole', 'The point where a star begins to form'], correctAnswer: 1 },
      { id: 24, question: 'What was Einstein\'s initial attitude toward black holes?', options: ['He was certain they existed', 'He was skeptical about their existence', 'He dedicated his career to studying them', 'He discovered the first black hole'], correctAnswer: 1 },
      { id: 25, question: 'The word "coined" in paragraph 2 is closest in meaning to', options: ['rejected', 'invented', 'borrowed', 'discovered'], correctAnswer: 1 },
      { id: 26, question: 'According to paragraph 3, how do stellar black holes form?', options: ['From the collision of two planets', 'When massive stars collapse after exhausting their fuel', 'Through the gradual accumulation of cosmic dust', 'From the explosion of small stars'], correctAnswer: 1 },
      { id: 27, question: 'What does the passage say about supermassive black holes?', options: ['They are found only in distant galaxies', 'They form from single star collapses', 'They exist at the centers of most galaxies', 'They are smaller than stellar black holes'], correctAnswer: 2 },
      { id: 28, question: 'How can astronomers detect black holes despite their name?', options: ['By observing light escaping from inside them', 'By detecting X-rays from heated matter falling toward them', 'By measuring their mass directly', 'By listening to sounds they produce'], correctAnswer: 1 },
      { id: 29, question: 'The "information paradox" refers to', options: ['The difficulty of detecting black holes', 'A conflict between general relativity and quantum mechanics', 'The problem of naming astronomical objects', 'The challenge of photographing black holes'], correctAnswer: 1 },
      { id: 30, question: 'According to the passage, what might black holes help physicists achieve?', options: ['Develop faster space travel', 'Unify gravity with quantum mechanics', 'Create new energy sources', 'Prove Einstein\'s theories wrong'], correctAnswer: 1 }
    ]
  },
  {
    id: 4,
    title: 'The Evolution of Democracy',
    text: `Democracy, derived from the Greek words "demos" (people) and "kratos" (power), has undergone significant transformations throughout human history. What began as a system of direct participation in ancient Athens has evolved into various forms of representative government across the globe.

Ancient Athens in the 5th century BCE is often considered the birthplace of democracy. Athenian citizens participated directly in political decisions, gathering in the Assembly to debate and vote on laws. However, this early democracy had significant limitations. Women, slaves, and foreign residents were excluded from citizenship, meaning only a minority of the population could participate.

The concept of democracy largely disappeared from Western political thought after the fall of Athens, replaced by monarchies and empires for centuries. The idea re-emerged during the Enlightenment, when philosophers such as John Locke and Jean-Jacques Rousseau argued that governments derive their authority from the consent of the governed. These ideas influenced the American and French Revolutions of the late 18th century.

The 19th and 20th centuries saw democracy expand dramatically. Initially, voting rights in most democracies were limited to property-owning men. Over time, property requirements were abolished, and voting was extended to working-class men, then to women, and finally to racial and ethnic minorities in many countries. This expansion was often achieved through prolonged social movements and activism.

Contemporary democracies face numerous challenges. Declining voter turnout in many countries raises concerns about citizen engagement. Economic inequality can translate into unequal political influence, as wealthy individuals and corporations wield significant power. The spread of misinformation through social media poses new threats to informed democratic deliberation.

Despite these challenges, democracy remains the most widespread form of government in the 21st century. The core principle that citizens should have a voice in their governance continues to inspire movements for political reform around the world. Understanding democracy's evolution helps illuminate both its achievements and its ongoing struggles.`,
    questions: [
      { id: 31, question: 'What is the main purpose of the passage?', options: ['To argue that democracy is superior to other systems', 'To trace the historical development of democracy', 'To compare different democratic systems', 'To criticize ancient Athenian society'], correctAnswer: 1 },
      { id: 32, question: 'The word "transformations" in paragraph 1 is closest in meaning to', options: ['problems', 'changes', 'failures', 'improvements'], correctAnswer: 1 },
      { id: 33, question: 'According to paragraph 2, what was a limitation of Athenian democracy?', options: ['Citizens could not vote directly', 'Many residents were excluded from participation', 'The Assembly rarely met', 'Laws could not be changed'], correctAnswer: 1 },
      { id: 34, question: 'What happened to democracy after the fall of Athens?', options: ['It spread throughout the world', 'It was largely replaced by monarchies', 'It remained unchanged', 'It became stronger'], correctAnswer: 1 },
      { id: 35, question: 'The word "consent" in paragraph 3 is closest in meaning to', options: ['rejection', 'agreement', 'fear', 'ignorance'], correctAnswer: 1 },
      { id: 36, question: 'According to the passage, how did voting rights change over time?', options: ['They became more restricted', 'They were gradually extended to more people', 'They remained the same', 'They were determined by property ownership only'], correctAnswer: 1 },
      { id: 37, question: 'The phrase "prolonged social movements" in paragraph 4 suggests that expanding voting rights', options: ['happened quickly', 'required extended effort and activism', 'was accomplished by government alone', 'faced no opposition'], correctAnswer: 1 },
      { id: 38, question: 'Which of the following is mentioned as a challenge to contemporary democracies?', options: ['Too many voters participating', 'Economic inequality affecting political influence', 'Too many political parties', 'Lack of technology in voting'], correctAnswer: 1 },
      { id: 39, question: 'The word "deliberation" in paragraph 5 refers to', options: ['voting', 'careful discussion and consideration', 'protesting', 'campaign fundraising'], correctAnswer: 1 },
      { id: 40, question: 'What does the author conclude about democracy in the final paragraph?', options: ['It has failed completely', 'It continues to evolve and face challenges', 'It has achieved perfection', 'It is being replaced by other systems'], correctAnswer: 1 }
    ]
  },
  {
    id: 5,
    title: 'The Science of Sleep',
    text: `Sleep is a fundamental biological process that occupies approximately one-third of human life. Despite its ubiquity, sleep remains one of the most complex and poorly understood aspects of human biology. Recent scientific advances, however, have begun to illuminate why we sleep and what happens when we don't get enough.

Sleep occurs in cycles lasting approximately 90 minutes, each consisting of distinct stages. Light sleep transitions into deep sleep, also known as slow-wave sleep, which is crucial for physical restoration. This is followed by REM (rapid eye movement) sleep, during which most dreaming occurs. These cycles repeat throughout the night, with REM periods becoming longer toward morning.

The functions of sleep are multifaceted. During deep sleep, the body repairs tissues, builds muscle, and strengthens the immune system. REM sleep appears vital for cognitive functions, including memory consolidation and emotional processing. Research has shown that people deprived of REM sleep struggle with learning new information and regulating their emotions.

One of the most significant discoveries in recent years concerns the glymphatic system, a waste-clearance pathway in the brain that becomes highly active during sleep. This system removes toxic proteins, including those associated with Alzheimer's disease, that accumulate during waking hours. This finding helps explain why sleep deprivation is linked to cognitive decline and neurological disorders.

Modern society presents numerous challenges to healthy sleep patterns. Artificial lighting, particularly the blue light emitted by electronic devices, disrupts the production of melatonin, the hormone that regulates sleep-wake cycles. Shift work, which requires people to be awake during traditional sleeping hours, has been classified as a probable carcinogen due to its disruption of circadian rhythms.

Sleep disorders affect millions of people worldwide. Insomnia, sleep apnea, and restless leg syndrome can significantly impact quality of life. Fortunately, many sleep problems can be addressed through behavioral changes, including maintaining consistent sleep schedules, creating a restful sleep environment, and limiting screen time before bed. For persistent issues, medical treatments are available.`,
    questions: [
      { id: 41, question: 'What is the main idea of the passage?', options: ['Sleep disorders are increasing in modern society', 'Sleep is essential for physical and mental health', 'REM sleep is more important than deep sleep', 'Electronic devices should be banned at night'], correctAnswer: 1 },
      { id: 42, question: 'The word "ubiquity" in paragraph 1 is closest in meaning to', options: ['mystery', 'universal presence', 'difficulty', 'importance'], correctAnswer: 1 },
      { id: 43, question: 'According to paragraph 2, what happens during REM sleep?', options: ['The body repairs tissues', 'Most dreaming occurs', 'The immune system is strengthened', 'Muscle growth happens'], correctAnswer: 1 },
      { id: 44, question: 'What does the passage say about sleep cycles?', options: ['They last exactly one hour', 'They become shorter toward morning', 'They consist of stages lasting about 90 minutes each', 'They are identical for all people'], correctAnswer: 2 },
      { id: 45, question: 'The word "consolidation" in paragraph 3 refers to', options: ['weakening', 'strengthening and organizing', 'forgetting', 'processing emotionally'], correctAnswer: 1 },
      { id: 46, question: 'What is the glymphatic system?', options: ['A type of sleep disorder', 'A brain pathway that clears waste during sleep', 'The part of the brain that controls dreaming', 'A treatment for insomnia'], correctAnswer: 1 },
      { id: 47, question: 'According to the passage, what effect does blue light have?', options: ['It improves sleep quality', 'It disrupts melatonin production', 'It has no effect on sleep', 'It strengthens the glymphatic system'], correctAnswer: 1 },
      { id: 48, question: 'Why has shift work been classified as a probable carcinogen?', options: ['Because it requires physical labor', 'Because it disrupts circadian rhythms', 'Because it involves working with dangerous materials', 'Because it causes insomnia directly'], correctAnswer: 1 },
      { id: 49, question: 'The passage mentions all of the following as sleep disorders EXCEPT', options: ['insomnia', 'sleep apnea', 'narcolepsy', 'restless leg syndrome'], correctAnswer: 2 },
      { id: 50, question: 'Where in the passage does the author discuss the health consequences of sleep deprivation?', options: ['Paragraph 2', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'], correctAnswer: 2 }
    ]
  }
];

// =============================================
// Export Package D
// =============================================

export const packageD: QuestionPackage = {
  id: 'D',
  name: 'Paket D',
  description: 'Practice Test 4',
  listening,
  structure,
  reading
};

export default packageD;
