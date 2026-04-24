import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  GraduationCap,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { UserRole } from '../../types';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const role = (localStorage.getItem('user_role') || 'staff') as UserRole;

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard, roles: ['admin', 'guru', 'staff'] },
    { name: 'Absensi Karyawan', path: '/app/absensi-karyawan', icon: UserCheck, roles: ['admin', 'guru', 'staff'] },
    { name: 'Absensi Siswa', path: '/app/absensi-siswa', icon: Users, roles: ['admin', 'guru'] },
    { name: 'Rekap Absensi', path: '/app/rekap', icon: FileText, roles: ['admin', 'guru'], sub: [
      { name: 'Absensi Karyawan', path: '/app/rekap/karyawan', roles: ['admin'] },
      { name: 'Absensi Siswa', path: '/app/rekap/siswa', roles: ['admin', 'guru'] },
    ]},
    { name: 'Data Siswa', path: '/app/data-siswa', icon: GraduationCap, roles: ['admin'] },
    { name: 'User Management', path: '/app/users', icon: Settings, roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col pt-8 pb-4 transition-transform duration-300 lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-8 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <GraduationCap size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-blue-950">SPU Portal</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">SMK Prima Unggul</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path || (item.sub && location.pathname.startsWith(item.path));
            
            return (
              <div key={item.path} className="space-y-1">
                <Link
                  to={item.path}
                  onClick={() => !item.sub && setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-2xl transition-all group",
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-bold" 
                      : "text-gray-500 hover:bg-gray-50 font-medium"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={cn(isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600")} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.sub && (
                    <ChevronRight size={16} className={cn("transition-transform", isActive && "rotate-90")} />
                  )}
                </Link>

                {item.sub && isActive && (
                  <div className="pl-12 space-y-1 mt-1">
                    {item.sub.filter(sub => sub.roles.includes(role)).map(sub => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "block py-2 text-sm transition-colors",
                          location.pathname === sub.path 
                            ? "text-blue-600 font-bold" 
                            : "text-gray-400 hover:text-gray-600 font-medium"
                        )}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {role.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 capitalize">{role} Account</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Authenticated</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed italic">
              Akses terbatas sesuai dengan peranan anda dalam sistem.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-48 md:w-96 hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari fitur..." 
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button className="relative text-gray-400 hover:text-blue-600 transition-colors p-2">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">2</span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100 hidden md:block" />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs md:text-sm font-bold hover:bg-red-100 transition-all"
            >
              <LogOut size={18} />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
