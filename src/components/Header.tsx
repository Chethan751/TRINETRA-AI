import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown, UserCheck, Shield, RefreshCw, LogOut, Settings } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageToggle: (lang: Language) => void;
  onOpenAdminPanel?: () => void;
  onSearchQuery?: (query: string) => void;
  unreadCount?: number;
  onOpenNotifications?: () => void;
  isSyncing?: boolean;
  onTriggerSync?: () => void;
  onLogout?: () => void;
  officerName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageToggle,
  onOpenAdminPanel,
  onSearchQuery,
  unreadCount = 12,
  onOpenNotifications,
  isSyncing = false,
  onTriggerSync,
  onLogout,
  officerName = 'Inspector Arjun'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchQuery) {
      onSearchQuery(e.target.value);
    }
  };

  return (
    <header className="h-16 bg-[#0a0e1a] border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Search Bar Input */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={
              language === 'kn'
                ? 'ಎಫ್‌ಐಆರ್, ಆರೋಪಿ, ಸ್ಥಳ, ಅಪರಾಧ ಶೋಧಿಸಿ...'
                : 'Search FIR, Accused, Location, Crime...'
            }
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-blue-500 text-xs text-slate-200 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 transition-all outline-none"
          />
        </div>
      </div>

      {/* Right User & System Controls */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Live Sync Action */}
        <button
          onClick={onTriggerSync}
          title={isSyncing ? 'Syncing Catalyst Data Store...' : 'Sync Data'}
          className={`p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer ${
            isSyncing ? 'animate-spin text-blue-400' : ''
          }`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Language Toggle (EN / KN) */}
        <button
          onClick={() => onLanguageToggle(language === 'en' ? 'kn' : 'en')}
          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-amber-400 hover:bg-slate-800 transition-all cursor-pointer"
        >
          {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Sun/Moon Icon */}
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          <Sun className="w-4 h-4" />
        </div>

        {/* Officer Profile Badge with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-3 p-1.5 pl-2 rounded-lg hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 transition-all cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/50 bg-slate-800 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt={officerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                <span>{officerName}</span>
                <UserCheck className="w-3 h-3 text-blue-400" />
              </div>
              <div className="text-[10px] text-slate-400">Bengaluru City Police</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-bold text-slate-100">{officerName}</div>
                <div className="text-[10px] text-amber-400 font-mono">Role: Superintendent / Admin</div>
              </div>

              {onOpenAdminPanel && (
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenAdminPanel();
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-blue-400" />
                  <span>{language === 'kn' ? 'ಆಡಳಿತ ಮಂಡಳಿ' : 'Admin Control Panel'}</span>
                </button>
              )}

              {onLogout && (
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>{language === 'kn' ? 'ನಿರ್ಗಮಿಸಿ' : 'Logout & Lock Portal'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

