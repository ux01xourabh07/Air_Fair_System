import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, SignIn, SignUp } from '@clerk/react';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AirlineAnalysis from './pages/AirlineAnalysis';
import MarketForecast from './pages/MarketForecast';
import History from './pages/History';
import RouteExplorer from './pages/RouteExplorer';
import SeasonalTrends from './pages/SeasonalTrends';
import Reports from './pages/Reports';
import EconomicImpact from './pages/EconomicImpact';
import ShockPropagation from './pages/ShockPropagation';
import AnomalyDetection from './pages/AnomalyDetection';

const authPageStyle = "min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4";

function RequireAuth({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  return children;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Clerk embedded auth pages */}
        <Route
          path="/sign-in/*"
          element={
            <div className={authPageStyle}>
              <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/dashboard" />
            </div>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <div className={authPageStyle}>
              <SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/dashboard" />
            </div>
          }
        />

        {/* Dashboard shell */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="route-explorer" element={<RequireAuth><RouteExplorer /></RequireAuth>} />
          <Route path="airlines" element={<RequireAuth><AirlineAnalysis /></RequireAuth>} />
          <Route path="seasonal-trends" element={<RequireAuth><SeasonalTrends /></RequireAuth>} />
          <Route path="forecast" element={<RequireAuth><MarketForecast /></RequireAuth>} />
          <Route path="reports" element={<RequireAuth><Reports /></RequireAuth>} />
          <Route path="history" element={<RequireAuth><History /></RequireAuth>} />
          <Route path="economic-impact" element={<RequireAuth><EconomicImpact /></RequireAuth>} />
          <Route path="shock-propagation" element={<RequireAuth><ShockPropagation /></RequireAuth>} />
          <Route path="anomaly-detection" element={<RequireAuth><AnomalyDetection /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
