// Centralized Market Forecast Dataset
// Faithfully matching the layout, cards, and horizon tables in Reference Image 3

export const forecastOverview = {
  currentIndex: 128.4,
  overallOutlook: 'Moderate Increase',
  overallOutlookDirection: 'up',
  next7DaysChange: '+4–7%',
  next15DaysChange: '+6–9%',
  confidenceScore: '82%',
  confidenceSubtitle: 'Based on available fare trends',
  lastUpdated: '21 Sep 2026, 6:30 PM',
  methodology: 'ARIMA',
  methodologyExplanation:
    'ARIMA uses historical time-series airfare data to estimate near-term index movement.',
  disclaimer:
    'Forecasts are estimates based on historical patterns and are not guaranteed future prices.',
};

// 5 Specified Forecast Horizons: T+1, T+7, T+15, T+30, T+45
export const forecastHorizonsTable = [
  {
    period: 'T+1 Day',
    expectedChange: '↑ +1.2%',
    status: 'Slight Increase',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotColor: 'bg-emerald-500',
  },
  {
    period: 'T+7 Days',
    expectedChange: '↑ +4–7%',
    status: 'Moderate Increase',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dotColor: 'bg-amber-500',
  },
  {
    period: 'T+15 Days',
    expectedChange: '↑ +6–9%',
    status: 'Moderate Increase',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dotColor: 'bg-amber-500',
  },
  {
    period: 'T+30 Days',
    expectedChange: '↑ +3–8%',
    status: 'Uncertain',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80',
    dotColor: 'bg-purple-500',
  },
  {
    period: 'T+45 Days',
    expectedChange: '—',
    status: 'Longer-term outlook',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/80',
    dotColor: 'bg-sky-500',
  },
];

// Selected Route Outlook Table (Right column of Image 3)
export const selectedRouteOutlook = [
  {
    route: 'Bhopal → Delhi',
    currentFare: 4820,
    expectedChange: '↑ +5.2%',
    outlook: 'Rising',
    outlookClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  {
    route: 'Delhi → Mumbai',
    currentFare: 4680,
    expectedChange: '↑ +3.8%',
    outlook: 'Moderate',
    outlookClass: 'bg-yellow-50 text-yellow-800 border-yellow-200/80',
  },
  {
    route: 'Mumbai → Bangalore',
    currentFare: 5120,
    expectedChange: '↑ +6.4%',
    outlook: 'Rising',
    outlookClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  {
    route: 'Delhi → Goa',
    currentFare: 6240,
    expectedChange: '↑ +7.1%',
    outlook: 'High Increase',
    outlookClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
  },
];

// What May Affect Airfares Drivers
export const marketFactors = [
  {
    title: 'Peak Travel Demand',
    description: 'Higher passenger demand may push fares upward.',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    iconType: 'Users',
  },
  {
    title: 'Seasonal Demand',
    description: 'Travel periods with higher demand can influence fare levels.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    iconType: 'Calendar',
  },
  {
    title: 'Recent Price Movement',
    description: 'Recent fare increases are considered in the forecast.',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    iconType: 'TrendingUp',
  },
];
