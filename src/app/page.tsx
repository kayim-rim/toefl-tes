'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Settings, ArrowRight, Headphones, PenTool, Trophy } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Persiapan TOEFL ITP
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Platform lengkap untuk simulasi test dan pembelajaran TOEFL ITP. 
            Pilih mode yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Simulasi Test Card */}
          <Card className="bg-slate-800/80 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Link href="/test">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Simulasi Test</CardTitle>
                <CardDescription className="text-slate-400">
                  Latihan test TOEFL ITP dengan format sesungguhnya
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Headphones className="w-4 h-4 text-blue-400" />
                  <span>Listening: 50 soal (~40 menit)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <PenTool className="w-4 h-4 text-green-400" />
                  <span>Structure: 40 soal (25 menit)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Reading: 50 soal (55 menit)</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  Mulai Test <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Link>
          </Card>

          {/* Pembelajaran Card */}
          <Card className="bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Link href="/login">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Pembelajaran</CardTitle>
                <CardDescription className="text-slate-400">
                  Belajar skill TOEFL dengan materi lengkap
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-xs text-emerald-400">🎧</span>
                  </div>
                  <span>Listening Skills: 6 materi</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-xs text-emerald-400">✏️</span>
                  </div>
                  <span>Structure Skills: 12 materi</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-xs text-emerald-400">📖</span>
                  </div>
                  <span>Reading Skills: 10 materi</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                  Mulai Belajar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Link>
          </Card>

          {/* Admin Card */}
          <Card className="bg-slate-800/80 border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Link href="/admin">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Admin Panel</CardTitle>
                <CardDescription className="text-slate-400">
                  Kelola user, lihat progress & hasil test
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-xs text-amber-400">👥</span>
                  </div>
                  <span>Kelola User & Password</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-xs text-amber-400">📊</span>
                  </div>
                  <span>Lihat Progress Pembelajaran</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-xs text-amber-400">📝</span>
                  </div>
                  <span>Lihat Hasil Test</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 group-hover:shadow-lg group-hover:shadow-amber-500/25">
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
