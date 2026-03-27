'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, XCircle,
  Lightbulb, Target, BookOpen, Loader2, Bookmark, BookmarkCheck
} from 'lucide-react';
import { getSkillById } from '@/data/learning/skills';
import { useLearningAccess } from '@/hooks/useLearningAccess';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  audioScript?: string;
  explanation: string;
  whyCorrect: string;
  whyWrong?: string;
}

export default function SkillLearningPage() {
  const params = useParams();
  const skillId = params.skillId as string;

  const { isLoading: isLoadingAuth, hasAccess } = useLearningAccess();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isBookmarked, setIsBookmarked] = useState(false);

  const skill = getSkillById(skillId);

  // Generate questions for this skill (in real app, these would come from database)
  const questions: Question[] = generateQuestions(skillId);

  const handleAnswer = async (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));

    // Save progress
    try {
      await fetch('/api/learn/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId,
          questionIndex: currentQuestion,
          answer: answerIndex,
          correct: answerIndex === questions[currentQuestion].correctAnswer,
        }),
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsBookmarked(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
      setShowExplanation(answers[currentQuestion - 1] !== undefined);
      setIsBookmarked(false);
    }
  };

  const toggleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    // Save bookmark to database
    try {
      await fetch('/api/learn/bookmark', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId,
          questionIndex: currentQuestion,
        }),
      });
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Will redirect via hook
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Skill tidak ditemukan</h1>
          <Link href="/learn">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Kembali ke Learning Center
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  const correctCount = Object.entries(answers).filter(
    ([idx, ans]) => questions[parseInt(idx)]?.correctAnswer === ans
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link 
              href={`/learn/${skill.section}`} 
              className="text-slate-400 hover:text-slate-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke {skill.section.charAt(0).toUpperCase() + skill.section.slice(1)}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBookmark}
              className="text-slate-400 hover:text-slate-200"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{skill.name}</h1>
              <p className="text-sm text-slate-400">Skill {skill.skillId}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-slate-800 text-slate-300">
                {currentQuestion + 1}/{questions.length}
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300">
                {correctCount} Benar
              </Badge>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2 mt-3" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Learning Material (show before first question) */}
        {currentQuestion === 0 && !showExplanation && (
          <Card className="mb-6 bg-slate-800/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Materi Pembelajaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Objectives */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  Tujuan Pembelajaran
                </h3>
                <ul className="space-y-1">
                  {skill.objectives.map((obj, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material Content */}
              <div className="prose prose-invert prose-sm max-w-none">
                <div 
                  className="text-slate-200"
                  dangerouslySetInnerHTML={{ 
                    __html: skill.material
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-white mt-6 mb-3">$1</h2>')
                      .replace(/^- (.*$)/gm, '<li class="text-slate-300">$1</li>')
                      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-emerald-500 pl-4 my-2 text-slate-300 italic">$1</blockquote>')
                      .replace(/\n\n/g, '</p><p class="my-2">')
                  }} 
                />
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <h3 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Tips & Trik
                </h3>
                <ul className="space-y-1">
                  {skill.tips.map((tip, idx) => (
                    <li key={idx} className="text-amber-200 text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Card */}
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Soal #{currentQuestion + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-lg mb-6">{question.question}</p>
            
            <RadioGroup
              value={selectedAnswer?.toString() ?? ""}
              className="space-y-3"
            >
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                
                let optionClass = "bg-slate-700/30 border-slate-600 hover:border-slate-500";
                if (showExplanation) {
                  if (isCorrectAnswer) {
                    optionClass = "bg-emerald-500/20 border-emerald-500";
                  } else if (isSelected && !isCorrectAnswer) {
                    optionClass = "bg-red-500/20 border-red-500";
                  }
                } else if (isSelected) {
                  optionClass = "bg-blue-500/20 border-blue-500";
                }

                return (
                  <div
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${optionClass}`}
                  >
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      disabled={showExplanation}
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="text-slate-200 cursor-pointer flex-1 flex items-center gap-3"
                    >
                      <span className="font-semibold w-6">({String.fromCharCode(65 + index)})</span>
                      <span>{option}</span>
                      {showExplanation && isCorrectAnswer && (
                        <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto" />
                      )}
                      {showExplanation && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                      )}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <h4 className="text-white font-semibold mb-2">Penjelasan:</h4>
                <p className="text-slate-300 text-sm mb-3">{question.explanation}</p>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <div>
                      <span className="text-emerald-400 font-medium">Jawaban Benar: </span>
                      <span className="text-slate-300">{question.whyCorrect}</span>
                    </div>
                  </div>
                  
                  {question.whyWrong && (
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                      <div>
                        <span className="text-red-400 font-medium">Mengapa Salah: </span>
                        <span className="text-slate-300">{question.whyWrong}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-slate-600 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Sebelumnya
            </Button>
            
            {showExplanation && (
              <Button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="bg-gradient-to-r from-emerald-500 to-teal-500"
              >
                {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}

// Helper function to generate questions for a skill
function generateQuestions(skillId: string): Question[] {
  // In a real app, these would come from database
  // For now, generate sample questions based on skill type
  
  const questionTemplates: Record<string, Question[]> = {
    '1.1': [
      {
        id: 1,
        question: "What are the speakers mainly discussing?",
        options: ["A homework assignment", "The Industrial Revolution", "The online library", "History class"],
        correctAnswer: 0,
        explanation: "Pembicara membahas tugas sejarah dan cara mencari sumber. Topik utama adalah tugas tersebut, bukan detail spesifik seperti Revolusi Industri.",
        whyCorrect: "Jawaban A benar karena seluruh percakapan berfokus pada tugas sejarah dan kesulitan mencari sumber.",
        whyWrong: "Jawaban B terlalu spesifik - itu hanya detail dari tugas, bukan topik utama."
      },
      // Add more questions...
    ],
    // Add more skills...
  };

  // Return questions or generate generic ones
  return questionTemplates[skillId] || Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    question: `Sample question ${i + 1} for skill ${skillId}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
    explanation: "This is a sample explanation for the question.",
    whyCorrect: "Option A is correct because...",
    whyWrong: "Other options are incorrect because..."
  }));
}
