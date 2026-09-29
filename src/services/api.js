// API Service Layer - Ready for Node.js + Express + MongoDB integration
// Currently backed by centralized mock datasets

import { airlinesData, getAirlinesSummary } from '../data/airlines';
import {
  dashboardOverview,
  indexTrend7D,
  priceSpikeList,
  topAirlinePricing,
  monthlyFareTrends,
} from '../data/indexData';
import {
  forecastOverview,
  forecastHorizonsTable,
  selectedRouteOutlook,
  marketFactors,
} from '../data/forecast';
import { recentSearchesList, loginActivityList } from '../data/history';
import { routesData } from '../data/routeExplorer';
import {
  seasonalOverview,
  monthlySeasonalData,
  higherFarePeriods,
  lowerFarePeriods,
  seasonalCards,
} from '../data/seasonal';
import {
  reportsOverview,
  availableReportsList,
  latestReportData,
  reportTypesCards,
} from '../data/reports';
import {
  economicIndicators,
  economicVsAirfareChart,
  routeLagAnalysis,
  economicInsights,
  economicFareInvestigation,
  shockEvents,
  shockOverview,
  propagationTimeline,
  shockStats,
  shockRouteResponse,
  shockOverallMovement,
  anomalyOverview,
  anomalyClassifications,
  anomalyRecords,
  anomalyFareInvestigation,
  recentIntelligenceSignals,
} from '../data/intelligence';

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch Main Dashboard data
 */
export const getDashboardData = async () => {
  await delay();
  return {
    overview: dashboardOverview,
    trend: indexTrend7D,
    spikes: priceSpikeList,
    topAirlines: topAirlinePricing,
    seasonal: monthlyFareTrends,
    summary: getAirlinesSummary(),
  };
};

/**
 * Fetch Airline Analysis data
 */
export const getAirlineAnalysis = async (filters = {}) => {
  await delay();
  return {
    airlines: airlinesData,
    summary: getAirlinesSummary(),
  };
};

/**
 * Fetch Market Forecast data
 */
export const getForecast = async () => {
  await delay();
  return {
    overview: forecastOverview,
    horizons: forecastHorizonsTable,
    routes: selectedRouteOutlook,
    factors: marketFactors,
  };
};

/**
 * Fetch User & Platform History
 */
export const getHistory = async () => {
  await delay();
  return {
    recentSearches: recentSearchesList,
    loginActivity: loginActivityList,
  };
};

/**
 * Fetch Route Explorer Data
 */
export const getRouteExplorerData = async (routeKey = 'BHO-DEL') => {
  await delay();
  return routesData[routeKey] || routesData['BHO-DEL'];
};

/**
 * Fetch Seasonal Trends Data
 */
export const getSeasonalTrendsData = async () => {
  await delay();
  return {
    overview: seasonalOverview,
    monthly: monthlySeasonalData,
    higherPeriods: higherFarePeriods,
    lowerPeriods: lowerFarePeriods,
    cards: seasonalCards,
  };
};

/**
 * Fetch Reports Data
 */
export const getReportsData = async () => {
  await delay();
  return {
    overview: reportsOverview,
    availableReports: availableReportsList,
    latestReport: latestReportData,
    types: reportTypesCards,
  };
};

export default {
  getDashboardData,
  getAirlineAnalysis,
  getForecast,
  getHistory,
  getRouteExplorerData,
  getSeasonalTrendsData,
  getReportsData,
  getEconomicImpactData,
  getShockPropagationData,
  getAnomalyDetectionData,
};

/**
 * Fetch Economic Impact Analysis data
 */
export const getEconomicImpactData = async () => {
  await delay();
  return {
    indicators: economicIndicators,
    chart: economicVsAirfareChart,
    routeLag: routeLagAnalysis,
    insights: economicInsights,
    fareInvestigation: economicFareInvestigation,
  };
};

/**
 * Fetch Shock Propagation data
 */
export const getShockPropagationData = async () => {
  await delay();
  return {
    events: shockEvents,
    overview: shockOverview,
    timeline: propagationTimeline,
    stats: shockStats,
    routeResponse: shockRouteResponse,
    overallMovement: shockOverallMovement,
  };
};

/**
 * Fetch Anomaly Detection data
 */
export const getAnomalyDetectionData = async () => {
  await delay();
  return {
    overview: anomalyOverview,
    classifications: anomalyClassifications,
    records: anomalyRecords,
    fareInvestigation: anomalyFareInvestigation,
    signals: recentIntelligenceSignals,
  };
};
