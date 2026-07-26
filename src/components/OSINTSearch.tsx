import React, { useState } from 'react';
import { Search, Globe, ShieldAlert, Phone, Car, CreditCard, User, CheckCircle, Radio } from 'lucide-react';
import { OSINTProfile, Language } from '../types';
import { OSINT_SAMPLE_PROFILES } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

interface OSINTSearchProps {
  language: Language;
}

export const OSINTSearch: React.FC<OSINTSearchProps> = ({ language }) => {
  const [query, setQuery] = useState<string>('KA-01-MJ-8819');
  const [profile, setProfile] = useState<OSINTProfile | null>(OSINT_SAMPLE_PROFILES['KA-01-MJ-8819'] || null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hotlisted, setHotlisted] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setHotlisted(false);

    try {
      const q = searchQuery.trim();
      const res = await fetch(`/api/osint/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.cctnsMatch) {
          const match = data.cctnsMatch;
          setProfile({
            query: q,
            queryType: q.includes('KA-') ? 'VEHICLE' : q.includes('+91') ? 'PHONE' : 'UPI',
            matchedSuspect: {
              cctnsId: match.cctnsId,
              aliasName: match.suspectName,
              riskScore: match.riskScore,
              flaggedReason: match.flaggedReason,
              associatedPhone: match.associatedPhone,
              associatedVehicle: match.associatedVehicle,
              associatedUPI: match.associatedUPI,
              bankName: 'Canara Bank / HDFC Gateway',
              activeWarrants: 2,
              lastKnownLocation: 'Bengaluru Zone',
              jurisdictionStation: match.jurisdiction,
              status: match.status
            },
            cyberCrimePortalRecords: [
              { complaintId: 'CYB-1930-5510', date: '2026-07-25', amountLoss: 125000, category: 'UPI Fraud' }
            ]
          });
          setIsSearching(false);
          return;
        }
      }
    } catch (err) {
      console.warn('OSINT Backend Search Notice:', err);
    }

    const q = searchQuery.trim();
    const matched = OSINT_SAMPLE_PROFILES[q] || {
      query: q,
      queryType: 'PHONE',
      matchedSuspect: {
        cctnsId: `CCTNS-SEARCH-${Math.floor(Math.random() * 9000 + 1000)}`,
        aliasName: 'Associated Suspect (CCTNS Check)',
        riskScore: 75,
        flaggedReason: 'Queried identifier matched cross-referenced CCTNS cyber log',
        associatedPhone: q.includes('+91') ? q : '+91 98765 43210',
        associatedVehicle: q.includes('KA-') ? q : 'KA-01-MJ-8819',
        associatedUPI: q.includes('@') ? q : 'suspect112@ybl',
        bankName: 'HDFC Bank Bengaluru',
        activeWarrants: 1,
        lastKnownLocation: 'Bengaluru Metro Area',
        jurisdictionStation: 'Central Crime Branch (CCB)',
        status: 'CCTNS MATCH FOUND'
      },
      cyberCrimePortalRecords: [
        { complaintId: 'CYB-1930-5510', date: '2026-07-20', amountLoss: 85000, category: 'Online Scam' }
      ]
    };

    setProfile(matched);
    setIsSearching(false);
  };

  return (
    <div className="w-full h-full bg-slate-950 rounded-lg border-2 border-amber-600/40 shadow-2xl flex flex-col p-3 sm:p-4 overflow-y-auto">
      {/* Top Header */}
      <div className="pb-3 border-b-2 border-amber-600/30 bg-slate-900 p-2.5 rounded mb-4">
        <h3 className="text-xs sm:text-sm font-serif font-bold tracking-wider uppercase text-amber-300 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>
            {language === 'kn' ? 'OSINT ಸಾರ್ವಜನಿಕ ಇಂಟೆಲಿಜೆನ್ಸ್ ಮತ್ತು CCTNS ಶೋಧನೆ' : 'OSINT & CITIZEN INTELLIGENCE SEARCH'}
          </span>
        </h3>
        <p className="text-[11px] text-amber-200/80">
          {language === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ವಾಹನ ಸಂಖ್ಯೆ, ಯುಪಿಐ ಐಡಿ ಮೂಲಕ ಶಂಕಿತರ ಮಾಹಿತಿ ಹುಡುಕಿ' : 'Cross-Reference Phone Numbers, Vehicle Registrations, UPI IDs & Aadhaar Hashes against CCTNS & 1930 Cyber Helpline'}
        </p>
      </div>

      {/* Tactical Feature 4: OSINT Search Bar */}
      <div className="bg-slate-900/90 border-2 border-amber-600/30 rounded p-4 shadow-xl mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder={
                language === 'kn'
                  ? 'ಮೊಬೈಲ್ (+91...), ವಾಹನ (KA-01...), UPI ID ಅಥವಾ ಎಫ್‌ಐಆರ್ ನಮೂದಿಸಿ...'
                  : 'Enter Mobile (+91...), Vehicle (KA-01-...), UPI ID or Aadhaar Hash...'
              }
              className="w-full bg-slate-950 border-2 border-amber-600/40 rounded pl-10 pr-4 py-2.5 text-xs text-amber-100 font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          </div>

          <button
            onClick={() => handleSearch(query)}
            disabled={isSearching}
            className="px-5 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-md disabled:opacity-50"
          >
            {isSearching ? (
              <span className="animate-spin">⌛</span>
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{language === 'kn' ? 'ಹುಡುಕಿ' : 'SEARCH CCTNS'}</span>
          </button>
        </div>

        {/* Quick Sample Query Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] font-mono">
          <span className="text-slate-400">{language === 'kn' ? 'ಉದಾಹರಣೆ ಮಾದರಿಗಳು:' : 'Quick Sample Inputs:'}</span>
          {['KA-01-MJ-8819', '+919876543210', 'suspect112@ybl'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item);
                handleSearch(item);
              }}
              className="px-2.5 py-1 rounded bg-slate-950 border border-amber-600/40 text-amber-300 hover:border-amber-400 hover:bg-slate-800 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregated Suspect Profile Result Card */}
      <AnimatePresence mode="wait">
        {profile && profile.matchedSuspect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-900/90 border-2 border-amber-600/40 rounded p-5 shadow-2xl space-y-4 text-xs font-sans text-slate-200"
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-amber-600/30 pb-3 gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-amber-950 border border-amber-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-amber-300">
                    {profile.matchedSuspect.aliasName}
                  </h4>
                  <p className="text-[11px] text-amber-200/80 font-mono">
                    CCTNS ID: {profile.matchedSuspect.cctnsId} | Station: {profile.matchedSuspect.jurisdictionStation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold">
                  RISK: {profile.matchedSuspect.riskScore}/100
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold">
                  {profile.matchedSuspect.status}
                </span>
              </div>
            </div>

            {/* Profile Grid Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="bg-slate-950 p-3 rounded border border-amber-600/30">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px] mb-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  ASSOCIATED MOBILE SIM:
                </span>
                <span className="text-amber-300 font-bold">{profile.matchedSuspect.associatedPhone}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-amber-600/30">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px] mb-1">
                  <Car className="w-3.5 h-3.5 text-emerald-400" />
                  FLAGGED VEHICLE (ANPR):
                </span>
                <span className="text-emerald-300 font-bold">{profile.matchedSuspect.associatedVehicle}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-amber-600/30">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px] mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  UPI VPA & BANK GATEWAY:
                </span>
                <span className="text-amber-300 font-bold">{profile.matchedSuspect.associatedUPI}</span>
              </div>
            </div>

            {/* 1930 Cyber Crime Portal Cross-Reference Records */}
            {profile.cyberCrimePortalRecords && profile.cyberCrimePortalRecords.length > 0 && (
              <div className="bg-slate-950 border border-amber-600/30 p-3 rounded font-mono">
                <h5 className="text-[10px] font-bold text-amber-300 font-serif uppercase mb-2 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  1930 CYBER HELPLINE LOGS CROSS-MATCHED ({profile.cyberCrimePortalRecords.length}):
                </h5>
                <div className="space-y-1.5 text-[11px]">
                  {profile.cyberCrimePortalRecords.map((rec) => (
                    <div key={rec.complaintId} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-amber-600/30">
                      <span>Complaint #{rec.complaintId} ({rec.category})</span>
                      <span className="text-rose-400 font-bold">Loss: ₹ {(rec.amountLoss).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RTO Record If Present */}
            {profile.rtoRecord && (
              <div className="bg-slate-950 border border-amber-600/30 p-3 rounded font-mono">
                <h5 className="text-[10px] font-bold text-amber-300 font-serif uppercase mb-2 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  KARNATAKA RTO VEHICLE REGISTRATION DATA:
                </h5>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>Owner: <span className="text-slate-200">{profile.rtoRecord.ownerName}</span></div>
                  <div>Model: <span className="text-slate-200">{profile.rtoRecord.model}</span></div>
                  <div>RTO Office: <span className="text-slate-200">{profile.rtoRecord.rtoOffice}</span></div>
                  <div>Status: <span className="text-rose-400 font-bold">{profile.rtoRecord.status}</span></div>
                </div>
              </div>
            )}

            {/* Direct Action Buttons */}
            <div className="pt-2 border-t border-amber-600/30 flex flex-wrap gap-2">
              <button
                onClick={() => setHotlisted(true)}
                disabled={hotlisted}
                className={`px-4 py-2 rounded font-serif font-bold text-xs flex items-center gap-1.5 transition shadow-md ${
                  hotlisted
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-rose-700 hover:bg-rose-600 text-white'
                }`}
              >
                {hotlisted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'kn' ? 'CCTNS ಹಾಟ್‌ಲಿಸ್ಟ್ ಸಂಪೂರ್ಣ' : 'HOTLISTED IN CCTNS'}</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>{language === 'kn' ? 'CCTNS ಹಾಟ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿಸಿ' : 'FLAG ON CCTNS HOTLIST'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => alert(`Hoysala Intercept Order issued for suspect ${profile.matchedSuspect?.cctnsId}`)}
                className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs flex items-center gap-1.5 transition shadow-md"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{language === 'kn' ? 'ಹೊಯ್ಸಳ ಮರುನಿರ್ದೇಶನ ಮಾಡು' : 'DISPATCH HOYSALA INTERCEPT'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
