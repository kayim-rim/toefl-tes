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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft, Users, Plus, Loader2, Trash2, Edit, Power, PowerOff,
  Search, UserCog, Home, Crown, GraduationCap, Calendar
} from 'lucide-react';

// User tier type
type UserTier = 'free' | 'tes' | 'student';

// Tier display info
const TIER_INFO: Record<UserTier, { name: string; color: string; bgColor: string; price: number }> = {
  free: { name: 'Gratis', color: 'text-slate-300', bgColor: 'bg-slate-500/20', price: 0 },
  tes: { name: 'Tes', color: 'text-blue-300', bgColor: 'bg-blue-500/20', price: 10000 },
  student: { name: 'Student', color: 'text-emerald-300', bgColor: 'bg-emerald-500/20', price: 25000 }
};

interface User {
  id: string;
  username: string;
  name: string;
  email: string | null;
  status: string;
  tier: UserTier;
  tierExpiresAt: string | null;
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
  const [formData, setFormData] = useState({ username: '', password: '', name: '', tier: 'free' as UserTier });
  const [searchQuery, setSearchQuery] = useState('');

  // Tier upgrade dialog
  const [showTierDialog, setShowTierDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newTier, setNewTier] = useState<UserTier>('free');
  const [isUpdatingTier, setIsUpdatingTier] = useState(false);

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
        setFormData({ username: '', password: '', name: '', tier: 'free' });
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

  const openTierDialog = (user: User) => {
    setSelectedUser(user);
    setNewTier(user.tier);
    setShowTierDialog(true);
  };

  const handleUpdateTier = async () => {
    if (!selectedUser) return;
    setIsUpdatingTier(true);

    try {
      // Calculate expiry date (1 year from now for non-free tiers)
      const expiresAt = newTier !== 'free'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : null;

      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: newTier,
          tierExpiresAt: expiresAt
        }),
      });

      if (response.ok) {
        setShowTierDialog(false);
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.error || 'Gagal mengupdate tier');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    } finally {
      setIsUpdatingTier(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate tier statistics
  const tierStats = {
    free: users.filter(u => u.tier === 'free').length,
    tes: users.filter(u => u.tier === 'tes').length,
    student: users.filter(u => u.tier === 'student').length,
  };

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
        {/* Tier Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Free</p>
                  <p className="text-2xl font-bold text-slate-300">{tierStats.free}</p>
                </div>
                <Badge className="bg-slate-500/20 text-slate-300">Gratis</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Tes</p>
                  <p className="text-2xl font-bold text-blue-300">{tierStats.tes}</p>
                </div>
                <Crown className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Student</p>
                  <p className="text-2xl font-bold text-emerald-300">{tierStats.student}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

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
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">Username/Email</Label>
                  <Input
                    id="username"
                    type="email"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="email@example.com"
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
                <div className="space-y-2">
                  <Label htmlFor="tier" className="text-slate-300">Tier</Label>
                  <Select value={formData.tier} onValueChange={(value: UserTier) => setFormData({ ...formData, tier: value })}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Gratis</SelectItem>
                      <SelectItem value="tes">Tes (Rp 10.000/thn)</SelectItem>
                      <SelectItem value="student">Student (Rp 25.000/thn)</SelectItem>
                    </SelectContent>
                  </Select>
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
            <ScrollArea className="h-[calc(100vh-500px)]">
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
                          <Badge className={`${TIER_INFO[user.tier].bgColor} ${TIER_INFO[user.tier].color}`}>
                            {user.tier === 'tes' && <Crown className="w-3 h-3 mr-1" />}
                            {user.tier === 'student' && <GraduationCap className="w-3 h-3 mr-1" />}
                            {TIER_INFO[user.tier].name}
                          </Badge>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-600 text-slate-400'}>
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-400 flex items-center gap-4">
                          <span>@{user.username}</span>
                          <span>{user._count.progress} skills selesai</span>
                          <span>{user._count.testResults} test</span>
                          {user.tierExpiresAt && (
                            <span className="flex items-center gap-1 text-xs">
                              <Calendar className="w-3 h-3" />
                              Exp: {new Date(user.tierExpiresAt).toLocaleDateString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openTierDialog(user)}
                        className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                        title="Ubah Tier"
                      >
                        <Crown className="w-4 h-4" />
                      </Button>
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

      {/* Tier Update Dialog */}
      <Dialog open={showTierDialog} onOpenChange={setShowTierDialog}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Ubah Tier User</DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedUser?.name} ({selectedUser?.username})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="text-slate-300 mb-2 block">Pilih Tier Baru</Label>
            <Select value={newTier} onValueChange={(value: UserTier) => setNewTier(value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">
                  <div className="flex items-center gap-2">
                    <span>Gratis</span>
                    <span className="text-slate-400 text-xs">- Akses Paket A & B</span>
                  </div>
                </SelectItem>
                <SelectItem value="tes">
                  <div className="flex items-center gap-2">
                    <span>Tes</span>
                    <span className="text-blue-400 text-xs">- Rp 10.000/tahun</span>
                  </div>
                </SelectItem>
                <SelectItem value="student">
                  <div className="flex items-center gap-2">
                    <span>Student</span>
                    <span className="text-emerald-400 text-xs">- Rp 25.000/tahun</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {newTier !== 'free' && (
              <p className="text-sm text-slate-400 mt-2">
                Berlaku hingga: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTierDialog(false)}
              className="border-slate-600 text-slate-300"
            >
              Batal
            </Button>
            <Button
              onClick={handleUpdateTier}
              disabled={isUpdatingTier}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {isUpdatingTier ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
