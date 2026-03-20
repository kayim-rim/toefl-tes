'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BarChart3, FileText, Settings, LogOut, Loader2, UserCog, ClipboardList, Trophy, Home } from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTests: 0,
    totalProgress: 0,
    avgScore: 0
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === 'admin') {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    } catch (err) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-3 text-sm">
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-slate-400">Welcome, {user.name}</p>
              </div>
            </div>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/80 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
              <Users className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <p className="text-xs text-slate-500">Pengguna terdaftar</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/80 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Tests</CardTitle>
              <FileText className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalTests}</div>
              <p className="text-xs text-slate-500">Test diselesaikan</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/80 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Learning Progress</CardTitle>
              <BarChart3 className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProgress}</div>
              <p className="text-xs text-slate-500">Skills diselesaikan</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/80 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Avg Score</CardTitle>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgScore}</div>
              <p className="text-xs text-slate-500">Rata-rata nilai test</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/users">
            <Card className="bg-slate-800/80 border-slate-700 hover:border-amber-500/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <UserCog className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Manage Users</CardTitle>
                    <CardDescription className="text-slate-400">
                      Tambah, edit, hapus user
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Kelola akun pengguna pembelajaran. Buat username dan password baru, atau nonaktifkan akun.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/progress">
            <Card className="bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Learning Progress</CardTitle>
                    <CardDescription className="text-slate-400">
                      Lihat progress pembelajaran
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Pantau progress pembelajaran setiap user. Lihat skill yang sudah diselesaikan dan skor.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/tests">
            <Card className="bg-slate-800/80 border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Test Results</CardTitle>
                    <CardDescription className="text-slate-400">
                      Lihat hasil test simulasi
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Lihat semua hasil test simulasi. Filter berdasarkan paket, tanggal, atau user.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
