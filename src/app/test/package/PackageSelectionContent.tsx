'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, FileText, CheckCircle, Lock, Crown, GraduationCap, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { packages } from '@/data/packages';

// Tier type
type UserTier = 'free' | 'tes' | 'student';

// Tier package access
const TIER_PACKAGE_ACCESS: Record<UserTier, string[]> = {
  free: ['package_A', 'package_B'],
  tes: ['package_A', 'package_B', 'package_C', 'package_D'],
  student: ['package_A', 'package_B', 'package_C', 'package_D']
};

// Free packages - accessible without login
const FREE_PACKAGES = ['package_A', 'package_B'];

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

export default function PackageSelectionContent() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Upgrade dialog state
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [clickedPackage, setClickedPackage] = useState<string | null>(null);

  // Name input dialog for free packages
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  // Fetch user data
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
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // Get user tier (default to free if not logged in)
  const userTier: UserTier = user?.tier || 'free';

  // Check if tier is active (not expired)
  const isTierActive = (tier: UserTier, expiresAt: string | null): boolean => {
    if (tier === 'free') return true;
    if (!expiresAt) return true;
    return new Date(expiresAt) > new Date();
  };

  // Get effective tier considering expiry
  const effectiveTier = isTierActive(userTier, user?.tierExpiresAt || null) ? userTier : 'free';

  // Check if user can access a package
  const canAccessPackage = (packageId: string): boolean => {
    return TIER_PACKAGE_ACCESS[effectiveTier].includes(packageId);
  };

  // Check if package is free (no login required)
  const isFreePackage = (packageId: string): boolean => {
    return FREE_PACKAGES.includes(packageId);
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleStartTest = () => {
    if (!selectedPackage) return;

    if (canAccessPackage(selectedPackage)) {
      // Check if it's a free package and user is not logged in
      if (isFreePackage(selectedPackage) && !user) {
        // Show name input dialog
        setShowNameDialog(true);
      } else if (user) {
        // User is logged in, proceed directly
        sessionStorage.setItem('testPackage', selectedPackage);
        sessionStorage.setItem('testName', user.name);
        router.push('/test/exam');
      } else {
        // Non-free package but has access (shouldn't happen, but just in case)
        sessionStorage.setItem('testPackage', selectedPackage);
        router.push('/test/exam');
      }
    } else {
      // Show upgrade dialog
      setClickedPackage(selectedPackage);
      setShowUpgradeDialog(true);
    }
  };

  const handleStartFreeTest = () => {
    if (!name.trim()) return;

    setIsStarting(true);
    sessionStorage.setItem('testPackage', selectedPackage);
    sessionStorage.setItem('testName', name);
    sessionStorage.setItem('testInstitution', institution);
    sessionStorage.setItem('testUser', JSON.stringify({ name, institution }));

    router.push('/test/exam');
  };

  const handleLockedPackageClick = (packageId: string) => {
    setClickedPackage(packageId);
    setShowUpgradeDialog(true);
  };

  const handleLoginClick = () => {
    setShowUpgradeDialog(false);
    router.push('/login?redirect=/test/package');
  };

  const handleRegisterClick = () => {
    setShowUpgradeDialog(false);
    router.push('/register?redirect=/test/package');
  };

  const handlePricingClick = () => {
    setShowUpgradeDialog(false);
    router.push('/pricing');
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-slate-200 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Pilih Paket Soal</h1>
              <p className="text-xs text-slate-400">Pilih paket yang ingin dikerjakan</p>
            </div>
          </div>
          <div className="text-right">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">{user.name}</span>
                <Badge className={`${TIER_INFO[effectiveTier].color} text-white text-xs`}>
                  {TIER_INFO[effectiveTier].icon}
                  <span className="ml-1">{TIER_INFO[effectiveTier].name}</span>
                </Badge>
              </div>
            ) : (
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300 text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Info banner for non-logged users */}
        {!user && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Paket A & B Gratis Tanpa Login
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Pilih paket gratis atau login untuk akses semua fitur
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleRegisterClick}
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/20"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Daftar
                </Button>
                <Button
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tier info banner for logged users with free tier */}
        {user && effectiveTier === 'free' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  <Crown className="w-5 h-5 text-blue-400" />
                  Upgrade Akses Anda
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Akses semua paket soal dan fitur premium dengan berlangganan
                </p>
              </div>
              <Button
                onClick={handlePricingClick}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
              >
                Lihat Paket
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {packages.map((pkg) => {
            const isAccessible = canAccessPackage(pkg.id);
            const isFree = isFreePackage(pkg.id);
            const isLocked = !isAccessible;

            return (
              <Card
                key={pkg.id}
                className={`relative transition-all cursor-pointer ${
                  isLocked
                    ? 'bg-slate-800/50 border-slate-700 opacity-75'
                    : selectedPackage === pkg.id
                      ? 'bg-slate-700 border-blue-500 ring-2 ring-blue-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                }`}
                onClick={() => isLocked ? handleLockedPackageClick(pkg.id) : handleSelectPackage(pkg.id)}
              >
                {/* Free badge for packages A & B */}
                {isFree && !isLocked && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-emerald-500 text-white text-xs">Gratis</Badge>
                  </div>
                )}

                {isLocked && (
                  <div
                    className="absolute inset-0 bg-slate-900/50 rounded-lg flex flex-col items-center justify-center z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLockedPackageClick(pkg.id);
                    }}
                  >
                    <Lock className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-slate-300 text-sm font-medium">Paket Premium</span>
                    <span className="text-blue-400 text-xs mt-1">Klik untuk upgrade</span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{pkg.name}</CardTitle>
                    {selectedPackage === pkg.id && !isLocked && (
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    )}
                    {isLocked && (
                      <Lock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <CardDescription className="text-slate-400">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Listening</span>
                      <span className="text-blue-400">{pkg.listening.length} soal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Structure</span>
                      <span className="text-emerald-400">{pkg.structure.length} soal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reading</span>
                      <span className="text-purple-400">{pkg.reading.reduce((acc, p) => acc + p.questions.length, 0)} soal</span>
                    </div>
                    <div className="pt-2 border-t border-slate-600 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-white">{pkg.listening.length + pkg.structure.length + pkg.reading.reduce((acc, p) => acc + p.questions.length, 0)} soal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-12"
            disabled={!selectedPackage}
            onClick={handleStartTest}
          >
            Mulai Test
          </Button>
        </div>

        {!selectedPackage && (
          <p className="text-center text-slate-400 mt-4">
            Pilih paket soal terlebih dahulu
          </p>
        )}
      </main>

      {/* Name Input Dialog for Free Packages */}
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Masukkan Data Anda</DialogTitle>
            <DialogDescription className="text-slate-400">
              Untuk memulai test {selectedPackage?.replace('package_', 'Paket ')}, masukkan nama Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Nama Lengkap *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-slate-300">Institusi/Sekolah (Opsional)</Label>
              <Input
                id="institution"
                type="text"
                placeholder="Nama sekolah atau universitas"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-sm">
              <p className="text-emerald-400">
                Test ini gratis! Daftar akun untuk menyimpan progress dan hasil test Anda.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2">
            <Button
              onClick={handleStartFreeTest}
              disabled={!name.trim() || isStarting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {isStarting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memulai...
                </>
              ) : (
                'Mulai Test'
              )}
            </Button>
            <p className="text-xs text-slate-400 text-center">
              Atau{' '}
              <button onClick={handleRegisterClick} className="text-emerald-400 hover:text-emerald-300">
                daftar akun
              </button>
              {' '}untuk menyimpan progress
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-blue-400" />
              Upgrade Akses
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Paket {clickedPackage?.replace('package_', 'Paket ')} memerlukan akun dengan tier yang lebih tinggi.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300 text-sm mb-3">
                Untuk mengakses semua paket soal, Anda perlu:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Paket Tes</span>
                  <span className="text-blue-400 font-medium">Rp 10.000/tahun</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Paket Student</span>
                  <span className="text-emerald-400 font-medium">Rp 25.000/tahun</span>
                </div>
              </div>
            </div>

            {!user && (
              <div className="space-y-3">
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sudah punya akun? Login
                </Button>
                <Button
                  onClick={handleRegisterClick}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Daftar Akun Baru
                </Button>
              </div>
            )}

            {user && (
              <Button
                onClick={handlePricingClick}
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
              >
                <Crown className="w-4 h-4 mr-2" />
                Lihat Paket Upgrade
              </Button>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUpgradeDialog(false)}
              className="border-slate-600 text-slate-300"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
