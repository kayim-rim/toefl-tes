'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const redirect = searchParams.get('redirect') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Nama lengkap harus diisi');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email harus diisi');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Format email tidak valid');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          // Pass redirect to login page
          const loginUrl = redirect 
            ? `/login?registered=true&redirect=${encodeURIComponent(redirect)}`
            : '/login?registered=true';
          router.push(loginUrl);
        }, 2000);
      } else {
        setError(data.error || 'Gagal membuat akun');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Registrasi Berhasil!</h2>
          <p className="text-slate-400 mb-4">
            Akun Anda telah dibuat. Anda akan dialihkan ke halaman login...
          </p>
          <Loader2 className="w-5 h-5 animate-spin text-emerald-400 mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Daftar Akun Baru</CardTitle>
        <CardDescription className="text-slate-400">
          Buat akun untuk mengakses semua fitur
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Nama Lengkap</Label>
            <Input
              id="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Masukkan ulang password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="bg-slate-700/50 rounded-lg p-3 text-sm text-slate-400">
            <p className="font-medium text-slate-300 mb-1">Info Akun:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Akun baru akan memiliki akses <span className="text-slate-300">Gratis</span></li>
              <li>Untuk upgrade akses, hubungi admin atau gunakan voucher</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Membuat Akun...
              </>
            ) : (
              'Daftar Sekarang'
            )}
          </Button>

          <p className="text-sm text-slate-400 text-center">
            Sudah punya akun?{' '}
            <Link 
              href={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'} 
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Login di sini
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

function RegisterFallback() {
  return (
    <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Daftar Akun Baru</CardTitle>
        <CardDescription className="text-slate-400">
          Memuat...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </CardContent>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Suspense fallback={<RegisterFallback />}>
        <RegisterContent />
      </Suspense>
    </div>
  );
}
