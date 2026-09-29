import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Info,
  ArrowUp,
  ArrowRight,
  DollarSign,
  Globe,
  AlertTriangle,
  Database,
  X,
  Clock,
  Plane,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  economicIndicators,
  economicVsAirfareChart,
  routeLagAnalysis,
  economicInsights,
  economicFareInvestigation,
  economicInsightText,
} from '../data/intelligence';

// Helper: status badge colour
const lagStatusClass = (statusColor) => {
  switch (statusColor) {
    case 'green':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'amber':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'red':
      return 'bg-rose-50 text-rose-600 border border-rose-100';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

// Indicator icon helper
const IndicatorIcon = ({ indicator }) => {
  const base = 'w-9 h-9 rounded-full flex items-center justify-center shrink-0';
  if (indicator === 'atf')
    return (
      <div className={`${base} bg-[#e8f7f5]`}>
        <Plane className="w-4 h-4 text-[#0fa497] -rotate-45" />
      </div>
    );
  if (indicator === 'usd')
    return (
      <div className={`${base} bg-blue-50`}>
        <DollarSign className="w-4 h-4 text-blue-500" />
      </div>
    );
  if (indicator === 'inf')
    return (
      <div className={`${base} bg-rose-50`}>
        <AlertTriangle className="w-4 h-4 text-rose-500" />
      </div>
    );
  // airfare index
  return (
    <div className={`${base} bg-purple-50`}>
      <Database className="w-4 h-4 text-purple-500" />
    </div>
  );
};

const INDICATOR_KEYS = ['atf', 'usd', 'inf', 'airfare'];
const indicatorEntries = [
  { key: 'atf', data: economicIndicators.atfPrice, icon: 'atf' },
  { key: 'usd', data: economicIndicators.usdInr, icon: 'usd' },
  { key: 'inf', data: economicIndicators.inflation, icon: 'inf' },
  { key: 'airfare', data: economicIndicators.airfareIndex, icon: 'airfare' },
];

const FACTOR_OPTIONS = ['ATF / Fuel Price', 'USD / INR', 'Inflation'];

export const EconomicImpact = () => {
  const navigate = useNavigate();
  const [selectedFactor, setSelectedFactor] = useState('ATF / Fuel Price');
  const [showPanel, setShowPanel] = useState(true);
  const [period, setPeriod] = useState('Last 90 Days');
  const [region, setRegion] = useState('All India');

  const insightIconEl = (icon) => {
    if (icon === 'up')
      return <ArrowUp className="w-4 h-4 text-[#0fa497] shrink-0 mt-0.5" />;
    if (icon === 'clock')
      return <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />;
    if (icon === 'plane')
      return <Plane className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 -rotate-45" />;
    return <Info className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Economic Impact Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Understand how economic indicators relate to changes in Indian airfare.
          </p>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef2f6] rounded-xl text-sm text-slate-700 shadow-xs">
            <span className="text-slate-400 text-xs">📅</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option>Last 90 Days</option>
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>Last 1 Year</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef2f6] rounded-xl text-sm text-slate-700 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option>All India</option>
              <option>North India</option>
              <option>South India</option>
              <option>East India</option>
              <option>West India</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {indicatorEntries.map(({ key, data, icon }) => (
          <div
            key={key}
            className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs"
          >
            <div className="flex items-start gap-3">
              <IndicatorIcon indicator={icon} />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
                  {data.label}
                </div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 leading-tight">
                  {data.value}
                </div>
                <div
                  className={`text-[11px] font-medium flex items-center gap-0.5 mt-1 ${
                    data.changeType === 'up'
                      ? 'text-[#0fa497]'
                      : 'text-rose-500'
                  }`}
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>{data.change}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {data.changeLabel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex flex-col">
          {/* Chart header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Economic Factor vs Airfare Movement
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef2f6] rounded-xl text-sm text-slate-700 shadow-xs self-start">
              <select
                value={selectedFactor}
                onChange={(e) => setSelectedFactor(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
              >
                {FACTOR_OPTIONS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#0fa497]" />
              ATF Price (₹/L)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-400" />
              Airfare Index
            </span>
          </div>

          {/* Chart */}
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={economicVsAirfareChart}
                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis
                  yAxisId="atf"
                  orientation="left"
                  domain={[70, 110]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis
                  yAxisId="index"
                  orientation="right"
                  domain={[110, 140]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Line
                  yAxisId="atf"
                  type="monotone"
                  dataKey="atf"
                  stroke="#0fa497"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#0fa497' }}
                />
                <Line
                  yAxisId="index"
                  type="monotone"
                  dataKey="index"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#60a5fa' }}
                  strokeDasharray="5 3"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Lag annotation badge */}
            <div
              className="absolute top-6 left-[60%] bg-slate-800 text-white text-[10px] font-medium px-2 py-0.5 rounded-md shadow pointer-events-none"
              style={{ transform: 'translateX(-50%)' }}
            >
              Lag: 12 days
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#0fa497] font-medium">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{economicInsightText}</span>
          </div>
        </div>

        {/* Right: Fare Investigation Panel */}
        <div className="lg:col-span-4 space-y-4">
          {showPanel ? (
            <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-900">
                    Fare Investigation
                  </span>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Classification */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {economicFareInvestigation.classification}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-300" />
                  Confidence: {economicFareInvestigation.confidence}%
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Plane className="w-4 h-4 text-[#0fa497] -rotate-45" />
                <span className="text-base font-bold text-slate-900">
                  {economicFareInvestigation.route}
                </span>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <div className="text-slate-400 mb-0.5">Airline</div>
                  <div className="font-semibold text-slate-800">
                    {economicFareInvestigation.airline}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-0.5">Observed Fare</div>
                  <div className="font-semibold text-slate-800">
                    {economicFareInvestigation.observedFare}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-0.5">Expected Range</div>
                  <div className="font-semibold text-slate-800">
                    {economicFareInvestigation.expectedRange}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-0.5">Historical Avg.</div>
                  <div className="font-semibold text-slate-800">
                    {economicFareInvestigation.historicalAvg}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-[#f0faf9] rounded-xl p-3 flex items-start gap-2 text-xs text-slate-600">
                <Info className="w-3.5 h-3.5 text-[#0fa497] shrink-0 mt-0.5" />
                <span>{economicFareInvestigation.note}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPanel(true)}
              className="w-full bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs text-sm text-slate-500 hover:text-slate-700 text-left"
            >
              Show Fare Investigation →
            </button>
          )}

          {/* Insights card */}
          <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#0fa497]" />
              <span className="text-sm font-bold text-slate-900">Insights</span>
            </div>
            <div className="space-y-3">
              {economicInsights.map((ins) => (
                <div key={ins.id} className="flex items-start gap-2">
                  {insightIconEl(ins.icon)}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ins.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Route-wise Lag Analysis Table */}
      <div className="bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-[#0fa497] -rotate-45" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Route-wise Lag Analysis
            </h3>
          </div>
          <button className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-0.5">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 text-left border-b border-slate-100">
                <th className="pb-2.5 font-normal">Route</th>
                <th className="pb-2.5 font-normal">Economic Change</th>
                <th className="pb-2.5 font-normal">Airfare Change</th>
                <th className="pb-2.5 font-normal">Observed Lag</th>
                <th className="pb-2.5 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {routeLagAnalysis.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-medium text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      {row.route}
                    </div>
                  </td>
                  <td className="py-3 text-slate-600">{row.economicChange}</td>
                  <td className="py-3 font-semibold text-[#0fa497]">
                    {row.airfareChange}
                  </td>
                  <td className="py-3 text-slate-700">{row.observedLag}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${lagStatusClass(
                        row.statusColor
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer breadcrumb links */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1 pb-2 border-t border-slate-100">
        {[
          { label: 'Route Explorer', to: '/route-explorer' },
          { label: 'Economic Impact', to: '/economic-impact' },
          { label: 'Shock Propagation', to: '/shock-propagation' },
          { label: 'Anomaly Detection', to: '/anomaly-detection' },
          { label: 'Forecast', to: '/forecast' },
          { label: 'Reports', to: '/reports' },
        ].map(({ label, to }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="hover:text-[#0fa497] transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EconomicImpact;
