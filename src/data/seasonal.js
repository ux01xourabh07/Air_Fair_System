// Centralized Seasonal Trends Dataset
// Faithfully matching Reference Image 1 (Seasonal Fare Trends)

export const seasonalOverview = {
  averageFare: 5420,
  highestPeriod: 7200,
  lowestPeriod: 4200,
  peakMonths: 'Apr – Jun',
  lastUpdated: '21 Sep 2026, 6:30 PM',
  insightText: 'Airfares tend to be higher during peak travel periods and lower during quieter periods.',
};

export const monthlySeasonalData = [
  { month: 'Jan', fare: 4600, color: '#a7e4db', type: 'lower' },
  { month: 'Feb', fare: 4500, color: '#a7e4db', type: 'lower' },
  { month: 'Mar', fare: 5100, color: '#a3d3fc', type: 'moderate' },
  { month: 'Apr', fare: 6500, color: '#fca5a5', type: 'peak' },
  { month: 'May', fare: 6800, color: '#fca5a5', type: 'peak' },
  { month: 'Jun', fare: 6400, color: '#fca5a5', type: 'peak' },
  { month: 'Jul', fare: 4600, color: '#a7e4db', type: 'lower' },
  { month: 'Aug', fare: 4200, color: '#a7e4db', type: 'lower' },
  { month: 'Sep', fare: 4700, color: '#a3d3fc', type: 'moderate' },
  { month: 'Oct', fare: 5800, color: '#a3d3fc', type: 'moderate' },
  { month: 'Nov', fare: 6300, color: '#fca5a5', type: 'peak' },
  { month: 'Dec', fare: 6100, color: '#fca5a5', type: 'peak' },
];

export const higherFarePeriods = [
  { period: 'Apr – Jun', range: '₹6,500 – ₹6,800 average' },
  { period: 'Oct – Nov', range: '₹5,800 – ₹6,300 average' },
  { period: 'December', range: '₹6,100 average' },
];

export const lowerFarePeriods = [
  { period: 'July – August', range: '₹4,200 – ₹4,600' },
  { period: 'January – February', range: '₹4,500 – ₹4,600' },
];

export const seasonalCards = [
  {
    season: 'Summer',
    fare: '₹6,800',
    status: 'Higher',
    statusClass: 'bg-rose-50 text-rose-600 border-rose-100',
    iconType: 'sun',
  },
  {
    season: 'Monsoon',
    fare: '₹4,200',
    status: 'Lower',
    statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    iconType: 'rain',
  },
  {
    season: 'Festival Season',
    fare: '₹6,300',
    status: 'Higher',
    statusClass: 'bg-rose-50 text-rose-600 border-rose-100',
    iconType: 'festival',
  },
];
