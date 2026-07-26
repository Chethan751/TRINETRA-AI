import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  MapPin,
  Clock,
  Shield,
  Play,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Language, NavSection } from '../types';

interface CrimePredictionViewProps {
  language: Language;
  onNavigate: (section: NavSection) => void;
}

export const CrimePredictionView: React.FC<CrimePredictionViewProps> = ({
  language,
  onNavigate
}) => {
  const [selectedCrimeType, setSelectedCrimeType] = useState('All Crimes');
  const [selectedDistrict, setSelectedDistrict] = useState('Bengaluru Urban');
  const [selectedStation, setSelectedStation] = useState('All Police Stations');
  const [selectedDate, setSelectedDate] = useState('2026-05-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('20:00 - 23:00');
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);

  const [predictionData, setPredictionData] = useState<any>(null);

  const handleRunPrediction = async () => {
    setIsRunningPrediction(true);
    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crimeType: selectedCrimeType,
          district: selectedDistrict,
          station: selectedStation,
          timeOfDay: selectedTimeSlot,
          date: selectedDate
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPredictionData(data);
      }
    } catch (err) {
      console.warn('Prediction request error:', err);
    } finally {
      setIsRunningPrediction(false);
    }
  };

  const predictionTable = [
    {
      crimeType: 'Robbery',
      prob: 72,
      incidents: '12 - 18',
      risk: 'High',
      riskBg: 'bg-rose-950 text-rose-400 border-rose-800',
      trend: '↑ 18%',
      trendColor: 'text-rose-400',
    },
    {
      crimeType: 'Theft',
      prob: 55,
      incidents: '8 - 12',
      risk: 'High',
      riskBg: 'bg-rose-950 text-rose-400 border-rose-800',
      trend: '↑ 12%',
      trendColor: 'text-rose-400',
    },
    {
      crimeType: 'Assault',
      prob: 48,
      incidents: '6 - 10',
      risk: 'Medium',
      riskBg: 'bg-amber-950 text-amber-400 border-amber-800',
      trend: '↑ 8%',
      trendColor: 'text-amber-400',
    },
    {
      crimeType: 'Burglary',
      prob: 32,
      incidents: '4 - 6',
      risk: 'Medium',
      riskBg: 'bg-amber-950 text-amber-400 border-amber-800',
      trend: '↓ 5%',
      trendColor: 'text-emerald-400',
    },
    {
      crimeType: 'Cyber Crime',
      prob: 18,
      incidents: '1 - 3',
      risk: 'Low',
      riskBg: 'bg-blue-950 text-blue-400 border-blue-800',
      trend: '↓ 8%',
      trendColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100 flex items-center gap-2">
            <span>{language === 'kn' ? 'ಅಪರಾಧ ಮುನ್ಸೂಚನೆ' : 'Crime Prediction'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'kn'
              ? 'ಎಐ/ಎಮ್‌ಎಲ್ ಆಧಾರಿತ ಅಪರಾಧ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಅಪಾಯದ ವಿಶ್ಲೇಷಣೆ'
              : 'AI/ML powered crime forecasting and risk analysis'}
          </p>
        </div>

        {/* Date & Time Indicators */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>25 May 2026</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>20:00 - 23:00</span>
          </div>
        </div>
      </div>

      {/* Prediction Filter Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Crime Type
          </label>
          <select
            value={selectedCrimeType}
            onChange={(e) => setSelectedCrimeType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>All Crimes</option>
            <option>Robbery</option>
            <option>Theft</option>
            <option>Assault</option>
            <option>Burglary</option>
            <option>Cyber Crime</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            District
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>Bengaluru Urban</option>
            <option>Bengaluru Rural</option>
            <option>Ramanagara</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Police Station
          </label>
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>All Police Stations</option>
            <option>HSR Layout PS</option>
            <option>Koramangala PS</option>
            <option>Marathahalli PS</option>
            <option>Whitefield PS</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Time Slot
          </label>
          <select
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>20:00 - 23:00</option>
            <option>23:00 - 02:00</option>
            <option>02:00 - 05:00</option>
            <option>05:00 - 08:00</option>
          </select>
        </div>

        <button
          onClick={handleRunPrediction}
          disabled={isRunningPrediction}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-600/30"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunningPrediction ? 'Running...' : 'Run Prediction'}</span>
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauge Card: Prediction Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            PREDICTION SUMMARY
          </h3>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="relative w-36 h-36 rounded-full border-[10px] border-rose-500/20 flex items-center justify-center border-t-rose-500 border-r-rose-500">
              <div className="text-center">
                <div className="text-3xl font-black font-mono text-rose-500">85%</div>
                <div className="text-xs font-bold text-rose-400">High Risk</div>
              </div>
            </div>
            <div className="mt-3 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-[11px] font-semibold flex items-center gap-1">
              <span>↑ 18% vs yesterday</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            High probability of increase in criminal activities in selected area and time.
          </p>
        </div>

        {/* Top Predicted Crime Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            TOP PREDICTED CRIME
          </h3>

          <div className="flex items-center space-x-3 bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl">
            <div className="p-3 bg-rose-900/60 border border-rose-700 text-rose-300 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-rose-400">Robbery</div>
              <div className="text-xs text-slate-300">
                Probability: <span className="font-bold text-rose-400">72%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
              <div className="text-[10px] text-slate-400">Expected Incidents</div>
              <div className="text-base font-bold font-mono text-slate-100">12 - 18</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
              <div className="text-[10px] text-slate-400">Hotspot</div>
              <div className="text-xs font-semibold text-slate-200 truncate">
                Bellandur, Marathahalli
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Card: Prediction Probability by Crime Type */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            PREDICTION PROBABILITY BY CRIME TYPE
          </h3>

          <div className="h-40 w-full flex items-end justify-between px-2 pt-6 pb-1">
            {[
              { label: 'Robbery', val: 72, color: 'bg-rose-500' },
              { label: 'Theft', val: 55, color: 'bg-amber-500' },
              { label: 'Assault', val: 48, color: 'bg-amber-500' },
              { label: 'Burglary', val: 32, color: 'bg-emerald-500' },
              { label: 'Cyber Crime', val: 18, color: 'bg-blue-500' },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-slate-300">{bar.val}%</span>
                <div
                  className={`w-7 rounded-t-md transition-all ${bar.color}`}
                  style={{ height: `${bar.val}%` }}
                />
                <span className="text-[9px] text-slate-400 truncate max-w-[45px] text-center">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: Line Chart Over Time + Predicted Hotspot Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crime Probability Over Time */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              CRIME PROBABILITY OVER TIME
            </h3>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center gap-1 text-blue-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Today (25 May)
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600" /> Yesterday (24 May)
              </span>
            </div>
          </div>

          <div className="h-48 w-full flex items-end justify-between px-2 border-b border-slate-800 relative pt-6">
            <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points="20,130 80,140 140,120 200,90 260,80 320,50 380,20"
              />
              <polyline
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4,4"
                points="20,150 80,145 140,135 200,110 260,105 320,90 380,80"
              />
            </svg>
            {[
              '00:00 - 03:00',
              '03:00 - 06:00',
              '06:00 - 09:00',
              '09:00 - 12:00',
              '12:00 - 15:00',
              '15:00 - 18:00',
              '18:00 - 21:00',
              '21:00 - 24:00',
            ].map((slot, idx) => (
              <div key={idx} className="text-[9px] text-slate-500 font-mono text-center">
                {slot}
              </div>
            ))}
          </div>
        </div>

        {/* Predicted Hotspot Map Widget */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            PREDICTED HOTSPOT MAP
          </h3>

          <div
            onClick={() => onNavigate('HEATMAP')}
            className="relative h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
              alt="Bengaluru Hotspot Map"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/30" />
            <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-800 p-2 rounded text-[10px] space-y-0.5">
              <div className="font-bold text-slate-200">Risk Level</div>
              <div className="flex items-center gap-1 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Very High
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Prediction Details Table & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crime Prediction Details Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            CRIME PREDICTION DETAILS
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">CRIME TYPE</th>
                  <th className="py-2.5 px-3">PROBABILITY</th>
                  <th className="py-2.5 px-3">EXPECTED INCIDENTS</th>
                  <th className="py-2.5 px-3">RISK LEVEL</th>
                  <th className="py-2.5 px-3">TREND</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {predictionTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-200">
                      {row.crimeType}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-blue-400">{row.prob}%</td>
                    <td className="py-2.5 px-3 text-slate-300">{row.incidents}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${row.riskBg}`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className={`py-2.5 px-3 font-bold ${row.trendColor}`}>{row.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendation Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>AI RECOMMENDATION</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deploy 2 additional patrol units in Bellandur and Marathahalli.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Increase night patrolling between 20:00 - 23:00.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Focus on Robbery prevention in high risk zones.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Monitor CCTV and suspicious movements near key junctions.</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Recommended Patrol Units</span>
              <span className="font-bold text-slate-200">2 Teams</span>
            </div>
            <button
              onClick={() => onNavigate('PATROL')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-600/30"
            >
              <span>Generate Patrol Route</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
