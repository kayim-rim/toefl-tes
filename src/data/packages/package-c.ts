// TOEFL ITP Package C - Practice Questions
// 140 Questions Total: 50 Listening, 40 Structure, 50 Reading
// All questions are original and based on official TOEFL ITP standards

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
    conversation: "Woman: I'm having trouble deciding which courses to take next semester.\nMan: Why not talk to your academic advisor? She helped me choose courses that fit my schedule perfectly.",
    question: 'What does the man suggest the woman do?',
    options: [
      'Choose courses randomly',
      'Consult her academic advisor',
      'Wait until next semester',
      'Drop some current courses'
    ],
    correctAnswer: 1,
    audioScript: "I'm having trouble deciding which courses to take next semester. Why not talk to your academic advisor? She helped me choose courses that fit my schedule perfectly. What does the man suggest the woman do?"
  },
  {
    id: 2,
    part: 'A',
    conversation: "Man: Did you hear that the university is building a new recreation center?\nWoman: Yes, and about time too! The current gym is always overcrowded.",
    question: 'What does the woman imply?',
    options: [
      'The current gym is adequate',
      'The new center is unnecessary',
      'The current facility is too crowded',
      'The construction will take too long'
    ],
    correctAnswer: 2,
    audioScript: 'Did you hear that the university is building a new recreation center? Yes, and about time too! The current gym is always overcrowded. What does the woman imply?'
  },
  {
    id: 3,
    part: 'A',
    conversation: "Woman: I thought the biology exam was going to be impossible.\nMan: You're telling me! I studied all night and still wasn't prepared for half the questions.",
    question: 'What does the man mean?',
    options: [
      'The exam was easy',
      'He was well prepared',
      'The exam was very difficult',
      'He did not study enough'
    ],
    correctAnswer: 2,
    audioScript: "I thought the biology exam was going to be impossible. You're telling me! I studied all night and still wasn't prepared for half the questions. What does the man mean?"
  },
  {
    id: 4,
    part: 'A',
    conversation: "Man: I've been trying to reach Professor Williams all week, but she's never in her office.\nWoman: Didn't you know? She's at a conference in Boston until Friday.",
    question: 'What does the woman mean?',
    options: [
      'The professor is avoiding the man',
      'The professor is out of town',
      'The professor has resigned',
      'The professor is teaching elsewhere'
    ],
    correctAnswer: 1,
    audioScript: "I've been trying to reach Professor Williams all week, but she's never in her office. Didn't you know? She's at a conference in Boston until Friday. What does the woman mean?"
  },
  {
    id: 5,
    part: 'A',
    conversation: "Woman: Would you mind if I borrowed your notes from yesterday's lecture?\nMan: Not at all. But let me warn you – my handwriting is almost impossible to read.",
    question: 'What does the man imply?',
    options: [
      'He does not have the notes',
      'He will not lend his notes',
      'His notes may be hard to understand',
      'He missed yesterday\'s lecture'
    ],
    correctAnswer: 2,
    audioScript: 'Would you mind if I borrowed your notes from yesterday\'s lecture? Not at all. But let me warn you – my handwriting is almost impossible to read. What does the man imply?'
  },
  {
    id: 6,
    part: 'A',
    conversation: "Man: I'm thinking about joining the debate team.\nWoman: That sounds perfect for you. You always have such strong opinions!",
    question: 'What does the woman mean?',
    options: [
      'She thinks the man is too argumentative',
      'She believes the man would be good at debating',
      'She wants to join the team too',
      'She thinks debate is a waste of time'
    ],
    correctAnswer: 1,
    audioScript: "I'm thinking about joining the debate team. That sounds perfect for you. You always have such strong opinions! What does the woman mean?"
  },
  {
    id: 7,
    part: 'A',
    conversation: "Woman: The library is closing early today for maintenance.\nMan: Oh no! I still need to return these books before the fine doubles tomorrow.",
    question: 'What will the man probably do?',
    options: [
      'Pay the fine tomorrow',
      'Return the books another day',
      'Try to return the books quickly',
      'Keep the books longer'
    ],
    correctAnswer: 2,
    audioScript: 'The library is closing early today for maintenance. Oh no! I still need to return these books before the fine doubles tomorrow. What will the man probably do?'
  },
  {
    id: 8,
    part: 'A',
    conversation: "Man: I can't believe how much the cafeteria food has improved.\nWoman: You can say that again! I actually look forward to lunch now.",
    question: 'What does the woman mean?',
    options: [
      'She disagrees with the man',
      'The food used to be better',
      'She agrees the food has improved',
      'She never eats at the cafeteria'
    ],
    correctAnswer: 2,
    audioScript: "I can't believe how much the cafeteria food has improved. You can say that again! I actually look forward to lunch now. What does the woman mean?"
  },
  {
    id: 9,
    part: 'A',
    conversation: "Woman: Did you finish reading the article for tomorrow's discussion?\nMan: I'm only halfway through. It's incredibly dense and hard to follow.",
    question: 'What does the man imply about the article?',
    options: [
      'It is short and easy',
      'It is difficult to understand',
      'It is very interesting',
      'It is not worth reading'
    ],
    correctAnswer: 1,
    audioScript: 'Did you finish reading the article for tomorrow\'s discussion? I\'m only halfway through. It\'s incredibly dense and hard to follow. What does the man imply about the article?'
  },
  {
    id: 10,
    part: 'A',
    conversation: "Man: I heard you got accepted into the study abroad program in Spain. Congratulations!\nWoman: Thanks! I'm nervous about the language barrier, but excited about the opportunity.",
    question: 'How does the woman feel about the program?',
    options: [
      'Completely confident',
      'Uninterested',
      'Both nervous and excited',
      'Regretful about applying'
    ],
    correctAnswer: 2,
    audioScript: "I heard you got accepted into the study abroad program in Spain. Congratulations! Thanks! I'm nervous about the language barrier, but excited about the opportunity. How does the woman feel about the program?"
  },
  {
    id: 11,
    part: 'A',
    conversation: "Woman: The printer in the computer lab is broken again.\nMan: That makes three times this month. Maybe we should just get a new one.",
    question: 'What does the man imply?',
    options: [
      'The printer should be replaced',
      'The printer can be fixed easily',
      'The printer is working fine',
      'Someone should report the problem'
    ],
    correctAnswer: 0,
    audioScript: 'The printer in the computer lab is broken again. That makes three times this month. Maybe we should just get a new one. What does the man imply?'
  },
  {
    id: 12,
    part: 'A',
    conversation: "Man: I didn't see you at the football game on Saturday.\nWoman: I had planned to go, but my car broke down on the way there.",
    question: 'What happened to the woman?',
    options: [
      'She forgot about the game',
      'She chose not to attend',
      'She had car trouble',
      'She arrived late to the game'
    ],
    correctAnswer: 2,
    audioScript: "I didn't see you at the football game on Saturday. I had planned to go, but my car broke down on the way there. What happened to the woman?"
  },
  {
    id: 13,
    part: 'A',
    conversation: "Woman: Are you going to the career workshop this afternoon?\nMan: I hadn't planned on it, but since you're going, I might as well tag along.",
    question: 'What does the man mean?',
    options: [
      'He has no interest in the workshop',
      'He will attend because the woman is going',
      'He has other plans this afternoon',
      'He thinks the workshop is mandatory'
    ],
    correctAnswer: 1,
    audioScript: 'Are you going to the career workshop this afternoon? I hadn\'t planned on it, but since you\'re going, I might as well tag along. What does the man mean?'
  },
  {
    id: 14,
    part: 'A',
    conversation: "Man: I've been working on this chemistry lab report for hours, but I just can't make sense of the data.\nWoman: Why don't you ask the teaching assistant? She explained similar problems in last week's review session.",
    question: 'What does the woman suggest?',
    options: [
      'The man should give up on the report',
      'The man should consult the teaching assistant',
      'The man should check his data again',
      'The man should attend the review session'
    ],
    correctAnswer: 1,
    audioScript: "I've been working on this chemistry lab report for hours, but I just can't make sense of the data. Why don't you ask the teaching assistant? She explained similar problems in last week's review session. What does the woman suggest?"
  },
  {
    id: 15,
    part: 'A',
    conversation: "Woman: I'm thinking about changing my major to economics.\nMan: Really? I thought you loved psychology. What changed your mind?",
    question: 'What can be inferred about the woman?',
    options: [
      'She has always liked economics',
      'She is reconsidering her field of study',
      'She is struggling in her psychology classes',
      'She has already changed her major'
    ],
    correctAnswer: 1,
    audioScript: "I'm thinking about changing my major to economics. Really? I thought you loved psychology. What changed your mind? What can be inferred about the woman?"
  },
  {
    id: 16,
    part: 'A',
    conversation: "Man: The tickets for the spring concert sold out in less than an hour!\nWoman: I'm not surprised. The band is incredibly popular on campus.",
    question: 'What does the woman mean?',
    options: [
      'The concert was not well advertised',
      'The band is not very good',
      'Quick ticket sales were expected',
      'There will be another concert'
    ],
    correctAnswer: 2,
    audioScript: 'The tickets for the spring concert sold out in less than an hour! I\'m not surprised. The band is incredibly popular on campus. What does the woman mean?'
  },
  {
    id: 17,
    part: 'A',
    conversation: "Woman: I can't find my student ID card anywhere. I need it to check out books.\nMan: Have you checked the lost and found at the security office?",
    question: 'What does the man suggest?',
    options: [
      'The woman should buy a new card',
      'The woman should look at the security office',
      'The woman should borrow books another time',
      'The woman should check her dorm room'
    ],
    correctAnswer: 1,
    audioScript: "I can't find my student ID card anywhere. I need it to check out books. Have you checked the lost and found at the security office? What does the man suggest?"
  },
  {
    id: 18,
    part: 'A',
    conversation: "Man: Are you coming to the study group tonight?\nWoman: I'd like to, but I promised my roommate I'd help her move furniture.",
    question: 'What will the woman probably do tonight?',
    options: [
      'Attend the study group',
      'Help her roommate',
      'Study alone in her room',
      'Go furniture shopping'
    ],
    correctAnswer: 1,
    audioScript: 'Are you coming to the study group tonight? I\'d like to, but I promised my roommate I\'d help her move furniture. What will the woman probably do tonight?'
  },
  {
    id: 19,
    part: 'A',
    conversation: "Woman: Did you understand what Professor Chen meant by 'paradigm shift'?\nMan: I was confused too, so I looked it up after class. It basically means a fundamental change in approach.",
    question: 'What did the man do?',
    options: [
      'Asked the professor directly',
      'Research the term himself',
      'Pretended to understand',
      'Discussed it with classmates'
    ],
    correctAnswer: 1,
    audioScript: 'Did you understand what Professor Chen meant by \'paradigm shift\'? I was confused too, so I looked it up after class. It basically means a fundamental change in approach. What did the man do?'
  },
  {
    id: 20,
    part: 'A',
    conversation: "Man: I heard the university is offering free guitar lessons this semester.\nWoman: That's great! I've always wanted to learn an instrument.",
    question: 'What does the woman imply?',
    options: [
      'She already plays the guitar',
      'She is not interested in music',
      'She would like to take the lessons',
      'She thinks the lessons are too expensive'
    ],
    correctAnswer: 2,
    audioScript: "I heard the university is offering free guitar lessons this semester. That's great! I've always wanted to learn an instrument. What does the woman imply?"
  },
  {
    id: 21,
    part: 'A',
    conversation: "Woman: Why didn't you come to the environmental club meeting yesterday?\nMan: I completely forgot about it. Was anything important discussed?",
    question: 'What does the man mean?',
    options: [
      'He chose not to attend',
      'He didn\'t remember the meeting',
      'He was busy with homework',
      'He doesn\'t care about the environment'
    ],
    correctAnswer: 1,
    audioScript: "Why didn't you come to the environmental club meeting yesterday? I completely forgot about it. Was anything important discussed? What does the man mean?"
  },
  {
    id: 22,
    part: 'A',
    conversation: "Man: Do you think Professor Martinez will extend the deadline for the research paper?\nWoman: Based on past experience, I wouldn't count on it.",
    question: 'What does the woman imply?',
    options: [
      'The professor will likely extend the deadline',
      'The professor rarely grants extensions',
      'She doesn\'t know the professor well',
      'The deadline has already passed'
    ],
    correctAnswer: 1,
    audioScript: 'Do you think Professor Martinez will extend the deadline for the research paper? Based on past experience, I wouldn\'t count on it. What does the woman imply?'
  },
  {
    id: 23,
    part: 'A',
    conversation: "Woman: I'm really impressed with your presentation today.\nMan: Thanks! I was so nervous beforehand that I almost didn't show up.",
    question: 'What does the man mean?',
    options: [
      'He was confident about the presentation',
      'He considered not attending',
      'The presentation was easy',
      'He was well prepared'
    ],
    correctAnswer: 1,
    audioScript: "I'm really impressed with your presentation today. Thanks! I was so nervous beforehand that I almost didn't show up. What does the man mean?"
  },
  {
    id: 24,
    part: 'A',
    conversation: "Man: The coffee shop on campus is having a half-price sale this week.\nWoman: That explains why there's such a long line every morning!",
    question: 'What does the woman mean?',
    options: [
      'She doesn\'t like coffee',
      'The sale price is too expensive',
      'The line is short this week',
      'The sale is attracting many customers'
    ],
    correctAnswer: 3,
    audioScript: 'The coffee shop on campus is having a half-price sale this week. That explains why there\'s such a long line every morning! What does the woman mean?'
  },
  {
    id: 25,
    part: 'A',
    conversation: "Woman: I just found out I got the summer internship at the museum!\nMan: That's fantastic! All your hard work applying has finally paid off.",
    question: 'What does the man mean?',
    options: [
      'The woman didn\'t deserve the internship',
      'The woman\'s efforts were successful',
      'The internship is unpaid',
      'He applied for the same position'
    ],
    correctAnswer: 1,
    audioScript: "I just found out I got the summer internship at the museum! That's fantastic! All your hard work applying has finally paid off. What does the man mean?"
  },
  {
    id: 26,
    part: 'A',
    conversation: "Man: Have you started studying for finals yet?\nWoman: Not really. I'm still trying to catch up on all the reading I missed during the semester.",
    question: 'What is the woman\'s current situation?',
    options: [
      'She has finished all her readings',
      'She is behind on her coursework',
      'She has started studying for finals',
      'She is well prepared for exams'
    ],
    correctAnswer: 1,
    audioScript: 'Have you started studying for finals yet? Not really. I\'m still trying to catch up on all the reading I missed during the semester. What is the woman\'s current situation?'
  },
  {
    id: 27,
    part: 'A',
    conversation: "Woman: I can't decide between taking statistics or calculus next semester.\nMan: If you're planning to go to graduate school in psychology, statistics would be more useful.",
    question: 'What does the man imply?',
    options: [
      'Calculus is easier than statistics',
      'Statistics is required for psychology',
      'The woman should take calculus',
      'Statistics would benefit the woman\'s goals'
    ],
    correctAnswer: 3,
    audioScript: "I can't decide between taking statistics or calculus next semester. If you're planning to go to graduate school in psychology, statistics would be more useful. What does the man imply?"
  },
  {
    id: 28,
    part: 'A',
    conversation: "Man: Did you hear that the campus bookstore is closing permanently next month?\nWoman: Yes, it's unfortunate. But the online textbooks are much cheaper anyway.",
    question: 'What does the woman mean?',
    options: [
      'She prefers buying books at the store',
      'She thinks the closing is a good thing',
      'She finds online books more affordable',
      'She never buys textbooks'
    ],
    correctAnswer: 2,
    audioScript: 'Did you hear that the campus bookstore is closing permanently next month? Yes, it\'s unfortunate. But the online textbooks are much cheaper anyway. What does the woman mean?'
  },
  {
    id: 29,
    part: 'A',
    conversation: "Woman: The new policy requires students to park in the remote lot and take a shuttle.\nMan: That's going to add at least twenty minutes to my commute.",
    question: 'What does the man imply?',
    options: [
      'He supports the new policy',
      'The shuttle is very fast',
      'The policy will inconvenience him',
      'He doesn\'t own a car'
    ],
    correctAnswer: 2,
    audioScript: 'The new policy requires students to park in the remote lot and take a shuttle. That\'s going to add at least twenty minutes to my commute. What does the man imply?'
  },
  {
    id: 30,
    part: 'A',
    conversation: "Man: I'm thinking of dropping my physics class.\nWoman: Before you do, why not talk to the professor? Maybe you can get some extra help.",
    question: 'What does the woman suggest?',
    options: [
      'The man should drop the class immediately',
      'The man should speak with the professor first',
      'The man should study harder on his own',
      'The class is too difficult'
    ],
    correctAnswer: 1,
    audioScript: "I'm thinking of dropping my physics class. Before you do, why not talk to the professor? Maybe you can get some extra help. What does the woman suggest?"
  },

  // ==========================================
  // PART B - Longer Conversations (8 questions)
  // ==========================================
  {
    id: 31,
    part: 'B',
    conversation: "Narrator: Listen to a conversation between a student and an academic advisor.\nStudent: I'm thinking about changing my major from business to environmental science.\nAdvisor: That's a significant change. What's driving this decision?\nStudent: I took an environmental studies elective last semester and found it fascinating. I've realized that I want to work on climate change issues, not sit in an office all day.\nAdvisor: That's a great reason. Have you looked at the requirements for environmental science? You'll need additional biology, chemistry, and math courses.\nStudent: I have. It will probably take me an extra semester to graduate, but I think it's worth it.\nAdvisor: That's realistic. Let me help you plan out your courses so you can transition smoothly. Also, there are several environmental internships available this summer that could give you experience in the field.\nStudent: That sounds perfect. I'd love to get some hands-on experience.",
    question: 'Why does the student want to change majors?',
    options: [
      'Business classes are too difficult',
      'He discovered a passion for environmental science',
      'His parents want him to change',
      'He wants to graduate earlier'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a conversation between a student and an academic advisor. I\'m thinking about changing my major from business to environmental science. That\'s a significant change. What\'s driving this decision? I took an environmental studies elective last semester and found it fascinating. I\'ve realized that I want to work on climate change issues, not sit in an office all day. Why does the student want to change majors?'
  },
  {
    id: 32,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What does the advisor say the student will need?',
    options: [
      'Fewer courses than expected',
      'Only business electives',
      'Additional science and math courses',
      'A completely new schedule immediately'
    ],
    correctAnswer: 2,
    audioScript: 'What does the advisor say the student will need?'
  },
  {
    id: 33,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'How long will it take the student to graduate after changing majors?',
    options: [
      'The same time as planned',
      'One extra semester',
      'Two extra years',
      'One extra year'
    ],
    correctAnswer: 1,
    audioScript: 'How long will it take the student to graduate after changing majors?'
  },
  {
    id: 34,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What does the advisor offer to help the student find?',
    options: [
      'A new roommate',
      'Summer internships',
      'Research funding',
      'A part-time job on campus'
    ],
    correctAnswer: 1,
    audioScript: 'What does the advisor offer to help the student find?'
  },
  {
    id: 35,
    part: 'B',
    conversation: "Narrator: Listen to a conversation between a professor and a student about a research project.\nProfessor: So, you want to study bee populations for your senior thesis?\nStudent: Yes, Professor. I've been reading about colony collapse disorder, and I'd like to investigate how pesticide use affects local bee populations.\nProfessor: That's an important topic. Have you thought about your methodology? You'll need access to several apiaries and permission from local farmers.\nStudent: I've already contacted three beekeepers who are willing to let me study their hives. I'm also planning to survey farmers about their pesticide use.\nProfessor: Excellent preparation. You'll need to submit your proposal to the ethics committee before you can begin data collection.\nStudent: I've drafted the proposal. Would you be willing to review it before I submit it?\nProfessor: Of course. Bring it to my office hours on Thursday, and we'll go over it together.",
    question: 'What is the main topic of the conversation?',
    options: [
      'The student\'s plans for a research project on bees',
      'Problems with the university\'s ethics committee',
      'How to become a beekeeper',
      'The professor\'s research on pesticides'
    ],
    correctAnswer: 0,
    audioScript: 'Listen to a conversation between a professor and a student about a research project. So, you want to study bee populations for your senior thesis? Yes, Professor. I\'ve been reading about colony collapse disorder, and I\'d like to investigate how pesticide use affects local bee populations. What is the main topic of the conversation?'
  },
  {
    id: 36,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What has the student already done for the research?',
    options: [
      'Collected all the data',
      'Contacted beekeepers for access',
      'Received ethics committee approval',
      'Published preliminary results'
    ],
    correctAnswer: 1,
    audioScript: 'What has the student already done for the research?'
  },
  {
    id: 37,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What does the professor say the student needs to do before collecting data?',
    options: [
      'Take more courses',
      'Get approval from the ethics committee',
      'Find more beekeepers',
      'Change the research topic'
    ],
    correctAnswer: 1,
    audioScript: 'What does the professor say the student needs to do before collecting data?'
  },
  {
    id: 38,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'When will the professor review the student\'s proposal?',
    options: [
      'During class tomorrow',
      'At the end of the semester',
      'During office hours on Thursday',
      'Next month'
    ],
    correctAnswer: 2,
    audioScript: 'When will the professor review the student\'s proposal?'
  },

  // ==========================================
  // PART C - Academic Talks (12 questions)
  // ==========================================
  {
    id: 39,
    part: 'C',
    talk: "Narrator: Listen to a lecture about the history of chocolate.\nProfessor: Chocolate has a fascinating history that spans thousands of years. The story begins in Mesoamerica, where the ancient Olmec civilization first cultivated the cacao tree around 1500 BCE. The Olmecs were followed by the Maya, who developed a bitter, spicy drink made from ground cacao beans, water, and chili peppers. This drink was called 'xocolatl,' which means 'bitter water.'\nThe Aztecs later adopted cacao and considered it a gift from the gods. Cacao beans became so valuable that they were used as currency. When Spanish conquistadors arrived in the 16th century, they brought cacao back to Europe. However, Europeans found the bitter drink unappealing until they added sugar and milk.\nBy the 19th century, technological advances made it possible to produce solid chocolate. In 1847, the first chocolate bar was created in England. Today, chocolate is a billion-dollar industry, with the average person consuming about 3 kilograms per year. Interestingly, recent research suggests that dark chocolate, consumed in moderation, may have health benefits due to its antioxidant content.",
    question: 'Where did the cultivation of cacao first begin?',
    options: [
      'In Europe',
      'In Mesoamerica',
      'In Africa',
      'In Asia'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a lecture about the history of chocolate. Chocolate has a fascinating history that spans thousands of years. The story begins in Mesoamerica, where the ancient Olmec civilization first cultivated the cacao tree around 1500 BCE. Where did the cultivation of cacao first begin?'
  },
  {
    id: 40,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What does the speaker say about the Aztecs and cacao?',
    options: [
      'They invented chocolate bars',
      'They used cacao beans as money',
      'They added sugar to the drink',
      'They exported cacao to Europe'
    ],
    correctAnswer: 1,
    audioScript: 'What does the speaker say about the Aztecs and cacao?'
  },
  {
    id: 41,
    part: 'C',
    talk: 'Same talk as above',
    question: 'How did Europeans change the chocolate drink?',
    options: [
      'They made it spicier',
      'They removed the water',
      'They added sugar and milk',
      'They served it cold'
    ],
    correctAnswer: 2,
    audioScript: 'How did Europeans change the chocolate drink?'
  },
  {
    id: 42,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the lecture, what potential benefit does dark chocolate have?',
    options: [
      'It helps people sleep better',
      'It contains antioxidants',
      'It improves memory instantly',
      'It prevents all diseases'
    ],
    correctAnswer: 1,
    audioScript: 'According to the lecture, what potential benefit does dark chocolate have?'
  },
  {
    id: 43,
    part: 'C',
    talk: "Narrator: Listen to a lecture about volcanoes.\nProfessor: Volcanoes are one of Earth's most dramatic natural phenomena. They form primarily at the boundaries of tectonic plates, where molten rock called magma rises to the surface. There are three main types of volcanoes: shield volcanoes, stratovolcanoes, and cinder cones.\nShield volcanoes, like those in Hawaii, have broad, gently sloping sides formed by flowing lava. Stratovolcanoes, also called composite volcanoes, have steep sides and are built from alternating layers of lava and ash. Famous examples include Mount Fuji in Japan and Mount St. Helens in the United States. Cinder cones are the smallest type, formed from volcanic debris.\nVolcanic eruptions can be devastating, but they also bring benefits. Volcanic soil is extremely fertile, which is why many people live near active volcanoes despite the risks. Additionally, volcanic activity creates geothermal energy, a renewable power source. Scientists monitor active volcanoes closely to predict eruptions and protect nearby populations.",
    question: 'What is the main topic of the lecture?',
    options: [
      'How to predict volcanic eruptions',
      'Types of volcanoes and their characteristics',
      'The dangers of living near volcanoes',
      'The history of Mount St. Helens'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a lecture about volcanoes. Volcanoes are one of Earth\'s most dramatic natural phenomena. They form primarily at the boundaries of tectonic plates, where molten rock called magma rises to the surface. What is the main topic of the lecture?'
  },
  {
    id: 44,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Which type of volcano has broad, gently sloping sides?',
    options: [
      'Stratovolcano',
      'Cinder cone',
      'Shield volcano',
      'Composite volcano'
    ],
    correctAnswer: 2,
    audioScript: 'Which type of volcano has broad, gently sloping sides?'
  },
  {
    id: 45,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What benefit of volcanic activity does the professor mention?',
    options: [
      'Creating new islands',
      'Producing fertile soil',
      'Causing earthquakes',
      'Generating electricity directly'
    ],
    correctAnswer: 1,
    audioScript: 'What benefit of volcanic activity does the professor mention?'
  },
  {
    id: 46,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Why do scientists monitor active volcanoes?',
    options: [
      'To study rock formations',
      'To predict eruptions and protect people',
      'To mine volcanic minerals',
      'To create artificial eruptions'
    ],
    correctAnswer: 1,
    audioScript: 'Why do scientists monitor active volcanoes?'
  },
  {
    id: 47,
    part: 'C',
    talk: "Narrator: Listen to a lecture about the invention of the printing press.\nProfessor: The invention of the printing press in the 15th century revolutionized human communication. Before this invention, books were hand-copied by monks and scribes, making them extremely expensive and rare. Only the wealthiest individuals and institutions could afford to own books.\nAround 1440, Johannes Gutenberg, a German goldsmith, developed a printing press that used movable metal type. This invention allowed books to be produced quickly and cheaply. Gutenberg's famous Bible, completed around 1455, was the first major book printed in Europe using this technology.\nThe impact of the printing press was enormous. Literacy rates increased dramatically as books became more affordable. Ideas could spread rapidly across Europe, leading to the Renaissance, the Protestant Reformation, and the Scientific Revolution. The printing press is often considered one of the most important inventions in human history, laying the foundation for the information age we live in today.",
    question: 'What problem did the printing press solve?',
    options: [
      'Poor quality paper',
      'The high cost and scarcity of books',
      'Lack of educated monks',
      'Inability to write in Latin'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a lecture about the invention of the printing press. The invention of the printing press in the 15th century revolutionized human communication. Before this invention, books were hand-copied by monks and scribes, making them extremely expensive and rare. What problem did the printing press solve?'
  },
  {
    id: 48,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What was Gutenberg\'s profession before inventing the printing press?',
    options: [
      'Monk',
      'Teacher',
      'Goldsmith',
      'Scribe'
    ],
    correctAnswer: 2,
    audioScript: 'What was Gutenberg\'s profession before inventing the printing press?'
  },
  {
    id: 49,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the lecture, what was the first major book printed in Europe?',
    options: [
      'A science textbook',
      'Gutenberg\'s Bible',
      'A collection of poems',
      'A history of Rome'
    ],
    correctAnswer: 1,
    audioScript: 'According to the lecture, what was the first major book printed in Europe?'
  },
  {
    id: 50,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What effect did the printing press have on society?',
    options: [
      'Literacy rates decreased',
      'Books became more expensive',
      'Ideas spread more rapidly',
      'Monks became more powerful'
    ],
    correctAnswer: 2,
    audioScript: 'What effect did the printing press have on society?'
  }
];

// =============================================
// STRUCTURE SECTION - 40 Questions
// =============================================

const structure: StructureQuestion[] = [
  // Questions 1-15: Sentence Completion
  {
    id: 1,
    type: 'structure',
    sentence: 'The Himalayan mountain range _______ between India and Tibet.',
    options: ['located', 'is located', 'locating', 'which located'],
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'structure',
    sentence: '_______ requires both technical skill and artistic vision.',
    options: ['Architecture that', 'Architecture', 'It is architecture', 'Architecture, which'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'structure',
    sentence: 'The more carefully a scientist conducts experiments, _______ the results will be.',
    options: ['more reliable', 'the more reliable', 'most reliable', 'the most reliable'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'structure',
    sentence: 'Not until the late nineteenth century _______ as a legitimate field of study.',
    options: ['psychology was recognized', 'was psychology recognized', 'psychology recognized', 'recognized psychology'],
    correctAnswer: 1
  },
  {
    id: 5,
    type: 'structure',
    sentence: 'The composer Mozart, _______ over 600 pieces of music, died at the age of 35.',
    options: ['wrote', 'who wrote', 'writing', 'written'],
    correctAnswer: 1
  },
  {
    id: 6,
    type: 'structure',
    sentence: '_______ the most abundant gas in Earth\'s atmosphere.',
    options: ['Nitrogen is', 'Nitrogen, it is', 'Nitrogen which is', 'That nitrogen is'],
    correctAnswer: 0
  },
  {
    id: 7,
    type: 'structure',
    sentence: 'The Great Wall of China, _______ over 2,000 years ago, stretches for thousands of kilometers.',
    options: ['built', 'building', 'was built', 'which building'],
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'structure',
    sentence: '_______ the effects of gravity, objects fall toward Earth at a rate of 9.8 meters per second squared.',
    options: ['Because of', 'Because', 'Due', 'As a result'],
    correctAnswer: 0
  },
  {
    id: 9,
    type: 'structure',
    sentence: 'Neither the students nor the professor _______ about the room change.',
    options: ['know', 'knows', 'knowing', 'known'],
    correctAnswer: 1
  },
  {
    id: 10,
    type: 'structure',
    sentence: 'The assembly line, _______ by Henry Ford, revolutionized manufacturing.',
    options: ['introduced', 'introducing', 'which introducing', 'was introduced'],
    correctAnswer: 0
  },
  {
    id: 11,
    type: 'structure',
    sentence: '_______ a major environmental concern in many coastal cities.',
    options: ['Rising sea levels are', 'Rising sea levels is', 'The rising sea level are', 'That rising sea levels'],
    correctAnswer: 0
  },
  {
    id: 12,
    type: 'structure',
    sentence: 'The element carbon is found in all living organisms and _______ the basis of organic chemistry.',
    options: ['forms', 'forming', 'formed', 'which forms'],
    correctAnswer: 0
  },
  {
    id: 13,
    type: 'structure',
    sentence: 'It was Marie Curie _______ the elements polonium and radium.',
    options: ['discovered', 'who discovered', 'discovering', 'who discovering'],
    correctAnswer: 1
  },
  {
    id: 14,
    type: 'structure',
    sentence: '_______ is essential for maintaining healthy bones and teeth.',
    options: ['Calcium that', 'Calcium, which', 'Calcium', 'It is calcium'],
    correctAnswer: 2
  },
  {
    id: 15,
    type: 'structure',
    sentence: 'The novel _______ by the famous author won several literary awards.',
    options: ['writing', 'written', 'wrote', 'was written'],
    correctAnswer: 1
  },
  // Questions 16-40: Error Identification
  {
    id: 16,
    type: 'written',
    sentence: 'The number of students attending the university have increased significantly over the past decade.',
    underlinedParts: ['The number of students', 'attending the university', 'have increased', 'significantly over the past decade.'],
    correctAnswer: 2
  },
  {
    id: 17,
    type: 'written',
    sentence: 'Despite the weather was bad, the football game continued as scheduled.',
    underlinedParts: ['Despite the weather', 'was bad,', 'the football game continued', 'as scheduled.'],
    correctAnswer: 0
  },
  {
    id: 18,
    type: 'written',
    sentence: 'Each of the committee members have their own opinion about the proposal.',
    underlinedParts: ['Each of the committee members', 'have their', 'own opinion', 'about the proposal.'],
    correctAnswer: 1
  },
  {
    id: 19,
    type: 'written',
    sentence: 'The main reason for the meeting are to discuss the new company policies.',
    underlinedParts: ['The main reason', 'for the meeting', 'are to discuss', 'the new company policies.'],
    correctAnswer: 2
  },
  {
    id: 20,
    type: 'written',
    sentence: 'The more you practice playing the piano, the more easier it becomes.',
    underlinedParts: ['The more you practice', 'playing the piano,', 'the more easier', 'it becomes.'],
    correctAnswer: 2
  },
  {
    id: 21,
    type: 'written',
    sentence: 'The data suggests that climate change are affecting migration patterns of many species.',
    underlinedParts: ['The data suggests', 'that climate change', 'are affecting', 'migration patterns of many species.'],
    correctAnswer: 2
  },
  {
    id: 22,
    type: 'written',
    sentence: 'The building that designs were submitted last month will be constructed next year.',
    underlinedParts: ['The building', 'that designs', 'were submitted last month', 'will be constructed next year.'],
    correctAnswer: 1
  },
  {
    id: 23,
    type: 'written',
    sentence: 'The experiment must be conduct under strict laboratory conditions.',
    underlinedParts: ['The experiment', 'must be conduct', 'under strict', 'laboratory conditions.'],
    correctAnswer: 1
  },
  {
    id: 24,
    type: 'written',
    sentence: 'The students who finishes the exam early may leave the room quietly.',
    underlinedParts: ['The students who', 'finishes the exam', 'early may leave', 'the room quietly.'],
    correctAnswer: 1
  },
  {
    id: 25,
    type: 'written',
    sentence: 'A large number of research has been conducted on this topic in recent years.',
    underlinedParts: ['A large number', 'of research has been', 'conducted on this topic', 'in recent years.'],
    correctAnswer: 0
  },
  {
    id: 26,
    type: 'written',
    sentence: 'The ancient manuscripts was discovered in a cave by archaeologists last summer.',
    underlinedParts: ['The ancient manuscripts', 'was discovered', 'in a cave by archaeologists', 'last summer.'],
    correctAnswer: 1
  },
  {
    id: 27,
    type: 'written',
    sentence: 'Neither the manager nor the employees was informed about the schedule change.',
    underlinedParts: ['Neither the manager', 'nor the employees', 'was informed', 'about the schedule change.'],
    correctAnswer: 2
  },
  {
    id: 28,
    type: 'written',
    sentence: 'The company has decided to increase their prices due to rising production costs.',
    underlinedParts: ['The company has decided', 'to increase their prices', 'due to rising', 'production costs.'],
    correctAnswer: 1
  },
  {
    id: 29,
    type: 'written',
    sentence: 'Of the two proposals, the first one is the most practical for our situation.',
    underlinedParts: ['Of the two proposals,', 'the first one is', 'the most practical', 'for our situation.'],
    correctAnswer: 2
  },
  {
    id: 30,
    type: 'written',
    sentence: 'The scientist whom discovered the vaccine received international recognition.',
    underlinedParts: ['The scientist', 'whom discovered', 'the vaccine received', 'international recognition.'],
    correctAnswer: 1
  },
  {
    id: 31,
    type: 'written',
    sentence: 'The more higher the altitude, the thinner the air becomes.',
    underlinedParts: ['The more higher', 'the altitude,', 'the thinner the air', 'becomes.'],
    correctAnswer: 0
  },
  {
    id: 32,
    type: 'written',
    sentence: 'A variety of solutions has been proposed to address the environmental crisis.',
    underlinedParts: ['A variety of solutions', 'has been proposed', 'to address', 'the environmental crisis.'],
    correctAnswer: 1
  },
  {
    id: 33,
    type: 'written',
    sentence: 'The professor, along with her assistants, are conducting a groundbreaking study on genetics.',
    underlinedParts: ['The professor,', 'along with her assistants,', 'are conducting', 'a groundbreaking study on genetics.'],
    correctAnswer: 2
  },
  {
    id: 34,
    type: 'written',
    sentence: 'The book who I borrowed from the library was extremely informative.',
    underlinedParts: ['The book', 'who I borrowed', 'from the library', 'was extremely informative.'],
    correctAnswer: 1
  },
  {
    id: 35,
    type: 'written',
    sentence: 'The new policy will be implement starting next month according to the announcement.',
    underlinedParts: ['The new policy', 'will be implement', 'starting next month', 'according to the announcement.'],
    correctAnswer: 1
  },
  {
    id: 36,
    type: 'written',
    sentence: 'The economic data were carefully analyzed by the research team.',
    underlinedParts: ['The economic data', 'were carefully analyzed', 'by the research', 'team.'],
    correctAnswer: 3
  },
  {
    id: 37,
    type: 'written',
    sentence: 'Students which do not submit their assignments on time will receive a penalty.',
    underlinedParts: ['Students which', 'do not submit their assignments', 'on time will receive', 'a penalty.'],
    correctAnswer: 0
  },
  {
    id: 38,
    type: 'written',
    sentence: 'The information provided in the brochure were helpful for planning our trip.',
    underlinedParts: ['The information provided', 'in the brochure', 'were helpful', 'for planning our trip.'],
    correctAnswer: 2
  },
  {
    id: 39,
    type: 'written',
    sentence: 'This is one of the most interesting book I have ever read.',
    underlinedParts: ['This is', 'one of the most', 'interesting book', 'I have ever read.'],
    correctAnswer: 2
  },
  {
    id: 40,
    type: 'written',
    sentence: 'The museum\'s collection includes artifacts that dates back to ancient civilizations.',
    underlinedParts: ['The museum\'s collection includes', 'artifacts that', 'dates back', 'to ancient civilizations.'],
    correctAnswer: 2
  }
];

// =============================================
// READING SECTION - 50 Questions
// =============================================

const reading: ReadingPassage[] = [
  {
    id: 1,
    title: 'The History and Science of Chocolate',
    text: `Chocolate is one of the world's most beloved foods, yet its journey from a bitter Mesoamerican beverage to the sweet confection we know today spans thousands of years. The story begins with the cacao tree (Theobroma cacao), which thrives in the tropical regions within 20 degrees of the equator. The tree produces pods containing 30-50 seeds, commonly known as cacao beans, which are the raw material for all chocolate products.

The Olmec civilization of southern Mexico was likely the first to domesticate the cacao tree, around 1500 BCE. They were followed by the Maya, who developed a complex relationship with cacao. The Maya created a frothy, bitter drink by grinding cacao beans and mixing them with water, chili peppers, and other spices. This beverage, called "xocolatl," played an important role in religious ceremonies and was consumed by the elite classes. Cacao beans were so valuable that they served as a form of currency; a turkey could be purchased for 100 cacao beans.

When Spanish conquistadors arrived in the Americas in the 16th century, they initially found the bitter chocolate drink unappealing. However, after adding sugar, cinnamon, and other sweeteners, chocolate became popular among the Spanish aristocracy. The Spanish kept chocolate a closely guarded secret for nearly a century before it spread to other European countries. By the 17th century, chocolate houses had become fashionable gathering places in London and Paris.

The Industrial Revolution transformed chocolate production. In 1828, a Dutch chemist named Coenraad van Houten invented a press that could remove about half the cocoa butter from chocolate liquor, creating a powder that could be mixed with liquids. This innovation led to the development of solid chocolate. In 1847, the first chocolate bar was created in England by J.S. Fry & Sons. Later, in Switzerland, Daniel Peter and Henri Nestlé collaborated to invent milk chocolate in 1875.

Modern chocolate production involves several precise steps. First, cacao beans are harvested, fermented, and dried. The beans are then roasted to develop their characteristic flavor. After roasting, the shells are removed, leaving cocoa nibs that are ground into chocolate liquor. This liquor can be separated into cocoa butter and cocoa powder, or processed further with sugar and milk to create the various types of chocolate we enjoy today.

Recent research has revealed potential health benefits of dark chocolate. It contains flavonoids, antioxidant compounds that may help reduce inflammation and improve cardiovascular health. However, these benefits must be balanced against chocolate's high calorie and sugar content. The chocolate industry generates over $100 billion annually, with Europe and the United States being the largest consumers.`,
    questions: [
      {
        id: 1,
        question: 'What is the main idea of the passage?',
        options: [
          'The process of making chocolate in modern factories',
          'The history, production, and significance of chocolate',
          'The health benefits of eating dark chocolate',
          'The economic importance of the cacao trade'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'According to the passage, which civilization first domesticated the cacao tree?',
        options: [
          'The Maya',
          'The Aztecs',
          'The Olmecs',
          'The Spanish'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'The word "domesticate" in paragraph 2 is closest in meaning to',
        options: [
          'Destroy',
          'Cultivate',
          'Discover',
          'Protect'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'Why were cacao beans used as currency by the Maya?',
        options: [
          'They were easy to carry',
          'They were valuable',
          'They were produced locally',
          'They were approved by the government'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'How did the Spanish initially react to the chocolate drink?',
        options: [
          'They loved it immediately',
          'They found it unappealing at first',
          'They refused to try it',
          'They thought it was poisonous'
        ],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'The word "guarded" in paragraph 3 is closest in meaning to',
        options: [
          'Watched',
          'Protected',
          'Secret',
          'Suspicious'
        ],
        correctAnswer: 2
      },
      {
        id: 7,
        question: 'What did Coenraad van Houten invent?',
        options: [
          'The first chocolate bar',
          'Milk chocolate',
          'A press to remove cocoa butter',
          'A method for fermenting beans'
        ],
        correctAnswer: 2
      },
      {
        id: 8,
        question: 'According to paragraph 4, where was milk chocolate invented?',
        options: [
          'England',
          'Holland',
          'Spain',
          'Switzerland'
        ],
        correctAnswer: 3
      },
      {
        id: 9,
        question: 'What does the author imply about dark chocolate?',
        options: [
          'It is completely healthy',
          'It should be eaten in moderation',
          'It is more popular than milk chocolate',
          'It was invented before milk chocolate'
        ],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'The passage mentions all of the following as steps in chocolate production EXCEPT',
        options: [
          'Fermenting the beans',
          'Roasting the beans',
          'Adding preservatives',
          'Grinding the nibs'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    title: 'Volcanoes and Plate Tectonics',
    text: `Volcanoes are among Earth's most powerful and dramatic natural features, capable of both destructive fury and creative force. Understanding volcanoes requires knowledge of plate tectonics, the theory that Earth's outer shell is divided into several plates that glide over the mantle. Most volcanic activity occurs at plate boundaries, where plates interact with each other.

There are three main types of plate boundaries where volcanic activity is concentrated. At divergent boundaries, plates move apart, allowing magma to rise from the mantle and create new crust. The Mid-Atlantic Ridge, an underwater mountain range, is an example of volcanic activity at a divergent boundary. Iceland, which sits on this ridge, has numerous active volcanoes.

At convergent boundaries, one plate moves beneath another in a process called subduction. The subducting plate melts as it descends into the hot mantle, and the resulting magma rises to form volcanoes on the overriding plate. The Pacific Ring of Fire, a horseshoe-shaped zone around the Pacific Ocean, contains about 75% of Earth's active volcanoes and results from subduction zones. Mount St. Helens in the United States and Mount Fuji in Japan are examples of volcanoes formed at convergent boundaries.

Hot spots represent a third type of volcanic setting, unrelated to plate boundaries. These are areas where magma rises from deep within the mantle, creating volcanoes as plates move over them. The Hawaiian Islands were formed by a hot spot that has been active for millions of years. As the Pacific Plate moves northwest, new islands form over the stationary hot spot, creating a chain of volcanic islands.

Volcanoes are classified by their shape and eruption style. Shield volcanoes have broad, gently sloping sides built by layers of flowing lava. Mauna Loa in Hawaii is a classic shield volcano. Stratovolcanoes, or composite volcanoes, have steep sides built by alternating layers of lava and volcanic ash. Cinder cones are the smallest type, formed from fragments of volcanic rock.

Volcanic eruptions can cause significant destruction through lava flows, ash fall, pyroclastic flows (fast-moving clouds of hot gas and rock), and lahars (mudflows). However, volcanoes also provide benefits. Volcanic soils are among the most fertile on Earth, rich in minerals and nutrients. Geothermal energy from volcanic areas provides clean, renewable power. Over geological time, volcanic gases helped create Earth's atmosphere and oceans.`,
    questions: [
      {
        id: 11,
        question: 'What is the main topic of the passage?',
        options: [
          'How to predict volcanic eruptions',
          'The formation and types of volcanoes',
          'The dangers of living near volcanoes',
          'How to harness geothermal energy'
        ],
        correctAnswer: 1
      },
      {
        id: 12,
        question: 'According to the passage, where does most volcanic activity occur?',
        options: [
          'In the center of continents',
          'At plate boundaries',
          'Under the oceans only',
          'Near the equator'
        ],
        correctAnswer: 1
      },
      {
        id: 13,
        question: 'The word "concentrated" in paragraph 2 is closest in meaning to',
        options: [
          'Diluted',
          'Focused',
          'Hidden',
          'Reduced'
        ],
        correctAnswer: 1
      },
      {
        id: 14,
        question: 'What happens at divergent boundaries?',
        options: [
          'Plates collide',
          'Plates move apart',
          'One plate sinks beneath another',
          'Plates remain stationary'
        ],
        correctAnswer: 1
      },
      {
        id: 15,
        question: 'What percentage of Earth\'s active volcanoes are in the Pacific Ring of Fire?',
        options: [
          'About 50%',
          'About 75%',
          'About 25%',
          'About 90%'
        ],
        correctAnswer: 1
      },
      {
        id: 16,
        question: 'The word "stationary" in paragraph 4 is closest in meaning to',
        options: [
          'Moving',
          'Fixed',
          'Active',
          'Dormant'
        ],
        correctAnswer: 1
      },
      {
        id: 17,
        question: 'How were the Hawaiian Islands formed?',
        options: [
          'At a convergent boundary',
          'At a divergent boundary',
          'By a hot spot under a moving plate',
          'By ancient human activity'
        ],
        correctAnswer: 2
      },
      {
        id: 18,
        question: 'Which type of volcano has broad, gently sloping sides?',
        options: [
          'Stratovolcano',
          'Cinder cone',
          'Composite volcano',
          'Shield volcano'
        ],
        correctAnswer: 3
      },
      {
        id: 19,
        question: 'According to the passage, what is a benefit of volcanic activity?',
        options: [
          'Preventing earthquakes',
          'Creating fertile soil',
          'Stopping plate movement',
          'Eliminating greenhouse gases'
        ],
        correctAnswer: 1
      },
      {
        id: 20,
        question: 'What can be inferred about volcanic soils?',
        options: [
          'They are poor for farming',
          'They contain few minerals',
          'They are good for agriculture',
          'They take centuries to form'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 3,
    title: 'The Evolution of Jazz Music',
    text: `Jazz is often called America's classical music, a uniquely American art form that emerged in the early 20th century from the cultural melting pot of New Orleans. This musical genre represents a synthesis of African rhythms, European harmony, and American blues traditions. Understanding jazz requires appreciation for its key elements: improvisation, syncopation, and swing rhythms.

The roots of jazz lie in the African American experience. Enslaved Africans brought their musical traditions to America, where they evolved into spirituals, work songs, and the blues. In New Orleans, a port city with French, Spanish, and African influences, these traditions blended with European classical music and military band music to create a new sound. The city's Storyville district, with its numerous dance halls and clubs, provided fertile ground for early jazz musicians.

The 1920s became known as the Jazz Age, marking the first time jazz gained widespread popularity. Recordings by artists like Louis Armstrong, Jelly Roll Morton, and King Oliver brought jazz to a national audience. Armstrong, perhaps the most influential jazz musician of all time, revolutionized the art of solo improvisation and demonstrated that a single performer could carry a melody. His recordings with his Hot Five and Hot Seven bands remain essential listening for jazz enthusiasts.

The 1930s and 1940s saw the rise of the Swing Era, when big bands led by Duke Ellington, Count Basie, and Benny Goodman dominated popular music. These large ensembles featured sections of trumpets, trombones, saxophones, and a rhythm section, playing arranged compositions with spaces for improvised solos. Ellington, a prolific composer and bandleader, wrote thousands of compositions and elevated jazz to a sophisticated art form.

In the mid-1940s, a group of musicians in New York City developed bebop, a complex and challenging style that marked a departure from the dance-oriented swing music. Charlie Parker, Dizzy Gillespie, and Thelonious Monk created music with faster tempos, complex harmonies, and intricate melodies. Bebop was music for listening rather than dancing, establishing jazz as a serious art form to be studied and analyzed.

Jazz continued to evolve through the second half of the 20th century, embracing influences from rock, funk, and world music. Miles Davis, who had been at the forefront of bebop, later pioneered modal jazz and jazz fusion. Today, jazz is performed and studied worldwide, with jazz education programs at universities across the globe. The genre's emphasis on creativity, individual expression, and cultural collaboration ensures its continued relevance.`,
    questions: [
      {
        id: 21,
        question: 'What is the main idea of the passage?',
        options: [
          'The biography of Louis Armstrong',
          'The origins and development of jazz music',
          'How to play jazz instruments',
          'The economic impact of jazz'
        ],
        correctAnswer: 1
      },
      {
        id: 22,
        question: 'Where did jazz originate?',
        options: [
          'New York City',
          'Chicago',
          'New Orleans',
          'Los Angeles'
        ],
        correctAnswer: 2
      },
      {
        id: 23,
        question: 'The word "synthesis" in paragraph 1 is closest in meaning to',
        options: [
          'Destruction',
          'Combination',
          'Separation',
          'Limitation'
        ],
        correctAnswer: 1
      },
      {
        id: 24,
        question: 'Which musical traditions contributed to the development of jazz?',
        options: [
          'Only European classical music',
          'Only African rhythms',
          'African, European, and American blues traditions',
          'Asian and Native American music'
        ],
        correctAnswer: 2
      },
      {
        id: 25,
        question: 'According to paragraph 2, what was significant about Storyville?',
        options: [
          'It was a residential area',
          'It was a center for early jazz development',
          'It was where jazz was invented',
          'It was a university district'
        ],
        correctAnswer: 1
      },
      {
        id: 26,
        question: 'What did Louis Armstrong contribute to jazz?',
        options: [
          'He invented the saxophone',
          'He revolutionized solo improvisation',
          'He founded the first jazz school',
          'He wrote classical compositions'
        ],
        correctAnswer: 1
      },
      {
        id: 27,
        question: 'The word "prolific" in paragraph 4 is closest in meaning to',
        options: [
          'Productive',
          'Lazy',
          'Wealthy',
          'Unknown'
        ],
        correctAnswer: 0
      },
      {
        id: 28,
        question: 'How was bebop different from swing music?',
        options: [
          'It was simpler',
          'It was for dancing',
          'It was more complex and for listening',
          'It used smaller bands only'
        ],
        correctAnswer: 2
      },
      {
        id: 29,
        question: 'Who pioneered modal jazz and jazz fusion?',
        options: [
          'Louis Armstrong',
          'Charlie Parker',
          'Miles Davis',
          'Duke Ellington'
        ],
        correctAnswer: 2
      },
      {
        id: 30,
        question: 'What can be inferred about jazz education today?',
        options: [
          'It is no longer available',
          'It exists only in America',
          'It is taught at universities worldwide',
          'It focuses only on classical jazz'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 4,
    title: 'Gothic Architecture',
    text: `Gothic architecture emerged in 12th century France and dominated European building design for nearly four centuries. This architectural style, which developed from Romanesque architecture, is characterized by verticality, light, and intricate ornamentation. The term "Gothic" was originally a pejorative label coined during the Renaissance to describe what was considered barbaric architecture, but today the style is celebrated for its engineering innovations and aesthetic beauty.

The most distinctive features of Gothic architecture are the pointed arch, ribbed vault, and flying buttress. The pointed arch, unlike the rounded Romanesque arch, directed weight more vertically, allowing for taller structures. Ribbed vaults, formed by the intersection of arched ribs, distributed weight more efficiently than solid vaults. The flying buttress, an external support structure, transferred the weight of the roof and walls outward to external piers, freeing interior walls from load-bearing functions.

These technical innovations had profound aesthetic consequences. By transferring structural weight to external supports, architects could replace solid walls with large stained glass windows. Light became a central element of Gothic design, both literally and symbolically. Medieval theologians viewed light as a manifestation of divine presence, and the luminous interiors of Gothic cathedrals were designed to inspire spiritual awe. The rose windows at Notre Dame de Paris and Chartres Cathedral are among the most celebrated examples of Gothic stained glass.

Gothic cathedrals were designed on a grand scale, often taking decades or even centuries to complete. Salisbury Cathedral in England was built relatively quickly, taking only 38 years, while Cologne Cathedral in Germany took over 600 years to finish. These buildings served as community centers, pilgrimage sites, and expressions of civic pride. Their construction required the coordination of architects, masons, sculptors, glaziers, and other craftsmen.

The interior spaces of Gothic cathedrals emphasize verticality and mystery. Tall, slender columns draw the eye upward toward the vaulted ceiling. Sculptural details, including gargoyles and biblical figures, decorate both interior and exterior surfaces. The play of colored light through stained glass creates an otherworldly atmosphere that was intended to transport worshippers from the earthly realm toward heavenly contemplation.

Gothic architecture declined during the Renaissance but experienced a revival in the 19th century. The Gothic Revival movement, also known as Neo-Gothic, produced notable buildings like the Houses of Parliament in London and Trinity Church in New York. Today, Gothic cathedrals remain among Europe's most visited cultural sites, attracting millions of visitors who marvel at their engineering and artistic achievements.`,
    questions: [
      {
        id: 31,
        question: 'What is the main topic of the passage?',
        options: [
          'How to build Gothic cathedrals',
          'The characteristics and history of Gothic architecture',
          'The religious practices in medieval Europe',
          'The decline of architectural innovation'
        ],
        correctAnswer: 1
      },
      {
        id: 32,
        question: 'What was the original meaning of the term "Gothic"?',
        options: [
          'Beautiful and elegant',
          'Ancient and traditional',
          'Barbaric and uncivilized',
          'Religious and spiritual'
        ],
        correctAnswer: 2
      },
      {
        id: 33,
        question: 'The word "pejorative" in paragraph 1 is closest in meaning to',
        options: [
          'Complimentary',
          'Derogatory',
          'Neutral',
          'Technical'
        ],
        correctAnswer: 1
      },
      {
        id: 34,
        question: 'Which of the following is NOT a characteristic feature of Gothic architecture?',
        options: [
          'Pointed arch',
          'Ribbed vault',
          'Flying buttress',
          'Dome roof'
        ],
        correctAnswer: 3
      },
      {
        id: 35,
        question: 'How did the flying buttress affect Gothic cathedral design?',
        options: [
          'It made buildings shorter',
          'It allowed for larger windows',
          'It eliminated the need for arches',
          'It simplified construction'
        ],
        correctAnswer: 1
      },
      {
        id: 36,
        question: 'Why was light important in Gothic cathedrals?',
        options: [
          'It helped workers see during construction',
          'It was viewed as a divine presence',
          'It was the cheapest building material',
          'It made maintenance easier'
        ],
        correctAnswer: 1
      },
      {
        id: 37,
        question: 'The word "manifestation" in paragraph 3 is closest in meaning to',
        options: [
          'Absence',
          'Expression',
          'Contradiction',
          'Simulation'
        ],
        correctAnswer: 1
      },
      {
        id: 38,
        question: 'According to the passage, how long did Cologne Cathedral take to build?',
        options: [
          '38 years',
          'About 100 years',
          'Over 600 years',
          'About 50 years'
        ],
        correctAnswer: 2
      },
      {
        id: 39,
        question: 'What was the purpose of gargoyles in Gothic architecture?',
        options: [
          'To serve as water spouts and decoration',
          'To support the roof structure',
          'To provide seating for worshippers',
          'To mark the building\'s entrance'
        ],
        correctAnswer: 0
      },
      {
        id: 40,
        question: 'What does the author imply about Gothic Revival architecture?',
        options: [
          'It was a complete failure',
          'It ended in the 18th century',
          'It demonstrated lasting influence of Gothic style',
          'It was limited to religious buildings'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 5,
    title: 'The Human Immune System',
    text: `The human immune system is a complex network of cells, tissues, and organs that work together to defend the body against harmful invaders. This intricate defense mechanism protects us from pathogens including bacteria, viruses, fungi, and parasites, while also identifying and eliminating abnormal cells that could become cancerous. Understanding the immune system is essential for developing treatments for diseases ranging from autoimmune disorders to cancer.

The immune system consists of two main branches: innate immunity and adaptive immunity. Innate immunity provides immediate, nonspecific defense against any foreign invader. Physical barriers like skin and mucous membranes form the first line of defense, preventing most pathogens from entering the body. If pathogens breach these barriers, innate immune cells including neutrophils, macrophages, and natural killer cells attack them. These cells respond within minutes to hours and do not require prior exposure to the pathogen.

Adaptive immunity, also called acquired immunity, provides a slower but more specific response. When the innate immune system cannot eliminate an infection, adaptive immunity takes over. This system involves two main types of lymphocytes: B cells and T cells. B cells produce antibodies, proteins that recognize and bind to specific antigens on pathogens. T cells include helper T cells, which coordinate immune responses, and cytotoxic T cells, which directly kill infected cells.

A remarkable feature of adaptive immunity is immunological memory. After an infection is cleared, some B and T cells remain as memory cells. If the same pathogen is encountered again, these memory cells respond much more quickly and effectively than during the first exposure. This is why people typically get diseases like chickenpox only once, and it forms the basis of vaccination, which trains the immune system by exposure to weakened or inactive pathogens.

Sometimes the immune system malfunctions. Autoimmune diseases occur when the immune system mistakenly attacks the body's own tissues. Rheumatoid arthritis, type 1 diabetes, and multiple sclerosis are examples of autoimmune conditions. Allergies represent another type of immune malfunction, where the immune system overreacts to harmless substances like pollen or certain foods.

The immune system can also be weakened by factors including malnutrition, stress, lack of sleep, and certain medications. Immunodeficiency disorders, whether inherited or acquired, leave individuals vulnerable to infections that a healthy immune system would easily handle. HIV/AIDS, which destroys helper T cells, is perhaps the most well-known acquired immunodeficiency. Understanding and supporting immune function remains a major focus of medical research.`,
    questions: [
      {
        id: 41,
        question: 'What is the main purpose of the passage?',
        options: [
          'To explain how vaccines work',
          'To describe the human immune system',
          'To discuss autoimmune diseases',
          'To compare different types of cells'
        ],
        correctAnswer: 1
      },
      {
        id: 42,
        question: 'What are the two main branches of the immune system?',
        options: [
          'B cells and T cells',
          'Innate and adaptive immunity',
          'Physical and chemical barriers',
          'Primary and secondary responses'
        ],
        correctAnswer: 1
      },
      {
        id: 43,
        question: 'The word "intricate" in paragraph 1 is closest in meaning to',
        options: [
          'Simple',
          'Complex',
          'Weak',
          'Artificial'
        ],
        correctAnswer: 1
      },
      {
        id: 44,
        question: 'Which of the following is part of the innate immune system?',
        options: [
          'B cells',
          'T cells',
          'Neutrophils',
          'Antibodies'
        ],
        correctAnswer: 2
      },
      {
        id: 45,
        question: 'How does innate immunity differ from adaptive immunity?',
        options: [
          'Innate immunity is faster but less specific',
          'Adaptive immunity is faster but less specific',
          'Only innate immunity uses antibodies',
          'Only adaptive immunity involves physical barriers'
        ],
        correctAnswer: 0
      },
      {
        id: 46,
        question: 'The word "antigens" in paragraph 3 is closest in meaning to',
        options: [
          'Antibodies',
          'Foreign substances that trigger immune response',
          'Memory cells',
          'Beneficial bacteria'
        ],
        correctAnswer: 1
      },
      {
        id: 47,
        question: 'What is immunological memory?',
        options: [
          'The ability to remember past infections',
          'A type of autoimmune disease',
          'A method of vaccine delivery',
          'A physical barrier in the skin'
        ],
        correctAnswer: 0
      },
      {
        id: 48,
        question: 'According to the passage, what happens in autoimmune diseases?',
        options: [
          'The immune system stops working',
          'The immune system attacks the body\'s own tissues',
          'Pathogens become resistant to treatment',
          'Memory cells forget past infections'
        ],
        correctAnswer: 1
      },
      {
        id: 49,
        question: 'What does the author mention about HIV/AIDS?',
        options: [
          'It strengthens the immune system',
          'It only affects B cells',
          'It destroys helper T cells',
          'It is easily cured with vaccines'
        ],
        correctAnswer: 2
      },
      {
        id: 50,
        question: 'What can be inferred about vaccination?',
        options: [
          'It has no effect on the immune system',
          'It trains the immune system using weakened pathogens',
          'It only works against bacterial infections',
          'It eliminates the need for immune memory'
        ],
        correctAnswer: 1
      }
    ]
  }
];

export const packageC: QuestionPackage = {
  id: 'C',
  name: 'Paket C',
  description: 'Practice Test 3',
  listening,
  structure,
  reading
};
