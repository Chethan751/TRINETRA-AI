import React, { useState } from 'react';
import { Users, Search, Shield, Eye, Network, AlertTriangle, FileText } from 'lucide-react';
import { Language } from '../types';

interface AccusedDatabaseViewProps {
  language: Language;
}

export const AccusedDatabaseView: React.FC<AccusedDatabaseViewProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accusedList, setAccusedList] = useState<any[]>([
    { id: 'ACC-101', name: 'Ravi Kumar (a.k.a. Bullet Ravi)', crime: 'Repeat Robbery & Extortion', status: 'In Custody', risk: 'High', ps: 'HSR Layout PS', cases: 14 },
    { id: 'ACC-102', name: 'Suresh Gowda', crime: 'Chain Snatching', status: 'Out on Bail', risk: 'Critical', ps: 'Koramangala PS', cases: 9 },
    { id: 'ACC-103', name: 'Venkatesh N.', crime: 'Vehicle Theft Syndicate', status: 'Absconding', risk: 'Critical', ps: 'Marathahalli PS', cases: 22 },
    { id: 'ACC-104', name: 'Anand Kumar', crime: 'Cyber Fraud & Phishing', status: 'Under Investigation', risk: 'Medium', ps: 'Whitefield PS', cases: 5 },
  ]);

  React.useEffect(() => {
    fetch('/api/accused')
      .then((res) => res.json())
      .then((data) => {
        if (data.accusedList && Array.isArray(data.accusedList)) {
          setAccusedList(data.accusedList);
        }
      })
      .catch((err) => console.warn('Failed to fetch accused list:', err));
  }, []);

  const filteredAccused = accusedList.filter((acc) => {
    const q = searchTerm.toLowerCase();
    return (
      acc.name.toLowerCase().includes(q) ||
      acc.crime.toLowerCase().includes(q) ||
      (acc.alias && acc.alias.toLowerCase().includes(q)) ||
      acc.ps.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      <div>
        <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
          {language === 'kn' ? 'ಆರೋಪಿಗಳ ದಾಖಲೆ & ಜಾಲ ವಿಶ್ಲೇಷಣೆ' : 'Accused Database & Network OSINT'}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {language === 'kn'
            ? 'ಅಪರಾಧಿಗಳ ಜಾಲ ಮತ್ತು ಅಪರಾಧ ಸಂಬಂಧಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ'
            : 'Track criminal profiles, repeat offenders, and criminal gang connections'}
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search accused name, alias, FIR association..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-10 pr-4 py-2.5 rounded-lg outline-none"
          />
        </div>
      </div>

      {/* Accused Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAccused.map((acc) => (
          <div
            key={acc.id}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-400 text-sm">
                {acc.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-slate-100 truncate">{acc.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{acc.id}</div>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-slate-300 font-semibold">{acc.crime}</div>
              <div className="text-[10px] text-slate-400">Associated PS: {acc.ps}</div>
              <div className="text-[10px] text-slate-400">Total Linked Cases: {acc.cases}</div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                {acc.status}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  acc.risk === 'Critical'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {acc.risk} Risk
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
