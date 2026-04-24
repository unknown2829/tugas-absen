import React from 'react';
import { motion } from 'motion/react';
import { Search, Save, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AbsensiSiswa() {
  const [selectedClass, setSelectedClass] = React.useState('TKJ-1');
  const [attendance, setAttendance] = React.useState<Record<string, 'hadir' | 'izin' | 'sakit' | 'alfa'>>({});

  const students = [
    { id: '1', nis: '2024001', name: 'Andi Wijaya' },
    { id: '2', nis: '2024002', name: 'Bella Chandra' },
    { id: '3', nis: '2024003', name: 'Citra Dewi' },
    { id: '4', nis: '2024004', name: 'Dedi Kurniawan' },
    { id: '5', nis: '2024005', name: 'Eka Putri' },
    { id: '6', nis: '2024006', name: 'Fadil Muhammad' },
    { id: '7', nis: '2024007', name: 'Gita Savitri' },
    { id: '8', nis: '2024008', name: 'Hadi Prasetyo' },
  ];

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleStatusChange = (studentId: string, status: 'hadir' | 'izin' | 'sakit' | 'alfa') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    if (Object.keys(attendance).length === 0) {
      alert('Silakan pilih kehadiran minimal satu siswa.');
      return;
    }

    setIsSubmitting(true);
    // Simulasi simpan ke database
    setTimeout(() => {
      setIsSubmitting(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Absensi Siswa</h1>
          <p className="text-gray-500 font-medium tracking-tight">Input kehadiran harian siswa per kelas.</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <option value="TKJ-1">X TKJ 1</option>
            <option value="TKJ-2">X TKJ 2</option>
            <option value="DKV-1">X DKV 1</option>
            <option value="AK-1">X AK 1</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={isSubmitting || saveSuccess}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex gap-1 animate-pulse">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            ) : saveSuccess ? (
              <><CheckCircle2 size={18} /> Berhasil!</>
            ) : (
              <><Save size={18} /> Simpan Absensi</>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari NIS atau Nama Siswa..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-blue-50 transition-all outline-none"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-gray-100">
              <Clock size={14} /> Jam: 07:15
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl">
              <CheckCircle2 size={14} /> {Object.keys(attendance).length} / {students.length} Terabsen
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-gray-400">Siswa</th>
                <th className="px-8 py-5 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{student.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">NIS: {student.nis}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center items-center gap-2">
                      {[
                        { label: 'Hadir', value: 'hadir', color: 'bg-green-50 text-green-600 border-green-200' },
                        { label: 'Izin', value: 'izin', color: 'bg-amber-50 text-amber-600 border-amber-200' },
                        { label: 'Sakit', value: 'sakit', color: 'bg-blue-50 text-blue-600 border-blue-200' },
                        { label: 'Alfa', value: 'alfa', color: 'bg-red-50 text-red-600 border-red-200' },
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleStatusChange(student.id, status.value as any)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                            attendance[student.id] === status.value 
                              ? status.color + " shadow-md scale-105" 
                              : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                          )}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
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
