'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, ClipboardList, Loader2, Home, Trophy, Calendar,
  Headphones, PenTool, BookOpen, Trash2, Eye
} from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  institution: string | null;
  package_id: string;
  listening_score: number;
  structure_score: number;
  reading_score: number;
  total_score: number;
  created_at: string;
}

export default function AdminTestsPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/test-result?limit=100');
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      } else {
        router.push('/admin/login');
      }
    } catch (err) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus hasil test ini?')) return;
    
    try {
      const response = await fetch(`/api/test-result/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchResults();
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPackageLabel = (pkgId: string) => {
    const packages: Record<string, string> = {
      'A': 'Paket A',
      'B': 'Paket B',
      'C': 'Paket C',
      'D': 'Paket D'
    };
    return packages[pkgId] || pkgId;
  };

  const getScoreColor = (score: number) => {
    if (score >= 550) return 'text-emerald-400';
    if (score >= 450) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-slate-400 hover:text-slate-200">
                <Home className="w-5 h-5" />
              </Link>
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <Link href="/admin" className="text-slate-400 hover:text-slate-200 text-sm">
                Admin
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Test Results</h1>
                <p className="text-xs text-slate-400">Hasil simulasi test TOEFL</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-white">{results.length}</div>
              <div className="text-sm text-slate-400">Total Tests</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-emerald-400">
                {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.total_score, 0) / results.length) : 0}
              </div>
              <div className="text-sm text-slate-400">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-yellow-400">
                {results.filter(r => r.total_score >= 450).length}
              </div>
              <div className="text-sm text-slate-400">Pass (≥450)</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-emerald-400">
                {results.filter(r => r.total_score >= 550).length}
              </div>
              <div className="text-sm text-slate-400">Good (≥550)</div>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Semua Hasil Test ({results.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="divide-y divide-slate-700">
                {results.map((result) => (
                  <div key={result.id} className="p-4 hover:bg-slate-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {result.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{result.name}</div>
                          <div className="text-sm text-slate-400">
                            {result.institution || 'No institution'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {getPackageLabel(result.package_id)}
                        </Badge>
                        <div className={`text-xl font-bold ${getScoreColor(result.total_score)}`}>
                          {result.total_score}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Headphones className="w-4 h-4 text-blue-400" />
                        <span>Listening: <span className="text-white">{result.listening_score}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <PenTool className="w-4 h-4 text-emerald-400" />
                        <span>Structure: <span className="text-white">{result.structure_score}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span>Reading: <span className="text-white">{result.reading_score}</span></span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(result.created_at)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(result.id)}
                        className="border-slate-600 text-slate-300 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {results.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    Belum ada hasil test
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
