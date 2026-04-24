import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, Users, UserCheck, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RekapKaryawan() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Rekap Absensi Karyawan</h1>
          <p className="text-gray-500 font-medium tracking-tight tracking-tight">Hanya dapat diakses oleh Administrator.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Download size={18} />
            Download Laporan Bulanan
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: 'Tepat Waktu', value: '42', color: 'text-green-600', icon: UserCheck },
          { label: 'Terlambat', value: '3', color: 'text-amber-600', icon: Clock },
          { label: 'Tidak Hadir', value: '1', color: 'text-red-600', icon: Users },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{item.label}</div>
              <div className={"text-4xl font-extrabold " + item.color}>{item.value}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-gray-400">
              <item.icon size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/20 flex items-center gap-3">
          <ShieldCheck size={20} className="text-blue-500" />
          <h3 className="font-bold text-gray-900">Validasi Kehadiran Hari Ini</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-gray-400">Karyawan</th>
                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-gray-400">Jabatan</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Jam Masuk</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Lokasi</th>
                <th className="px-8 py-6 text-right text-[11px] font-black uppercase tracking-widest text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Dr. Ahmad Royan', role: 'Kepala Sekolah', time: '06:30', location: 'Office', status: 'Hadir' },
                { name: 'Siti Aminah, M.Pd', role: 'Waka Kurikulum', time: '06:45', location: 'Ruang Guru', status: 'Hadir' },
                { name: 'Budi Santoso', role: 'Guru TKJ', time: '07:10', location: 'Lab TKJ', status: 'Terlambat' },
                { name: 'Maya Sari', role: 'Staf TU', time: '06:55', location: 'Admin Room', status: 'Hadir' },
                { name: 'Rahmat Hidayat', role: 'Guru DKV', time: '-', location: '-', status: 'Sakit' },
              ].map((emp, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-gray-900">{emp.name}</td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-500">{emp.role}</td>
                  <td className="px-8 py-6 text-center text-sm font-bold text-blue-900 font-mono italic">{emp.time}</td>
                  <td className="px-8 py-6 text-center text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{emp.location}</td>
                  <td className="px-8 py-6 text-right">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold",
                      emp.status === 'Hadir' && "bg-green-50 text-green-600",
                      emp.status === 'Terlambat' && "bg-amber-50 text-amber-600",
                      emp.status === 'Sakit' && "bg-blue-50 text-blue-600"
                    )}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
