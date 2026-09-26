// Centralized Main Dashboard & Index Data
// Faithfully matching the layout, KPIs, and data from Reference Image 1

export const dashboardOverview = {
  currentIndex: 128.4,
  indexChange: 4.8,
  indexChangeLabel: 'vs. previous period',
  priceSpikes: 17,
  priceSpikesSubtitle: 'routes with unusual increases',
  highestSpikeText: 'Highest: Bhopal → Delhi +18.4%',
  routesTracked: 428,
  routesSubtitle: 'across India',
  totalAirlines: 8,
  totalAirlinesSubtitle: 'monitored',
  totalRecords: '2.4M',
  recordsSubtitle: 'processed',
  lastUpdated: '21 Sep 2026',
  lastUpdatedTime: '6:30 PM',
  fullTimestamp: '21 Sep 2026, 6:30 PM',
};

// 7-Day Index Trend curve (15 Sep to 21 Sep) rising to 128.4
export const indexTrend7D = [
  { day: '15 Sep', index: 110.2 },
  { day: '16 Sep', index: 114.5 },
  { day: '17 Sep', index: 112.8 },
  { day: '18 Sep', index: 115.6 },
  { day: '19 Sep', index: 118.4 },
  { day: '20 Sep', index: 124.2 },
  { day: '21 Sep', index: 128.4 },
];

export const indexTrend30D = [
  { day: '23 Aug', index: 104.5 },
  { day: '30 Aug', index: 108.2 },
  { day: '06 Sep', index: 111.4 },
  { day: '13 Sep', index: 116.8 },
  { day: '21 Sep', index: 128.4 },
];

export const indexTrend1Y = [
  { day: 'Oct 25', index: 100.0 },
  { day: 'Dec 25', index: 105.4 },
  { day: 'Feb 26', index: 108.2 },
  { day: 'Apr 26', index: 114.8 },
  { day: 'Jun 26', index: 119.5 },
  { day: 'Aug 26', index: 122.1 },
  { day: 'Sep 26', index: 128.4 },
];

// Price Spike Detection Table (Screenshot 1)
export const priceSpikeList = [
  {
    id: 'spike-1',
    route: 'Bhopal → Delhi',
    origin: 'Bhopal',
    destination: 'Delhi',
    change: '+18.4%',
    changeValue: 18.4,
    status: 'High Spike',
    statusVariant: 'danger',
    currentFare: 4820,
  },
  {
    id: 'spike-2',
    route: 'Delhi → Goa',
    origin: 'Delhi',
    destination: 'Goa',
    change: '+12.1%',
    changeValue: 12.1,
    status: 'High Spike',
    statusVariant: 'danger',
    currentFare: 6240,
  },
  {
    id: 'spike-3',
    route: 'Mumbai → Bangalore',
    origin: 'Mumbai',
    destination: 'Bangalore',
    change: '+9.4%',
    changeValue: 9.4,
    status: 'Rising',
    statusVariant: 'warning',
    currentFare: 5120,
  },
  {
    id: 'spike-4',
    route: 'Chennai → Delhi',
    origin: 'Chennai',
    destination: 'Delhi',
    change: '+8.8%',
    changeValue: 8.8,
    status: 'Rising',
    statusVariant: 'warning',
    currentFare: 5350,
  },
  {
    id: 'spike-5',
    route: 'Kolkata → Mumbai',
    origin: 'Kolkata',
    destination: 'Mumbai',
    change: '+7.6%',
    changeValue: 7.6,
    status: 'Moderate',
    statusVariant: 'warning',
    currentFare: 5780,
  },
];

// Top 4 Airlines for Dashboard "Airline Pricing Analysis" card
export const topAirlinePricing = [
  {
    name: 'IndiGo',
    code: '6E',
    fare: '₹4,850',
    change: '↑ 3.2%',
    changeType: 'up',
    logoType: 'indigo',
    color: '#002e6e',
  },
  {
    name: 'Air India',
    code: 'AI',
    fare: '₹5,120',
    change: '↑ 1.8%',
    changeType: 'up',
    logoType: 'airindia',
    color: '#d91d2a',
  },
  {
    name: 'Akasa Air',
    code: 'QP',
    fare: '₹4,620',
    change: '↓ 2.4%',
    changeType: 'down',
    logoType: 'akasa',
    color: '#f97316',
  },
  {
    name: 'SpiceJet',
    code: 'SG',
    fare: '₹4,910',
    change: '↑ 5.1%',
    changeType: 'up',
    logoType: 'spicejet',
    color: '#dc2626',
  },
];

// Seasonal Fare Analysis Month-by-Month data
export const monthlyFareTrends = [
  { month: 'Jan', fare: 4800, isPeak: false },
  { month: 'Feb', fare: 4600, isPeak: false },
  { month: 'Mar', fare: 4900, isPeak: false },
  { month: 'Apr', fare: 6200, isPeak: true },
  { month: 'May', fare: 6800, isPeak: true },
  { month: 'Jun', fare: 6400, isPeak: true },
  { month: 'Jul', fare: 4300, isPeak: false },
  { month: 'Aug', fare: 4400, isPeak: false },
  { month: 'Sep', fare: 4850, isPeak: false },
  { month: 'Oct', fare: 6100, isPeak: true },
  { month: 'Nov', fare: 6500, isPeak: true },
  { month: 'Dec', fare: 5900, isPeak: false },
];
