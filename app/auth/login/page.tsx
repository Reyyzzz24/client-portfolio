"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';
import Link from 'next/link'; // 1. Import Link dari next/link
import Button from '../../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login Error:", error.message); // <--- Lihat pesan ini di Console (F12)
      toast.error(error.message);
    } else {
      console.log("Login Success:", data);
      toast.success("Login berhasil!");
      window.location.href = '/admin';
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-500 text-sm">Masukkan kredensial untuk masuk</p>
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
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:border-black transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full justify-center" disabled={loading}>
          {loading ? "Memproses..." : (
            <>
              <LogIn size={18} /> Sign In
            </>
          )}
        </Button>

        {/* 2. Tambahkan teks link ke halaman register */}
        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="text-black font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}