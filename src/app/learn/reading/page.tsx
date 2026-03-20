'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle, Circle, PlayCircle, Loader2 } from 'lucide-react';
import { readingSkills } from '@/data/learning/skills';

interface ProgressData {
  [skillId: string]: {
    answered: number;
    correct: number;
    completed: boolean;
  };
}

export default function ReadingSectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressData>({});

  useEffect(() => {
    checkAuth();
    fetchProgress();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/learn/progress?section=reading');
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress || {});
      }
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/learn" className="text-slate-400 hover:text-slate-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Reading Skills</h1>
                <p className="text-xs text-slate-400">10 Skills • 100 Questions</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Skills List */}
        <div className="space-y-4">
          {readingSkills.map((skill) => {
            const skillProgress = progress[skill.skillId] || { answered: 0, correct: 0, completed: false };
            const percentage = Math.round((skillProgress.answered / 10) * 100);
            const accuracy = skillProgress.answered > 0 
              ? Math.round((skillProgress.correct / skillProgress.answered) * 100) 
              : 0;

            return (
              <Link key={skill.id} href={`/learn/skill/${skill.skillId}`}>
                <Card className="bg-slate-800/80 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          skillProgress.completed 
                            ? 'bg-emerald-500/20' 
                            : skillProgress.answered > 0 
                              ? 'bg-purple-500/20' 
                              : 'bg-slate-700'
                        }`}>
                          {skillProgress.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : skillProgress.answered > 0 ? (
                            <PlayCircle className="w-5 h-5 text-purple-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-sm">Skill {skill.skillId}</span>
                            {skillProgress.completed && (
                              <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">
                                Selesai
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-white font-medium">{skill.name}</h3>
                          <p className="text-slate-400 text-sm line-clamp-1">{skill.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-white font-medium">{percentage}%</div>
                          <div className="text-slate-500 text-xs">
                            {skillProgress.answered}/10 • {accuracy}% benar
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      </div>
                    </div>
                    {skillProgress.answered > 0 && (
                      <div className="mt-3">
                        <Progress value={percentage} className="h-1.5" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
