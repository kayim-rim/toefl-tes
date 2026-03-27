'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistered, setShowRegistered] = useState(false);

  const redirect = searchParams.get('redirect') || '/learn';

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowRegistered(true);
      // Auto hide after 5 seconds
      setTimeout(() => setShowRegistered(false), 5000);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(redirect);
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Login</CardTitle>
          <CardDescription className="text-slate-400">
            Masuk untuk mengakses akun Anda
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {showRegistered && (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                Akun berhasil dibuat! Silakan login.
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-slate-500 text-sm">
                Belum punya akun?{' '}
                <Link
                  href={`/register${redirect !== '/learn' ? `?redirect=${redirect}` : ''}`}
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Daftar di sini
                </Link>
              </p>
              <Link href="/pricing" className="text-slate-400 hover:text-slate-300 text-sm block">
                Lihat paket berlangganan
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
