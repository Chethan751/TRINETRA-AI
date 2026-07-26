# TRINETRA AI | TACTICAL COMMAND CENTER
### Karnataka State Police Datathon 2026 Submission

TRINETRA AI is a high-performance tactical command center application designed for the Karnataka State Police (KSP) Datathon 2026. It combines bilingual (Kannada/English) AI conversation, 3D crime spatial analytics, Hoysala patrol route vector optimization, repeat offender network graphs, CCTNS FIR registration delay anomaly detection, and OSINT citizen intelligence lookups.

---

## 🛠️ System Architecture

- **Frontend (`client/` & `src/`)**: React 19 + Vite + Tailwind CSS + Leaflet + Recharts + Motion (Framer Motion).
- **Backend Core (`functions/trinetra_core/` & `server.ts`)**: FastAPI (Python / AppSail) + Express (Node.js) + `@google/genai` (Gemini 3.6 Flash) + Scikit-Learn IsolationForest.
- **Deployment Platform**: Zoho Catalyst (AppSail + Static Hosting + Data Store).

---

## ☁️ Zoho Catalyst Deployment Guide

Follow these step-by-step instructions to deploy TRINETRA AI to Zoho Catalyst using the Catalyst CLI (`zcatalyst-cli`).

### Step 1: Install & Login to Zoho Catalyst CLI

```bash
# Install Zoho Catalyst CLI globally
npm install -g zcatalyst-cli

# Login to your Zoho Catalyst account
catalyst login
```

### Step 2: Initialize Catalyst Project

```bash
# Initialize Catalyst project in the root directory
catalyst init

# Select Project Name: TRINETRA-AI
# Select Services: Client (Static Hosting) + Functions (AppSail Python)
```

### Step 3: Create `FIR_DATA` Table in Catalyst Data Store

In the Zoho Catalyst Console, navigate to **Data Store** and create a table named `FIR_DATA` with the following columns:

| Column Name | Data Type | Key Constraints |
| :--- | :--- | :--- |
| `id` | VarChar (50) | Primary Key |
| `crime_type` | VarChar (100) | Indexed |
| `district` | VarChar (100) | Indexed |
| `latitude` | Double | Latitude Coordinate |
| `longitude` | Double | Longitude Coordinate |
| `incident_date` | VarChar (50) | Timestamp |
| `severity` | VarChar (20) | CRITICAL / HIGH / MEDIUM / LOW |

### Step 4: Build & Deploy Frontend Client

```bash
# Navigate to the client directory
cd client

# Install dependencies and build static dist/
npm install
npm run build

# Return to project root
cd ..
```

### Step 5: Execute Full-Stack Catalyst Deployment

```bash
# Deploy both static hosting client and FastAPI backend function
catalyst deploy
```

---

## 🚀 Local Development Execution

```bash
# Install node dependencies
npm install

# Start full-stack command center dev server
npm run dev

# Open preview at http://localhost:3000
```

---

## 🛡️ Key Features

1. **Bilingual Conversational AI (Kannada / English)**: Powered by Gemini 3.6 Flash with real-time audio voice waveform visualizer.
2. **3D Spatial Crime Heatmap & Patrol Route Overlay**: Interactive Leaflet dark mode map with simulated Hoysala patrol vector paths and PIP CCTV feed bounding boxes.
3. **Repeat Offender & Financial Trail Network Graph**: Interactive node graph with Financial Fraud Trail toggle showing money transfer amounts and suspect bank accounts.
4. **FIR Audit & Anomaly Monitor**: Recharts bar chart powered by IsolationForest ML detecting registration delay spikes (+38.4 hours alert for Station 4).
5. **OSINT Intelligence Search**: Instant lookup across vehicle numbers, phone SIMs, and UPI VPAs cross-referenced with CCTNS & 1930 Cyber Crime Helpline.
6. **Ethical AI Compliance**: Demographic features (caste, religion, income) are strictly excluded from inference models.

---

*Presented for Karnataka State Police Datathon 2026.*
