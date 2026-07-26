/**
 * TRINETRA AI | Tactical Command Center Types
 * Karnataka State Police Datathon 2026
 */

export type Language = 'kn' | 'en';

export type NavSection = 
  | 'DASHBOARD'
  | 'HEATMAP'
  | 'PREDICTION'
  | 'PATROL'
  | 'CHATBOT'
  | 'REPORTS'
  | 'ALERTS'
  | 'CASES'
  | 'ACCUSED'
  | 'SETTINGS';

export interface NotificationAlert {
  id: string;
  title: string;
  description: string;
  category: 'CRITICAL' | 'HIGH' | 'GENERAL' | 'SYSTEM';
  location: string;
  timestamp: string;
  isRead: boolean;
  statusTag?: string;
}

export interface CrimeIncident {
  id: string;
  title: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  lat: number;
  lng: number;
  locationName: string;
  timestamp: string;
  firNumber: string;
  status: 'INVESTIGATING' | 'DISPATCHED' | 'SOLVED' | 'PENDING';
  cctvAvailable: boolean;
  cctvVideoUrl?: string;
  flaggedVehicle?: string;
  suspectId?: string;
  descriptionKn: string;
  descriptionEn: string;
}

export interface PatrolCheckpoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  unitCode: string;
  status: 'PATROLLING' | 'DISPATCHED' | 'STATIONARY';
  etaMinutes: number;
}

export interface PatrolRoute {
  unitId: string;
  unitName: string;
  vehicleType: string;
  status: string;
  color: string;
  waypoints: [number, number][];
  checkpoints: PatrolCheckpoint[];
  coveragePercent: number;
  totalKm: number;
}

export interface CCTVFeed {
  id: string;
  cameraName: string;
  location: string;
  lat: number;
  lng: number;
  status: 'LIVE' | 'OFFLINE';
  detectedObjects: {
    label: string;
    confidence: number;
    box: [number, number, number, number]; // [x, y, w, h] in %
    color: string;
  }[];
  streamType: 'simulated_video' | 'synthetic_feed';
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'LEADER' | 'OPERATIVE' | 'MULE_ACCOUNT' | 'UPI_GATEWAY' | 'CRYPTO_WALLET' | 'FENCE';
  cctnsId: string;
  riskScore: number;
  aliases: string[];
  bankDetails?: string;
  upiId?: string;
  activeWarrants: number;
  prioriConvictions: number;
  jurisdiction: string;
  status: 'ACTIVE' | 'SURVEILLANCE' | 'IN_CUSTODY' | 'WANTED';
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'OFFENDER_LINK' | 'FINANCIAL_TRAIL';
  labelKn: string;
  labelEn: string;
  amountINR?: number;
  frequency?: string;
  riskWeight: number; // 1 to 5
}

export interface StationFIRStat {
  stationId: string;
  stationName: string;
  district: string;
  totalFIRs: number;
  avgRegistrationDelayHours: number;
  pendingInvestigations: number;
  anomalyFlagged: boolean;
  anomalySeverity?: 'HIGH' | 'MEDIUM' | 'NONE';
  anomalyReasonKn?: string;
  anomalyReasonEn?: string;
  weeklyTrend: { day: string; firCount: number; delayHours: number }[];
}

export interface OSINTProfile {
  query: string;
  queryType: 'PHONE' | 'VEHICLE' | 'UPI' | 'AADHAAR_HASH' | 'FIR';
  matchedSuspect?: {
    cctnsId: string;
    aliasName: string;
    riskScore: number;
    flaggedReason: string;
    associatedPhone: string;
    associatedVehicle: string;
    associatedUPI: string;
    bankName: string;
    activeWarrants: number;
    lastKnownLocation: string;
    jurisdictionStation: string;
    status: string;
  };
  cyberCrimePortalRecords: {
    complaintId: string;
    date: string;
    amountLoss: number;
    category: string;
  }[];
  rtoRecord?: {
    vehicleNo: string;
    ownerName: string;
    model: string;
    rtoOffice: string;
    chassisHash: string;
    status: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  textKn: string;
  textEn: string;
  timestamp: string;
  metrics?: {
    firsAnalyzed?: number;
    hotspotsIdentified?: number;
    patrolUnitsAssigned?: number;
    riskScore?: number;
  };
  category?: 'GENERAL' | 'FIR' | 'PATROL' | 'FINANCIAL' | 'OSINT';
}
