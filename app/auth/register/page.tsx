"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import Button from '../../components/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Pendaftaran berhasil! Anda bisa langsung login.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Register</h1>
          <p className="text-gray-500 text-sm">Buat akun admin baru</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:border-black transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:border-black transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full justify-center" disabled={loading}>
          {loading ? "Memproses..." : (
            <>
              <UserPlus size={18} /> Sign Up
            </>
          )}
        </Button>
      </form>
    </div>
  );
}