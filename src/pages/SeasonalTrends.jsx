import React, { useState } from 'react';
import {
  IndianRupee,
  ArrowUp,
  ArrowDown,
  Calendar,
  Sun,
  CloudRain,
  Sparkles,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from 'recharts';
import {
  seasonalOverview,
  monthlySeasonalData,
  higherFarePeriods,
  lowerFarePeriods,
  seasonalCards,
} from '../data/seasonal';
import { formatINR } from '../utils/formatters';

export const SeasonalTrends = () => {
  const [periodYear, setPeriodYear] = useState('2026');
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [selectedRoute, setSelectedRoute] = useState('All Routes');

  // Custom label renderer to display ₹ fare right above each bar like reference image
  const renderCustomBarLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#475569"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
      >
        ₹{value.toLocaleString('en-IN')}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Seasonal Fare Trends
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Understand how airfare changes across different travel periods.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Live data
          </span>
          <span>|</span>
          <span>Last updated: 6:30 PM</span>
        </div>
      </div>

      {/* Top 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Average Fare */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Average Fare</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{seasonalOverview.averageFare.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Card 2: Highest Period */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3">
            <ArrowUp className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Highest Period</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{seasonalOverview.highestPeriod.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Card 3: Lowest Period */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497] mb-3">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Lowest Period</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{seasonalOverview.lowestPeriod.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Card 4: Peak Months */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-3">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Peak Months</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {seasonalOverview.peakMonths}
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Period:</span>
          <select
            value={periodYear}
            onChange={(e) => setPeriodYear(e.target.value)}
            className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 pr-7 text-slate-700 shadow-xs focus:outline-none cursor-pointer"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 pr-7 text-slate-700 shadow-xs focus:outline-none cursor-pointer"
          >
            <option value="All India">All India</option>
            <option value="North India">North India</option>
            <option value="South India">South India</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500">Route:</span>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 pr-7 text-slate-700 shadow-xs focus:outline-none cursor-pointer"
          >
            <option value="All Routes">All Routes</option>
            <option value="Trunk Routes">Trunk Routes</option>
            <option value="UDAN Sectors">UDAN Sectors</option>
          </select>
        </div>
      </div>

      {/* Main Chart Card: Average Airfare by Month */}
      <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-blue-500">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Average Airfare by Month
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Average domestic airfare observed across the year.
        </p>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlySeasonalData}
              margin={{ top: 25, right: 10, left: -25, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
              />
              <YAxis
                domain={[0, 8000]}
                ticks={[0, 2000, 4000, 6000, 8000]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickFormatter={(val) => val.toLocaleString('en-IN')}
                label={{
                  value: 'Average Fare (₹)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#94a3b8',
                  fontSize: 10,
                  offset: 35,
                }}
              />
              <Tooltip
                formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Average Fare']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: 'none',
                }}
              />
              <Bar
                dataKey="fare"
                radius={[4, 4, 0, 0]}
                barSize={38}
                label={renderCustomBarLabel}
              >
                {monthlySeasonalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Period Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Higher Fare Periods */}
        <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                <ArrowUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Higher Fare Periods
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
              Peak travel periods
            </span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {higherFarePeriods.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 text-slate-700">
                <span className="font-semibold text-slate-800">{item.period}</span>
                <span className="font-medium text-slate-600">{item.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Lower Fare Periods */}
        <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497]">
                <ArrowDown className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Lower Fare Periods
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              Generally lower observed fares
            </span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {lowerFarePeriods.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 text-slate-700">
                <span className="font-semibold text-slate-800">{item.period}</span>
                <span className="font-medium text-slate-600">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: 3 Seasonal Period Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {seasonalCards.map((c, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                {c.iconType === 'sun' && <Sun className="w-4 h-4 text-amber-500" />}
                {c.iconType === 'rain' && <CloudRain className="w-4 h-4 text-blue-500" />}
                {c.iconType === 'festival' && <Sparkles className="w-4 h-4 text-purple-500" />}
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{c.season}</span>
                <span className="text-lg font-bold text-slate-900 mt-0.5 block">{c.fare}</span>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${c.statusClass}`}
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>

      {/* Row 5: Seasonal Insight Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">Seasonal Insight</div>
          <p className="text-xs text-slate-500 mt-0.5">
            {seasonalOverview.insightText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeasonalTrends;
