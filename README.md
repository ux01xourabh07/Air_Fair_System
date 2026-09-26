# ✈️ India Airfare Price Index & Airfare Intelligence Platform

> **Smart India Hackathon 2026 — Ministry of Civil Aviation**
>
> A comprehensive analytics and intelligence dashboard that tracks, indexes, analyzes, and forecasts domestic airfare prices across India's aviation market.

---

## 📌 Overview

India's domestic aviation sector carries over **150 million passengers annually**, yet airfare pricing remains opaque and volatile — making it difficult for consumers, policymakers, and businesses to make informed decisions.

The **India Airfare Price Index (IAPI)** is a structured, data-driven intelligence platform that:

- **Monitors** real-time and historical airfare data across all major domestic routes
- **Indexes** prices into a single composite metric for trend tracking
- **Detects** anomalies and sudden price spikes across routes and airlines
- **Forecasts** short-term fare movements using statistical modeling (T+1 to T+45 horizons)
- **Visualizes** seasonal patterns, airline competition, and market dynamics

This platform brings transparency and analytical rigor to India's airfare landscape — helping citizens travel smarter and enabling data-informed policy.

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

## 💡 Proposed Solution

The IAPI platform ingests, processes, and analyzes airfare data across a 7-layer pipeline:

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

## ✨ Key Features

### 📊 Dashboard
- Live **Airfare Price Index** (composite metric — current: 128.4)
- 6 KPI cards: routes tracked, airlines monitored, price spikes, data records, average fare, index trend
- 7-day rolling index chart
- Real-time **price spike table** with severity badges (High / Medium / Low)
- Top airline pricing comparison
- Seasonal trend mini-chart and market forecast summary

### 🗺️ Route Explorer
- Search any origin–destination pair (e.g., Bhopal → Delhi)
- View current price status (Normal / Elevated / Spike)
- Quick insights: cheapest airline, peak season, booking window recommendation
- Per-airline fare breakdown table for the selected route

### 📈 Airline Analysis
- Detailed comparison of all monitored airlines
- Filter by period, route, and sort order
- Average fare, routes operated, and MoM change per airline
- Airline-specific insight dossier modal
- Summary metrics: cheapest, most expensive, most volatile, highest growth carrier

### 🌦️ Seasonal Trends
- Monthly average airfare heatmap (color-coded: green = low, orange = high)
- Peak vs. off-peak period identification
- Season-specific cards: Summer, Monsoon, Festival Season
- Regional and route-level filtering

### 📉 Market Forecast
- **Forecast Horizons**: T+1 (next day), T+7 (1 week), T+15 (2 weeks), T+30 (1 month), T+45 (6 weeks)
- Route-specific outlook table
- Market driver analysis (fuel costs, demand signals, capacity changes)
- Airfare Outlook card with directional confidence rating
- ⚠️ Disclaimer: Forecasts are estimates based on statistical models, not guarantees

### 📋 Reports
- Generate custom reports (Market Overview, Airline Comparison, Price Spike Alert, Seasonal Analysis)
- Download/view pre-generated reports in PDF format _(planned)_
- Latest report sidebar with key findings
- Report type selection grid

### 🕐 History
- Search history with airline views and timestamps
- Route re-search capability ("View Route Again")
- Login activity audit log

---

## 📐 Airfare Price Index — Explained

The **India Airfare Price Index (IAPI)** is a composite metric computed as:

```
IAPI = (Σ Weighted Average Fare per Route) / (Base Year Average Fare) × 100
```

- **Base Year**: 2020 (pre-COVID baseline)
- **Weight**: Routes are weighted by passenger volume (higher traffic = higher weight)
- **Frequency**: Computed daily from scraped/API-sourced fare data
- **Interpretation**: Index > 100 means fares are above the base year baseline

### Current Index: **128.4**
This means average domestic fares are currently **28.4% above** the 2020 base year level.

---

## 🚨 Anomaly & Price Spike Detection

The platform flags routes with abnormal fare increases using:

- **Statistical Baseline**: 30-day rolling average per route
- **Spike Threshold**: > 15% above baseline = **High Spike**, 8–15% = **Medium**, 5–8% = **Low**
- **Alert System**: Spikes are surfaced on the dashboard in real-time

| Severity | Threshold | Example |
|---|---|---|
| 🔴 High Spike | > 15% above baseline | Bhopal → Delhi +18.4% |
| 🟠 Medium | 8–15% above baseline | Mumbai → Goa +12.1% |
| 🟡 Low | 5–8% above baseline | Delhi → Bangalore +6.3% |

---

## 🔮 Forecasting

Fare forecasting is powered by **ARIMA (AutoRegressive Integrated Moving Average)** — a time-series statistical model suited for seasonal and trend data.

### Forecast Horizons

| Horizon | Label | Use Case |
|---|---|---|
| T+1 | Next Day | Last-minute booking decisions |
| T+7 | 1 Week | Short-trip planning |
| T+15 | 2 Weeks | Standard advance booking window |
| T+30 | 1 Month | Holiday and event travel planning |
| T+45 | 6 Weeks | Early-bird booking strategy |

> **⚠️ Disclaimer**: All forecasts are statistical estimates based on historical patterns. They do not constitute financial or travel advice. Actual fares may vary significantly due to sudden demand changes, airline pricing decisions, or external events.

---

## 🛠️ Technology Stack

### Frontend (Current)

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.8 | UI component framework |
| Vite | 8.3.1 | Build tool and dev server |
| JavaScript (ES2022) | — | Primary language |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| React Router DOM | 7.18.4 | Client-side routing |
| Recharts | 3.10.1 | Data visualizations and charts |
| Lucide React | 1.48.0 | Icon system |
| clsx + tailwind-merge | — | Conditional class management |

### Backend & Data _(Planned / Future Integration)_

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Python (FastAPI) | Data scraping and ML pipeline |
| ARIMA / Prophet | Time-series forecasting models |
| PostgreSQL | Structured fare data storage |
| Redis | Caching for real-time index computation |
| Apache Airflow | Scheduled data ingestion pipeline |

### Data Sources _(Planned / Future Integration)_

| Source | Type |
|---|---|
| DGCA (Directorate General of Civil Aviation) | Official traffic and route data |
| Airline APIs (IndiGo, Air India, Akasa, SpiceJet) | Direct fare feeds |
| OTA Integration (MakeMyTrip, Goibibo) | Market price aggregation |
| BCAS Reports | Regulatory compliance data |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         IAPI SYSTEM ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐     ┌──────────────┐     ┌──────────────────────────┐
  │  Data Layer  │     │  API Layer   │     │     Frontend (React)     │
  │              │     │              │     │                          │
  │ PostgreSQL   │────►│  REST API    │────►│  DashboardLayout         │
  │ Redis Cache  │     │  (Express /  │     │  ├── Sidebar (NavLink)   │
  │ Raw Scraped  │     │   FastAPI)   │     │  ├── Topbar              │
  │ Fare Data    │     │              │     │  └── Pages (7 routes)    │
  └──────────────┘     └──────────────┘     │       ├── Dashboard      │
                                             │       ├── RouteExplorer  │
  ┌──────────────┐     ┌──────────────┐     │       ├── AirlineAnalysis│
  │  ML Pipeline │     │  Index Calc  │     │       ├── SeasonalTrends │
  │              │     │              │     │       ├── MarketForecast  │
  │ ARIMA Model  │────►│  IAPI Score  │────►│       ├── Reports        │
  │ Spike Detect │     │  Generator   │     │       └── History        │
  │ Trend Engine │     │              │     └──────────────────────────┘
  └──────────────┘     └──────────────┘
```

---

## 📁 Project Structure

```
airfare/
├── public/
├── src/
│   ├── assets/               # Static assets (images, SVGs)
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/           # Reusable UI components
│   │   ├── ActivityRow.jsx   # Audit log row component
│   │   ├── AirlineLogo.jsx   # Custom SVG airline emblems
│   │   ├── ChartCard.jsx     # Recharts wrapper with header/footer
│   │   ├── DataTable.jsx     # Responsive sortable table
│   │   ├── FilterBar.jsx     # Search + dropdown filter row
│   │   ├── InsightCard.jsx   # Market advisory cards
│   │   ├── KpiCard.jsx       # Large KPI metric cards
│   │   ├── PageHeader.jsx    # Page title + badge + actions
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   ├── StatCard.jsx      # Compact secondary metric cards
│   │   ├── StatusBadge.jsx   # Colored severity/status pills
│   │   └── Topbar.jsx        # Top navigation bar
│   │
│   ├── data/                 # Centralized mock data (swap with API)
│   │   ├── airlines.js       # Airline details and pricing data
│   │   ├── forecast.js       # Forecast horizons and market factors
│   │   ├── history.js        # Search history and login activity
│   │   ├── indexData.js      # Dashboard KPIs, spike list, trends
│   │   ├── reports.js        # Report types and available reports
│   │   ├── routeExplorer.js  # Route-specific fare data
│   │   └── seasonal.js       # Monthly seasonal fare patterns
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # Shared layout: Sidebar + Topbar + Outlet
│   │
│   ├── pages/                # Top-level route pages
│   │   ├── AirlineAnalysis.jsx
│   │   ├── Dashboard.jsx
│   │   ├── History.jsx
│   │   ├── MarketForecast.jsx
│   │   ├── Reports.jsx
│   │   ├── RouteExplorer.jsx
│   │   └── SeasonalTrends.jsx
│   │
│   ├── services/
│   │   └── api.js            # Async data fetching (mock → real API ready)
│   │
│   ├── utils/
│   │   └── formatters.js     # formatINR, formatNumber, formatPercent
│   │
│   ├── App.css               # Global app styles (minimal)
│   ├── App.jsx               # BrowserRouter + Route definitions
│   ├── index.css             # Tailwind directives + custom scrollbar
│   └── main.jsx              # React root entry point
│
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── index.html                # Vite HTML entry + Inter font
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js        # Tailwind config with teal brand color
└── vite.config.js
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/AlinaSheikh02/AIRFARE-INDEX.git
cd AIRFARE-INDEX

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional — app works with mock data by default)
cp .env.example .env
# Edit .env if you have a real API backend

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
# Output: dist/ directory — deploy to any static host (Vercel, Netlify, GitHub Pages)

npm run preview  # Preview the production build locally
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | _(empty — uses mock data)_ |
| `VITE_APP_TITLE` | Application display title | `India Airfare Price Index` |

> **Note**: Never commit `.env` to version control. It is already excluded in `.gitignore`.

---

## 🖥️ Usage

### Navigating the Platform

| Page | Route | Description |
|---|---|---|
| Dashboard | `/dashboard` | Live index, spikes, airline pricing overview |
| Route Explorer | `/route-explorer` | Search a specific origin–destination route |
| Airline Analysis | `/airlines` | Compare all airlines by fare and performance |
| Seasonal Trends | `/seasonal-trends` | Monthly fare patterns and peak season analysis |
| Market Forecast | `/forecast` | T+1 to T+45 fare predictions |
| Reports | `/reports` | Generate and download intelligence reports |
| History | `/history` | View past searches and login activity |

### Workflow Example

1. Open **Dashboard** → Check the current IAPI score and any active spike alerts
2. Go to **Route Explorer** → Search your travel route (e.g., Delhi → Mumbai)
3. Review the **price status**, cheapest airline, and booking window recommendation
4. Open **Market Forecast** → Check T+7 / T+15 fare direction before booking
5. Explore **Seasonal Trends** → Understand if your travel month is peak or off-peak
6. Generate a **Report** → Export findings for sharing or policy reference

---

## 🚀 Future Scope

| Feature | Priority | Description |
|---|---|---|
| **Live Data Integration** | High | Connect to real airline APIs and OTA feeds |
| **User Authentication** | High | JWT-based login with role-based access |
| **Alert System** | High | Email/SMS notifications on spike detection |
| **ML Forecasting Backend** | High | Deploy ARIMA / Prophet models via FastAPI |
| **Mobile App** | Medium | React Native companion app for travelers |
| **DGCA Data Integration** | Medium | Official route and traffic data ingestion |
| **PDF Report Export** | Medium | Generate downloadable intelligence reports |
| **Multi-language Support** | Low | Hindi and regional language UI |
| **Public API** | Low | Open API for researchers and policymakers |
| **Comparison Tool** | Low | Side-by-side fare comparison for dates |

---

## ⚖️ Disclaimer & Data Usage

> **Data Accuracy**: The current version of this platform operates on **structured mock data** that mirrors real-world airfare patterns. It does not reflect actual live fares from any airline or booking platform.
>
> **Forecasting Disclaimer**: All fare forecasts are produced by statistical models (ARIMA) trained on historical patterns. They are **estimates only** and should not be used as financial or travel planning advice. Actual market conditions may differ significantly.
>
> **No Commercial Affiliation**: This project has no commercial relationship with any airline, OTA, or booking platform. Airline names and logos are referenced for educational and analytical purposes only.
>
> **SIH Context**: This platform was built as a proof-of-concept for Smart India Hackathon 2026. All data pipelines and ML integrations are planned future work.

---

## 👥 Contributors

**SIH 2026 Team — India Airfare Intelligence**

| Name | Role |
|---|---|
| Alina Sheikh | Lead Developer & UI/UX |
| _(Team Member)_ | Data Engineering |
| _(Team Member)_ | ML / Forecasting |
| _(Team Member)_ | Backend API |
| _(Team Member)_ | Research & Documentation |

---

## 📄 License

This project is developed for **Smart India Hackathon 2026** under the guidance of the **Ministry of Civil Aviation, Government of India**.

For academic and demonstration purposes only.

---

<div align="center">
  <strong>✈️ India Airfare Price Index Platform</strong><br/>
  Smart India Hackathon 2026 &nbsp;|&nbsp; Ministry of Civil Aviation<br/>
  <em>Built with React + Vite + Tailwind CSS</em>
</div>
