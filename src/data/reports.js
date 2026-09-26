// Centralized Reports Dataset
// Faithfully matching Reference Image 3 (Reports)

export const reportsOverview = {
  currentIndex: 128.4,
  averageFare: 5420,
  routesCovered: 428,
  airlinesTracked: 8,
};

export const availableReportsList = [
  {
    id: 'rep-1',
    title: 'India Airfare Market Summary',
    period: 'September 2026',
    covers: 'Airfare Index · Average Fare · Route Movement',
    generatedDate: '21 Sep 2026',
    fileSize: '2.4 MB',
    type: 'market',
  },
  {
    id: 'rep-2',
    title: 'Airline Pricing Summary',
    period: 'September 2026',
    covers: 'Airline Fares · Price Changes · Routes',
    generatedDate: '21 Sep 2026',
    fileSize: '1.8 MB',
    type: 'airline',
  },
  {
    id: 'rep-3',
    title: 'Price Spike Report',
    period: 'Last 7 Days',
    covers: 'Flagged Routes · Price Increases · Spike Levels',
    generatedDate: '21 Sep 2026',
    fileSize: '1.2 MB',
    type: 'spike',
  },
  {
    id: 'rep-4',
    title: 'Seasonal Fare Summary',
    period: '2026',
    covers: 'Peak Periods · Lower Fare Periods · Seasonal Patterns',
    generatedDate: '20 Sep 2026',
    fileSize: '3.1 MB',
    type: 'seasonal',
  },
];

export const latestReportData = {
  title: 'India Airfare Market Summary',
  period: '01 Sep – 21 Sep 2026',
  airfareIndex: 128.4,
  averageFare: 5420,
  priceMovement: '↑ 4.8%',
  routes: 428,
  status: 'Data Complete',
  cpiNote: 'Standardized airfare observations suitable for further CPI analysis.',
};

export const reportTypesCards = [
  {
    title: 'Market Summary',
    subtitle: 'Overall airfare movement',
    iconType: 'bar',
  },
  {
    title: 'Airline Analysis',
    subtitle: 'Compare airline pricing',
    iconType: 'plane',
  },
  {
    title: 'Price Spike Report',
    subtitle: 'Unusual fare increases',
    iconType: 'spike',
  },
  {
    title: 'Seasonal Summary',
    subtitle: 'Seasonal airfare patterns',
    iconType: 'calendar',
  },
];
