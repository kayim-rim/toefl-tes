// Script to update Package C audioScript with speaker prefixes
// This will modify the package-c.ts file to add "Man:", "Woman:", "Narrator:" prefixes

import { listening } from '../src/data/packages/package-c';

// Part A Questions (1-30) - Short conversations
const partAUpdates: Record<number, string> = {
  1: "Woman: I'm having trouble deciding which courses to take next semester. Man: Why not talk to your academic advisor? She helped me choose courses that fit my schedule perfectly. Narrator: What does the man suggest the woman do?",
  2: "Man: Did you hear that the university is building a new recreation center? Woman: Yes, and about time too! The current gym is always overcrowded. Narrator: What does the woman imply?",
  3: "Woman: I thought the biology exam was going to be impossible. Man: You're telling me! I studied all night and still wasn't prepared for half the questions. Narrator: What does the man mean?",
  4: "Man: I've been trying to reach Professor Williams all week, but she's never in her office. Woman: Didn't you know? She's at a conference in Boston until Friday. Narrator: What does the woman mean?",
  5: "Woman: Would you mind if I borrowed your notes from yesterday's lecture? Man: Not at all. But let me warn you – my handwriting is almost impossible to read. Narrator: What does the man imply?",
  6: "Man: I'm thinking about joining the debate team. Woman: That sounds perfect for you. You always have such strong opinions! Narrator: What does the woman mean?",
  7: "Woman: The library is closing early today for maintenance. Man: Oh no! I still need to return these books before the fine doubles tomorrow. Narrator: What will the man probably do?",
  8: "Man: I can't believe how much the cafeteria food has improved. Woman: You can say that again! I actually look forward to lunch now. Narrator: What does the woman mean?",
  9: "Woman: Did you finish reading the article for tomorrow's discussion? Man: I'm only halfway through. It's incredibly dense and hard to follow. Narrator: What does the man imply about the article?",
  10: "Man: I heard you got accepted into the study abroad program in Spain. Congratulations! Woman: Thanks! I'm nervous about the language barrier, but excited about the opportunity. Narrator: How does the woman feel about the program?",
  11: "Woman: The printer in the computer lab is broken again. Man: That makes three times this month. Maybe we should just get a new one. Narrator: What does the man imply?",
  12: "Man: I didn't see you at the football game on Saturday. Woman: I had planned to go, but my car broke down on the way there. Narrator: What happened to the woman?",
  13: "Woman: Are you going to the career workshop this afternoon? Man: I hadn't planned on it, but since you're going, I might as well tag along. Narrator: What does the man mean?",
  14: "Man: I've been working on this chemistry lab report for hours, but I just can't make sense of the data. Woman: Why don't you ask the teaching assistant? She explained similar problems in last week's review session. Narrator: What does the woman suggest?",
  15: "Woman: I'm thinking about changing my major to economics. Man: Really? I thought you loved psychology. What changed your mind? Narrator: What can be inferred about the woman?",
  16: "Man: The tickets for the spring concert sold out in less than an hour! Woman: I'm not surprised. The band is incredibly popular on campus. Narrator: What does the woman mean?",
  17: "Woman: I can't find my student ID card anywhere. I need it to check out books. Man: Have you checked the lost and found at the security office? Narrator: What does the man suggest?",
  18: "Man: Are you coming to the study group tonight? Woman: I'd like to, but I promised my roommate I'd help her move furniture. Narrator: What will the woman probably do tonight?",
  19: "Woman: Did you understand what Professor Chen meant by 'paradigm shift'? Man: I was confused too, so I looked it up after class. It basically means a fundamental change in approach. Narrator: What did the man do?",
  20: "Man: I heard the university is offering free guitar lessons this semester. Woman: That's great! I've always wanted to learn an instrument. Narrator: What does the woman imply?",
  21: "Woman: Why didn't you come to the environmental club meeting yesterday? Man: I completely forgot about it. Was anything important discussed? Narrator: What does the man mean?",
  22: "Man: Do you think Professor Martinez will extend the deadline for the research paper? Woman: Based on past experience, I wouldn't count on it. Narrator: What does the woman imply?",
  23: "Woman: I'm really impressed with your presentation today. Man: Thanks! I was so nervous beforehand that I almost didn't show up. Narrator: What does the man mean?",
  24: "Man: The coffee shop on campus is having a half-price sale this week. Woman: That explains why there's such a long line every morning! Narrator: What does the woman mean?",
  25: "Woman: I just found out I got the summer internship at the museum! Man: That's fantastic! All your hard work applying has finally paid off. Narrator: What does the man mean?",
  26: "Man: Have you started studying for finals yet? Woman: Not really. I'm still trying to catch up on all the reading I missed during the semester. Narrator: What is the woman's current situation?",
  27: "Woman: I can't decide between taking statistics or calculus next semester. Man: If you're planning to go to graduate school in psychology, statistics would be more useful. Narrator: What does the man imply?",
  28: "Man: Did you hear that the campus bookstore is closing permanently next month? Woman: Yes, it's unfortunate. But the online textbooks are much cheaper anyway. Narrator: What does the woman mean?",
  29: "Woman: The new policy requires students to park in the remote lot and take a shuttle. Man: That's going to add at least twenty minutes to my commute. Narrator: What does the man imply?",
  30: "Man: I'm thinking of dropping my physics class. Woman: Before you do, why not talk to the professor? Maybe you can get some extra help. Narrator: What does the woman suggest?",
};

// Part B Questions (31-38) - Longer conversations
// Full conversation script for questions 31-34
const partBConversation1 = `Narrator: Listen to a conversation between a student and an academic advisor. Student: I'm thinking about changing my major from business to environmental science. Advisor: That's a significant change. What's driving this decision? Student: I took an environmental studies elective last semester and found it fascinating. I've realized that I want to work on climate change issues, not sit in an office all day. Advisor: That's a great reason. Have you looked at the requirements for environmental science? You'll need additional biology, chemistry, and math courses. Student: I have. It will probably take me an extra semester to graduate, but I think it's worth it. Advisor: That's realistic. Let me help you plan out your courses so you can transition smoothly. Also, there are several environmental internships available this summer that could give you experience in the field. Student: That sounds perfect. I'd love to get some hands-on experience.`;

const partBUpdates: Record<number, string> = {
  31: `${partBConversation1} Narrator: Why does the student want to change majors?`,
  32: `Narrator: What does the advisor say the student will need?`,
  33: `Narrator: How long will it take the student to graduate after changing majors?`,
  34: `Narrator: What does the advisor offer to help the student find?`,
};

// Full conversation script for questions 35-38
const partBConversation2 = `Narrator: Listen to a conversation between a professor and a student about a research project. Professor: So, you want to study bee populations for your senior thesis? Student: Yes, Professor. I've been reading about colony collapse disorder, and I'd like to investigate how pesticide use affects local bee populations. Professor: That's an important topic. Have you thought about your methodology? You'll need access to several apiaries and permission from local farmers. Student: I've already contacted three beekeepers who are willing to let me study their hives. I'm also planning to survey farmers about their pesticide use. Professor: Excellent preparation. You'll need to submit your proposal to the ethics committee before you can begin data collection. Student: I've drafted the proposal. Would you be willing to review it before I submit it? Professor: Of course. Bring it to my office hours on Thursday, and we'll go over it together.`;

const partBUpdates2: Record<number, string> = {
  35: `${partBConversation2} Narrator: What is the main topic of the conversation?`,
  36: `Narrator: What has the student already done for the research?`,
  37: `Narrator: What does the professor say the student needs to do before collecting data?`,
  38: `Narrator: When will the professor review the student's proposal?`,
};

// Part C Questions (39-50) - Academic talks
// Full talk script for questions 39-42
const partCTalk1 = `Narrator: Listen to a lecture about the history of chocolate. Professor: Chocolate has a fascinating history that spans thousands of years. The story begins in Mesoamerica, where the ancient Olmec civilization first cultivated the cacao tree around 1500 BCE. The Olmecs were followed by the Maya, who developed a bitter, spicy drink made from ground cacao beans, water, and chili peppers. This drink was called 'xocolatl,' which means 'bitter water.' The Aztecs later adopted cacao and considered it a gift from the gods. Cacao beans became so valuable that they were used as currency. When Spanish conquistadors arrived in the 16th century, they brought cacao back to Europe. However, Europeans found the bitter drink unappealing until they added sugar and milk. By the 19th century, technological advances made it possible to produce solid chocolate. In 1847, the first chocolate bar was created in England. Today, chocolate is a billion-dollar industry, with the average person consuming about 3 kilograms per year. Interestingly, recent research suggests that dark chocolate, consumed in moderation, may have health benefits due to its antioxidant content.`;

const partCUpdates1: Record<number, string> = {
  39: `${partCTalk1} Narrator: Where did the cultivation of cacao first begin?`,
  40: `Narrator: What does the speaker say about the Aztecs and cacao?`,
  41: `Narrator: How did Europeans change the chocolate drink?`,
  42: `Narrator: According to the lecture, what potential benefit does dark chocolate have?`,
};

// Full talk script for questions 43-46
const partCTalk2 = `Narrator: Listen to a lecture about volcanoes. Professor: Volcanoes are one of Earth's most dramatic natural phenomena. They form primarily at the boundaries of tectonic plates, where molten rock called magma rises to the surface. There are three main types of volcanoes: shield volcanoes, stratovolcanoes, and cinder cones. Shield volcanoes, like those in Hawaii, have broad, gently sloping sides formed by flowing lava. Stratovolcanoes, also called composite volcanoes, have steep sides and are built from alternating layers of lava and ash. Famous examples include Mount Fuji in Japan and Mount St. Helens in the United States. Cinder cones are the smallest type, formed from volcanic debris. Volcanic eruptions can be devastating, but they also bring benefits. Volcanic soil is extremely fertile, which is why many people live near active volcanoes despite the risks. Additionally, volcanic activity creates geothermal energy, a renewable power source. Scientists monitor active volcanoes closely to predict eruptions and protect nearby populations.`;

const partCUpdates2: Record<number, string> = {
  43: `${partCTalk2} Narrator: What is the main topic of the lecture?`,
  44: `Narrator: Which type of volcano has broad, gently sloping sides?`,
  45: `Narrator: What benefit of volcanic activity does the professor mention?`,
  46: `Narrator: Why do scientists monitor active volcanoes?`,
};

// Full talk script for questions 47-50
const partCTalk3 = `Narrator: Listen to a lecture about the invention of the printing press. Professor: The invention of the printing press in the 15th century revolutionized human communication. Before this invention, books were hand-copied by monks and scribes, making them extremely expensive and rare. Only the wealthiest individuals and institutions could afford to own books. Around 1440, Johannes Gutenberg, a German goldsmith, developed a printing press that used movable metal type. This invention allowed books to be produced quickly and cheaply. Gutenberg's famous Bible, completed around 1455, was the first major book printed in Europe using this technology. The impact of the printing press was enormous. Literacy rates increased dramatically as books became more affordable. Ideas could spread rapidly across Europe, leading to the Renaissance, the Protestant Reformation, and the Scientific Revolution. The printing press is often considered one of the most important inventions in human history, laying the foundation for the information age we live in today.`;

const partCUpdates3: Record<number, string> = {
  47: `${partCTalk3} Narrator: What problem did the printing press solve?`,
  48: `Narrator: What was Gutenberg's profession before inventing the printing press?`,
  49: `Narrator: According to the lecture, what was the first major book printed in Europe?`,
  50: `Narrator: What effect did the printing press have on society?`,
};

// Combine all updates
const allUpdates = {
  ...partAUpdates,
  ...partBUpdates,
  ...partBUpdates2,
  ...partCUpdates1,
  ...partCUpdates2,
  ...partCUpdates3,
};

// Print the updated audioScript for each question
console.log('// Updated audioScript values for Package C');
console.log('// Format: questionId -> audioScript with speaker prefixes\n');

Object.entries(allUpdates).forEach(([id, audioScript]) => {
  console.log(`Question ${id}:`);
  console.log(`  "${audioScript.substring(0, 100)}..."`);
  console.log('');
});

console.log('\nTotal questions to update:', Object.keys(allUpdates).length);
