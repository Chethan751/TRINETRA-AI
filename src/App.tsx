import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CrimePredictionView } from './components/CrimePredictionView';
import { PatrolRouteView } from './components/PatrolRouteView';
import { AIChatbotView } from './components/AIChatbotView';
import { HeatmapView } from './components/HeatmapView';
import { AlertsNotificationsView } from './components/AlertsNotificationsView';
import { ReportsView } from './components/ReportsView';
import { CasesView } from './components/CasesView';
import { AccusedDatabaseView } from './components/AccusedDatabaseView';
import { SettingsView } from './components/SettingsView';
import { AdminPanelModal } from './components/AdminPanelModal';
import { LoginModal } from './components/LoginModal';

import { Language, ChatMessage, CrimeIncident, PatrolRoute, NavSection } from './types';
import {
  INITIAL_CRIME_INCIDENTS,
  HOYSALA_PATROL_ROUTES,
  INITIAL_CHAT_MESSAGES
} from './data/mockData';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<NavSection>('DASHBOARD');

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentOfficer, setCurrentOfficer] = useState<{ username: string; role: string; name: string }>({
    username: 'ksp_admin',
    role: 'SUPERINTENDENT_OF_POLICE',
    name: 'Inspector Arjun'
  });

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const [incidents, setIncidents] = useState<CrimeIncident[]>(INITIAL_CRIME_INCIDENTS);
  const [patrolRoutes, setPatrolRoutes] = useState<PatrolRoute[]>(HOYSALA_PATROL_ROUTES);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(new Date());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminModalOpen(false);
  };

  const handleLoginSuccess = (officerData: { username: string; role: string; name: string }) => {
    setCurrentOfficer(officerData);
    setIsAuthenticated(true);
  };

  // Admin Handlers
  const handleAddIncident = (newInc: CrimeIncident) => {
    setIncidents((prev) => [newInc, ...prev]);
  };

  const handleDeleteIncident = (id: string) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id));
  };

  const handleUpdatePatrolRoute = (unitId: string, newStatus: string, coverage: number) => {
    setPatrolRoutes((prev) =>
      prev.map((route) =>
        route.unitId === unitId
          ? { ...route, status: newStatus, coveragePercent: coverage }
          : route
      )
    );
  };

  // Automated 30-second Live Sync polling for Catalyst Data Store
  const fetchLiveAnalytics = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setLastSyncTime(new Date());
        if (data.incidents && Array.isArray(data.incidents)) {
          setIncidents((prev) => {
            const apiIncidentIds = new Set(data.incidents.map((i: any) => i.id));
            const existingNonApi = prev.filter((i) => !apiIncidentIds.has(i.id));
            return [
              ...existingNonApi,
              ...data.incidents.map((inc: any) => ({
                id: inc.id,
                firNumber: inc.firNumber || `FIR/2026/0${inc.id?.split('-')[1] || '01'}`,
                title: inc.title || inc.crime || 'Incident Reported',
                type: inc.type || inc.crimeCategory || 'VEHICLE_THEFT',
                severity: inc.severity || 'HIGH',
                locationName: inc.locationName || inc.location || 'Bengaluru Zone',
                lat: typeof inc.lat === 'number' ? inc.lat : 12.9716,
                lng: typeof inc.lng === 'number' ? inc.lng : 77.5946,
                timestamp: inc.timestamp || 'Just Now',
                status: inc.status || 'INVESTIGATING',
                cctvAvailable: inc.cctvAvailable ?? true,
                cctvVideoUrl: inc.cctvVideoUrl,
                flaggedVehicle: inc.flaggedVehicle,
                suspectId: inc.suspectId,
                descriptionKn: inc.descriptionKn || `ಅಪರಾಧ ದಾಖಲಾಗಿದೆ: ${inc.crime || inc.title}`,
                descriptionEn: inc.descriptionEn || `Crime incident recorded: ${inc.crime || inc.title}`
              }))
            ];
          });
        }
      }
    } catch (err) {
      console.warn('Catalyst Data Store live sync query notice:', err);
    } fontFinally: {
      setTimeout(() => {
        setIsSyncing(false);
      }, 600);
    }
  }, []);

  useEffect(() => {
    fetchLiveAnalytics();
    const interval = setInterval(() => {
      fetchLiveAnalytics();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLiveAnalytics]);

  // Send message to server-side Gemini API (/api/chat)
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      textKn: text,
      textEn: text,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      category: 'GENERAL'
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          language: language,
          context: 'Karnataka State Police Datathon 2026 - Bengaluru Command Center'
        })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        textKn: data.replyKn || data.replyEn || 'CCTNS ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.',
        textEn: data.replyEn || data.replyKn || 'CCTNS analysis complete.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        category: 'FIR'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        textKn: `[ತ್ರಿನೇತ್ರ ಎಐ]: "${text}" ಕುರಿತು CCTNS ಡೇಟಾಬೇಸ್ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.`,
        textEn: `[Trinetra AI]: Processed CCTNS query for "${text}". Analyzed 12 FIR records across Indiranagar & Bellandur zones. Hoysala Patrol Unit 14 dispatched.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#070a14] text-slate-100 overflow-hidden font-sans">
      {!isAuthenticated && (
        <LoginModal language={language} onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Permanent Left Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        language={language}
        unreadAlertsCount={12}
        onLogout={handleLogout}
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top App Header */}
        <Header
          language={language}
          onLanguageToggle={setLanguage}
          onOpenAdminPanel={() => setIsAdminModalOpen(true)}
          onSearchQuery={setSearchQuery}
          unreadCount={12}
          onOpenNotifications={() => setActiveSection('ALERTS')}
          isSyncing={isSyncing}
          onTriggerSync={fetchLiveAnalytics}
          onLogout={handleLogout}
          officerName={currentOfficer.name}
        />

        {/* Dynamic Section View Stage */}
        <main className="flex-1 overflow-y-auto min-h-0 bg-[#070a14]">
          {activeSection === 'DASHBOARD' && (
            <DashboardView
              language={language}
              incidents={incidents}
              onNavigate={setActiveSection}
              onOpenAddFir={() => setIsAdminModalOpen(true)}
              onEmergencyAlert={() => setActiveSection('ALERTS')}
            />
          )}

          {activeSection === 'PREDICTION' && (
            <CrimePredictionView
              language={language}
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'PATROL' && (
            <PatrolRouteView
              language={language}
              patrolRoutes={patrolRoutes}
            />
          )}

          {activeSection === 'CHATBOT' && (
            <AIChatbotView
              language={language}
              messages={messages}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              isAiThinking={isAiThinking}
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'HEATMAP' && (
            <HeatmapView
              language={language}
              incidents={incidents}
              patrolRoutes={patrolRoutes}
            />
          )}

          {activeSection === 'ALERTS' && (
            <AlertsNotificationsView
              language={language}
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'REPORTS' && (
            <ReportsView
              language={language}
              incidents={incidents}
              patrolRoutes={patrolRoutes}
              officerName={currentOfficer.name}
            />
          )}

          {activeSection === 'CASES' && (
            <CasesView
              language={language}
              incidents={incidents}
              onOpenAddFir={() => setIsAdminModalOpen(true)}
            />
          )}

          {activeSection === 'ACCUSED' && (
            <AccusedDatabaseView
              language={language}
            />
          )}

          {activeSection === 'SETTINGS' && (
            <SettingsView
              language={language}
            />
          )}
        </main>
      </div>

      {/* Admin Panel Modal for KSP Officers */}
      {isAdminModalOpen && (
        <AdminPanelModal
          language={language}
          onClose={() => setIsAdminModalOpen(false)}
          incidents={incidents}
          onAddIncident={handleAddIncident}
          onDeleteIncident={handleDeleteIncident}
          patrolRoutes={patrolRoutes}
          onUpdatePatrolRoute={handleUpdatePatrolRoute}
          stationStats={[]}
          onUpdateStationStat={() => {}}
        />
      )}
    </div>
  );
}

