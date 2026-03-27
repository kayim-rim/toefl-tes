'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowLeft, FileText, Lock, Crown } from 'lucide-react';

export default function TestPage() {
  const router = useRouter();

  // Redirect to package selection directly
  useEffect(() => {
    router.push('/test/package');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Simulasi Test TOEFL ITP</CardTitle>
          <CardDescription className="text-slate-400">
            Mengalihkan ke pemilihan paket...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="animate-pulse text-slate-400">
            Silakan tunggu...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
