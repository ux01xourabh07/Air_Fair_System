// Intelligence Layer — Centralized Data
// Shared across Economic Impact, Shock Propagation, Anomaly Detection pages
// and the Dashboard intelligence summaries
// Values are consistent across all pages for a connected, coherent experience

// ─────────────────────────────────────────────
// ECONOMIC IMPACT DATA
// ─────────────────────────────────────────────

export const economicIndicators = {
  atfPrice: {
    label: 'ATF PRICE',
    value: '₹ 97.6 / L',
    change: '+4.2%',
    changeType: 'up',
    changeLabel: 'vs. previous period',
  },
  usdInr: {
    label: 'USD / INR',
    value: '₹ 83.4',
    change: '+1.8%',
    changeType: 'up',
    changeLabel: 'vs. previous period',
  },
  inflation: {
    label: 'INFLATION',
    value: '5.2%',
    change: '+0.3%',
    changeType: 'up',
    changeLabel: 'vs. previous period',
  },
  airfareIndex: {
    label: 'AIRFARE INDEX',
    value: '128.4',
    change: '+3.7%',
    changeType: 'up',
    changeLabel: 'vs. previous period',
  },
};

// Dual-axis chart: ATF Price (₹/L) vs Airfare Index over ~2 months
export const economicVsAirfareChart = [
  { date: '1 Aug', atf: 78, index: 114 },
  { date: '8 Aug', atf: 80, index: 116 },
  { date: '15 Aug', atf: 82, index: 116 },
  { date: '22 Aug', atf: 84, index: 118 },
  { date: '29 Aug', atf: 87, index: 119 },
  { date: '5 Sep', atf: 90, index: 121 },
  { date: '12 Sep', atf: 96, index: 122 },
  { date: '19 Sep', atf: 102, index: 128 },
  { date: '26 Sep', atf: 98, index: 127 },
];

// Lag label position — approximately between 12 Sep and 19 Sep
export const economicChartLagLabel = { dateIndex: 6, lagText: 'Lag: 12 days' };

export const economicInsightText =
  'The index is 4.8% higher than the previous period.';

// Route-wise lag analysis table
export const routeLagAnalysis = [
  {
    id: 'lag-1',
    route: 'DEL → BOM',
    economicChange: '+9.4% ATF',
    airfareChange: '+7.1%',
    observedLag: '5 days',
    status: 'Fast',
    statusColor: 'green',
  },
  {
    id: 'lag-2',
    route: 'BLR → DEL',
    economicChange: '+9.4% ATF',
    airfareChange: '+5.8%',
    observedLag: '9 days',
    status: 'Moderate',
    statusColor: 'amber',
  },
  {
    id: 'lag-3',
    route: 'BOM → CCU',
    economicChange: '+9.4% ATF',
    airfareChange: '+4.9%',
    observedLag: '13 days',
    status: 'Slower',
    statusColor: 'red',
  },
  {
    id: 'lag-4',
    route: 'DEL → BLR',
    economicChange: '+9.4% ATF',
    airfareChange: '+5.2%',
    observedLag: '11 days',
    status: 'Moderate',
    statusColor: 'amber',
  },
];

// Insight cards (right column)
export const economicInsights = [
  {
    id: 'ins-1',
    icon: 'up',
    text: 'ATF prices increased by 8.4% during the selected period, which was followed by a rise in airfare across multiple routes.',
  },
  {
    id: 'ins-2',
    icon: 'clock',
    text: 'The average lag between economic movement and airfare response is 9–12 days, varying by route.',
  },
  {
    id: 'ins-3',
    icon: 'plane',
    text: 'Routes with higher international exposure (e.g., DEL–BLR) show slightly longer response times.',
  },
  {
    id: 'ins-4',
    icon: 'info',
    text: 'Observed relationship does not by itself establish causation.',
  },
];

// Fare Investigation panel (right sidebar)
export const economicFareInvestigation = {
  classification: 'Possible Market Shock',
  confidence: 87,
  route: 'DEL → BOM',
  airline: 'IndiGo',
  observedFare: '₹ 13,200',
  expectedRange: '₹ 4,800 – 7,200',
  historicalAvg: '₹ 5,600',
  note: 'Airfare movement followed the ATF increase with an observed lag of 12 days.',
};

// Dashboard summary (compact card on dashboard)
export const economicDashboardSummary = {
  atfChange: '+8.4%',
  airfareResponse: '+5.9%',
  observedLag: '12 days',
  note: 'Airfare movement followed the ATF increase.',
};

// ─────────────────────────────────────────────
// SHOCK PROPAGATION DATA
// ─────────────────────────────────────────────

export const shockEvents = [
  { id: 'ev-1', label: 'ATF Price Increase — 12 Sep 2026', value: 'atf-sep-2026' },
  { id: 'ev-2', label: 'USD/INR Rate Spike — 5 Aug 2026', value: 'fx-aug-2026' },
  { id: 'ev-3', label: 'Fuel Tax Policy Change — 1 Jul 2026', value: 'policy-jul-2026' },
];

export const shockOverview = {
  eventDate: '12 Sep 2026',
  firstRouteAffected: 'DEL → BOM',
  fastestResponse: '5 Days',
  indexMovement: '+4.1%',
};

// Propagation timeline — sequence of events
export const propagationTimeline = [
  {
    id: 'tl-1',
    date: '12 Sep',
    label: 'ATF Price Increase',
    change: '+8.4%',
    tag: 'Event',
    tagColor: 'slate',
    lag: null,
  },
  {
    id: 'tl-2',
    date: '17 Sep',
    label: 'DEL → BOM',
    change: '+8.2%',
    tag: '5 days',
    tagColor: 'teal',
    lag: '5 days',
  },
  {
    id: 'tl-3',
    date: '21 Sep',
    label: 'BLR → DEL',
    change: '+6.4%',
    tag: '9 days',
    tagColor: 'teal',
    lag: '9 days',
  },
  {
    id: 'tl-4',
    date: '23 Sep',
    label: 'BOM → BLR',
    change: '+5.8%',
    tag: '11 days',
    tagColor: 'teal',
    lag: '11 days',
  },
  {
    id: 'tl-5',
    date: '27 Sep',
    label: 'National Airfare Index',
    change: '+4.1%',
    tag: '15 days',
    tagColor: 'purple',
    lag: '15 days',
  },
];

export const shockStats = {
  routesAffected: 18,
  avgResponseTime: '9.4 Days',
  highestFareChange: '+12.8%',
  totalDuration: '15 Days',
};

// Route-wise response table
export const shockRouteResponse = [
  {
    id: 'sr-1',
    route: 'DEL → BOM',
    firstMovement: '17 Sep',
    fareChange: '+8.2%',
    responseTime: '5 days',
    status: 'Early',
    statusColor: 'green',
  },
  {
    id: 'sr-2',
    route: 'BLR → DEL',
    firstMovement: '21 Sep',
    fareChange: '+6.4%',
    responseTime: '9 days',
    status: 'Moderate',
    statusColor: 'amber',
  },
  {
    id: 'sr-3',
    route: 'BOM → BLR',
    firstMovement: '23 Sep',
    fareChange: '+5.8%',
    responseTime: '11 days',
    status: 'Delayed',
    statusColor: 'orange',
  },
  {
    id: 'sr-4',
    route: 'DEL → BLR',
    firstMovement: '25 Sep',
    fareChange: '+5.2%',
    responseTime: '13 days',
    status: 'Delayed',
    statusColor: 'orange',
  },
];

export const shockOverallMovement = {
  description:
    'The selected event was followed by route-level fare changes before a broader movement in the overall airfare index.',
  totalTimeToBroaderMovement: '15 Days',
};

// Dashboard summary card
export const shockDashboardSummary = {
  latestShock: 'ATF Price Increase',
  firstAffectedRoute: 'DEL → BOM',
  observedLag: '5 days',
  nationalIndexResponse: '+4.1%',
};

// ─────────────────────────────────────────────
// ANOMALY DETECTION DATA
// ─────────────────────────────────────────────

export const anomalyOverview = {
  totalAnomalies: 12,
  anomalyChange: '+3',
  totalRecords: '124,580',
  recordsChange: '+12.3%',
  flaggedRecords: 2648,
  flaggedChange: '+8.7%',
  normalMovements: 7,
  normalCount: 2210,
  dataAnomalyCount: 312,
  marketShockCount: 126,
};

// AI Classification definitions
export const anomalyClassifications = [
  {
    id: 'cls-1',
    type: 'NORMAL',
    color: 'green',
    description: 'Fare follows expected historical behaviour and is within normal range.',
  },
  {
    id: 'cls-2',
    type: 'POSSIBLE DATA ANOMALY',
    color: 'amber',
    description: 'Fare is unusual and not supported by comparable sources.',
  },
  {
    id: 'cls-3',
    type: 'POSSIBLE MARKET SHOCK',
    color: 'red',
    description: 'Similar unusual movement is observed across multiple sources/routes.',
  },
];

// Anomaly records table
export const anomalyRecords = [
  {
    id: 'an-1',
    time: '10:32 AM',
    route: 'DEL → BOM',
    airline: 'IndiGo',
    fare: 25400,
    expectedRange: '4,800 – 7,200',
    assessment: 'Data Anomaly',
    assessmentColor: 'amber',
    reason: 'Single-source deviation',
    ago: '2h ago',
  },
  {
    id: 'an-2',
    time: '09:17 AM',
    route: 'BLR → DEL',
    airline: 'Air India',
    fare: 14200,
    expectedRange: '5,000 – 8,000',
    assessment: 'Market Shock',
    assessmentColor: 'red',
    reason: 'Cross-airline confirmation',
    ago: '3h ago',
  },
  {
    id: 'an-3',
    time: '08:54 AM',
    route: 'BOM → CCU',
    airline: 'Vistara',
    fare: 11800,
    expectedRange: '5,500 – 9,000',
    assessment: 'Market Shock',
    assessmentColor: 'red',
    reason: 'Multiple sources increase',
    ago: '4h ago',
  },
  {
    id: 'an-4',
    time: '07:31 AM',
    route: 'HYD → DEL',
    airline: 'SpiceJet',
    fare: 4200,
    expectedRange: '5,000 – 8,000',
    assessment: 'Data Anomaly',
    assessmentColor: 'amber',
    reason: 'Historical deviation',
    ago: '5h ago',
  },
  {
    id: 'an-5',
    time: '06:45 AM',
    route: 'DEL → BLR',
    airline: 'Akasa Air',
    fare: 9600,
    expectedRange: '4,500 – 7,500',
    assessment: 'Market Shock',
    assessmentColor: 'red',
    reason: 'Sudden price jump',
    ago: '6h ago',
  },
  {
    id: 'an-6',
    time: '01:12 AM',
    route: 'CCU → BOM',
    airline: 'IndiGo',
    fare: 6300,
    expectedRange: '4,000 – 6,500',
    assessment: 'Normal',
    assessmentColor: 'green',
    reason: 'Within expected range',
    ago: '11h ago',
  },
  {
    id: 'an-7',
    time: '12:47 AM',
    route: 'DEL → GOI',
    airline: 'Air India',
    fare: 18900,
    expectedRange: '6,000 – 9,500',
    assessment: 'Data Anomaly',
    assessmentColor: 'amber',
    reason: 'Source quality issue',
    ago: '12h ago',
  },
  {
    id: 'an-8',
    time: '11:03 PM',
    route: 'MAA → DEL',
    airline: 'Vistara',
    fare: 12400,
    expectedRange: '6,500 – 10,000',
    assessment: 'Market Shock',
    assessmentColor: 'red',
    reason: 'Cross-source confirmation',
    ago: '14h ago',
  },
];

// Fare Investigation panel
export const anomalyFareInvestigation = {
  classification: 'Possible Market Shock',
  confidence: 87,
  route: 'DEL → BOM',
  airline: 'IndiGo',
  observedFare: '₹ 13,200',
  expectedRange: '₹ 4,800 – 7,200',
  historicalAvg: '₹ 5,600',
  flagReasons: [
    { icon: 'airline', text: 'Cross-airline confirmation', sub: '4 of 5 airlines showed a similar increase.' },
    { icon: 'jump', text: 'Sudden price jump', sub: 'Fare increased by 87% compared to last week.' },
    { icon: 'season', text: 'Seasonal check', sub: 'No significant seasonal effect detected.' },
  ],
  aiAssessment: 'Possible Market Shock',
  aiConfidence: 87,
};

// Recent intelligence signals (shown on both Anomaly page and Dashboard)
export const recentIntelligenceSignals = [
  {
    id: 'sig-1',
    type: 'Possible Market Shock',
    typeColor: 'red',
    description: 'DEL → BOM fare increased by 28%',
    time: '2 hrs ago',
    severity: 'High',
    severityColor: 'red',
  },
  {
    id: 'sig-2',
    type: 'Economic Movement',
    typeColor: 'teal',
    description: 'ATF prices increased by 8.4%',
    time: '5 hrs ago',
    severity: 'Normal',
    severityColor: 'teal',
  },
  {
    id: 'sig-3',
    type: 'Possible Data Anomaly',
    typeColor: 'amber',
    description: 'Unusual fare detected on DEL → GOI',
    time: '7 hrs ago',
    severity: 'Medium',
    severityColor: 'amber',
  },
  {
    id: 'sig-4',
    type: 'Route Response',
    typeColor: 'slate',
    description: 'BLR → DEL showed movement after 9 days',
    time: 'Yesterday',
    severity: 'Info',
    severityColor: 'slate',
  },
];

// Dashboard anomaly summary card
export const anomalyDashboardSummary = {
  unusualMovements: 12,
  possibleDataAnomalies: 3,
  possibleMarketShocks: 2,
  normalCount: 7,
  note: 'Unusual far movements detected across multiple routes.',
};
