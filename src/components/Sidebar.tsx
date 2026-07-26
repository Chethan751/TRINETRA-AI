import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Shield,
  Bot,
  FileText,
  Bell,
  FolderLock,
  Users,
  Settings,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { NavSection, Language } from '../types';
import kspCrestImage from '../assets/images/ksp_crest_gold_1785075700506.jpg';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  language: Language;
  unreadAlertsCount?: number;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  language,
  unreadAlertsCount = 12,
  onLogout
}) => {
  const menuItems = [
    {
      id: 'DASHBOARD' as NavSection,
      labelEn: 'Dashboard',
      labelKn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      icon: LayoutDashboard,
    },
    {
      id: 'HEATMAP' as NavSection,
      labelEn: 'Crime Heatmap',
      labelKn: 'ಅಪರಾಧ ಹೀಟ್‌ಮ್ಯಾಪ್',
      icon: MapPin,
    },
    {
      id: 'PREDICTION' as NavSection,
      labelEn: 'Crime Prediction',
      labelKn: 'ಅಪರಾಧ ಮುನ್ಸೂಚನೆ',
      icon: TrendingUp,
    },
    {
      id: 'PATROL' as NavSection,
      labelEn: 'Patrol Route',
      labelKn: 'ಗಸ್ತು ಮಾರ್ಗ',
      icon: Shield,
    },
    {
      id: 'CHATBOT' as NavSection,
      labelEn: 'AI Chatbot',
      labelKn: 'ಎಐ ಚಾಟ್‌ಬಾಟ್',
      icon: Bot,
    },
    {
      id: 'REPORTS' as NavSection,
      labelEn: 'Reports',
      labelKn: 'ವರದಿಗಳು',
      icon: FileText,
    },
    {
      id: 'ALERTS' as NavSection,
      labelEn: 'Alerts & Notifications',
      labelKn: 'ಎಚ್ಚರಿಕೆಗಳು & ಸೂಚನೆಗಳು',
      icon: Bell,
      badge: unreadAlertsCount,
    },
    {
      id: 'CASES' as NavSection,
      labelEn: 'Cases',
      labelKn: 'ಪ್ರಕರಣಗಳು',
      icon: FolderLock,
    },
    {
      id: 'ACCUSED' as NavSection,
      labelEn: 'Accused Database',
      labelKn: 'ಆರೋಪಿಗಳ ಡೇಟಾಬೇಸ್',
      icon: Users,
    },
    {
      id: 'SETTINGS' as NavSection,
      labelEn: 'Settings',
      labelKn: 'ಸಂಯೋಜನೆಗಳು',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-[#0a0e1a] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-full select-none z-30 transition-all duration-300">
      {/* Top Branding Section */}
      <div>
        <div className="p-4 border-b border-slate-800/80 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-amber-500/50 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
            <img
              src={kspCrestImage}
              alt="KSP Crest"
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-sm font-extrabold tracking-wider text-slate-100 font-serif leading-tight">
              TRINETRA-AI
            </h1>
            <p className="text-[10px] text-slate-400 font-sans tracking-tight truncate">
              {language === 'kn' ? 'ಅಪರಾಧ ಮಾದರಿ ಜಾಣ್ಮೆ ವೇದಿಕೆ' : 'Crime Pattern Intelligence Platform'}
            </p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] no-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span className="truncate">
                    {language === 'kn' ? item.labelKn : item.labelEn}
                  </span>
                </div>
                {item.badge ? (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive
                        ? 'bg-red-500 text-white'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-all duration-200 mt-2"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>{language === 'kn' ? 'ನಿರ್ಗಮಿಸಿ' : 'Logout'}</span>
          </button>
        </nav>
      </div>

      {/* Bottom System Status Widget */}
      <div className="p-3 m-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between shadow-inner">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-md bg-blue-950 border border-blue-800/60 text-blue-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-200">
              {language === 'kn' ? 'ವ್ಯವಸ್ಥೆಯ ಸ್ಥಿತಿ' : 'System Status'}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">
              {language === 'kn' ? 'ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ' : 'All Systems Operational'}
            </div>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </aside>
  );
};
