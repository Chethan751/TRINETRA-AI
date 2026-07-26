import React, { useState } from 'react';
import {
  Shield,
  MapPin,
  Clock,
  Fuel,
  Users,
  Radio,
  Download,
  Navigation,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language, PatrolRoute } from '../types';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PatrolRouteViewProps {
  language: Language;
  patrolRoutes?: PatrolRoute[];
}

export const PatrolRouteView: React.FC<PatrolRouteViewProps> = ({
  language,
  patrolRoutes
}) => {
  const [station, setStation] = useState('HSR Layout PS');
  const [vehicle, setVehicle] = useState('KA 01 G 1234');
  const [officers, setOfficers] = useState('4 Officers');
  const [date, setDate] = useState('2026-05-25');
  const [time, setTime] = useState('20:00 - 06:00');
  const [isGenerating, setIsGenerating] = useState(false);

  const stops = [
    { id: 1, name: 'HSR Layout PS (Start)', eta: '20:00', risk: 'Start Point', isStart: true },
    { id: 2, name: 'Bellandur Junction', eta: '20:25 ETA', risk: 'High', color: 'bg-rose-950 text-rose-400 border-rose-800' },
    { id: 3, name: 'Marathahalli Bridge', eta: '20:55 ETA', risk: 'High', color: 'bg-rose-950 text-rose-400 border-rose-800' },
    { id: 4, name: 'Whitefield Main Rd', eta: '21:20 ETA', risk: 'Medium', color: 'bg-amber-950 text-amber-400 border-amber-800' },
    { id: 5, name: 'Electronic City Phase 1', eta: '21:55 ETA', risk: 'Medium', color: 'bg-amber-950 text-amber-400 border-amber-800' },
    { id: 6, name: 'Bommanahalli Circle', eta: '22:25 ETA', risk: 'Medium', color: 'bg-amber-950 text-amber-400 border-amber-800' },
    { id: 7, name: 'Koramangala 4th Block', eta: '22:45 ETA', risk: 'High', color: 'bg-rose-950 text-rose-400 border-rose-800' },
    { id: 8, name: 'HSR Layout PS (End)', eta: '23:45', risk: 'End Point', isStart: true },
  ];

  const mapWaypoints: [number, number][] = [
    [12.9116, 77.6389], // HSR Layout
    [12.9279, 77.6811], // Bellandur
    [12.9562, 77.7019], // Marathahalli
    [12.9698, 77.7499], // Whitefield
    [12.8452, 77.6602], // Electronic City
    [12.9022, 77.6242], // Bommanahalli
    [12.9352, 77.6245], // Koramangala
    [12.9116, 77.6389], // HSR Layout
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      {/* Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
          {language === 'kn' ? 'ಗಸ್ತು ಮಾರ್ಗ ಸೂಕ್ತತೆ' : 'Patrol Route Optimization'}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {language === 'kn'
            ? 'ಎಐ ಚಾಲಿತ ಗಸ್ತು ಮಾರ್ಗ ಯೋಜಕ'
            : 'AI-powered optimal patrol route planning'}
        </p>
      </div>

      {/* Top Filter Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Police Station
          </label>
          <select
            value={station}
            onChange={(e) => setStation(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
          >
            <option>HSR Layout PS</option>
            <option>Koramangala PS</option>
            <option>Marathahalli PS</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Patrol Vehicle
          </label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
          >
            <option>KA 01 G 1234</option>
            <option>KA 01 G 5678</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
            Number of Officers
          </label>
          <select
            value={officers}
            onChange={(e) => setOfficers(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
          >
            <option>4 Officers</option>
            <option>2 Officers</option>
            <option>6 Officers</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
          >
            <option>20:00 - 06:00</option>
            <option>06:00 - 14:00</option>
            <option>14:00 - 22:00</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-600/30"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isGenerating ? 'Planning...' : 'Generate Optimal Route'}</span>
        </button>
      </div>

      {/* Main Map + Route Summary Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Map View (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden h-[460px] relative">
          <MapContainer
            center={[12.9279, 77.6811]}
            zoom={12}
            className="w-full h-full z-10"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap"
            />
            <Polyline
              positions={mapWaypoints}
              pathOptions={{ color: '#3b82f6', weight: 4, dashArray: '8, 8' }}
            />
            {mapWaypoints.map((pt, idx) => (
              <Marker
                key={idx}
                position={pt}
                icon={L.divIcon({
                  className: 'bg-blue-600 border-2 border-white w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg',
                  html: `<span>${idx + 1}</span>`
                })}
              >
                <Popup>
                  <div className="text-xs font-bold text-slate-900">
                    Checkpoint {idx + 1}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 border border-slate-800 p-3 rounded-xl text-xs space-y-1.5 shadow-xl">
            <div className="font-bold text-slate-300">LEGEND</div>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Start Point (Police Station)
            </div>
            <div className="flex items-center gap-2 text-amber-400 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Waypoint / Stop
            </div>
            <div className="flex items-center gap-2 text-rose-400 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High Risk Zone
            </div>
          </div>
        </div>

        {/* Right Patrol Stops & Route Summary Column */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Route Summary Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              ROUTE SUMMARY
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <div className="text-[10px] text-slate-400">Total Distance</div>
                <div className="text-base font-bold font-mono text-slate-100">38.6 km</div>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <div className="text-[10px] text-slate-400">Estimated Time</div>
                <div className="text-base font-bold font-mono text-slate-100">2h 45m</div>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <div className="text-[10px] text-slate-400">Fuel Estimate</div>
                <div className="text-base font-bold font-mono text-slate-100">3.8 L</div>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <div className="text-[10px] text-slate-400">Stops / Checkpoints</div>
                <div className="text-base font-bold font-mono text-slate-100">7</div>
              </div>
            </div>
          </div>

          {/* Patrol Stops List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 max-h-72 overflow-y-auto no-scrollbar">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              PATROL STOPS
            </h3>

            <div className="space-y-2">
              {stops.map((stop) => (
                <div
                  key={stop.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        stop.isStart
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {stop.id}
                    </span>
                    <span className="font-semibold text-slate-200 truncate">{stop.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    {stop.color && (
                      <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold border ${stop.color}`}>
                        {stop.risk}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-mono">{stop.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Level Along Route Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            RISK LEVEL ALONG ROUTE
          </h3>
          <div className="h-28 w-full flex items-end justify-between px-2 pt-4 border-b border-slate-800 relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-2">
              <polyline
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3"
                points="10,80 40,50 70,20 100,35 130,55 160,70 190,85"
              />
            </svg>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <span key={num} className="text-[10px] text-slate-500 font-mono">
                Stop {num}
              </span>
            ))}
          </div>
        </div>

        {/* Patrol Route Insights */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs text-slate-300">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            PATROL ROUTE INSIGHTS
          </h3>

          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>This route covers 7 high & medium risk zones.</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Patrolling between 20:00 - 23:00 covers 68% of predicted incidents.</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Recommended vehicle: SUV / Interceptor</span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">AI Confidence Score</span>
            <span className="font-bold text-emerald-400 font-mono">92%</span>
          </div>
        </div>

        {/* Patrol Team & Export Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              PATROL TEAM
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Total Officers</span>
                <span className="font-bold">4</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Vehicle</span>
                <span className="font-bold font-mono">KA 01 G 1234</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Communication</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Active
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all">
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export Route</span>
          </button>
        </div>
      </div>
    </div>
  );
};
