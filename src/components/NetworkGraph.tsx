import React, { useState } from 'react';
import { NetworkNode, NetworkEdge, Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { GitCommit, DollarSign, Users, ShieldAlert, ExternalLink } from 'lucide-react';

interface NetworkGraphProps {
  language: Language;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  language,
  nodes,
  edges
}) => {
  const [viewMode, setViewMode] = useState<'OFFENDER_LINK' | 'FINANCIAL_TRAIL'>('OFFENDER_LINK');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(nodes[0] || null);

  const filteredEdges = edges.filter(e => e.type === viewMode);

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-lg overflow-hidden border-2 border-amber-600/40 shadow-2xl flex flex-col p-3 sm:p-4">
      {/* Top Controls & Financial Link Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b-2 border-amber-600/30 bg-slate-900 p-2.5 rounded">
        <div>
          <h3 className="text-xs sm:text-sm font-serif font-bold tracking-wider uppercase text-amber-300 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'kn' ? 'ಅಪರಾಧಿ ಮತ್ತು ಸೈಬರ್ ಹಣಕಾಸು ಜಾಲ ನಕ್ಷೆ' : 'REPEAT OFFENDER & FINANCIAL TRAIL NETWORK GRAPH'}
            </span>
          </h3>
          <p className="text-[11px] text-amber-200/80">
            {language === 'kn' ? 'CCTNS ಸಿಂಡಿಕೇಟ್ ಬಂಧಗಳು ಮತ್ತು ಸೈಬರ್ ಯುಪಿಐ ವಂಚನೆ ಹರಿವು' : 'CCTNS Syndicate Linkages & Cyber UPI Laundering Flows'}
          </p>
        </div>

        {/* Tactical Feature 3: Financial Link Switcher Toggle */}
        <div className="bg-slate-950 border border-amber-600/40 rounded p-1 flex items-center space-x-1 shadow-inner">
          <button
            onClick={() => setViewMode('OFFENDER_LINK')}
            className={`px-3 py-1.5 text-xs font-serif font-bold rounded transition flex items-center gap-1.5 ${
              viewMode === 'OFFENDER_LINK'
                ? 'bg-amber-600 text-slate-950 shadow-md font-extrabold'
                : 'text-amber-200/80 hover:text-amber-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'kn' ? 'ಅಪರಾಧಿ ಲಿಂಕ್‌ಗಳು' : 'Offender Linkage'}</span>
          </button>

          <button
            onClick={() => setViewMode('FINANCIAL_TRAIL')}
            className={`px-3 py-1.5 text-xs font-serif font-bold rounded transition flex items-center gap-1.5 ${
              viewMode === 'FINANCIAL_TRAIL'
                ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                : 'text-amber-200/80 hover:text-amber-100'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{language === 'kn' ? 'ಹಣಕಾಸು ವಂಚನೆ ಟ್ರೇಲ್' : 'Financial Fraud Trail'}</span>
          </button>
        </div>
      </div>

      {/* Interactive SVG Network Stage */}
      <div className="relative flex-1 bg-slate-950/90 rounded border-2 border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
        <svg className="w-full h-full min-h-[420px] select-none">
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
            {/* Arrow Marker for Financial Transfers */}
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={viewMode === 'FINANCIAL_TRAIL' ? '#10b981' : '#f59e0b'} />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Render Edges */}
          {filteredEdges.map((edge) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);

            if (!sourceNode || !targetNode) return null;

            const x1 = sourceNode.x || 300;
            const y1 = sourceNode.y || 200;
            const x2 = targetNode.x || 500;
            const y2 = targetNode.y || 250;

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={edge.id}>
                {/* Glowing Relationship Line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={viewMode === 'FINANCIAL_TRAIL' ? '#10b981' : '#f59e0b'}
                  strokeWidth={edge.riskWeight || 2}
                  strokeDasharray={viewMode === 'FINANCIAL_TRAIL' ? '6,4' : undefined}
                  markerEnd="url(#arrow)"
                  className="opacity-80 transition-all duration-500"
                />

                {/* Edge Amount Label for Financial Fraud Trail */}
                {viewMode === 'FINANCIAL_TRAIL' && edge.amountINR && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-45"
                      y="-10"
                      width="90"
                      height="20"
                      rx="4"
                      fill="#020617"
                      stroke="#10b981"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill="#10b981"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      ₹ {(edge.amountINR).toLocaleString('en-IN')}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render Nodes with Framer Motion Spring Expansion */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isLeader = node.type === 'LEADER';
            const isFinancialNode = node.type === 'UPI_GATEWAY' || node.type === 'CRYPTO_WALLET';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x || 300}, ${node.y || 200})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Outer Pulsing Glow */}
                <circle
                  r={isLeader ? 32 : isFinancialNode ? 28 : 24}
                  fill={isLeader ? '#dc2626' : isFinancialNode ? '#10b981' : '#d97706'}
                  opacity={isSelected ? 0.4 : 0.15}
                  className="animate-pulse"
                />

                {/* Main Node Circle */}
                <circle
                  r={isLeader ? 24 : isFinancialNode ? 20 : 18}
                  fill="#0f172a"
                  stroke={isLeader ? '#f87171' : isFinancialNode ? '#10b981' : isSelected ? '#fbbf24' : '#d97706'}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-300 group-hover:scale-110"
                />

                {/* Node Label Text */}
                <text
                  y={isLeader ? 38 : 32}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none drop-shadow-md"
                >
                  {node.id}
                </text>

                <text
                  y={isLeader ? 50 : 44}
                  textAnchor="middle"
                  fill="#fbbf24"
                  fontSize="9"
                  fontFamily="sans-serif"
                  className="pointer-events-none font-bold"
                >
                  {node.name.length > 18 ? `${node.name.slice(0, 16)}...` : node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Suspect Dossier Floating Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 z-10 w-80 bg-slate-950 border-2 border-amber-600/50 rounded p-4 shadow-2xl backdrop-blur-md text-xs font-sans text-slate-200"
            >
              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-amber-600/30 pb-2 mb-3">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span className="font-serif font-bold text-amber-300 uppercase tracking-wider">
                    {language === 'kn' ? 'ಶಂಕಿತರ ಸಮಗ್ರ ತನಿಖಾ ಕಡತ' : 'SUSPECT DOSSIER'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                  RISK: {selectedNode.riskScore}/100
                </span>
              </div>

              {/* Suspect Specs */}
              <div className="space-y-2 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Name / Alias:</span>
                  <span className="text-amber-300 font-bold font-serif">{selectedNode.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900 p-2 rounded border border-amber-600/30">
                    <span className="text-slate-400 block text-[9px]">CCTNS ID:</span>
                    <span className="text-amber-200 font-semibold">{selectedNode.cctnsId}</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-amber-600/30">
                    <span className="text-slate-400 block text-[9px]">Role / Type:</span>
                    <span className="text-emerald-400 font-semibold">{selectedNode.type}</span>
                  </div>
                </div>

                {selectedNode.bankDetails && (
                  <div className="bg-slate-900 p-2 rounded border border-amber-600/30">
                    <span className="text-slate-400 block text-[9px]">Linked Bank Account:</span>
                    <span className="text-slate-200 font-semibold">{selectedNode.bankDetails}</span>
                  </div>
                )}

                {selectedNode.upiId && (
                  <div className="bg-slate-900 p-2 rounded border border-amber-600/30">
                    <span className="text-slate-400 block text-[9px]">UPI VPA Gateway:</span>
                    <span className="text-amber-300 font-semibold">{selectedNode.upiId}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Active Warrants:</span>
                  <span className="text-rose-400 font-bold">{selectedNode.activeWarrants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Prior Convictions:</span>
                  <span className="text-slate-200">{selectedNode.prioriConvictions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <span className="text-amber-300 font-bold">{selectedNode.jurisdiction}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-amber-600/30 flex gap-2">
                <button
                  onClick={() => alert(`CCTNS Look-up triggered for ${selectedNode.cctnsId}`)}
                  className="flex-1 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-[10px] font-mono flex items-center justify-center gap-1 transition shadow"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>CCTNS PROFILE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
