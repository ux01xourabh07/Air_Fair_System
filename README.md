# ✈️ India Airfare Price Index — Intelligence Platform

> **Smart India Hackathon 2026 — Ministry of Civil Aviation**
>
> A full-stack analytics and intelligence dashboard that tracks, indexes, analyzes, and forecasts domestic airfare prices across India's aviation market — with Clerk-powered authentication, protected routes, and real-time data visualization.

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3.1-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)](https://clerk.com)
[![License](https://img.shields.io/badge/License-SIH%202026-orange)](./LICENSE)

---

## 📌 Overview

India's domestic aviation sector carries over **150 million passengers annually**, yet airfare pricing remains opaque and volatile — making it difficult for consumers, policymakers, and businesses to make informed decisions.

The **India Airfare Price Index (IAPI)** is a structured, data-driven intelligence platform that:

- **Monitors** real-time and historical airfare data across all major domestic routes
- **Indexes** prices into a single composite metric for trend tracking
- **Detects** anomalies and sudden price spikes across routes and airlines
- **Forecasts** short-term fare movements using statistical modeling (T+1 to T+45 horizons)
- **Visualizes** seasonal patterns, airline competition, and market dynamics
- **Secures** access via Clerk authentication — dashboard is public, all analytics pages require login

---

## 🚩 Problem Statement

India's aviation market suffers from:

| Problem | Impact |
|---|---|
| **Price opacity** | Passengers have no structured view of whether fares are fair or inflated |
| **No standardized index** | Unlike fuel or food prices, airfares have no government-tracked composite index |
| **Reactive decision-making** | Consumers book without understanding fare cycles or seasonal patterns |
| **Limited anomaly visibility** | Price gouging during peak demand (festivals, holidays) goes undetected at scale |
| **Fragmented data** | Airline-wise and route-wise data is scattered across booking platforms |

---

## 💡 Solution Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATA PIPELINE OVERVIEW                           │
├──────────────┬──────────────┬───────────────┬──────────────┬────────────┤
│  DATA        │  COLLECTION  │  CLEANING &   │  INDEX       │  ANALYTICS │
│  SOURCES     │  LAYER       │  PROCESSING   │  CALCULATION │  ENGINE    │
│              │              │               │              │            │
│ • Airlines   │ • API Fetch  │ • Dedup       │ • Weighted   │ • Spike    │
│ • OTAs       │ • Scraping   │ • Normalize   │   Avg Fare   │   Detect   │
│ • DGCA       │   (Planned)  │ • Outlier     │ • Base Year  │ • Trend    │
│ • BCAS       │ • Scheduled  │   Removal     │   Indexing   │   Analysis │
│              │   Jobs       │ • Validation  │ • Route      │ • Airline  │
│              │              │               │   Weighting  │   Compare  │
└──────────────┴──────────────┴───────────────┴──────────────┴────────────┘
        │                                                         │
        ▼                                                         ▼
┌───────────────────┐                                   ┌─────────────────┐
│   FORECASTING     │                                   │   DASHBOARD     │
│                   │                                   │                 │
│ • ARIMA Model     │ ◄─────────────────────────────── │ • Live Index    │
│ • T+1 to T+45     │                                   │ • Route View    │
│ • Route-level     │                                   │ • Alerts        │
│   Predictions     │                                   │ • Reports       │
└───────────────────┘                                   └─────────────────┘
```

---

## 🔐 Authentication & Access Control

This platform uses **[Clerk](https://clerk.com)** for authentication.

### Access Rules

| Page | Access |
|---|---|
| `/dashboard` | ✅ Public — visible to everyone without login |
| `/route-explorer` | 🔒 Requires Clerk login |
| `/airlines` | 🔒 Requires Clerk login |
| `/seasonal-trends` | 🔒 Requires Clerk login |
| `/forecast` | 🔒 Requires Clerk login |
| `/reports` | 🔒 Requires Clerk login |
| `/history` | 🔒 Requires Clerk login |
| `/economic-impact` | 🔒 Requires Clerk login |
| `/shock-propagation` | 🔒 Requires Clerk login |
| `/anomaly-detection` | 🔒 Requires Clerk login |

### Auth Flow

```
Open App
   │
   ▼
Dashboard (public preview)
   │
   ▼ (click any protected page)
Clerk Sign-In Modal
   │
   ▼ (after login)
Protected Page Unlocked
   │
   ▼ (click Logout in sidebar)
Confirmation Dialog → Sign Out → Dashboard
```

### Login Button
- **Not signed in** → Blue "Login" button appears in the topbar
- **Signed in** → Clerk `UserButton` (avatar + dropdown) appears in the topbar
- **Logout** → Only visible in sidebar when signed in; clicking it shows a confirmation dialog before signing out

### Environment Setup for Auth

```bash
cp .env.example .env.local
# Fill in your Clerk keys from https://dashboard.clerk.com
```

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

> ⚠️ Never commit `.env.local` — it is excluded in `.gitignore`

---

## ✨ Features

### 📊 Dashboard (Public)
- Live **Airfare Price Index** composite metric (current: 128.4)
- 6 KPI cards: routes tracked, airlines monitored, price spikes, data records, average fare, index trend
- 7-day / 30-day / 1-year rolling index area chart (Recharts)
- Real-time **price spike table** with severity badges
- Top airline pricing comparison grid
- Seasonal trend mini-chart and market forecast summary
- Economic Impact, Anomaly Detection, Shock Propagation summary cards
- Recent Intelligence Signals feed

### 🗺️ Route Explorer (Protected)
- Search any origin–destination pair (e.g., Bhopal → Delhi)
- View current price status: Normal / Elevated / Spike
- Quick insights: cheapest airline, peak season, booking window recommendation
- Per-airline fare breakdown table for the selected route

### 📈 Airline Analysis (Protected)
- Detailed comparison of all monitored airlines
- Filter by period, route, and sort order
- Average fare, routes operated, and MoM change per airline
- Airline-specific insight dossier modal
- Summary metrics: cheapest, most expensive, most volatile, highest growth carrier

### 🌦️ Seasonal Trends (Protected)
- Monthly average airfare heatmap (color-coded: green = low, orange = high)
- Peak vs. off-peak period identification
- Season-specific cards: Summer, Monsoon, Festival Season
- Regional and route-level filtering

### 📉 Market Forecast (Protected)
- Forecast Horizons: T+1, T+7, T+15, T+30, T+45
- Route-specific outlook table
- Market driver analysis (fuel costs, demand signals, capacity changes)
- Airfare Outlook card with directional confidence rating

### 📋 Reports (Protected)
- Generate custom reports: Market Overview, Airline Comparison, Price Spike Alert, Seasonal Analysis
- Latest report sidebar with key findings
- Report type selection grid

### 🕐 History (Protected)
- Search history with airline views and timestamps
- Route re-search capability
- Login activity audit log

### 🧠 Intelligence Pages (Protected)
- **Economic Impact** — ATF price vs airfare correlation analysis
- **Shock Propagation** — How external shocks propagate through route-level fares to the national index
- **Anomaly Detection** — Statistical classification of unusual fare movements

---

## 📐 Airfare Price Index — Methodology

```
IAPI = (Σ Weighted Average Fare per Route) / (Base Year Average Fare) × 100
```

- **Base Year**: 2020 (pre-COVID baseline)
- **Weight**: Routes weighted by passenger volume
- **Frequency**: Computed daily
- **Interpretation**: Index > 100 = fares above base year

### Current Index: 128.4
Average domestic fares are currently **28.4% above** the 2020 baseline.

---

## 🚨 Price Spike Detection

| Severity | Threshold | Example |
|---|---|---|
| 🔴 High Spike | > 15% above 30-day baseline | Bhopal → Delhi +18.4% |
| 🟠 Medium | 8–15% above baseline | Mumbai → Goa +12.1% |
| 🟡 Low | 5–8% above baseline | Delhi → Bangalore +6.3% |

---

## 🔮 Forecasting

Powered by **ARIMA (AutoRegressive Integrated Moving Average)**:

| Horizon | Label | Use Case |
|---|---|---|
| T+1 | Next Day | Last-minute booking |
| T+7 | 1 Week | Short-trip planning |
| T+15 | 2 Weeks | Standard advance booking |
| T+30 | 1 Month | Holiday travel planning |
| T+45 | 6 Weeks | Early-bird booking strategy |

> ⚠️ Forecasts are statistical estimates only. Not financial or travel advice.

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.8 | UI component framework |
| Vite | 8.3.1 | Build tool and dev server |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| React Router DOM | 7.18.4 | Client-side routing |
| Recharts | 3.10.1 | Data visualizations |
| Lucide React | 1.48.0 | Icon system |
| Clerk (`@clerk/react`) | 3.x | Authentication & user management |
| clsx + tailwind-merge | — | Conditional class management |

### Backend & Data _(Planned)_

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Python (FastAPI) | Data scraping and ML pipeline |
| ARIMA / Prophet | Time-series forecasting |
| PostgreSQL | Structured fare data storage |
| Redis | Caching for real-time index |
| Apache Airflow | Scheduled data ingestion |

### Data Sources _(Planned)_

| Source | Type |
|---|---|
| DGCA | Official traffic and route data |
| IndiGo, Air India, Akasa, SpiceJet APIs | Direct fare feeds |
| MakeMyTrip, Goibibo | Market price aggregation |
| BCAS Reports | Regulatory compliance data |

---

## 🏗️ System Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────────────┐
│  Data Layer  │     │  API Layer   │     │     Frontend (React)     │
│              │     │              │     │                          │
│ PostgreSQL   │────►│  REST API    │────►│  ClerkProvider           │
│ Redis Cache  │     │  (Express)   │     │  └── App (BrowserRouter) │
│ Raw Fare Data│     │              │     │      ├── /dashboard (pub)│
└──────────────┘     └──────────────┘     │      ├── /airlines (auth)│
                                           │      ├── /forecast (auth)│
┌──────────────┐     ┌──────────────┐     │      └── ... (auth)     │
│  ML Pipeline │     │  Index Calc  │     │                          │
│              │     │              │     │  DashboardLayout         │
│ ARIMA Model  │────►│  IAPI Score  │────►│  ├── Sidebar             │
│ Spike Detect │     │  Generator   │     │  ├── Topbar              │
│ Trend Engine │     │              │     │  └── <Outlet />          │
└──────────────┘     └──────────────┘     └──────────────────────────┘
```

---

## 📁 Project Structure

```
AIRFARE-INDEX/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                   # Static assets
│   ├── components/               # Reusable UI components
│   │   ├── ActivityRow.jsx       # Audit log row
│   │   ├── AirlineLogo.jsx       # Airline SVG emblems
│   │   ├── ChartCard.jsx         # Recharts wrapper
│   │   ├── DataTable.jsx         # Responsive sortable table
│   │   ├── FilterBar.jsx         # Search + dropdown filters
│   │   ├── InsightCard.jsx       # Market advisory cards
│   │   ├── KpiCard.jsx           # Large KPI metric cards
│   │   ├── PageHeader.jsx        # Page title + badge + actions
│   │   ├── ProtectedRoute.jsx    # Auth guard (legacy, unused)
│   │   ├── Sidebar.jsx           # Navigation sidebar w/ logout confirm
│   │   ├── StatCard.jsx          # Compact metric cards
│   │   ├── StatusBadge.jsx       # Severity/status pills
│   │   └── Topbar.jsx            # Top bar w/ Login/UserButton
│   ├── context/
│   │   └── AuthContext.jsx       # Local auth context (legacy, unused)
│   ├── data/                     # Centralized mock data
│   │   ├── airlines.js
│   │   ├── forecast.js
│   │   ├── history.js
│   │   ├── indexData.js
│   │   ├── intelligence.js
│   │   ├── reports.js
│   │   ├── routeExplorer.js
│   │   └── seasonal.js
│   ├── layouts/
│   │   └── DashboardLayout.jsx   # Sidebar + Topbar + Outlet shell
│   ├── pages/
│   │   ├── AirlineAnalysis.jsx
│   │   ├── AnomalyDetection.jsx
│   │   ├── Dashboard.jsx         # Public landing page
│   │   ├── EconomicImpact.jsx
│   │   ├── History.jsx
│   │   ├── Login.jsx             # Legacy login page (unused)
│   │   ├── MarketForecast.jsx
│   │   ├── Reports.jsx
│   │   ├── RouteExplorer.jsx
│   │   ├── SeasonalTrends.jsx
│   │   └── ShockPropagation.jsx
│   ├── services/
│   │   └── api.js                # Async data layer (mock → real API ready)
│   ├── utils/
│   │   └── formatters.js         # formatINR, formatNumber, formatPercent
│   ├── App.jsx                   # Route definitions + auth guards
│   ├── index.css                 # Tailwind directives
│   └── main.jsx                  # React root + ClerkProvider
├── .env.example                  # Environment variable template
├── .env.local                    # ⚠️ NOT committed — your real keys go here
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- **Git** — [Download](https://git-scm.com/)
- **Clerk account** — [Sign up free](https://clerk.com)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ux01xourabh07/Air_Fair_System.git
cd Air_Fair_System

# 2. Install dependencies
npm install

# 3. Set up Clerk authentication
cp .env.example .env.local
# Edit .env.local and add your Clerk keys from https://dashboard.clerk.com

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build       # Output: dist/ — deploy to Vercel, Netlify, GitHub Pages
npm run preview     # Preview production build locally
```

---

## 🔐 Environment Variables

Copy `.env.example` → `.env.local` and fill in your values:

| Variable | Description | Where to get |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (safe for frontend) | [Clerk Dashboard](https://dashboard.clerk.com) → API Keys |
| `CLERK_SECRET_KEY` | Clerk secret key (backend only) | [Clerk Dashboard](https://dashboard.clerk.com) → API Keys |

> ⚠️ `CLERK_SECRET_KEY` should only be used server-side. Never expose it in client code.
> ⚠️ `.env.local` is in `.gitignore` and will never be committed.

---

## 🖥️ Usage Guide

### Navigation

| Page | Route | Auth | Description |
|---|---|---|---|
| Dashboard | `/dashboard` | Public | Live index, spikes, airline overview |
| Route Explorer | `/route-explorer` | 🔒 Login | Search origin–destination fares |
| Airline Analysis | `/airlines` | 🔒 Login | Compare all airlines |
| Seasonal Trends | `/seasonal-trends` | 🔒 Login | Monthly fare patterns |
| Market Forecast | `/forecast` | 🔒 Login | T+1 to T+45 predictions |
| Reports | `/reports` | 🔒 Login | Generate intelligence reports |
| History | `/history` | 🔒 Login | Search history and audit log |
| Economic Impact | `/economic-impact` | 🔒 Login | ATF vs airfare correlation |
| Shock Propagation | `/shock-propagation` | 🔒 Login | External shock analysis |
| Anomaly Detection | `/anomaly-detection` | 🔒 Login | Unusual fare movement detection |

### Typical Workflow

1. Open **Dashboard** → Check current IAPI score and active spike alerts
2. Click **Login** in the topbar → Sign in via Clerk
3. Go to **Route Explorer** → Search your travel route
4. Open **Market Forecast** → Check T+7 / T+15 fare direction
5. Explore **Seasonal Trends** → Understand peak vs off-peak months
6. Generate a **Report** → Export findings for sharing or policy reference
7. Click **Logout** in sidebar → Confirm sign-out in the dialog

---

## 🚀 Future Scope

| Feature | Priority | Description |
|---|---|---|
| Live Data Integration | High | Connect to real airline APIs and OTA feeds |
| ML Forecasting Backend | High | Deploy ARIMA / Prophet models via FastAPI |
| Alert System | High | Email/SMS notifications on spike detection |
| PDF Report Export | Medium | Downloadable intelligence reports |
| Mobile App | Medium | React Native companion app |
| DGCA Data Integration | Medium | Official route and traffic data |
| Multi-language Support | Low | Hindi and regional language UI |
| Public API | Low | Open API for researchers and policymakers |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## ⚖️ Disclaimer

> **Mock Data**: The current version operates on structured mock data mirroring real-world airfare patterns. It does not reflect actual live fares.
>
> **Forecasting**: All fare forecasts are statistical estimates based on historical patterns. Not financial or travel advice.
>
> **No Commercial Affiliation**: No commercial relationship with any airline, OTA, or booking platform. Airline names referenced for educational purposes only.
>
> **SIH Context**: Built as a proof-of-concept for Smart India Hackathon 2026.

---

## 👥 Team

**SIH 2026 — India Airfare Intelligence**

| Name | Role |
|---|---|
| Sourabh | Lead Developer & UI/UX |
| _(Team Member)_ | Data Engineering |
| _(Team Member)_ | ML / Forecasting |
| _(Team Member)_ | Backend API |
| _(Team Member)_ | Research & Documentation |

---

## 📄 License

Developed for **Smart India Hackathon 2026** under the guidance of the **Ministry of Civil Aviation, Government of India**.

For academic and demonstration purposes only.

---

<div align="center">
  <strong>✈️ India Airfare Price Index Platform</strong><br/>
  Smart India Hackathon 2026 &nbsp;|&nbsp; Ministry of Civil Aviation<br/>
  <em>React · Vite · Tailwind CSS · Clerk Auth · Recharts</em><br/><br/>
  <a href="https://github.com/ux01xourabh07/Air_Fair_System">GitHub</a> &nbsp;|&nbsp;
  <a href="https://dashboard.clerk.com">Clerk Dashboard</a> &nbsp;|&nbsp;
  <a href="https://clerk.com/docs">Clerk Docs</a>
</div>
