import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Mic, MicOff, Send, Trash2, Volume2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, Language } from '../types';

interface ChatPanelProps {
  language: Language;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  isAiThinking: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  language,
  messages,
  onSendMessage,
  onClearChat,
  isAiThinking
}) => {
  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  // Voice recording timer simulation
  useEffect(() => {
    let interval: any;
    if (isVoiceActive) {
      interval = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isVoiceActive]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceRecording = () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      // Simulate recognized voice input
      const simulatedText = language === 'kn'
        ? 'ಜಯನಗರದ ಸಕ್ರಿಯ ಹೊಯ್ಸಳ ಗಸ್ತು ವಿವರ ನೀಡಿ'
        : 'Show active Hoysala patrol units in Jayanagar zone';
      setInputText(simulatedText);
    } else {
      setIsVoiceActive(true);
    }
  };

  // Text-To-Speech audio output
  const handleReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const presetQueries = language === 'kn' ? [
    'ಜಯನಗರದಲ್ಲಿ ಇತ್ತೀಚಿನ ಅಪರಾಧಗಳ ಮಾಹಿತಿ ಕೊಡಿ',
    'ಸ್ಥಳೀಯ ಹೊಯ್ಸಳ ಗಸ್ತು ಘಟಕಕ್ಕೆ (ಯುನಿಟ್ 14) ಸೂಚನೆ',
    'ಅಪರಾಧಿ 451 ಮತ್ತು ಸೈಬರ್ ಶಂಕೆ ಸಕ್ರಿಯ ಮಾಹಿತಿ',
    'ಮೆಜೆಸ್ಟಿಕ್ ಠಾಣೆ ಎಫ್‌ಐಆರ್ ವಿಳಂಬ ವಿವರ'
  ] : [
    'Give info on recent crimes in Jayanagar',
    'Dispatch Hoysala Patrol Unit 14 to area',
    'Analyze financial fraud links for SUSPECT-112',
    'Identify FIR delay anomalies in Station 4'
  ];

  const filteredMessages = messages.filter(m => {
    if (categoryFilter === 'ALL') return true;
    return m.category === categoryFilter;
  });

  return (
    <div className="flex flex-col h-full bg-slate-950/95 border-r-2 border-amber-600/40 text-slate-100 select-none">
      {/* Header Bar */}
      <div className="p-3 bg-slate-900 border-b-2 border-amber-600/30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-amber-950/90 border border-amber-500/50 shadow-inner">
            <Bot className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xs font-serif font-bold tracking-wider uppercase text-amber-300 flex items-center gap-1.5">
              <span>{language === 'kn' ? 'ತ್ರಿನೇತ್ರ ಎಐ ಸಹಾಯಕ' : 'TRINETRA BILINGUAL AI'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              {language === 'kn' ? 'ಕರ್ನಾಟಕ ಪೊಲೀಸ್ CCTNS ಸಂಪರ್ಕಿತ' : 'Karnataka Police CCTNS Intelligence Connected'}
            </p>
          </div>
        </div>

        {/* Filter & Clear Controls */}
        <div className="flex items-center space-x-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-amber-600/30 text-[11px] text-amber-200/90 rounded px-2 py-1 focus:outline-none focus:border-amber-500 font-mono"
          >
            <option value="ALL">{language === 'kn' ? 'ಎಲ್ಲಾ ವರ್ಗ' : 'All Categories'}</option>
            <option value="FIR">FIR Analysis</option>
            <option value="PATROL">Hoysala Patrols</option>
            <option value="FINANCIAL">Financial Fraud</option>
            <option value="OSINT">OSINT Intelligence</option>
          </select>

          <button
            onClick={onClearChat}
            title="Clear Chat"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 rounded transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Queries Quick Bar */}
      <div className="p-2 bg-slate-950 border-b border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        {presetQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(q)}
            className="whitespace-nowrap px-2.5 py-1 rounded bg-slate-900 border border-amber-600/30 text-amber-200/90 hover:bg-amber-950/80 hover:border-amber-500 transition flex items-center gap-1 active:scale-95 font-sans"
          >
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Animated Message Stream */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans">
        <AnimatePresence initial={false}>
          {filteredMessages.map((msg) => {
            const isAi = msg.sender === 'ai';
            const textContent = language === 'kn' ? msg.textKn : msg.textEn;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {/* AI Avatar */}
                {isAi && (
                  <div className="w-7 h-7 rounded bg-amber-950/90 border border-amber-500/60 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-md p-3 text-xs leading-relaxed border shadow-lg relative ${
                    isAi
                      ? 'bg-slate-900/95 border-amber-600/30 text-slate-200'
                      : 'bg-rose-950/80 border-rose-800/80 text-amber-100 self-end'
                  }`}
                >
                  {/* Sender title & Timestamp */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-1.5 mb-1.5 text-[10px] font-mono">
                    <span className="font-semibold text-amber-400 uppercase">
                      {isAi ? (language === 'kn' ? 'ತ್ರಿನೇತ್ರ ಎಐ' : 'TRINETRA AI') : (language === 'kn' ? 'ನಿಯಂತ್ರಣಾಧಿಕಾರಿ' : 'DISPATCHER')}
                    </span>
                    <span className="flex items-center gap-2 text-slate-400">
                      {msg.timestamp}
                      {isAi && (
                        <button
                          onClick={() => handleReadAloud(textContent)}
                          title="Read Aloud (TTS)"
                          className="hover:text-amber-400 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      )}
                    </span>
                  </div>

                  {/* Message Body */}
                  <div className="whitespace-pre-wrap">{textContent}</div>

                  {/* AI Structured Metrics Callouts */}
                  {isAi && msg.metrics && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                      {msg.metrics.firsAnalyzed !== undefined && (
                        <div className="bg-slate-950 p-1.5 rounded border border-amber-600/20 flex items-center justify-between">
                          <span className="text-slate-400">FIRs Logged:</span>
                          <span className="font-bold text-amber-400">{msg.metrics.firsAnalyzed}</span>
                        </div>
                      )}
                      {msg.metrics.hotspotsIdentified !== undefined && (
                        <div className="bg-slate-950 p-1.5 rounded border border-amber-600/20 flex items-center justify-between">
                          <span className="text-slate-400">Crime Hotspots:</span>
                          <span className="font-bold text-amber-300">{msg.metrics.hotspotsIdentified}</span>
                        </div>
                      )}
                      {msg.metrics.patrolUnitsAssigned !== undefined && (
                        <div className="bg-slate-950 p-1.5 rounded border border-amber-600/20 flex items-center justify-between">
                          <span className="text-slate-400">Hoysala Units:</span>
                          <span className="font-bold text-emerald-400">{msg.metrics.patrolUnitsAssigned}</span>
                        </div>
                      )}
                      {msg.metrics.riskScore !== undefined && (
                        <div className="bg-slate-950 p-1.5 rounded border border-amber-600/20 flex items-center justify-between">
                          <span className="text-slate-400">Risk Score:</span>
                          <span className="font-bold text-rose-400">{msg.metrics.riskScore}/100</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {!isAi && (
                  <div className="w-7 h-7 rounded bg-rose-900 border border-rose-700 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                    <User className="w-4 h-4 text-amber-200" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Dynamic 3-Dot Typing Indicator */}
        {isAiThinking && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 items-center text-xs text-amber-200 bg-slate-900 border border-amber-600/30 p-2.5 rounded-md w-max"
          >
            <div className="w-6 h-6 rounded bg-amber-950 border border-amber-600/50 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
            <span className="font-mono text-[11px]">
              {language === 'kn' ? 'ತ್ರಿನೇತ್ರ ಎಐ ಪರಿಶೀಲಿಸುತ್ತಿದೆ...' : 'Trinetra AI querying CCTNS database...'}
            </span>
            <div className="flex gap-1 ml-1">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Voice Waveform Overlay when active */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-2.5 bg-rose-950/90 border-t-2 border-rose-700/80 flex items-center justify-between text-xs font-mono text-amber-100"
          >
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>
                {language === 'kn' ? 'ಕನ್ನಡ/ಇಂಗ್ಲಿಷ್ ಧ್ವನಿ ಆಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Listening in Kannada/English...'}
              </span>
              <span className="text-amber-300 font-bold">00:0{voiceSeconds}</span>
            </div>

            {/* Simulated Animated Waveform Bars */}
            <div className="flex items-center gap-1">
              <span className="w-1 bg-amber-400 rounded-full h-3 animate-pulse" style={{ animationDuration: '0.4s' }} />
              <span className="w-1 bg-amber-300 rounded-full h-6 animate-pulse" style={{ animationDuration: '0.6s' }} />
              <span className="w-1 bg-emerald-400 rounded-full h-4 animate-pulse" style={{ animationDuration: '0.3s' }} />
              <span className="w-1 bg-rose-400 rounded-full h-5 animate-pulse" style={{ animationDuration: '0.5s' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Box with Custom Carved Silver Microphone Trigger */}
      <div className="p-3 bg-slate-900 border-t-2 border-amber-600/30">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'kn'
                ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ ಅಥವಾ ಧ್ವನಿ ಟ್ರಿಗರ್ ಬಳಸಿ...'
                : 'Type query in English/Kannada or trigger voice...'
            }
            className="w-full bg-slate-950 border border-amber-600/30 rounded pl-3 pr-24 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition shadow-inner font-sans"
          />

          <div className="absolute right-1.5 flex items-center gap-1.5">
            {/* Custom Carved Silver Microphone Trigger */}
            <button
              onClick={toggleVoiceRecording}
              title={isVoiceActive ? 'Stop Listening' : 'Voice Input (Kannada/English)'}
              className={`px-2 py-1.5 rounded flex items-center gap-1 text-[11px] font-bold transition shadow-md ${
                isVoiceActive
                  ? 'bg-rose-600 text-white animate-pulse border border-rose-400'
                  : 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 text-slate-950 border border-slate-100 hover:from-slate-100 hover:to-slate-300 active:scale-95'
              }`}
            >
              {isVoiceActive ? (
                <MicOff className="w-3.5 h-3.5" />
              ) : (
                <Mic className="w-3.5 h-3.5 text-slate-900 stroke-[2.5]" />
              )}
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-1.5 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold disabled:opacity-40 disabled:hover:bg-amber-600 transition shadow"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
