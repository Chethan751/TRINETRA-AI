import React, { useState } from 'react';
import { FileText, Search, Plus, Filter, Eye, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Language, CrimeIncident } from '../types';

interface CasesViewProps {
  language: Language;
  incidents: CrimeIncident[];
  onOpenAddFir?: () => void;
}

export const CasesView: React.FC<CasesViewProps> = ({ language, incidents, onOpenAddFir }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredCases = incidents.filter((inc) => {
    const matchesSearch =
      inc.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || inc.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
            {language === 'kn' ? 'ಎಫ್‌ಐಆರ್ & ಪ್ರಕರಣಗಳ ಪಟ್ಟಿ' : 'FIR Case Management'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'kn'
              ? 'ಸಿಡಿಟಿಎನ್‌ಎಸ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಲಾದ ಸಕ್ರಿಯ ಮತ್ತು ಪರಿಹರಿಸಲಾದ ಪ್ರಕರಣಗಳನ್ನು ನಿರ್ವಹಿಸಿ'
              : 'Manage active and solved FIR cases synchronized with CCTNS'}
          </p>
        </div>

        <button
          onClick={onOpenAddFir}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-md shadow-blue-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FIR Case</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FIR No, Title, Location..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-bold">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2 rounded-lg"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="DISPATCHED">DISPATCHED</option>
            <option value="SOLVED">SOLVED</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">FIR NUMBER</th>
                <th className="py-3 px-4">CRIME TYPE</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">SEVERITY</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {filteredCases.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-blue-400">{inc.firNumber}</td>
                  <td className="py-3 px-4 font-sans text-slate-100">{inc.type}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">{inc.locationName}</td>
                  <td className="py-3 px-4 text-slate-400">{inc.timestamp}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.severity === 'CRITICAL'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.status === 'SOLVED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="flex items-center space-x-1 text-xs text-blue-400 hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
