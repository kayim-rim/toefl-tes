'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen, Settings, ArrowRight, Headphones, PenTool, Trophy, Crown, GraduationCap, CheckCircle, UserPlus, LogIn, LogOut, User, Loader2 } from 'lucide-react';

// Tier type
type UserTier = 'free' | 'tes' | 'student';

// Tier display info
const TIER_INFO: Record<UserTier, { name: string; color: string; icon: React.ReactNode }> = {
  free: { name: 'Gratis', color: 'bg-slate-500', icon: null },
  tes: { name: 'Tes', color: 'bg-blue-500', icon: <Crown className="w-3 h-3" /> },
  student: { name: 'Student', color: 'bg-emerald-500', icon: <GraduationCap className="w-3 h-3" /> }
};

interface UserData {
  id: string;
  username: string;
  name: string;
  role: string;
  tier: UserTier;
  tierExpiresAt: string | null;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Check if tier is active
  const isTierActive = (tier: UserTier, expiresAt: string | null): boolean => {
    if (tier === 'free') return true;
    if (!expiresAt) return true;
    return new Date(expiresAt) > new Date();
  };

  const effectiveTier = user ? (isTierActive(user.tier, user.tierExpiresAt) ? user.tier : 'free') : 'free';

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TOEFL ITP Preparation</h1>
              <p className="text-xs text-slate-400">Simulasi & Pembelajaran</p>
            </div>
          </div>
          
          {/* User Info Area */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            ) : user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-white">{user.name}</span>
                  <Badge className={`${TIER_INFO[effectiveTier].color} text-white text-xs`}>
                    {TIER_INFO[effectiveTier].icon}
                    <span className="ml-1">{TIER_INFO[effectiveTier].name}</span>
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-slate-400 hover:text-white">
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  <Link href="/register">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Daftar
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Persiapan TOEFL ITP
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Platform lengkap untuk simulasi test dan pembelajaran TOEFL ITP.
            Pilih mode yang sesuai dengan kebutuhan Anda.
          </p>
          <p className="text-emerald-400 text-sm mt-4 font-medium">
            oleh: Berani Tumbuh Indonesia
          </p>
        </div>

        {/* Welcome Banner for logged in users */}
        {user && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Selamat datang kembali, {user.name}!</h3>
                <p className="text-slate-400 text-sm">
                  Tier: <span className="text-emerald-400">{TIER_INFO[effectiveTier].name}</span>
                  {effectiveTier !== 'student' && (
                    <span> • <Link href="/pricing" className="text-blue-400 hover:text-blue-300">Upgrade untuk akses penuh</Link></span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Simulasi Test Card */}
          <Card className="bg-slate-800/80 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Link href="/test">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Simulasi Test</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Latihan test TOEFL ITP
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Headphones className="w-4 h-4 text-blue-400" />
                  <span>Listening: 50 soal</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <PenTool className="w-4 h-4 text-green-400" />
                  <span>Structure: 40 soal</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Reading: 50 soal</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Mulai Test <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Link>
          </Card>

          {/* Daftar Akun Card - Only show if not logged in */}
          {!user && (
            <Card className="bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
              <Link href="/register">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">Daftar Akun</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Buat akun untuk akses penuh
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Semua paket soal</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Progress tersimpan</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>History & Analytics</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Daftar Gratis <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          )}

          {/* Pembelajaran Card */}
          <Card className="bg-slate-800/80 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Link href="/learn">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Pembelajaran</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Belajar skill TOEFL
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-xs text-purple-400">🎧</span>
                  </div>
                  <span>Listening: 6 materi</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-xs text-purple-400">✏️</span>
                  </div>
                  <span>Structure: 12 materi</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-xs text-purple-400">📖</span>
                  </div>
                  <span>Reading: 10 materi</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Mulai Belajar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Link>
          </Card>

          {/* Admin Card */}
          <Card className="bg-slate-800/80 border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Link href="/admin">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Settings className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Admin Panel</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Kelola user & data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-xs text-amber-400">👥</span>
                  </div>
                  <span>Kelola User</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-xs text-amber-400">📊</span>
                  </div>
                  <span>Lihat Progress</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-xs text-amber-400">📝</span>
                  </div>
                  <span>Hasil Test</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Login Admin <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Link>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Fitur Unggulan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">4</div>
              <div className="text-sm text-slate-400">Paket Soal</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">28</div>
              <div className="text-sm text-slate-400">Materi Skill</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">560+</div>
              <div className="text-sm text-slate-400">Soal Test</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">280+</div>
              <div className="text-sm text-slate-400">Soal Latihan</div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-2">Pilih Paket</h3>
          <p className="text-slate-400 text-center mb-8">Mulai gratis, upgrade kapan saja</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Free */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-white">Gratis</CardTitle>
                <div className="text-2xl font-bold text-white">Rp 0</div>
                <CardDescription className="text-slate-400">Seumur hidup</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Paket A & B (tanpa login)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>140+ soal latihan</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-slate-700 hover:bg-slate-600">
                  <Link href="/test">Mulai Gratis</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Tes */}
            <Card className={`bg-slate-800/50 border-slate-700 relative ${effectiveTier === 'tes' ? 'ring-2 ring-blue-500' : ''}`}>
              {effectiveTier !== 'tes' && effectiveTier !== 'student' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Paling Populer</Badge>
                </div>
              )}
              {effectiveTier === 'tes' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-white">Paket Anda</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-white flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4 text-blue-400" />
                  Paket Tes
                </CardTitle>
                <div className="text-2xl font-bold text-white">Rp 10.000</div>
                <CardDescription className="text-slate-400">per tahun</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Semua paket soal (A, B, C, D)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Pembahasan lengkap</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>History & Sertifikat</span>
                </div>
              </CardContent>
              <CardFooter>
                {effectiveTier === 'tes' || effectiveTier === 'student' ? (
                  <Button disabled className="w-full bg-slate-600 text-slate-300">
                    Sudah Berlangganan
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Link href="/pricing">Pilih Paket</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Student */}
            <Card className={`bg-slate-800/50 border-slate-700 ${effectiveTier === 'student' ? 'ring-2 ring-emerald-500' : ''}`}>
              {effectiveTier === 'student' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-white">Paket Anda</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-white flex items-center justify-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  Paket Student
                </CardTitle>
                <div className="text-2xl font-bold text-white">Rp 25.000</div>
                <CardDescription className="text-slate-400">per tahun</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Semua fitur Tes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Learning Class</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Progress tracking</span>
                </div>
              </CardContent>
              <CardFooter>
                {effectiveTier === 'student' ? (
                  <Button disabled className="w-full bg-slate-600 text-slate-300">
                    Sudah Berlangganan
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    <Link href="/pricing">Pilih Paket</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-6">
            <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300 text-sm">
              Lihat perbandingan lengkap →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          © 2024 TOEFL ITP Preparation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
