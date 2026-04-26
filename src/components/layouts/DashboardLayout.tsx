import { ReactNode, useEffect, useState } from 'react';
import { LayoutDashboard, Users, Calendar, Pill, Database, Settings, ChevronDown } from 'lucide-react';
import { doctorProfileApi } from '../../api/doctorProfile';

interface DashboardLayoutProps {
  children: ReactNode;
  activeNav?: string;
  onNavigate?: (screen: string) => void;
}

export default function DashboardLayout({ children, activeNav = 'Dashboard', onNavigate }: DashboardLayoutProps) {
  const [doctor, setDoctor] = useState<{ name: string; qualification: string; profile_image: string | null } | null>(null);

  useEffect(() => {
    doctorProfileApi.getProfile()
      .then((data) => setDoctor({ name: data.name, qualification: data.qualification, profile_image: data.profile_image }))
      .catch(() => {});
  }, []);

  const initials = doctor?.name
    ? doctor.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'DR';
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: activeNav === 'Dashboard' },
    { icon: Users, label: 'Patients', active: activeNav === 'Patients' },
    { icon: Calendar, label: 'Visits', active: activeNav === 'Visits' },
    { icon: Pill, label: 'Medicine Suggestion', active: activeNav === 'Medicine Suggestion' },
    { icon: Database, label: 'Sources', active: activeNav === 'Sources' },
    { icon: Settings, label: 'Settings', active: activeNav === 'Settings' },
  ];

  const getScreenName = (label: string) => {
    switch (label) {
      case 'Dashboard': return 'dashboard';
      case 'Patients': return 'patients';
      case 'Visits': return 'add-visit';
      case 'Medicine Suggestion': return 'medicine-suggestion';
      case 'Sources': return 'results';
      case 'Settings': return 'settings';
      default: return 'dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1F9CA7] rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" fill="white"/>
                <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" fill="white" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <div className="text-slate-900">Homeo Clinic</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate?.(getScreenName(item.label))}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? 'bg-[#1F9CA7] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-slate-200 shrink-0">
          <div 
            onClick={() => onNavigate?.('doctor-profile')}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 overflow-hidden">
              {doctor?.profile_image
                ? <img src={doctor.profile_image} alt="profile" className="w-full h-full object-cover" />
                : <span className="text-sm font-bold">{initials}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-900 truncate">{doctor?.name || 'Doctor'}</div>
              <div className="text-slate-500 truncate text-sm">{doctor?.qualification || ''}</div>
            </div>
            <ChevronDown size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
