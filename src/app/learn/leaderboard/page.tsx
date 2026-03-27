'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Medal, Loader2, Crown, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  skillsCompleted: number;
  accuracy: number;
  rank: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    checkAuth();
    fetchLeaderboard();
  }, [timeRange]);

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

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/learn/leaderboard?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-slate-400 font-semibold">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/30';
    if (rank === 2) return 'bg-slate-400/10 border-slate-400/30';
    if (rank === 3) return 'bg-amber-600/10 border-amber-600/30';
    return 'bg-slate-700/50 border-slate-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/learn" className="text-slate-400 hover:text-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Leaderboard</h1>
              <p className="text-xs text-slate-400">Peringkat pembelajaran</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Time Range Tabs */}
        <Tabs defaultValue="all" onValueChange={setTimeRange} className="mb-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="week" className="data-[state=active]:bg-emerald-500">Minggu Ini</TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-emerald-500">Bulan Ini</TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500">Semua Waktu</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top 3 */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className={`order-1 mt-8 ${getRankBg(2)}`}>
              <CardContent className="text-center py-6">
                <Medal className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-white font-semibold truncate">{leaderboard[1]?.name}</p>
                <p className="text-2xl font-bold text-slate-300 mt-2">{leaderboard[1]?.score}</p>
                <p className="text-slate-400 text-sm">points</p>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className={`order-2 ${getRankBg(1)}`}>
              <CardContent className="text-center py-8">
                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold truncate">{leaderboard[0]?.name}</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{leaderboard[0]?.score}</p>
                <p className="text-slate-400 text-sm">points</p>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className={`order-3 mt-8 ${getRankBg(3)}`}>
              <CardContent className="text-center py-6">
                <Medal className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                <p className="text-white font-semibold truncate">{leaderboard[2]?.name}</p>
                <p className="text-2xl font-bold text-amber-600 mt-2">{leaderboard[2]?.score}</p>
                <p className="text-slate-400 text-sm">points</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Leaderboard List */}
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Peringkat Lengkap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-700">
              {leaderboard.slice(3).map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-4 ${
                    entry.isCurrentUser ? 'bg-emerald-500/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {entry.name}
                        {entry.isCurrentUser && (
                          <Badge className="ml-2 bg-emerald-500/20 text-emerald-300 text-xs">
                            Anda
                          </Badge>
                        )}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {entry.skillsCompleted}/28 skills • {entry.accuracy}% akurasi
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{entry.score}</p>
                    <p className="text-slate-500 text-xs">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
