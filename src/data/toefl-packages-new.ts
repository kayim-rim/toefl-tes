// TOEFL ITP Question Packages - Based on Official TOEFL ITP Standards
// Each package contains 140 questions (50 Listening, 40 Structure, 50 Reading)
// Questions are modeled after actual TOEFL ITP practice tests

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
// PAKET A - Questions Based on Official TOEFL ITP Standards
// =============================================

const packageAListening: ListeningQuestion[] = [
  // ==========================================
  // PART A - Short Conversations (30 questions)
  // Format: Short dialogue between two speakers, followed by a question
  // ==========================================
  { 
    id: 1, 
    part: 'A', 
    conversation: 'Man: Have you seen my calculator? It was right here a minute ago.\nWoman: Did you look under your book? I\'m always losing things that way.',
    question: 'What does the woman imply?', 
    options: [
      'The man should check under his book.',
      'She has seen the calculator.',
      'The man never loses things.',
      'She borrowed the calculator.'
    ], 
    correctAnswer: 0, 
    audioScript: 'Have you seen my calculator? It was right here a minute ago. Did you look under your book? I\'m always losing things that way. What does the woman imply?' 
  },
  { 
    id: 2, 
    part: 'A', 
    conversation: 'Woman: I really want to take astronomy, but my course load this spring is too heavy already.\nMan: The summer session might be a good idea, since you\'ll be working on campus anyway.',
    question: 'What does the man suggest the woman do?', 
    options: [
      'Drop one of her spring courses.',
      'Take astronomy during the summer.',
      'Find a different course to take.',
      'Reduce her work hours on campus.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I really want to take astronomy, but my course load this spring is too heavy already. The summer session might be a good idea, since you\'ll be working on campus anyway. What does the man suggest the woman do?' 
  },
  { 
    id: 3, 
    part: 'A', 
    conversation: 'Man: Professor Clark, I\'d like to repeat the experiment from last class. Is there a possibility I could use the lab over the weekend?\nWoman: It\'ll be locked, but you can get the key from the security office. Make sure you return it when you\'re finished.',
    question: 'What does the woman imply about the man?', 
    options: [
      'He cannot use the lab on weekends.',
      'He needs permission from the security office.',
      'He can access the lab with a key.',
      'He must wait until Monday to use the lab.'
    ], 
    correctAnswer: 2, 
    audioScript: 'Professor Clark, I\'d like to repeat the experiment from last class. Is there a possibility I could use the lab over the weekend? It\'ll be locked, but you can get the key from the security office. Make sure you return it when you\'re finished. What does the woman imply about the man?' 
  },
  { 
    id: 4, 
    part: 'A', 
    conversation: 'Woman: I really like your sweatshirt! I don\'t think I\'ve ever seen a design like that before.\nMan: Yeah, it\'s pretty cool, isn\'t it? My parents were in Japan last year and brought it back for me.',
    question: 'What does the man mean?', 
    options: [
      'He designed the sweatshirt himself.',
      'He bought the sweatshirt in Japan.',
      'The sweatshirt was a gift from his parents.',
      'He doesn\'t like the design very much.'
    ], 
    correctAnswer: 2, 
    audioScript: 'I really like your sweatshirt! I don\'t think I\'ve ever seen a design like that before. Yeah, it\'s pretty cool, isn\'t it? My parents were in Japan last year and brought it back for me. What does the man mean?' 
  },
  { 
    id: 5, 
    part: 'A', 
    conversation: 'Man: Are you free tonight? I\'m meeting a few friends at the restaurant on Main Street.\nWoman: Oh, I\'d love to. But I already have dinner plans for tonight. Another time perhaps.',
    question: 'What does the woman mean?', 
    options: [
      'She will meet the man tonight.',
      'She has other plans for dinner.',
      'She doesn\'t like the restaurant.',
      'She prefers to eat alone tonight.'
    ], 
    correctAnswer: 1, 
    audioScript: 'Are you free tonight? I\'m meeting a few friends at the restaurant on Main Street. Oh, I\'d love to. But I already have dinner plans for tonight. Another time perhaps. What does the woman mean?' 
  },
  { 
    id: 6, 
    part: 'A', 
    conversation: 'Woman: I just registered for the research conference—the deadline is tomorrow. It doesn\'t take long though—you simply go to the conference Web site.\nMan: I guess I\'d better do that today, huh? I have a little time before I teach my next class.',
    question: 'What can be inferred about the man?', 
    options: [
      'He has already registered for the conference.',
      'He plans to register for the conference today.',
      'He does not want to attend the conference.',
      'He missed the registration deadline.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I just registered for the research conference—the deadline is tomorrow. It doesn\'t take long though—you simply go to the conference Web site. I guess I\'d better do that today, huh? I have a little time before I teach my next class. What can be inferred about the man?' 
  },
  { 
    id: 7, 
    part: 'A', 
    conversation: 'Man: That\'s a great bike! Where\'d you get it?\nWoman: You know that sporting goods store on Harrison Street—they\'ve been running tremendous sales all summer!',
    question: 'What does the woman imply?', 
    options: [
      'The bike was a gift.',
      'She bought the bike on sale.',
      'The bike is not for sale.',
      'She doesn\'t remember where she got it.'
    ], 
    correctAnswer: 1, 
    audioScript: 'That\'s a great bike! Where\'d you get it? You know that sporting goods store on Harrison Street—they\'ve been running tremendous sales all summer! What does the woman imply?' 
  },
  { 
    id: 8, 
    part: 'A', 
    conversation: 'Man: So, how much was your plane ticket?\nWoman: More than I could really afford—I had to dip into my savings.',
    question: 'What does the woman imply?', 
    options: [
      'The ticket was inexpensive.',
      'She regretted buying the ticket.',
      'The ticket cost more than expected.',
      'She used her savings to pay for the ticket.'
    ], 
    correctAnswer: 3, 
    audioScript: 'So, how much was your plane ticket? More than I could really afford—I had to dip into my savings. What does the woman imply?' 
  },
  { 
    id: 9, 
    part: 'A', 
    conversation: 'Man: Professor Jones, we had a power failure in my dorm last night, so I wasn\'t able to finish my paper. Could I hand it in tomorrow?\nWoman: I understand that things sometimes do come up, but I don\'t make any exceptions. I made that clear in the first class… and the library was open till midnight…',
    question: 'What does the professor mean?', 
    options: [
      'The student can submit the paper tomorrow.',
      'The student must submit the paper today.',
      'The library was closed last night.',
      'Power failures are common in the dorm.'
    ], 
    correctAnswer: 1, 
    audioScript: 'Professor Jones, we had a power failure in my dorm last night, so I wasn\'t able to finish my paper. Could I hand it in tomorrow? I understand that things sometimes do come up, but I don\'t make any exceptions. I made that clear in the first class… and the library was open till midnight… What does the professor mean?' 
  },
  { 
    id: 10, 
    part: 'A', 
    conversation: 'Woman: I\'m thinking of moving off-campus next semester, but since I don\'t have a car, I\'d need to stay pretty close by. Any suggestions?\nMan: It just so happens the people who live downstairs from me are moving next month, so their apartment might be available, and it\'s only a block away from the university. If you\'re interested, I\'ll look into it for you.',
    question: 'What can be inferred about the man?', 
    options: [
      'He is planning to move next month.',
      'He lives near the university.',
      'He doesn\'t want the woman as a neighbor.',
      'He owns the apartment building.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I\'m thinking of moving off-campus next semester, but since I don\'t have a car, I\'d need to stay pretty close by. Any suggestions? It just so happens the people who live downstairs from me are moving next month, so their apartment might be available, and it\'s only a block away from the university. If you\'re interested, I\'ll look into it for you. What can be inferred about the man?' 
  },
  { 
    id: 11, 
    part: 'A', 
    conversation: 'Man: What an awful movie! A total waste of time!\nWoman: You can say that again!',
    question: 'What does the woman mean?', 
    options: [
      'She enjoyed the movie.',
      'She agrees with the man.',
      'She wants the man to repeat himself.',
      'She thinks the man is being too critical.'
    ], 
    correctAnswer: 1, 
    audioScript: 'What an awful movie! A total waste of time! You can say that again! What does the woman mean?' 
  },
  { 
    id: 12, 
    part: 'A', 
    conversation: 'Woman: I hear your sister got into a prestigious university. I bet she was checking her mail every day for her acceptance letter.\nMan: Yes, she was a little nervous until she found out last week.',
    question: 'What does the man imply about his sister?', 
    options: [
      'She was confident about getting accepted.',
      'She was anxious before receiving the letter.',
      'She didn\'t want to go to the university.',
      'She checked her email instead of regular mail.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I hear your sister got into a prestigious university. I bet she was checking her mail every day for her acceptance letter. Yes, she was a little nervous until she found out last week. What does the man imply about his sister?' 
  },
  { 
    id: 13, 
    part: 'A', 
    conversation: 'Man: I\'m really sorry I\'m late for the meeting. My car wouldn\'t start, and I had to take the bus.\nWoman: That\'s okay. We\'re still waiting for Mark.',
    question: 'What does the woman imply?', 
    options: [
      'The man should apologize to Mark.',
      'The meeting hasn\'t started yet.',
      'Mark is always late for meetings.',
      'The bus is unreliable.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I\'m really sorry I\'m late for the meeting. My car wouldn\'t start, and I had to take the bus. That\'s okay. We\'re still waiting for Mark. What does the woman imply?' 
  },
  { 
    id: 14, 
    part: 'A', 
    conversation: 'Woman: Wow, you seem to be in a really good mood today. What\'s the secret?\nMan: Dunno. I guess some mornings you wake up feeling great, and some mornings you don\'t.',
    question: 'What does the man mean?', 
    options: [
      'He has a specific reason for being happy.',
      'He doesn\'t know why he feels good.',
      'He always feels great in the morning.',
      'He had a good breakfast today.'
    ], 
    correctAnswer: 1, 
    audioScript: 'Wow, you seem to be in a really good mood today. What\'s the secret? Dunno. I guess some mornings you wake up feeling great, and some mornings you don\'t. What does the man mean?' 
  },
  { 
    id: 15, 
    part: 'A', 
    conversation: 'Man: I\'d think twice about taking a history class next year. There\'s not a single good professor in the whole history department.\nWoman: Look. That\'s what you said last semester about the sociology department. And I\'m very glad I didn\'t pay any attention to what you said.',
    question: 'What does the woman mean?', 
    options: [
      'She agrees with the man\'s opinion.',
      'She thinks the man is often wrong.',
      'She enjoyed her sociology class.',
      'She plans to take a history class anyway.'
    ], 
    correctAnswer: 2, 
    audioScript: 'I\'d think twice about taking a history class next year. There\'s not a single good professor in the whole history department. Look. That\'s what you said last semester about the sociology department. And I\'m very glad I didn\'t pay any attention to what you said. What does the woman mean?' 
  },
  { 
    id: 16, 
    part: 'A', 
    conversation: 'Woman: I know we\'re supposed to meet at five in the library, but something came up unexpectedly. Would you mind changing it to six?\nMan: Not at all. My schedule\'s very flexible.',
    question: 'What does the man mean?', 
    options: [
      'He cannot meet at six.',
      'He agrees to the time change.',
      'He prefers to meet at five.',
      'He will be late for the meeting.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I know we\'re supposed to meet at five in the library, but something came up unexpectedly. Would you mind changing it to six? Not at all. My schedule\'s very flexible. What does the man mean?' 
  },
  { 
    id: 17, 
    part: 'A', 
    conversation: 'Woman: Can you believe it? A 20-page term paper and a final exam. What does Professor Johnson think? That we don\'t have any classes but his?\nMan: Wait a second. I\'m sure he said it was either one or the other.',
    question: 'What does the man imply?', 
    options: [
      'The woman misunderstood the professor.',
      'The professor is being unreasonable.',
      'The term paper is optional.',
      'The class is easy.'
    ], 
    correctAnswer: 0, 
    audioScript: 'Can you believe it? A 20-page term paper and a final exam. What does Professor Johnson think? That we don\'t have any classes but his? Wait a second. I\'m sure he said it was either one or the other. What does the man imply?' 
  },
  { 
    id: 18, 
    part: 'A', 
    conversation: 'Woman: I\'m really happy I got that athletic scholarship, but I\'m embarrassed by the big fuss all my friends are making.\nMan: Well it is quite an accomplishment. Of course your friends are happy for you!',
    question: 'What does the man mean?', 
    options: [
      'The woman should be embarrassed.',
      'The scholarship is not a big deal.',
      'The woman\'s friends are overreacting.',
      'The woman deserves the recognition.'
    ], 
    correctAnswer: 3, 
    audioScript: 'I\'m really happy I got that athletic scholarship, but I\'m embarrassed by the big fuss all my friends are making. Well it is quite an accomplishment. Of course your friends are happy for you! What does the man mean?' 
  },
  { 
    id: 19, 
    part: 'A', 
    conversation: 'Man: My computer screen is flashing… and I can\'t get it to stop.\nWoman: Oh, a similar thing happened to me the other day. I\'ll bet together we can figure out what to do.',
    question: 'What will the woman probably do next?', 
    options: [
      'Call a computer technician.',
      'Help the man with his computer.',
      'Tell the man to restart his computer.',
      'Lend her computer to the man.'
    ], 
    correctAnswer: 1, 
    audioScript: 'My computer screen is flashing… and I can\'t get it to stop. Oh, a similar thing happened to me the other day. I\'ll bet together we can figure out what to do. What will the woman probably do next?' 
  },
  { 
    id: 20, 
    part: 'A', 
    conversation: 'Woman: There\'s quite a crowd at the health center today. I\'m surprised so many people are interested in getting a free blood pressure test.\nMan: Come to think of it, I haven\'t had mine checked in a while. Guess I\'ll go get in line…',
    question: 'What does the man mean?', 
    options: [
      'He already had his blood pressure checked.',
      'He doesn\'t want to wait in line.',
      'He plans to get his blood pressure tested.',
      'He thinks the crowd is too large.'
    ], 
    correctAnswer: 2, 
    audioScript: 'There\'s quite a crowd at the health center today. I\'m surprised so many people are interested in getting a free blood pressure test. Come to think of it, I haven\'t had mine checked in a while. Guess I\'ll go get in line… What does the man mean?' 
  },
  { 
    id: 21, 
    part: 'A', 
    conversation: 'Man: I can\'t believe I actually graduated and I\'m leaving tonight. I enjoyed studying with you this semester.\nWoman: Same here. And hey—don\'t forget to drop me a line once in a while. Let me know how the new job goes.',
    question: 'What does the woman mean?', 
    options: [
      'She wants the man to write to her.',
      'She is graduating tonight too.',
      'She helped the man find a job.',
      'She doesn\'t want the man to leave.'
    ], 
    correctAnswer: 0, 
    audioScript: 'I can\'t believe I actually graduated and I\'m leaving tonight. I enjoyed studying with you this semester. Same here. And hey—don\'t forget to drop me a line once in a while. Let me know how the new job goes. What does the woman mean?' 
  },
  { 
    id: 22, 
    part: 'A', 
    conversation: 'Man: Look at the fancy pen I just found under this bench. It looks expensive.\nWoman: Oh. So THAT\'s where it went!',
    question: 'What does the woman imply?', 
    options: [
      'She found a similar pen earlier.',
      'The pen belongs to her.',
      'The man should keep the pen.',
      'She knows who lost the pen.'
    ], 
    correctAnswer: 1, 
    audioScript: 'Look at the fancy pen I just found under this bench. It looks expensive. Oh. So THAT\'s where it went! What does the woman imply?' 
  },
  { 
    id: 23, 
    part: 'A', 
    conversation: 'Man: I don\'t know what I was thinking of when I gave you those directions.\nWoman: Oh, don\'t worry about it. I made it before the conference began. I didn\'t have to drive that much out of my way.',
    question: 'What can be inferred from this conversation?', 
    options: [
      'The woman got lost because of the man\'s directions.',
      'The woman arrived late to the conference.',
      'The man gave the woman incorrect directions.',
      'The woman did not follow the man\'s directions.'
    ], 
    correctAnswer: 2, 
    audioScript: 'I don\'t know what I was thinking of when I gave you those directions. Oh, don\'t worry about it. I made it before the conference began. I didn\'t have to drive that much out of my way. What can be inferred from this conversation?' 
  },
  { 
    id: 24, 
    part: 'A', 
    conversation: 'Man: Now that you\'ve had a chance to read our proposal to renovate the campus café, do you think the university will approve it?\nWoman: Actually, I\'ve been so busy, I haven\'t had a chance to look at it yet.',
    question: 'What does the woman mean?', 
    options: [
      'She has read the proposal.',
      'She supports the proposal.',
      'She hasn\'t read the proposal yet.',
      'She thinks the proposal will be approved.'
    ], 
    correctAnswer: 2, 
    audioScript: 'Now that you\'ve had a chance to read our proposal to renovate the campus café, do you think the university will approve it? Actually, I\'ve been so busy, I haven\'t had a chance to look at it yet. What does the woman mean?' 
  },
  { 
    id: 25, 
    part: 'A', 
    conversation: 'Man: Wow, I\'ve already taken one of those pills for my headache, but it\'s still bothering me.\nWoman: Well, why not take another? The recommended dose is one or two, depending on how bad it is.',
    question: 'What does the woman suggest the man do?', 
    options: [
      'See a doctor immediately.',
      'Take another pill.',
      'Wait for the headache to go away.',
      'Take fewer pills in the future.'
    ], 
    correctAnswer: 1, 
    audioScript: 'Wow, I\'ve already taken one of those pills for my headache, but it\'s still bothering me. Well, why not take another? The recommended dose is one or two, depending on how bad it is. What does the woman suggest the man do?' 
  },
  { 
    id: 26, 
    part: 'A', 
    conversation: 'Woman: What\'s Phil doing here? I thought he was taking the fall semester off.\nMan: Didn\'t you hear that his parents talked him out of it?',
    question: 'What does the man imply about Phil?', 
    options: [
      'Phil is taking the semester off.',
      'Phil\'s parents persuaded him to stay in school.',
      'Phil doesn\'t want to be here.',
      'Phil is graduating this semester.'
    ], 
    correctAnswer: 1, 
    audioScript: 'What\'s Phil doing here? I thought he was taking the fall semester off. Didn\'t you hear that his parents talked him out of it? What does the man imply about Phil?' 
  },
  { 
    id: 27, 
    part: 'A', 
    conversation: 'Man: A florist told me that if I want to keep flowers looking fresh, I should cut a bit off the stems before putting them in water. I wonder if it really works…\nWoman: Someone told me the same thing and the bouquet I had did last longer. Anyway, it can\'t hurt, can it?',
    question: 'What does the woman imply?', 
    options: [
      'Cutting the stems doesn\'t help flowers last longer.',
      'She has never tried cutting flower stems.',
      'The method might be worth trying.',
      'Florists give bad advice.'
    ], 
    correctAnswer: 2, 
    audioScript: 'A florist told me that if I want to keep flowers looking fresh, I should cut a bit off the stems before putting them in water. I wonder if it really works… Someone told me the same thing and the bouquet I had did last longer. Anyway, it can\'t hurt, can it? What does the woman imply?' 
  },
  { 
    id: 28, 
    part: 'A', 
    conversation: 'Woman: That was a fascinating lecture, but the questions from the audience afterward were mostly irrelevant to the topic!\nMan: Yes, I totally agree. I would\'ve preferred less of that and more of the speaker.',
    question: 'What does the man imply?', 
    options: [
      'He enjoyed the audience questions.',
      'He wanted to hear more from the speaker.',
      'The lecture was too short.',
      'He didn\'t understand the topic.'
    ], 
    correctAnswer: 1, 
    audioScript: 'That was a fascinating lecture, but the questions from the audience afterward were mostly irrelevant to the topic! Yes, I totally agree. I would\'ve preferred less of that and more of the speaker. What does the man imply?' 
  },
  { 
    id: 29, 
    part: 'A', 
    conversation: 'Woman: I just found out my dentist retired last month. Do you have one you\'d recommend?\nMan: Yeah. In fact, I have a checkup there next week. Say, I\'ve even got his card with me, if you want to wait a minute while I get it out.',
    question: 'What does the man mean?', 
    options: [
      'He doesn\'t have a dentist.',
      'He can recommend his dentist.',
      'His dentist retired too.',
      'He doesn\'t like his current dentist.'
    ], 
    correctAnswer: 1, 
    audioScript: 'I just found out my dentist retired last month. Do you have one you\'d recommend? Yeah. In fact, I have a checkup there next week. Say, I\'ve even got his card with me, if you want to wait a minute while I get it out. What does the man mean?' 
  },
  { 
    id: 30, 
    part: 'A', 
    conversation: 'Man: Tomorrow I have my big presentation in anthropology class… I\'m really worried about speaking in front of the class.\nWoman: You always say that, and then you always do really well. You have nothing to worry about.',
    question: 'What does the woman imply?', 
    options: [
      'The man should skip the presentation.',
      'The man has presented many times before.',
      'The man is not prepared for the presentation.',
      'She will help the man practice.'
    ], 
    correctAnswer: 1, 
    audioScript: 'Tomorrow I have my big presentation in anthropology class… I\'m really worried about speaking in front of the class. You always say that, and then you always do really well. You have nothing to worry about. What does the woman imply?' 
  },

  // ==========================================
  // PART B - Longer Conversations (8 questions)
  // Two extended conversations, each followed by 4 questions
  // ==========================================
  { 
    id: 31, 
    part: 'B', 
    conversation: 'Narrator: Listen to a conversation between two students.\nMan: So how was the singing competition last weekend?\nWoman: You don\'t wanna know.\nMan: What d\'ya mean? Wasn\'t it near the beach?… That should\'ve been fun!\nWoman: It should\'ve been fun, but we only came in second place… not only that, but we weren\'t even really able to enjoy the beach either.\nMan: Hold on—you\'re upset about finishing second? How many singing groups competed?\nWoman: About 30. I know second place sounds okay, but that\'s three years in a row we\'ve been in second, and it\'s the same group that\'s beaten us three years in a row.\nMan: That\'s too bad… but what about the beach?… I ended up spending a lot of time studying in the library. I would have loved to be at the beach swimming in the ocean or playing beach volleyball instead of being stuck in the library studying.\nWoman: Well, it wasn\'t exactly like that. I had to spend some time studying, too. We really didn\'t have much free time. We were scheduled almost the whole time—practicing, performing, or watching the competition.',
    question: 'What are the students mainly discussing?', 
    options: [
      'The woman\'s weekend at a singing competition',
      'The man\'s studying habits',
      'A trip to the beach',
      'The rules of the singing competition'
    ], 
    correctAnswer: 0, 
    audioScript: 'Listen to a conversation between two students. So how was the singing competition last weekend? You don\'t wanna know. What d\'ya mean? Wasn\'t it near the beach?… That should\'ve been fun! It should\'ve been fun, but we only came in second place… not only that, but we weren\'t even really able to enjoy the beach either. What are the students mainly discussing?' 
  },
  { 
    id: 32, 
    part: 'B', 
    conversation: 'Same conversation as above',
    question: 'What does the woman say about the winners of the competition?', 
    options: [
      'They were from her school.',
      'They have won before.',
      'They were first-time competitors.',
      'They practiced more than her group.'
    ], 
    correctAnswer: 1, 
    audioScript: 'What does the woman say about the winners of the competition?' 
  },
  { 
    id: 33, 
    part: 'B', 
    conversation: 'Same conversation as above',
    question: 'How did the man spend his weekend?', 
    options: [
      'At the beach swimming.',
      'Playing beach volleyball.',
      'Studying in the library.',
      'Watching the competition.'
    ], 
    correctAnswer: 2, 
    audioScript: 'How did the man spend his weekend?' 
  },
  { 
    id: 34, 
    part: 'B', 
    conversation: 'Same conversation as above',
    question: 'What does the woman say about her weekend schedule?', 
    options: [
      'She had plenty of free time.',
      'She spent most of her time at the beach.',
      'She was busy with competition activities.',
      'She left the competition early.'
    ], 
    correctAnswer: 2, 
    audioScript: 'What does the woman say about her weekend schedule?' 
  },
  { 
    id: 35, 
    part: 'B', 
    conversation: 'Narrator: Listen to a conversation between a student and an art professor.\nWoman: Professor, I really like those sculptures by Brancusi. They have such simple, elegant lines.\nMan: Yes, they do.\nWoman: Were there any other sculptors doing work like that?\nMan: Well, yes, there was a sculptor named Isamu Noguchi. Noguchi actually worked in Brancusi\'s studio for a time, so Brancusi was one of several important influences on his work.\nWoman: Okay…\nMan: Noguchi was born in 1904, in California. His mother was an American writer, and his father was a Japanese poet… And during his childhood, Noguchi lived in Japan. And when his mother hired a carpenter to build a house there, Noguchi helped out, and in the process came to love working with wood and other natural materials.',
    question: 'What is the conversation mainly about?', 
    options: [
      'Brancusi\'s influence on modern sculpture',
      'The life and work of Isamu Noguchi',
      'The history of Japanese art',
      'How to become a sculptor'
    ], 
    correctAnswer: 1, 
    audioScript: 'Listen to a conversation between a student and an art professor. Professor, I really like those sculptures by Brancusi. They have such simple, elegant lines. Yes, they do. Were there any other sculptors doing work like that? Well, yes, there was a sculptor named Isamu Noguchi. Noguchi actually worked in Brancusi\'s studio for a time, so Brancusi was one of several important influences on his work. What is the conversation mainly about?' 
  },
  { 
    id: 36, 
    part: 'B', 
    conversation: 'Same conversation as above',
    question: 'What kind of work did Noguchi\'s father do?', 
    options: [
      'He was a carpenter.',
      'He was a poet.',
      'He was a sculptor.',
      'He was a writer.'
    ], 
    correctAnswer: 1, 
    audioScript: 'What kind of work did Noguchi\'s father do?' 
  },
  { 
    id: 37, 
    part: 'B', 
    conversation: 'Same conversation as above',
    question: 'According to the professor, what did Noguchi learn to do when he was a child in Japan?', 
    options: [
      'Write poetry in Japanese.',
      'Build traditional Japanese houses.',
      'Work with wood and natural materials.',
      'Sculpt marble and stone.'
    ], 
    correctAnswer: 2, 
    audioScript: 'According to the professor, what did Noguchi learn to do when he was a child in Japan?' 
  },
  { 
    id: 38, 
    part: 'B', 
    conversation: 'Same conversation as above',
    question: 'What can be inferred about Noguchi\'s relationship with Brancusi?', 
    options: [
      'They were related by marriage.',
      'Noguchi studied under Brancusi.',
      'They never met in person.',
      'They competed for the same commissions.'
    ], 
    correctAnswer: 1, 
    audioScript: 'What can be inferred about Noguchi\'s relationship with Brancusi?' 
  },

  // ==========================================
  // PART C - Talks/Lectures (12 questions)
  // Three academic talks, each followed by 3-4 questions
  // ==========================================
  { 
    id: 39, 
    part: 'C', 
    talk: 'Narrator: Listen to part of a lecture in a marketing class.\nMan: Senses play an important role in consumer decision-making. Shoppers like to… sniff a piece of fish… or listen to a stereo before buying it. But the power of touch was not fully understood by researchers until recently. Evidence is showing that consumers who\'re able to handle merchandise are more likely to buy it—and pay more for it.\nShoppers touch for various reasons. There\'s fact-finding touch, like turning a food container to read the list of ingredients; or picking an item up to assess its specific attributes, such as weight, texture, or temperature. There\'s also touch for its own sake… \'cause it feels nice to, say, run your fingers along a shiny table.\nPsychologically, touching an item fosters a sense of ownership, which makes it more difficult to resist buying it. So it makes sense when retailers display sweaters on shelves rather than in protective plastic bags.',
    question: 'What is the main purpose of the lecture?', 
    options: [
      'To explain how consumers make decisions',
      'To discuss the role of touch in shopping behavior',
      'To compare different types of consumer research',
      'To describe effective retail display techniques'
    ], 
    correctAnswer: 1, 
    audioScript: 'Listen to part of a lecture in a marketing class. Senses play an important role in consumer decision-making. Shoppers like to… sniff a piece of fish… or listen to a stereo before buying it. But the power of touch was not fully understood by researchers until recently. Evidence is showing that consumers who\'re able to handle merchandise are more likely to buy it—and pay more for it. What is the main purpose of the lecture?' 
  },
  { 
    id: 40, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'According to the professor, what psychological feeling do shoppers tend to have when they touch an item of merchandise?', 
    options: [
      'A sense of curiosity',
      'A feeling of ownership',
      'A need for comparison',
      'A desire for cleanliness'
    ], 
    correctAnswer: 1, 
    audioScript: 'According to the professor, what psychological feeling do shoppers tend to have when they touch an item of merchandise?' 
  },
  { 
    id: 41, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'Why does the professor mention sweaters on shelves?', 
    options: [
      'To give an example of expensive merchandise',
      'To explain why some stores have low sales',
      'To illustrate a point about encouraging touch',
      'To compare different types of fabric'
    ], 
    correctAnswer: 2, 
    audioScript: 'Why does the professor mention sweaters on shelves?' 
  },
  { 
    id: 42, 
    part: 'C', 
    talk: 'Narrator: Listen to a talk in a history class.\nWoman: Let me warn you against a mistake that historians often make—they sometimes assume that people in the past used the same concepts we do.\nThere\'s a wonderful example that made news in the history of mathematics a while ago. It concerns an ancient Mesopotamian tablet that had some calculations on it—sophisticated calculations that looked like measurements of triangles…so that\'s what many historians assumed they were. And if the Mesopotamians knew how to use these calculations—and historians started thinking that they did—that meant their math was incredibly advanced.\nWell, it turns out that the idea that Mesopotamians used sophisticated methods to calculate the measurements of triangles is probably wrong. Why do we think that? Because we discovered that Mesopotamians didn\'t know how to measure angles, which is a crucial element in the whole process of triangle calculations.',
    question: 'What is the main purpose of the talk?', 
    options: [
      'To explain how the Mesopotamians measured triangles',
      'To warn against making assumptions about the past',
      'To describe the history of mathematics',
      'To compare Mesopotamian and Greek mathematics'
    ], 
    correctAnswer: 1, 
    audioScript: 'Listen to a talk in a history class. Let me warn you against a mistake that historians often make—they sometimes assume that people in the past used the same concepts we do. What is the main purpose of the talk?' 
  },
  { 
    id: 43, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'What was on the Mesopotamian tablet mentioned in the talk?', 
    options: [
      'Triangle measurements',
      'Calculations of unknown purpose',
      'Instructions for measuring angles',
      'A warning to future historians'
    ], 
    correctAnswer: 1, 
    audioScript: 'What was on the Mesopotamian tablet mentioned in the talk?' 
  },
  { 
    id: 44, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'According to the professor, what had been assumed about the Mesopotamians?', 
    options: [
      'They invented the concept of zero.',
      'They learned mathematics from the Greeks.',
      'They could calculate triangle measurements.',
      'They were the first to use writing.'
    ], 
    correctAnswer: 2, 
    audioScript: 'According to the professor, what had been assumed about the Mesopotamians?' 
  },
  { 
    id: 45, 
    part: 'C', 
    talk: 'Narrator: Listen to a talk in a biology class.\nWoman: A really surprising discovery was made up in Canada recently… some fossilized animal footprints they found in some sandstone there. So, why\'s that exciting? Well, this sandstone is really old, and so the footprints are too—older, by about 40 million years they think, than any footprints ever found… of animals that walked on land. Since we believe that land animals originally emerged from the sea, well, this shows the move from sea to land happened way earlier than we thought—40 million years earlier—and that\'s a lot.\nAnd finding these fossils was sheer luck. There were these Canadian stonecutters cutting up sandstone to use as a building material, and apparently this stone with the fossil prints wasn\'t smooth enough to use. So the workers rejected it for building use, and the discarded stone lay there for years before anyone who could recognize its true importance… was lucky enough to lay eyes on it.',
    question: 'What is the talk mainly about?', 
    options: [
      'How fossils are formed in sandstone',
      'The discovery of ancient animal footprints',
      'Methods of dating fossils',
      'Canadian stonecutting techniques'
    ], 
    correctAnswer: 1, 
    audioScript: 'Listen to a talk in a biology class. A really surprising discovery was made up in Canada recently… some fossilized animal footprints they found in some sandstone there. What is the talk mainly about?' 
  },
  { 
    id: 46, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'According to the professor, what question does the discovery in Canada help answer?', 
    options: [
      'How did animals evolve from sea to land?',
      'When did animals first move from sea to land?',
      'Why did some animals return to the sea?',
      'What was the climate like 40 million years ago?'
    ], 
    correctAnswer: 1, 
    audioScript: 'According to the professor, what question does the discovery in Canada help answer?' 
  },
  { 
    id: 47, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'Why does the professor mention stonecutters?', 
    options: [
      'To explain how the fossils were discovered',
      'To criticize the destruction of fossils',
      'To describe Canadian building techniques',
      'To explain how sandstone is formed'
    ], 
    correctAnswer: 0, 
    audioScript: 'Why does the professor mention stonecutters?' 
  },
  { 
    id: 48, 
    part: 'C', 
    talk: 'Narrator: Listen to a lecture about sleep in a psychology class.\nMan: Sleep is essential for our health and well-being. When we don\'t get enough sleep, we accumulate what scientists call "sleep debt." This debt can have serious effects on our bodies and minds.\nSleep deprivation can lead to decreased attention, slower thinking, and poor memory. Studies show that driving while sleep-deprived can be as dangerous as driving under the influence of alcohol.\nCircadian rhythms are our body\'s natural sleep-wake cycle. When we disrupt this cycle, for example by staying up late or working night shifts, we can experience various health problems. Most adults need 7-9 hours of sleep per night, though individual needs vary.',
    question: 'What is the main topic of the lecture?', 
    options: [
      'How to improve sleep quality',
      'The effects of sleep deprivation',
      'The history of sleep research',
      'Different types of sleep disorders'
    ], 
    correctAnswer: 1, 
    audioScript: 'Listen to a lecture about sleep in a psychology class. Sleep is essential for our health and well-being. When we don\'t get enough sleep, we accumulate what scientists call "sleep debt." What is the main topic of the lecture?' 
  },
  { 
    id: 49, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'Why does the speaker mention driving?', 
    options: [
      'To illustrate the dangers of sleep deprivation',
      'To explain how to stay awake while driving',
      'To compare driving to other activities',
      'To recommend against night driving'
    ], 
    correctAnswer: 0, 
    audioScript: 'Why does the speaker mention driving?' 
  },
  { 
    id: 50, 
    part: 'C', 
    talk: 'Same talk as above',
    question: 'According to the lecture, what is a "circadian rhythm"?', 
    options: [
      'A type of sleep disorder',
      'A measurement of sleep quality',
      'The body\'s natural sleep-wake cycle',
      'A method for falling asleep faster'
    ], 
    correctAnswer: 2, 
    audioScript: 'According to the lecture, what is a "circadian rhythm"?' 
  }
];

// ==========================================
// SECTION 2: STRUCTURE AND WRITTEN EXPRESSION
// ==========================================

const packageAStructure: StructureQuestion[] = [
  // ==========================================
  // STRUCTURE (Questions 1-15)
  // Incomplete sentences - choose the word that best completes
  // ==========================================
  { id: 1, type: 'structure', sentence: 'Amanda Way\'s career as a social reformer ______ in 1851 when, at an antislavery meeting in Indiana, she called for a state woman\'s rights convention.', options: ['begin', 'began', 'have begun', 'to have begun'], correctAnswer: 1 },
  { id: 2, type: 'structure', sentence: 'The celesta, an orchestral percussion instrument, resembles ______.', options: ['a small upright piano', 'how a small upright piano', 'a small upright piano is', 'as a small upright piano'], correctAnswer: 0 },
  { id: 3, type: 'structure', sentence: 'Thomas Paine, _______, wrote Common Sense, a pamphlet that identified the American colonies with the cause of liberty.', options: ['writer of eloquent', 'whose eloquent writing', 'an eloquent writer', 'writing eloquent'], correctAnswer: 2 },
  { id: 4, type: 'structure', sentence: 'Although beavers rarely remain submerged for more than two minutes, they can stay underwater _______ fifteen minutes before having to surface for air.', options: ['as long', 'as long as', 'so long', 'so long that'], correctAnswer: 1 },
  { id: 5, type: 'structure', sentence: 'Protein digestion begins in the stomach _______ ends in the small intestine.', options: ['while', 'and', 'how', 'because'], correctAnswer: 1 },
  { id: 6, type: 'structure', sentence: 'When natural gas burns, its _______ into atoms of carbon and hydrogen.', options: ['hydrocarbon molecules, breaking up', 'broke up by hydrocarbon molecules', 'hydrocarbon molecules break up', 'broken up hydrocarbon molecules'], correctAnswer: 2 },
  { id: 7, type: 'structure', sentence: '_______ ballet dancers learn five basic positions for the arms and feet.', options: ['All of', 'Of every', 'All', 'Every'], correctAnswer: 2 },
  { id: 8, type: 'structure', sentence: 'Some colonies of bryozoans, small marine animals, form _______ with trailing stems.', options: ['creeping colonies', 'which colonies creep', 'creeping colonies are', 'colonies creep'], correctAnswer: 0 },
  { id: 9, type: 'structure', sentence: 'Ruth Bader Ginsburg argued six women\'s rights cases before the United States Supreme Court in the 1970\'s, _______.', options: ['of five winning them', 'five winning of them', 'of them five winning', 'winning five of them'], correctAnswer: 3 },
  { id: 10, type: 'structure', sentence: 'Natural selection is defined as the process _______ the course of evolution by preserving those traits best adapted for an organism\'s survival.', options: ['to which directs', 'of which directs it', 'directs it', 'that directs'], correctAnswer: 3 },
  { id: 11, type: 'structure', sentence: '_______ 363 miles between the cities of Albany and Buffalo in New York State, the Erie Canal helped link the Atlantic Ocean with the Great Lakes.', options: ['The extension of', 'The extension', 'Extending', 'Extends'], correctAnswer: 2 },
  { id: 12, type: 'structure', sentence: 'The chief sources of B12, a water-soluble vitamin _______ stored in the body, include meat, milk and eggs.', options: ['is not', 'that is not', 'not that is', 'that not'], correctAnswer: 1 },
  { id: 13, type: 'structure', sentence: '_______ is rooted in experiments in iron and steel conducted in the nineteenth century.', options: ['While the history of twentieth-century architecture', 'The history of twentieth-century architecture', 'That the history of twentieth-century architecture', 'Both twentieth-century architecture and its history'], correctAnswer: 1 },
  { id: 14, type: 'structure', sentence: 'The primary source of energy for tropical cyclones is the latent heat released when _______.', options: ['does water vapor condense', 'condensed water vapor', 'water vapor condenses', 'the condensation of water vapor'], correctAnswer: 2 },
  { id: 15, type: 'structure', sentence: 'Manufacturing is Canada\'s most important economic activity, _______ 17 percent of the workforce.', options: ['engages', 'and to engage', 'that it engage', 'engaging'], correctAnswer: 3 },

  // ==========================================
  // WRITTEN EXPRESSION (Questions 16-40)
  // Identify the error in underlined parts
  // ==========================================
  { id: 16, type: 'written', sentence: 'The outer layer of the heart, called the pericardium, forms a sac in what the heart lies.', underlinedParts: ['The outer layer of the heart,', 'called the pericardium,', 'forms a sac', 'in what the heart lies.'], correctAnswer: 3 },
  { id: 17, type: 'written', sentence: 'Wood from the ash tree becomes extremely flexibly when it is exposed to steam.', underlinedParts: ['Wood from the ash tree', 'becomes extremely flexibly', 'when it is exposed', 'to steam.'], correctAnswer: 1 },
  { id: 18, type: 'written', sentence: 'The ability to talk is one of the skill that make humans different from the rest of the animal world.', underlinedParts: ['The ability to talk', 'is one of the skill', 'that make humans different', 'from the rest of the animal world.'], correctAnswer: 1 },
  { id: 19, type: 'written', sentence: 'In plane geometry, the sum of the internal angles of any triangle has always equal to 180 degrees.', underlinedParts: ['In plane geometry,', 'the sum of the internal angles', 'of any triangle has always equal', 'to 180 degrees.'], correctAnswer: 2 },
  { id: 20, type: 'written', sentence: 'Polar bears are bowlegged and pigeon-toed, adaptations that enable this massive animals to maintain their balance as they walk.', underlinedParts: ['Polar bears are bowlegged', 'and pigeon-toed, adaptations', 'that enable this massive animals', 'to maintain their balance as they walk.'], correctAnswer: 2 },
  { id: 21, type: 'written', sentence: 'Caves are formed by the chemical or action of water on soluble rock, by volcanic activity, and by earthquakes.', underlinedParts: ['Caves are formed by', 'the chemical or action of water', 'on soluble rock,', 'by volcanic activity, and by earthquakes.'], correctAnswer: 1 },
  { id: 22, type: 'written', sentence: 'Celery, an edible plant is having long stalks topped with feathery leaves, grows best in cool weather.', underlinedParts: ['Celery, an edible plant', 'is having long stalks', 'topped with feathery leaves,', 'grows best in cool weather.'], correctAnswer: 1 },
  { id: 23, type: 'written', sentence: 'The first fiction writer in the United States to achieve international fame was Washington Irving, who wrote many stories, included "Rip Van Winkle" and "The Legend of Sleepy Hollow".', underlinedParts: ['The first fiction writer in the United States', 'to achieve international fame', 'was Washington Irving, who wrote many stories,', 'included "Rip Van Winkle" and "The Legend of Sleepy Hollow".'], correctAnswer: 3 },
  { id: 24, type: 'written', sentence: 'Three fundamental aspects of forest conversation are the protection of immature trees, the use of proper harvesting methods, and provide for an environment that supports reproduction.', underlinedParts: ['Three fundamental aspects of forest conversation are', 'the protection of immature trees,', 'the use of proper harvesting methods,', 'and provide for an environment that supports reproduction.'], correctAnswer: 3 },
  { id: 25, type: 'written', sentence: 'For each enzyme reaction there is an optimum temperature which maximum efficiency is achieved.', underlinedParts: ['For each enzyme reaction', 'there is an optimum temperature', 'which maximum efficiency', 'is achieved.'], correctAnswer: 2 },
  { id: 26, type: 'written', sentence: 'Adolescence is a transitional stage in human development from the beginning of puberty to the attainment of the emotion, social, and physical maturity of adulthood.', underlinedParts: ['Adolescence is a transitional stage', 'in human development from the beginning of puberty', 'to the attainment of the emotion,', 'social, and physical maturity of adulthood.'], correctAnswer: 2 },
  { id: 27, type: 'written', sentence: 'The people native to the northwest coast of North American have long be known for wood carvings of stunning beauty and extraordinary quality.', underlinedParts: ['The people native to the northwest coast', 'of North American have long be known', 'for wood carvings of stunning beauty', 'and extraordinary quality.'], correctAnswer: 1 },
  { id: 28, type: 'written', sentence: 'Colonial efforts to manufacture glass at Jamestown—and later attempts near Philadelphia and Boston—failed despite the abundant of fuel and good raw materials.', underlinedParts: ['Colonial efforts to manufacture glass', 'at Jamestown—and later attempts', 'near Philadelphia and Boston—failed despite', 'the abundant of fuel and good raw materials.'], correctAnswer: 3 },
  { id: 29, type: 'written', sentence: 'The orbit of a celestial body is usually in the shape of ellipse.', underlinedParts: ['The orbit of a celestial body', 'is usually', 'in the shape', 'of ellipse.'], correctAnswer: 3 },
  { id: 30, type: 'written', sentence: 'Chicago is the third largest publishing center in the United States, exceeding only by New York City and San Francisco.', underlinedParts: ['Chicago is the third largest publishing center', 'in the United States,', 'exceeding only by', 'New York City and San Francisco.'], correctAnswer: 2 },
  { id: 31, type: 'written', sentence: 'North American bison differ from domestic cattle in have 14 rather than 13 pairs of ribs.', underlinedParts: ['North American bison differ', 'from domestic cattle', 'in have 14 rather than 13 pairs', 'of ribs.'], correctAnswer: 2 },
  { id: 32, type: 'written', sentence: 'Female sea turtles, before laying her eggs, swim as much as 2,000 kilometers to return to the beaches where they themselves were hatched.', underlinedParts: ['Female sea turtles,', 'before laying her eggs,', 'swim as much as 2,000 kilometers', 'to return to the beaches where they themselves were hatched.'], correctAnswer: 1 },
  { id: 33, type: 'written', sentence: 'Water is the only substance that occur at ordinary temperatures in all three states of matter: solid, liquid and gas.', underlinedParts: ['Water is the only substance', 'that occur at ordinary temperatures', 'in all three states of matter:', 'solid, liquid and gas.'], correctAnswer: 1 },
  { id: 34, type: 'written', sentence: 'Despite the growth of manufacturing and other industries, the economy of the state of Texas has remained heavily dependence on oil and gas.', underlinedParts: ['Despite the growth of manufacturing', 'and other industries, the economy', 'of the state of Texas has remained', 'heavily dependence on oil and gas.'], correctAnswer: 3 },
  { id: 35, type: 'written', sentence: 'Lyndon B. Johnson was the only United States President who oath of office was administered by a woman Judge Sarah Tilghman Hughes.', underlinedParts: ['Lyndon B. Johnson was the only', 'United States President who oath of office', 'was administered by a woman', 'Judge Sarah Tilghman Hughes.'], correctAnswer: 1 },
  { id: 36, type: 'written', sentence: 'It took more than fourteen years to carve the faces of four United States Presidents into the granite cliffs to Mount Rushmore, South Dakota.', underlinedParts: ['It took more than fourteen years', 'to carve the faces of four United States Presidents', 'into the granite cliffs', 'to Mount Rushmore, South Dakota.'], correctAnswer: 3 },
  { id: 37, type: 'written', sentence: 'Charles Bullfinch was the architect who design the original red brick core of the State House in Boston.', underlinedParts: ['Charles Bullfinch was the architect', 'who design the original red brick core', 'of the State House', 'in Boston.'], correctAnswer: 1 },
  { id: 38, type: 'written', sentence: 'Rarely has a technological development had as great an impact on as much aspects of social, economic, and cultural development as the growth of electronics.', underlinedParts: ['Rarely has a technological development', 'had as great an impact on as much aspects', 'of social, economic, and cultural development', 'as the growth of electronics.'], correctAnswer: 1 },
  { id: 39, type: 'written', sentence: 'Lowell, Massachusetts, known as the "Spindle City" since 1822 when its first textile mills were built, attracted worldwide attention as textile center.', underlinedParts: ['Lowell, Massachusetts, known as the "Spindle City"', 'since 1822 when its first textile mills were built,', 'attracted worldwide attention', 'as textile center.'], correctAnswer: 3 },
  { id: 40, type: 'written', sentence: 'Strange Victory, Sara Teasdale\'s smallest and most perfect collection of poems, appear in print in 1933.', underlinedParts: ['Strange Victory, Sara Teasdale\'s smallest', 'and most perfect collection of poems,', 'appear in print', 'in 1933.'], correctAnswer: 2 }
];

// ==========================================
// SECTION 3: READING COMPREHENSION
// ==========================================

const packageAReading: ReadingPassage[] = [
  {
    id: 1,
    title: 'The Development of Philadelphia as a Marketing Center',
    text: `As Philadelphia grew from a small town into a city in the first half of the eighteenth century, it became an increasingly important marketing center for a vast and growing agricultural hinterland. Market days saw the crowded city even more crowded, as farmers from within a radius of 24 or more kilometers brought their sheep, cows, pigs, vegetables, cider, and other products for direct sale to the townspeople. The High Street Market was continuously enlarged throughout the period until 1736, when it reached from Front Street to Third. By 1745 New Market was opened on Second Street between Pine and Cedar. The next year the Callowhill Market began operation.

Along with market days, the institution of twice-yearly fairs persisted in Philadelphia even after similar trading days had been discontinued in other colonial cities. The fairs provided a means of bringing handmade goods from outlying places to would-be buyers in the city. Linens and stockings from Germantown, for example, were popular items.

Auctions were another popular form of occasional trade. Because of the competition, retail merchants opposed these as well as the fairs. Although governmental attempts to eradicate fairs and auctions were less than successful, the ordinary course of economic development was on the merchants' side, as increasing business specialization became the order of the day. Export merchants became differentiated from their importing counterparts, and specialty shops began to appear in addition to general stores selling a variety of goods.

One of the reasons Philadelphia's merchants generally prospered was because the surrounding area was undergoing tremendous economic and demographic growth. They did their business, after all, in the capital city of the province. Not only did they cater to the governor and his circle, but citizens from all over the colony came to the capital for legislative sessions of the assembly and council and the meetings of the courts of justice.`,
    questions: [
      { id: 1, question: 'What does the passage mainly discuss?', options: ['Philadelphia\'s agricultural importance', 'Philadelphia\'s development as a marketing center', 'The sale of imported goods in Philadelphia', 'The administration of the city of Philadelphia'], correctAnswer: 1 },
      { id: 2, question: 'It can be inferred from the passage that new markets opened in Philadelphia because', options: ['they provided more modern facilities than older markets', 'the High Street Market was forced to close', 'existing markets were unable to serve the growing population', 'farmers wanted markets that were closer to the farms'], correctAnswer: 2 },
      { id: 3, question: 'The word "hinterland" in line 3 is closest in meaning to', options: ['tradition', 'association', 'produce', 'region'], correctAnswer: 3 },
      { id: 4, question: 'The word "it" in line 6 refers to', options: ['the crowded city', 'a radius', 'the High Street Market', 'the period'], correctAnswer: 2 },
      { id: 5, question: 'The word "persisted" in line 9 is closest in meaning to', options: ['returned', 'started', 'declined', 'continued'], correctAnswer: 3 },
      { id: 6, question: 'According to the passage, fairs in Philadelphia were held', options: ['on the same day as market days', 'as often as possible', 'a couple of times a year', 'whenever the government allowed it'], correctAnswer: 2 },
      { id: 7, question: 'It can be inferred that the author mentions "Linens and stockings" in line 12 to show that they were items that', options: ['retail merchants were not willing to sell', 'were not available in the stores in Philadelphia', 'were more popular in Germantown than in Philadelphia', 'could easily be transported'], correctAnswer: 3 },
      { id: 8, question: 'The word "eradicate" in line 16 is closest in meaning to', options: ['eliminate', 'exploit', 'organize', 'operate'], correctAnswer: 0 },
      { id: 9, question: 'What does the author mean by stating in line 17 that "economic development was on the merchants\' side"?', options: ['Merchants had a strong impact on economic expansion.', 'Economic forces allowed merchants to prosper.', 'Merchants had to work together to achieve economic independence.', 'Specialty shops near large markets were more likely to be economically successful.'], correctAnswer: 1 },
      { id: 10, question: 'The word "undergoing" in line 22 is closest in meaning to', options: ['requesting', 'experiencing', 'repeating', 'including'], correctAnswer: 1 }
    ]
  },
  {
    id: 2,
    title: 'Aviculture and Parrot Incubation',
    text: `Aviculturists, people who raise birds for commercial sale, have not yet learned how to simulate the natural incubation of parrot eggs in the wild. They continue to look for better ways to increase egg production and to improve chick survival rates. When parrots incubate their eggs in the wild, the temperature and humidity of the nest are controlled naturally. Heat is transferred from the bird's skin to the top portion of the eggshell, leaving the sides and bottom of the egg at a cooler temperature. This temperature gradient may be vital to successful hatching. Nest construction can contribute to this temperature gradient. Nests of loosely arranged sticks, rocks, or dirt are cooler in temperature at the bottom where the egg contacts the nesting material.

Such nests also act as humidity regulators by allowing rain to drain into the bottom sections of the nest so that the eggs are not in direct contact with the water. As the water that collects in the bottom of the nest evaporates, the water vapor rises and is heated by the incubating bird, which adds significant humidity to the incubation environment.

In artificial incubation programs, aviculturists remove eggs from the nests of parrots and incubate them under laboratory conditions. Most commercial incubators heat the eggs fairly evenly from top to bottom, thus ignoring the bird's method of natural incubation, and perhaps reducing the viability and survivability of the hatching chicks. When incubators are not used, aviculturists sometimes suspend wooden boxes outdoors to use as nests in which to place eggs. In areas where weather can become cold after eggs are laid, it is very important to maintain a deep foundation of nesting material to act as insulator against the cold bottom of the box. If eggs rest against the wooden bottom in extremely cold weather conditions, they can become chilled to a point where the embryo can no longer survive. Similarly, these boxes should be protected from direct sunlight to avoid high temperatures that are also fatal to the growing embryo.`,
    questions: [
      { id: 11, question: 'What is the main idea of the passage?', options: ['Nesting material varies according to the parrots\' environment.', 'Humidity is an important factor in incubating parrot eggs.', 'Natural incubation differs from artificial incubation.', 'Aviculturists have difficulty simulating natural incubation.'], correctAnswer: 3 },
      { id: 12, question: 'The word "They" in line 2 refers to', options: ['aviculturists', 'birds', 'eggs', 'rates'], correctAnswer: 0 },
      { id: 13, question: 'According to paragraph 2, when the temperature of the sides and bottom of the egg are cooler than the top, then', options: ['there may be a good chance for successful incubation', 'the embryo will not develop normally', 'the incubating parent moves the egg to a new position', 'the incubation process is slowed down'], correctAnswer: 0 },
      { id: 14, question: 'According to paragraph 2, sticks, rocks, or dirt are used to', options: ['soften the bottom of the nest for the newly hatched chick', 'hold the nest together', 'help lower the temperature at the bottom of the nest', 'make the nest bigger'], correctAnswer: 2 },
      { id: 15, question: 'According to paragraph 2, the construction of the nest allows water to', options: ['provide a beneficial source of humidity in the nest', 'loosen the materials at the bottom of the nest', 'keep the nest in a clean condition', 'touch the bottom of the eggs'], correctAnswer: 0 },
      { id: 16, question: 'All of the following are part of a parrot\'s incubation method EXCEPT', options: ['heating the water vapor as it rises from the bottom of the nest', 'arranging nesting material at the bottom of the nest', 'transferring heat from the parent to the top of the eggshell', 'maintaining a constant temperature on the eggshell'], correctAnswer: 3 },
      { id: 17, question: 'The word "suspend" in line 19 is closest in meaning to', options: ['build', 'paint', 'hang', 'move'], correctAnswer: 2 },
      { id: 18, question: 'The word "fatal" in line 25 is closest in meaning to', options: ['close', 'deadly', 'natural', 'hot'], correctAnswer: 1 },
      { id: 19, question: 'The word "secure" in line 27 is closest in meaning to', options: ['fresh', 'dim', 'safe', 'warm'], correctAnswer: 2 },
      { id: 20, question: 'According to paragraph 3, a deep foundation of nesting material provides', options: ['a constant source of humidity', 'a strong nest box', 'more room for newly hatched chicks', 'protection against cold weather'], correctAnswer: 3 }
    ]
  },
  {
    id: 3,
    title: 'Soil Texture Analysis',
    text: `The mineral particles found in soil range in size from microscopic clay particles to large boulders. The most abundant particles—sand, silt, and clay—are the focus of examination in studies of soil texture. Texture is the term used to describe the composite sizes of particles in a soil sample, typically several representative handfuls. To measure soil texture, the sand, silt, and clay particles are sorted out by size and weight. The weights of each size are then expressed as a percentage of the sample weight.

In the field, soil texture can be estimated by extracting a handful of soil and squeezing the damp soil into three basic shapes; (1) cast, a lump formed by squeezing a sample in a clenched fist; (2) thread, a pencil shape formed by rolling soil between the palms; and (3) ribbon, a flattish shape formed by squeezing a small sample between the thumb and index finger. The behavioral characteristics of the soil when molded into each of these shapes if they can be formed at all, provides the basis for a general textural classification. The behavior of the soil in the hand test is determined by the amount of clay in the sample. Clay particles are highly cohesive, and when dampened, behave as a plastic. Therefore the higher the clay content in a sample, the more refined and durable the shapes into which it can be molded.

Another method of determining soil texture involves the use of devices called sediment sieves, screens built with a specified mesh size. When the soil is filtered through a group of sieves, each with a different mesh size, the particles become grouped in corresponding size categories. Each category can be weighed to make a textural determination. Although sieves work well for silt, sand, and larger particles, they are not appropriate for clay particles. Clay is far too small to sieve accurately; therefore, in soils with a high proportion of clay, the fine particles are measured on the basis of their settling velocity when suspended in water. Since clays settle so slowly, they are easily segregated from sand and silt. The water can be drawn off and evaporated, leaving a residue of clay, which can be weighed.`,
    questions: [
      { id: 21, question: 'What does the passage mainly discuss?', options: ['Characteristics of high quality soil', 'Particles typically found in most soils', 'How a high clay content affects the texture of soil', 'Ways to determine the texture of soil'], correctAnswer: 3 },
      { id: 22, question: 'The author mentions "several representative handfuls" in line 5 in order to show', options: ['how small soil particles are', 'the range of soil samples', 'the process by which soil is weighed', 'how soil texture is measured'], correctAnswer: 1 },
      { id: 23, question: 'The phrase "sorted out" in line 5 is closest in meaning to', options: ['mixed', 'replaced', 'carried', 'separated'], correctAnswer: 3 },
      { id: 24, question: 'It can be inferred from the passage that the most important factor in determining the texture of soil is', options: ['the size of the particles', 'the weight of the sample', 'the amount of clay present', 'how the sample was collected'], correctAnswer: 2 },
      { id: 25, question: 'The word "dampened" in line 15 is closest in meaning to', options: ['damaged', 'stretched', 'moistened', 'examined'], correctAnswer: 2 },
      { id: 26, question: 'Which of the following can be inferred from the passage about a soil sample with little or no clay in it?', options: ['It is not very heavy.', 'It may not hold its shape when molded.', 'Its shape is durable.', 'Its texture cannot be classified.'], correctAnswer: 1 },
      { id: 27, question: 'The word "they" in line 23 refers to', options: ['categories', 'sieves', 'larger particles', 'clay particles'], correctAnswer: 3 },
      { id: 28, question: 'It can be inferred from the passage that the sediment sieve has an advantage over the hand test in determining soil texture because', options: ['using the sieve takes less time', 'the sieve can measure clay', 'less training is required to use the sieve', 'the sieve allows for a more exact measure'], correctAnswer: 3 },
      { id: 29, question: 'During the procedure described in paragraph 3, when clay particles are placed into water they', options: ['stick to the sides of the water container', 'take some time to sink to the bottom', 'separate into different sizes', 'dissolve quickly'], correctAnswer: 1 },
      { id: 30, question: 'The word "fine" in line 24 is closest in meaning to', options: ['tiny', 'many', 'excellent', 'various'], correctAnswer: 0 }
    ]
  },
  {
    id: 4,
    title: 'The Voice and Personality',
    text: `A number of factors related to the voice reveal the personality of the speaker. The first is the broad area of communication, which includes imparting information by use of language, communicating with a group or an individual, and specialized communication through performance. A person conveys thoughts and ideas through choice of words, by a tone of voice that is pleasant or unpleasant, gentle or harsh, by the rhythm that is inherent within the language itself, and by speech rhythms that are flowing and regular or uneven and hesitant, and finally, by the pitch and melody of the utterance. When speaking before a group, a person's tone may indicate unsureness or fright, confidence or calm. At interpersonal levels, the tone may reflect ideas and feelings over and above the words chosen, or may belie them. Here the conversant's tone can consciously or unconsciously reflect intuitive sympathy or antipathy, lack of concern or interest, fatigue, anxiety, enthusiasm or excitement, all of which are usually discernible by the acute listener.

Public performance is a manner of communication that is highly specialized with its own techniques for obtaining effects by voice and/or gesture. The motivation derived from the text, and in the case of singing, the music, in combination with the performer's skills, personality, and ability to create empathy will determine the success of artistic, political, or pedagogic communication.

Second, the voice gives psychological clues to a person's self-image, perception of others, and emotional health. Self-image can be indicated by a tone of voice that is confident, pretentious, shy, aggressive, outgoing, or exuberant, to name only a few personality traits. Also the sound may give a clue to the facade or mask of that person, for example, a shy person hiding behind an overconfident front. How a speaker perceives the listener's receptiveness, interest, or sympathy in any given conversation can drastically alter the tone of presentation, by encouraging or discouraging the speaker. Emotional health is evidenced in the voice by free and melodic sounds of the happy, by constricted and harsh sound of the angry, and by dull and lethargic qualities of the depressed.`,
    questions: [
      { id: 31, question: 'What does the passage mainly discuss?', options: ['The function of the voice in performance', 'The connection between voice and personality', 'Communication styles', 'The production of speech'], correctAnswer: 1 },
      { id: 32, question: 'What does the author mean by stating in line 10 "the tone may reflect ideas and feelings over and above the words chosen"?', options: ['The tone of voice can carry information beyond the meaning of words.', 'The words chosen are more important than the tone of voice.', 'Feelings are more easily conveyed through words than through tone.', 'The meaning of words can be changed by the tone of voice.'], correctAnswer: 0 },
      { id: 33, question: 'The word "derived" in line 15 is closest in meaning to', options: ['discussed', 'prepared', 'registered', 'obtained'], correctAnswer: 3 },
      { id: 34, question: 'Why does the author mention "artistic, political, or pedagogic communication" in line 17?', options: ['As examples of public performance', 'As examples of basic styles of communication', 'To contrast them to singing', 'To introduce the idea of self-image'], correctAnswer: 0 },
      { id: 35, question: 'According to the passage, an exuberant tone of voice may be an indication of a person\'s', options: ['general physical health', 'personality', 'ability to communicate', 'vocal quality'], correctAnswer: 1 },
      { id: 36, question: 'According to the passage, an overconfident front may hide', options: ['hostility', 'shyness', 'friendliness', 'strength'], correctAnswer: 1 },
      { id: 37, question: 'The word "drastically" in line 24 is closest in meaning to', options: ['frequently', 'exactly', 'severely', 'easily'], correctAnswer: 2 },
      { id: 38, question: 'The word "evidenced" in line 25 is closest in meaning to', options: ['questioned', 'repeated', 'indicated', 'exaggerated'], correctAnswer: 2 },
      { id: 39, question: 'According to the passage, what does a constricted and harsh voice indicate?', options: ['Lethargy', 'Depression', 'Boredom', 'Anger'], correctAnswer: 3 },
      { id: 40, question: 'Where in the passage does the author discuss the relationship between self-image and tone of voice?', options: ['Lines 4-6', 'Lines 10-12', 'Lines 21-23', 'Lines 24-27'], correctAnswer: 2 }
    ]
  },
  {
    id: 5,
    title: 'Education in the Twentieth Century',
    text: `As the twentieth century began, the importance of formal education in the United States increased. The frontier had mostly disappeared and by 1910 most Americans lived in towns and cities. Industrialization and the bureaucratization of economic life combined with a new emphasis upon credentials and expertise to make schooling increasingly important for economic and social mobility. Increasingly, too, schools were viewed as the most important means of integrating immigrants into American society.

The arrival of a great wave of southern and eastern European immigrants at the turn of the century coincided with and contributed to an enormous expansion of formal schooling. By 1920 schooling to age fourteen or beyond was compulsory in most states, and the school year was greatly lengthened. Kindergartens, vacation schools, extracurricular activities, and vocational education and counseling extended the influence of public schools over the lives of students, many of whom in the larger industrial cities were the children of immigrants. Classes for adult immigrants were sponsored by public schools, corporations, unions, churches, settlement houses, and other agencies.

Reformers early in the twentieth century suggested that education programs should suit the needs of specific populations. Immigrant women were one such population. Schools tried to educate young women so they could occupy productive places in the urban industrial economy, and one place many educators considered appropriate for women was the home.

Although looking after the house and family was familiar to immigrant women, American education gave homemaking a new definition. In preindustrial economies, homemaking had meant the production as well as the consumption of goods, and it commonly included income-producing activities both inside and outside the home. In the highly industrialized early-twentieth-century United States, however, overproduction rather than scarcity was becoming a problem. Thus, the ideal American homemaker was viewed as a consumer rather than a producer. Schools trained women to be consumer homemakers—cooking, shopping, decorating, and caring for children "efficiently" in their own homes, or if economic necessity demanded, as employees in the homes of others. Subsequent reforms have made these notions seem quite out-of-date.`,
    questions: [
      { id: 41, question: 'It can be inferred from paragraph 1 that one important factor in the changing importance of education in the United States was', options: ['the development of new teaching methods', 'an increase in the number of trained teachers', 'the growth of industrialization', 'a decrease in the population of rural areas'], correctAnswer: 2 },
      { id: 42, question: 'The word "means" in line 6 is closest in meaning to', options: ['advantages', 'probability', 'method', 'qualification'], correctAnswer: 2 },
      { id: 43, question: 'The phrase "coincided with" in line 8 is closest in meaning to', options: ['brought about', 'happened at the same time as', 'influenced', 'increased'], correctAnswer: 1 },
      { id: 44, question: 'According to the passage, one important change in United States education by the 1920\'s was that', options: ['most places required children to attend school', 'the amount of time spent on formal education was limited', 'new regulations were imposed on nontraditional education', 'adults and children studied in the same classes'], correctAnswer: 0 },
      { id: 45, question: 'Vacation schools and extracurricular activities are mentioned in lines 11-12 to illustrate', options: ['alternatives to formal education provided by public schools', 'the importance of educational changes', 'activities that competed to attract new immigrants to their programs', 'the increased impact of public schools on students'], correctAnswer: 3 },
      { id: 46, question: 'According to the passage, early-twentieth century education reformers believed that', options: ['different groups needed different kinds of education', 'special programs should be set up in frontier communities to modernize them', 'corporations and other organizations damaged educational progress', 'more women should be involved in education and industry'], correctAnswer: 0 },
      { id: 47, question: 'The word "it" in line 24 refers to', options: ['consumption', 'production', 'homemaking', 'education'], correctAnswer: 2 },
      { id: 48, question: 'According to the passage, immigrant women were taught to be consumer homemakers because', options: ['they had to support their families', 'the United States was becoming industrialized', 'their traditional skills were not needed', 'they wanted to learn new skills'], correctAnswer: 1 },
      { id: 49, question: 'The phrase "out-of-date" in line 30 is closest in meaning to', options: ['old-fashioned', 'unfamiliar', 'expensive', 'unusual'], correctAnswer: 0 },
      { id: 50, question: 'Which of the following best describes the organization of the passage?', options: ['A historical situation is described, and then possible reasons for it are analyzed.', 'An argument is made, and then evidence is presented to support it.', 'A problem is presented, and then solutions to it are suggested.', 'A series of changes is described, and the effects of each are analyzed.'], correctAnswer: 0 }
    ]
  }
];

// =============================================
// Export Package A
// =============================================

export const packageA: QuestionPackage = {
  id: 'A',
  name: 'Paket A',
  description: 'TOEFL ITP Practice Questions - Based on Official Standards',
  listening: packageAListening,
  structure: packageAStructure,
  reading: packageAReading
};

// Placeholder for other packages - they would have similar structure
export const questionPackages: Record<string, QuestionPackage> = {
  A: packageA,
  // B, C, D packages would be added here
};

// Score calculation function
export function calculateScores(
  listeningAnswers: Record<number, number>,
  structureAnswers: Record<number, number>,
  readingAnswers: Record<number, number>,
  listeningQuestions: ListeningQuestion[],
  structureQuestions: StructureQuestion[],
  readingPassages: ReadingPassage[]
) {
  // Calculate raw scores
  let listeningCorrect = 0;
  let structureCorrect = 0;
  let readingCorrect = 0;

  listeningQuestions.forEach(q => {
    if (listeningAnswers[q.id] === q.correctAnswer) {
      listeningCorrect++;
    }
  });

  structureQuestions.forEach(q => {
    if (structureAnswers[q.id] === q.correctAnswer) {
      structureCorrect++;
    }
  });

  readingPassages.forEach(passage => {
    passage.questions.forEach(q => {
      if (readingAnswers[q.id] === q.correctAnswer) {
        readingCorrect++;
      }
    });
  });

  // Convert to scaled scores (TOEFL ITP scoring)
  // Listening: 31-68, Structure: 31-68, Reading: 31-67, Total: 310-677
  const listeningScaled = Math.round(31 + (listeningCorrect / 50) * 37);
  const structureScaled = Math.round(31 + (structureCorrect / 40) * 37);
  const readingScaled = Math.round(31 + (readingCorrect / 50) * 36);
  
  // Total score calculation
  const totalScore = Math.round(((listeningScaled + structureScaled + readingScaled) / 3) * 10);

  return {
    listeningRaw: listeningCorrect,
    structureRaw: structureCorrect,
    readingRaw: readingCorrect,
    listeningScore: listeningScaled,
    structureScore: structureScaled,
    readingScore: readingScaled,
    totalScore: Math.min(677, Math.max(310, totalScore))
  };
}
