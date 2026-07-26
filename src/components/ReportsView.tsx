import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Share2,
  Printer,
  Sparkles,
  Shield,
  FileDown
} from 'lucide-react';
import { Language, CrimeIncident, PatrolRoute } from '../types';
import { INITIAL_CRIME_INCIDENTS, HOYSALA_PATROL_ROUTES } from '../data/mockData';
import {
  generateExecutiveBriefingPDF,
  formatDashboardMetrics
} from '../utils/pdfGenerator';

interface ReportsViewProps {
  language: Language;
  incidents?: CrimeIncident[];
  patrolRoutes?: PatrolRoute[];
  officerName?: string;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  language,
  incidents = [],
  patrolRoutes = [],
  officerName = 'Inspector Arjun'
}) => {
  const [reportType, setReportType] = useState('Daily Crime Summary');
  const [format, setFormat] = useState('PDF');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportsList = [
    { title: 'KSP Daily Crime Analytics Digest', date: '25 May 2026', type: 'PDF', size: '2.4 MB', station: 'Bengaluru City' },
    { title: 'Weekly High Risk Zone Assessment', date: '22 May 2026', type: 'PDF', size: '4.1 MB', station: 'HSR Layout PS' },
    { title: 'CCTNS Synchronized FIR Audit', date: '18 May 2026', type: 'Excel', size: '1.8 MB', station: 'Koramangala PS' },
    { title: 'Monthly Hotspot Prediction Report', date: '01 May 2026', type: 'PDF', size: '8.5 MB', station: 'Bengaluru Urban' },
  ];

  const [generatedList, setGeneratedList] = useState(reportsList);

  const generateBriefingReport = async () => {
    setIsGenerating(true);

    try {
      const activeIncidents = incidents.length > 0 ? incidents : INITIAL_CRIME_INCIDENTS;
      const activePatrols = patrolRoutes.length > 0 ? patrolRoutes : HOYSALA_PATROL_ROUTES;

      const result = generateExecutiveBriefingPDF(activeIncidents, activePatrols, officerName);

      // Add to UI list
      const newReportEntry = {
        title: 'Trinetra AI Executive Briefing Report (jsPDF + AutoTable)',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: 'PDF',
        size: result.size,
        station: 'Bengaluru Command Center'
      };

      setGeneratedList((prev) => [newReportEntry, ...prev]);
    } catch (err) {
      console.error('Error generating PDF with jsPDF-AutoTable:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateReport = async () => {
    if (format === 'PDF Document' || format === 'PDF') {
      await generateBriefingReport();
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportType,
          format
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.report) {
          setGeneratedList((prev) => [data.report, ...prev]);
        }
      }
    } catch (err) {
      console.warn('Report generation notice:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (rep: any) => {
    if (rep.title.includes('jsPDF') || rep.title.includes('Executive Briefing')) {
      generateBriefingReport();
    } else {
      window.open(`/api/reports/download/${rep.id || 'REP-01'}`, '_blank');
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
            {language === 'kn' ? 'ಅಪರಾಧ ವರದಿಗಳು' : 'Crime Reports & Analytics'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'kn'
              ? 'ವಿಶ್ಲೇಷಣಾತ್ಮಕ ವರದಿಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'
              : 'Generate, filter, and export comprehensive law enforcement reports'}
          </p>
        </div>

        {/* Quick Action Button for PDF Briefing Report */}
        <button
          onClick={generateBriefingReport}
          disabled={isGenerating}
          className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer disabled:opacity-50"
        >
          <FileDown className="w-4 h-4 text-slate-950" />
          <span>
            {language === 'kn'
              ? 'ತತ್ಕ್ಷಣ ಕಾರ್ಯನಿರ್ವಾಹಕ ಪಿಡಿಎಫ್ ವರದಿ (jsPDF)'
              : 'Export Executive Briefing PDF (jsPDF)'}
          </span>
        </button>
      </div>

      {/* Generator Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
          >
            <option>Daily Crime Summary</option>
            <option>Weekly Hotspot Forecast</option>
            <option>Patrol Effectiveness Audit</option>
            <option>CCTNS FIR Export</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Date Range</label>
          <input
            type="date"
            defaultValue="2026-05-25"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
          >
            <option>PDF Document</option>
            <option>Excel Spreadsheet</option>
            <option>CSV Data File</option>
          </select>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Compiling Report...' : 'Generate Report'}</span>
        </button>
      </div>

      {/* Generated Reports Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          RECENTLY GENERATED REPORTS
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">REPORT TITLE</th>
                <th className="py-3 px-4">STATION / DISTRICT</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">FORMAT</th>
                <th className="py-3 px-4">SIZE</th>
                <th className="py-3 px-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {generatedList.map((rep, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-sans font-bold text-slate-100 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{rep.title}</span>
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-300">{rep.station}</td>
                  <td className="py-3 px-4 text-slate-400">{rep.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                      {rep.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{rep.size}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDownload(rep)}
                      className="flex items-center space-x-1 text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
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

