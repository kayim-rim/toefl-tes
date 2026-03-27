'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Headphones, PenTool, BookOpen, ArrowLeft, LogOut, Loader2,
  Trophy, BarChart3, Bookmark, FileText, Award, ChevronRight,
  Crown, GraduationCap, ArrowRight
} from 'lucide-react';
import { listeningSkills, structureSkills, readingSkills } from '@/data/learning/skills';

// Tier type
type UserTier = 'free' | 'tes' | 'student';

// Tier display info
const TIER_INFO: Record<UserTier, { name: string; color: string }> = {
  free: { name: 'Gratis', color: 'bg-slate-500' },
  tes: { name: 'Tes', color: 'bg-blue-500' },
  student: { name: 'Student', color: 'bg-emerald-500' }
};

interface UserData {
  id: string;
  username: string;
  name: string;
  role: string;
  tier: UserTier;
  tierExpiresAt: string | null;
}

interface ProgressData {
  [skillId: string]: {
    answered: number;
    correct: number;
    completed: boolean;
  };
}

export default function LearnDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressData>({});

  useEffect(() => {
    checkAuth();
    fetchProgress();
  }, []);

  // Check if tier is active
  const isTierActive = (tier: UserTier, expiresAt: string | null): boolean => {
    if (tier === 'free') return true;
    if (!expiresAt) return true;
    return new Date(expiresAt) > new Date();
  };

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          // Not logged in, redirect to login
          router.push('/login?redirect=/learn');
        }
      } else {
        router.push('/login?redirect=/learn');
      }
    } catch (err) {
      router.push('/login?redirect=/learn');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/learn/progress');
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress || {});
      }
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Get effective tier
  const effectiveTier = user ? (isTierActive(user.tier, user.tierExpiresAt) ? user.tier : 'free') : 'free';

  // Check if user has learning access (must be student)
  const hasLearningAccess = effectiveTier === 'student';

  const calculateSectionProgress = (skills: typeof listeningSkills) => {
    const totalQuestions = skills.length * 10;
    let answered = 0;
    let correct = 0;
    let completed = 0;

    skills.forEach(skill => {
      const p = progress[skill.skillId];
      if (p) {
        answered += p.answered;
        correct += p.correct;
        if (p.completed) completed++;
      }
    });

    return {
      answered,
      correct,
      completed,
      total: skills.length,
      percentage: Math.round((answered / totalQuestions) * 100),
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0
    };
  };

  const listeningProgress = calculateSectionProgress(listeningSkills);
  const structureProgress = calculateSectionProgress(structureSkills);
  const readingProgress = calculateSectionProgress(readingSkills);

  const totalProgress = {
    skills: listeningProgress.completed + structureProgress.completed + readingProgress.completed,
    totalSkills: 28,
    answered: listeningProgress.answered + structureProgress.answered + readingProgress.answered,
    correct: listeningProgress.correct + structureProgress.correct + readingProgress.correct,
  };

  const overallAccuracy = totalProgress.answered > 0 
    ? Math.round((totalProgress.correct / totalProgress.answered) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show upgrade page if user doesn't have learning access
  if (!hasLearningAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-400 hover:text-slate-200">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Learning Center</h1>
                  <p className="text-xs text-slate-400">Upgrade untuk akses penuh</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${TIER_INFO[effectiveTier].color} text-white text-xs`}>
                {TIER_INFO[effectiveTier].name}
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-16">
          <Card className="bg-slate-800/80 border-slate-700">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Upgrade ke Paket Student</CardTitle>
              <CardDescription className="text-slate-400">
                Learning Center hanya tersedia untuk pengguna dengan paket Student
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current tier info */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400">Tier Anda saat ini:</span>
                  <Badge className={`${TIER_INFO[effectiveTier].color} text-white`}>
                    {TIER_INFO[effectiveTier].name}
                  </Badge>
                </div>
                {effectiveTier === 'tes' && (
                  <p className="text-blue-400 text-sm">
                    Paket Tes Anda sudah mencakup semua paket soal dan pembahasan. 
                    Upgrade ke Student untuk akses Learning Center.
                  </p>
                )}
                {effectiveTier === 'free' && (
                  <p className="text-slate-400 text-sm">
                    Daftar dan upgrade untuk mengakses Learning Center dan fitur premium lainnya.
                  </p>
                )}
              </div>

              {/* Features comparison */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Benefit Paket Student:</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>Learning Center - 28 materi skill TOEFL</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Semua paket soal (A, B, C, D)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Trophy className="w-4 h-4 text-emerald-400" />
                    <span>Pembahasan lengkap & sertifikat</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <span>Progress tracking</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Paket Student</p>
                    <p className="text-slate-400 text-sm">Akses penuh selama 1 tahun</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">Rp 25.000</p>
                    <p className="text-emerald-400 text-sm">per tahun</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                <Link href="/pricing">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Sekarang
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              {/* Alternative */}
              <p className="text-center text-slate-400 text-sm">
                Atau kembali ke{' '}
                <Link href="/" className="text-emerald-400 hover:text-emerald-300">
                  halaman utama
                </Link>
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // User has learning access - show full dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-slate-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Learning Center</h1>
                <p className="text-xs text-slate-400">Halo, {user.name}!</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${TIER_INFO[effectiveTier].color} text-white text-xs`}>
              <GraduationCap className="w-3 h-3 mr-1" />
              {TIER_INFO[effectiveTier].name}
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Progress Anda
            </CardTitle>
            <CardDescription className="text-slate-400">
              {totalProgress.skills} dari {totalProgress.totalSkills} skills selesai ({Math.round((totalProgress.skills / totalProgress.totalSkills) * 100)}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-3xl font-bold text-white">{totalProgress.answered}</div>
                <div className="text-sm text-slate-400">Soal Dijawab</div>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-3xl font-bold text-emerald-400">{totalProgress.correct}</div>
                <div className="text-sm text-slate-400">Jawaban Benar</div>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-3xl font-bold text-blue-400">{overallAccuracy}%</div>
                <div className="text-sm text-slate-400">Akurasi</div>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-3xl font-bold text-amber-400">{totalProgress.skills}</div>
                <div className="text-sm text-slate-400">Skills Selesai</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Listening */}
          <Link href="/learn/listening">
            <Card className="bg-slate-800/80 border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Listening</CardTitle>
                      <CardDescription className="text-slate-400">6 Skills</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{listeningProgress.percentage}%</span>
                  </div>
                  <Progress value={listeningProgress.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{listeningProgress.completed}/6 skills selesai</span>
                    <span>Akurasi: {listeningProgress.accuracy}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Structure */}
          <Link href="/learn/structure">
            <Card className="bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <PenTool className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Structure</CardTitle>
                      <CardDescription className="text-slate-400">12 Skills</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{structureProgress.percentage}%</span>
                  </div>
                  <Progress value={structureProgress.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{structureProgress.completed}/12 skills selesai</span>
                    <span>Akurasi: {structureProgress.accuracy}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Reading */}
          <Link href="/learn/reading">
            <Card className="bg-slate-800/80 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Reading</CardTitle>
                      <CardDescription className="text-slate-400">10 Skills</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{readingProgress.percentage}%</span>
                  </div>
                  <Progress value={readingProgress.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{readingProgress.completed}/10 skills selesai</span>
                    <span>Akurasi: {readingProgress.accuracy}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/learn/bookmarks">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
              <Bookmark className="w-4 h-4 mr-2" /> Bookmark
            </Button>
          </Link>
          <Link href="/learn/notes">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
              <FileText className="w-4 h-4 mr-2" /> Catatan
            </Button>
          </Link>
          <Link href="/learn/leaderboard">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
              <Trophy className="w-4 h-4 mr-2" /> Leaderboard
            </Button>
          </Link>
          <Link href="/learn/certificate">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
              <Award className="w-4 h-4 mr-2" /> Sertifikat
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
