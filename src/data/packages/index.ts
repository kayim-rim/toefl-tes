// TOEFL ITP Question Packages - Based on Official Standards
// Each package contains 140 questions (50 Listening, 40 Structure, 50 Reading)

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

// Import all packages
import { packageA as pkgA } from './package-a';
import { packageB as pkgB } from './package-b';
import { packageC as pkgC } from './package-c';
import { packageD as pkgD } from './package-d';

// Export packages with consistent naming
export const packages: QuestionPackage[] = [
  { id: 'A', name: 'Paket A', description: 'Practice Test 1', listening: pkgA.listening, structure: pkgA.structure, reading: pkgA.reading },
  { id: 'B', name: 'Paket B', description: 'Practice Test 2', listening: pkgB.listening, structure: pkgB.structure, reading: pkgB.reading },
  { id: 'C', name: 'Paket C', description: 'Practice Test 3', listening: pkgC.listening, structure: pkgC.structure, reading: pkgC.reading },
  { id: 'D', name: 'Paket D', description: 'Practice Test 4', listening: pkgD.listening, structure: pkgD.structure, reading: pkgD.reading },
];

// Export individual packages
export const packageA = packages[0];
export const packageB = packages[1];
export const packageC = packages[2];
export const packageD = packages[3];

// Export as record for easy lookup
export const questionPackages: Record<string, QuestionPackage> = {
  A: packageA,
  B: packageB,
  C: packageC,
  D: packageD,
};

// Score calculation function based on TOEFL ITP standards
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
