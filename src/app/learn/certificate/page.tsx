'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Award, Loader2, Download, CheckCircle, AlertCircle
} from 'lucide-react';
import { useLearningAccess } from '@/hooks/useLearningAccess';

interface CertificateData {
  id: string;
  certificateId: string;
  score: number;
  listeningAvg: number;
  structureAvg: number;
  readingAvg: number;
  issuedAt: string;
}

interface ProgressSummary {
  totalSkills: number;
  completedSkills: number;
  overallAccuracy: number;
  canGetCertificate: boolean;
}

export default function CertificatePage() {
  const { isLoading: isLoadingAuth, hasAccess, user } = useLearningAccess();
  const [certificate, setCertificate] = useState<CertificateData>(null);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (hasAccess) {
      fetchData();
    }
  }, [hasAccess]);

  const fetchData = async () => {
    try {
      // Fetch certificate
      const certResponse = await fetch('/api/learn/certificate');
      if (certResponse.ok) {
        const data = await certResponse.json();
        setCertificate(data.certificate);
      }

      // Fetch progress summary
      const progressResponse = await fetch('/api/learn/progress/summary');
      if (progressResponse.ok) {
        const data = await progressResponse.json();
        setProgress(data.summary);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      const response = await fetch('/api/learn/certificate', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setCertificate(data.certificate);
      }
    } catch (err) {
      console.error('Failed to generate certificate:', err);
    }
  };

  const handleDownload = () => {
    // In real app, generate PDF
    alert('Fitur download sertifikat akan segera tersedia!');
  };

  if (isLoadingAuth || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Will redirect via hook
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
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Sertifikat</h1>
              <p className="text-xs text-slate-400">Sertifikat pembelajaran</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {certificate ? (
          /* Certificate Display */
          <div className="space-y-6">
            {/* Certificate Card */}
            <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-amber-500/30">
              <CardContent className="p-0">
                <div className="text-center py-12 px-6">
                  {/* Border Design */}
                  <div className="border-4 border-amber-500/20 rounded-lg p-8">
                    <Award className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">
                      CERTIFICATE OF COMPLETION
                    </h2>
                    <p className="text-slate-400 mb-8">TOEFL ITP Learning Program</p>
                    
                    <p className="text-slate-300 mb-2">This is to certify that</p>
                    <p className="text-2xl font-bold text-white mb-4">{user?.name || 'Student'}</p>
                    
                    <p className="text-slate-300 mb-6">
                      has successfully completed the TOEFL ITP Learning Program
                    </p>

                    {/* Score */}
                    <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                      <p className="text-amber-400 text-lg mb-4">Final Score</p>
                      <div className="flex items-center justify-center gap-8">
                        <div>
                          <p className="text-4xl font-bold text-white">{certificate.score}</p>
                          <p className="text-slate-500 text-sm">out of 100</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div>
                          <p className="text-blue-400 font-semibold">{certificate.listeningAvg}</p>
                          <p className="text-slate-500 text-xs">Listening</p>
                        </div>
                        <div>
                          <p className="text-emerald-400 font-semibold">{certificate.structureAvg}</p>
                          <p className="text-slate-500 text-xs">Structure</p>
                        </div>
                        <div>
                          <p className="text-purple-400 font-semibold">{certificate.readingAvg}</p>
                          <p className="text-slate-500 text-xs">Reading</p>
                        </div>
                      </div>
                    </div>

                    {/* Certificate ID */}
                    <p className="text-slate-500 text-sm">
                      Certificate ID: {certificate.certificateId}
                    </p>
                    <p className="text-slate-500 text-sm">
                      Issued: {new Date(certificate.issuedAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleDownload}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Sertifikat (PDF)
              </Button>
            </div>
          </div>
        ) : (
          /* No Certificate - Requirements */
          <div className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Persyaratan Sertifikat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-6">
                  Selesaikan semua materi pembelajaran untuk mendapatkan sertifikat
                </p>

                {/* Progress */}
                {progress && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Skills Selesai</span>
                        <span className="text-white">{progress.completedSkills}/28</span>
                      </div>
                      <Progress value={(progress.completedSkills / 28) * 100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Akurasi</span>
                        <span className="text-white">{progress.overallAccuracy}%</span>
                      </div>
                      <Progress value={progress.overallAccuracy} className="h-2" />
                    </div>
                  </div>
                )}

                {/* Requirements List */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    {progress && progress.completedSkills >= 28 ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                    )}
                    <span>Selesaikan semua 28 skills</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    {progress && progress.overallAccuracy >= 70 ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                    )}
                    <span>Dapatkan akurasi minimal 70%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            {progress?.canGetCertificate && (
              <div className="flex justify-center">
                <Button
                  onClick={handleGenerateCertificate}
                  className="bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Generate Sertifikat
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
