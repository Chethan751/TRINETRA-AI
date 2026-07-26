import React from 'react';
import {
  FileText,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Shield,
  Bot,
  PlusCircle,
  Siren,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { Language, CrimeIncident, NavSection } from '../types';

interface DashboardViewProps {
  language: Language;
  incidents: CrimeIncident[];
  onNavigate: (section: NavSection) => void;
  onOpenAddFir?: () => void;
  onEmergencyAlert?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  language,
  incidents,
  onNavigate,
  onOpenAddFir,
  onEmergencyAlert
}) => {
  const statCards = [
    {
      titleEn: 'TOTAL CRIMES',
      titleKn: 'ಒಟ್ಟು ಅಪರಾಧಗಳು',
      value: '2,351',
      change: '↑ 12.5%',
      subTextEn: 'vs last month',
      subTextKn: 'ಕಳೆದ ತಿಂಗಳಿಗೆ ಹೋಲಿಸಿದರೆ',
      icon: FileText,
      iconColor: 'text-blue-400 bg-blue-950/60 border-blue-800',
    },
    {
      titleEn: 'SOLVED CASES',
      titleKn: 'ಪರಿಹರಿಸಲಾದ ಪ್ರಕರಣಗಳು',
      value: '1,984',
      change: '↑ 15.8%',
      subTextEn: 'vs last month',
      subTextKn: 'ಕಳೆದ ತಿಂಗಳಿಗೆ ಹೋಲಿಸಿದರೆ',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
    },
    {
      titleEn: "TODAY'S INCIDENTS",
      titleKn: 'ಇಂದಿನ ಘಟನೆಗಳು',
      value: '58',
      change: '↑ 8.3%',
      subTextEn: 'vs yesterday',
      subTextKn: 'ನಿನ್ನೆಗೆ ಹೋಲಿಸಿದರೆ',
      icon: Calendar,
      iconColor: 'text-purple-400 bg-purple-950/60 border-purple-800',
    },
    {
      titleEn: 'HIGH RISK ZONES',
      titleKn: 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ವಲಯಗಳು',
      value: '16',
      change: '↑ 3',
      subTextEn: 'vs last week',
      subTextKn: 'ಕಳೆದ ವಾರಕ್ಕೆ ಹೋಲಿಸಿದರೆ',
      icon: AlertTriangle,
      iconColor: 'text-rose-400 bg-rose-950/60 border-rose-800',
    },
  ];

  const highRiskZones = [
    { name: 'Koramangala', risk: 87, level: 'High', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { name: 'Jayanagar', risk: 82, level: 'High', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { name: 'Malleswaram', risk: 76, level: 'High', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { name: 'Nagarbhavi', risk: 72, level: 'Medium', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { name: 'Yelahanka', risk: 68, level: 'Medium', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  ];

  const categoryDistribution = [
    { label: 'Theft', percent: 35.6, color: '#3b82f6' },
    { label: 'Robbery', percent: 18.7, color: '#06b6d4' },
    { label: 'Assault', percent: 15.2, color: '#a855f7' },
    { label: 'Burglary', percent: 12.1, color: '#ec4899' },
    { label: 'Cyber Crime', percent: 8.3, color: '#f59e0b' },
    { label: 'Others', percent: 10.1, color: '#64748b' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      {/* Top Greeting & Date Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100 flex items-center gap-2">
            <span>
              {language === 'kn'
                ? 'ಶುಭೋದಯ, ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಅರ್ಜುನ್ 👋'
                : 'Good Morning, Inspector Arjun 👋'}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'kn'
              ? 'ಇಂದು ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಡೆಯುತ್ತಿರುವ ಸಂಗತಿಗಳು ಇಲ್ಲಿವೆ.'
              : "Here's what's happening in Bengaluru today."}
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-300">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>25 May 2026, Saturday</span>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-md hover:border-slate-700 transition-all"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {language === 'kn' ? card.titleKn : card.titleEn}
                </span>
                <div className="text-2xl font-black font-mono text-slate-100">
                  {card.value}
                </div>
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span>{card.change}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {language === 'kn' ? card.subTextKn : card.subTextEn}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-xl border ${card.iconColor}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Crime Trend, Distribution, Mini Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crime Trend (Last 7 Days) Line Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {language === 'kn' ? 'ಅಪರಾಧದ ಪ್ರವೃತ್ತಿ (ಕಳೆದ 7 ದಿನಗಳು)' : 'CRIME TREND (Last 7 Days)'}
            </h3>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Last 7 Days
            </span>
          </div>

          <div className="h-44 w-full flex items-end justify-between px-2 pt-6 pb-2 border-b border-slate-800 relative">
            {/* SVG Trend Line Overlay */}
            <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points="15,100 65,70 115,110 165,60 215,20 265,40 315,10"
              />
            </svg>
            {[
              { day: '19 May', val: 140 },
              { day: '20 May', val: 220 },
              { day: '21 May', val: 160 },
              { day: '22 May', val: 210 },
              { day: '23 May', val: 310 },
              { day: '24 May', val: 280 },
              { day: '25 May', val: 330 },
            ].map((pt, i) => (
              <div key={i} className="flex flex-col items-center z-10">
                <div className="w-2 h-2 rounded-full bg-blue-400 ring-4 ring-blue-950 mb-2" />
                <span className="text-[9px] text-slate-400 font-mono">{pt.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Crime Category Distribution Donut Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {language === 'kn' ? 'ಅಪರಾಧ ವರ್ಗದ ಹಂಚಿಕೆ' : 'CRIME CATEGORY DISTRIBUTION'}
            </h3>
          </div>

          <div className="flex items-center justify-around">
            <div className="relative w-32 h-32 rounded-full border-8 border-blue-500/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold font-mono text-slate-100">2,351</div>
                <div className="text-[10px] text-slate-400">Total</div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {categoryDistribution.map((cat, i) => (
                <div key={i} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-slate-300">{cat.label}</span>
                  </div>
                  <span className="font-mono text-slate-400">{cat.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onNavigate('REPORTS')}
            className="w-full text-center text-xs text-blue-400 hover:underline flex items-center justify-center gap-1 pt-1"
          >
            <span>{language === 'kn' ? 'ಪೂರ್ಣ ವರದಿ ವೀಕ್ಷಿಸಿ' : 'View full report'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Crime Heatmap Mini Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {language === 'kn' ? 'ಅಪರಾಧ ಹೀಟ್‌ಮ್ಯಾಪ್ (ಬೆಂಗಳೂರು)' : 'CRIME HEATMAP (BENGALURU)'}
            </h3>
          </div>

          <div
            onClick={() => onNavigate('HEATMAP')}
            className="relative h-36 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
              alt="Bengaluru Heatmap Preview"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
              <span className="bg-rose-950/90 text-rose-300 px-2 py-0.5 rounded border border-rose-800 font-semibold text-[10px]">
                High Risk Clusters Detected
              </span>
              <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                View Full Heatmap <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent FIRs, High Risk Zones, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent FIRs Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {language === 'kn' ? 'ಇತ್ತೀಚಿನ ಎಫ್‌ಐಆರ್‌ಗಳು' : 'RECENT FIRs'}
            </h3>
            <button
              onClick={() => onNavigate('CASES')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span> <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">FIR NO.</th>
                  <th className="py-2.5 px-3">CRIME HEAD</th>
                  <th className="py-2.5 px-3">LOCATION</th>
                  <th className="py-2.5 px-3">DATE & TIME</th>
                  <th className="py-2.5 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {incidents.slice(0, 5).map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-blue-400">{inc.firNumber}</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-200">{inc.type}</td>
                    <td className="py-2.5 px-3 font-sans">{inc.locationName}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400">{inc.timestamp}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inc.status === 'SOLVED'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : inc.status === 'DISPATCHED'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-blue-950 text-blue-400 border border-blue-800'
                        }`}
                      >
                        {inc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High Risk Zones & Quick Actions Stack */}
        <div className="space-y-6">
          {/* High Risk Zones Ranking */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {language === 'kn' ? 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ವಲಯಗಳು' : 'HIGH RISK ZONES'}
              </h3>
              <button
                onClick={() => onNavigate('PREDICTION')}
                className="text-xs text-blue-400 hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2">
              {highRiskZones.map((zone, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-200">{zone.name}</div>
                      <div className="text-[10px] text-slate-400">Risk Score: {zone.risk}%</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${zone.color}`}>
                    {zone.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {language === 'kn' ? 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು' : 'QUICK ACTIONS'}
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('PATROL')}
                className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left space-y-1.5 transition-all group"
              >
                <Shield className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-200">Generate Patrol Route</div>
              </button>

              <button
                onClick={() => onNavigate('PREDICTION')}
                className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left space-y-1.5 transition-all group"
              >
                <TrendingUp className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-200">Crime Prediction</div>
              </button>

              <button
                onClick={() => onNavigate('CHATBOT')}
                className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left space-y-1.5 transition-all group"
              >
                <Bot className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-200">AI Assistant</div>
              </button>

              <button
                onClick={onOpenAddFir}
                className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left space-y-1.5 transition-all group"
              >
                <PlusCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-200">Add New FIR</div>
              </button>
            </div>

            <button
              onClick={onEmergencyAlert}
              className="w-full p-3 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-rose-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-rose-950/40"
            >
              <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>{language === 'kn' ? 'ತುರ್ತು ಎಚ್ಚರಿಕೆ ರವಾನಿಸಿ' : 'Emergency Alert'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div>© 2026 Karnataka State Police. All rights reserved.</div>
        <div>TRINETRA-AI v1.0.0</div>
      </div>
    </div>
  );
};
