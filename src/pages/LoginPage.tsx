import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabase();
    if (!supabase) {
      // Mock login for demo if Supabase is not configured
      setTimeout(() => {
        if (email === 'admin@test.com' && password === 'admin123') {
          localStorage.setItem('user_role', 'admin');
          navigate('/app');
        } else if (email === 'guru@test.com' && password === 'guru123') {
          localStorage.setItem('user_role', 'guru');
          navigate('/app');
        } else if (email === 'staff@test.com' && password === 'staff123') {
          localStorage.setItem('user_role', 'staff');
          navigate('/app');
        } else {
          setError('Email atau password salah (Gunakan admin@test.com/admin123 untuk demo)');
        }
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Get user profile role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Fallback for demo: if profile table lookup fails, check email or default to staff
        const fallbackRole = email.includes('admin') ? 'admin' : email.includes('guru') ? 'guru' : 'staff';
        localStorage.setItem('user_role', fallbackRole);
        navigate('/app');
        return;
      }

      if (!profile) {
        // If account exists in Auth but no profile row yet
        const defaultRole = email.includes('admin') ? 'admin' : email.includes('guru') ? 'guru' : 'staff';
        localStorage.setItem('user_role', defaultRole);
        navigate('/app');
        return;
      }

      localStorage.setItem('user_role', profile.role);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-200/50 overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-blue-600 p-4 rounded-3xl text-white shadow-xl shadow-blue-200 mb-6">
              <GraduationCap size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Portal Absensi</h1>
            <p className="text-gray-500 font-medium text-sm mt-2">SMK Prima Unggul — Silakan masuk</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-4">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl transition-all outline-none font-medium"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-4">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl transition-all outline-none font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                'Masuk Sekarang'
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 font-medium tracking-tight">
              Lupa password? Hubungi <span className="text-blue-600 cursor-pointer">Admin IT</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
            >
              Kembali ke Landing Page
            </button>
        </div>
      </motion.div>
    </div>
  );
}
