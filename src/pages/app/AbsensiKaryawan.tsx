import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Camera, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AbsensiKaryawan() {
  const [time, setTime] = React.useState(new Date());
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');
  const [hasAttended, setHasAttended] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAttend = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setHasAttended(true);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Absensi Mandiri</h1>
        <p className="text-gray-500 font-medium text-lg">Pastikan lokasi dan kamera perangkat anda aktif.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Clock Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-blue-50 flex flex-col items-center justify-center text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Current Time</div>
          <div className="text-6xl font-black text-gray-900 tracking-tighter mb-2">
            {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm font-bold text-blue-600 mb-8">
            {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black uppercase text-gray-400">Location</div>
                <div className="text-xs font-bold text-gray-700">SMK Prima Unggul — Zone A</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Camera size={18} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black uppercase text-gray-400">Device</div>
                <div className="text-xs font-bold text-gray-700 font-mono tracking-tighter">FaceID Verification Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!hasAttended ? (
              <motion.div 
                key="attend"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="bg-blue-600 h-full rounded-[3rem] p-10 text-white flex flex-col items-center justify-center text-center shadow-2xl shadow-blue-200 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <CheckCircle size={64} className="mb-8 text-blue-200" />
                <h2 className="text-2xl font-black mb-4 tracking-tight">Presensi Masuk</h2>
                <p className="text-blue-100 text-sm font-medium mb-10 leading-relaxed">
                  Batas waktu keterlambatan adalah jam 07:15 WIB. Klik tombol dibawah untuk mulai verifikasi.
                </p>
                
                <button 
                  onClick={handleAttend}
                  disabled={status === 'loading'}
                  className="w-full bg-white text-blue-600 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  ) : (
                    "Kirim Presensi"
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-600 h-full rounded-[3rem] p-10 text-white flex flex-col items-center justify-center text-center shadow-2xl shadow-green-200"
              >
                <div className="bg-white/20 p-6 rounded-full mb-8">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-black mb-4 tracking-tight">Presensi Berhasil!</h2>
                <p className="text-green-50 text-sm font-medium mb-2">Terima kasih, data kehadiran anda telah tercatat pada:</p>
                <div className="text-3xl font-black mb-10 tracking-tight">06:45:22 WIB</div>
                
                <div className="w-full flex gap-3">
                  <button className="flex-1 bg-white/20 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition-all">
                    Lihat Histori
                  </button>
                  <button className="flex-1 bg-white text-green-600 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-green-900/20">
                    Selesai
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] flex items-start gap-6">
        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600 shrink-0">
          <AlertCircle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 mb-1">Informasi Penting</h4>
          <p className="text-sm text-amber-800/80 leading-relaxed">
            Sistem mendeteksi lokasi anda melalui GPS perangkat. Pastikan anda berada dalam radius 100 meter dari titik koordinat SMK Prima Unggul untuk dapat melakukan absensi. Hubungi staf IT jika terjadi kendala teknis.
          </p>
        </div>
      </div>
    </div>
  );
}
