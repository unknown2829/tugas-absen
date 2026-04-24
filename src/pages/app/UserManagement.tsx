import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Search, Shield, ShieldAlert, MoreVertical, Edit3, Trash2, Key } from 'lucide-react';

export default function UserManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">User Management</h1>
          <p className="text-gray-500 font-medium tracking-tight">Sinkronisasi data user dengan Supabase Authentication.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <UserPlus size={20} />
          Create New User
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 bg-gray-50/20">
              <div className="relative max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Seach by name or email..." 
                  className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm outline-none"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-gray-50">
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Administrator', email: 'admin@smkprima.sch.id', role: 'admin' },
                    { name: 'Siti Aminah, M.Pd', email: 'siti@smkprima.sch.id', role: 'guru' },
                    { name: 'Budi Santoso', email: 'budi@smkprima.sch.id', role: 'guru' },
                    { name: 'Maya Sari', email: 'maya@smkprima.sch.id', role: 'staff' },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                            user.role === 'admin' ? "bg-red-50 text-red-600" : user.role === 'guru' ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"
                          )}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          {user.role === 'admin' ? <ShieldAlert size={14} className="text-red-500" /> : <Shield size={14} className="text-blue-500" />}
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            user.role === 'admin' ? "text-red-500" : user.role === 'guru' ? "text-blue-500" : "text-gray-400"
                          )}>
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-all">
                            <Key size={18} />
                          </button>
                           <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Informasi Sistem</h3>
            <div className="space-y-6">
               <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Status Database</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Supabase Connected
                  </div>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Active Users</div>
                  <div className="text-2xl font-black text-gray-900">42 Karyawan</div>
               </div>
            </div>
          </div>

          <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-2 rounded-xl text-red-600">
                <ShieldAlert size={20} />
              </div>
              <h4 className="font-bold text-red-900">Privileged Actions</h4>
            </div>
            <p className="text-xs text-red-800/80 mb-6 leading-relaxed font-medium">
              Tindakan hapus user bersifat permanen dan akan menghapus data autentikasi sepenuhnya dari server Supabase.
            </p>
            <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-sm tracking-tight hover:bg-red-700 transition-all shadow-lg shadow-red-200">
              Bulk Archive Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
