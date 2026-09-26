import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AirlineAnalysis from './pages/AirlineAnalysis';
import MarketForecast from './pages/MarketForecast';
import History from './pages/History';
import RouteExplorer from './pages/RouteExplorer';
import SeasonalTrends from './pages/SeasonalTrends';
import Reports from './pages/Reports';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Default redirect to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Main 7 Platform Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="route-explorer" element={<RouteExplorer />} />
          <Route path="airlines" element={<AirlineAnalysis />} />
          <Route path="seasonal-trends" element={<SeasonalTrends />} />
          <Route path="forecast" element={<MarketForecast />} />
          <Route path="reports" element={<Reports />} />
          <Route path="history" element={<History />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
