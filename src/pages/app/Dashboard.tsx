import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';

export default function Dashboard() {
  const role = (localStorage.getItem('user_role') || 'staff') as UserRole;
  const navigate = useNavigate();
  
  const stats = [
    { name: 'Total Siswa Hadir', value: '1,142', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Kehadiran Karyawan', value: '98%', change: '+2%', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Siswa Izin/Sakit', value: '24', change: '-5%', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Rata-rata Jam Masuk', value: '06:55', change: 'On Time', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Selamat Datang, {role.charAt(0).toUpperCase() + role.slice(1)}!</h1>
          <p className="text-gray-500 font-medium tracking-tight flex items-center gap-2">
            <Calendar size={18} />
            Jumat, 24 April 2026 — Sesi Akademik Pagi
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
            Download Laporan
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2">
            Update Data <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={stat.bg + " p-3.5 rounded-2xl " + stat.color}>
                <stat.icon size={26} />
              </div>
              <span className={stat.change.startsWith('+') ? "text-green-600 font-bold text-xs" : "text-gray-400 font-bold text-xs"}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">{stat.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Aktifitas Absensi Terbaru</h2>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: 'Andi Wijaya', role: 'Siswa (TKJ)', time: '06:45', status: 'Hadir', type: 'student' },
              { name: 'Budi Santoso', role: 'Guru', time: '06:40', status: 'Hadir', type: 'employee' },
              { name: 'Citra Dewi', role: 'Siswa (DKV)', time: '06:50', status: 'Hadir', type: 'student' },
              { name: 'Dedi Kurniawan', role: 'Staff', time: '06:55', status: 'Izin', type: 'employee' },
              { name: 'Eka Putri', role: 'Siswa (AK)', time: '07:05', status: 'Hadir', type: 'student' },
            ].map((activity, i) => (
              <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={activity.type === 'student' ? "bg-blue-50 text-blue-600 p-2.5 rounded-xl" : "bg-indigo-50 text-indigo-600 p-2.5 rounded-xl"}>
                    {activity.type === 'student' ? <Users size={20} /> : <UserCheck size={20} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{activity.name}</div>
                    <div className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">{activity.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">{activity.time}</div>
                    <div className="text-[10px] text-gray-400 font-bold">WIB</div>
                  </div>
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold",
                    activity.status === 'Hadir' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50 text-center">
            <button className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua Aktifitas</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <CheckCircle2 size={240} />
            </div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Sudah Absen Hari ini?</h3>
            <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium relative z-10">Pastikan anda melakukan absensi mandiri sebelum jam 07:15 WIB untuk tercatat hadir tepat waktu.</p>
            <button 
              onClick={() => navigate(role === 'admin' || role === 'guru' ? '/app/absensi-siswa' : '/app/absensi-karyawan')}
              className="w-full bg-white text-blue-600 py-4 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-blue-50 transition-all relative z-10"
            >
              Absen Sekarang
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Informasi Sekolah</h3>
            <div className="space-y-6">
              {[
                { label: 'Ujian Tengah Semester', date: '12 Mei 2026' },
                { label: 'Rapat Orang Tua', date: '15 Mei 2026' },
                { label: 'Libur Nasional', date: '01 Juni 2026' },
              ].map((info, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-gray-800">{info.label}</span>
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wide">{info.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
