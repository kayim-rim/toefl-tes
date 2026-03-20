// Learning Skills Data for TOEFL ITP
// Total: 28 Skills (6 Listening, 12 Structure, 10 Reading)

export interface LearningSkillData {
  id: string;
  section: 'listening' | 'structure' | 'reading';
  skillId: string;
  name: string;
  description: string;
  objectives: string[];
  material: string;
  tips: string[];
  order: number;
}

export interface LearningQuestionData {
  skillId: string;
  order: number;
  question: string;
  options: string[];
  correctAnswer: number;
  audioScript?: string;
  explanation: string;
  whyCorrect: string;
  whyWrong?: string;
}

// ==========================================
// LISTENING SKILLS (6 Skills)
// ==========================================

export const listeningSkills: LearningSkillData[] = [
  {
    id: 'listening-1',
    section: 'listening',
    skillId: '1.1',
    name: 'Understanding Main Idea',
    description: 'Menentukan ide utama atau topik yang dibahas dalam percakapan atau talk',
    objectives: [
      'Mengidentifikasi topik utama percakapan',
      'Membedakan main idea dengan supporting details',
      'Menentukan fokus pembahasan dalam talk akademik',
      'Mengenali kalimat yang menyatakan ide utama'
    ],
    material: `
## Apa itu Main Idea?

**Main Idea** adalah ide atau topik utama yang dibahas dalam sebuah percakapan atau talk. Dalam TOEFL ITP, pertanyaan tentang main idea sering muncul di semua bagian Listening (Part A, B, dan C).

### Jenis Pertanyaan Main Idea:
- "What are the speakers mainly discussing?"
- "What is the main topic of the lecture?"
- "What is the conversation primarily about?"
- "What is the speaker mainly talking about?"

### Strategi Menjawab:

1. **Dengarkan keseluruhan percakapan** - Jangan fokus pada detail kecil
2. **Perhatikan kalimat pertama dan terakhir** - Main idea sering ada di sana
3. **Tanyakan pada diri sendiri**: "Apa yang sedang dibahas?"
4. **Hindari jawaban yang terlalu spesifik** - Main idea bersifat umum

### Contoh:
**Transkrip:**
> "Did you finish the history assignment? I'm having trouble finding sources about the Industrial Revolution."
> "Yeah, I used the online library database. There are tons of articles there."

**Pertanyaan:** What are the speakers mainly discussing?
**Jawaban yang benar:** A homework assignment (umum)
**Jawaban yang salah:** The Industrial Revolution (terlalu spesifik - ini hanya detail)
    `,
    tips: [
      'Main idea bersifat UMUM, bukan detail spesifik',
      'Perhatikan apa yang dibahas sebagian besar waktu',
      'Jangan terkecoh dengan detail menarik yang bukan ide utama',
      'Di Part B dan C, perhatikan pengantar dan kesimpulan'
    ],
    order: 1
  },
  {
    id: 'listening-2',
    section: 'listening',
    skillId: '1.2',
    name: 'Understanding Details',
    description: 'Menangkap informasi detail spesifik yang disebutkan dalam percakapan',
    objectives: [
      'Mengidentifikasi angka, waktu, dan tanggal',
      'Mengidentifikasi nama, lokasi, dan tempat',
      'Mengidentifikasi alasan dan tujuan',
      'Mengingat detail dari percakapan panjang'
    ],
    material: `
## Understanding Details

Pertanyaan detail menanyakan informasi spesifik yang disebutkan dalam percakapan. Informasi ini bisa berupa angka, nama, waktu, lokasi, atau fakta lainnya.

### Jenis Pertanyaan Detail:
- "What time does the library close?"
- "Where is the woman going?"
- "How much does the book cost?"
- "Why did the man miss the class?"

### Strategi Menjawab:

1. **Dengarkan dengan cermat** untuk informasi spesifik yang ditanyakan
2. **Tulis catatan** untuk angka dan nama (jika diizinkan)
3. **Perhatikan kata tanya** (what, where, when, who, why, how)
4. **Waspada terhadap informasi yang dikoreksi** - speaker mungkin mengubah informasi

### Contoh Detail Numbers:
- Prices: "fifteen dollars" vs "fifty dollars"
- Times: "half past three" = 3:30
- Dates: "the fifteenth" vs "the fiftieth"

### Perhatikan:
- Angka yang mirip bunyinya (13-19 vs 30-90)
- Kata-kata penunjuk waktu (before, after, until)
- Koreksi informasi ("Actually, it's...")
    `,
    tips: [
      'Fokus pada JENIS informasi yang ditanyakan',
      'Angka 13-19 berakhiran -teen, sedangkan 30-90 berakhiran -ty',
      'Perhatikan kata-kata penghubung waktu',
      'Waspada jika speaker mengoreksi dirinya sendiri'
    ],
    order: 2
  },
  {
    id: 'listening-3',
    section: 'listening',
    skillId: '1.3',
    name: 'Understanding Inference',
    description: 'Menyimpulkan informasi yang tidak secara eksplisit disebutkan dalam percakapan',
    objectives: [
      'Menyimpulkan perasaan atau sikap pembicara',
      'Menyimpulkan apa yang akan terjadi',
      'Menyimpulkan hubungan antar pembicara',
      'Menyimpulkan konteks atau situasi'
    ],
    material: `
## Understanding Inference

Inference adalah kemampuan untuk menyimpulkan sesuatu yang **tidak secara langsung diucapkan** tetapi dapat dipahami dari konteks. Ini disebut juga "reading between the lines" (membaca di antara baris).

### Jenis Pertanyaan Inference:
- "What does the man imply?"
- "What can be inferred about...?"
- "What will the woman probably do next?"
- "What can be concluded from the conversation?"

### Strategi Menjawab:

1. **Perhatikan konteks** - Situasi apa yang sedang terjadi?
2. **Gunakan logika** - Apa yang masuk akal terjadi?
3. **Perhatikan tone suara** - Apakah senang, sedih, marah?
4. **Cari petunjuk implisit** - Apa yang tersirat?

### Contoh:
**Transkrip:**
> "I thought the exam was really difficult."
> "You can say that again! I barely finished in time."

**Pertanyaan:** What does the woman mean?
**Inference:** She also found the exam difficult.
**Petunjuk:** "You can say that again!" = setuju

### Hubungan yang Sering Diuji:
- Student - Professor
- Customer - Shopkeeper
- Patient - Doctor
- Friends
- Colleagues
    `,
    tips: [
      'Inference = simpulkan dari konteks, bukan dari pernyataan langsung',
      'Perhatikan respon terhadap pernyataan lawan bicara',
      'Idiom sering memberikan petunjuk inference',
      'Jangan mengambil jawaban yang terlalu jauh dari teks'
    ],
    order: 3
  },
  {
    id: 'listening-4',
    section: 'listening',
    skillId: '1.4',
    name: 'Understanding Function',
    description: 'Mengetahui tujuan pembicara mengucapkan sesuatu dalam percakapan',
    objectives: [
      'Mengidentifikasi saran dan nasehat',
      'Mengidentifikasi permintaan dan tawaran',
      'Mengidentifikasi ekspresi setuju/tidak setuju',
      'Memahami fungsi idiom dan ekspresi'
    ],
    material: `
## Understanding Function

Pertanyaan function menanyakan **MENGAPA** pembicara mengucapkan sesuatu. Apa tujuan dari ucapan tersebut?

### Jenis Pertanyaan Function:
- "Why does the woman say...?"
- "Why does the man mention...?"
- "What does the speaker mean when he says...?"
- "What is the purpose of mentioning...?"

### Fungsi yang Sering Diuji:

1. **Memberikan saran:**
   - "You should..."
   - "Why don't you..."
   - "Have you considered..."
   - "If I were you..."

2. **Menawarkan bantuan:**
   - "Would you like me to..."
   - "I can help you..."
   - "Let me..."

3. **Menolak dengan sopan:**
   - "I'd love to, but..."
   - "I wish I could, but..."
   - "That sounds great, but..."

4. **Mengkritik:**
   - "I don't think that's a good idea."
   - "That might not be the best approach."

### Contoh:
**Transkrip:**
> "I'm really stressed about my presentation tomorrow."
> "Why don't you practice in front of a mirror?"

**Pertanyaan:** Why does the man say this: "Why don't you practice in front of a mirror?"
**Jawaban:** To suggest a way to prepare for the presentation.
    `,
    tips: [
      'Fungsi = tujuan, bukan arti harfiah',
      'Perhatikan konteks sebelum dan sesudah ucapan',
      'Banyak idiom memiliki fungsi tertentu',
      'Latih mengenali pola ekspresi umum'
    ],
    order: 4
  },
  {
    id: 'listening-5',
    section: 'listening',
    skillId: '1.5',
    name: 'Understanding Attitude',
    description: 'Mengetahui sikap, perasaan, atau pendapat pembicara terhadap sesuatu',
    objectives: [
      'Mengidentifikasi sikap positif vs negatif',
      'Mengidentifikasi kepastian vs ketidakpastian',
      'Mengidentifikasi kepuasan vs ketidakpuasan',
      'Mengenali tone suara yang menunjukkan sikap'
    ],
    material: `
## Understanding Attitude

Pertanyaan attitude menanyakan **bagaimana perasaan atau sikap** pembicara terhadap sesuatu.

### Jenis Pertanyaan Attitude:
- "What is the woman's attitude toward...?"
- "How does the man feel about...?"
- "What is the speaker's opinion of...?"
- "The professor's attitude toward X is..."

### Kategori Attitude:

**Positif:**
- Enthusiastic, optimistic, supportive
- Impressed, satisfied, pleased
- Confident, certain, sure

**Negatif:**
- Critical, skeptical, doubtful
- Disappointed, frustrated, annoyed
- Concerned, worried, uncertain

**Netral:**
- Objective, impartial, factual
- Indifferent, unconcerned

### Kata-kata yang Menunjukkan Attitude:

**Setuju/Positif:**
- "That's a great idea!"
- "I couldn't agree more."
- "Absolutely!"
- "You're absolutely right."

**Tidak Setuju/Negatif:**
- "I'm not so sure about that."
- "That's questionable."
- "I have my doubts."
- "I'm concerned that..."

### Contoh:
**Transkrip:**
> "Did you hear about the new policy?"
> "Yeah, and I think it's going to cause more problems than it solves."

**Pertanyaan:** What is the woman's attitude toward the new policy?
**Jawaban:** Skeptical/Critical
    `,
    tips: [
      'Perhatikan kata-kata yang menunjukkan emosi',
      'Tone suara juga memberikan petunjuk',
      'Pilih jawaban yang sesuai dengan konteks',
      'Jangan menginterpretasikan terlalu jauh'
    ],
    order: 5
  },
  {
    id: 'listening-6',
    section: 'listening',
    skillId: '1.6',
    name: 'Understanding Organization',
    description: 'Memahami struktur dan urutan informasi dalam percakapan atau talk',
    objectives: [
      'Mengidentifikasi urutan kejadian',
      'Mengidentifikasi hubungan sebab-akibat',
      'Mengidentifikasi contoh dan ilustrasi',
      'Memahami perbandingan dan kontras'
    ],
    material: `
## Understanding Organization

Pertanyaan organization menanyakan **bagaimana informasi disusun** dalam percakapan atau talk.

### Jenis Pertanyaan Organization:
- "Why does the professor mention...?"
- "How is the lecture organized?"
- "Why does the speaker discuss X before Y?"
- "What is the purpose of the example?"

### Pola Organisasi Umum:

1. **Chronological (Waktu):**
   - First, then, next, finally
   - Before, after, during

2. **Cause and Effect (Sebab-Akibat):**
   - Because, therefore, as a result
   - Consequently, thus, hence

3. **Compare and Contrast:**
   - Similarly, likewise, in contrast
   - On the other hand, however, but

4. **Problem-Solution:**
   - The problem is..., The solution is...
   - To address this..., We can solve this by...

### Mengapa Contoh Disebutkan?

- To illustrate a point
- To provide evidence
- To clarify a concept
- To support an argument

### Contoh:
**Transkrip:**
> "There are several ways to reduce pollution. For example, using public transportation..."

**Pertanyaan:** Why does the speaker mention public transportation?
**Jawaban:** To give an example of how to reduce pollution.
    `,
    tips: [
      'Perhatikan transition words',
      'Contoh biasanya untuk mengilustrasikan poin utama',
      'Urutan informasi mengikuti pola tertentu',
      'Tanyakan: Mengapa informasi ini disebutkan?'
    ],
    order: 6
  }
];

// ==========================================
// STRUCTURE SKILLS (12 Skills)
// ==========================================

export const structureSkills: LearningSkillData[] = [
  {
    id: 'structure-1',
    section: 'structure',
    skillId: '2.1',
    name: 'Verb Tenses',
    description: 'Menggunakan bentuk waktu kata kerja yang tepat dalam kalimat',
    objectives: [
      'Memahami Simple Present, Past, Future',
      'Memahami Present Perfect, Past Perfect',
      'Mengenali time markers untuk setiap tense',
      'Memilih tense yang tepat berdasarkan konteks'
    ],
    material: `
## Verb Tenses

Tenses menunjukkan **waktu** terjadinya suatu aksi. Dalam TOEFL ITP, Anda harus memilih tense yang tepat berdasarkan konteks kalimat.

### Tenses yang Sering Diuji:

**1. Simple Present**
- Untuk fakta umum, kebiasaan
- Time markers: always, usually, every day
- Contoh: "She **works** at a bank."

**2. Simple Past**
- Untuk kejadian yang sudah selesai di masa lalu
- Time markers: yesterday, last week, ago
- Contoh: "She **worked** there last year."

**3. Present Perfect**
- Untuk kejadian yang dimulai di masa lalu dan berlanjut/selesai
- Time markers: since, for, already, yet
- Contoh: "She **has worked** there for 5 years."

**4. Past Perfect**
- Untuk kejadian yang terjadi sebelum kejadian lain di masa lalu
- Time markers: before, after, by the time
- Contoh: "She **had worked** there before she moved."

**5. Future Tenses**
- will + base form: "She **will work** tomorrow."
- be going to: "She **is going to work** tomorrow."

### Pola Soal:
"The students _____ the exam by the time the bell rang."
a) have finished
b) had finished ✓ (selesai sebelum bell berbunyi)
c) finished
d) were finishing
    `,
    tips: [
      'Cari time markers untuk menentukan tense',
      'Past Perfect = kejadian sebelum kejadian lain di masa lalu',
      'Present Perfect = hubungan dengan sekarang',
      'Simple Past = kejadian selesai di masa lalu'
    ],
    order: 1
  },
  {
    id: 'structure-2',
    section: 'structure',
    skillId: '2.2',
    name: 'Subject-Verb Agreement',
    description: 'Mencocokkan kata kerja dengan subjek dalam hal jumlah (singular/plural)',
    objectives: [
      'Mengidentifikasi subjek tunggal dan jamak',
      'Memahami collective nouns',
      'Memahami indefinite pronouns',
      'Mengabaikan frasa di antara subjek dan kata kerja'
    ],
    material: `
## Subject-Verb Agreement

**Aturan Dasar:**
- Subjek **singular** → kata kerja **singular**
- Subjek **plural** → kata kerja **plural**

### Subjek Singular:
- He, she, it
- Singular noun: "the student", "the book"
- Indefinite pronouns: everyone, someone, nobody, each, every

### Subjek Plural:
- They, we, you
- Plural noun: "the students", "the books"
- Both, few, many, several

### Collective Nouns (Bisa Singular atau Plural):
- team, group, committee, family, class
- Singular jika bertindak sebagai satu kesatuan
- Plural jika anggotanya bertindak individu

### Trikiest Cases:

**1. Frasa di antara subjek dan kata kerja:**
> "The list of names **is** long."
> (Subjek = list, bukan names)

**2. Either/Neither:**
> "Either the students or the teacher **is** responsible."
> (Kata kerja mengikuti subjek terdekat)

**3. Each dan Every:**
> "Each student **has** a book."
> (Selalu singular!)

### Contoh Soal:
"The group of students _____ waiting for the bus."
a) is ✓ (group = singular)
b) are
c) were
d) be
    `,
    tips: [
      'Temukan subjek UTAMA, abaikan kata di antara',
      'Each, every, everyone = SELALU singular',
      'Collective nouns biasanya singular',
      'Either/or, neither/nor = kata kerja mengikuti yang terdekat'
    ],
    order: 2
  },
  {
    id: 'structure-3',
    section: 'structure',
    skillId: '2.3',
    name: 'Noun Clauses',
    description: 'Menggunakan noun clauses dengan benar dalam kalimat',
    objectives: [
      'Memahami fungsi noun clause',
      'Menggunakan that, what, who, where, when',
      'Menggunakan whether dan if',
      'Mengatur word order dalam noun clause'
    ],
    material: `
## Noun Clauses

**Noun Clause** adalah klausa yang berfungsi sebagai noun (kata benda). Noun clause dapat menjadi:
- Subjek kalimat
- Objek kata kerja
- Objek preposisi
- Subject complement

### Pembentuk Noun Clause:

**1. that**
> "**That he left early** surprised everyone."
> (sebagai subjek)

**2. what (= the thing that)**
> "I don't know **what he said**."
> (sebagai objek)

**3. who, whom, whose**
> "I wonder **who will win**."
> "**Whose book this is** is unclear."

**4. where, when, why, how**
> "I don't know **where he went**."
> "She explained **how the machine works**."

**5. whether, if (untuk pilihan)**
> "I don't know **whether/if he is coming**."

### Word Order dalam Noun Clause:
> "I know **what he wants**." ✓
> "I know what does he want." ✗

### Contoh Soal:
"_____ caused the accident is still unknown."
a) What ✓
b) That
c) Which
d) The fact
    `,
    tips: [
      'Word order noun clause: SUBJECT + VERB (bukan inversion)',
      'What = "the thing that"',
      'Whether digunakan untuk pilihan',
      'Noun clause bisa jadi subjek atau objek'
    ],
    order: 3
  },
  {
    id: 'structure-4',
    section: 'structure',
    skillId: '2.4',
    name: 'Adjective Clauses',
    description: 'Menggunakan adjective clauses (relative clauses) dengan benar',
    objectives: [
      'Menggunakan who, whom, whose untuk orang',
      'Menggunakan which, that untuk benda',
      'Menggunakan where, when untuk tempat/waktu',
      'Memahami restrictive vs non-restrictive clause'
    ],
    material: `
## Adjective Clauses (Relative Clauses)

**Adjective Clause** adalah klausa yang menerangkan noun. Dimulai dengan relative pronouns.

### Relative Pronouns:

**who** - untuk orang (sebagai subjek)
> "The man **who called** you is my uncle."

**whom** - untuk orang (sebagai objek)
> "The man **whom you called** is my uncle."

**whose** - untuk kepemilikan
> "The man **whose car was stolen** reported it."

**which** - untuk benda
> "The book **which I bought** is interesting."

**that** - untuk orang atau benda (restrictive)
> "The book **that I bought** is interesting."

**where** - untuk tempat (mengganti preposition + which)
> "The city **where I was born** is beautiful."

**when** - untuk waktu
> "I remember the day **when we met**."

### Restrictive vs Non-restrictive:

**Restrictive (tanpa koma):** Informasi penting
> "Students **who study hard** will pass."
> (Hanya siswa yang rajin yang lulus)

**Non-restrictive (dengan koma):** Informasi tambahan
> "My brother, **who lives in Jakarta**, is visiting."
> (Hanya punya satu saudara)

### Contoh Soal:
"The book _____ I borrowed from the library is missing."
a) who
b) whom
c) which ✓
d) whose
    `,
    tips: [
      'who = subjek orang, whom = objek orang',
      'which/that = benda',
      'whose = kepemilikan',
      'Non-restrictive menggunakan koma dan tidak pakai "that"'
    ],
    order: 4
  },
  {
    id: 'structure-5',
    section: 'structure',
    skillId: '2.5',
    name: 'Adverb Clauses',
    description: 'Menggunakan adverb clauses dengan benar dalam kalimat',
    objectives: [
      'Menggunakan conjunctions untuk time, cause, condition',
      'Memahami adverb clause of concession',
      'Menggunakan adverb clause of purpose',
      'Memahami reduction of adverb clauses'
    ],
    material: `
## Adverb Clauses

**Adverb Clause** adalah klausa yang berfungsi sebagai adverb, menerangkan kata kerja, adjective, atau adverb lain.

### Jenis Adverb Clauses:

**1. Time (Waktu):**
- when, while, before, after, since, until, as soon as
> "**When I arrived**, they were eating."

**2. Cause (Sebab):**
- because, since, as
> "**Because it was raining**, we stayed inside."

**3. Condition (Kondisi):**
- if, unless, provided that
> "**If you study hard**, you will pass."

**4. Concession (Konsesi):**
- although, though, even though, while
> "**Although he tried hard**, he failed."

**5. Purpose (Tujuan):**
- so that, in order that
> "She studied hard **so that she could pass**."

**6. Place:**
- where, wherever
> "**Wherever he goes**, he makes friends."

### Reduction of Adverb Clauses:
> "**While walking** home, I saw an accident."
> (dari: While I was walking home...)

### Contoh Soal:
"_____ it rains tomorrow, we will cancel the picnic."
a) Because
b) Although
c) If ✓
d) Unless
    `,
    tips: [
      'Hafal jenis-jenis conjunction',
      'Adverb clause bisa ditempatkan di awal atau akhir kalimat',
      'Perhatikan tanda baca (koma jika di awal)',
      'Time clause tidak akan menggunakan future tense'
    ],
    order: 5
  },
  {
    id: 'structure-6',
    section: 'structure',
    skillId: '2.6',
    name: 'Conditionals',
    description: 'Menggunakan kalimat pengandaian dengan benar',
    objectives: [
      'Memahami Type 0, 1, 2, 3 conditionals',
      'Menggunakan wish dan if only',
      'Memahami mixed conditionals',
      'Mengenali inversion dalam conditionals'
    ],
    material: `
## Conditionals

**Conditionals** adalah kalimat yang menyatakan pengandaian atau syarat.

### Jenis Conditionals:

**Type 0 - General Truth:**
> If + present simple, present simple
> "**If you heat water to 100°C, it boils.**"

**Type 1 - Real Future:**
> If + present simple, will + base
> "**If it rains tomorrow, I will stay home.**"

**Type 2 - Unreal Present:**
> If + past simple, would + base
> "**If I had money, I would buy a car.**"
> (Tapi saya tidak punya uang sekarang)

**Type 3 - Unreal Past:**
> If + past perfect, would have + past participle
> "**If I had studied, I would have passed.**"
> (Tapi saya tidak belajar dan gagal)

### Wish dan If Only:

**Wish + past simple:** Keinginan di masa kini
> "I **wish I knew** the answer." (Tapi saya tidak tahu)

**Wish + past perfect:** Penyesalan di masa lalu
> "I **wish I had studied** harder."

### Inversion (Formal):
> "**Had I known**, I would have helped."
> (dari: If I had known...)

### Contoh Soal:
"If I _____ you, I would accept the offer."
a) am
b) was
c) were ✓
d) had been
    `,
    tips: [
      'Type 2: were untuk semua subjek (formal)',
      'Wish + past = keinginan sekarang',
      'Wish + past perfect = penyesalan masa lalu',
      'Unless = if not'
    ],
    order: 6
  },
  {
    id: 'structure-7',
    section: 'structure',
    skillId: '2.7',
    name: 'Passive Voice',
    description: 'Mengubah kalimat aktif ke pasif dan sebaliknya',
    objectives: [
      'Memahami struktur passive voice',
      'Mengubah berbagai tenses ke passive',
      'Menggunakan passive dengan modal auxiliaries',
      'Memahami kapan menggunakan passive'
    ],
    material: `
## Passive Voice

**Struktur Passive:** be + past participle (V3)

### Perubahan Aktif ke Pasif:

**Simple Present:**
- Active: "She **writes** letters."
- Passive: "Letters **are written** by her."

**Simple Past:**
- Active: "She **wrote** letters."
- Passive: "Letters **were written** by her."

**Present Perfect:**
- Active: "She **has written** letters."
- Passive: "Letters **have been written** by her."

**Modal Auxiliaries:**
- Active: "She **will write** letters."
- Passive: "Letters **will be written** by her."

### Contoh Soal:
"The report _____ yesterday."
a) wrote
b) was written ✓
c) written
d) writing

### Kapan Menggunakan Passive?
- Pelaku tidak dikenal
- Pelaku tidak penting
- Fokus pada objek/penerima
- Formal writing

### Catatan:
- By + agent (pelaku) adalah opsional
- Tidak semua kata kerja bisa dipasifkan
- Verbs: happen, occur, exist, appear tidak bisa dipasifkan
    `,
    tips: [
      'Passive = be + V3',
      'Tense ditentukan oleh bentuk "be"',
      'By + agent bersifat opsional',
      'Cari bentuk "be" yang sesuai dengan tense'
    ],
    order: 7
  },
  {
    id: 'structure-8',
    section: 'structure',
    skillId: '2.8',
    name: 'Comparatives and Superlatives',
    description: 'Menyatakan perbandingan dengan benar',
    objectives: [
      'Menggunakan comparative adjectives',
      'Menggunakan superlative adjectives',
      'Memahami irregular comparatives',
      'Menggunakan double dan parallel comparatives'
    ],
    material: `
## Comparatives and Superlatives

### Comparative (lebih ...):
- Short adjectives: adjective + -er + than
> "This book is **taller than** that one."

- Long adjectives: more + adjective + than
> "This book is **more interesting than** that one."

### Superlative (paling ...):
- Short adjectives: the + adjective + -est
> "This is **the tallest** building."

- Long adjectives: the most + adjective
> "This is **the most interesting** book."

### Irregular Forms:
| Adjective | Comparative | Superlative |
|-----------|-------------|-------------|
| good      | better      | best        |
| bad       | worse       | worst       |
| far       | farther/further | farthest/furthest |
| little    | less        | least       |
| many/much | more        | most        |

### Double Comparatives:
> "The **more you study**, the **better you become**."

### Parallel Structure:
> "She is **taller than** her sister **is**."

### Contoh Soal:
"This is the _____ movie I have ever seen."
a) interesting
b) more interesting
c) most interesting ✓
d) interestingly
    `,
    tips: [
      'Short adj = -er/-est, long adj = more/most',
      'Hafal irregular forms',
      'Superlative selalu dengan "the"',
      'Double comparative: the more..., the more...'
    ],
    order: 8
  },
  {
    id: 'structure-9',
    section: 'structure',
    skillId: '2.9',
    name: 'Prepositions',
    description: 'Menggunakan prepositions dengan benar',
    objectives: [
      'Memahami prepositions of time',
      'Memahami prepositions of place',
      'Menggunakan collocations dengan prepositions',
      'Menghindari kesalahan umum prepositions'
    ],
    material: `
## Prepositions

### Prepositions of Time:

**at** - waktu spesifik
> "at 5 o'clock, at noon, at night"

**on** - hari dan tanggal
> "on Monday, on July 4th, on my birthday"

**in** - bulan, tahun, periode panjang
> "in January, in 2024, in the morning"

**for** - durasi
> "for 5 years, for a long time"

**since** - titik awal
> "since 2020, since yesterday"

**by** - deadline
> "by Friday, by the end of the month"

### Prepositions of Place:

**at** - titik spesifik
> "at the bus stop, at the door"

**in** - dalam ruangan/area
> "in the room, in Jakarta"

**on** - permukaan
> "on the table, on the wall"

### Common Collocations:

**Adjective + Preposition:**
- good at, bad at
- interested in, bored with
- afraid of, scared of
- famous for

**Verb + Preposition:**
- depend on
- listen to
- wait for
- believe in
- agree with

### Contoh Soal:
"She is good _____ mathematics."
a) in
b) at ✓
c) on
d) for
    `,
    tips: [
      'Hafal collocations (verb/adj + prep)',
      'at = titik, on = permukaan, in = area',
      'for = durasi, since = titik awal',
      'Baca konteks untuk menentukan preposition'
    ],
    order: 9
  },
  {
    id: 'structure-10',
    section: 'structure',
    skillId: '2.10',
    name: 'Articles',
    description: 'Menggunakan a, an, the dengan benar',
    objectives: [
      'Memahami a vs an',
      'Memahami definite vs indefinite article',
      'Menggunakan the untuk hal spesifik',
      'Memahami zero article'
    ],
    material: `
## Articles

### A vs An:

**a** - sebelum bunyi konsonan
> "a book, a university, a European"

**an** - sebelum bunyi vokal
> "an apple, an hour, an MBA"

### Definite Article (the):

Digunakan ketika:
1. Sudah disebutkan sebelumnya
> "I saw a cat. **The cat** was black."

2. Spesifik/unique
> "**The** sun rises in the east."

3. Superlative
> "**The** best solution is..."

4. Dengan modifier yang membuat spesifik
> "**The** book on the table is mine."

### Indefinite Article (a/an):

Digunakan ketika:
1. Belum spesifik
> "I need **a** pen."

2. Menyebut profesi
> "She is **a** doctor."

3. Dalam eksklamasi
> "What **a** beautiful day!"

### Zero Article (tanpa article):

Digunakan dengan:
1. Plural nouns (general)
> "**Books** are important."

2. Uncountable nouns (general)
> "**Water** is essential."

3. Proper nouns
> "**Jakarta** is the capital."

4. Meals, sports, languages
> "I play **tennis**. She speaks **English**."

### Contoh Soal:
"_____ moon orbits _____ earth."
a) A / the
b) The / the ✓
c) The / an
d) A / an
    `,
    tips: [
      'a/an berdasarkan BUNYI, bukan huruf',
      'the untuk hal spesifik atau unique',
      'General plural/uncountable = tanpa article',
      'Proper nouns biasanya tanpa article'
    ],
    order: 10
  },
  {
    id: 'structure-11',
    section: 'structure',
    skillId: '2.11',
    name: 'Parallel Structure',
    description: 'Menjaga kesejajaran bentuk kata dalam kalimat',
    objectives: [
      'Memahami konsep parallel structure',
      'Menjaga kesejajaran nouns, verbs, adjectives',
      'Menggunakan parallel structure dengan correlatives',
      'Mengidentifikasi kesalahan parallel structure'
    ],
    material: `
## Parallel Structure

**Parallel Structure** berarti menggunakan bentuk kata yang sejajar dalam seri atau daftar.

### Aturan Dasar:
Elemen-elemen yang dihubungkan harus memiliki bentuk yang sama:
- Noun dengan noun
- Verb dengan verb
- Adjective dengan adjective
- Phrase dengan phrase

### Contoh Parallel Structure:

**Sudah Benar:**
> "She likes **reading**, **writing**, and **swimming**."
> (semua dalam bentuk gerund)

**Masih Salah:**
> "She likes **reading**, **to write**, and **swim**."
> (campuran gerund, infinitive, base form)

### Dengan Correlative Conjunctions:

**both...and:**
> "She is **both intelligent and creative**."
> (adjective + adjective)

**either...or:**
> "You can **either stay or leave**."
> (base verb + base verb)

**not only...but also:**
> "He is **not only a teacher but also a writer**."
> (noun + noun)

**neither...nor:**
> "The movie was **neither interesting nor entertaining**."
> (adjective + adjective)

### Contoh Soal:
"The job requires **analyzing data**, **writing reports**, and _____."
a) to present findings
b) present findings
c) presenting findings ✓
d) presentation of findings
    `,
    tips: [
      'Elemen sejajar harus bentuk sama',
      'Gerund dengan gerund, infinitive dengan infinitive',
      'Perhatikan both...and, either...or, not only...but also',
      'Cek: apakah semua elemen paralel?'
    ],
    order: 11
  },
  {
    id: 'structure-12',
    section: 'structure',
    skillId: '2.12',
    name: 'Word Forms',
    description: 'Memilih bentuk kata yang tepat (noun, verb, adjective, adverb)',
    objectives: [
      'Mengenali word families',
      'Memilih bentuk berdasarkan posisi dalam kalimat',
      'Memahami suffixes untuk word forms',
      'Menghindari kesalahan word form'
    ],
    material: `
## Word Forms

**Word Form** adalah kemampuan memilih bentuk kata yang tepat (noun, verb, adjective, adverb) berdasarkan konteks kalimat.

### Word Families:

Contoh word family untuk "decide":
| Form | Word | Contoh |
|------|------|--------|
| Verb | decide | "I **decide** to go." |
| Noun | decision | "The **decision** was difficult." |
| Adjective | decisive | "She is a **decisive** leader." |
| Adverb | decisively | "He acted **decisively**." |

### Suffixes:

**Noun Suffixes:**
- -tion: decision, education
- -ment: development, improvement
- -ness: happiness, darkness
- -ity: ability, creativity

**Verb Suffixes:**
- -ize: realize, organize
- -ify: simplify, modify
- -en: widen, shorten

**Adjective Suffixes:**
- -able: capable, enjoyable
- -ful: beautiful, helpful
- -ive: creative, active
- -al: educational, national

**Adverb Suffixes:**
- -ly: quickly, carefully

### Cara Menentukan Word Form:

1. **Noun** - setelah article, preposition, atau sebagai subjek/objek
> "The **decision** was difficult."

2. **Verb** - setelah subjek, setelah auxiliary
> "She **decided** to leave."

3. **Adjective** - sebelum noun, setelah be/verb
> "It was a **decisive** victory."

4. **Adverb** - menerangkan verb, adjective, atau adverb
> "She acted **decisively**."

### Contoh Soal:
"The _____ of the treaty took many years."
a) negotiate
b) negotiated
c) negotiation ✓
d) negotiable
    `,
    tips: [
      'Hafal suffixes untuk setiap word form',
      'Perhatikan posisi kata dalam kalimat',
      'Noun setelah article/preposition',
      'Adverb menerangkan verb/adjective'
    ],
    order: 12
  }
];

// ==========================================
// READING SKILLS (10 Skills)
// ==========================================

export const readingSkills: LearningSkillData[] = [
  {
    id: 'reading-1',
    section: 'reading',
    skillId: '3.1',
    name: 'Main Idea Questions',
    description: 'Menemukan ide utama passage atau paragraf',
    objectives: [
      'Mengidentifikasi thesis statement',
      'Membedakan main idea vs topic',
      'Menemukan main idea di berbagai posisi',
      'Memahami implicit main idea'
    ],
    material: `
## Main Idea Questions

Pertanyaan main idea menanyakan **ide utama** dari keseluruhan passage atau paragraf tertentu.

### Jenis Pertanyaan:
- "What is the main topic of the passage?"
- "What is the passage mainly about?"
- "The main idea of paragraph X is..."
- "Which title best expresses the main idea?"

### Lokasi Main Idea:

**1. Di awal passage (paling umum):**
> Thesis statement biasanya di paragraf pertama

**2. Di akhir passage:**
> Kesimpulan di paragraf terakhir

**3. Di tengah passage:**
> Kadang muncul di paragraf kedua atau ketiga

**4. Tersirat (implicit):**
> Tidak ada kalimat yang secara eksplisit menyatakan main idea

### Main Idea vs Topic:

- **Topic**: Subjek yang dibahas (satu kata/frasa)
- **Main Idea**: Apa yang dikatakan tentang topic (kalimat lengkap)

**Contoh:**
- Topic: "Solar energy"
- Main Idea: "Solar energy is becoming an increasingly important source of renewable power."

### Strategi:
1. Baca paragraf pertama dan terakhir
2. Cari kalimat yang meringkas isi passage
3. Tanyakan: "Apa point utama penulis?"
4. Jangan memilih jawaban yang terlalu spesifik

### Contoh Soal:
"What is the main topic of the passage?"
a) The history of aviation
b) How airplanes changed modern travel ✓
c) Famous pilots in history
d) The invention of the engine
    `,
    tips: [
      'Main idea bersifat umum, bukan detail',
      'Cari thesis statement',
      'Perhatikan paragraf pertama dan terakhir',
      'Topic ≠ Main Idea'
    ],
    order: 1
  },
  {
    id: 'reading-2',
    section: 'reading',
    skillId: '3.2',
    name: 'Supporting Details',
    description: 'Menemukan informasi detail dalam passage',
    objectives: [
      'Mencari informasi spesifik',
      'Mengidentifikasi examples',
      'Menemukan causes dan effects',
      'Mengidentifikasi sequences'
    ],
    material: `
## Supporting Details

Pertanyaan detail menanyakan **informasi spesifik** yang disebutkan dalam passage.

### Jenis Pertanyaan:
- "According to paragraph 2, ..."
- "The author mentions that..."
- "Which of the following is mentioned in the passage?"
- "All of the following are true EXCEPT..."

### Strategi Menjawab:

**1. Scan untuk keyword**
- Cari kata kunci dari pertanyaan dalam passage
- Baca kalimat yang mengandung keyword

**2. Perhatikan penanda:**
- **Examples**: for example, for instance, such as
- **Lists**: first, second, third, finally
- **Causes**: because, since, the reason is
- **Effects**: therefore, as a result, consequently

**3. Jangan mengandalkan memory**
- Selalu kembali ke passage
- Baca konteks di sekitar keyword

### Contoh:
**Pertanyaan:** "According to paragraph 2, when did the Industrial Revolution begin?"

**Strategi:**
1. Pergi ke paragraph 2
2. Cari kata "Industrial Revolution" dan "begin"
3. Baca kalimat tersebut
4. Pilih jawaban yang sesuai

### Tips Scanning:
- Gunakan jari atau kursor untuk membantu
- Baca dengan cepat, fokus pada keyword
- Perhatikan nama, tanggal, angka
    `,
    tips: [
      'Scanning = cepat mencari keyword',
      'Selalu kembali ke passage',
      'Perhatikan penanda detail (for example, because)',
      'Jangan mengandalkan memori'
    ],
    order: 2
  },
  {
    id: 'reading-3',
    section: 'reading',
    skillId: '3.3',
    name: 'Vocabulary in Context',
    description: 'Menentukan arti kata berdasarkan konteks',
    objectives: [
      'Menggunakan context clues',
      'Memahami synonym dan antonym clues',
      'Memahami definition dan example clues',
      'Menggunakan word part clues'
    ],
    material: `
## Vocabulary in Context

Pertanyaan vocabulary menanyakan arti kata **berdasarkan konteks**, bukan arti kamus.

### Jenis Pertanyaan:
- "The word 'X' in line Y is closest in meaning to..."
- "In line Y, the word 'X' refers to..."

### Context Clues:

**1. Synonym Clues:**
> "The arduous, or difficult, journey took three months."
> (arduous = difficult)

**2. Antonym Clues:**
> "Unlike his gregarious brother, John is quite introverted."
> (gregarious ≠ introverted)

**3. Definition Clues:**
> "Photosynthesis, the process by which plants make food, is essential."
> (Photosynthesis = process by which plants make food)

**4. Example Clues:**
> "Celestial bodies, such as the sun and moon, influence tides."
> (Celestial bodies = sun, moon, dll)

**5. Inference from Context:**
> "The stringent rules prohibited any form of cheating."
> (stringent = strict, karena ada larangan)

### Word Parts:
- **Prefixes**: un-, re-, pre-, dis-
- **Suffixes**: -tion, -ment, -ness
- **Roots**: port (carry), spec (look), dict (say)

### Strategi:
1. Baca kalimat dengan kata tersebut
2. Baca kalimat sebelum dan sesudahnya
3. Cari clue dalam konteks
4. Ganti kata dengan pilihan, mana yang cocok?

### Contoh:
"The word 'arduous' in line 5 is closest in meaning to _____."
a) easy
b) difficult ✓
c) pleasant
d) brief
    `,
    tips: [
      'Baca konteks, bukan mengandalkan arti kamus',
      'Cari synonym/antonym dalam kalimat',
      'Perhatikan tanda baca (koma, tanda kurung)',
      'Test pilihan dengan mengganti kata'
    ],
    order: 3
  },
  {
    id: 'reading-4',
    section: 'reading',
    skillId: '3.4',
    name: 'Reference Questions',
    description: 'Menentukan apa yang dirujuk oleh pronoun dalam passage',
    objectives: [
      'Mengidentifikasi personal pronouns',
      'Mengidentifikasi demonstrative pronouns',
      'Mengidentifikasi relative pronouns',
      'Memahami noun reference'
    ],
    material: `
## Reference Questions

Pertanyaan reference menanyakan **apa yang dirujuk** oleh kata ganti dalam passage.

### Jenis Pertanyaan:
- "The word 'it' in line Y refers to..."
- "In saying 'these', the author refers to..."
- "'They' in paragraph X refers to..."

### Jenis Pronouns:

**1. Personal Pronouns:**
- he, she, it, they
- him, her, them

**2. Demonstrative Pronouns:**
- this, that, these, those

**3. Relative Pronouns:**
- who, whom, whose, which, that

**4. Possessive Pronouns:**
- his, her, its, their

**5. Indefinite Pronouns:**
- one, some, others, another

### Strategi:

**1. Cari noun terdekat SEBELUM pronoun**
> "The scientists conducted experiments. **These** showed remarkable results."
> "These" mengacu pada "experiments"

**2. Perhatikan number (singular/plural)**
> "it" = singular noun
> "they" = plural noun

**3. Perhatikan gender**
> "he" = male, "she" = female

**4. Baca konteks**
> Kadang referent bukan noun terdekat

### Contoh Soal:
"The scientists conducted experiments. **These** showed remarkable results."
"The word 'These' refers to _____."
a) scientists
b) experiments ✓
c) results
d) tests
    `,
    tips: [
      'Cari noun terdekat sebelum pronoun',
      'Perhatikan singular/plural',
      'Konteks menentukan referent yang benar',
      'Baca beberapa kalimat sebelum pronoun'
    ],
    order: 4
  },
  {
    id: 'reading-5',
    section: 'reading',
    skillId: '3.5',
    name: 'Inference Questions',
    description: 'Menyimpulkan informasi yang tidak secara eksplisit ditulis',
    objectives: [
      'Menyimpulkan dari informasi yang diberikan',
      'Menghubungkan informasi dari berbagai bagian',
      'Menyimpulkan sikap penulis',
      'Membuat logical conclusions'
    ],
    material: `
## Inference Questions

Pertanyaan inference menanyakan **apa yang dapat disimpulkan** dari passage, meskipun tidak secara eksplisit ditulis.

### Jenis Pertanyaan:
- "It can be inferred from the passage that..."
- "What is implied in paragraph X?"
- "The author suggests that..."
- "Which of the following can be concluded?"

### Strategi:

**1. Gunakan informasi yang diberikan**
> Inference = informasi yang ada + logika

**2. Jangan over-interpret**
> Kesimpulan harus dekat dengan teks

**3. Hubungkan beberapa informasi**
> Kadang perlu menggabungkan dari berbagai bagian

**4. Perhatikan tone dan pilihan kata**
> Memberikan petunjuk tentang sikap penulis

### Contoh:

**Teks:**
> "The new policy was met with resistance from employees. Many refused to comply, and productivity dropped significantly in the first month."

**Pertanyaan:** It can be inferred that the employees...
**Inference:** ...did not support the new policy.

**Bukan Inference:**
- "Employees hated the management" (terlalu jauh)
- "The company will go bankrupt" (tidak ada bukti)

### Petunjuk Inference:
- "suggests" = menyiratkan
- "implies" = mengandaikan
- "probably" = kemungkinan besar
- "most likely" = paling mungkin
    `,
    tips: [
      'Inference = text evidence + logic',
      'Jangan terlalu jauh dari teks',
      'Hubungkan beberapa informasi',
      'Pilih jawaban yang paling didukung teks'
    ],
    order: 5
  },
  {
    id: 'reading-6',
    section: 'reading',
    skillId: '3.6',
    name: 'Purpose Questions',
    description: 'Memahami mengapa penulis menyertakan informasi tertentu',
    objectives: [
      'Memahami tujuan contoh',
      'Memahami tujuan statistik',
      'Memahami tujuan kutipan',
      'Menghubungkan dengan main idea'
    ],
    material: `
## Purpose Questions

Pertanyaan purpose menanyakan **MENGAPA** penulis menyertakan informasi tertentu.

### Jenis Pertanyaan:
- "Why does the author mention...?"
- "The purpose of paragraph X is to..."
- "Why is X mentioned in the passage?"
- "The author discusses X in order to..."

### Tujuan Umum:

**1. To illustrate/exemplify**
> Memberikan contoh untuk poin utama

**2. To support**
> Memberikan bukti untuk argumen

**3. To contrast**
> Membandingkan dengan poin sebelumnya

**4. To explain**
> Memperjelas konsep

**5. To criticize**
> Mengkritik pendapat atau situasi

**6. To introduce**
> Memperkenalkan topik baru

### Strategi:

**1. Identifikasi informasi yang ditanyakan**
> Apa yang disebutkan?

**2. Baca konteks sebelum dan sesudahnya**
> Informasi ini dikaitkan dengan apa?

**3. Hubungkan dengan main idea**
> Bagaimana informasi ini mendukung main idea?

### Contoh:
**Teks:**
> "Many factors contribute to climate change. **For example, deforestation removes trees that absorb carbon dioxide.**"

**Pertanyaan:** Why does the author mention deforestation?
**Jawaban:** To give an example of a factor that contributes to climate change.
    `,
    tips: [
      'Hubungkan dengan main idea',
      'Contoh biasanya untuk illustrate',
      'Statistik untuk support',
      'Baca konteks sebelum/sesudah'
    ],
    order: 6
  },
  {
    id: 'reading-7',
    section: 'reading',
    skillId: '3.7',
    name: 'Organization Questions',
    description: 'Memahami bagaimana passage disusun',
    objectives: [
      'Mengidentifikasi pola organisasi',
      'Memahami chronological order',
      'Memahami cause-effect structure',
      'Memahami problem-solution structure'
    ],
    material: `
## Organization Questions

Pertanyaan organization menanyakan **bagaimana passage disusun** atau diatur.

### Jenis Pertanyaan:
- "How is the passage organized?"
- "Which paragraph discusses...?"
- "The passage is organized by..."

### Pola Organisasi:

**1. Chronological (Waktu):**
> Urutan kejadian berdasarkan waktu
> Signal: first, then, next, finally, before, after

**2. Cause and Effect:**
> Sebab-akibat
> Signal: because, therefore, as a result, consequently

**3. Compare and Contrast:**
> Perbandingan
> Signal: similarly, in contrast, however, on the other hand

**4. Problem and Solution:**
> Masalah dan solusi
> Signal: the problem is, one solution is, to address this

**5. General to Specific:**
> Dari umum ke detail
> Signal: for example, for instance, specifically

**6. Question and Answer:**
> Pertanyaan dan jawaban
> Signal: why? because, the answer is

**7. Listing:**
> Daftar item
> Signal: first, second, third, finally

### Contoh Soal:
"How is the passage organized?"
a) A problem is presented and solutions are proposed ✓
b) Events are described in chronological order
c) Two opposing views are compared
d) A theory is explained and then refuted
    `,
    tips: [
      'Perhatikan transition words',
      'Identifikasi pola dari awal passage',
      'Chronological = waktu, Cause-effect = sebab-akibat',
      'Problem-solution = masalah + solusi'
    ],
    order: 7
  },
  {
    id: 'reading-8',
    section: 'reading',
    skillId: '3.8',
    name: 'Tone and Attitude',
    description: 'Mengidentifikasi sikap penulis terhadap topik',
    objectives: [
      'Mengidentifikasi positive tone',
      'Mengidentifikasi negative tone',
      'Mengidentifikasi neutral tone',
      'Mengenali word choice yang menunjukkan tone'
    ],
    material: `
## Tone and Attitude

Pertanyaan tone/attitude menanyakan **sikap perasaan penulis** terhadap topik yang dibahas.

### Jenis Pertanyaan:
- "The author's attitude toward X is..."
- "The tone of the passage is..."
- "Which word best describes the author's attitude?"

### Kategori Tone:

**Positive:**
- Enthusiastic, optimistic, supportive
- Admiring, appreciative, approving
- Confident, certain, hopeful

**Negative:**
- Critical, skeptical, doubtful
- Disappointed, concerned, worried
- Pessimistic, cynical, dismissive

**Neutral/Objective:**
- Factual, informative, impartial
- Analytical, detached, unbiased

### Kata-kata yang Menunjukkan Tone:

**Positive words:**
- excellent, impressive, successful, beneficial
- innovative, remarkable, outstanding

**Negative words:**
- disappointing, problematic, flawed, inadequate
- concerning, alarming, regrettable

**Neutral words:**
- states, notes, observes, indicates
- according to, suggests that

### Strategi:
1. Perhatikan pilihan kata (diction)
2. Perhatikan adjective yang digunakan
3. Baca keseluruhan passage
4. Perhatikan tidak ada bias

### Contoh Soal:
"The author's attitude toward the new policy is _____."
a) enthusiastic
b) critical ✓
c) indifferent
d) confused
    `,
    tips: [
      'Perhatikan adjective dan pilihan kata',
      'Positive words = positive tone',
      'Factual words = neutral tone',
      'Baca keseluruhan untuk memahami sikap'
    ],
    order: 8
  },
  {
    id: 'reading-9',
    section: 'reading',
    skillId: '3.9',
    name: 'EXCEPT/NOT Questions',
    description: 'Menemukan informasi yang TIDAK disebutkan dalam passage',
    objectives: [
      'Menggunakan process of elimination',
      'Mencari tiga jawaban yang BENAR',
      'Mengidentifikasi apa yang tidak ada di passage',
      'Memahami negative questions'
    ],
    material: `
## EXCEPT/NOT Questions

Pertanyaan EXCEPT/NOT menanyakan apa yang **TIDAK** sesuai dengan passage.

### Jenis Pertanyaan:
- "All of the following are mentioned EXCEPT..."
- "Which of the following is NOT true?"
- "The author mentions all of the following EXCEPT..."

### Strategi:

**1. Process of Elimination (MUTLAK):**
- Cari 3 jawaban yang BENAR sesuai passage
- Jawaban yang salah/tidak disebutkan adalah jawaban

**2. Cross-check setiap opsi:**
- Untuk setiap opsi, tanyakan: "Apakah ini ada di passage?"
- Jika ADA = bukan jawaban
- Jika TIDAK ADA = jawaban yang dicari

**3. Perhatikan detail:**
- Kadang jawaban hampir sama dengan teks tapi ada sedikit perbedaan
- Perbedaan kecil bisa membuat jawaban salah

### Contoh:

**Passage:**
> "The university offers scholarships for academic excellence, athletic achievement, and community service."

**Pertanyaan:** All of the following are mentioned as scholarship criteria EXCEPT:
- a) Academic excellence (ADA - bukan jawaban)
- b) Athletic achievement (ADA - bukan jawaban)
- c) Community service (ADA - bukan jawaban)
- d) Financial need ✓ (TIDAK ADA - ini jawabannya)

### Tips:
- Jangan terburu-buru memilih yang pertama kelihatan benar
- Pastikan 3 lainnya BENAR-BENAR ada di passage
- Perhatikan kata-kata seperti "all", "never", "always"
    `,
    tips: [
      'Cari 3 yang BENAR, sisanya adalah jawaban',
      'Cross-check setiap opsi dengan passage',
      'Perhatikan detail kecil',
      'Jangan mengandalkan memori'
    ],
    order: 9
  },
  {
    id: 'reading-10',
    section: 'reading',
    skillId: '3.10',
    name: 'Sentence Simplification',
    description: 'Menyederhanakan kalimat kompleks tanpa mengubah makna',
    objectives: [
      'Mengidentifikasi informasi utama',
      'Mengabaikan detail kurang penting',
      'Menyederhanakan complex sentences',
      'Mempertahankan makna asli'
    ],
    material: `
## Sentence Simplification

Pertanyaan sentence simplification menanyakan **kalimat yang menyatakan informasi penting** dari kalimat kompleks.

### Jenis Pertanyaan:
- "Which sentence best expresses the essential information?"
- "Which of the following best restates the sentence?"
- "The sentence below is closest in meaning to..."

### Strategi:

**1. Identifikasi MAIN CLAUSE**
> Klausa utama mengandung informasi penting

**2. Abaikan modifier kurang penting:**
- Relative clauses: "who...", "which..."
- Prepositional phrases: "in...", "at...", "with..."
- Adjective/adverb yang tidak esensial

**3. Pertahankan makna utama**
> Jangan mengubah atau menambah informasi

**4. Waspadai:**
- Jawaban yang kehilangan informasi penting
- Jawaban yang menambah informasi
- Jawaban yang mengubah makna

### Contoh:

**Original:**
> "Despite the numerous challenges faced during the initial phase, the team persevered and ultimately achieved remarkable success that exceeded all expectations."

**Which best expresses the essential information?**

a) The team succeeded despite early difficulties ✓
> (Benar - informasi utama)

b) The team faced many challenges
> (Kurang - tidak menyebut success)

c) Success was expected from the beginning
> (Salah - mengubah makna "exceeded expectations")

d) The initial phase was very long
> (Salah - tidak ada di kalimat asli)

### Tips:
- Cari subjek, kata kerja, dan objek utama
- Hapus kata-kata yang tidak esensial
- Pastikan makna tidak berubah
    `,
    tips: [
      'Fokus pada main clause',
      'Abaikan detail pendukung',
      'Jangan mengubah makna',
      'Hindari jawaban yang kehilangan info penting'
    ],
    order: 10
  }
];

// Export all skills
export const allLearningSkills: LearningSkillData[] = [
  ...listeningSkills,
  ...structureSkills,
  ...readingSkills
];

// Get skills by section
export function getSkillsBySection(section: 'listening' | 'structure' | 'reading'): LearningSkillData[] {
  return allLearningSkills.filter(s => s.section === section);
}

// Get skill by ID
export function getSkillById(skillId: string): LearningSkillData | undefined {
  return allLearningSkills.find(s => s.skillId === skillId);
}
