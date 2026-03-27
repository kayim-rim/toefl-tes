'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Trophy, ArrowLeft, CheckCircle, Crown, GraduationCap, FileText,
  Headphones, PenTool, BookOpen, BarChart3, Award, Users, Loader2
} from 'lucide-react';

type UserTier = 'free' | 'tes' | 'student';

interface UserData {
  id: string;
  username: string;
  name: string;
  role: string;
  tier: UserTier;
  tierExpiresAt: string | null;
}

const pricingPlans = [
  {
    tier: 'free' as UserTier,
    name: 'Gratis',
    price: 'Rp 0',
    period: 'Seumur hidup',
    description: 'Coba fitur dasar TOEFL ITP',
    features: [
      { text: 'Paket Soal A & B', included: true },
      { text: '140+ Soal Latihan', included: true },
      { text: 'Paket Soal C & D', included: false },
      { text: 'Pembahasan Lengkap', included: false },
      { text: 'History & Analytics', included: false },
      { text: 'Learning Class', included: false },
      { text: 'Sertifikat', included: false },
    ],
    buttonText: 'Mulai Gratis',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    tier: 'tes' as UserTier,
    name: 'Paket Tes',
    price: 'Rp 10.000',
    period: 'per tahun',
    description: 'Akses penuh semua paket soal',
    features: [
      { text: 'Semua Paket Soal (A, B, C, D)', included: true },
      { text: '560+ Soal Test', included: true },
      { text: 'Pembahasan Lengkap', included: true },
      { text: 'History & Analytics', included: true },
      { text: 'Soal Baru Rutin', included: true },
      { text: 'Sertifikat', included: true },
      { text: 'Learning Class', included: false },
    ],
    buttonText: 'Pilih Paket Tes',
    buttonVariant: 'default' as const,
    popular: true,
  },
  {
    tier: 'student' as UserTier,
    name: 'Paket Student',
    price: 'Rp 25.000',
    period: 'per tahun',
    description: 'Akses penuh + Learning Class',
    features: [
      { text: 'Semua Fitur Paket Tes', included: true },
      { text: '560+ Soal Test', included: true },
      { text: 'Pembahasan Lengkap', included: true },
      { text: 'History & Analytics', included: true },
      { text: 'Learning Class Lengkap', included: true },
      { text: 'Latihan per Skill', included: true },
      { text: 'Sertifikat', included: true },
    ],
    buttonText: 'Pilih Paket Student',
    buttonVariant: 'default' as const,
    popular: false,
  },
];

export default function PricingPage() {
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

  const handleSelectPlan = (tier: UserTier) => {
    if (tier === 'free') {
      router.push('/test');
      return;
    }

    if (!user) {
      // Need to register/login first
      router.push('/register?redirect=/pricing');
    } else {
      // User is logged in, show contact info
      alert('Untuk upgrade, silakan hubungi admin atau gunakan voucher yang diberikan.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-slate-200 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Pilih Paket</h1>
              <p className="text-xs text-slate-400">Pilih paket yang sesuai kebutuhan</p>
            </div>
          </div>
          <div className="text-right">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">{user.name}</span>
                <Badge className="bg-slate-600 text-white">
                  {user.tier === 'free' ? 'Gratis' : user.tier === 'tes' ? 'Tes' : 'Student'}
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pilih Paket Berlangganan
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan persiapan TOEFL ITP Anda.
            Semua paket berlaku selama 1 tahun.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan) => {
            const isCurrentPlan = user?.tier === plan.tier;

            return (
              <Card
                key={plan.tier}
                className={`relative bg-slate-800/80 border-slate-700 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                } ${isCurrentPlan ? 'ring-2 ring-emerald-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Paling Populer</Badge>
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 text-white">Paket Anda</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="mx-auto w-14 h-14 rounded-xl flex items-center justify-center mb-3">
                    {plan.tier === 'free' && (
                      <div className="w-14 h-14 bg-slate-600 rounded-xl flex items-center justify-center">
                        <FileText className="w-7 h-7 text-slate-300" />
                      </div>
                    )}
                    {plan.tier === 'tes' && (
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Crown className="w-7 h-7 text-white" />
                      </div>
                    )}
                    {plan.tier === 'student' && (
                      <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-400 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                        )}
                        <span className={feature.included ? 'text-slate-300' : 'text-slate-500'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                        : plan.tier === 'student'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                    variant={plan.buttonVariant}
                    onClick={() => handleSelectPlan(plan.tier)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Paket Saat Ini' : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Perbandingan Fitur</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Fitur</th>
                  <th className="text-center py-3 px-4 text-slate-300">Gratis</th>
                  <th className="text-center py-3 px-4 text-blue-400">Tes</th>
                  <th className="text-center py-3 px-4 text-emerald-400">Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    Paket Soal
                  </td>
                  <td className="text-center py-3 px-4 text-slate-400">A & B</td>
                  <td className="text-center py-3 px-4 text-blue-400">A, B, C, D</td>
                  <td className="text-center py-3 px-4 text-emerald-400">A, B, C, D</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-slate-500" />
                    Listening
                  </td>
                  <td className="text-center py-3 px-4 text-slate-400">100 soal</td>
                  <td className="text-center py-3 px-4 text-blue-400">200 soal</td>
                  <td className="text-center py-3 px-4 text-emerald-400">200 soal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-slate-500" />
                    Structure
                  </td>
                  <td className="text-center py-3 px-4 text-slate-400">80 soal</td>
                  <td className="text-center py-3 px-4 text-blue-400">160 soal</td>
                  <td className="text-center py-3 px-4 text-emerald-400">160 soal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    Reading
                  </td>
                  <td className="text-center py-3 px-4 text-slate-400">100 soal</td>
                  <td className="text-center py-3 px-4 text-blue-400">200 soal</td>
                  <td className="text-center py-3 px-4 text-emerald-400">200 soal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-slate-500" />
                    Analytics
                  </td>
                  <td className="text-center py-3 px-4"><span className="text-slate-500">-</span></td>
                  <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-blue-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-500" />
                    Sertifikat
                  </td>
                  <td className="text-center py-3 px-4"><span className="text-slate-500">-</span></td>
                  <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-blue-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    Learning Class
                  </td>
                  <td className="text-center py-3 px-4"><span className="text-slate-500">-</span></td>
                  <td className="text-center py-3 px-4"><span className="text-slate-500">-</span></td>
                  <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Pertanyaan Umum</h3>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-white font-medium mb-2">Bagaimana cara upgrade paket?</h4>
              <p className="text-slate-400 text-sm">
                Setelah mendaftar akun, hubungi admin untuk upgrade paket. Anda akan mendapatkan akses
                setelah pembayaran dikonfirmasi.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-white font-medium mb-2">Berapa lama masa aktif paket?</h4>
              <p className="text-slate-400 text-sm">
                Semua paket berbayar (Tes dan Student) berlaku selama 1 tahun sejak tanggal aktivasi.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-white font-medium mb-2">Apa metode pembayaran yang tersedia?</h4>
              <p className="text-slate-400 text-sm">
                Saat ini pembayaran dilakukan melalui transfer bank. Hubungi admin untuk informasi
                rekening dan konfirmasi pembayaran.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">
            Ada pertanyaan? Hubungi kami untuk informasi lebih lanjut.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            <Link href="/login">Hubungi Admin</Link>
          </Button>
        </div>
      </main>

      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          © 2024 TOEFL ITP Preparation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
