// TOEFL ITP Practice Test Questions
// Based on authentic TOEFL test format

export interface ListeningQuestion {
  id: number;
  part: 'A' | 'B' | 'C';
  conversation?: string;
  talk?: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  audioScript: string;
}

export interface StructureQuestion {
  id: number;
  type: 'structure' | 'written';
  sentence: string;
  options?: string[]; // For structure type
  underlinedParts?: string[]; // For written expression type
  correctAnswer: number; // 0-indexed
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
  correctAnswer: number; // 0-indexed
}

// ============================================
// SECTION 1: LISTENING COMPREHENSION (50 questions)
// ============================================

export const listeningQuestions: ListeningQuestion[] = [
  // PART A - Short Conversations (30 questions)
  {
    id: 1,
    part: 'A',
    conversation: 'Man: Did the director call about the meeting?\nWoman: Yes, she called to cancel it.',
    question: 'What does the woman mean?',
    options: [
      'The director called to arrange a meeting.',
      'The director canceled the call.',
      'The director got a call in the meeting.',
      'The director canceled the meeting.'
    ],
    correctAnswer: 3,
    audioScript: 'Did the director call about the meeting? Yes, she called to cancel it. What does the woman mean?'
  },
  {
    id: 2,
    part: 'A',
    conversation: 'Man: Would you like to see the new horror movie with me tonight?\nWoman: I\'d rather stay home and read a book.',
    question: 'What does the woman imply?',
    options: [
      'She would love to watch a horror movie.',
      'She prefers to go home early.',
      'She doesn\'t like movies at all.',
      'She\'s not fond of horror movies.'
    ],
    correctAnswer: 3,
    audioScript: 'Would you like to see the new horror movie with me tonight? I\'d rather stay home and read a book. What does the woman imply?'
  },
  {
    id: 3,
    part: 'A',
    conversation: 'Man: I\'ve had such a terrible day.\nWoman: You think you\'ve had problems? Listen to what happened to me!',
    question: 'What does the woman mean?',
    options: [
      'Her problem is less than the man\'s.',
      'She had a terrible day.',
      'She had lots of things to do.',
      'She had a perfect day until now.'
    ],
    correctAnswer: 1,
    audioScript: 'I\'ve had such a terrible day. You think you\'ve had problems? Listen to what happened to me! What does the woman mean?'
  },
  {
    id: 4,
    part: 'A',
    conversation: 'Woman: Have you read that new novel everyone\'s talking about?\nMan: Anna told me all about it, so I feel like I have.',
    question: 'What does the man mean?',
    options: [
      'He doesn\'t read the book, but Anna made her know details about it.',
      'He read the book with Anna once.',
      'He and Anna like the book so much.',
      'He can\'t tell the story of the book even after he read it.'
    ],
    correctAnswer: 0,
    audioScript: 'Have you read that new novel everyone\'s talking about? Anna told me all about it, so I feel like I have. What does the man mean?'
  },
  {
    id: 5,
    part: 'A',
    conversation: 'Woman: I\'m trying to finish this project, but I\'m getting hungry.\nMan: Why don\'t we take a break and grab some lunch together?',
    question: 'What does the man suggest?',
    options: [
      'The woman should be on her diet today.',
      'The man will go easy on the project.',
      'They should go eat together.',
      'There is no need to go on with the diet.'
    ],
    correctAnswer: 2,
    audioScript: 'I\'m trying to finish this project, but I\'m getting hungry. Why don\'t we take a break and grab some lunch together? What does the man suggest?'
  },
  {
    id: 6,
    part: 'A',
    conversation: 'Woman: Do you know why Rose didn\'t come to the party?\nMan: I haven\'t the faintest idea.',
    question: 'What does the man mean?',
    options: [
      'The man doesn\'t have any idea about who Rose is.',
      'The man doesn\'t know why Rose avoided going to the cinema.',
      'The man doesn\'t know why Rose avoided him.',
      'The man doesn\'t know anything about why Rose didn\'t come.'
    ],
    correctAnswer: 3,
    audioScript: 'Do you know why Rose didn\'t come to the party? I haven\'t the faintest idea. What does the man mean?'
  },
  {
    id: 7,
    part: 'A',
    conversation: 'Man: Could you lend me twenty dollars until payday?\nWoman: I wish I could, but I\'m broke myself.',
    question: 'What does the woman mean?',
    options: [
      'She will lend the money to him.',
      'She\'s willing to make a deal.',
      'She doesn\'t have money now.',
      'She wants to know how he deals with the money.'
    ],
    correctAnswer: 2,
    audioScript: 'Could you lend me twenty dollars until payday? I wish I could, but I\'m broke myself. What does the woman mean?'
  },
  {
    id: 8,
    part: 'A',
    conversation: 'Woman: Did you make that sweater yourself?\nMan: Actually, my sister made it for me. It\'s her specialty.',
    question: 'What does the man mean?',
    options: [
      'He didn\'t make the sweater himself.',
      'It didn\'t take long to make.',
      'Someone wanted him to make the sweater.',
      'It\'s the first sweater he ever made.'
    ],
    correctAnswer: 0,
    audioScript: 'Did you make that sweater yourself? Actually, my sister made it for me. It\'s her specialty. What does the man mean?'
  },
  {
    id: 9,
    part: 'A',
    conversation: 'Woman: How did your job interview go?\nMan: I couldn\'t have been more pleased with the way it went.',
    question: 'What does the man mean?',
    options: [
      'He thinks he\'ll be recommended for a high-level job.',
      'The interview was quite unsuccessful.',
      'It\'s unlikely for him to go to the interview.',
      'He had an excellent interview.'
    ],
    correctAnswer: 3,
    audioScript: 'How did your job interview go? I couldn\'t have been more pleased with the way it went. What does the man mean?'
  },
  {
    id: 10,
    part: 'A',
    conversation: 'Man: What did you think of the speaker?\nWoman: She dropped a few pins in the middle of her speech.',
    question: 'What does the woman mean?',
    options: [
      'The audience was very quiet.',
      'The speech contained several puns.',
      'The speaker dropped her microphone.',
      'The speaker made some mistakes during her talk.'
    ],
    correctAnswer: 3,
    audioScript: 'What did you think of the speaker? She dropped a few pins in the middle of her speech. What does the woman mean?'
  },
  {
    id: 11,
    part: 'A',
    conversation: 'Man: Would you like to see a menu?\nWoman: No, thank you. I already know what I want to order.',
    question: 'Where does this conversation probably take place?',
    options: [
      'In a library',
      'In a restaurant',
      'In a park',
      'In the woods'
    ],
    correctAnswer: 1,
    audioScript: 'Would you like to see a menu? No, thank you. I already know what I want to order. Where does this conversation probably take place?'
  },
  {
    id: 12,
    part: 'A',
    conversation: 'Woman: You have quite a few overdue books.\nMan: I know. I\'ve been meaning to return them, but I keep forgetting.',
    question: 'What does the man imply?',
    options: [
      'He wants to buy the books.',
      'He is planning to pay the late fees soon.',
      'He doesn\'t want to check out more books.',
      'He is fond of keeping books.'
    ],
    correctAnswer: 1,
    audioScript: 'You have quite a few overdue books. I know. I\'ve been meaning to return them, but I keep forgetting. What does the man imply?'
  },
  {
    id: 13,
    part: 'A',
    conversation: 'Man: The ice on the lake looks thick enough for skating.\nWoman: I think we should wait until it\'s been tested.',
    question: 'What does the woman suggest?',
    options: [
      'It\'s too early to go skate.',
      'Wait for the weather to get better.',
      'Skate with friends will be better.',
      'Buy a new pair of skates.'
    ],
    correctAnswer: 0,
    audioScript: 'The ice on the lake looks thick enough for skating. I think we should wait until it\'s been tested. What does the woman suggest?'
  },
  {
    id: 14,
    part: 'A',
    conversation: 'Man: Have you ever been to Las Vegas?\nWoman: I\'ve always wanted to go, but I\'ve never had the chance.',
    question: 'What does the woman mean?',
    options: [
      'She is looking forward to going to Vegas.',
      'She doesn\'t have any idea about Vegas.',
      'She thinks the man doesn\'t know about Vegas.',
      'She needs a ticket to Vegas.'
    ],
    correctAnswer: 0,
    audioScript: 'Have you ever been to Las Vegas? I\'ve always wanted to go, but I\'ve never had the chance. What does the woman mean?'
  },
  {
    id: 15,
    part: 'A',
    conversation: 'Woman: Are you going to the International Conference in Frankfurt?\nMan: I\'m still on the fence about it.',
    question: 'What does the man mean?',
    options: [
      'He is certain about his plan.',
      'His idea is to go to Frankfurt next month.',
      'He wants to go to the International Conference.',
      'He is being hesitant about attending the Conference.'
    ],
    correctAnswer: 3,
    audioScript: 'Are you going to the International Conference in Frankfurt? I\'m still on the fence about it. What does the man mean?'
  },
  {
    id: 16,
    part: 'A',
    conversation: 'Man: Anna\'s entered her short stories in the competition.\nWoman: I hope she wins. She certainly deserves to.',
    question: 'What does the woman mean?',
    options: [
      'He asks the woman to join the short stories competition.',
      'He has never taken part in a short story competition before.',
      'He wants to check some of Anna\'s short stories soon.',
      'He thinks Anna\'s short stories are good enough to win.'
    ],
    correctAnswer: 3,
    audioScript: 'Anna\'s entered her short stories in the competition. I hope she wins. She certainly deserves to. What does the woman mean?'
  },
  {
    id: 17,
    part: 'A',
    conversation: 'Woman: Anna seems very nervous about her presentation tomorrow.\nMan: She doesn\'t need to be. She\'s well prepared.',
    question: 'What does the man imply about Anna?',
    options: [
      'Anna needs to be reminded about the time.',
      'Anna is being nervous.',
      'Anna doesn\'t need to worry.',
      'Anna has a problem with her speech.'
    ],
    correctAnswer: 2,
    audioScript: 'Anna seems very nervous about her presentation tomorrow. She doesn\'t need to be. She\'s well prepared. What does the man imply about Anna?'
  },
  {
    id: 18,
    part: 'A',
    conversation: 'Man: I\'ve been working on this paper for weeks.\nWoman: Maybe you should take a break and come back to it later.',
    question: 'What does the woman suggest?',
    options: [
      'Never do the paper.',
      'The paper can wait.',
      'Taking time out from working on the paper.',
      'Finishing the paper today.'
    ],
    correctAnswer: 2,
    audioScript: 'I\'ve been working on this paper for weeks. Maybe you should take a break and come back to it later. What does the woman suggest?'
  },
  {
    id: 19,
    part: 'A',
    conversation: 'Woman: Who\'s going to drive Emily to her piano lesson?\nMan: Her teacher offered to pick her up.',
    question: 'Who will take Emily to her lesson?',
    options: [
      'The man',
      'The woman',
      'Emily',
      'The piano teacher'
    ],
    correctAnswer: 3,
    audioScript: 'Who\'s going to drive Emily to her piano lesson? Her teacher offered to pick her up. Who will take Emily to her lesson?'
  },
  {
    id: 20,
    part: 'A',
    conversation: 'Woman: Why isn\'t John here? The meeting\'s about to start.\nMan: He\'s still looking for an apartment.',
    question: 'What does the man mean?',
    options: [
      'He will come later.',
      'He is taking lots of pictures of his apartment.',
      'He is working on his research project.',
      'He didn\'t come because he is looking for an apartment.'
    ],
    correctAnswer: 3,
    audioScript: 'Why isn\'t John here? The meeting\'s about to start. He\'s still looking for an apartment. What does the man mean?'
  },
  {
    id: 21,
    part: 'A',
    conversation: 'Man: I forgot my book again.\nWoman: You always leave something behind when you come here.',
    question: 'What does the woman imply?',
    options: [
      'The man left the book on purpose.',
      'The man has a habit of forgetting things.',
      'The man likes to bring a book every week.',
      'The man goes to the campus once a week.'
    ],
    correctAnswer: 1,
    audioScript: 'I forgot my book again. You always leave something behind when you come here. What does the woman imply?'
  },
  {
    id: 22,
    part: 'A',
    conversation: 'Woman: You look down. What\'s wrong?\nMan: Nothing really. I\'ve just been homesick lately.',
    question: 'What does the man mean?',
    options: [
      'He is tired of his current apartment.',
      'Nothing happened to him.',
      'He has been sick at home.',
      'He misses his hometown.'
    ],
    correctAnswer: 3,
    audioScript: 'You look down. What\'s wrong? Nothing really. I\'ve just been homesick lately. What does the man mean?'
  },
  {
    id: 23,
    part: 'A',
    conversation: 'Man: I\'m thinking of applying for that job at the bookstore.\nWoman: I think you\'d be perfect for it.',
    question: 'What does the woman mean?',
    options: [
      'The job application is already closed.',
      'She believes he is suited for the job.',
      'She won\'t hire anyone.',
      'He is not suitable for the job.'
    ],
    correctAnswer: 1,
    audioScript: 'I\'m thinking of applying for that job at the bookstore. I think you\'d be perfect for it. What does the woman mean?'
  },
  {
    id: 24,
    part: 'A',
    conversation: 'Woman: How are you feeling today?\nMan: Much better, thanks. I was pretty sick yesterday.',
    question: 'What does the man mean?',
    options: [
      'He is feeling terrific.',
      'He feels better today.',
      'He felt a lot worse today.',
      'He is not feeling well today.'
    ],
    correctAnswer: 1,
    audioScript: 'How are you feeling today? Much better, thanks. I was pretty sick yesterday. What does the man mean?'
  },
  {
    id: 25,
    part: 'A',
    conversation: 'Man: Joe\'s going on the roller coaster again.\nWoman: I don\'t know how he can enjoy those dangerous rides.',
    question: 'What does the woman mean?',
    options: [
      'She doesn\'t know why Joe likes dangerous rides.',
      'The man is funnier than Joe.',
      'They should join Joe on the roller coaster.',
      'She knows the man used to like roller coaster too.'
    ],
    correctAnswer: 0,
    audioScript: 'Joe\'s going on the roller coaster again. I don\'t know how he can enjoy those dangerous rides. What does the woman mean?'
  },
  {
    id: 26,
    part: 'A',
    conversation: 'Woman: What do you think of my new car?\nMan: It\'s exactly what I\'ve always wanted.',
    question: 'What does the man mean?',
    options: [
      'He thinks the woman is joking.',
      'He thinks the car is dangerous.',
      'It\'s the kind of car he wants.',
      'The car is very unappealing to him.'
    ],
    correctAnswer: 2,
    audioScript: 'What do you think of my new car? It\'s exactly what I\'ve always wanted. What does the man mean?'
  },
  {
    id: 27,
    part: 'A',
    conversation: 'Man: Is Charlie coming to the wedding?\nWoman: Yes, his sister is getting married in Virginia this summer.',
    question: 'What does the woman say about Charlie?',
    options: [
      'Charlie is getting married this summer.',
      'Charlie\'s sister is returning to Virginia to get married.',
      'Charlie will be there when his sister gets married this summer.',
      'Charlie\'s sister is coming to his wedding in Virginia.'
    ],
    correctAnswer: 2,
    audioScript: 'Is Charlie coming to the wedding? Yes, his sister is getting married in Virginia this summer. What does the woman say about Charlie?'
  },
  {
    id: 28,
    part: 'A',
    conversation: 'Man: Let\'s ask Jessica to join us.\nWoman: She lives closer than anyone else, so she\'s the logical choice.',
    question: 'What does the woman mean?',
    options: [
      'She doesn\'t believe what Jessica told them.',
      'She is asking if he is familiar with Jessica\'s voice.',
      'Jessica is close, so they should wait for her.',
      'Jessica\'s place is closer, so they should get her instead.'
    ],
    correctAnswer: 3,
    audioScript: 'Let\'s ask Jessica to join us. She lives closer than anyone else, so she\'s the logical choice. What does the woman mean?'
  },
  {
    id: 29,
    part: 'A',
    conversation: 'Woman: How was your meeting with Chris?\nMan: He couldn\'t have been friendlier.',
    question: 'What does the man mean?',
    options: [
      'Chris could have met her sooner.',
      'Chris didn\'t seem to like her at all.',
      'Chris was extremely friendly when he met her.',
      'Chris didn\'t have friends when she met him.'
    ],
    correctAnswer: 2,
    audioScript: 'How was your meeting with Chris? He couldn\'t have been friendlier. What does the man mean?'
  },
  {
    id: 30,
    part: 'A',
    conversation: 'Man: Johnny forgot to hand in his assignment.\nWoman: That\'s not like him. He\'s usually so responsible.',
    question: 'What does the woman mean?',
    options: [
      'Johnny forgot to write his paper.',
      'It was the first time Johnny made a mistake.',
      'Johnny didn\'t remember to submit his paper.',
      'Johnny turned in the paper in the wrong place.'
    ],
    correctAnswer: 2,
    audioScript: 'Johnny forgot to hand in his assignment. That\'s not like him. He\'s usually so responsible. What does the woman mean?'
  },
  // PART B - Longer Conversations (10 questions)
  {
    id: 31,
    part: 'B',
    conversation: `Narrator: Listen to a conversation between a student and an advisor.
Student: I'd like to sign up for the Work and Study Program.
Advisor: Are you looking for a job on campus?
Student: Yes, I need to earn some money. I'm a sophomore now, so I have some free time.
Advisor: You need to maintain good grades while working. The program allows up to 20 hours per week.
Student: I understand. Can I start right away?
Advisor: First, you need to fill out this form and find a job at the Job Centre.`,
    question: 'Why does the student go to see the advisor?',
    options: [
      'She wants to sign up for a scholarship',
      'She needs money because she loses her scholarship',
      'She wants to sign up for the Work and Study Program',
      'She needs a job for future references'
    ],
    correctAnswer: 2,
    audioScript: 'Listen to a conversation between a student and an advisor. I\'d like to sign up for the Work and Study Program. Are you looking for a job on campus? Yes, I need to earn some money. I\'m a sophomore now, so I have some free time. You need to maintain good grades while working. The program allows up to 20 hours per week. I understand. Can I start right away? First, you need to fill out this form and find a job at the Job Centre. Why does the student go to see the advisor?'
  },
  {
    id: 32,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Why can the student work now?',
    options: [
      'Because she has enough free time to work',
      'Because she prefers to work than study',
      'Because she is a sophomore, so she can\'t do as she pleases',
      'Because she wants to make more money to pay back her loans'
    ],
    correctAnswer: 0,
    audioScript: 'Why can the student work now?'
  },
  {
    id: 33,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Why does the advisor mention grades?',
    options: [
      'To remind the student that it is important to maintain good grades',
      'To emphasize that the student should work as many hours as possible',
      'To remind the student that she will not have a scholarship next year',
      'To distinguish between a scholarship and a loan'
    ],
    correctAnswer: 0,
    audioScript: 'Why does the advisor mention grades?'
  },
  {
    id: 34,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What will the student probably do next?',
    options: [
      'Sign the form immediately',
      'Find a job as soon as possible',
      'Take a 10-hour-a-week job for now',
      'Go to the Job Centre to find a suitable job'
    ],
    correctAnswer: 3,
    audioScript: 'What will the student probably do next?'
  },
  {
    id: 35,
    part: 'B',
    conversation: `Narrator: Listen to a conversation between a student and a professor.
Student: Professor Adams, I'd like to take your Shakespeare class next semester.
Professor: That's an advanced course. Have you taken any literature classes?
Student: I'm taking Literature 101 now, and I really enjoy it.
Professor: That's a freshman class. You should wait until you have more credits.
Student: But I love Shakespeare's plays.
Professor: I suggest you take more literature courses first, then sign up next year.`,
    question: 'Why does the student talk to the professor?',
    options: [
      'She wants to switch her major to literature',
      'She wants to drop Professor Adams\' literature class',
      'She wants to know more about the assignment due next class',
      'She wants to take Professor Adams\' Shakespeare class next semester'
    ],
    correctAnswer: 3,
    audioScript: 'Listen to a conversation between a student and a professor. Professor Adams, I\'d like to take your Shakespeare class next semester. That\'s an advanced course. Have you taken any literature classes? I\'m taking Literature 101 now, and I really enjoy it. That\'s a freshman class. You should wait until you have more credits. But I love Shakespeare\'s plays. I suggest you take more literature courses first, then sign up next year. Why does the student talk to the professor?'
  },
  {
    id: 36,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Why is the professor concerned?',
    options: [
      'He has not seen the student before today',
      'The student looks and acts like a freshman',
      'Professor Adams\' Literature class is for freshman',
      'The student just decided to switch her major'
    ],
    correctAnswer: 1,
    audioScript: 'Why is the professor concerned?'
  },
  {
    id: 37,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'Why is the student hesitant about the professor\'s suggestion?',
    options: [
      'She is worried it will be too much work',
      'She needs to sign up for more classes but is not sure which ones to take',
      'She must take another class at the same time',
      'She loves Shakespeare but does not want to take a freshman class'
    ],
    correctAnswer: 3,
    audioScript: 'Why is the student hesitant about the professor\'s suggestion?'
  },
  {
    id: 38,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What does the professor suggest the student do?',
    options: [
      'Wait to see how well she performs in Professor Adams\' Literature class',
      'Take the Shakespeare class when she reaches the required credit',
      'Sign up for the Shakespeare class and drop it if it\'s overwhelming',
      'Drop the Literature class and get the Shakespeare class now'
    ],
    correctAnswer: 1,
    audioScript: 'What does the professor suggest the student do?'
  },
  {
    id: 39,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What will the student probably do?',
    options: [
      'She will wait until she has time to sign up',
      'She is going to sign up for the class',
      'She will ask the professor about the class',
      'She wants to research other options before deciding'
    ],
    correctAnswer: 0,
    audioScript: 'What will the student probably do?'
  },
  {
    id: 40,
    part: 'B',
    conversation: 'Same conversation as above',
    question: 'What can be inferred about the student?',
    options: [
      'She is a senior student',
      'She is a freshman',
      'She is a graduate student',
      'She is a transfer student'
    ],
    correctAnswer: 1,
    audioScript: 'What can be inferred about the student?'
  },
  // PART C - Talks (10 questions)
  {
    id: 41,
    part: 'C',
    talk: `Narrator: Listen to a talk about the origin of the moon.
The Moon has fascinated humans for centuries. There are several theories about how the Moon was formed. The capture theory suggests that the Moon was formed elsewhere in the solar system and was captured by Earth's gravity. However, this theory has problems because the Moon would have a strange orbital path if it were captured.

The fission theory proposes that the Moon was once part of Earth and split off due to rapid rotation. This explains why the Moon is made of similar materials as Earth. However, the Moon is too small for this to be likely.

The most accepted theory today is the giant impact hypothesis. It suggests that a Mars-sized object collided with Earth about 4.5 billion years ago, and the debris from this collision eventually formed the Moon.`,
    question: 'What is the main topic of the talk?',
    options: [
      'Problems with theories about the origin of the moon',
      'Whether the moon was connected to Earth at one point or not',
      'The importance of the moon to the earth',
      'The composition of the moon compares to the Earth'
    ],
    correctAnswer: 0,
    audioScript: 'Listen to a talk about the origin of the moon. The Moon has fascinated humans for centuries. There are several theories about how the Moon was formed. The capture theory suggests that the Moon was formed elsewhere in the solar system and was captured by Earth\'s gravity. However, this theory has problems because the Moon would have a strange orbital path if it were captured. The fission theory proposes that the Moon was once part of Earth and split off due to rapid rotation. This explains why the Moon is made of similar materials as Earth. However, the Moon is too small for this to be likely. The most accepted theory today is the giant impact hypothesis. It suggests that a Mars-sized object collided with Earth about 4.5 billion years ago, and the debris from this collision eventually formed the Moon. What is the main topic of the talk?'
  },
  {
    id: 42,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is a problem with the capture theory?',
    options: [
      'There is no evidence of living being on the moon',
      'The moon would have a strange orbital path if it were captured by the Earth',
      'The earth would be smaller after capturing the moon',
      'There are too many chemical differences between the Earth and the moon'
    ],
    correctAnswer: 1,
    audioScript: 'What is a problem with the capture theory?'
  },
  {
    id: 43,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is an advantage of the fission theory?',
    options: [
      'It explains why the moon is made of the same materials as the earth',
      'It was and is the most popular theory among astronomers',
      'Modern astronomers do not believe this theory is correct',
      'The density of the moon is the same as the earth'
    ],
    correctAnswer: 0,
    audioScript: 'What is an advantage of the fission theory?'
  },
  {
    id: 44,
    part: 'C',
    talk: 'Same talk as above',
    question: 'What is a problem with the fission theory?',
    options: [
      'There is more proof that the fission theory is correct',
      'There is no way to prove it is correct',
      'The moon is too big for such a separation',
      'The impact would have caused the earth to break apart into many pieces'
    ],
    correctAnswer: 2,
    audioScript: 'What is a problem with the fission theory?'
  },
  {
    id: 45,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Which theory is most accepted today?',
    options: [
      'The capture theory',
      'The fission theory',
      'The sister theory',
      'The giant impact hypothesis'
    ],
    correctAnswer: 3,
    audioScript: 'Which theory is most accepted today?'
  },
  {
    id: 46,
    part: 'C',
    talk: `Narrator: Listen to a lecture about sleep.
Sleep is essential for our health and well-being. When we don't get enough sleep, we accumulate what scientists call "sleep debt." This debt can have serious effects on our bodies and minds.

Sleep deprivation can lead to decreased attention, slower thinking, and poor memory. Studies show that driving while sleep-deprived can be as dangerous as driving under the influence of alcohol.

Circadian rhythms are our body's natural sleep-wake cycle. When we disrupt this cycle, for example by staying up late or working night shifts, we can experience various health problems. Most adults need 7-9 hours of sleep per night, though individual needs vary.`,
    question: 'What is the main topic of the lecture?',
    options: [
      'Why people need sleep in their life',
      'The effects of sleep deprivation on the body',
      'How many hours of sleep people should get each night',
      'What happens when you get enough sleep'
    ],
    correctAnswer: 1,
    audioScript: 'Listen to a lecture about sleep. Sleep is essential for our health and well-being. When we don\'t get enough sleep, we accumulate what scientists call "sleep debt." This debt can have serious effects on our bodies and minds. Sleep deprivation can lead to decreased attention, slower thinking, and poor memory. Studies show that driving while sleep-deprived can be as dangerous as driving under the influence of alcohol. Circadian rhythms are our body\'s natural sleep-wake cycle. When we disrupt this cycle, for example by staying up late or working night shifts, we can experience various health problems. Most adults need 7-9 hours of sleep per night, though individual needs vary. What is the main topic of the lecture?'
  },
  {
    id: 47,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Why does the speaker mention circadian rhythms?',
    options: [
      'To introduce the idea that lack of sleep disrupts our natural sleep cycle',
      'To compare sleep deprivation to circadian rhythms',
      'To provide an example of sleep debt',
      'To give an example of how to open a discussion'
    ],
    correctAnswer: 0,
    audioScript: 'Why does the speaker mention circadian rhythms?'
  },
  {
    id: 48,
    part: 'C',
    talk: 'Same talk as above',
    question: 'Why does the speaker mention driving?',
    options: [
      'To give an example that sleep debt is an important topic',
      'To show that he gets enough sleep daily',
      'To point out the danger of sleep deprivation',
      'To show that college students must reduce their work'
    ],
    correctAnswer: 2,
    audioScript: 'Why does the speaker mention driving?'
  },
  {
    id: 49,
    part: 'C',
    talk: 'Same talk as above',
    question: 'According to the lecture, what is a danger of sleep deprivation?',
    options: [
      'People could not fall asleep for a long time',
      'It may lead to overconsumption of alcohol',
      'It will decrease stress',
      'It could be as dangerous as driving a car while intoxicated'
    ],
    correctAnswer: 3,
    audioScript: 'According to the lecture, what is a danger of sleep deprivation?'
  },
  {
    id: 50,
    part: 'C',
    talk: 'Same talk as above',
    question: 'How much sleep do most adults need?',
    options: [
      '5-6 hours per night',
      '7-9 hours per night',
      '10-12 hours per night',
      '3-4 hours per night'
    ],
    correctAnswer: 1,
    audioScript: 'How much sleep do most adults need?'
  }
];

// ============================================
// SECTION 2: STRUCTURE AND WRITTEN EXPRESSION (40 questions)
// ============================================

export const structureQuestions: StructureQuestion[] = [
  // Structure Questions (1-15)
  {
    id: 1,
    type: 'structure',
    sentence: 'The Statue of Liberty, completed in Paris in 1884, _______ in New York Harbor in 1886.',
    options: [
      'to unveil',
      'it unveiled',
      'was unveiled',
      'the unveiling'
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    type: 'structure',
    sentence: '_______, wildflower applies to plants growing without intentional human aid, particularly those flowering in woodlands, prairies, and mountains.',
    options: [
      'Although',
      'Generally',
      'Because of',
      'In spite of'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'structure',
    sentence: 'Snowpiercer and Parasite _______ of Bong Joon-ho\'s famous films.',
    options: [
      'are two',
      'they are two',
      'two of them are',
      'two of them'
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    type: 'structure',
    sentence: 'As the spatial part of the universe\'s spacetime metric increases in scale, objects _______ from one another at ever-increasing speeds.',
    options: [
      'become distant more',
      'it becomes more distant',
      'become more distant',
      'its become distant'
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    type: 'structure',
    sentence: 'Over the last 50 years, makers and musicians have revived the lost instruments in an attempt to create _______ informed performances.',
    options: [
      'history',
      'historic',
      'historical',
      'historically'
    ],
    correctAnswer: 3
  },
  {
    id: 6,
    type: 'structure',
    sentence: 'The productivity of language is due to another feature _______ human communication with other animals.',
    options: [
      'while distinguishes',
      'when distinguishes',
      'which distinguishes',
      'was distinguished'
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    type: 'structure',
    sentence: '_______ has a beautiful red coat, the red panda is called "hun-ho" or "firefox" in China.',
    options: [
      'They',
      'Because it',
      'Despite',
      'As soon as'
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    type: 'structure',
    sentence: 'Chamomile tea, used as a tonic and an antiseptic and in many herbal remedies, _______ from English chamomile or German chamomile.',
    options: [
      'is made',
      'it is made',
      'is making',
      'was made'
    ],
    correctAnswer: 0
  },
  {
    id: 9,
    type: 'structure',
    sentence: 'Glaciers move very slowly over time, and _______ the landscape once they have moved through an area.',
    options: [
      'greatly alters',
      'is greatly alter',
      'great altering',
      'greatly alter'
    ],
    correctAnswer: 3
  },
  {
    id: 10,
    type: 'structure',
    sentence: 'Thomas Jefferson, _______ a personally designed and constructed laptop desk, wrote the Declaration of Independence in the summer of 1776.',
    options: [
      'using',
      'he used',
      'had used',
      'the use of'
    ],
    correctAnswer: 0
  },
  {
    id: 11,
    type: 'structure',
    sentence: 'Around the world, criteria, structure, teaching methodology, and nature of medical programs _______ at medical schools vary considerably.',
    options: [
      'offered',
      'it offers',
      'will offers',
      'it is offer'
    ],
    correctAnswer: 0
  },
  {
    id: 12,
    type: 'structure',
    sentence: 'Change, both good and bad, can create stress, _______ if sufficiently severe, can lead to illness.',
    options: [
      'that stress',
      'stress',
      'and stress',
      'stress will'
    ],
    correctAnswer: 0
  },
  {
    id: 13,
    type: 'structure',
    sentence: 'In 1817 Karl Von Drais _______ a walking machine to get around the royal gardens faster.',
    options: [
      'invests',
      'is inventing',
      'invented',
      'will invent'
    ],
    correctAnswer: 2
  },
  {
    id: 14,
    type: 'structure',
    sentence: 'Many instruments from the past have disappeared from mainstream usage or _______ by modern equivalents.',
    options: [
      'has been replaced',
      'replacing',
      'have been replaced',
      'replaced'
    ],
    correctAnswer: 2
  },
  {
    id: 15,
    type: 'structure',
    sentence: 'Schizophrenics often live in a fantasy world _______ that others can\'t hear.',
    options: [
      'why they hear voices',
      'which voices they hear',
      'what voices they hear',
      'where they hear voices'
    ],
    correctAnswer: 3
  },
  // Written Expression Questions (16-40)
  {
    id: 16,
    type: 'written',
    sentence: 'In Western music, seven letters of the alphabet are assigned to differently pitches ranging from A to G.',
    underlinedParts: ['In Western music,', 'seven letters of the alphabet', 'are assigned to differently pitches', 'ranging from A to G.'],
    correctAnswer: 2
  },
  {
    id: 17,
    type: 'written',
    sentence: 'In many cultures, spring has been celebrated with rites and festivals revolving around its important in food production.',
    underlinedParts: ['In many cultures,', 'spring has been celebrated', 'with rites and festivals revolving', 'around its important in food production.'],
    correctAnswer: 3
  },
  {
    id: 18,
    type: 'written',
    sentence: 'Long term stress can harm the body and mind, causing sleep disturbance and awakening the immune system.',
    underlinedParts: ['Long term stress can harm', 'the body and mind,', 'causing sleep disturbance', 'and awakening the immune system.'],
    correctAnswer: 3
  },
  {
    id: 19,
    type: 'written',
    sentence: 'Increased plastic uses raise concerns over leakages into marine environments, particular from coastal areas with high population.',
    underlinedParts: ['Increased plastic uses raise', 'concerns over leakages', 'into marine environments,', 'particular from coastal areas with high population.'],
    correctAnswer: 3
  },
  {
    id: 20,
    type: 'written',
    sentence: 'During the first half of the eighteenth century, houses begins to show a new elegance in colonial North America.',
    underlinedParts: ['During the first half', 'of the eighteenth century,', 'houses begins to show', 'a new elegance in colonial North America.'],
    correctAnswer: 2
  },
  {
    id: 21,
    type: 'written',
    sentence: 'Some economists now suggest that home equity loans are merely a new trap for push consumer beyond what they can afford.',
    underlinedParts: ['Some economists now suggest', 'that home equity loans', 'are merely a new trap', 'for push consumer beyond what they can afford.'],
    correctAnswer: 3
  },
  {
    id: 22,
    type: 'written',
    sentence: 'The outer layer of the heart, called the pericardium, forms a sac in what the heart lies.',
    underlinedParts: ['The outer layer of the heart,', 'called the pericardium,', 'forms a sac', 'in what the heart lies.'],
    correctAnswer: 3
  },
  {
    id: 23,
    type: 'written',
    sentence: 'Wood from the ash tree becomes extremely flexibly when it is exposed to steam.',
    underlinedParts: ['Wood from the ash tree', 'becomes extremely flexibly', 'when it is exposed', 'to steam.'],
    correctAnswer: 1
  },
  {
    id: 24,
    type: 'written',
    sentence: 'The ability to talk is one of the skill that make humans different from the rest of the animal world.',
    underlinedParts: ['The ability to talk', 'is one of the skill', 'that make humans different', 'from the rest of the animal world.'],
    correctAnswer: 1
  },
  {
    id: 25,
    type: 'written',
    sentence: 'In plane geometry, the sum of the internal angles of any triangle has always equal to 180 degrees.',
    underlinedParts: ['In plane geometry,', 'the sum of the internal angles', 'of any triangle has always equal', 'to 180 degrees.'],
    correctAnswer: 2
  },
  {
    id: 26,
    type: 'written',
    sentence: 'Polar bears are bowlegged and pigeon-toed, adaptations that enable this massive animals to maintain their balance as they walk.',
    underlinedParts: ['Polar bears are bowlegged', 'and pigeon-toed,', 'adaptations that enable this massive animals', 'to maintain their balance as they walk.'],
    correctAnswer: 2
  },
  {
    id: 27,
    type: 'written',
    sentence: 'Caves are formed by the chemical or action of water on soluble rock, by volcanic activity, and by earthquakes.',
    underlinedParts: ['Caves are formed', 'by the chemical or action', 'of water on soluble rock,', 'by volcanic activity, and by earthquakes.'],
    correctAnswer: 1
  },
  {
    id: 28,
    type: 'written',
    sentence: 'Celery, an edible plant is having long stalks topped with feathery leaves, grows best in cool weather.',
    underlinedParts: ['Celery, an edible plant', 'is having long stalks', 'topped with feathery leaves,', 'grows best in cool weather.'],
    correctAnswer: 1
  },
  {
    id: 29,
    type: 'written',
    sentence: 'The first fiction writer in the United States to achieve international fame was Washington Irving, who wrote many stories, included "Rip Van Winkle".',
    underlinedParts: ['The first fiction writer', 'in the United States to achieve international fame', 'was Washington Irving,', 'who wrote many stories, included "Rip Van Winkle".'],
    correctAnswer: 3
  },
  {
    id: 30,
    type: 'written',
    sentence: 'Three fundamental aspects of forest conversation are the protection of immature trees, the use of proper harvesting methods, and provide for wildlife habitat.',
    underlinedParts: ['Three fundamental aspects', 'of forest conversation are', 'the protection of immature trees,', 'the use of proper harvesting methods, and provide for wildlife habitat.'],
    correctAnswer: 3
  },
  {
    id: 31,
    type: 'written',
    sentence: 'The celesta, an orchestral percussion instrument, resembles a small upright piano and is often used in symphony orchestras.',
    underlinedParts: ['The celesta, an orchestral', 'percussion instrument,', 'resembles a small upright piano', 'and is often used in symphony orchestras.'],
    correctAnswer: 0
  },
  {
    id: 32,
    type: 'written',
    sentence: 'Thomas Paine, an eloquent writer, wrote Common Sense, a pamphlet that identified the American colonies with the cause of liberty.',
    underlinedParts: ['Thomas Paine,', 'an eloquent writer,', 'wrote Common Sense,', 'a pamphlet that identified the American colonies with the cause of liberty.'],
    correctAnswer: 0
  },
  {
    id: 33,
    type: 'written',
    sentence: 'Although beavers rarely remain submerged for more than two minutes, they can stay underwater as long as fifteen minutes before having to surface for air.',
    underlinedParts: ['Although beavers rarely remain', 'submerged for more than two minutes,', 'they can stay underwater as long', 'as fifteen minutes before having to surface for air.'],
    correctAnswer: 0
  },
  {
    id: 34,
    type: 'written',
    sentence: 'Protein digestion begins in the stomach and ends in the small intestine.',
    underlinedParts: ['Protein digestion begins', 'in the stomach and', 'ends in', 'the small intestine.'],
    correctAnswer: 0
  },
  {
    id: 35,
    type: 'written',
    sentence: 'When natural gas burns, its hydrocarbon molecules break up into atoms of carbon and hydrogen.',
    underlinedParts: ['When natural gas burns,', 'its hydrocarbon molecules', 'break up into atoms', 'of carbon and hydrogen.'],
    correctAnswer: 0
  },
  {
    id: 36,
    type: 'written',
    sentence: 'All ballet dancers learn five basic positions for the arms and feet.',
    underlinedParts: ['All ballet dancers', 'learn five basic positions', 'for the arms', 'and feet.'],
    correctAnswer: 0
  },
  {
    id: 37,
    type: 'written',
    sentence: 'Some colonies of bryozoans, small marine animals, form creeping colonies with trailing stems.',
    underlinedParts: ['Some colonies of bryozoans,', 'small marine animals,', 'form creeping colonies', 'with trailing stems.'],
    correctAnswer: 0
  },
  {
    id: 38,
    type: 'written',
    sentence: 'Ruth Bader Ginsburg argued six women\'s rights cases before the United States Supreme Court in the 1970\'s, winning five of them.',
    underlinedParts: ['Ruth Bader Ginsburg argued', 'six women\'s rights cases', 'before the United States Supreme Court', 'in the 1970\'s, winning five of them.'],
    correctAnswer: 0
  },
  {
    id: 39,
    type: 'written',
    sentence: 'Natural selection is defined as the process that directs the course of evolution by preserving those traits best adapted for an organism\'s survival.',
    underlinedParts: ['Natural selection is defined', 'as the process that directs', 'the course of evolution', 'by preserving those traits best adapted for an organism\'s survival.'],
    correctAnswer: 0
  },
  {
    id: 40,
    type: 'written',
    sentence: 'Manufacturing is Canada\'s most important economic activity, engaging 17 percent of the workforce.',
    underlinedParts: ['Manufacturing is Canada\'s', 'most important economic activity,', 'engaging 17 percent', 'of the workforce.'],
    correctAnswer: 0
  }
];

// ============================================
// SECTION 3: READING COMPREHENSION (50 questions)
// ============================================

export const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    title: 'Meteors and Meteorites',
    text: `Meteors are tiny solid particles that enter Earth's atmosphere from interplanetary space. Since the particles move at speeds of many kilometers per second, friction with the air vaporizes them at altitudes between 80 and 130 kilometers. The resulting flashes of light fade out within a few seconds. These "shooting stars" got their name because at night their luminous vapors look like stars moving rapidly across the sky. Some meteorites do end up landing on Earth's surface. It was not until the time when meteorites were measured and their compositions analyzed in detail that scientists appreciated their true significance. The meteorites include the oldest and most primitive materials available for direct study in the laboratory.

The average age for the most primitive meteorites, calculated using the most accurate values now available for radioactive half-lives, is 4.5 billion years. This value is taken to represent the age of the solar system—the time since the first solids condensed and began to form into larger bodies.

Meteorites are often classified between primitive and differentiated meteorites. The differentiated meteorites are fragments of larger parent bodies that were molten before they broke up, allowing the denser materials (such as metals) to sink to their centers. Like many rocks on Earth, they have been subject to a degree of chemical reshuffling, with the different materials sorted according to density. Differentiated meteorites include the irons, which come from the metal cores of their parent bodies; stony-irons, which probably originate in regions between a metal core and a stony mantle; and some stones that are composed of mantle or crust material from their differentiated parent bodies.

For information on the earliest history of the solar system, we turn to the primitive meteorites—those made of materials that have not been subject to great heat or pressure since their formation. We can look at the spectrum of sunlight reflected from asteroids and compare their compositions with those of primitive meteorites. Such analysis indicates that their parent bodies are almost certainly asteroids. Since asteroids are believed to be fragments left over from the formation process of the solar system, it makes sense that they should be the parent bodies of the primitive meteorites.

The great majority of the meteorites that reach Earth are primitive stones. Many of them are composed of light-colored gray silicates with some metallic grains mixed in. Some have been more helpful than others in providing information about the solar system. Among the most useful of these meteorites have been the Allende meteorite that fell in Mexico, the Murchison meteorite that fell in Australia, and the Tagish Lake meteorite that landed in a winter snowdrift on Tagish Lake, Canada, in 2000.

The Murchison meteorite is known for the variety of organic chemicals it has yielded. Most of the carbon compounds in carbonaceous meteorites are complex, tar-like substances that defy exact analysis. Murchison also contains 16 amino acids (the building blocks of proteins), 11 of which are rare on Earth. The most prominent thing about these organic molecules is that they include equal numbers with right-handed and left-handed molecular symmetry. Amino acids can have either kind of symmetry, but all life on Earth has evolved using only the left-handed versions to make proteins. The presence of both kinds of amino acids clearly demonstrates that the ones in the meteorites had an extraterrestrial origin.`,
    questions: [
      {
        id: 1,
        question: 'According to paragraph 1, which of the following is TRUE?',
        options: [
          'Meteors are vaporized due to friction at heights of about 100 kilometers',
          'Flashes of light seen in the sky at night are shooting stars',
          'Most meteorites fall to Earth\'s surface after they are vaporized',
          'Large particles that come together from interplanetary space are called a meteor'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'The word "luminous" in paragraph 1 is closest in meaning to',
        options: [
          'dull',
          'obscure',
          'vague',
          'radiant'
        ],
        correctAnswer: 3
      },
      {
        id: 3,
        question: 'What can be inferred from the information in paragraph 2?',
        options: [
          'Astronomers prefer to study primitive meteorites since they are older',
          'Scientists have utilized new technology to assess the age of primitive meteorites',
          'The solar system is roughly 4.5 billion years old',
          'Most meteorites are primitive meteorites'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'According to paragraph 3, all of the following statements are true, EXCEPT',
        options: [
          'Among the differentiated meteorites are the irons and stony-irons',
          'Differentiated meteorites come from larger objects which were made of molten',
          'There are only two classes of meteorites: primitive and differentiated',
          'Meteorites composed of molten metal tend to have heavier materials in their center'
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'The word "their" in paragraph 4 refers to',
        options: [
          'solar system',
          'primitive meteorites',
          'asteroids',
          'sunlight reflection'
        ],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'How can people learn about the solar system\'s earliest history?',
        options: [
          'By looking at the composition of differentiated meteorites',
          'By looking at images of primitive meteorites when they are attached to parent asteroids',
          'By studying asteroids and parent bodies of both differentiated and primitive meteorites',
          'By comparing the primitive meteorites to those asteroids seen through the reflection of sunlight'
        ],
        correctAnswer: 3
      },
      {
        id: 7,
        question: 'The word "providing" in paragraph 5 is closest in meaning to',
        options: [
          'giving',
          'retaining',
          'surrendering',
          'keeping'
        ],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'The word "defy" in paragraph 6 is closest in meaning to',
        options: [
          'resist',
          'flatter',
          'regard',
          'help'
        ],
        correctAnswer: 0
      },
      {
        id: 9,
        question: 'According to paragraph 6, what is so notable about the Murchison meteorite?',
        options: [
          'It contained eleven rare amino acids that included an unmatched symmetry',
          'It was of extraterrestrial origin and contained an asymmetry molecule',
          'It had within it sixteen amino acids which are rare to find on Earth',
          'It was made entirely of carbon compounds that could not be analyzed'
        ],
        correctAnswer: 2
      },
      {
        id: 10,
        question: 'What is mainly discussed in the last paragraph?',
        options: [
          'The amino acids and organic molecules on Earth',
          'The environment of planet Earth through the space',
          'How Earth was formed because of the amino acids and organic molecules from the space',
          'The composition of the Murchison meteorite and the chemistry of the solar system'
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 2,
    title: 'The Extinction of Dinosaurs',
    text: `Paleontologists have argued for a long time that the demise of the dinosaurs was caused by climatic alterations associated with slow changes in the positions of continents and seas resulting from plate tectonics. Off and on throughout the Cretaceous (the last period of the Mesozoic era, during which dinosaurs flourished), large shallow seas covered extensive areas of the continents. Data from diverse sources, including geochemical evidence preserved in seafloor sediments, indicate that the Late Cretaceous climate was milder than today. The days were not too hot, nor the nights too cold. The summers were not too warm, nor the winters too frigid. The shallow seas on the continents probably buffered the temperature of the nearby air, keeping it relatively constant.

At the end of the Cretaceous, the geological record shows that these seaways retreated from the continents back into the major ocean basins. No one knows why. Over a period of about 100,000 years, while the seas pulled back, climates around the world became dramatically more extreme: warmer days, cooler nights; hotter summers, colder winters. Perhaps dinosaurs could not tolerate these extreme temperature changes and became extinct.

If true, though, why did cold-blooded animals such as snakes, lizards, turtles, and crocodiles survive the freezing winters and torrid summers? These animals are at the mercy of the climate to maintain a livable body temperature. It's hard to understand why they would not be affected, whereas dinosaurs were left too crippled to cope, especially if, as some scientists believe, dinosaurs were warm-blooded. Critics also point out that the shallow seaways had retreated from and advanced on the continents numerous times during the Mesozoic, so why did the dinosaurs survive the climatic changes associated with the earlier fluctuations but not with this one? Although initially appealing, the hypothesis of a simple climatic change related to sea levels is insufficient to explain all the data.

Dissatisfaction with conventional explanations for dinosaur extinctions led to a surprising observation that, in turn, has suggested a new hypothesis. Many plants and animals disappear abruptly from the fossil record as one moves from layers of rock documenting the end of the Cretaceous up into rocks representing the beginning of the Cenozoic (the era after the Mesozoic). Between the last layer of Cretaceous rock and the first layer of Cenozoic rock, there is often a thin layer of clay. Scientists felt that they could get an idea of how long the extinctions took by determining how long it took to deposit this one centimeter of clay, and they thought they could determine the time it took to deposit the clay by determining the amount of the element iridium (Ir) it contained.

In view of these facts, scientists hypothesized that a single large asteroid, about 10 to 15 kilometers across, collided with Earth, and the resulting fallout created the boundary clay. Their calculations show that the impact kicked up a dust cloud that cut off sunlight for several months, inhibiting photosynthesis in plants; decreased surface temperatures on continents to below freezing; caused extreme episodes of acid rain; and significantly raised long-term global temperatures through the greenhouse effect. This disruption of the food chain and climate would have eradicated the dinosaurs and other organisms in less than fifty years.`,
    questions: [
      {
        id: 11,
        question: 'What is the main topic of the passage?',
        options: [
          'The effect of climate changes in the Mesozoic era',
          'The history of dinosaurs',
          'Extinction of the dinosaurs',
          'Dinosaurs and their relation to the world\'s history'
        ],
        correctAnswer: 2
      },
      {
        id: 12,
        question: 'The word "demise" in paragraph 1 is closest in meaning to',
        options: [
          'Decease',
          'Existence',
          'Inception',
          'Progression'
        ],
        correctAnswer: 0
      },
      {
        id: 13,
        question: 'According to paragraph 1, which of the following is TRUE of the Late Cretaceous Climate?',
        options: [
          'The climate did not change dramatically',
          'The climate was very similar to today\'s climate',
          'Shallow seas on the continents caused frequent temperature changes',
          'Summers were very warm and winters were very cold'
        ],
        correctAnswer: 0
      },
      {
        id: 14,
        question: 'The word "extinct" in paragraph 2 is best replaced with',
        options: [
          'Alive',
          'Vanished',
          'Expired',
          'Departed'
        ],
        correctAnswer: 1
      },
      {
        id: 15,
        question: 'Why does the passage mention cold-blooded animals?',
        options: [
          'To argue that dinosaurs were cold-blooded animals',
          'To present the diversity of animals in the Mesozoic era',
          'To support the hypothesis that dinosaurs were also sensitive to climate changes',
          'To question the hypothesis about climate change and the demise of dinosaurs'
        ],
        correctAnswer: 3
      },
      {
        id: 16,
        question: 'The word "fluctuations" in paragraph 3 is closest in meaning to',
        options: [
          'Periods',
          'Variation',
          'Retreat',
          'Extreme'
        ],
        correctAnswer: 1
      },
      {
        id: 17,
        question: 'Which of the following statements is NOT true according to paragraph 4?',
        options: [
          'There was an abrupt extinction of many plants and animals at the end of the Mesozoic era',
          'Plants and animals from the Mesozoic era were unable to survive in the Cenozoic era',
          'The element iridium (Ir) held the key to determining the extinction period',
          'A thin layer of clay was found in between Cretaceous rock and Cenozoic rock'
        ],
        correctAnswer: 1
      },
      {
        id: 18,
        question: 'It can be inferred from paragraph 5 that',
        options: [
          'Some meteorites contain a high-concentration element',
          'It is expected to find iridium in the sea',
          'The Earth has had iridium ever since the beginning of its history',
          'It will take many years ahead to understand the element Iridium'
        ],
        correctAnswer: 0
      },
      {
        id: 19,
        question: 'What is mainly discussed in the last paragraph?',
        options: [
          'Climate change and how it affects organisms on the Earth',
          'The process of forming planets',
          'Another hypothesis about how dinosaurs became extinct',
          'The impact of a single asteroid on a planet'
        ],
        correctAnswer: 2
      },
      {
        id: 20,
        question: 'The word "eradicated" in the last paragraph is closest in meaning to',
        options: [
          'Mended',
          'Preserved',
          'Manufactured',
          'Exterminated'
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 3,
    title: 'The Origins of Theater',
    text: `In seeking to describe the origins of theater, one must rely primarily on speculation, since there is little concrete evidence on which to draw. The most widely accepted theory, championed by anthropologists in the late nineteenth and early twentieth century, envisions theater as emerging out of myth and ritual. The process perceived by these anthropologists may be summarized briefly.

During the early stages of its development, a society becomes aware of forces that appear to influence or control its food supply and well-being. Having little understanding of natural causes, it attributes both desirable and undesirable occurrences to supernatural or magical forces, and it searches for means to win the favor of these forces. Perceiving an apparent connection between certain actions performed by the group and the result it desires, the group repeats, refines, and formalizes those actions into fixed ceremonies, or rituals.

Stories (myths) may then grow up around a ritual. Frequently the myths include representatives of those supernatural forces that the rites celebrate or hope to influence. Performers may wear costumes and masks to represent the mythical characters or supernatural forces in the rituals or in accompanying celebrations. As people become more sophisticated, their conceptions of supernatural forces and causal relationships may change. As a result, they may abandon or modify some rites. But the myths that have grown up around the rites may continue as part of the group's oral tradition and may even come to be acted out under conditions divorced from these rites. When this occurs, the first step has been taken toward theater as an autonomous activity, and thereafter entertainment and aesthetic values may gradually replace the former mystical and socially efficacious concerns.

Although origin in ritual has long been the most popular, it is by no means the only theory about how the theater came into being. Storytelling has been proposed as one alternative. To enhance their listeners' enjoyment, storytellers continually make their stories more engaging and memorable. Under this theory, relating and listening to stories are seen as fundamental human pleasures. Thus, the recalling of an event (a hunt, battle, or other feat) is elaborated through the narrator's pantomime and impersonation and eventually through each role being assumed by a different person. A closely related theory sees theater as evolving out of dances that are primarily pantomimic, rhythmical or gymnastic, or from imitations of animal noises and sounds. Admiration for the performer's skill, virtuosity, and grace are seen as motivation for elaborating the activities into fully realized theatrical performances.`,
    questions: [
      {
        id: 21,
        question: 'What is the main topic of the passage?',
        options: [
          'The early stages of theater\'s development',
          'Theater and its impact on the history of art',
          'The origins of theater',
          'The myth and ritual of theater'
        ],
        correctAnswer: 2
      },
      {
        id: 22,
        question: 'The word "championed" in paragraph 1 is closest in meaning to',
        options: [
          'Supported',
          'Changed',
          'Created',
          'Debated'
        ],
        correctAnswer: 0
      },
      {
        id: 23,
        question: 'According to paragraph 1, which of the following is TRUE about the early stages of theater?',
        options: [
          'Anthropologists have the same idea since it has concrete evidence',
          'By understanding natural causes, early society can control the food supply',
          'Early society believed that supernatural forces influence their well-being',
          'Repeating certain actions was meant to distinguish one belief from another'
        ],
        correctAnswer: 2
      },
      {
        id: 24,
        question: 'The word "this" in paragraph 3 refers to',
        options: [
          'The separation of myths from rites',
          'The celebration of supernatural forces',
          'The divorce of ritual performers from the rest of society',
          'The acting out of rites'
        ],
        correctAnswer: 0
      },
      {
        id: 25,
        question: 'According to paragraph 2, what may cause societies to abandon rites?',
        options: [
          'Understanding that theater is a form of entertainment',
          'Changing the perception of supernatural and natural causes',
          'Finding a more sophisticated thing to replace myths',
          'Using costumes and masks change was not allowed in rituals'
        ],
        correctAnswer: 1
      },
      {
        id: 26,
        question: 'The word "enhance" in paragraph 4 is closest in meaning to',
        options: [
          'Impaired',
          'Improve',
          'Spoiled',
          'Moderate'
        ],
        correctAnswer: 1
      },
      {
        id: 27,
        question: 'It can be inferred from paragraph 4 that',
        options: [
          'Pantomimic was the fundamental skill that one should have',
          'It is expected for someone to tell their stories in a more engaging and memorable way',
          'Imitating animal noises and sounds is needed to recall a battle story',
          'Relating to others\' stories is the power that drives people to enhance their performing skills'
        ],
        correctAnswer: 1
      },
      {
        id: 28,
        question: 'What is another theory about the origin of theater mentioned in the passage?',
        options: [
          'Theater evolved from ancient sports competitions',
          'Theater emerged from religious ceremonies only',
          'Theater developed from storytelling and dance performances',
          'Theater was created by royal courts for entertainment'
        ],
        correctAnswer: 2
      },
      {
        id: 29,
        question: 'Why do storytellers make their stories more engaging according to the passage?',
        options: [
          'To preserve historical accuracy',
          'To enhance their listeners\' enjoyment',
          'To compete with other storytellers',
          'To teach moral lessons'
        ],
        correctAnswer: 1
      },
      {
        id: 30,
        question: 'What motivates the elaboration of activities into theatrical performances?',
        options: [
          'Religious requirements',
          'Government mandates',
          'Admiration for the performer\'s skill and grace',
          'Economic incentives'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 4,
    title: 'The Evolution of Photography',
    text: `Photography has undergone a remarkable transformation since its invention in the early nineteenth century. The first permanent photograph was created by Joseph Nicephore Niepce in 1826, using a camera obscura and a pewter plate coated with bitumen. However, it was Louis Daguerre who developed the first practical photographic process, the daguerreotype, in 1839. This process produced a single, unique image on a silvered copper plate.

The daguerreotype was revolutionary, but it had limitations. Each image was one-of-a-kind and could not be reproduced. This changed in 1841 when William Henry Fox Talbot invented the calotype process, which created a paper negative from which multiple positive prints could be made. This was the precursor to modern photographic film.

Throughout the nineteenth century, photographers experimented with various techniques to improve image quality and reduce exposure times. The invention of the wet collodion process in 1851 allowed for sharper images and shorter exposure times, but photographers had to prepare their plates immediately before use and develop them while still wet. This made photography a cumbersome process, especially for outdoor work.

The introduction of dry plate photography in the 1870s made photography much more convenient. Photographers no longer needed to carry portable darkrooms with them. This innovation paved the way for George Eastman's introduction of flexible roll film in 1884 and the Kodak camera in 1888. Eastman's slogan, "You press the button, we do the rest," brought photography to the masses.

The twentieth century saw further innovations, including color photography, instant photography pioneered by Polaroid, and eventually digital photography. Today, with smartphones equipped with high-quality cameras, photography has become an integral part of daily life for billions of people around the world.`,
    questions: [
      {
        id: 31,
        question: 'Who created the first permanent photograph?',
        options: [
          'Louis Daguerre',
          'William Henry Fox Talbot',
          'Joseph Nicephore Niepce',
          'George Eastman'
        ],
        correctAnswer: 2
      },
      {
        id: 32,
        question: 'What was a limitation of the daguerreotype process?',
        options: [
          'It produced blurry images',
          'Each image was unique and could not be reproduced',
          'It required extremely long exposure times',
          'It could only be used outdoors'
        ],
        correctAnswer: 1
      },
      {
        id: 33,
        question: 'The word "precursor" in paragraph 2 is closest in meaning to',
        options: [
          'Successor',
          'Competitor',
          'Forerunner',
          'Alternative'
        ],
        correctAnswer: 2
      },
      {
        id: 34,
        question: 'Why was the wet collodion process difficult for outdoor photography?',
        options: [
          'The equipment was too heavy',
          'Plates had to be prepared and developed immediately',
          'It only worked in bright sunlight',
          'The chemicals were dangerous'
        ],
        correctAnswer: 1
      },
      {
        id: 35,
        question: 'What made photography more accessible to the general public?',
        options: [
          'The daguerreotype process',
          'The wet collodion process',
          'The introduction of the Kodak camera',
          'The invention of color photography'
        ],
        correctAnswer: 2
      },
      {
        id: 36,
        question: 'The phrase "You press the button, we do the rest" suggests that',
        options: [
          'Photography required professional training',
          'The Kodak camera made photography simple for ordinary people',
          'Customers had no control over their photographs',
          'The process was fully automated'
        ],
        correctAnswer: 1
      },
      {
        id: 37,
        question: 'According to the passage, which innovation came first?',
        options: [
          'Digital photography',
          'Dry plate photography',
          'Color photography',
          'Instant photography'
        ],
        correctAnswer: 1
      },
      {
        id: 38,
        question: 'The word "cumbersome" in paragraph 3 is closest in meaning to',
        options: [
          'Efficient',
          'Awkward',
          'Simple',
          'Popular'
        ],
        correctAnswer: 1
      },
      {
        id: 39,
        question: 'What can be inferred about photography today from the passage?',
        options: [
          'Professional cameras are no longer needed',
          'Most photographs are taken with smartphones',
          'Film photography has completely disappeared',
          'Only trained photographers can take good pictures'
        ],
        correctAnswer: 1
      },
      {
        id: 40,
        question: 'What is the main idea of the passage?',
        options: [
          'The life of famous photographers',
          'The technical aspects of developing photographs',
          'The evolution of photography from its invention to the present day',
          'The business of photography equipment'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 5,
    title: 'Coral Reef Ecosystems',
    text: `Coral reefs are among the most diverse and productive ecosystems on Earth. Often called the "rainforests of the sea," they occupy less than one percent of the ocean floor yet support approximately 25 percent of all marine species. These underwater structures are built by colonies of tiny animals called coral polyps, which secrete calcium carbonate to form hard, protective skeletons.

Coral reefs thrive in warm, shallow, clear waters where sunlight can penetrate. This is essential because most reef-building corals have a symbiotic relationship with photosynthetic algae called zooxanthellae. These algae live within the coral tissues and provide the coral with nutrients produced through photosynthesis, while the coral provides the algae with a protected environment and compounds needed for photosynthesis. This mutually beneficial relationship is crucial for the survival of coral reefs.

However, coral reefs face numerous threats. Rising ocean temperatures due to climate change can cause coral bleaching, a phenomenon in which corals expel their zooxanthellae, turning white. Without these algae, corals lose their primary source of nutrition and become more susceptible to disease. Other threats include ocean acidification, which reduces the availability of carbonate ions needed for coral skeleton formation, pollution from coastal development, destructive fishing practices, and tourism-related damage.

Conservation efforts are underway worldwide to protect and restore coral reefs. These include establishing marine protected areas, developing coral nurseries to grow and transplant healthy corals, and researching more resilient coral species that can better withstand environmental stressors. Public education programs aim to reduce human impacts on these fragile ecosystems.

The importance of coral reefs extends beyond their ecological value. They provide food and income for millions of people through fishing and tourism, protect coastlines from storms and erosion, and are a source of new medicines. Scientists continue to study coral reefs to better understand these complex ecosystems and develop more effective conservation strategies.`,
    questions: [
      {
        id: 41,
        question: 'Why are coral reefs called "rainforests of the sea"?',
        options: [
          'They look similar to rainforests',
          'They are located near rainforests',
          'They are very diverse ecosystems',
          'They produce a lot of rain'
        ],
        correctAnswer: 2
      },
      {
        id: 42,
        question: 'What is the relationship between coral polyps and zooxanthellae?',
        options: [
          'Parasitic',
          'Competitive',
          'Symbiotic',
          'Predatory'
        ],
        correctAnswer: 2
      },
      {
        id: 43,
        question: 'Why do coral reefs need sunlight?',
        options: [
          'The coral polyps need sunlight to grow',
          'Sunlight helps form calcium carbonate',
          'The zooxanthellae need sunlight for photosynthesis',
          'Sunlight warms the water to the correct temperature'
        ],
        correctAnswer: 2
      },
      {
        id: 44,
        question: 'What happens during coral bleaching?',
        options: [
          'Corals become stronger',
          'Corals expel their zooxanthellae',
          'Corals grow faster',
          'Corals absorb more nutrients'
        ],
        correctAnswer: 1
      },
      {
        id: 45,
        question: 'The word "susceptible" in paragraph 3 is closest in meaning to',
        options: [
          'Resistant',
          'Vulnerable',
          'Immune',
          'Indifferent'
        ],
        correctAnswer: 1
      },
      {
        id: 46,
        question: 'How does ocean acidification affect coral reefs?',
        options: [
          'It increases water temperature',
          'It reduces the availability of carbonate ions',
          'It kills zooxanthellae directly',
          'It causes excessive coral growth'
        ],
        correctAnswer: 1
      },
      {
        id: 47,
        question: 'What conservation method involves growing new corals?',
        options: [
          'Marine protected areas',
          'Coral nurseries',
          'Public education programs',
          'Fishing restrictions'
        ],
        correctAnswer: 1
      },
      {
        id: 48,
        question: 'The word "resilient" in paragraph 4 is closest in meaning to',
        options: [
          'Fragile',
          'Adaptable',
          'Ancient',
          'Beautiful'
        ],
        correctAnswer: 1
      },
      {
        id: 49,
        question: 'According to the passage, what is an economic benefit of coral reefs?',
        options: [
          'They produce fresh water',
          'They generate electricity',
          'They provide income through fishing and tourism',
          'They create land for development'
        ],
        correctAnswer: 2
      },
      {
        id: 50,
        question: 'What is the main purpose of this passage?',
        options: [
          'To explain the biology of coral polyps',
          'To describe coral reefs and the threats they face',
          'To compare coral reefs to rainforests',
          'To list all marine species that live in coral reefs'
        ],
        correctAnswer: 1
      }
    ]
  }
];

// Score conversion table (raw score to scaled score)
export const scoreConversionTable = {
  listening: {
    // Raw score (correct out of 50) -> Scaled score (31-68)
    50: 68, 49: 67, 48: 66, 47: 65, 46: 64, 45: 63,
    44: 62, 43: 61, 42: 60, 41: 59, 40: 58, 39: 57,
    38: 56, 37: 55, 36: 54, 35: 53, 34: 52, 33: 51,
    32: 50, 31: 49, 30: 48, 29: 47, 28: 46, 27: 45,
    26: 44, 25: 43, 24: 42, 23: 41, 22: 40, 21: 39,
    20: 38, 19: 37, 18: 36, 17: 35, 16: 34, 15: 33,
    14: 32, 13: 31, 12: 30, 11: 29, 10: 28, 9: 27,
    8: 26, 7: 25, 6: 24, 5: 23, 4: 22, 3: 21, 2: 20, 1: 20, 0: 20
  },
  structure: {
    // Raw score (correct out of 40) -> Scaled score (31-68)
    40: 68, 39: 67, 38: 66, 37: 65, 36: 64, 35: 63,
    34: 62, 33: 61, 32: 60, 31: 59, 30: 58, 29: 57,
    28: 56, 27: 55, 26: 54, 25: 53, 24: 52, 23: 51,
    22: 50, 21: 49, 20: 48, 19: 47, 18: 46, 17: 45,
    16: 44, 15: 43, 14: 42, 13: 41, 12: 40, 11: 39,
    10: 38, 9: 37, 8: 36, 7: 35, 6: 34, 5: 33,
    4: 32, 3: 31, 2: 30, 1: 29, 0: 28
  },
  reading: {
    // Raw score (correct out of 50) -> Scaled score (31-67)
    50: 67, 49: 66, 48: 65, 47: 64, 46: 63, 45: 62,
    44: 61, 43: 60, 42: 59, 41: 58, 40: 57, 39: 56,
    38: 55, 37: 54, 36: 53, 35: 52, 34: 51, 33: 50,
    32: 49, 31: 48, 30: 47, 29: 46, 28: 45, 27: 44,
    26: 43, 25: 42, 24: 41, 23: 40, 22: 39, 21: 38,
    20: 37, 19: 36, 18: 35, 17: 34, 16: 33, 15: 32,
    14: 31, 13: 30, 12: 29, 11: 28, 10: 27, 9: 26,
    8: 25, 7: 24, 6: 23, 5: 22, 4: 21, 3: 20, 2: 20, 1: 20, 0: 20
  }
};

export function calculateScores(
  listeningCorrect: number,
  structureCorrect: number,
  readingCorrect: number
) {
  const listeningScaled = scoreConversionTable.listening[listeningCorrect] || 20;
  const structureScaled = scoreConversionTable.structure[structureCorrect] || 28;
  const readingScaled = scoreConversionTable.reading[readingCorrect] || 20;
  
  // Total score is the sum of all three section scores multiplied by 10/3
  const totalScore = Math.round((listeningScaled + structureScaled + readingScaled) * 10 / 3);
  
  return {
    listening: listeningScaled,
    structure: structureScaled,
    reading: readingScaled,
    total: totalScore
  };
}
