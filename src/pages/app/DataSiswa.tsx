import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Edit3, Trash2, GraduationCap, X, Loader2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  nis: string;
  class: string;
}

export default function DataSiswa() {
  const [students, setStudents] = React.useState<Student[]>([
    { id: '1', name: 'Andi Wijaya', nis: '2024001', class: 'X TKJ 1' },
    { id: '2', name: 'Bella Chandra', nis: '2024002', class: 'X DKV 2' },
    { id: '3', name: 'Citra Dewi', nis: '2024003', class: 'X AK 1' },
    { id: '4', name: 'Dedi Kurniawan', nis: '2024004', class: 'X BC 1' },
    { id: '5', name: 'Eka Putri', nis: '2024005', class: 'X MPLB 1' },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [formData, setFormData] = React.useState({ name: '', nis: '', class: 'X TKJ 1' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.nis.includes(searchQuery)
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi delay proses
    setTimeout(() => {
      const newStudent: Student = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      
      setStudents(prev => [newStudent, ...prev]);
      setFormData({ name: '', nis: '', class: 'X TKJ 1' });
      setIsModalOpen(false);
      setIsSubmitting(false);
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Manajemen Data Siswa</h1>
          <p className="text-gray-500 font-medium tracking-tight">Kelola database siswa untuk kebutuhan absensi.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Tambah Siswa Baru
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between gap-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan NIS atau Nama..." 
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Student Info</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">NIS Number</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Class / Rombel</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={student.id} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <GraduationCap size={18} />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-500 font-mono italic">{student.nis}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-700">{student.class}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                    Tidak ada data siswa ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Student */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tambah Siswa</h2>
                  <p className="text-sm text-gray-500 font-medium">Lengkapi data siswa secara detail.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-4">Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Muhammad Rafli"
                    className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-4">Nomor Induk Siswa (NIS)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.nis}
                    onChange={(e) => setFormData({...formData, nis: e.target.value})}
                    placeholder="Contoh: 2024099"
                    className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-4">Pilih Kelas</label>
                  <select 
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none font-bold"
                  >
                    <option value="X TKJ 1">X TKJ 1</option>
                    <option value="X TKJ 2">X TKJ 2</option>
                    <option value="X DKV 1">X DKV 1</option>
                    <option value="X AK 1">X AK 1</option>
                    <option value="X BC 1">X BC 1</option>
                    <option value="X MPLB 1">X MPLB 1</option>
                  </select>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : "Simpan Data Siswa"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

