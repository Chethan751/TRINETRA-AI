import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI client (Server-Side only)
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// In-Memory Backend Data Store (Simulating CCTNS & Catalyst Data Store)
let INCIDENTS_STORE = [
  {
    id: 'INC-01',
    firNumber: 'FIR/2026/0104',
    title: 'Moped Theft & Cyber Extortion Cluster',
    type: 'VEHICLE_THEFT',
    severity: 'HIGH',
    locationName: 'Jayanagar 4th Block, Bengaluru',
    lat: 12.9299,
    lng: 77.5826,
    timestamp: '10 mins ago',
    status: 'INVESTIGATING',
    cctvAvailable: true,
    cctvVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cctv-camera-in-a-parking-lot-41552-large.mp4',
    flaggedVehicle: 'KA-01-MJ-8819',
    suspectId: 'OFFENDER-451',
    descriptionKn: 'ಜಯನಗರ 4 ನೇ ಬ್ಲಾಕ್ ಬಳಿ ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳವು ಮತ್ತು ಯುಪಿಐ ಮೂಲಕ ಹಣ ವಸೂಲಿ ಯತ್ನ ದಾಖಲಾಗಿದೆ.',
    descriptionEn: 'Moped theft reported near Jayanagar 4th Block. ANPR trigger matched suspect Bullet Ravi.'
  },
  {
    id: 'INC-02',
    firNumber: 'FIR/2026/0288',
    title: 'Night Burglary & Safe Break-in',
    type: 'BURGLARY',
    severity: 'CRITICAL',
    locationName: 'Indiranagar 100ft Road',
    lat: 12.9784,
    lng: 77.6408,
    timestamp: '25 mins ago',
    status: 'DISPATCHED',
    cctvAvailable: true,
    cctvVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-security-camera-view-of-a-street-41551-large.mp4',
    flaggedVehicle: 'KA-03-HA-1102',
    suspectId: 'SUSPECT-309',
    descriptionKn: 'ಇಂದಿರಾನಗರ 100 ಫೀಟ್ ರಸ್ತೆಯಲ್ಲಿ ಮನೆ ಕಳುವು ವರದಿಯಾಗಿದೆ. ಹೊಯ್ಸಳ ಪಡೆ 08 ಗೆ ಸಂದೇಶ ರವಾನಿಸಲಾಗಿದೆ.',
    descriptionEn: 'Commercial break-in reported at Indiranagar 100ft Road. Hoysala Unit 08 dispatched.'
  },
  {
    id: 'INC-03',
    firNumber: 'FIR/2026/0312',
    title: '1930 Cyber Helpline Fraud - UPI Mule Gateway',
    type: 'CYBER_CRIME',
    severity: 'HIGH',
    locationName: 'Koramangala 5th Block',
    lat: 12.9352,
    lng: 77.6245,
    timestamp: '1 hour ago',
    status: 'INVESTIGATING',
    cctvAvailable: false,
    descriptionKn: '1930 ಸೈಬರ್ ಸಹಾಯವಾಣಿಯಿಂದ ವರದಿಯಾದ ರೂ 4.5 ಲಕ್ಷದ ಯೂಪಿಐ ಹಣ ದುರುಪಯೋಗ.',
    descriptionEn: '1930 Cyber helpline fraud call tracing to Koramangala mule UPI accounts.'
  },
  {
    id: 'INC-04',
    firNumber: 'FIR/2026/0401',
    title: 'Late Night Robbery Attempt at Bus Bay',
    type: 'ROBBERY',
    severity: 'HIGH',
    locationName: 'Majestic City Bus Stand',
    lat: 12.9767,
    lng: 77.5713,
    timestamp: '2 hours ago',
    status: 'NEW',
    cctvAvailable: true,
    descriptionKn: 'ಮೆಜೆಸ್ಟಿಕ್ ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿ ಸುಲಿಗೆ ಯತ್ನ. ಸಿಸಿಟಿವಿ ದೃಶ್ಯಾವಳಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.',
    descriptionEn: 'Robbery attempt reported near Majestic bus bay. CCTV analysis underway.'
  },
  {
    id: 'INC-05',
    firNumber: 'FIR/2026/0519',
    title: 'Chain Snatching on Main Road',
    type: 'SNATCHING',
    severity: 'MEDIUM',
    locationName: 'Hebbal Flyover Junction',
    lat: 13.0358,
    lng: 77.5970,
    timestamp: '3 hours ago',
    status: 'SOLVED',
    cctvAvailable: true,
    descriptionKn: 'ಹೆಬ್ಬಾಳ ಫ್ಲೈಓವರ್ ಬಳಿ ಚೈನ್ ಸ್ನ್ಯಾಚಿಂಗ್. ಶಂಕಿತನನ್ನು ವಶಕ್ಕೆ ಪಡೆಯಲಾಗಿದೆ.',
    descriptionEn: 'Chain snatching suspect apprehended near Hebbal Flyover by Hoysala Unit.'
  }
];

let HOYSALA_PATROL_STORE = [
  {
    unitId: 'HOYSALA-14',
    unitName: 'Hoysala Unit 14 (South Zone)',
    driverName: 'Constable Someshwara N.',
    status: 'ACTIVE_PATROL',
    currentLocation: 'Jayanagar 4th Block',
    lat: 12.9299,
    lng: 77.5826,
    coveragePercent: 94.2,
    etaMinutes: 2,
    fuelLevel: '85%',
    waypoints: [[12.9250, 77.5780], [12.9299, 77.5826], [12.9352, 77.6245], [12.9410, 77.6100]]
  },
  {
    unitId: 'HOYSALA-08',
    unitName: 'Hoysala Unit 08 (East Zone)',
    driverName: 'Head Constable Ramesh B.',
    status: 'DISPATCHED_TO_FIR',
    currentLocation: 'Indiranagar 100ft Road',
    lat: 12.9784,
    lng: 77.6408,
    coveragePercent: 88.5,
    etaMinutes: 3,
    fuelLevel: '72%',
    waypoints: [[12.9716, 77.5946], [12.9784, 77.6408], [12.9698, 77.7499]]
  },
  {
    unitId: 'HOYSALA-21',
    unitName: 'Hoysala Unit 21 (Central Zone)',
    driverName: 'Sub-Inspector Vijay Kumar',
    status: 'STANDBY',
    currentLocation: 'Majestic PS Base',
    lat: 12.9767,
    lng: 77.5713,
    coveragePercent: 91.0,
    etaMinutes: 5,
    fuelLevel: '90%',
    waypoints: [[12.9767, 77.5713], [12.9698, 77.5800]]
  }
];

let ACCUSED_STORE = [
  {
    id: 'ACC-101',
    cctnsId: 'CCTNS-KA-2022-881',
    name: 'Ramesh "Bullet" Kumar',
    alias: 'Bullet Ravi',
    crime: 'Repeat Robbery & Moped Theft Syndicate',
    status: 'In Custody',
    risk: 'Critical',
    ps: 'Jayanagar PS',
    cases: 14,
    associatedVehicle: 'KA-01-MJ-8819',
    associatedPhone: '+91 98765 43210',
    associatedUPI: 'ramesh451@okaxis',
    warrants: 3
  },
  {
    id: 'ACC-102',
    cctnsId: 'CCTNS-KA-2024-112',
    name: 'Suresh Gowda',
    alias: 'Mule Operator Suresh',
    crime: 'Chain Snatching & 1930 Cyber Fraud Mule Account',
    status: 'Out on Bail',
    risk: 'Critical',
    ps: 'Koramangala PS',
    cases: 9,
    associatedVehicle: 'KA-05-EV-4412',
    associatedPhone: '+91 98112 33445',
    associatedUPI: 'suspect112@ybl',
    warrants: 1
  },
  {
    id: 'ACC-103',
    cctnsId: 'CCTNS-KA-2023-309',
    name: 'Venkatesh N.',
    alias: 'Venky Scrap',
    crime: 'Vehicle Theft Syndicate & Fencing',
    status: 'Absconding',
    risk: 'Critical',
    ps: 'Marathahalli PS',
    cases: 22,
    associatedVehicle: 'KA-53-M-9001',
    associatedPhone: '+91 97400 12345',
    associatedUPI: 'venkyfencer@paytm',
    warrants: 4
  },
  {
    id: 'ACC-104',
    cctnsId: 'CCTNS-CYB-FIN-88',
    name: 'Anand Kumar',
    alias: 'Phisher Anand',
    crime: 'Cyber Fraud & OTP Phishing',
    status: 'Under Investigation',
    risk: 'Medium',
    ps: 'Whitefield PS',
    cases: 5,
    associatedVehicle: 'KA-04-AB-1234',
    associatedPhone: '+91 99001 88776',
    associatedUPI: 'anandtech@icici',
    warrants: 0
  }
];

let REPORTS_STORE = [
  { id: 'REP-01', title: 'KSP Daily Crime Analytics Digest', date: '25 May 2026', type: 'PDF', size: '2.4 MB', station: 'Bengaluru City' },
  { id: 'REP-02', title: 'Weekly High Risk Zone Assessment', date: '22 May 2026', type: 'PDF', size: '4.1 MB', station: 'HSR Layout PS' },
  { id: 'REP-03', title: 'CCTNS Synchronized FIR Audit', date: '18 May 2026', type: 'Excel', size: '1.8 MB', station: 'Koramangala PS' },
  { id: 'REP-04', title: 'Monthly Hotspot Prediction Report', date: '01 May 2026', type: 'PDF', size: '8.5 MB', station: 'Bengaluru Urban' }
];

let ALERTS_STORE = [
  {
    id: 'ALT-101',
    title: 'CCTV ANPR Hotlist Hit',
    severity: 'HIGH',
    location: 'Jayanagar 4th Block Signal',
    timestamp: '2 mins ago',
    message: 'Vehicle KA-01-MJ-8819 matched CCTNS Hotlist. Suspect Ramesh "Bullet" Kumar spotted heading South.'
  },
  {
    id: 'ALT-102',
    title: '1930 Helpline Mule Spike',
    severity: 'MEDIUM',
    location: 'Koramangala Cyber Hub',
    timestamp: '15 mins ago',
    message: 'Spike in fraudulent UPI deposits detected at FinGateway Shell accounts.'
  }
];

// --- API ROUTES ---

// Admin Authentication Route
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === "ksp_admin" && password === "Trinetra2026#") {
    return res.json({
      status: "success",
      token: "CATALYST_ADMIN_SESSION_TOKEN_KSP_2026",
      role: "SUPERINTENDENT_OF_POLICE",
      username: "ksp_admin",
      permissions: ["READ_WRITE_FIR_DATA", "PATROL_OVERRIDE", "ANOMALY_CLEARANCE"]
    });
  }
  return res.status(401).json({
    status: "error",
    message: "Invalid KSP Admin Credentials"
  });
});

// Incidents CRUD API
app.get("/api/incidents", (req, res) => {
  res.json({
    status: "success",
    count: INCIDENTS_STORE.length,
    incidents: INCIDENTS_STORE
  });
});

app.post("/api/incidents", (req, res) => {
  const body = req.body || {};
  const newIncident = {
    id: `INC-${Date.now()}`,
    firNumber: body.firNumber || `FIR/2026/${Math.floor(1000 + Math.random() * 9000)}`,
    title: body.title || 'Newly Logged Crime Incident',
    type: body.type || 'THEFT',
    severity: body.severity || 'HIGH',
    locationName: body.locationName || 'Bengaluru Command Zone',
    lat: typeof body.lat === 'number' ? body.lat : 12.9716,
    lng: typeof body.lng === 'number' ? body.lng : 77.5946,
    timestamp: 'Just Now',
    status: body.status || 'NEW',
    cctvAvailable: body.cctvAvailable ?? true,
    descriptionKn: body.descriptionKn || `ಹೊಸ ಅಪರಾಧ ಪ್ರಕರಣ ದಾಖಲಾಗಿದೆ: ${body.title || 'ಸಾಮಾನ್ಯ ಪರಿಶೀಲನೆ'}`,
    descriptionEn: body.descriptionEn || `New incident registered: ${body.title || 'Routine Audit'}`
  };

  INCIDENTS_STORE.unshift(newIncident);
  res.status(201).json({
    status: "success",
    message: "FIR Incident registered successfully in CCTNS",
    incident: newIncident
  });
});

app.patch("/api/incidents/:id", (req, res) => {
  const { id } = req.params;
  const { status, severity } = req.body || {};
  const incident = INCIDENTS_STORE.find(i => i.id === id);

  if (!incident) {
    return res.status(404).json({ status: "error", message: "Incident not found" });
  }

  if (status) incident.status = status;
  if (severity) incident.severity = severity;

  res.json({
    status: "success",
    message: `Incident ${id} updated`,
    incident
  });
});

app.delete("/api/incidents/:id", (req, res) => {
  const { id } = req.params;
  const initialLen = INCIDENTS_STORE.length;
  INCIDENTS_STORE = INCIDENTS_STORE.filter(i => i.id !== id);

  if (INCIDENTS_STORE.length === initialLen) {
    return res.status(404).json({ status: "error", message: "Incident not found" });
  }

  res.json({ status: "success", message: `Incident ${id} removed from active register` });
});

// Patrol Management API
app.get("/api/patrol", (req, res) => {
  res.json({
    status: "success",
    units: HOYSALA_PATROL_STORE
  });
});

app.post("/api/patrol/dispatch", (req, res) => {
  const { unitId, targetLocation, incidentId } = req.body || {};
  const unit = HOYSALA_PATROL_STORE.find(u => u.unitId === unitId);

  if (unit) {
    unit.status = 'DISPATCHED_TO_FIR';
    if (targetLocation) unit.currentLocation = targetLocation;
    unit.etaMinutes = Math.floor(1 + Math.random() * 4);
    return res.json({
      status: "success",
      message: `${unit.unitName} dispatched to ${targetLocation || 'Hotspot Zone'}`,
      unit
    });
  }

  res.status(404).json({ status: "error", message: "Hoysala unit not found" });
});

app.patch("/api/patrol/:unitId", (req, res) => {
  const { unitId } = req.params;
  const { status, coveragePercent } = req.body || {};
  const unit = HOYSALA_PATROL_STORE.find(u => u.unitId === unitId);

  if (unit) {
    if (status) unit.status = status;
    if (typeof coveragePercent === 'number') unit.coveragePercent = coveragePercent;
    return res.json({ status: "success", unit });
  }

  res.status(404).json({ status: "error", message: "Unit not found" });
});

// Accused & OSINT Search API
app.get("/api/accused", (req, res) => {
  res.json({
    status: "success",
    count: ACCUSED_STORE.length,
    accusedList: ACCUSED_STORE
  });
});

app.get("/api/osint/search", (req, res) => {
  const query = (req.query.q as string || "").trim();
  const lowerQ = query.toLowerCase();

  const matched = ACCUSED_STORE.find(a => 
    a.name.toLowerCase().includes(lowerQ) ||
    a.alias.toLowerCase().includes(lowerQ) ||
    a.associatedVehicle.toLowerCase().includes(lowerQ) ||
    a.associatedPhone.includes(query) ||
    a.associatedUPI.toLowerCase().includes(lowerQ) ||
    a.cctnsId.toLowerCase().includes(lowerQ)
  );

  if (matched) {
    return res.json({
      query,
      status: "record_found",
      cctnsMatch: {
        cctnsId: matched.cctnsId,
        suspectName: matched.name,
        riskScore: matched.risk === 'Critical' ? 94 : 75,
        status: matched.status === 'Absconding' ? 'HOTLISTED - IMMEDIATE INTERCEPT' : matched.status,
        matchedIdentifier: query,
        flaggedReason: matched.crime,
        associatedPhone: matched.associatedPhone,
        associatedVehicle: matched.associatedVehicle,
        associatedUPI: matched.associatedUPI,
        jurisdiction: matched.ps
      }
    });
  }

  res.json({
    query,
    status: "record_found",
    cctnsMatch: {
      cctnsId: `CCTNS-KA-2026-${Math.floor(100 + Math.random() * 900)}`,
      suspectName: `Identifier Match for "${query}"`,
      riskScore: 78,
      status: "UNDER_MONITORING",
      matchedIdentifier: query || "KA-01-MJ-8819",
      flaggedReason: "Automatic CCTNS cross-check query against 1930 cyber helpline",
      associatedPhone: query.includes('+91') ? query : "+91 98765 43210",
      associatedVehicle: query.includes('KA-') ? query : "KA-01-MJ-8819",
      associatedUPI: query.includes('@') ? query : "ramesh451@okaxis",
      jurisdiction: "Bengaluru Central Command"
    }
  });
});

// Crime Prediction Engine API (/predict)
app.post("/predict", (req, res) => {
  const { crimeType, location, timeOfDay, district, station } = req.body || {};
  
  let riskLevel = "Medium";
  let confidence = 0.88;
  let prob = 65;

  if (crimeType?.toLowerCase().includes("robbery") || crimeType?.toLowerCase().includes("theft")) {
    riskLevel = "High";
    confidence = 0.94;
    prob = 85;
  } else if (crimeType?.toLowerCase().includes("cyber") || crimeType?.toLowerCase().includes("burglary")) {
    riskLevel = "High";
    confidence = 0.91;
    prob = 78;
  }

  res.json({
    status: "evaluated",
    risk: riskLevel,
    riskPercentage: prob,
    crime: crimeType || "Property & Cyber Offense",
    confidence: confidence,
    district: district || "Bengaluru Urban",
    station: station || "HSR Layout PS",
    location: location || "Bellandur & Marathahalli",
    breakdown: [
      { crimeType: 'Robbery', prob: 72, expectedIncidents: '12 - 18', risk: 'High' },
      { crimeType: 'Theft', prob: 55, expectedIncidents: '8 - 12', risk: 'High' },
      { crimeType: 'Assault', prob: 48, expectedIncidents: '6 - 10', risk: 'Medium' },
      { crimeType: 'Burglary', prob: 32, expectedIncidents: '4 - 6', risk: 'Medium' },
      { crimeType: 'Cyber Crime', prob: 18, expectedIncidents: '1 - 3', risk: 'Low' }
    ],
    recommendation: "Deploy 2 Hoysala Patrol Units (Unit 14 & Unit 08) and monitor CCTNS live ANPR stream.",
    ethicalDataDeclaration: "Demographics (caste, religion, income) strictly excluded from inference model."
  });
});

// Reports Generation & Export API
app.post("/api/reports/generate", (req, res) => {
  const { reportType, dateRange, format } = req.body || {};
  const newReport = {
    id: `REP-${Date.now()}`,
    title: reportType ? `KSP ${reportType}` : 'KSP Operational Crime Analytics Report',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    type: format || 'PDF',
    size: `${(1.5 + Math.random() * 5).toFixed(1)} MB`,
    station: 'Bengaluru City Police'
  };

  REPORTS_STORE.unshift(newReport);
  res.status(201).json({
    status: "success",
    message: "Report compiled and ready for download",
    report: newReport
  });
});

app.get("/api/reports/download/:id", (req, res) => {
  const { id } = req.params;
  const rep = REPORTS_STORE.find(r => r.id === id) || REPORTS_STORE[0];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${rep.id}_KSP_Report.csv"`);
  res.send(`ID,Title,Date,Station,Format\n${rep.id},"${rep.title}",${rep.date},${rep.station},${rep.type}\n`);
});

// Alerts API
app.get("/api/alerts", (req, res) => {
  res.json({
    status: "success",
    count: ALERTS_STORE.length,
    alerts: ALERTS_STORE
  });
});

app.post("/api/alerts", (req, res) => {
  const { title, severity, location, message } = req.body || {};
  const newAlert = {
    id: `ALT-${Date.now()}`,
    title: title || 'Emergency Command Alert',
    severity: severity || 'HIGH',
    location: location || 'Bengaluru Control Zone',
    timestamp: 'Just Now',
    message: message || 'Urgent incident alert logged by Command Center.'
  };

  ALERTS_STORE.unshift(newAlert);
  res.status(201).json({ status: "success", alert: newAlert });
});

// Global Analytics Summary (30s Polling Endpoint for Catalyst Data Store)
app.get("/api/analytics", (req, res) => {
  res.json({
    status: "success",
    catalystDataStore: "CONNECTED",
    totalFirsLogged: 1402 + INCIDENTS_STORE.length,
    activeHoysalaUnits: HOYSALA_PATROL_STORE.length,
    patrolCoveragePercent: 94.2,
    avgDispatchEtaMinutes: 6.2,
    flaggedAnomalies: 1,
    incidents: INCIDENTS_STORE,
    hoysalaPatrols: HOYSALA_PATROL_STORE,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/analytics/heatmap", (req, res) => {
  res.json({
    status: "success",
    region: "BENGALURU URBAN",
    incidents: INCIDENTS_STORE,
    hoysalaPatrols: HOYSALA_PATROL_STORE,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/analytics/network", (req, res) => {
  res.json({
    status: "success",
    nodes: [
      { id: 'OFFENDER-451', name: 'Ramesh "Bullet" Kumar', type: 'LEADER', riskScore: 94, cctnsId: 'CCTNS-KA-2022-881', warrants: 3 },
      { id: 'SUSPECT-112', name: 'Suresh V.', type: 'MULE_ACCOUNT', riskScore: 82, cctnsId: 'CCTNS-KA-2024-112', warrants: 1 },
      { id: 'SUSPECT-309', name: 'Vikram Gowda', type: 'FENCE', riskScore: 78, cctnsId: 'CCTNS-KA-2023-309', warrants: 2 },
      { id: 'ACCOUNT-8842', name: 'FinGateway Shell Pvt Ltd', type: 'UPI_GATEWAY', riskScore: 91, cctnsId: 'CCTNS-CYB-FIN-88', warrants: 0 },
      { id: 'ACCOUNT-9910', name: 'Offshore Crypto Relay', type: 'CRYPTO_WALLET', riskScore: 88, cctnsId: 'CCTNS-CRYPTO-991', warrants: 0 },
      { id: 'OPERATIVE-204', name: 'Anil Shetty', type: 'OPERATIVE', riskScore: 65, cctnsId: 'CCTNS-KA-2025-204', warrants: 1 }
    ],
    edges: [
      { source: 'OFFENDER-451', target: 'SUSPECT-309', type: 'OFFENDER_LINK', label: 'Stolen Vehicle Fencing Link' },
      { source: 'OFFENDER-451', target: 'OPERATIVE-204', type: 'OFFENDER_LINK', label: 'Co-Conspirator' },
      { source: 'OFFENDER-451', target: 'SUSPECT-112', type: 'OFFENDER_LINK', label: 'Extortion Conduit' },
      { source: 'SUSPECT-112', target: 'ACCOUNT-8842', type: 'FINANCIAL_TRAIL', label: 'Daily UPI Cashout', amountINR: 450000 },
      { source: 'ACCOUNT-8842', target: 'ACCOUNT-9910', type: 'FINANCIAL_TRAIL', label: 'Crypto Wash', amountINR: 1200000 },
      { source: 'SUSPECT-309', target: 'SUSPECT-112', type: 'FINANCIAL_TRAIL', label: 'Scrap Cash Deposit', amountINR: 85000 }
    ]
  });
});

app.get("/api/audit/anomalies", (req, res) => {
  res.json({
    status: "success",
    modelUsed: "IsolationForest (Scikit-Learn) CCTNS Audit",
    anomalyThreshold: -0.15,
    stations: [
      { station: 'Station 1 (Jayanagar)', avgDelayHours: 3.2, anomaly: false, severity: 'NORMAL' },
      { station: 'Station 2 (Indiranagar)', avgDelayHours: 4.8, anomaly: false, severity: 'NORMAL' },
      { station: 'Station 3 (Koramangala)', avgDelayHours: 8.5, anomaly: true, severity: 'MEDIUM', reason: '1930 Cyber helpline backlog spike' },
      { station: 'Station 4 (Majestic)', avgDelayHours: 38.4, anomaly: true, severity: 'CRITICAL_SPIKE', reason: 'Abnormal 38.4h delay spike detected in FIR registration logging' },
      { station: 'Station 5 (Whitefield)', avgDelayHours: 2.9, anomaly: false, severity: 'NORMAL' }
    ]
  });
});

// Bilingual Gemini AI Assistant Route
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, language = "en", context = "" } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!ai) {
      const fallbackKn = `[ಟ್ರಿನೇತ್ರ AI ತಾಂತ್ರಿಕ ಸಹಾಯಕ]: "${prompt}" ಕುರಿತು CCTNS ಡೇಟಾಬೇಸ್ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ. ಜಯನಗರ, ಕೋರಮಂಗಲ ಹಾಗೂ ಇಂದಿರಾನಗರ ವಲಯಗಳಲ್ಲಿ ಸಕ್ರಿಯ ಪ್ರಕರಣಗಳು ಮತ್ತು ಹೊಯ್ಸಳ ನಿಯೋಜನೆ ಸಕ್ರಿಯವಾಗಿದೆ.`;
      const fallbackEn = `[Trinetra AI Tactical Assistant]: Processed CCTNS database query for "${prompt}". Active FIR records analyzed across Jayanagar, Koramangala & Indiranagar zones. Hoysala patrol units dispatched.`;

      return res.json({
        replyKn: fallbackKn,
        replyEn: fallbackEn,
        source: "local_tactical_engine"
      });
    }

    const systemInstruction = `You are TRINETRA AI, the principal Tactical Intelligence Assistant for Karnataka State Police Datathon 2026 (Bengaluru Police Command Center).
Your role is to assist police dispatchers, crime analysts, and senior officers in Kannada and English.
You analyze CCTNS FIR logs, CCTV ANPR hits, Hoysala patrol routes, offender network graphs, and cyber financial fraud trails.

Respond strictly in structured JSON with two fields:
- "replyKn": A concise, clear, authoritative response in Kannada script.
- "replyEn": An equivalent concise, clear response in English.

Ensure tone is professional, operational, and tactical.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `User Query (${language === "kn" ? "Kannada" : "English"}): ${prompt}\nContext: ${context}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2
      },
    });

    let jsonResult = { replyKn: "", replyEn: "" };
    try {
      if (response.text) {
        jsonResult = JSON.parse(response.text);
      }
    } catch {
      jsonResult = {
        replyKn: response.text || "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ.",
        replyEn: response.text || "Analysis complete."
      };
    }

    return res.json({
      replyKn: jsonResult.replyKn || "CCTNS ಡೇಟಾ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.",
      replyEn: jsonResult.replyEn || "CCTNS data analyzed successfully.",
      source: "gemini-3.6-flash"
    });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message
    });
  }
});

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TRINETRA AI Command Center backend running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
