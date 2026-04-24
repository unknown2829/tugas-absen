import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, Filter, ChevronRight, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RekapSiswa() {
  const data = [
    { class: 'X TKJ 1', students: 36, present: '92%', excused: 2, sick: 1, dynamic: '+2%' },
    { class: 'X TKJ 2', students: 34, present: '88%', excused: 1, sick: 3, dynamic: '-1%' },
    { class: 'X DKV 1', students: 32, present: '95%', excused: 0, sick: 1, dynamic: '+4%' },
    { class: 'X AK 1', students: 35, present: '90%', excused: 2, sick: 2, dynamic: '0%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Rekap Absensi Siswa</h1>
          <p className="text-gray-500 font-medium tracking-tight tracking-tight">Pantau performa kehadiran siswa seluruh jurusan.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
            <Filter size={18} />
            Filter Periode
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Presence', value: '91.2%', sub: 'Siswa' },
          { label: 'Total Izin', value: '5', sub: 'Hari ini' },
          { label: 'Total Sakit', value: '7', sub: 'Hari ini' },
          { label: 'Ketidakhadiran', value: '18', sub: 'Tanpa Keterangan' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-blue-500 uppercase tracking-tighter">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-gray-400">Kelas / Rombel</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Total Siswa</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Persentase Hadir</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Izin</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Sakit</th>
                <th className="px-8 py-6 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Trend</th>
                <th className="px-8 py-6 text-right text-[11px] font-black uppercase tracking-widest text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                        <GraduationCap size={20} />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.class}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-bold text-gray-700">{item.students}</td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-black text-gray-900">{item.present}</span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: item.present }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-medium text-amber-600">{item.excused}</td>
                  <td className="px-8 py-6 text-center text-sm font-medium text-blue-600">{item.sick}</td>
                  <td className="px-8 py-6 text-center text-xs font-black text-green-600">{item.dynamic}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-400 tracking-tight">Menampilkan data absensi periode April 2026</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(p => (
              <button key={p} className={cn(
                "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                p === 1 ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
              )}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
