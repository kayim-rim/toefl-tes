'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { packages } from '@/data/packages';

export default function PackageSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const name = searchParams.get('name') || '';
  const institution = searchParams.get('institution') || '';

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleStartTest = () => {
    if (selectedPackage) {
      // Navigate to exam page with package and user info
      sessionStorage.setItem('testName', name);
      sessionStorage.setItem('testInstitution', institution);
      sessionStorage.setItem('testPackage', selectedPackage);
      router.push('/test/exam');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/test" className="text-slate-400 hover:text-slate-200 flex items-center gap-2">
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
            <p className="text-sm text-white">{name}</p>
            {institution && <p className="text-xs text-slate-400">{institution}</p>}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? 'bg-slate-700 border-blue-500 ring-2 ring-blue-500' 
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
              }`}
              onClick={() => handleSelectPackage(pkg.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">{pkg.name}</CardTitle>
                  {selectedPackage === pkg.id && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
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
          ))}
        </div>

        <div className="flex justify-center">
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
    </div>
  );
}
