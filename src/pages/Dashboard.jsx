import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  TrendingUp,
  AlertTriangle,
  MapPin,
  Plane,
  Database,
  Clock,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Calendar,
  Search,
  ArrowLeftRight,
  DollarSign,
  Activity,
  Shield,
  BarChart2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import AirlineLogo from '../components/AirlineLogo';
import {
  dashboardOverview,
  indexTrend7D,
  indexTrend30D,
  indexTrend1Y,
  priceSpikeList,
  topAirlinePricing,
  monthlyFareTrends,
} from '../data/indexData';
import {
  economicDashboardSummary,
  anomalyDashboardSummary,
  shockDashboardSummary,
  recentIntelligenceSignals,
} from '../data/intelligence';

export const Dashboard = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const showToast = outletContext?.showToast || console.log;

  const [activeTimeframe, setActiveTimeframe] = useState('7D');
  const [routeSearchOrigin, setRouteSearchOrigin] = useState('Bhopal (BHO)');
  const [routeSearchDestination, setRouteSearchDestination] = useState('Delhi (DEL)');

  const getChartData = () => {
    switch (activeTimeframe) {
      case '30D':
        return indexTrend30D;
      case '1Y':
        return indexTrend1Y;
      case '7D':
      default:
        return indexTrend7D;
    }
  };

  const handleRouteSearch = (e) => {
    e.preventDefault();
    showToast(`Investigating corridor fares: ${routeSearchOrigin} ⇄ ${routeSearchDestination}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Good Evening, Alina</span>
            <span className="text-xl">☀️</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here's your latest airfare overview for India.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Data updated · {dashboardOverview.fullTimestamp}</span>
        </div>
      </div>

      {/* 6 Top Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Airfare Index */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497] mb-3">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Airfare Index</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            {dashboardOverview.currentIndex}
          </div>
          <div className="text-[11px] font-medium text-[#0fa497] flex items-center gap-0.5 mt-1">
            <ArrowUp className="w-3 h-3" />
            <span>{dashboardOverview.indexChange}% {dashboardOverview.indexChangeLabel}</span>
          </div>
        </div>

        {/* Card 2: Price Spikes */}
        <div
          onClick={() => navigate('/history')}
          className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Price Spikes</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            {dashboardOverview.priceSpikes}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
            {dashboardOverview.priceSpikesSubtitle}
          </div>
          <div className="text-[10px] text-rose-600 font-medium mt-1 truncate">
            {dashboardOverview.highestSpikeText}
          </div>
        </div>

        {/* Card 3: Routes Tracked */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Routes Tracked</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            {dashboardOverview.routesTracked}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {dashboardOverview.routesSubtitle}
          </div>
        </div>

        {/* Card 4: Total Airlines (Clickable to /airlines) */}
        <div
          onClick={() => navigate('/airlines')}
          className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-3">
            <Plane className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Total Airlines</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            {dashboardOverview.totalAirlines}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {dashboardOverview.totalAirlinesSubtitle}
          </div>
        </div>

        {/* Card 5: Total Records */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3">
            <Database className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Total Records</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            {dashboardOverview.totalRecords}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {dashboardOverview.recordsSubtitle}
          </div>
        </div>

        {/* Card 6: Last Updated */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Last Updated</div>
          <div className="text-sm font-bold text-slate-900 tracking-tight mt-1.5">
            {dashboardOverview.lastUpdated}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {dashboardOverview.lastUpdatedTime}
          </div>
        </div>
      </div>

      {/* Intelligence Summary Row — Economic Impact, Anomaly Detection, Shock Propagation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Economic Impact Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#e8f7f5] flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-[#0fa497]" />
              </div>
              <span className="text-sm font-bold text-slate-800">Economic Impact</span>
            </div>
            <span className="text-[11px] font-semibold text-[#0fa497] bg-[#e8f7f5] px-2 py-0.5 rounded-full">
              +{economicDashboardSummary.airfareResponse}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <div className="text-[10px] text-slate-400">ATF Increase</div>
              <div className="text-sm font-bold text-slate-900">{economicDashboardSummary.atfChange}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Airfare Response</div>
              <div className="text-sm font-bold text-slate-900">{economicDashboardSummary.airfareResponse}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Observed Lag</div>
              <div className="text-sm font-bold text-slate-900">{economicDashboardSummary.observedLag}</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">{economicDashboardSummary.note}</p>
          <button
            onClick={() => navigate('/economic-impact')}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#0fa497] hover:underline"
          >
            View Analysis <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Anomaly Detection Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <span className="text-sm font-bold text-slate-800">Anomaly Detection</span>
            </div>
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
              {anomalyDashboardSummary.unusualMovements} signals
            </span>
          </div>
          <div className="text-base font-bold text-slate-900 mb-2">
            {anomalyDashboardSummary.unusualMovements} unusual movements
          </div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {anomalyDashboardSummary.normalCount} Normal
            </span>
            <span className="flex items-center gap-1 text-[11px] text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              {anomalyDashboardSummary.possibleDataAnomalies} Data Anomalies
            </span>
            <span className="flex items-center gap-1 text-[11px] text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              {anomalyDashboardSummary.possibleMarketShocks} Market Shocks
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">{anomalyDashboardSummary.note}</p>
          <button
            onClick={() => navigate('/anomaly-detection')}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#0fa497] hover:underline"
          >
            View Detection <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Shock Propagation Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <span className="text-sm font-bold text-slate-800">Shock Propagation</span>
            </div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              Latest Event
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-3">{shockDashboardSummary.latestShock}</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <div className="text-[10px] text-slate-400">First Response</div>
              <div className="text-sm font-bold text-slate-900">{shockDashboardSummary.firstAffectedRoute}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Fastest Lag</div>
              <div className="text-sm font-bold text-slate-900">{shockDashboardSummary.observedLag}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Index Response</div>
              <div className="text-sm font-bold text-[#0fa497]">{shockDashboardSummary.nationalIndexResponse}</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">Route-level movements preceded the broader index response.</p>
          <button
            onClick={() => navigate('/shock-propagation')}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#0fa497] hover:underline"
          >
            View Propagation <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Row 2: India Airfare Price Index Chart & Price Spike Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: India Airfare Price Index Chart (~62% / 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[#0fa497]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  India Airfare Price Index
                </h3>
              </div>

              {/* Timeframe selector pills */}
              <div className="flex items-center gap-1 text-xs">
                {['7D', '30D', '3M', '1Y'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTimeframe(t)}
                    className={`px-3 py-1 rounded-xl font-medium transition-colors ${
                      activeTimeframe === t
                        ? 'bg-[#e8f7f5] text-[#0fa497] font-semibold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-60 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData()}
                  margin={{ top: 20, right: 20, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="mintGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0fa497" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0fa497" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                  />
                  <YAxis
                    domain={[90, 140]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    ticks={[100, 110, 120, 130, 140]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                    }}
                    formatter={(val) => [`${val}`, 'Price Index']}
                  />
                  <Area
                    type="monotone"
                    dataKey="index"
                    stroke="#0fa497"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#mintGradient)"
                    dot={{ r: 3, fill: '#0fa497' }}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* End Point Badge matching reference screenshot */}
              <div className="absolute top-2 right-4 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-xs font-bold text-slate-800 shadow-xs">
                {dashboardOverview.currentIndex}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#0fa497] font-medium">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>The index is {dashboardOverview.indexChange}% higher than the previous period.</span>
          </div>
        </div>

        {/* Right: Price Spike Detection Table (~38% / 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Price Spike Detection
                </h3>
              </div>
              <button
                onClick={() => navigate('/history')}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-0.5"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-100">
                  <th className="pb-2 font-normal">Route</th>
                  <th className="pb-2 font-normal text-right">Change</th>
                  <th className="pb-2 font-normal text-right pr-1">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {priceSpikeList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 font-medium text-slate-800">{item.route}</td>
                    <td className="py-2.5 text-right font-semibold text-rose-600">
                      ↑ {item.changeValue}%
                    </td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          item.status === 'High Spike'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : item.status === 'Rising'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-yellow-50 text-yellow-800 border border-yellow-100'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 3: Bottom 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Airline Pricing Analysis (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Airline Pricing Analysis
                </h3>
              </div>
              <button
                onClick={() => navigate('/airlines')}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-0.5"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {topAirlinePricing.map((a) => (
                <div
                  key={a.name}
                  onClick={() => navigate('/airlines')}
                  className="bg-slate-50/70 hover:bg-slate-100/70 p-2.5 rounded-xl text-center border border-slate-100 cursor-pointer transition-colors"
                >
                  <div className="flex justify-center mb-1.5">
                    <AirlineLogo type={a.logoType} size="md" />
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 truncate">{a.name}</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{a.fare}</div>
                  <div
                    className={`text-[10px] font-semibold mt-0.5 ${
                      a.changeType === 'up' ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {a.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Seasonal Fare Analysis (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Seasonal Fare Analysis
                </h3>
              </div>
              <button
                onClick={() => navigate('/seasonal-trends')}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-0.5 cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mb-2">Average Domestic Fare by Month</p>

            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyFareTrends} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 9, fill: '#94a3b8' }}
                  />
                  <YAxis hide domain={[0, 8000]} />
                  <Bar
                    dataKey="fare"
                    radius={[3, 3, 0, 0]}
                    fill="#bfe9e4"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[10px]">
            <div className="p-2 rounded-lg bg-rose-50/50 border border-rose-100">
              <span className="font-bold text-rose-700 block">↑ Higher Fares</span>
              <span className="text-slate-500 text-[9px]">Apr - Jun (Summer Holidays)<br />Oct - Nov (Festive Season)</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <span className="font-bold text-emerald-700 block">↓ Lower Fares</span>
              <span className="text-slate-500 text-[9px]">Jul - Aug (Monsoon)<br />Mid-week (All months)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Market Trend Forecasting & Route Explorer (4 cols) */}
        <div className="md:col-span-4 space-y-3.5">
          {/* Top Half: Market Trend Forecasting */}
          <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-1">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                  Market Trend Forecasting
                </h3>
              </div>
              <button
                onClick={() => navigate('/forecast')}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-0.5 cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[11px] text-slate-400 block">Next 7 Days</span>
                <span className="text-xl font-bold text-slate-900">+4 – 7%</span>
                <span className="text-[10px] text-slate-400 block">expected change</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
                <ArrowUp className="w-3 h-3" />
                <span>Moderate Increase</span>
              </span>
            </div>
          </div>

          {/* Bottom Half: Route Explorer Quick Tool */}
          <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-bold text-slate-900">Route Explorer</span>
              </div>
              <span
                onClick={() => navigate('/route-explorer')}
                className="text-[11px] text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
              >
                Try it now →
              </span>
            </div>

            <form onSubmit={handleRouteSearch} className="flex items-center gap-1.5 my-2">
              <input
                type="text"
                value={routeSearchOrigin}
                onChange={(e) => setRouteSearchOrigin(e.target.value)}
                className="w-full text-[11px] py-1 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              />
              <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={routeSearchDestination}
                onChange={(e) => setRouteSearchDestination(e.target.value)}
                className="w-full text-[11px] py-1 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold shrink-0"
              >
                Search
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] block">Current Fare</span>
                <span className="font-bold text-slate-800">₹4,820</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">7-Day Change</span>
                <span className="font-semibold text-rose-600">↑ 8.2%</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Status</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700">
                  Rising
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Intelligence Signals + Current Market Signal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Intelligence Signals */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#0fa497]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recent Intelligence Signals
              </h3>
            </div>
            <button
              onClick={() => navigate('/anomaly-detection')}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-0.5"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-0 divide-y divide-slate-50">
            {recentIntelligenceSignals.map((sig) => {
              const iconColor = {
                red: 'text-rose-500',
                teal: 'text-[#0fa497]',
                amber: 'text-amber-500',
                slate: 'text-slate-400',
              }[sig.typeColor] || 'text-slate-400';
              const severityClass = {
                red: 'bg-rose-50 text-rose-600 border border-rose-100',
                teal: 'bg-[#e8f7f5] text-[#0fa497] border border-[#c8ede9]',
                amber: 'bg-amber-50 text-amber-700 border border-amber-100',
                slate: 'bg-slate-100 text-slate-500',
              }[sig.severityColor] || 'bg-slate-100 text-slate-500';
              return (
                <div
                  key={sig.id}
                  className="flex items-center gap-3 py-3 hover:bg-slate-50/50 transition-colors -mx-5 px-5"
                >
                  <AlertTriangle className={`w-4 h-4 ${iconColor} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <span className={`text-[11px] font-semibold ${iconColor}`}>
                      {sig.type}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-2">
                      {sig.description}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{sig.time}</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${severityClass}`}
                  >
                    {sig.severity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Market Signal (Shock Propagation) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#0fa497]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Current Market Signal
              </h3>
            </div>
            {/* Signal flow */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 border border-slate-100 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#0fa497]" />
                ATF increase
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 border border-slate-100 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                Route-level fare increases detected
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 border border-slate-100 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-purple-500" />
                Broader index movement observed
              </div>
            </div>
          </div>
          {/* Propagation time */}
          <div className="bg-[#f0faf9] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0fa497]" />
              <span className="text-xs text-slate-600">Observed Propagation Time</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">15 Days</div>
            <p className="text-xs text-slate-500 mb-3">
              Multiple route-level fare movements were observed following the selected external event.
            </p>
            <button
              onClick={() => navigate('/shock-propagation')}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Explore Shock Propagation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
