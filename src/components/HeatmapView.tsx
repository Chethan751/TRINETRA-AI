import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Video, Filter, Download, Layers, Shield, RefreshCw } from 'lucide-react';
import { CrimeIncident, PatrolRoute, Language } from '../types';

interface HeatmapViewProps {
  language: Language;
  incidents: CrimeIncident[];
  patrolRoutes: PatrolRoute[];
  onSelectIncident?: (inc: CrimeIncident) => void;
}

const createTacticalIcon = (severity: string) => {
  const colorClass =
    severity === 'CRITICAL'
      ? 'bg-rose-600 border-amber-400 text-white shadow-rose-600/80'
      : severity === 'HIGH'
      ? 'bg-amber-600 border-amber-300 text-slate-950 shadow-amber-600/80'
      : 'bg-rose-900 border-rose-400 text-amber-200 shadow-rose-900/80';

  return L.divIcon({
    className: 'custom-tactical-marker',
    html: `<div class="relative flex items-center justify-center w-7 h-7 rounded-full border-2 ${colorClass} shadow-lg animate-pulse">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
          </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const HeatmapView: React.FC<HeatmapViewProps> = ({
  language,
  incidents,
  patrolRoutes,
  onSelectIncident
}) => {
  const [mapType, setMapType] = useState<'heatmap' | 'map' | 'satellite'>('heatmap');
  const [crimeTypeFilter, setCrimeTypeFilter] = useState('All Crimes');
  const [districtFilter, setDistrictFilter] = useState('Bengaluru Urban');
  const [stationFilter, setStationFilter] = useState('All Police Stations');
  const [severityFilter, setSeverityFilter] = useState('All Severity');

  const validIncidents = (incidents || []).filter(
    (inc) =>
      inc &&
      typeof inc.lat === 'number' &&
      typeof inc.lng === 'number' &&
      !isNaN(inc.lat) &&
      !isNaN(inc.lng)
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#070a14] text-slate-100 overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100 flex items-center gap-2">
            <span>{language === 'kn' ? 'ಅಪರಾಧ ಹೀಟ್‌ಮ್ಯಾಪ್' : 'Crime Heatmap'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'kn'
              ? 'ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಅಪರಾಧ ಸಾಂದ್ರತೆ ಮತ್ತು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ದೃಶ್ಯೀಕರಿಸಿ'
              : 'Visualize crime concentration and hotspots across Bengaluru'}
          </p>
        </div>
      </div>

      {/* Main Layout: Map (Left) + Filters & Heatmap Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Stage (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden h-[500px] relative flex flex-col">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={12}
            className="w-full h-full z-10"
            zoomControl={false}
          >
            <TileLayer
              url={
                mapType === 'satellite'
                  ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              }
              attribution="&copy; OpenStreetMap"
            />

            {/* Heatmap intensity circles */}
            {validIncidents.map((inc) => (
              <React.Fragment key={`circle-${inc.id}`}>
                <Circle
                  center={[inc.lat, inc.lng]}
                  radius={1200}
                  pathOptions={{
                    color: '#ef4444',
                    fillColor: '#f97316',
                    fillOpacity: 0.35,
                    stroke: false
                  }}
                />
                <Marker
                  position={[inc.lat, inc.lng]}
                  icon={createTacticalIcon(inc.severity)}
                >
                  <Popup>
                    <div className="text-xs font-sans text-slate-900 p-1">
                      <div className="font-bold text-rose-700">{inc.title}</div>
                      <div className="text-[10px] text-slate-600">{inc.locationName}</div>
                      <div className="text-[10px] font-mono mt-1">{inc.firNumber}</div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>

          {/* Map Controls & Mode Toggles Overlay */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 bg-slate-950/90 border border-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setMapType('heatmap')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapType === 'heatmap' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Heatmap
            </button>
            <button
              onClick={() => setMapType('map')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapType === 'map' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Heatmap Legend Box Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 border border-slate-800 p-3 rounded-xl text-xs space-y-1.5 shadow-xl">
            <div className="font-bold text-slate-300 uppercase text-[10px]">INTENSITY LEVEL</div>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-2 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Very High
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> High
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Medium
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Filters Panel & Heatmap Summary */}
        <div className="space-y-6">
          {/* Filters Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                FILTERS
              </h3>
              <button
                onClick={() => {
                  setCrimeTypeFilter('All Crimes');
                  setSeverityFilter('All Severity');
                }}
                className="text-[10px] text-blue-400 hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Crime Type</label>
                <select
                  value={crimeTypeFilter}
                  onChange={(e) => setCrimeTypeFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
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
                <label className="text-[10px] text-slate-400 font-bold block mb-1">District</label>
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                >
                  <option>Bengaluru Urban</option>
                  <option>Bengaluru Rural</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Police Station</label>
                <select
                  value={stationFilter}
                  onChange={(e) => setStationFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                >
                  <option>All Police Stations</option>
                  <option>HSR Layout PS</option>
                  <option>Koramangala PS</option>
                  <option>Marathahalli PS</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Severity</label>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                >
                  <option>All Severity</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-all text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/30">
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>

          {/* Heatmap Summary */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              HEATMAP SUMMARY
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Total Incidents</span>
                <span className="font-bold font-mono">2,351</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">High Intensity Zones</span>
                <span className="font-bold font-mono text-rose-400">16</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Medium Intensity Zones</span>
                <span className="font-bold font-mono text-amber-400">28</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Low Intensity Zones</span>
                <span className="font-bold font-mono text-emerald-400">42</span>
              </div>
            </div>

            <button className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold py-2 rounded-lg text-xs flex items-center justify-center space-x-2 transition-all">
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Incidents in High Intensity Zones Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            RECENT INCIDENTS IN HIGH INTENSITY ZONES
          </h3>
          <button className="text-xs text-blue-400 hover:underline">View All →</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">FIR NO.</th>
                <th className="py-2.5 px-3">CRIME TYPE</th>
                <th className="py-2.5 px-3">LOCATION</th>
                <th className="py-2.5 px-3">DATE & TIME</th>
                <th className="py-2.5 px-3">POLICE STATION</th>
                <th className="py-2.5 px-3">SEVERITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {[
                { fir: 'FIR12345/2026', type: 'Robbery', loc: 'Koramangala 4th Block', date: '25 May 2026, 10:45 PM', ps: 'Koramangala PS', sev: 'High' },
                { fir: 'FIR12346/2026', type: 'Assault', loc: 'Malleswaram West', date: '25 May 2026, 09:30 PM', ps: 'Malleswaram PS', sev: 'High' },
                { fir: 'FIR12347/2026', type: 'Theft', loc: 'Marathahalli', date: '25 May 2026, 08:10 PM', ps: 'Marathahalli PS', sev: 'Medium' },
                { fir: 'FIR12348/2026', type: 'Burglary', loc: 'HSR Layout Sector 2', date: '25 May 2026, 07:25 PM', ps: 'HSR Layout PS', sev: 'High' },
                { fir: 'FIR12349/2026', type: 'Cyber Crime', loc: 'Electronic City Phase 1', date: '25 May 2026, 06:40 PM', ps: 'Electronic City PS', sev: 'Medium' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-semibold text-blue-400">{row.fir}</td>
                  <td className="py-2.5 px-3 font-sans">{row.type}</td>
                  <td className="py-2.5 px-3 font-sans">{row.loc}</td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-400">{row.date}</td>
                  <td className="py-2.5 px-3 font-sans">{row.ps}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.sev === 'High'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {row.sev}
                    </span>
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
