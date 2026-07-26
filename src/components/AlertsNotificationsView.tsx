import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  Check,
  Filter,
  MoreVertical,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Language, NotificationAlert, NavSection } from '../types';

interface AlertsNotificationsViewProps {
  language: Language;
  onNavigate: (section: NavSection) => void;
}

export const AlertsNotificationsView: React.FC<AlertsNotificationsViewProps> = ({
  language,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'GENERAL' | 'SYSTEM'>('ALL');
  const [markedRead, setMarkedRead] = useState<Record<string, boolean>>({});

  const initialAlerts: NotificationAlert[] = [
    {
      id: 'alt-1',
      title: 'High Crime Activity Detected',
      description: 'Abnormal increase in Robbery cases in Marathahalli area',
      category: 'CRITICAL',
      location: 'Marathahalli, Bengaluru',
      timestamp: '2 min ago',
      isRead: false,
      statusTag: 'Critical',
    },
    {
      id: 'alt-2',
      title: 'Repeat Offender Released',
      description: 'Known offender Ravi P. released from prison today',
      category: 'CRITICAL',
      location: 'Central Jail, Bengaluru',
      timestamp: '15 min ago',
      isRead: false,
      statusTag: 'Critical',
    },
    {
      id: 'alt-3',
      title: 'Crime Pattern Anomaly',
      description: 'Unusual pattern detected in Vehicle Theft cases',
      category: 'HIGH',
      location: 'HSR Layout, Bengaluru',
      timestamp: '32 min ago',
      isRead: false,
      statusTag: 'High',
    },
    {
      id: 'alt-4',
      title: 'Multiple Incidents Reported',
      description: '5 incidents reported within 2 hours in Electronic City',
      category: 'HIGH',
      location: 'Electronic City, Bengaluru',
      timestamp: '45 min ago',
      isRead: false,
      statusTag: 'High',
    },
    {
      id: 'alt-5',
      title: 'Suspicious Activity Alert',
      description: 'Suspicious gathering reported near Bellandur Lake',
      category: 'GENERAL',
      location: 'Bellandur, Bengaluru',
      timestamp: '1 hour ago',
      isRead: false,
      statusTag: 'Medium',
    },
    {
      id: 'alt-[#alt-6]',
      title: 'Weather Alert',
      description: 'Heavy rainfall expected. Be prepared for emergency response',
      category: 'GENERAL',
      location: 'Bengaluru City',
      timestamp: '2 hours ago',
      isRead: false,
      statusTag: 'Medium',
    },
    {
      id: 'alt-7',
      title: 'System Maintenance',
      description: 'Scheduled maintenance on AI prediction system',
      category: 'SYSTEM',
      location: 'System',
      timestamp: '3 hours ago',
      isRead: false,
      statusTag: 'Info',
    },
  ];

  const handleMarkAllRead = () => {
    const updated: Record<string, boolean> = {};
    initialAlerts.forEach((a) => (updated[a.id] = true));
    setMarkedRead(updated);
  };

  const filteredAlerts = initialAlerts.filter((a) => {
    if (activeTab === 'CRITICAL') return a.category === 'CRITICAL';
    if (activeTab === 'HIGH') return a.category === 'HIGH';
    if (activeTab === 'GENERAL') return a.category === 'GENERAL';
    if (activeTab === 'SYSTEM') return a.category === 'SYSTEM';
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#070a14] min-h-full overflow-y-auto text-slate-100">
      {/* Top Title & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
            {language === 'kn' ? 'ಎಚ್ಚರಿಕೆಗಳು & ಸೂಚನೆಗಳು' : 'Alerts & Notifications'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'kn'
              ? 'ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸಿಸ್ಟಮ್ ಸೂಚನೆಗಳೊಂದಿಗೆ ನವೀಕೃತರಾಗಿರಿ'
              : 'Stay updated with critical alerts and system notifications'}
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-all self-start sm:self-auto"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Top 4 Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-black font-mono text-rose-500">12</div>
            <div className="text-xs font-semibold text-slate-200">Critical Alerts</div>
            <div className="text-[10px] text-slate-400">Require Immediate Action</div>
          </div>
          <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-400 rounded-xl">
            <Bell className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-black font-mono text-amber-500">18</div>
            <div className="text-xs font-semibold text-slate-200">High Priority</div>
            <div className="text-[10px] text-slate-400">Need Attention</div>
          </div>
          <div className="p-3 bg-amber-950/80 border border-amber-800 text-amber-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-black font-mono text-yellow-500">24</div>
            <div className="text-xs font-semibold text-slate-200">General Alerts</div>
            <div className="text-[10px] text-slate-400">System Notifications</div>
          </div>
          <div className="p-3 bg-yellow-950/80 border border-yellow-800 text-yellow-400 rounded-xl">
            <Info className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-black font-mono text-emerald-400">156</div>
            <div className="text-xs font-semibold text-slate-200">All Notifications</div>
            <div className="text-[10px] text-slate-400">Last 30 Days</div>
          </div>
          <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Layout: Alert Feed Left + Alert Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Notification Feed & Filters */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-xs">
            <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
              {[
                { key: 'ALL', label: 'All Alerts' },
                { key: 'CRITICAL', label: 'Critical (12)' },
                { key: 'HIGH', label: 'High Priority (18)' },
                { key: 'GENERAL', label: 'General (24)' },
                { key: 'SYSTEM', label: 'System (102)' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                <Filter className="w-3 h-3" />
                <span>Filter</span>
              </button>
              <select className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300">
                <option>Most Recent</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>

          {/* Alert Feed Items */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => {
              const isCritical = alert.category === 'CRITICAL';
              const isHigh = alert.category === 'HIGH';
              const isGen = alert.category === 'GENERAL';

              const borderLeft = isCritical
                ? 'border-l-4 border-l-rose-500'
                : isHigh
                ? 'border-l-4 border-l-amber-500'
                : isGen
                ? 'border-l-4 border-l-yellow-500'
                : 'border-l-4 border-l-blue-500';

              const badgeColor = isCritical
                ? 'bg-rose-950 text-rose-400 border-rose-800'
                : isHigh
                ? 'bg-amber-950 text-amber-400 border-amber-800'
                : isGen
                ? 'bg-yellow-950 text-yellow-400 border-yellow-800'
                : 'bg-blue-950 text-blue-400 border-blue-800';

              return (
                <div
                  key={alert.id}
                  className={`bg-slate-900/90 border border-slate-800 ${borderLeft} rounded-r-xl p-4 flex items-center justify-between hover:bg-slate-800/60 transition-all`}
                >
                  <div className="flex items-start space-x-3.5">
                    <div
                      className={`p-2.5 rounded-xl mt-0.5 ${
                        isCritical
                          ? 'bg-rose-950 text-rose-400'
                          : isHigh
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-blue-950 text-blue-400'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-100">{alert.title}</span>
                      </div>
                      <p className="text-xs text-slate-300">{alert.description}</p>
                      <div className="flex items-center space-x-3 text-[10px] text-slate-400 pt-1 font-mono">
                        <span>📍 {alert.location}</span>
                        <span>• {alert.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeColor}`}>
                      {alert.statusTag}
                    </span>
                    <button className="text-slate-500 hover:text-slate-300 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Alert Summary Donut & Quick Actions */}
        <div className="space-y-6">
          {/* Alert Summary Donut Chart */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              ALERT SUMMARY
            </h3>

            <div className="flex items-center justify-around my-2">
              <div className="relative w-32 h-32 rounded-full border-8 border-rose-500/20 flex items-center justify-center border-t-rose-500 border-r-amber-500">
                <div className="text-center">
                  <div className="text-xl font-bold font-mono text-slate-100">156</div>
                  <div className="text-[10px] text-slate-400">Total Alerts</div>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center space-x-2 text-rose-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Critical: 12 (12%)</span>
                </div>
                <div className="flex items-center space-x-2 text-amber-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>High Priority: 18 (18%)</span>
                </div>
                <div className="flex items-center space-x-2 text-yellow-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span>Medium: 24 (24%)</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>System: 102 (68%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              RECENT ACTIVITY
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] text-slate-500 font-mono shrink-0">2 min ago</span>
                <span className="text-slate-300">High crime activity in Marathahalli</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] text-slate-500 font-mono shrink-0">15 min ago</span>
                <span className="text-slate-300">Repeat offender released</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] text-slate-500 font-mono shrink-0">32 min ago</span>
                <span className="text-slate-300">Crime pattern anomaly detected</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] text-slate-500 font-mono shrink-0">45 min ago</span>
                <span className="text-slate-300">Multiple incidents in Electronic City</span>
              </div>
            </div>

            <button className="w-full pt-2 text-center text-xs text-blue-400 hover:underline">
              View All Activity →
            </button>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              QUICK ACTIONS
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('HEATMAP')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-all"
              >
                <span>View Crime Heatmap</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('REPORTS')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-all"
              >
                <span>Generate Alert Report</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('SETTINGS')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-all"
              >
                <span>Configure Alert Rules</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
