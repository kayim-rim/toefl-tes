'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Clock, Headphones, PenTool, BookOpen, Send, AlertCircle } from 'lucide-react';
import { packages, calculateScores, ListeningQuestion, StructureQuestion, ReadingPassage } from '@/data/packages';
import { AudioPlayer } from '@/components/AudioPlayer';

type Section = 'listening' | 'structure' | 'reading';

export default function ExamPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<Section>('listening');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    listening: Record<number, number>;
    structure: Record<number, number>;
    reading: Record<number, number>;
  }>({ listening: {}, structure: {}, reading: {} });
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes for listening
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packageData, setPackageData] = useState<typeof packages[0] | null>(null);

  useEffect(() => {
    const pkgId = sessionStorage.getItem('testPackage') || 'A';
    const pkg = packages.find(p => p.id === pkgId);
    if (pkg) {
      setPackageData(pkg);
    }
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestions = useCallback(() => {
    if (!packageData) return [];
    switch (currentSection) {
      case 'listening':
        return packageData.listening;
      case 'structure':
        return packageData.structure;
      case 'reading':
        return packageData.reading.flatMap(p => p.questions);
      default:
        return [];
    }
  }, [packageData, currentSection]);

  const getTotalQuestions = useCallback(() => {
    if (!packageData) return 0;
    return packageData.listening.length + packageData.structure.length + 
           packageData.reading.reduce((acc, p) => acc + p.questions.length, 0);
  }, [packageData]);

  const getAnsweredCount = useCallback(() => {
    return Object.keys(answers.listening).length + 
           Object.keys(answers.structure).length + 
           Object.keys(answers.reading).length;
  }, [answers]);

  const getCurrentQuestion = useCallback(() => {
    const questions = getCurrentQuestions();
    return questions[currentQuestionIndex];
  }, [getCurrentQuestions, currentQuestionIndex]);

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentSection]: {
        ...prev[currentSection],
        [questionId]: answer
      }
    }));
  };

  const goToNextQuestion = () => {
    const questions = getCurrentQuestions();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const switchSection = (section: Section) => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
    // Set time based on section
    switch (section) {
      case 'listening':
        setTimeLeft(40 * 60);
        break;
      case 'structure':
        setTimeLeft(25 * 60);
        break;
      case 'reading':
        setTimeLeft(55 * 60);
        break;
    }
  };

  const handleSubmit = async () => {
    if (!packageData) return;
    setIsSubmitting(true);

    try {
      const scores = calculateScores(
        answers.listening,
        answers.structure,
        answers.reading,
        packageData.listening,
        packageData.structure,
        packageData.reading
      );

      const name = sessionStorage.getItem('testName') || 'Anonymous';
      const institution = sessionStorage.getItem('testInstitution') || '';

      const response = await fetch('/api/test-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          institution,
          packageId: packageData.id,
          ...scores,
          answers: { ...answers.listening, ...answers.structure, ...answers.reading }
        })
      });

      const data = await response.json();
      
      // Clear session storage
      sessionStorage.removeItem('testName');
      sessionStorage.removeItem('testInstitution');
      sessionStorage.removeItem('testPackage');

      // Navigate to result page
      router.push(`/test/result?id=${data.id}`);
    } catch (error) {
      console.error('Submit error:', error);
      alert('Gagal menyimpan hasil test');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!packageData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const questions = getCurrentQuestions();
  const currentQuestion = getCurrentQuestion();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-white">{packageData.name}</h1>
                <p className="text-xs text-slate-400">TOEFL ITP Simulation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Progress */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-slate-400">{getAnsweredCount()}/{getTotalQuestions()} dijawab</span>
                <Progress value={(getAnsweredCount() / getTotalQuestions()) * 100} className="w-32" />
              </div>
              
              {/* Timer */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeLeft < 300 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-white'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex gap-2 mt-3">
            <Button
              variant={currentSection === 'listening' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchSection('listening')}
              className={currentSection === 'listening' ? 'bg-blue-500' : 'border-slate-600 text-slate-300'}
            >
              <Headphones className="w-4 h-4 mr-1" /> Listening ({packageData.listening.length})
            </Button>
            <Button
              variant={currentSection === 'structure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchSection('structure')}
              className={currentSection === 'structure' ? 'bg-emerald-500' : 'border-slate-600 text-slate-300'}
            >
              <PenTool className="w-4 h-4 mr-1" /> Structure ({packageData.structure.length})
            </Button>
            <Button
              variant={currentSection === 'reading' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchSection('reading')}
              className={currentSection === 'reading' ? 'bg-purple-500' : 'border-slate-600 text-slate-300'}
            >
              <BookOpen className="w-4 h-4 mr-1" /> Reading ({packageData.reading.reduce((acc, p) => acc + p.questions.length, 0)})
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Number */}
        <div className="mb-4 text-sm text-slate-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {/* Audio Player for Listening Section */}
        {currentSection === 'listening' && (
          <div className="mb-6">
            <AudioPlayer 
              questionId={(currentQuestion as ListeningQuestion)?.id || 1}
              part={(currentQuestion as ListeningQuestion)?.part || 'A'}
            />
          </div>
        )}

        {/* Listening Conversation/Talk Text */}
        {currentSection === 'listening' && (currentQuestion as ListeningQuestion)?.conversation && (
          <Card className="bg-slate-800/50 border-blue-500/30 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-400 text-sm flex items-center gap-2">
                <Headphones className="w-4 h-4" /> Conversation Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-300 text-sm whitespace-pre-line bg-slate-900/50 p-4 rounded-lg">
                {(currentQuestion as ListeningQuestion)?.conversation}
              </div>
            </CardContent>
          </Card>
        )}

        {currentSection === 'listening' && (currentQuestion as ListeningQuestion)?.talk && (
          <Card className="bg-slate-800/50 border-blue-500/30 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-400 text-sm flex items-center gap-2">
                <Headphones className="w-4 h-4" /> Talk/Lecture Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-300 text-sm whitespace-pre-line bg-slate-900/50 p-4 rounded-lg">
                {(currentQuestion as ListeningQuestion)?.talk}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Card */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              {currentSection === 'listening' && (currentQuestion as ListeningQuestion)?.question}
              {currentSection === 'structure' && (currentQuestion as StructureQuestion)?.sentence}
              {currentSection === 'reading' && (currentQuestion as any)?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Options */}
            <RadioGroup
              value={answers[currentSection][(currentQuestion as any)?.id]?.toString() || ''}
              onValueChange={(value) => handleAnswer((currentQuestion as any)?.id, parseInt(value))}
              className="space-y-3"
            >
              {(currentSection === 'reading' 
                ? (currentQuestion as any)?.options 
                : currentQuestion?.options
              )?.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    answers[currentSection][(currentQuestion as any)?.id] === index
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => handleAnswer((currentQuestion as any)?.id, index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="border-slate-500" />
                  <Label htmlFor={`option-${index}`} className="text-slate-200 cursor-pointer flex-1">
                    <span className="text-blue-400 font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="border-slate-600 text-slate-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>

          <div className="flex gap-2">
            {currentSection === 'reading' && currentQuestionIndex === questions.length - 1 ? (
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Submit Test</>
                )}
              </Button>
            ) : (
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={goToNextQuestion}
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <Card className="bg-slate-800 border-slate-700 mt-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-400">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, index) => {
                const isAnswered = answers[currentSection][(q as any)?.id] !== undefined;
                const isCurrent = index === currentQuestionIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                      isCurrent
                        ? 'bg-blue-500 text-white'
                        : isAnswered
                        ? 'bg-green-500/20 text-green-400 border border-green-500'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
