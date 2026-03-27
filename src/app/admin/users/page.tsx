'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, Users, Plus, Loader2, Trash2, Edit, Power, PowerOff,
  Search, UserCog, Home
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  name: string;
  status: string;
  createdAt: string;
  _count: {
    progress: number;
    testResults: number;
  };
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        router.push('/admin/login');
      }
    } catch (err) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ username: '', password: '', name: '' });
        setShowForm(false);
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.error || 'Gagal membuat user');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: currentStatus === 'active' ? 'inactive' : 'active' 
        }),
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Yakin ingin menghapus user ini?')) return;
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-slate-400 hover:text-slate-200">
                <Home className="w-5 h-5" />
              </Link>
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <Link href="/admin" className="text-slate-400 hover:text-slate-200 text-sm">
                Admin
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <UserCog className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Manage Users</h1>
                <p className="text-xs text-slate-400">Kelola akun pembelajaran</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-amber-500 to-orange-500"
          >
            {showForm ? 'Batal' : <><Plus className="w-4 h-4 mr-2" /> Tambah User</>}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add User Form */}
        {showForm && (
          <Card className="mb-6 bg-slate-800/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Tambah User Baru</CardTitle>
              <CardDescription className="text-slate-400">
                Buat akun baru untuk akses pembelajaran
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateUser}>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Nama Lengkap"
                    required
                  />
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                  Simpan User
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari user..."
              className="pl-10 bg-slate-800/80 border-slate-700 text-white"
            />
          </div>
        </div>

        {/* Users List */}
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Daftar User ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="divide-y divide-slate-700">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 hover:bg-slate-700/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{user.name}</span>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-600 text-slate-400'}>
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-400">
                          @{user.username} • {user._count.progress} skills selesai • {user._count.testResults} test
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={user.status === 'active' 
                          ? 'border-slate-600 text-slate-300 hover:bg-red-500/20 hover:text-red-400'
                          : 'border-slate-600 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400'
                        }
                      >
                        {user.status === 'active' ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="border-slate-600 text-slate-300 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    {searchQuery ? 'Tidak ada user yang ditemukan' : 'Belum ada user'}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
