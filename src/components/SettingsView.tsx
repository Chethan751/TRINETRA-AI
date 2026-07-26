import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Lock, Save, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface SettingsViewProps {
  language: Language;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ language }) => {
  const [pollInterval, setPollInterval] = useState('30');
  const [alertThreshold, setAlertThreshold] = useState('80');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      <div>
        <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
          {language === 'kn' ? 'ವ್ಯವಸ್ಥೆಯ ಸಂರಚನೆಗಳು' : 'System Configuration & Settings'}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {language === 'kn'
            ? 'ತ್ರಿನೇತ್ರಾ ಎಐ ಕಮಾಂಡ್ ಸೆಂಟರ್ ಸಿಸ್ಟಮ್ ನಿಯತಾಂಕಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ'
            : 'Configure TRINETRA-AI core engine parameters, sync rate, and thresholds'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Sync & API Configuration */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Catalyst Data Sync Configuration</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-bold block mb-1">
                Live Sync Polling Interval (Seconds)
              </label>
              <select
                value={pollInterval}
                onChange={(e) => setPollInterval(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
              >
                <option value="15">15 Seconds (Realtime High Load)</option>
                <option value="30">30 Seconds (Recommended Default)</option>
                <option value="60">60 Seconds (Standard Sync)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">
                Risk Score Alert Trigger Threshold (%)
              </label>
              <input
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>KSP Officer Access Controls</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <div className="font-semibold text-slate-200">Auto-Dispatch Hoysala Units</div>
                <div className="text-[10px] text-slate-400">Trigger alerts when risk exceeds 80%</div>
              </div>
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-6 rounded-lg flex items-center space-x-2 transition-all shadow-lg shadow-blue-600/30"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Settings Saved!' : 'Save Configuration'}</span>
        </button>
      </div>
    </div>
  );
};
