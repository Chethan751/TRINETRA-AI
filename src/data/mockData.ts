import { CrimeIncident, PatrolRoute, NetworkNode, NetworkEdge, StationFIRStat, OSINTProfile, ChatMessage } from '../types';

export const INITIAL_CRIME_INCIDENTS: CrimeIncident[] = [
  {
    id: 'INC-2026-001',
    title: 'Moped Theft Cluster',
    type: 'Vehicle Theft',
    severity: 'HIGH',
    lat: 12.9299,
    lng: 77.5826,
    locationName: 'Jayanagar 4th Block Market',
    timestamp: '2026-07-26 11:30 AM IST',
    firNumber: 'KA-JAY-2026-0412',
    status: 'DISPATCHED',
    cctvAvailable: true,
    cctvVideoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    flaggedVehicle: 'KA-01-MJ-8819',
    suspectId: 'OFFENDER-451',
    descriptionKn: 'ಜಯನಗರ 4ನೇ ಬ್ಲಾಕ್ ಮಾರುಕಟ್ಟೆ ಬಳಿ 5 ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳವು ವರದಿ. ಸಿಟಿಟಿವಿ ಪರಿಶೀಲನೆ ಸಕ್ರಿಯವಾಗಿದೆ.',
    descriptionEn: '5 Moped thefts reported near Jayanagar 4th Block Market. CCTV analysis triggered suspect KA-01-MJ-8819.'
  },
  {
    id: 'INC-2026-002',
    title: 'Burglary Hotspot Cluster',
    type: 'House Burglary',
    severity: 'CRITICAL',
    lat: 12.9784,
    lng: 77.6408,
    locationName: 'Indiranagar 100ft Road',
    timestamp: '2026-07-26 02:15 AM IST',
    firNumber: 'KA-IND-2026-0889',
    status: 'INVESTIGATING',
    cctvAvailable: true,
    flaggedVehicle: 'KA-03-HA-1102',
    suspectId: 'SUSPECT-112',
    descriptionKn: 'ಇಂದಿರಾನಗರ 100 ಫೀಟ್ ರಸ್ತೆಯ ಸಾಲು ಮಳಿಗೆಗಳಲ್ಲಿ ತಡರಾತ್ರಿ ಕನ್ನ ಕಳವು ಶಂಕೆ.',
    descriptionEn: 'Late night residential & commercial burglary attempts flagged on 100ft Road patrol radar.'
  },
  {
    id: 'INC-2026-003',
    title: 'Cyber Financial Scam Hub',
    type: 'Financial Fraud',
    severity: 'HIGH',
    lat: 12.9352,
    lng: 77.6245,
    locationName: 'Koramangala 5th Block',
    timestamp: '2026-07-26 10:05 AM IST',
    firNumber: 'KA-CYB-2026-1042',
    status: 'INVESTIGATING',
    cctvAvailable: false,
    suspectId: 'SUSPECT-112',
    descriptionKn: 'ಕೋರಮಂಗಲದಲ್ಲಿ ವಂಚನೆ UPI ಖಾತೆಗಳ ಮೂಲಕ ₹4.5 ಲಕ್ಷ ಸೈಬರ್ ವಂಚನೆ ಸುಲಿಗೆ.',
    descriptionEn: 'Mule bank account network routing ₹4.5 Lakhs through illicit UPI payment gateways.'
  },
  {
    id: 'INC-2026-004',
    title: 'Night Assault Hotspot',
    type: 'Physical Assault',
    severity: 'MEDIUM',
    lat: 12.9767,
    lng: 77.5713,
    locationName: 'Majestic Bus Stand Platform 6',
    timestamp: '2026-07-25 11:45 PM IST',
    firNumber: 'KA-MAJ-2026-0199',
    status: 'SOLVED',
    cctvAvailable: true,
    suspectId: 'SUSPECT-309',
    descriptionKn: 'ಮೆಜೆಸ್ಟಿಕ್ ಬಸ್ ನಿಲ್ದಾಣದಲ್ಲಿ ರಾತ್ರಿ ಗುಂಪು ಘರ್ಷಣೆ. ಹೊಯ್ಸಳ ಸಿಬ್ಬಂದಿಯಿಂದ ತಕ್ಷಣ ಬಂಧನ.',
    descriptionEn: 'Nighttime altercation at Majestic Platform 6. Patrol Unit Hoysala-08 dispatched and suspect detained.'
  },
  {
    id: 'INC-2026-005',
    title: 'Commercial Extortion Signal',
    type: 'Extortion',
    severity: 'HIGH',
    lat: 12.9698,
    lng: 77.7499,
    locationName: 'Whitefield IT Park Gate 2',
    timestamp: '2026-07-26 08:30 AM IST',
    firNumber: 'KA-WHI-2026-0511',
    status: 'DISPATCHED',
    cctvAvailable: true,
    descriptionKn: 'ವೈಟ್‌ಫೀಲ್ಡ್ ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆಗಳಿಗೆ ಬೆದರಿಕೆ ಕರೆ ಮತ್ತು ಹಣ ಸುಲಿಗೆ ಶಂಕೆ.',
    descriptionEn: 'Anonymous extortion calls targeting commercial establishments in Whitefield Tech Corridor.'
  },
  {
    id: 'INC-2026-006',
    title: 'Chain Snatching Risk Zone',
    type: 'Snatching',
    severity: 'MEDIUM',
    lat: 13.0358,
    lng: 77.5970,
    locationName: 'Hebbal Flyover Junction',
    timestamp: '2026-07-26 06:20 AM IST',
    firNumber: 'KA-HEB-2026-0301',
    status: 'PENDING',
    cctvAvailable: true,
    flaggedVehicle: 'KA-04-ER-9011',
    descriptionKn: 'ಹೆಬ್ಬಾಳ ಜಂಕ್ಷನ್ ಬಳಿ ಬೆಳಗಿನ ಜಾವ ಸರಗಳ್ಳತನ ಯತ್ನ. ಬೈಕ್ ಗುರುತಿಸಲಾಗಿದೆ.',
    descriptionEn: 'Early morning chain snatching attempt near Hebbal. Suspect bike KA-04-ER-9011 alerted.'
  }
];

export const HOYSALA_PATROL_ROUTES: PatrolRoute[] = [
  {
    unitId: 'HOYSALA-14',
    unitName: 'Hoysala Unit 14 (South Zone)',
    vehicleType: 'Innova Patrol Cruiser',
    status: 'ACTIVE PATROL',
    color: '#3b82f6', // Glowing blue
    waypoints: [
      [12.9250, 77.5780],
      [12.9299, 77.5826], // Jayanagar Market
      [12.9352, 77.6245], // Koramangala
      [12.9410, 77.6100],
      [12.9250, 77.5780]
    ],
    checkpoints: [
      { id: 'CP-1', name: 'Jayanagar 4th Block Checkpoint', lat: 12.9299, lng: 77.5826, unitCode: 'H-14', status: 'PATROLLING', etaMinutes: 2 },
      { id: 'CP-2', name: 'South End Circle Outpost', lat: 12.9380, lng: 77.5800, unitCode: 'H-14', status: 'STATIONARY', etaMinutes: 6 },
      { id: 'CP-3', name: 'Koramangala Sony World Signal', lat: 12.9352, lng: 77.6245, unitCode: 'H-14', status: 'PATROLLING', etaMinutes: 11 }
    ],
    coveragePercent: 94.2,
    totalKm: 18.4
  },
  {
    unitId: 'HOYSALA-08',
    unitName: 'Hoysala Unit 08 (East Zone)',
    vehicleType: 'Mahindra Scorpio Patrol',
    status: 'DISPATCHED TO INCIDENT',
    color: '#10b981', // Glowing emerald
    waypoints: [
      [12.9716, 77.5946],
      [12.9784, 77.6408], // Indiranagar
      [12.9698, 77.7499], // Whitefield
      [12.9716, 77.5946]
    ],
    checkpoints: [
      { id: 'CP-4', name: 'Indiranagar 100ft Rd Police Outpost', lat: 12.9784, lng: 77.6408, unitCode: 'H-08', status: 'DISPATCHED', etaMinutes: 3 },
      { id: 'CP-5', name: 'Marathahalli Bridge Junction', lat: 12.9560, lng: 77.7010, unitCode: 'H-08', status: 'PATROLLING', etaMinutes: 8 }
    ],
    coveragePercent: 88.5,
    totalKm: 24.1
  }
];

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: 'OFFENDER-451',
    name: 'Ramesh "Moped" Kumar',
    type: 'LEADER',
    cctnsId: 'CCTNS-KA-2022-881',
    riskScore: 94,
    aliases: ['Moped Ramesh', 'KA-G3 Kingpin'],
    activeWarrants: 3,
    prioriConvictions: 7,
    jurisdiction: 'Jayanagar Police Station',
    status: 'ACTIVE',
    bankDetails: 'HDFC Bank - A/C *****4819',
    upiId: 'ramesh451@okaxis',
    x: 250,
    y: 150
  },
  {
    id: 'SUSPECT-112',
    name: 'Suresh V. (Mule Account)',
    type: 'MULE_ACCOUNT',
    cctnsId: 'CCTNS-KA-2024-112',
    riskScore: 82,
    aliases: ['Suri Crypto', 'PayTM Mule 9'],
    activeWarrants: 1,
    prioriConvictions: 2,
    jurisdiction: 'Koramangala Cyber Crime Station',
    status: 'SURVEILLANCE',
    bankDetails: 'SBI - A/C *****9910',
    upiId: 'suspect112@ybl',
    x: 480,
    y: 120
  },
  {
    id: 'SUSPECT-309',
    name: 'Vikram "Fence" Gowda',
    type: 'FENCE',
    cctnsId: 'CCTNS-KA-2023-309',
    riskScore: 78,
    aliases: ['Vicky Scrap', 'Shivajinagar Market Dealer'],
    activeWarrants: 2,
    prioriConvictions: 4,
    jurisdiction: 'Shivajinagar Police Station',
    status: 'WANTED',
    x: 180,
    y: 320
  },
  {
    id: 'ACCOUNT-8842',
    name: 'FinGateway Shell Pvt Ltd',
    type: 'UPI_GATEWAY',
    cctnsId: 'CCTNS-CYB-FIN-88',
    riskScore: 91,
    aliases: ['FinPay Gateway', 'FastTransfer Node'],
    activeWarrants: 0,
    prioriConvictions: 0,
    jurisdiction: 'Bengaluru Cyber Command',
    status: 'ACTIVE',
    bankDetails: 'Axis Bank - A/C *****8842',
    upiId: 'fingateway@ybl',
    x: 620,
    y: 260
  },
  {
    id: 'ACCOUNT-9910',
    name: 'Offshore Crypto Relay',
    type: 'CRYPTO_WALLET',
    cctnsId: 'CCTNS-CRYPTO-991',
    riskScore: 88,
    aliases: ['TRX-Wallet-0x88f', 'USDT Mule Relay'],
    activeWarrants: 0,
    prioriConvictions: 0,
    jurisdiction: 'CID Cyber Cell Karnataka',
    status: 'ACTIVE',
    x: 550,
    y: 400
  },
  {
    id: 'OPERATIVE-204',
    name: 'Anil "Rider" Shetty',
    type: 'OPERATIVE',
    cctnsId: 'CCTNS-KA-2025-204',
    riskScore: 65,
    aliases: ['Anil Rider', 'Pulsar Anil'],
    activeWarrants: 1,
    prioriConvictions: 1,
    jurisdiction: 'Indiranagar Police Station',
    status: 'SURVEILLANCE',
    x: 340,
    y: 280
  }
];

export const NETWORK_EDGES: NetworkEdge[] = [
  // Offender Linkages
  {
    id: 'E-1',
    source: 'OFFENDER-451',
    target: 'SUSPECT-309',
    type: 'OFFENDER_LINK',
    labelKn: 'ಕದ್ದ ವಾಹನ ವಿಲೇವಾರಿ ಲಿಂಕ್ (ಫೆನ್ಸ್ ಸಹಕಾರ)',
    labelEn: 'Stolen Vehicle Fencing Link',
    riskWeight: 5
  },
  {
    id: 'E-2',
    source: 'OFFENDER-451',
    target: 'OPERATIVE-204',
    type: 'OFFENDER_LINK',
    labelKn: 'ಮುಖ್ಯ ಸಹಚರ ಮತ್ತು ರೈಡರ್',
    labelEn: 'Primary Crime Co-Conspirator & Rider',
    riskWeight: 4
  },
  {
    id: 'E-3',
    source: 'OFFENDER-451',
    target: 'SUSPECT-112',
    type: 'OFFENDER_LINK',
    labelKn: 'ವಂಚನೆ ಮುಖಾಂತರ ಆರ್ಥಿಕ ಪಾಲುದಾರಿಕೆ',
    labelEn: 'Financial Extortion Mule Conduit',
    riskWeight: 4
  },
  // Financial Trail
  {
    id: 'E-4',
    source: 'SUSPECT-112',
    target: 'ACCOUNT-8842',
    type: 'FINANCIAL_TRAIL',
    labelKn: 'UPI ವರ್ಗಾವಣೆ',
    labelEn: 'Daily UPI Cashout',
    amountINR: 450000,
    frequency: 'Weekly Aggregate',
    riskWeight: 5
  },
  {
    id: 'E-5',
    source: 'ACCOUNT-8842',
    target: 'ACCOUNT-9910',
    type: 'FINANCIAL_TRAIL',
    labelKn: 'ಕ್ರಿಪ್ಟೋ ಪರಿವರ್ತನೆ ವರ್ಗಾವಣೆ',
    labelEn: 'Crypto Wallet Conversion',
    amountINR: 1200000,
    frequency: 'Intermittent Rapid Wash',
    riskWeight: 5
  },
  {
    id: 'E-6',
    source: 'SUSPECT-309',
    target: 'SUSPECT-112',
    type: 'FINANCIAL_TRAIL',
    labelKn: 'ನಗದು ಠೇವಣಿ',
    labelEn: 'Scrap Sale Cash Deposit',
    amountINR: 85000,
    frequency: 'Per Transaction',
    riskWeight: 3
  }
];

export const STATION_ANOMALY_STATS: StationFIRStat[] = [
  {
    stationId: 'STN-01',
    stationName: 'Jayanagar Police Station',
    district: 'Bengaluru South Zone',
    totalFIRs: 342,
    avgRegistrationDelayHours: 3.2,
    pendingInvestigations: 18,
    anomalyFlagged: false,
    anomalySeverity: 'NONE',
    weeklyTrend: [
      { day: 'Mon', firCount: 42, delayHours: 3.1 },
      { day: 'Tue', firCount: 38, delayHours: 2.8 },
      { day: 'Wed', firCount: 51, delayHours: 3.5 },
      { day: 'Thu', firCount: 48, delayHours: 3.0 },
      { day: 'Fri', firCount: 60, delayHours: 3.4 },
      { day: 'Sat', firCount: 55, delayHours: 3.8 },
      { day: 'Sun', firCount: 48, delayHours: 3.0 }
    ]
  },
  {
    stationId: 'STN-02',
    stationName: 'Indiranagar Police Station',
    district: 'Bengaluru East Zone',
    totalFIRs: 289,
    avgRegistrationDelayHours: 4.8,
    pendingInvestigations: 22,
    anomalyFlagged: false,
    anomalySeverity: 'NONE',
    weeklyTrend: [
      { day: 'Mon', firCount: 35, delayHours: 4.2 },
      { day: 'Tue', firCount: 30, delayHours: 4.5 },
      { day: 'Wed', firCount: 45, delayHours: 5.0 },
      { day: 'Thu', firCount: 40, delayHours: 4.6 },
      { day: 'Fri', firCount: 52, delayHours: 5.1 },
      { day: 'Sat', firCount: 48, delayHours: 4.9 },
      { day: 'Sun', firCount: 39, delayHours: 4.7 }
    ]
  },
  {
    stationId: 'STN-03',
    stationName: 'Koramangala Cyber Station',
    district: 'Bengaluru Cyber Command',
    totalFIRs: 512,
    avgRegistrationDelayHours: 8.5,
    pendingInvestigations: 64,
    anomalyFlagged: true,
    anomalySeverity: 'MEDIUM',
    anomalyReasonKn: 'ಆನ್‌ಲೈನ್ ಸೈಬರ್ ದೂರುಗಳ ದಾಖಲೆಯಲ್ಲಿ 8.5 ಗಂಟೆ ವಿಳಂಬ ಪ್ರವೃತ್ತಿ ಕಂಡುಬಂದಿದೆ.',
    anomalyReasonEn: 'High backlog in online 1930 Cyber Helpline intake causing 8.5h delay spike.',
    weeklyTrend: [
      { day: 'Mon', firCount: 65, delayHours: 7.2 },
      { day: 'Tue', firCount: 70, delayHours: 7.8 },
      { day: 'Wed', firCount: 88, delayHours: 9.1 },
      { day: 'Thu', firCount: 75, delayHours: 8.4 },
      { day: 'Fri', firCount: 95, delayHours: 9.6 },
      { day: 'Sat', firCount: 62, delayHours: 8.8 },
      { day: 'Sun', firCount: 57, delayHours: 8.1 }
    ]
  },
  {
    stationId: 'STN-04',
    stationName: 'Majestic Central Police Station',
    district: 'Bengaluru West Zone',
    totalFIRs: 680,
    avgRegistrationDelayHours: 38.4, // HIGH ANOMALY SPIKE!
    pendingInvestigations: 142,
    anomalyFlagged: true,
    anomalySeverity: 'HIGH',
    anomalyReasonKn: 'ಎಫ್‌ಐಆರ್ ದಾಖಲಾತಿ ವಿಳಂಬದ ತೀವ್ರ ಜಿಗಿತ (+38.4 ಗಂಟೆಗಳು). ಸಿಟಿಟಿಎನ್ಎಸ್ ತನಿಖೆ ಅಗತ್ಯವಿದೆ.',
    anomalyReasonEn: 'CRITICAL ANOMALY: Abnormal 38.4 hour FIR registration delay spike detected by IsolationForest audit model.',
    weeklyTrend: [
      { day: 'Mon', firCount: 85, delayHours: 12.0 },
      { day: 'Tue', firCount: 92, delayHours: 18.5 },
      { day: 'Wed', firCount: 110, delayHours: 32.1 },
      { day: 'Thu', firCount: 125, delayHours: 45.8 },
      { day: 'Fri', firCount: 140, delayHours: 52.4 },
      { day: 'Sat', firCount: 80, delayHours: 48.0 },
      { day: 'Sun', firCount: 48, delayHours: 38.4 }
    ]
  },
  {
    stationId: 'STN-05',
    stationName: 'Whitefield IT Corridor Station',
    district: 'Bengaluru East Zone',
    totalFIRs: 210,
    avgRegistrationDelayHours: 2.9,
    pendingInvestigations: 12,
    anomalyFlagged: false,
    anomalySeverity: 'NONE',
    weeklyTrend: [
      { day: 'Mon', firCount: 28, delayHours: 2.8 },
      { day: 'Tue', firCount: 25, delayHours: 2.5 },
      { day: 'Wed', firCount: 34, delayHours: 3.1 },
      { day: 'Thu', firCount: 32, delayHours: 2.9 },
      { day: 'Fri', firCount: 38, delayHours: 3.2 },
      { day: 'Sat', firCount: 30, delayHours: 3.0 },
      { day: 'Sun', firCount: 23, delayHours: 2.7 }
    ]
  }
];

export const OSINT_SAMPLE_PROFILES: Record<string, OSINTProfile> = {
  'KA-01-MJ-8819': {
    query: 'KA-01-MJ-8819',
    queryType: 'VEHICLE',
    matchedSuspect: {
      cctnsId: 'CCTNS-KA-2022-881',
      aliasName: 'Ramesh "Moped" Kumar',
      riskScore: 94,
      flaggedReason: 'Stolen vehicle matched on ANPR CCTV Camera JAY-04',
      associatedPhone: '+91 98765 43210',
      associatedVehicle: 'KA-01-MJ-8819 (TVS Jupiter Grey)',
      associatedUPI: 'ramesh451@okaxis',
      bankName: 'HDFC Bank Jayanagar',
      activeWarrants: 3,
      lastKnownLocation: 'Jayanagar 4th Block Signal, Bengaluru',
      jurisdictionStation: 'Jayanagar Police Station',
      status: 'HOTLISTED - IMMEDIATE INTERCEPT'
    },
    cyberCrimePortalRecords: [
      { complaintId: 'CYB-1930-8841', date: '2026-07-10', amountLoss: 45000, category: 'Vehicle Theft Scam' }
    ],
    rtoRecord: {
      vehicleNo: 'KA-01-MJ-8819',
      ownerName: 'Sunil Kumar (Reported Stolen)',
      model: 'TVS Jupiter 125',
      rtoOffice: 'KA-01 Bengaluru Central',
      chassisHash: 'ME4JC581029481920',
      status: 'FLAGGED STOLEN IN CCTNS'
    }
  },
  '+919876543210': {
    query: '+919876543210',
    queryType: 'PHONE',
    matchedSuspect: {
      cctnsId: 'CCTNS-KA-2024-112',
      aliasName: 'Suresh V. (Mule Account Holder)',
      riskScore: 82,
      flaggedReason: 'Linked to 14 cyber fraud complaints on 1930 Helpline',
      associatedPhone: '+91 98765 43210',
      associatedVehicle: 'KA-03-HA-1102',
      associatedUPI: 'suspect112@ybl',
      bankName: 'State Bank of India Koramangala',
      activeWarrants: 1,
      lastKnownLocation: 'Koramangala 5th Block, Bengaluru',
      jurisdictionStation: 'Koramangala Cyber Crime Station',
      status: 'UNDER ACTIVE SURVEILLANCE'
    },
    cyberCrimePortalRecords: [
      { complaintId: 'CYB-1930-9901', date: '2026-07-22', amountLoss: 120000, category: 'Investment Scam' },
      { complaintId: 'CYB-1930-9945', date: '2026-07-18', amountLoss: 330000, category: 'Part-Time Job Fraud' }
    ]
  },
  'suspect112@ybl': {
    query: 'suspect112@ybl',
    queryType: 'UPI',
    matchedSuspect: {
      cctnsId: 'CCTNS-KA-2024-112',
      aliasName: 'Suresh V. (Mule Gateway)',
      riskScore: 82,
      flaggedReason: 'Mule VPA routing illicit cyber proceeds',
      associatedPhone: '+91 98765 43210',
      associatedVehicle: 'KA-03-HA-1102',
      associatedUPI: 'suspect112@ybl',
      bankName: 'Yes Bank VPA Gateway',
      activeWarrants: 1,
      lastKnownLocation: 'Koramangala 5th Block',
      jurisdictionStation: 'Koramangala Cyber Station',
      status: 'ACCOUNT FROZEN BY CYBER CELL'
    },
    cyberCrimePortalRecords: [
      { complaintId: 'CYB-1930-7712', date: '2026-07-25', amountLoss: 450000, category: 'Task Fraud UPI' }
    ]
  }
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    textKn: 'ಜಯನಗರದಲ್ಲಿ ಇತ್ತೀಚಿನ ಅಪರಾಧಗಳ ಮಾಹಿತಿ ಕೊಡಿ',
    textEn: 'Give info on recent crimes in Jayanagar',
    timestamp: '11:32 AM',
    category: 'FIR'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    textKn: 'ಜಯನಗರ ವಲಯವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ. 12 ಇತ್ತೀಚಿನ ಎಫ್‌ಐಆರ್‌ಗಳು: 5 ಕ್ಷುಲ್ಲಕ ಕಳವು, 3 ಮನೆಗಳ್ಳತನ, 4 ಹಲ್ಲೆ ಪ್ರಕರಣಗಳು. ನಕ್ಷೆಯನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ ಹಾಗೂ ಹೊಯ್ಸಳ 14 ಟ್ರ್ಯಾಕ್ ನಿಯೋಜಿಸಲಾಗಿದೆ.',
    textEn: 'Analyzing Jayanagar. 12 recent FIRs: 5 Petty Theft, 3 Burglary, 4 Assault. Map updated with high-risk hotspots and Hoysala Patrol Route 14 dispatched.',
    timestamp: '11:32 AM',
    metrics: {
      firsAnalyzed: 12,
      hotspotsIdentified: 3,
      patrolUnitsAssigned: 1,
      riskScore: 78
    },
    category: 'FIR'
  }
];
