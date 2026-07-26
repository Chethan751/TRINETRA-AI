import React, { useState } from 'react';
import { Shield, Lock, User, KeyRound, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import kspCrestImage from '../assets/images/ksp_crest_gold_1785075700506.jpg';

interface LoginModalProps {
  language: Language;
  onLoginSuccess: (officerData: { username: string; role: string; name: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ language, onLoginSuccess }) => {
  const [username, setUsername] = useState('ksp_admin');
  const [password, setPassword] = useState('Trinetra2026#');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        onLoginSuccess({
          username: data.username || username,
          role: data.role || 'SUPERINTENDENT_OF_POLICE',
          name: username === 'ksp_admin' ? 'Inspector Arjun' : username
        });
      } else {
        setError(data.message || (language === 'kn' ? 'ತಪ್ಪು ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಗುಪ್ತಪದ' : 'Invalid police badge credentials'));
      }
    } catch (err) {
      // Fallback local auth for resilience
      if (username === 'ksp_admin' && password === 'Trinetra2026#') {
        onLoginSuccess({
          username: 'ksp_admin',
          role: 'SUPERINTENDENT_OF_POLICE',
          name: 'Inspector Arjun'
        });
      } else {
        setError(language === 'kn' ? 'ಪ್ರಮಾಣೀಕರಣ ವಿಫಲವಾಗಿದೆ' : 'Authentication failed. Use: ksp_admin / Trinetra2026#');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040711]/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6">
        
        {/* Top KSP Emblem Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-950 border border-amber-500/50 p-1 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <img
              src={kspCrestImage}
              alt="KSP Crest"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-xl font-bold tracking-wider text-slate-100 font-serif">
            TRINETRA-AI
          </h2>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
            {language === 'kn' ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ನಿಯಂತ್ರಣ ಕೊಠಡಿ' : 'Karnataka State Police Command Portal'}
          </p>
          <p className="text-[11px] text-slate-400">
            {language === 'kn' ? 'ಸುರಕ್ಷಿತ ಸಿಟಿಟಿಎನ್‌ಎಸ್ ಅಧಿಕೃತ ಲಾಗಿನ್' : 'Secure Officer Authentication & CCTNS Access'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'kn' ? 'ಅಧಿಕಾರಿ ಐಡಿ / ಬಳಕೆದಾರ ಹೆಸರು' : 'Officer Badge ID / Username'}</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ksp_admin"
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-slate-100 rounded-xl px-3.5 py-2.5 outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'Security Password'}</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-slate-100 rounded-xl px-3.5 py-2.5 outline-none font-mono"
            />
          </div>

          <div className="p-3 bg-blue-950/30 border border-blue-900/40 rounded-xl text-[11px] text-blue-300/80 space-y-1">
            <div className="font-semibold text-blue-200">
              {language === 'kn' ? 'ಮಾದರಿ ಲಾಗಿನ್ ವಿವರಗಳು:' : 'Demo Officer Credentials:'}
            </div>
            <div>
              <span className="font-mono text-amber-300">Username: ksp_admin</span> | <span className="font-mono text-amber-300">Password: Trinetra2026#</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <Shield className="w-4 h-4" />
            <span>
              {isLoading
                ? (language === 'kn' ? 'ಪ್ರಮಾಣೀಕರಿಸಲಾಗುತ್ತಿದೆ...' : 'Authenticating...')
                : (language === 'kn' ? 'ಸೇವೆಯನ್ನು ಪ್ರವೇಶಿಸಿ' : 'Authenticate & Access Command Center')}
            </span>
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-500 font-mono">
          TRINETRA v2.6.4 • Datathon 2026 Encryption Standard
        </div>
      </div>
    </div>
  );
};
