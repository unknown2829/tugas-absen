import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Briefcase, ChevronRight, Menu, X } from 'lucide-react';
import { MAJORS } from '../constants';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900">SMK Prima Unggul</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#profil" className="hover:text-blue-600 transition-colors">Profil</a>
              <a href="#jurusan" className="hover:text-blue-600 transition-colors">Jurusan</a>
              <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Login Aplikasi
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 p-4 flex flex-col gap-4 text-sm font-medium"
          >
            <a href="#profil" onClick={() => setIsMenuOpen(false)}>Profil</a>
            <a href="#jurusan" onClick={() => setIsMenuOpen(false)}>Jurusan</a>
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-center font-bold">
              Login Aplikasi
            </Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 tracking-wide uppercase">
                Welcome to Excellence
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-gray-900">
                Membentuk Generasi <span className="text-blue-600">Terampil</span> & Berkarakter
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                SMK Prima Unggul hadir sebagai wadah inovasi dan kreativitas siswa dalam menghadapi tantangan industri 4.0 melalui kurikulum yang adaptif dan fasilitas modern.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all group">
                  E-Absensi App <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#jurusan" className="px-8 py-4 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-all">
                  Lihat Jurusan
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                  alt="Students learning" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1200+</div>
                    <div className="text-sm text-gray-500 font-medium tracking-tight">Siswa Aktif</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profil" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Profil SMK Prima Unggul</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Berkomitmen mencetak sumber daya manusia yang kompeten di bidangnya masing-masing dengan mengedepankan etos kerja dan profesionalisme.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Kurikulum Industri', desc: 'Kurikulum disesuaikan dengan kebutuhan pasar kerja terkini.' },
              { icon: Briefcase, title: 'Praktik Kerja', desc: 'Bekerjasama dengan lebih dari 50 perusahaan ternama di Indonesia.' },
              { icon: GraduationCap, title: 'Lulusan Kompeten', desc: 'Alumni tersebar di berbagai sektor industri dan pemerintahan.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mb-6">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Majors Section */}
      <section id="jurusan" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Specialties</span>
              <h2 className="text-4xl font-bold tracking-tight">6 Jurusan Unggulan</h2>
            </div>
            <p className="text-gray-500 max-w-md font-medium">Pilih jalur karirmu sesuai passion dan kembangkan potensimu bersama tenaga pengajar ahli.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAJORS.map((major, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
              >
                <div className="absolute top-8 right-8 text-4xl font-black text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
                  {major.code}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-blue-900 leading-tight">{major.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{major.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Mata Pelajaran Utama</h4>
                    <div className="flex flex-wrap gap-2">
                      {major.subjects.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100 font-bold uppercase tracking-tighter">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Prospek Karir</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {major.prospects.slice(0, 3).map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <motion.button 
                  className="mt-8 w-full py-4 rounded-2xl bg-blue-50 text-blue-700 font-bold text-sm tracking-tight hover:bg-blue-600 hover:text-white transition-all"
                >
                  Detail Selengkapnya
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap size={32} />
              </div>
              <span className="text-2xl font-bold">SMK Prima Unggul</span>
            </div>
            <p className="text-blue-200/60 max-w-xs text-sm">
              Jl. Pendidikan No. 45, Jakarta Selatan. Mencetak generasi unggul sejak 2005.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 font-medium text-blue-200/80">
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold mb-2">Internal App</span>
              <Link to="/login" className="hover:text-white">Admin Login</Link>
              <Link to="/login" className="hover:text-white">Guru Portal</Link>
              <Link to="/login" className="hover:text-white">Staff Presence</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-8 text-center text-blue-200/40 text-xs tracking-widest font-medium uppercase">
          &copy; 2024 SMK Prima Unggul. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
