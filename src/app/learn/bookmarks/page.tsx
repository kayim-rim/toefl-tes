'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Bookmark, Loader2, Trash2 } from 'lucide-react';
import { useLearningAccess } from '@/hooks/useLearningAccess';

interface BookmarkData {
  id: string;
  skillId: string;
  note?: string;
  createdAt: string;
}

export default function BookmarksPage() {
  const { isLoading: isLoadingAuth, hasAccess } = useLearningAccess();
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (hasAccess) {
      fetchBookmarks();
    }
  }, [hasAccess]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/learn/bookmark');
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks || []);
      }
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err);
    } finally {
      setIsLoadingData(false);
    }
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
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Bookmark</h1>
              <p className="text-xs text-slate-400">Soal yang ditandai</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {bookmarks.length === 0 ? (
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="text-center py-12">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Belum ada bookmark</p>
              <p className="text-slate-500 text-sm mt-2">
                Tandai soal saat belajar untuk menyimpan di sini
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <Link key={bookmark.id} href={`/learn/skill/${bookmark.skillId}`}>
                  <Card className="bg-slate-800/80 border-slate-700 hover:border-amber-500/50 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Skill {bookmark.skillId}</p>
                          {bookmark.note && (
                            <p className="text-slate-400 text-sm mt-1">{bookmark.note}</p>
                          )}
                          <p className="text-slate-500 text-xs mt-2">
                            {new Date(bookmark.createdAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            // Delete bookmark
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </main>
    </div>
  );
}
