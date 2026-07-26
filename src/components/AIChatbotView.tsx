import React, { useState } from 'react';
import {
  Bot,
  Send,
  Plus,
  Mic,
  FileText,
  TrendingUp,
  MapPin,
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Language, ChatMessage, NavSection } from '../types';

interface AIChatbotViewProps {
  language: Language;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  isAiThinking: boolean;
  onNavigate: (section: NavSection) => void;
}

export const AIChatbotView: React.FC<AIChatbotViewProps> = ({
  language,
  messages,
  onSendMessage,
  onClearChat,
  isAiThinking,
  onNavigate
}) => {
  const [inputPrompt, setInputPrompt] = useState('');

  const handleSend = () => {
    if (!inputPrompt.trim()) return;
    onSendMessage(inputPrompt);
    setInputPrompt('');
  };

  const quickPromptChips = [
    'Show FIR 1234',
    'Predict Tomorrow',
    'Nearest Station',
    'Generate Report',
    'Suggest Patrol',
    'Crime Trend',
  ];

  const bottomAskChips = [
    'Show theft cases in HSR Layout',
    'Predict crime for tomorrow',
    'Find repeat offenders',
    'Generate crime report',
    'Suggest patrol route',
  ];

  const robberyFirs = [
    { fir: 'FIR12345/2026', date: '24 May 2026, 22:15', loc: 'Bellandur Gate', modus: 'Chain Snatching', status: 'Under Investigation' },
    { fir: 'FIR12312/2026', date: '22 May 2026, 20:45', loc: 'Eco Space', modus: 'Mobile Theft', status: 'Under Investigation' },
    { fir: 'FIR12298/2026', date: '19 May 2026, 21:30', loc: 'Bellandur Junction', modus: 'Purse Snatching', status: 'Under Investigation' },
    { fir: 'FIR12275/2026', date: '18 May 2026, 19:20', loc: 'Devarabeesanahalli', modus: 'Mobile Theft', status: 'Under Investigation' },
    { fir: 'FIR12260/2026', date: '16 May 2026, 23:10', loc: 'Bellandur Outer Ring', modus: 'Chain Snatching', status: 'Solved' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-[#070a14] text-slate-100 overflow-hidden">
      {/* Left Column: Conversational Chat UI (40% width on Desktop) */}
      <div className="w-full lg:w-[40%] flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800/80 shrink-0 h-1/2 lg:h-full bg-[#0a0e1a]/90">
        {/* Top Chat Title */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-950 border border-blue-800 text-blue-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">AI Chatbot Assistant</h2>
              <p className="text-[10px] text-slate-400">
                Your intelligent partner in crime data analysis
              </p>
            </div>
          </div>

          <button
            onClick={onClearChat}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)] no-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {language === 'kn' ? msg.textKn : msg.textEn}
                </div>
                <span className="text-[10px] text-slate-500 font-mono px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isAiThinking && (
            <div className="flex items-center space-x-2 text-xs text-blue-400 bg-slate-900 border border-slate-800 p-2.5 rounded-xl max-w-[200px]">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Analyzing CCTNS records...</span>
            </div>
          )}
        </div>

        {/* Bottom Input Field & Quick Chips */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 space-y-2">
          {/* Quick prompt chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
            {quickPromptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(chip)}
                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap transition-all"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Prompt Bar Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-4 pr-20 py-2.5 outline-none transition-all"
            />
            <div className="absolute right-2 flex items-center space-x-1">
              <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg">
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={handleSend}
                className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Analytics & Patrol Suggestions Dashboard (60% width) */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
        {/* Top Summary: Robbery Cases in Bellandur */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Robbery Cases in Bellandur (Last 30 Days)</span>
            </h3>
          </div>

          {/* 4 Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-400">Total Cases</div>
              <div className="text-xl font-bold font-mono text-slate-100">26</div>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-400">Solved</div>
              <div className="text-xl font-bold font-mono text-emerald-400 flex items-center justify-between">
                <span>14</span>
                <span className="text-[10px] font-normal text-emerald-500">53.8%</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-400">Pending</div>
              <div className="text-xl font-bold font-mono text-amber-400 flex items-center justify-between">
                <span>12</span>
                <span className="text-[10px] font-normal text-amber-500">46.2%</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-400">Arrests</div>
              <div className="text-xl font-bold font-mono text-purple-400 flex items-center justify-between">
                <span>9</span>
                <span className="text-[10px] font-normal text-purple-500">34.6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Recent FIRs + Highest Crime Risk Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Robbery FIRs */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Recent Robbery FIRs
              </h4>
              <button className="text-xs text-blue-400 hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-2.5">FIR No.</th>
                    <th className="py-2 px-2.5">Date & Time</th>
                    <th className="py-2 px-2.5">Location</th>
                    <th className="py-2 px-2.5">Modus Operandi</th>
                    <th className="py-2 px-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {robberyFirs.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-2 px-2.5 font-bold text-blue-400">{row.fir}</td>
                      <td className="py-2 px-2.5 text-[11px] text-slate-400">{row.date}</td>
                      <td className="py-2 px-2.5 font-sans">{row.loc}</td>
                      <td className="py-2 px-2.5 font-sans">{row.modus}</td>
                      <td className="py-2 px-2.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            row.status === 'Solved'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Highest Crime Risk Area */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Highest Crime Risk Area
              </h4>
              <div className="text-lg font-extrabold font-serif text-rose-400">Marathahalli</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Risk Score</div>
              <div className="text-3xl font-black font-mono text-rose-500 my-1">85%</div>
              <span className="inline-block px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                Very High Risk
              </span>
              <div className="text-[10px] text-rose-400 mt-2">↑ 12% vs yesterday</div>
            </div>

            <div className="h-16 w-full flex items-end justify-between pt-2">
              {[25, 50, 40, 60, 85, 75, 80, 50].map((v, i) => (
                <div
                  key={i}
                  className="w-2 rounded-t bg-rose-500"
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Crime Heatmap + Patrol Suggestion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crime Heatmap (Bellandur Area) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Crime Heatmap (Bellandur Area)
            </h4>
            <div
              onClick={() => onNavigate('HEATMAP')}
              className="relative h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                alt="Bellandur Heatmap"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>
          </div>

          {/* Patrol Suggestion for Tonight */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Patrol Suggestion for Tonight (20:00 - 02:00)
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Recommended Units</span>
                  <span className="font-bold text-blue-400">2 Patrol Units</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Distance</span>
                  <span className="font-bold font-mono">28.6 km</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Est. Time</span>
                  <span className="font-bold font-mono">3h 15m</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Checkpoints</span>
                  <span className="font-bold font-mono">7</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('PATROL')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 rounded-lg transition-all"
            >
              Generate Full Route
            </button>
          </div>
        </div>

        {/* Bottom Quick Suggestion Chips */}
        <div className="pt-2 border-t border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">You can ask me:</p>
          <div className="flex flex-wrap gap-2">
            {bottomAskChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(chip)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
