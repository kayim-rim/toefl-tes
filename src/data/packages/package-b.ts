// TOEFL ITP Package B - Complete Practice Questions
// 140 Questions: 50 Listening, 40 Structure, 50 Reading

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
// LISTENING SECTION - Package B
// =============================================

const listening: ListeningQuestion[] = [
  // PART A - Short Conversations (30 questions)
  {
    id: 1,
    part: 'A',
    conversation: "Woman: I'm really struggling with this chemistry assignment.\nMan: Have you tried visiting the tutoring center?",
    question: 'What does the man suggest?',
    options: ['She should drop the class', 'She should get help from tutors', 'The assignment is too difficult', 'He will do the assignment for her'],
    correctAnswer: 1,
    audioScript: "I'm really struggling with this chemistry assignment. Have you tried visiting the tutoring center? What does the man suggest?"
  },
  {
    id: 2,
    part: 'A',
    conversation: "Man: I was going to order pizza, but the restaurant is closed.\nWoman: There's a new Thai place that delivers until midnight.",
    question: 'What does the woman mean?',
    options: ['She does not like Thai food', 'There is another restaurant option', 'The pizza place will open soon', 'She already ate dinner'],
    correctAnswer: 1,
    audioScript: "I was going to order pizza, but the restaurant is closed. There's a new Thai place that delivers until midnight. What does the woman mean?"
  },
  {
    id: 3,
    part: 'A',
    conversation: "Woman: Did you submit the application before the deadline?\nMan: Just barely. I finished it five minutes before it was due.",
    question: 'What does the man mean?',
    options: ['He missed the deadline', 'He submitted it on time with little time to spare', 'He did not apply', 'The deadline was extended'],
    correctAnswer: 1,
    audioScript: 'Did you submit the application before the deadline? Just barely. I finished it five minutes before it was due. What does the man mean?'
  },
  {
    id: 4,
    part: 'A',
    conversation: "Man: How was your flight to London?\nWoman: Terrible. There was so much turbulence I thought we were going to crash.",
    question: 'What does the woman imply about her flight?',
    options: ['It was smooth and comfortable', 'It was frightening and unpleasant', 'It was delayed', 'It was cancelled'],
    correctAnswer: 1,
    audioScript: 'How was your flight to London? Terrible. There was so much turbulence I thought we were going to crash. What does the woman imply about her flight?'
  },
  {
    id: 5,
    part: 'A',
    conversation: "Woman: I can't believe how much the rent has increased.\nMan: That's the housing market these days. Everything keeps going up.",
    question: 'What does the man mean?',
    options: ['The rent increase is unusual', 'Rising prices are common now', 'He thinks the rent is fair', 'He will help pay the rent'],
    correctAnswer: 1,
    audioScript: "I can't believe how much the rent has increased. That's the housing market these days. Everything keeps going up. What does the man mean?"
  },
  {
    id: 6,
    part: 'A',
    conversation: "Man: Would you like to join the hiking club?\nWoman: I'd like to, but my weekends are completely booked.",
    question: 'What does the woman mean?',
    options: ['She is eager to join', 'She does not have free time', 'She dislikes hiking', 'She prefers indoor activities'],
    correctAnswer: 1,
    audioScript: 'Would you like to join the hiking club? I\'d like to, but my weekends are completely booked. What does the woman mean?'
  },
  {
    id: 7,
    part: 'A',
    conversation: "Woman: The professor said the exam would cover chapters five through ten.\nMan: That's a relief. I thought it would be comprehensive.",
    question: 'What does the man mean?',
    options: ['He is worried about the exam', 'He is pleased the exam is limited', 'He has not studied at all', 'He wants the exam to cover more'],
    correctAnswer: 1,
    audioScript: "The professor said the exam would cover chapters five through ten. That's a relief. I thought it would be comprehensive. What does the man mean?"
  },
  {
    id: 8,
    part: 'A',
    conversation: "Man: I've been trying to call Dr. Smith all morning.\nWoman: Her line has been busy. She must be on a conference call.",
    question: 'What does the woman imply?',
    options: ['Dr. Smith is not in the office', 'Dr. Smith is on another call', 'Dr. Smith is avoiding calls', 'The phone system is broken'],
    correctAnswer: 1,
    audioScript: "I've been trying to call Dr. Smith all morning. Her line has been busy. She must be on a conference call. What does the woman imply?"
  },
  {
    id: 9,
    part: 'A',
    conversation: "Woman: Should we take the stairs or the elevator?\nMan: It's only the third floor. The stairs would be faster.",
    question: 'What does the man suggest?',
    options: ['Take the elevator', 'Take the stairs', 'Wait for the next elevator', 'Go to a different floor'],
    correctAnswer: 1,
    audioScript: "Should we take the stairs or the elevator? It's only the third floor. The stairs would be faster. What does the man suggest?"
  },
  {
    id: 10,
    part: 'A',
    conversation: "Man: I heard you're switching majors.\nWoman: Yes, I realized biology wasn't the right fit for me.",
    question: 'What does the woman mean?',
    options: ['She enjoys biology', 'She found a better major for herself', 'She is dropping out of college', 'She failed biology'],
    correctAnswer: 1,
    audioScript: "I heard you're switching majors. Yes, I realized biology wasn't the right fit for me. What does the woman mean?"
  },
  {
    id: 11,
    part: 'A',
    conversation: "Woman: The deadline for the scholarship application is tomorrow.\nMan: I know. I've been working on my essay all week.",
    question: 'What does the man mean?',
    options: ['He has already submitted his application', 'He is aware and working on it', 'He plans to miss the deadline', 'He needs more time'],
    correctAnswer: 1,
    audioScript: 'The deadline for the scholarship application is tomorrow. I know. I\'ve been working on my essay all week. What does the man mean?'
  },
  {
    id: 12,
    part: 'A',
    conversation: "Man: How was the wedding reception?\nWoman: It was beautiful. The bride looked absolutely stunning.",
    question: 'What does the woman say about the wedding?',
    options: ['It was disappointing', 'The bride looked lovely', 'It was too formal', 'The food was terrible'],
    correctAnswer: 1,
    audioScript: 'How was the wedding reception? It was beautiful. The bride looked absolutely stunning. What does the woman say about the wedding?'
  },
  {
    id: 13,
    part: 'A',
    conversation: "Woman: I need to return these shoes. They don't fit properly.\nMan: Do you have the receipt?",
    question: 'What does the man ask about?',
    options: ['The price of the shoes', 'Proof of purchase', 'Where she bought them', 'Why they do not fit'],
    correctAnswer: 1,
    audioScript: "I need to return these shoes. They don't fit properly. Do you have the receipt? What does the man ask about?"
  },
  {
    id: 14,
    part: 'A',
    conversation: "Man: Are you coming to the department meeting this afternoon?\nWoman: I have a dentist appointment at three, so I'll be late.",
    question: 'What does the woman mean?',
    options: ['She will not attend the meeting', 'She will arrive after it starts', 'She will be on time', 'The meeting conflicts with her schedule'],
    correctAnswer: 1,
    audioScript: 'Are you coming to the department meeting this afternoon? I have a dentist appointment at three, so I\'ll be late. What does the woman mean?'
  },
  {
    id: 15,
    part: 'A',
    conversation: "Woman: I can't get this software to work on my computer.\nMan: Have you checked if your operating system is compatible?",
    question: 'What does the man suggest?',
    options: ['Buy a new computer', 'Check system requirements', 'Return the software', 'Contact customer support'],
    correctAnswer: 1,
    audioScript: "I can't get this software to work on my computer. Have you checked if your operating system is compatible? What does the man suggest?"
  },
  {
    id: 16,
    part: 'A',
    conversation: "Man: The team won every game this season.\nWoman: It was an undefeated season! The coach really knew what he was doing.",
    question: 'What does the woman imply?',
    options: ['The team was lucky', 'The coach was effective', 'The competition was weak', 'The season was too short'],
    correctAnswer: 1,
    audioScript: 'The team won every game this season. It was an undefeated season! The coach really knew what he was doing. What does the woman imply?'
  },
  {
    id: 17,
    part: 'A',
    conversation: "Woman: I'm not sure which elective to take next semester.\nMan: Why don't you talk to your academic advisor?",
    question: 'What does the man recommend?',
    options: ['Take an easier class', 'Consult with an advisor', 'Wait until next year', 'Choose the most popular class'],
    correctAnswer: 1,
    audioScript: "I'm not sure which elective to take next semester. Why don't you talk to your academic advisor? What does the man recommend?"
  },
  {
    id: 18,
    part: 'A',
    conversation: "Man: Did you hear about the power outage downtown?\nWoman: Yes, the traffic lights were out for hours. It caused a huge traffic jam.",
    question: 'What happened downtown?',
    options: ['A protest occurred', 'Electricity was lost', 'Roads were closed for repair', 'There was an accident'],
    correctAnswer: 1,
    audioScript: 'Did you hear about the power outage downtown? Yes, the traffic lights were out for hours. It caused a huge traffic jam. What happened downtown?'
  },
  {
    id: 19,
    part: 'A',
    conversation: "Woman: I'm thinking of joining the debate team.\nMan: You'd be great at it. You always have convincing arguments.",
    question: 'What does the man mean?',
    options: ['She should not join', 'She would be a good member', 'The team is too competitive', 'She needs more practice'],
    correctAnswer: 1,
    audioScript: "I'm thinking of joining the debate team. You'd be great at it. You always have convincing arguments. What does the man mean?"
  },
  {
    id: 20,
    part: 'A',
    conversation: "Man: The graduation ceremony is outdoors this year.\nWoman: Let's hope it doesn't rain. Last year was a disaster.",
    question: 'What does the woman imply?',
    options: ['She prefers indoor ceremonies', 'Rain would be problematic', 'Last year was successful', 'The weather will be perfect'],
    correctAnswer: 1,
    audioScript: 'The graduation ceremony is outdoors this year. Let\'s hope it doesn\'t rain. Last year was a disaster. What does the woman imply?'
  },
  {
    id: 21,
    part: 'A',
    conversation: "Woman: Have you seen the new art exhibition at the museum?\nMan: Not yet, but I've heard it's worth seeing.",
    question: 'What does the man mean?',
    options: ['He has already seen it', 'He plans to visit based on recommendations', 'He does not like art', 'The exhibition is disappointing'],
    correctAnswer: 1,
    audioScript: "Have you seen the new art exhibition at the museum? Not yet, but I've heard it's worth seeing. What does the man mean?"
  },
  {
    id: 22,
    part: 'A',
    conversation: "Man: I've decided to learn Spanish.\nWoman: That's a great idea. It will be useful for your career in international business.",
    question: 'Why does the woman support the decision?',
    options: ['Spanish is easy to learn', 'It has professional benefits', 'She speaks Spanish', 'He has free time'],
    correctAnswer: 1,
    audioScript: "I've decided to learn Spanish. That's a great idea. It will be useful for your career in international business. Why does the woman support the decision?"
  },
  {
    id: 23,
    part: 'A',
    conversation: "Woman: The cafeteria is so crowded today.\nMan: It's always like this during lunch hour. We should come earlier next time.",
    question: 'What does the man suggest?',
    options: ['Find another cafeteria', 'Come before noon', 'Skip lunch today', 'Order food delivery'],
    correctAnswer: 1,
    audioScript: 'The cafeteria is so crowded today. It\'s always like this during lunch hour. We should come earlier next time. What does the man suggest?'
  },
  {
    id: 24,
    part: 'A',
    conversation: "Man: I didn't see you at the committee meeting yesterday.\nWoman: I had a family emergency. I'll get the minutes from Sarah.",
    question: 'Why was the woman absent?',
    options: ['She forgot about the meeting', 'She had a personal matter', 'She was sick', 'She was at another meeting'],
    correctAnswer: 1,
    audioScript: "I didn't see you at the committee meeting yesterday. I had a family emergency. I'll get the minutes from Sarah. Why was the woman absent?"
  },
  {
    id: 25,
    part: 'A',
    conversation: "Woman: Are you going to renew your gym membership?\nMan: I haven't been in months. It would be a waste of money.",
    question: 'What does the man mean?',
    options: ['He plans to renew', 'He does not use the gym enough', 'He found a cheaper gym', 'He exercises at home now'],
    correctAnswer: 1,
    audioScript: 'Are you going to renew your gym membership? I haven\'t been in months. It would be a waste of money. What does the man mean?'
  },
  {
    id: 26,
    part: 'A',
    conversation: "Man: Did you finish reading the novel for literature class?\nWoman: I couldn't put it down. I finished it in two days.",
    question: 'What does the woman mean?',
    options: ['She did not enjoy the book', 'She found it very engaging', 'It took her a long time', 'She did not read it'],
    correctAnswer: 1,
    audioScript: 'Did you finish reading the novel for literature class? I couldn\'t put it down. I finished it in two days. What does the woman mean?'
  },
  {
    id: 27,
    part: 'A',
    conversation: "Woman: The research paper is due next Monday.\nMan: That gives us the weekend to finish it.",
    question: 'What does the man mean?',
    options: ['There is not enough time', 'They have time to complete it', 'He has already finished', 'He needs an extension'],
    correctAnswer: 1,
    audioScript: 'The research paper is due next Monday. That gives us the weekend to finish it. What does the man mean?'
  },
  {
    id: 28,
    part: 'A',
    conversation: "Man: Would you like to try the new restaurant downtown?\nWoman: I've been meaning to go there. Let's make a reservation.",
    question: 'What does the woman mean?',
    options: ['She has already been there', 'She wants to go', 'She prefers to cook at home', 'She does not like trying new places'],
    correctAnswer: 1,
    audioScript: "Would you like to try the new restaurant downtown? I've been meaning to go there. Let's make a reservation. What does the woman mean?"
  },
  {
    id: 29,
    part: 'A',
    conversation: "Woman: I heard you're moving to Seattle.\nMan: That's the plan. I got a job offer from a tech company there.",
    question: 'Why is the man moving?',
    options: ['He wants to live near family', 'He received a job offer', 'He prefers a warmer climate', 'He is going to graduate school'],
    correctAnswer: 1,
    audioScript: "I heard you're moving to Seattle. That's the plan. I got a job offer from a tech company there. Why is the man moving?"
  },
  {
    id: 30,
    part: 'A',
    conversation: "Man: I'm having trouble with my computer. It keeps freezing.\nWoman: You should back up your files before it gets worse.",
    question: 'What does the woman advise?',
    options: ['Buy a new computer', 'Save important data now', 'Ignore the problem', 'Call technical support immediately'],
    correctAnswer: 1,
    audioScript: "I'm having trouble with my computer. It keeps freezing. You should back up your files before it gets worse. What does the woman advise?"
  },

  // PART B - Longer Conversations (8 questions - 2 conversations, 4 questions each)
  {
    id: 31,
    part: 'B',
    conversation: `Narrator: Listen to a conversation between a student and a university housing coordinator.
Student: Hi, I'm looking for off-campus housing for next semester. Can you help me?
Coordinator: Of course. We maintain a list of approved apartments near campus. What's your budget?
Student: I can afford around eight hundred dollars a month, including utilities.
Coordinator: That should get you a studio or a shared apartment. Have you considered having a roommate?
Student: I'd prefer living alone, but I'm open to it if it means a better place.
Coordinator: Roommates can significantly reduce costs. We also have a roommate matching service.
Student: That sounds helpful. What documents do I need to apply?
Coordinator: You'll need proof of income or a guarantor, and your student ID. Most landlords also require a security deposit.`,
    question: 'Why does the student visit the housing coordinator?',
    options: ['To complain about dormitory conditions', 'To find off-campus accommodation', 'To request a housing refund', 'To apply for on-campus housing'],
    correctAnswer: 1,
    audioScript: 'Listen to a conversation between a student and a university housing coordinator. Hi, I\'m looking for off-campus housing for next semester. Can you help me? Of course. We maintain a list of approved apartments near campus. What\'s your budget? I can afford around eight hundred dollars a month, including utilities. That should get you a studio or a shared apartment. Have you considered having a roommate? I\'d prefer living alone, but I\'m open to it if it means a better place. Roommates can significantly reduce costs. We also have a roommate matching service. That sounds helpful. What documents do I need to apply? You\'ll need proof of income or a guarantor, and your student ID. Most landlords also require a security deposit. Why does the student visit the housing coordinator?'
  },
  {
    id: 32,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What is the student\'s monthly budget?',
    options: ['Five hundred dollars', 'Eight hundred dollars', 'One thousand dollars', 'Twelve hundred dollars'],
    correctAnswer: 1,
    audioScript: 'What is the student\'s monthly budget?'
  },
  {
    id: 33,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What advantage of having a roommate is mentioned?',
    options: ['Better location', 'Reduced expenses', 'More privacy', 'Easier application process'],
    correctAnswer: 1,
    audioScript: 'What advantage of having a roommate is mentioned?'
  },
  {
    id: 34,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What documents are needed for the application?',
    options: ['Only a student ID', 'A driver\'s license and bank statement', 'Proof of income or guarantor and student ID', 'Previous landlord references only'],
    correctAnswer: 2,
    audioScript: 'What documents are needed for the application?'
  },
  {
    id: 35,
    part: 'B',
    conversation: `Narrator: Listen to a conversation between two students discussing a group project.
Student A: Have you started working on the marketing presentation?
Student B: Not yet. I've been focusing on the research paper. When is it due?
Student A: Next Thursday. We should divide the work among the four of us.
Student B: What sections need to be covered?
Student A: Market analysis, competitor research, marketing strategy, and financial projections.
Student B: I'm good with numbers, so I can handle the financial projections.
Student A: Perfect. I'll do the market analysis. We should meet tomorrow to assign the other sections.
Student B: Let's meet at the library at three o'clock. The study rooms are quieter there.`,
    question: 'What are the students discussing?',
    options: ['An upcoming exam', 'A group presentation', 'A research paper deadline', 'A job interview'],
    correctAnswer: 1,
    audioScript: 'Listen to a conversation between two students discussing a group project. Have you started working on the marketing presentation? Not yet. I\'ve been focusing on the research paper. When is it due? Next Thursday. We should divide the work among the four of us. What sections need to be covered? Market analysis, competitor research, marketing strategy, and financial projections. I\'m good with numbers, so I can handle the financial projections. Perfect. I\'ll do the market analysis. We should meet tomorrow to assign the other sections. Let\'s meet at the library at three o\'clock. The study rooms are quieter there. What are the students discussing?'
  },
  {
    id: 36,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'When is the presentation due?',
    options: ['Tomorrow', 'In two days', 'Next Thursday', 'Next month'],
    correctAnswer: 2,
    audioScript: 'When is the presentation due?'
  },
  {
    id: 37,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Which section will Student B work on?',
    options: ['Market analysis', 'Competitor research', 'Marketing strategy', 'Financial projections'],
    correctAnswer: 3,
    audioScript: 'Which section will Student B work on?'
  },
  {
    id: 38,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Where will the students meet tomorrow?',
    options: ['In a coffee shop', 'At the library', 'In a classroom', 'At Student A\'s apartment'],
    correctAnswer: 1,
    audioScript: 'Where will the students meet tomorrow?'
  },

  // PART C - Academic Talks (12 questions - 3 talks, 4 questions each)
  {
    id: 39,
    part: 'C',
    talk: `Narrator: Listen to a lecture about the human brain.
The human brain is one of the most complex organs in the body. Weighing approximately three pounds, it contains about 86 billion neurons, each connected to thousands of other neurons. This intricate network is responsible for our thoughts, memories, emotions, and bodily functions.

The brain is divided into several regions, each with specific functions. The frontal lobe, located at the front of the brain, is responsible for reasoning, planning, and voluntary movement. The temporal lobe, on the sides, processes auditory information and plays a crucial role in memory formation.

The hippocampus, a small structure deep within the brain, is essential for forming new memories. Damage to this area can result in amnesia, the inability to create new memories. Interestingly, the hippocampus is one of the few brain regions where new neurons continue to form throughout life, a process called neurogenesis.

Recent research has shown that the brain remains plastic throughout life. This neuroplasticity allows the brain to reorganize itself by forming new neural connections, which is essential for learning and recovery from brain injuries.`,
    question: 'What is the main topic of the lecture?',
    options: ['The weight of the human brain', 'The structure and function of the brain', 'Methods for studying the brain', 'Brain diseases and treatments'],
    correctAnswer: 1,
    audioScript: 'Listen to a lecture about the human brain. The human brain is one of the most complex organs in the body. Weighing approximately three pounds, it contains about 86 billion neurons, each connected to thousands of other neurons. This intricate network is responsible for our thoughts, memories, emotions, and bodily functions. The brain is divided into several regions, each with specific functions. The frontal lobe, located at the front of the brain, is responsible for reasoning, planning, and voluntary movement. The temporal lobe, on the sides, processes auditory information and plays a crucial role in memory formation. The hippocampus, a small structure deep within the brain, is essential for forming new memories. Damage to this area can result in amnesia, the inability to create new memories. Interestingly, the hippocampus is one of the few brain regions where new neurons continue to form throughout life, a process called neurogenesis. Recent research has shown that the brain remains plastic throughout life. This neuroplasticity allows the brain to reorganize itself by forming new neural connections, which is essential for learning and recovery from brain injuries. What is the main topic of the lecture?'
  },
  {
    id: 40,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is the function of the frontal lobe?',
    options: ['Processing sounds', 'Forming new memories', 'Reasoning and planning', 'Controlling heartbeat'],
    correctAnswer: 2,
    audioScript: 'What is the function of the frontal lobe?'
  },
  {
    id: 41,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What can happen if the hippocampus is damaged?',
    options: ['Loss of movement', 'Inability to form new memories', 'Problems with speech', 'Loss of vision'],
    correctAnswer: 1,
    audioScript: 'What can happen if the hippocampus is damaged?'
  },
  {
    id: 42,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is neuroplasticity?',
    options: ['The death of neurons', 'The brain\'s ability to reorganize itself', 'A type of brain injury', 'The process of aging'],
    correctAnswer: 1,
    audioScript: 'What is neuroplasticity?'
  },
  {
    id: 43,
    part: 'C',
    talk: `Narrator: Listen to a talk about renewable energy sources.
Renewable energy comes from sources that are naturally replenished on a human timescale. Unlike fossil fuels, which take millions of years to form, renewable sources provide a sustainable alternative for meeting our energy needs while reducing environmental impact.

Solar energy harnesses the power of the sun through photovoltaic cells or solar thermal collectors. The cost of solar panels has decreased dramatically over the past decade, making it increasingly competitive with traditional energy sources. However, solar energy production depends on weather conditions and daylight hours.

Wind energy is another rapidly growing renewable source. Wind turbines convert the kinetic energy of wind into electricity. Offshore wind farms, located in bodies of water, can capture stronger and more consistent winds than land-based installations. Denmark generates over 40 percent of its electricity from wind power.

Hydropower, generated from moving water, remains the largest source of renewable electricity globally. While it produces minimal greenhouse gas emissions during operation, large dams can disrupt local ecosystems and displace communities. Small-scale hydropower projects offer a more environmentally friendly alternative.`,
    question: 'What is the main purpose of the talk?',
    options: ['To explain why fossil fuels are superior', 'To describe different types of renewable energy', 'To criticize energy policies', 'To promote nuclear energy'],
    correctAnswer: 1,
    audioScript: 'Listen to a talk about renewable energy sources. Renewable energy comes from sources that are naturally replenished on a human timescale. Unlike fossil fuels, which take millions of years to form, renewable sources provide a sustainable alternative for meeting our energy needs while reducing environmental impact. Solar energy harnesses the power of the sun through photovoltaic cells or solar thermal collectors. The cost of solar panels has decreased dramatically over the past decade, making it increasingly competitive with traditional energy sources. However, solar energy production depends on weather conditions and daylight hours. Wind energy is another rapidly growing renewable source. Wind turbines convert the kinetic energy of wind into electricity. Offshore wind farms, located in bodies of water, can capture stronger and more consistent winds than land-based installations. Denmark generates over 40 percent of its electricity from wind power. Hydropower, generated from moving water, remains the largest source of renewable electricity globally. While it produces minimal greenhouse gas emissions during operation, large dams can disrupt local ecosystems and displace communities. Small-scale hydropower projects offer a more environmentally friendly alternative. What is the main purpose of the talk?'
  },
  {
    id: 44,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is a limitation of solar energy mentioned in the talk?',
    options: ['It is too expensive', 'It depends on weather and daylight', 'It produces too much pollution', 'It cannot be used for electricity'],
    correctAnswer: 1,
    audioScript: 'What is a limitation of solar energy mentioned in the talk?'
  },
  {
    id: 45,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the talk, what advantage do offshore wind farms have?',
    options: ['They are cheaper to build', 'They capture stronger, more consistent winds', 'They do not require maintenance', 'They produce more power than all other sources'],
    correctAnswer: 1,
    audioScript: 'According to the talk, what advantage do offshore wind farms have?'
  },
  {
    id: 46,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is mentioned as a disadvantage of large hydropower dams?',
    options: ['They produce no electricity', 'They are too expensive', 'They can disrupt ecosystems', 'They depend on fossil fuels'],
    correctAnswer: 2,
    audioScript: 'What is mentioned as a disadvantage of large hydropower dams?'
  },
  {
    id: 47,
    part: 'C',
    talk: `Narrator: Listen to a lecture about the Industrial Revolution.
The Industrial Revolution, which began in Britain in the late 18th century, marked a fundamental shift in human history. It transformed economies from agricultural to industrial, changing how goods were produced and how people lived and worked.

Several factors contributed to Britain's leading role in industrialization. The country had abundant coal and iron deposits, essential for powering steam engines and building machinery. Britain also had a strong banking system that provided capital for investment, and a vast colonial empire that supplied raw materials and markets for finished goods.

The textile industry was among the first to be transformed. The invention of the spinning jenny and the power loom dramatically increased cloth production. Factories replaced cottage industries, and workers moved from rural areas to cities seeking employment.

The social consequences were profound. Working conditions in factories were often harsh, with long hours and low wages. Child labor was common, and cities became overcrowded. These conditions eventually led to labor reforms and the rise of labor unions, which advocated for better working conditions and workers' rights.`,
    question: 'When did the Industrial Revolution begin?',
    options: ['The 16th century', 'The 17th century', 'The late 18th century', 'The early 20th century'],
    correctAnswer: 2,
    audioScript: 'Listen to a lecture about the Industrial Revolution. The Industrial Revolution, which began in Britain in the late 18th century, marked a fundamental shift in human history. It transformed economies from agricultural to industrial, changing how goods were produced and how people lived and worked. Several factors contributed to Britain\'s leading role in industrialization. The country had abundant coal and iron deposits, essential for powering steam engines and building machinery. Britain also had a strong banking system that provided capital for investment, and a vast colonial empire that supplied raw materials and markets for finished goods. The textile industry was among the first to be transformed. The invention of the spinning jenny and the power loom dramatically increased cloth production. Factories replaced cottage industries, and workers moved from rural areas to cities seeking employment. The social consequences were profound. Working conditions in factories were often harsh, with long hours and low wages. Child labor was common, and cities became overcrowded. These conditions eventually led to labor reforms and the rise of labor unions, which advocated for better working conditions and workers\' rights. When did the Industrial Revolution begin?'
  },
  {
    id: 48,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Which natural resources did Britain have in abundance?',
    options: ['Gold and silver', 'Coal and iron', 'Oil and natural gas', 'Timber and water'],
    correctAnswer: 1,
    audioScript: 'Which natural resources did Britain have in abundance?'
  },
  {
    id: 49,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Which industry was first to be transformed by industrialization?',
    options: ['The automobile industry', 'The steel industry', 'The textile industry', 'The coal mining industry'],
    correctAnswer: 2,
    audioScript: 'Which industry was first to be transformed by industrialization?'
  },
  {
    id: 50,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What resulted from the harsh working conditions?',
    options: ['Workers returned to farms', 'Labor reforms and unions emerged', 'Factories closed down', 'The Industrial Revolution ended'],
    correctAnswer: 1,
    audioScript: 'What resulted from the harsh working conditions?'
  }
];

// =============================================
// STRUCTURE SECTION - Package B
// =============================================

const structure: StructureQuestion[] = [
  // Questions 1-15: Sentence Completion
  {
    id: 1,
    type: 'structure',
    sentence: 'The Amazon River, _______ flows through South America, is the largest river by volume in the world.',
    options: ['that', 'which', 'it', 'what'],
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'structure',
    sentence: '_______ by the discovery of penicillin, antibiotics have saved millions of lives since the 1940s.',
    options: ['Revolutionized medicine', 'Medicine revolutionized', 'Revolutionizing medicine', 'The revolution of medicine'],
    correctAnswer: 0
  },
  {
    id: 3,
    type: 'structure',
    sentence: 'The Great Wall of China _______ over many centuries by various dynasties.',
    options: ['built', 'was built', 'has built', 'had built'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'structure',
    sentence: 'Neither the students nor the teacher _______ aware of the schedule change.',
    options: ['was', 'were', 'are', 'have been'],
    correctAnswer: 0
  },
  {
    id: 5,
    type: 'structure',
    sentence: 'The novel _______ by the author during her stay in Paris last year.',
    options: ['wrote', 'was written', 'was writing', 'written'],
    correctAnswer: 1
  },
  {
    id: 6,
    type: 'structure',
    sentence: '_______ the climate changes, many species must adapt or face extinction.',
    options: ['Although', 'Because of', 'As', 'Despite'],
    correctAnswer: 2
  },
  {
    id: 7,
    type: 'structure',
    sentence: 'The art of calligraphy requires patience, precision, and _______.',
    options: ['practicing regularly', 'regular practice', 'to practice regularly', 'practice regularly'],
    correctAnswer: 1
  },
  {
    id: 8,
    type: 'structure',
    sentence: 'The microscope allows scientists _______ organisms too small to see with the naked eye.',
    options: ['observe', 'to observe', 'observing', 'observed'],
    correctAnswer: 1
  },
  {
    id: 9,
    type: 'structure',
    sentence: 'A tsunami occurs when there is a sudden displacement of water _______ by an underwater earthquake.',
    options: ['caused', 'causing', 'cause', 'causes'],
    correctAnswer: 0
  },
  {
    id: 10,
    type: 'structure',
    sentence: 'The scientist _______ theory revolutionized physics won the Nobel Prize.',
    options: ['who', 'whose', 'which', 'whom'],
    correctAnswer: 1
  },
  {
    id: 11,
    type: 'structure',
    sentence: '_______ is essential for maintaining a healthy immune system.',
    options: ['Adequate sleep', 'An adequate sleep', 'The adequate sleeps', 'Adequate sleeps'],
    correctAnswer: 0
  },
  {
    id: 12,
    type: 'structure',
    sentence: 'The more carefully you plan, _______ the outcome will be.',
    options: ['more successful', 'the more successful', 'most successful', 'the most successful'],
    correctAnswer: 1
  },
  {
    id: 13,
    type: 'structure',
    sentence: 'The museum _______ to visitors every day except Monday.',
    options: ['opens', 'is opened', 'is open', 'opening'],
    correctAnswer: 2
  },
  {
    id: 14,
    type: 'structure',
    sentence: 'Protein synthesis occurs _______ the ribosomes within cells.',
    options: ['within', 'inside of', 'through', 'by'],
    correctAnswer: 0
  },
  {
    id: 15,
    type: 'structure',
    sentence: 'The economic recession _______ significant changes in consumer spending habits.',
    options: ['brought about', 'was brought about', 'brought', 'has brought'],
    correctAnswer: 0
  },

  // Questions 16-40: Error Identification
  {
    id: 16,
    type: 'written',
    sentence: 'The development of the steam engine in the 18th century revolutionize transportation and industry.',
    underlinedParts: ['The development of the steam engine', 'in the 18th century', 'revolutionize transportation', 'and industry.'],
    correctAnswer: 2
  },
  {
    id: 17,
    type: 'written',
    sentence: 'Wildlife biologists study animal behavior in their natural habitat to better understand ecological systems.',
    underlinedParts: ['Wildlife biologists study', 'animal behavior', 'in their natural habitat', 'to better understand ecological systems.'],
    correctAnswer: 2
  },
  {
    id: 18,
    type: 'written',
    sentence: 'The Rhodes Scholarship, established in 1902, are one of the most prestigious academic awards in the world.',
    underlinedParts: ['The Rhodes Scholarship,', 'established in 1902,', 'are one of the most prestigious', 'academic awards in the world.'],
    correctAnswer: 2
  },
  {
    id: 19,
    type: 'written',
    sentence: 'The amount of sleep a person needs vary depending on age, health, and activity level.',
    underlinedParts: ['The amount of sleep', 'a person needs', 'vary depending on age,', 'health, and activity level.'],
    correctAnswer: 2
  },
  {
    id: 20,
    type: 'written',
    sentence: 'Proteins are composed of amino acids, which are the building blocks necessarily for cell growth and repair.',
    underlinedParts: ['Proteins are composed of amino acids,', 'which are the building blocks', 'necessarily for cell growth', 'and repair.'],
    correctAnswer: 2
  },
  {
    id: 21,
    type: 'written',
    sentence: 'The detective carefully examined the evidences at the crime scene before drawing any conclusions.',
    underlinedParts: ['The detective carefully examined', 'the evidences at the crime scene', 'before drawing', 'any conclusions.'],
    correctAnswer: 1
  },
  {
    id: 22,
    type: 'written',
    sentence: 'Global warming poses a serious threat to coastal communities, particular those in low-lying areas.',
    underlinedParts: ['Global warming poses', 'a serious threat to coastal communities,', 'particular those', 'in low-lying areas.'],
    correctAnswer: 2
  },
  {
    id: 23,
    type: 'written',
    sentence: 'The orchestra performed beautifully, and the audience rose to their feet at the end of the concert.',
    underlinedParts: ['The orchestra performed beautifully,', 'and the audience rose', 'to their feet', 'at the end of the concert.'],
    correctAnswer: 0
  },
  {
    id: 24,
    type: 'written',
    sentence: 'The invention of the printing press in the 15th century had profound affects on the spread of knowledge.',
    underlinedParts: ['The invention of the printing press', 'in the 15th century', 'had profound affects', 'on the spread of knowledge.'],
    correctAnswer: 2
  },
  {
    id: 25,
    type: 'written',
    sentence: 'Every student must submit their assignment by Friday unless they have received an extension.',
    underlinedParts: ['Every student must submit', 'their assignment by Friday', 'unless they have received', 'an extension.'],
    correctAnswer: 0
  },
  {
    id: 26,
    type: 'written',
    sentence: 'The chemical composition of the atmosphere determines the color of the sky, what appears blue during clear weather.',
    underlinedParts: ['The chemical composition of the atmosphere', 'determines the color of the sky,', 'what appears blue', 'during clear weather.'],
    correctAnswer: 2
  },
  {
    id: 27,
    type: 'written',
    sentence: 'Fossils provide scientist with valuable information about life forms that existed millions of years ago.',
    underlinedParts: ['Fossils provide', 'scientist with valuable information', 'about life forms that existed', 'millions of years ago.'],
    correctAnswer: 1
  },
  {
    id: 28,
    type: 'written',
    sentence: 'The rapid expansion of urban areas has resulted in the destruction of many natural habitat.',
    underlinedParts: ['The rapid expansion of urban areas', 'has resulted in', 'the destruction of', 'many natural habitat.'],
    correctAnswer: 3
  },
  {
    id: 29,
    type: 'written',
    sentence: 'In spite of the bad weather, the team decided to proceed with the outdoor ceremony as plan.',
    underlinedParts: ['In spite of the bad weather,', 'the team decided to proceed', 'with the outdoor ceremony', 'as plan.'],
    correctAnswer: 3
  },
  {
    id: 30,
    type: 'written',
    sentence: 'The newly elected president promised to reduce unemployment and improve the economy situation.',
    underlinedParts: ['The newly elected president', 'promised to reduce unemployment', 'and improve', 'the economy situation.'],
    correctAnswer: 3
  },
  {
    id: 31,
    type: 'written',
    sentence: 'The solar panels absorb sunlight and convert it into electricity, which can be store in batteries.',
    underlinedParts: ['The solar panels absorb sunlight', 'and convert it into electricity,', 'which can be store', 'in batteries.'],
    correctAnswer: 2
  },
  {
    id: 32,
    type: 'written',
    sentence: 'The deep ocean remains one of the most mystery places on Earth, with many species yet to be discovered.',
    underlinedParts: ['The deep ocean remains', 'one of the most mystery places', 'on Earth,', 'with many species yet to be discovered.'],
    correctAnswer: 1
  },
  {
    id: 33,
    type: 'written',
    sentence: 'Psychologists have found that people who express gratitude regularly tend to be more happier.',
    underlinedParts: ['Psychologists have found', 'that people who express gratitude regularly', 'tend to be', 'more happier.'],
    correctAnswer: 3
  },
  {
    id: 34,
    type: 'written',
    sentence: 'The company has invested significant resources in developing environmentally friendly products.',
    underlinedParts: ['The company has invested', 'significant resources', 'in developing', 'environmentally friendly products.'],
    correctAnswer: 0
  },
  {
    id: 35,
    type: 'written',
    sentence: 'The results of the experiment were surprising, and the researchers decided to repeating the tests.',
    underlinedParts: ['The results of the experiment', 'were surprising,', 'and the researchers decided', 'to repeating the tests.'],
    correctAnswer: 3
  },
  {
    id: 36,
    type: 'written',
    sentence: 'Critical thinking skills are essential for students to develop so that they can analyze information effective.',
    underlinedParts: ['Critical thinking skills are essential', 'for students to develop', 'so that they can analyze', 'information effective.'],
    correctAnswer: 3
  },
  {
    id: 37,
    type: 'written',
    sentence: 'The ancient Romans built an extensive network of roads, which connected all parts of their empire.',
    underlinedParts: ['The ancient Romans built', 'an extensive network of roads,', 'which connected', 'all parts of their empire.'],
    correctAnswer: 0
  },
  {
    id: 38,
    type: 'written',
    sentence: 'The symphony orchestra consist of four main sections: strings, woodwinds, brass, and percussion.',
    underlinedParts: ['The symphony orchestra', 'consist of four main sections:', 'strings, woodwinds,', 'brass, and percussion.'],
    correctAnswer: 1
  },
  {
    id: 39,
    type: 'written',
    sentence: 'Scientists have discovered that dolphins are capable of recognize themselves in mirrors, indicating self-awareness.',
    underlinedParts: ['Scientists have discovered', 'that dolphins are capable', 'of recognize themselves in mirrors,', 'indicating self-awareness.'],
    correctAnswer: 2
  },
  {
    id: 40,
    type: 'written',
    sentence: 'The success of the project depends on the collaboration between the various department involved.',
    underlinedParts: ['The success of the project', 'depends on the collaboration', 'between the various', 'department involved.'],
    correctAnswer: 3
  }
];

// =============================================
// READING SECTION - Package B
// =============================================

const reading: ReadingPassage[] = [
  {
    id: 1,
    title: 'The Science of Earthquakes',
    text: `Earthquakes are among the most powerful and destructive natural phenomena on Earth. They occur when there is a sudden release of energy in the Earth's crust, creating seismic waves that can cause significant damage to buildings and infrastructure.

The Earth's outer layer, or crust, is divided into large sections called tectonic plates. These plates are constantly moving, though usually at speeds of only a few centimeters per year. Where plates meet, they may collide, pull apart, or slide past each other. These regions, called plate boundaries, are where most earthquakes occur.

When plates interact, stress builds up over time as the rocks deform. Eventually, the stress exceeds the strength of the rocks, causing them to break along a fault line. This sudden release of stored energy generates seismic waves that travel through the Earth. The point beneath the surface where the rupture begins is called the focus, or hypocenter, while the point directly above it on the surface is the epicenter.

Scientists measure earthquakes using seismographs, instruments that detect and record seismic waves. The magnitude of an earthquake is typically measured on the Richter scale or the more modern moment magnitude scale. Each whole number increase on these scales represents a tenfold increase in the amplitude of the seismic waves.

Earthquake prediction remains one of the greatest challenges in geology. While scientists can identify areas at risk and estimate the probability of earthquakes over long periods, predicting the exact time, location, and magnitude of an earthquake is not yet possible. However, early warning systems can provide seconds to minutes of notice before strong shaking arrives, potentially saving lives.`,
    questions: [
      { id: 1, question: 'What causes earthquakes according to the passage?', options: ['Volcanic eruptions', 'Sudden energy release in the Earth\'s crust', 'Ocean tides', 'Human construction activities'], correctAnswer: 1 },
      { id: 2, question: 'Where do most earthquakes occur?', options: ['In the center of tectonic plates', 'At plate boundaries', 'Only in coastal regions', 'Near the equator'], correctAnswer: 1 },
      { id: 3, question: 'What happens when stress exceeds rock strength?', options: ['Plates stop moving', 'Rocks break along fault lines', 'Volcanoes erupt', 'The crust becomes thicker'], correctAnswer: 1 },
      { id: 4, question: 'The word "epicenter" in paragraph 3 refers to', options: ['The point beneath the surface where rupture begins', 'The point on the surface above the focus', 'The center of a tectonic plate', 'The strongest part of the earthquake'], correctAnswer: 1 },
      { id: 5, question: 'What does the Richter scale measure?', options: ['The depth of an earthquake', 'The location of an earthquake', 'The magnitude of an earthquake', 'The duration of an earthquake'], correctAnswer: 2 },
      { id: 6, question: 'What does each whole number increase on the Richter scale represent?', options: ['Twice the strength', 'Ten times the amplitude', 'One hundred times the damage', 'One thousand times the depth'], correctAnswer: 1 },
      { id: 7, question: 'The word "tenfold" in paragraph 4 is closest in meaning to', options: ['Ten times', 'Ten percent', 'Ten units', 'Ten degrees'], correctAnswer: 0 },
      { id: 8, question: 'What is a limitation of earthquake prediction mentioned in the passage?', options: ['Scientists cannot predict exact time and location', 'Earthquakes cannot be detected at all', 'Only volcanic earthquakes can be predicted', 'Prediction requires expensive equipment'], correctAnswer: 0 },
      { id: 9, question: 'What can early warning systems do?', options: ['Prevent earthquakes from occurring', 'Provide notice before strong shaking', 'Stop buildings from collapsing', 'Predict earthquakes years in advance'], correctAnswer: 1 },
      { id: 10, question: 'What is the main topic of this passage?', options: ['How to survive earthquakes', 'The science and measurement of earthquakes', 'Famous earthquakes in history', 'Construction of earthquake-resistant buildings'], correctAnswer: 1 }
    ]
  },
  {
    id: 2,
    title: 'The Development of Writing Systems',
    text: `The invention of writing represents one of humanity's greatest achievements. Before writing, information could only be transmitted orally, which limited the preservation and spread of knowledge. The development of writing systems enabled civilizations to record history, laws, and scientific discoveries for future generations.

The earliest known writing system emerged in ancient Mesopotamia around 3200 BCE. Called cuneiform, it began as a system of pictographs used for accounting and record-keeping. Scribes used a reed stylus to press wedge-shaped marks into clay tablets. Over time, cuneiform evolved from simple pictures to a complex system of symbols representing sounds and concepts.

Ancient Egypt developed hieroglyphics around the same period. This writing system combined logographic elements, where symbols represent words, with phonetic elements, where symbols represent sounds. Hieroglyphics were used for monumental inscriptions, while a simplified form called hieratic was used for everyday writing on papyrus.

The Phoenicians made a crucial contribution to the development of writing around 1050 BCE. They created an alphabet consisting of 22 consonantal letters, with no symbols for vowels. This phonetic alphabet was much easier to learn than earlier writing systems, which required memorizing hundreds or thousands of symbols. The Greek alphabet, derived from the Phoenician system, added vowels and became the basis for many modern alphabets.

The impact of writing on human civilization cannot be overstated. It enabled the development of complex governments, the preservation of literature and philosophy, and the spread of religious texts. The ability to record and transmit knowledge across time and space fundamentally transformed human society.`,
    questions: [
      { id: 11, question: 'What limitation existed before the invention of writing?', options: ['People could not speak', 'Information could only be transmitted orally', 'No laws existed', 'Civilizations could not trade'], correctAnswer: 1 },
      { id: 12, question: 'When did cuneiform writing emerge?', options: ['Around 1050 BCE', 'Around 3200 BCE', 'Around 500 CE', 'Around 1000 BCE'], correctAnswer: 1 },
      { id: 13, question: 'How was cuneiform written?', options: ['Ink on papyrus', 'Carved into stone', 'Pressed into clay tablets', 'Painted on pottery'], correctAnswer: 2 },
      { id: 14, question: 'The word "pictographs" in paragraph 2 refers to', options: ['Musical notes', 'Pictures representing objects or ideas', 'Letters of the alphabet', 'Mathematical symbols'], correctAnswer: 1 },
      { id: 15, question: 'What was the purpose of hieratic writing in ancient Egypt?', options: ['Monumental inscriptions', 'Everyday writing', 'Religious ceremonies', 'Foreign diplomacy'], correctAnswer: 1 },
      { id: 16, question: 'What was significant about the Phoenician alphabet?', options: ['It used thousands of symbols', 'It was easier to learn than earlier systems', 'It was the first writing system', 'It included vowels from the beginning'], correctAnswer: 1 },
      { id: 17, question: 'What did the Greeks add to the Phoenician alphabet?', options: ['Consonants', 'Vowels', 'Numbers', 'Pictures'], correctAnswer: 1 },
      { id: 18, question: 'The word "derived" in paragraph 4 is closest in meaning to', options: ['Invented', 'Obtained from', 'Opposed to', 'Similar to'], correctAnswer: 1 },
      { id: 19, question: 'According to the passage, what did writing enable?', options: ['The end of all wars', 'The development of complex governments', 'The invention of speech', 'The end of religious practices'], correctAnswer: 1 },
      { id: 20, question: 'What is the main idea of the passage?', options: ['The history of paper making', 'The evolution and impact of writing systems', 'How to learn ancient languages', 'The differences between Eastern and Western writing'], correctAnswer: 1 }
    ]
  },
  {
    id: 3,
    title: 'The Human Immune System',
    text: `The human immune system is a complex network of cells, tissues, and organs that work together to defend the body against harmful invaders. These invaders include bacteria, viruses, parasites, and other pathogens that can cause disease.

The immune system operates on multiple levels. The first line of defense consists of physical and chemical barriers such as the skin, mucous membranes, and various secretions. The skin provides a tough, waterproof barrier that most pathogens cannot penetrate. Mucous membranes trap pathogens, and substances like stomach acid and enzymes destroy many harmful organisms.

When pathogens breach these barriers, the innate immune system responds. This system includes white blood cells called phagocytes that engulf and destroy invaders. The inflammatory response is another component of innate immunity, causing redness, swelling, and warmth at the site of infection. This response helps isolate the infection and attracts more immune cells to the area.

The adaptive immune system provides a more targeted response. It includes B cells, which produce antibodies that bind to specific pathogens, and T cells, which can directly attack infected cells. A remarkable feature of adaptive immunity is immunological memory. After an infection, some B and T cells remain in the body as memory cells, enabling a faster and stronger response if the same pathogen is encountered again.

Vaccination works by exploiting this memory mechanism. Vaccines contain weakened or inactivated pathogens, or parts of pathogens, that stimulate the immune system to produce memory cells without causing disease. This prepares the body to respond quickly and effectively if it encounters the actual pathogen in the future.`,
    questions: [
      { id: 21, question: 'What is the main function of the immune system?', options: ['To digest food', 'To circulate blood', 'To defend against harmful invaders', 'To regulate body temperature'], correctAnswer: 2 },
      { id: 22, question: 'What is the first line of defense against pathogens?', options: ['White blood cells', 'Physical and chemical barriers', 'Antibodies', 'Memory cells'], correctAnswer: 1 },
      { id: 23, question: 'The word "pathogens" in paragraph 1 refers to', options: ['Beneficial bacteria', 'Disease-causing organisms', 'Immune cells', 'Vitamins'], correctAnswer: 1 },
      { id: 24, question: 'What happens during the inflammatory response?', options: ['Body temperature decreases', 'The infection spreads', 'Redness and swelling occur', 'Pathogens enter the body'], correctAnswer: 2 },
      { id: 25, question: 'What do phagocytes do?', options: ['Produce antibodies', 'Engulf and destroy invaders', 'Create memory cells', 'Produce stomach acid'], correctAnswer: 1 },
      { id: 26, question: 'What is a feature of the adaptive immune system?', options: ['It responds the same way to all pathogens', 'It provides immunological memory', 'It only works in children', 'It replaces the innate system'], correctAnswer: 1 },
      { id: 27, question: 'The word "engulf" in paragraph 3 is closest in meaning to', options: ['Swallow or consume', 'Push away', 'Identify', 'Release'], correctAnswer: 0 },
      { id: 28, question: 'What is the purpose of memory cells?', options: ['To cause inflammation', 'To enable faster future responses', 'To digest pathogens', 'To produce stomach acid'], correctAnswer: 1 },
      { id: 29, question: 'How do vaccines work according to the passage?', options: ['They cure existing diseases', 'They stimulate memory cell production without disease', 'They replace the immune system', 'They kill all bacteria in the body'], correctAnswer: 1 },
      { id: 30, question: 'Which type of cell produces antibodies?', options: ['T cells', 'B cells', 'Phagocytes', 'Red blood cells'], correctAnswer: 1 }
    ]
  },
  {
    id: 4,
    title: 'The Rise of Urban Farming',
    text: `Urban farming, the practice of growing food in cities, has gained significant attention in recent years. As urban populations continue to grow and concerns about food security increase, many cities around the world are embracing innovative approaches to agriculture within their boundaries.

One popular form of urban farming is rooftop gardening. Buildings with flat roofs can be transformed into productive green spaces. Rooftop farms provide fresh produce to local communities while also helping to reduce urban heat island effects, improve air quality, and manage stormwater runoff. Cities like New York, Singapore, and Tokyo have numerous successful rooftop farms.

Vertical farming represents another innovative approach. In vertical farms, crops are grown in stacked layers, often indoors under controlled conditions. This method uses significantly less water and land than traditional farming and eliminates the need for pesticides. While energy costs for lighting and climate control can be high, advances in LED technology and renewable energy are making vertical farming increasingly viable.

Community gardens serve both agricultural and social purposes. These shared spaces allow urban residents to grow their own food, connect with neighbors, and learn about sustainable practices. Studies have shown that community gardens can improve mental health, increase property values, and provide fresh produce in neighborhoods that lack access to healthy food options.

Despite challenges such as limited space, high startup costs, and zoning regulations, urban farming continues to expand. Cities are increasingly incorporating food production into their planning, recognizing that urban agriculture can contribute to sustainability, food security, and community well-being.`,
    questions: [
      { id: 31, question: 'Why has urban farming gained attention?', options: ['It is a traditional practice', 'Urban populations are growing and food security is a concern', 'Rural farming has become too expensive', 'People prefer city-grown food'], correctAnswer: 1 },
      { id: 32, question: 'What is a benefit of rooftop gardens mentioned in the passage?', options: ['They reduce urban heat island effects', 'They are cheaper than ground-level farms', 'They can grow crops without water', 'They replace the need for parks'], correctAnswer: 0 },
      { id: 33, question: 'The word "viable" in paragraph 3 is closest in meaning to', options: ['Impossible', 'Feasible or practical', 'Popular', 'Expensive'], correctAnswer: 1 },
      { id: 34, question: 'What is an advantage of vertical farming?', options: ['It requires more land', 'It uses less water and land than traditional farming', 'It needs no energy', 'It can only grow one type of crop'], correctAnswer: 1 },
      { id: 35, question: 'What challenge does vertical farming face?', options: ['Lack of water', 'High energy costs for lighting', 'Too much available land', 'Excessive use of pesticides'], correctAnswer: 1 },
      { id: 36, question: 'What social benefit do community gardens provide?', options: ['They increase traffic congestion', 'They connect neighbors and improve mental health', 'They reduce property values', 'They eliminate the need for supermarkets'], correctAnswer: 1 },
      { id: 37, question: 'The word "incorporating" in the last paragraph is closest in meaning to', options: ['Removing', 'Including', 'Ignoring', 'Replacing'], correctAnswer: 1 },
      { id: 38, question: 'What challenge to urban farming is mentioned?', options: ['Too much available space', 'Limited space and high startup costs', 'Lack of interest from residents', 'Abundance of farmland'], correctAnswer: 1 },
      { id: 39, question: 'Which cities are mentioned as having rooftop farms?', options: ['London, Paris, and Berlin', 'New York, Singapore, and Tokyo', 'Sydney, Melbourne, and Brisbane', 'Rome, Madrid, and Athens'], correctAnswer: 1 },
      { id: 40, question: 'What is the main purpose of this passage?', options: ['To explain how to start an urban farm', 'To describe urban farming and its benefits', 'To criticize traditional farming methods', 'To list all the cities with urban farms'], correctAnswer: 1 }
    ]
  },
  {
    id: 5,
    title: 'The Psychology of Decision Making',
    text: `Every day, humans make thousands of decisions, from simple choices like what to eat for breakfast to complex decisions about career paths and relationships. Psychologists and behavioral economists have spent decades studying how people make decisions and why they often deviate from purely rational choices.

Traditional economic theory assumed that humans make decisions by carefully weighing all available information and choosing the option that maximizes their benefit. However, research by psychologists Daniel Kahneman and Amos Tversky demonstrated that human decision-making is far more complex. They identified two systems of thinking: System 1, which is fast, intuitive, and emotional, and System 2, which is slow, deliberate, and logical.

Various cognitive biases influence our decisions. Confirmation bias leads people to seek information that supports their existing beliefs while ignoring contradictory evidence. Anchoring bias causes people to rely too heavily on the first piece of information they receive when making subsequent judgments. Loss aversion, another well-documented bias, refers to the tendency to prefer avoiding losses over acquiring equivalent gains.

The environment in which decisions are made also affects outcomes. Choice architecture, a concept developed by Richard Thaler and Cass Sunstein, examines how the presentation of options influences decisions. For example, people are more likely to choose healthy food options when they are prominently displayed, a strategy known as nudging.

Understanding these psychological principles has practical applications in many fields, from public policy to marketing to healthcare. By recognizing the factors that influence decision-making, individuals and organizations can make better choices and design systems that help people achieve their goals.`,
    questions: [
      { id: 41, question: 'What did traditional economic theory assume about human decision-making?', options: ['Humans always make irrational choices', 'Humans carefully weigh information to maximize benefit', 'Emotions drive all decisions', 'People cannot make complex decisions'], correctAnswer: 1 },
      { id: 42, question: 'Who conducted research on human decision-making?', options: ['Isaac Newton and Albert Einstein', 'Daniel Kahneman and Amos Tversky', 'Sigmund Freud and Carl Jung', 'Charles Darwin and Gregor Mendel'], correctAnswer: 1 },
      { id: 43, question: 'What characterizes System 2 thinking?', options: ['Fast and intuitive', 'Slow and deliberate', 'Emotional and automatic', 'Instinctive and brief'], correctAnswer: 1 },
      { id: 44, question: 'The word "deviate" in paragraph 1 is closest in meaning to', options: ['Follow', 'Depart from', 'Improve upon', 'Agree with'], correctAnswer: 1 },
      { id: 45, question: 'What is confirmation bias?', options: ['Preferring losses over gains', 'Seeking information that supports existing beliefs', 'Relying on first information received', 'Making decisions too quickly'], correctAnswer: 1 },
      { id: 46, question: 'What is loss aversion?', options: ['Preferring to avoid losses over acquiring equivalent gains', 'Enjoying losing money', 'Ignoring potential losses', 'Always seeking maximum risk'], correctAnswer: 0 },
      { id: 47, question: 'The word "prominently" in paragraph 4 is closest in meaning to', options: ['Hidden', 'Noticeably', 'Randomly', 'Temporarily'], correctAnswer: 1 },
      { id: 48, question: 'What is choice architecture?', options: ['Building construction decisions', 'How presentation of options influences decisions', 'A type of cognitive bias', 'A method for eliminating all bias'], correctAnswer: 1 },
      { id: 49, question: 'What is the purpose of "nudging"?', options: ['To force people to make specific choices', 'To influence decisions through option presentation', 'To eliminate all cognitive biases', 'To slow down decision-making'], correctAnswer: 1 },
      { id: 50, question: 'What is the main topic of the passage?', options: ['The history of economic theory', 'How psychological factors influence decision-making', 'How to eliminate all biases in thinking', 'The differences between men and women in decision-making'], correctAnswer: 1 }
    ]
  }
];

// =============================================
// Export Package B
// =============================================

export const packageB: QuestionPackage = {
  id: 'B',
  name: 'Paket B',
  description: 'Practice Test 2',
  listening,
  structure,
  reading
};

export type { ListeningQuestion, StructureQuestion, ReadingPassage, ReadingQuestion };
