'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Trophy, Home, Headphones, PenTool, BookOpen } from 'lucide-react';

interface ResultData {
  id: string;
  name: string;
  institution: string | null;
  package_id: string;
  listening_score: number;
  structure_score: number;
  reading_score: number;
  total_score: number;
  listening_raw: number;
  structure_raw: number;
  reading_raw: number;
  created_at: string;
}

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resultId = useMemo(() => searchParams.get('id'), [searchParams]);

  useEffect(() => {
    let mounted = true;

    async function fetchResult() {
      if (resultId) {
        try {
          const res = await fetch(`/api/test-result/${resultId}`);
          const data = await res.json();
          if (mounted && data.result) {
            setResult(data.result);
          }
        } catch (err) {
          console.error('Error fetching result:', err);
        } finally {
          if (mounted) setIsLoading(false);
        }
      } else {
        // Try to get from sessionStorage (fallback)
        const resultStr = sessionStorage.getItem('testResult');
        if (resultStr) {
          try {
            const parsed = JSON.parse(resultStr);
            if (mounted) setResult(parsed);
          } catch (error) {
            console.error('Error parsing result:', error);
          }
        }
        if (mounted) setIsLoading(false);
      }
    }

    fetchResult();

    return () => {
      mounted = false;
    };
  }, [resultId]);

  const getScoreColor = (score: number) => {
    if (score >= 550) return 'text-emerald-400';
    if (score >= 450) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGrade = (total: number) => {
    if (total >= 600) return { grade: 'A', desc: 'Excellent!' };
    if (total >= 550) return { grade: 'B+', desc: 'Very Good!' };
    if (total >= 500) return { grade: 'B', desc: 'Good' };
    if (total >= 450) return { grade: 'C+', desc: 'Fair' };
    return { grade: 'C', desc: 'Need Improvement' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">No result found</p>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const { grade, desc } = getGrade(result.total_score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Test Result</h1>
              <p className="text-xs text-slate-400">TOEFL ITP Score</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Total Score Card */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className="bg-slate-600 text-slate-300 mb-4">
                {result.package_id} • {new Date(result.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Badge>
              
              <div className="mb-4">
                <div className="text-slate-400 text-sm mb-1">Total Score</div>
                <div className={`text-6xl font-bold ${getScoreColor(result.total_score)}`}>
                  {result.total_score}
                </div>
                <div className="text-slate-500 text-sm mt-1">out of 677</div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Badge className="bg-emerald-500/20 text-emerald-400 text-lg px-4 py-1">
                  Grade: {grade}
                </Badge>
                <span className="text-slate-400">{desc}</span>
              </div>

              <p className="text-slate-300 mt-4">
                {result.name}{result.institution && ` • ${result.institution}`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section Scores */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2 text-center">
              <Headphones className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <CardTitle className="text-sm text-slate-400">Listening</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-blue-400">{result.listening_score}</div>
              <div className="text-xs text-slate-500 mt-1">
                {result.listening_raw}/50 correct ({Math.round((result.listening_raw / 50) * 100)}%)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2 text-center">
              <PenTool className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <CardTitle className="text-sm text-slate-400">Structure</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{result.structure_score}</div>
              <div className="text-xs text-slate-500 mt-1">
                {result.structure_raw}/40 correct ({Math.round((result.structure_raw / 40) * 100)}%)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2 text-center">
              <BookOpen className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <CardTitle className="text-sm text-slate-400">Reading</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-purple-400">{result.reading_score}</div>
              <div className="text-xs text-slate-500 mt-1">
                {result.reading_raw}/50 correct ({Math.round((result.reading_raw / 50) * 100)}%)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <Link href="/test">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              Take Another Test
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
