import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { StationFIRStat, Language } from '../types';
import { ShieldAlert, AlertTriangle, CheckCircle, Activity, Send } from 'lucide-react';

interface AnomalyMonitorProps {
  language: Language;
  stations: StationFIRStat[];
}

export const AnomalyMonitor: React.FC<AnomalyMonitorProps> = ({
  language,
  stations
}) => {
  const [selectedStation, setSelectedStation] = useState<StationFIRStat>(stations[3] || stations[0]);
  const [auditTriggered, setAuditTriggered] = useState<Record<string, boolean>>({});

  const handleAuditAction = (stationId: string) => {
    setAuditTriggered(prev => ({ ...prev, [stationId]: true }));
  };

  return (
    <div className="w-full h-full bg-slate-950 rounded-lg border-2 border-amber-600/40 shadow-2xl flex flex-col p-3 sm:p-4 overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-amber-600/30 bg-slate-900 p-2.5 rounded mb-4">
        <div>
          <h3 className="text-xs sm:text-sm font-serif font-bold tracking-wider uppercase text-amber-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>
              {language === 'kn' ? 'ಎಫ್‌ಐಆರ್ ದಾಖಲಾತಿ ವಿಳಂಬ ಮತ್ತು ಅಸಂಗತತೆ ಮೇಲ್ವಿಚಾರಣೆ' : 'FIR AUDIT & REGISTRATION ANOMALY MONITOR'}
            </span>
          </h3>
          <p className="text-[11px] text-amber-200/80">
            {language === 'kn' ? 'CCTNS ಐಸೋಲೇಶನ್‌ ಫಾರೆಸ್ಟ್‌ ಎಐ ಮಾದರಿ ವಿಳಂಬ ಸ್ಪೈಕ್‌ಗಳನ್ನು ಧ್ರುವೀಕರಿಸಿದೆ' : 'IsolationForest ML Model Detecting Abnormal Registration Delay Spikes across Bengaluru Police Stations'}
          </p>
        </div>

        {/* Anomaly Badge */}
        <div className="flex items-center space-x-2 bg-rose-950 border border-rose-800 px-3 py-1.5 rounded text-rose-300 font-mono text-xs font-bold shadow-inner">
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          <span>
            {language === 'kn' ? 'ಅಸಂಗತತೆ ಎಚ್ಚರಿಕೆ: ಮೆಜೆಸ್ಟಿಕ್ ಠಾಣೆ (ಸ್ಟೇಷನ್ 4)' : 'ALERT: STATION 4 (MAJESTIC) DELAY SPIKE'}
          </span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* Chart Column (2/3 width) */}
        <div className="lg:col-span-2 bg-slate-900/90 border-2 border-amber-600/30 rounded p-4 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-serif font-bold text-amber-300 uppercase">
              {language === 'kn' ? 'ಠಾಣೆವಾರು ಸರಾಸರಿ ಎಫ್‌ಐಆರ್ ದಾಖಲಾತಿ ವಿಳಂಬ (ಗಂಟೆಗಳಲ್ಲಿ)' : 'STATION AVERAGE FIR REGISTRATION DELAY (HOURS)'}
            </h4>
            <span className="text-[10px] text-amber-200/80 font-mono">BENCHMARK: &lt; 4.0 HOURS</span>
          </div>

          {/* Recharts Bar Chart with Dynamic Rise-On-Render Animation */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stations} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="stationName"
                  stroke="#fbbf24"
                  fontSize={10}
                  tickFormatter={(val) => val.split(' ')[0] + ' ' + (val.split(' ')[1] || '')}
                />
                <YAxis stroke="#fbbf24" fontSize={10} unit="h" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as StationFIRStat;
                      return (
                        <div className="bg-slate-950 border-2 border-amber-600/50 p-2.5 rounded shadow-xl text-xs font-mono text-slate-100">
                          <p className="font-bold text-amber-300 font-serif">{data.stationName}</p>
                          <p className="text-slate-200">Total FIRs: {data.totalFIRs}</p>
                          <p className={`font-bold ${data.avgRegistrationDelayHours > 12 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            Avg Delay: {data.avgRegistrationDelayHours} Hours
                          </p>
                          {data.anomalyFlagged && (
                            <p className="text-rose-400 text-[10px] mt-1 font-sans">
                              ⚠️ {data.anomalyReasonEn}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="avgRegistrationDelayHours"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1200}
                  onClick={(entry) => setSelectedStation(entry)}
                >
                  {stations.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.stationId === 'STN-04'
                          ? '#dc2626' // Red for Critical Anomaly
                          : entry.anomalyFlagged
                          ? '#d97706' // Amber for Medium Anomaly
                          : '#b45309' // Gold/Bronze for Normal
                      }
                      className="cursor-pointer hover:opacity-80 transition"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex justify-between text-[11px] font-mono text-amber-200/80 border-t border-amber-600/30 pt-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-600 inline-block" /> Normal (&lt; 5h)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> Medium Backlog (5-12h)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-600 inline-block" /> Critical Delay Anomaly (&gt; 12h)
            </span>
          </div>
        </div>

        {/* Audit Details Column (1/3 width) */}
        <div className="bg-slate-900/90 border-2 border-amber-600/30 rounded p-4 flex flex-col justify-between shadow-xl text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-amber-600/30 pb-2 mb-3">
              <span className="font-serif font-bold text-amber-300 uppercase">
                {language === 'kn' ? 'ಆಡಿಟ್ ವಿವರ ಶೀಟ್' : 'STATION AUDIT SHEET'}
              </span>
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                selectedStation.anomalyFlagged ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {selectedStation.anomalySeverity}
              </span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 text-[10px] block">Police Station:</span>
                <span className="text-amber-300 font-serif font-bold text-xs">{selectedStation.stationName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950 p-2 rounded border border-amber-600/30">
                  <span className="text-slate-400 text-[9px] block">Total FIRs Logged:</span>
                  <span className="text-amber-200 font-bold">{selectedStation.totalFIRs}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-amber-600/30">
                  <span className="text-slate-400 text-[9px] block">Avg Delay:</span>
                  <span className={`font-bold ${selectedStation.avgRegistrationDelayHours > 10 ? 'text-rose-400' : 'text-amber-200'}`}>
                    {selectedStation.avgRegistrationDelayHours}h
                  </span>
                </div>
              </div>

              {selectedStation.anomalyFlagged && (
                <div className="bg-rose-950/80 border border-rose-800 p-2.5 rounded text-rose-200 space-y-1 font-sans">
                  <span className="font-bold flex items-center gap-1 font-mono text-[10px] uppercase text-rose-300">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    ML IsolationForest Trigger
                  </span>
                  <p className="text-[11px] leading-tight text-rose-100">
                    {language === 'kn' ? selectedStation.anomalyReasonKn : selectedStation.anomalyReasonEn}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Button: Trigger Internal Audit */}
          <div className="mt-4 pt-3 border-t border-amber-600/30">
            <button
              onClick={() => handleAuditAction(selectedStation.stationId)}
              disabled={auditTriggered[selectedStation.stationId]}
              className={`w-full py-2 px-3 rounded font-bold font-mono text-xs flex items-center justify-center gap-2 transition shadow-md ${
                auditTriggered[selectedStation.stationId]
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-rose-700 hover:bg-rose-600 text-white font-serif'
              }`}
            >
              {auditTriggered[selectedStation.stationId] ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'kn' ? 'ಆಡಿಟ್ ಆದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ' : 'INTERNAL AUDIT ORDERED'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{language === 'kn' ? 'ಆಂತರಿಕ ಪರಿಶೀಲನೆ (ಆಡಿಟ್) ಪ್ರಾರಂಭಿಸಿ' : 'TRIGGER INTERNAL AUDIT / CS-INSPECT'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
