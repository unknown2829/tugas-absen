import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/app/Dashboard';
import AbsensiKaryawan from './pages/app/AbsensiKaryawan';
import AbsensiSiswa from './pages/app/AbsensiSiswa';
import RekapSiswa from './pages/app/RekapSiswa';
import RekapKaryawan from './pages/app/RekapKaryawan';
import DataSiswa from './pages/app/DataSiswa';
import UserManagement from './pages/app/UserManagement';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="absensi-karyawan" element={<AbsensiKaryawan />} />
          <Route path="absensi-siswa" element={<AbsensiSiswa />} />
          <Route path="rekap" element={<Navigate to="/app/rekap/siswa" replace />} />
          <Route path="rekap/siswa" element={<RekapSiswa />} />
          <Route path="rekap/karyawan" element={<RekapKaryawan />} />
          <Route path="data-siswa" element={<DataSiswa />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
