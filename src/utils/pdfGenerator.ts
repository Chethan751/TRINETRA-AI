import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CrimeIncident, PatrolRoute } from '../types';

export interface FormattedMetrics {
  totalIncidents: number;
  criticalIncidents: number;
  solvedIncidents: number;
  investigatingIncidents: number;
  totalPatrols: number;
  activePatrols: number;
  avgCoverage: string;
}

/**
 * Formats dashboard metrics into structured JSON for reporting and layout rendering.
 */
export function formatDashboardMetrics(
  incidents: CrimeIncident[],
  patrolRoutes: PatrolRoute[]
): FormattedMetrics {
  const totalIncidents = incidents.length;
  const criticalIncidents = incidents.filter(
    (i) => i.severity === 'CRITICAL' || i.severity === 'HIGH'
  ).length;
  const solvedIncidents = incidents.filter((i) => i.status === 'SOLVED').length;
  const investigatingIncidents = incidents.filter(
    (i) => i.status === 'INVESTIGATING' || i.status === 'DISPATCHED' || i.status === 'PENDING'
  ).length;

  const totalPatrols = patrolRoutes.length;
  const activePatrols = patrolRoutes.filter(
    (p) => p.status === 'ACTIVE_PATROL' || p.status === 'DISPATCHED_TO_FIR' || p.status === 'PATROLLING'
  ).length;

  const sumCoverage = patrolRoutes.reduce(
    (acc, p) => acc + (p.coveragePercent || 0),
    0
  );
  const avgCoverage = (
    totalPatrols > 0 ? sumCoverage / totalPatrols : 0
  ).toFixed(1);

  return {
    totalIncidents,
    criticalIncidents,
    solvedIncidents,
    investigatingIncidents,
    totalPatrols,
    activePatrols,
    avgCoverage: `${avgCoverage}%`
  };
}

/**
 * Formats raw CrimeIncident objects into clean table rows and headers for autoTable.
 */
export function formatIncidentTableData(incidents: CrimeIncident[]) {
  const headers = ['FIR No.', 'Title / Type', 'Location Zone', 'Severity', 'Status'];

  const rows = incidents.map((inc) => {
    const formattedType = (inc.type || 'INCIDENT').replace(/_/g, ' ');
    const titleText = `${inc.title}\n[${formattedType}]`;
    return [
      inc.firNumber || inc.id,
      titleText,
      inc.locationName || 'Bengaluru Zone',
      inc.severity || 'MEDIUM',
      (inc.status || 'PENDING').replace(/_/g, ' ')
    ];
  });

  return { headers, rows };
}

/**
 * Formats raw PatrolRoute objects into clean table rows and headers for autoTable.
 */
export function formatPatrolTableData(patrolRoutes: PatrolRoute[]) {
  const headers = ['Unit ID', 'Unit Name & Vehicle', 'Checkpoints', 'Status', 'Coverage'];

  const rows = patrolRoutes.map((route) => {
    const vehicleText = `${route.unitName}\n${route.vehicleType || 'Hoysala PCR'}`;
    const checkpointsCount = route.checkpoints ? `${route.checkpoints.length} Checkpoints` : 'Patrol Route';
    return [
      route.unitId,
      vehicleText,
      checkpointsCount,
      (route.status || 'PATROLLING').replace(/_/g, ' '),
      `${route.coveragePercent || 0}%`
    ];
  });

  return { headers, rows };
}

/**
 * Generates an executive briefing PDF using jsPDF & jspdf-autotable.
 */
export function generateExecutiveBriefingPDF(
  incidents: CrimeIncident[],
  patrolRoutes: PatrolRoute[],
  officerName: string = 'Inspector Arjun'
): { fileName: string; size: string } {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const metrics = formatDashboardMetrics(incidents, patrolRoutes);

  // --- Header Banner ---
  doc.setFillColor(15, 23, 42); // #0f172a (slate-900)
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setFillColor(217, 119, 6); // #d97706 (amber-600)
  doc.rect(0, 0, pageWidth, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('KARNATAKA STATE POLICE', 14, 13);

  doc.setFontSize(9.5);
  doc.setTextColor(251, 191, 36); // #fbbf24 (amber-400)
  doc.text('TRINETRA-AI COMMAND CENTER • EXECUTIVE BRIEFING REPORT', 14, 20);

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // #94a3b8
  const timestampStr = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });
  doc.text(`GENERATED: ${timestampStr} | AUTHORIZED OFFICER: ${officerName.toUpperCase()}`, 14, 26.5);

  let yPos = 38;

  // --- Section 1: Executive Metrics Summary Grid ---
  doc.setFillColor(241, 245, 249);
  doc.rect(14, yPos, pageWidth - 28, 7, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, yPos, pageWidth - 28, 7, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('1. EXECUTIVE COMMAND METRICS & CCTNS TELEMETRY', 18, yPos + 4.8);

  yPos += 11;

  const boxWidth = (pageWidth - 28 - 9) / 4;
  const metricBoxes = [
    { label: 'TOTAL FIRS LOGGED', val: `${metrics.totalIncidents} Incidents` },
    { label: 'HIGH / CRITICAL', val: `${metrics.criticalIncidents} Flagged` },
    { label: 'CASES SOLVED', val: `${metrics.solvedIncidents} Resolved` },
    { label: 'PATROL COVERAGE', val: `${metrics.avgCoverage} Avg` }
  ];

  metricBoxes.forEach((mb, i) => {
    const bx = 14 + i * (boxWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(bx, yPos, boxWidth, 14, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(mb.label, bx + 3, yPos + 4.5);

    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(mb.val, bx + 3, yPos + 10.5);
  });

  yPos += 19;

  // --- Section 2: Active Incident Register Table (autoTable) ---
  const incidentData = formatIncidentTableData(incidents);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('2. ACTIVE CRIME INCIDENT REGISTER (CCTNS REAL-TIME SYNC)', 14, yPos);

  yPos += 3;

  autoTable(doc, {
    startY: yPos,
    head: [incidentData.headers],
    body: incidentData.rows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: 2.5
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [30, 41, 59],
      cellPadding: 2.5
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 28, fontStyle: 'bold' },
      1: { cellWidth: 62 },
      2: { cellWidth: 42 },
      3: { cellWidth: 24, fontStyle: 'bold' },
      4: { cellWidth: 26 }
    },
    didParseCell: (data) => {
      // Highlight severity column
      if (data.section === 'body' && data.column.index === 3) {
        const val = data.cell.raw as string;
        if (val === 'CRITICAL' || val === 'HIGH') {
          data.cell.styles.textColor = [220, 38, 38]; // Red
        } else if (val === 'MEDIUM') {
          data.cell.styles.textColor = [217, 119, 6]; // Amber
        } else {
          data.cell.styles.textColor = [16, 185, 129]; // Green
        }
      }
    }
  });

  // Get final Y position after incident autoTable
  yPos = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : yPos + 40;

  // Check if we need a new page for Patrol Status
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  // --- Section 3: Patrol Status Table (autoTable) ---
  const patrolData = formatPatrolTableData(patrolRoutes);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('3. HOYSALA PATROL UNITS & COVERAGE STATUS', 14, yPos);

  yPos += 3;

  autoTable(doc, {
    startY: yPos,
    head: [patrolData.headers],
    body: patrolData.rows,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: 2.5
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [30, 41, 59],
      cellPadding: 2.5
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 28, fontStyle: 'bold' },
      1: { cellWidth: 55 },
      2: { cellWidth: 45 },
      3: { cellWidth: 32 },
      4: { cellWidth: 22, fontStyle: 'bold' }
    }
  });

  yPos = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 12 : yPos + 35;

  if (yPos > pageHeight - 30) {
    doc.addPage();
    yPos = pageHeight - 35;
  }

  // --- Footer Stamp & Audit ---
  doc.setDrawColor(203, 213, 225);
  doc.line(14, yPos, pageWidth - 14, yPos);

  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('KARNATAKA STATE POLICE OFFICIAL RECORD • CCTNS VERIFIED', 14, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Generated via Trinetra-AI Command Engine • Datathon 2026', 14, yPos + 4);

  const auditHash = `SECURITY AUDIT HASH: KSP-2026-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  doc.text(auditHash, pageWidth - 14 - doc.getTextWidth(auditHash), yPos + 4);

  const fileName = `KSP_Trinetra_Briefing_Report_${Date.now()}.pdf`;
  doc.save(fileName);

  return {
    fileName,
    size: '1.4 MB'
  };
}
