'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, FileText, Loader2, Plus, Trash2 } from 'lucide-react';

interface NoteData {
  id: string;
  title: string;
  content: string;
  skillId: string;
  createdAt: string;
}

export default function NotesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', skillId: '' });

  useEffect(() => {
    checkAuth();
    fetchNotes();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/learn/note');
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes || []);
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/learn" className="text-slate-400 hover:text-slate-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Catatan</h1>
                <p className="text-xs text-slate-400">{notes.length} catatan</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <Plus className="w-4 h-4 mr-2" /> Tambah
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Note Form */}
        {showForm && (
          <Card className="mb-6 bg-slate-800/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Tambah Catatan Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Judul</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Judul catatan"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Isi Catatan</Label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full h-32 bg-slate-700 border border-slate-600 rounded-md p-3 text-white resize-none"
                  placeholder="Tulis catatan Anda..."
                />
              </div>
              <div className="flex gap-2">
                <Button className="bg-emerald-500">Simpan</Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="border-slate-600 text-slate-300">
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes List */}
        {notes.length === 0 ? (
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Belum ada catatan</p>
              <p className="text-slate-500 text-sm mt-2">
                Buat catatan untuk membantu belajar
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <Card key={note.id} className="bg-slate-800/80 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{note.title}</h3>
                        <p className="text-slate-400 text-sm mt-2 line-clamp-3">{note.content}</p>
                        <p className="text-slate-500 text-xs mt-3">
                          Skill {note.skillId} • {new Date(note.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </main>
    </div>
  );
}
