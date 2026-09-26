import React from 'react';
import {
  TrendingUp,
  Calendar,
  Shield,
  BarChart2,
  Info,
  Users,
  Plane,
  Lightbulb,
  ArrowUp,
} from 'lucide-react';
import {
  forecastOverview,
  forecastHorizonsTable,
  selectedRouteOutlook,
  marketFactors,
} from '../data/forecast';
import { formatINR } from '../utils/formatters';

export const MarketForecast = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Market Forecast
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Understand the expected direction of airfare prices in the coming days.
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
        {/* Card 1: Overall Outlook */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Overall Outlook</div>
          <div className="text-xl sm:text-2xl font-bold text-amber-600 tracking-tight mt-1">
            {forecastOverview.overallOutlook}
          </div>
          <div className="text-xs font-semibold text-amber-600 flex items-center gap-0.5 mt-1">
            <ArrowUp className="w-3 h-3" />
            <span>Expected</span>
          </div>
        </div>

        {/* Card 2: Next 7 Days */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Next 7 Days</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {forecastOverview.next7DaysChange}
          </div>
          <div className="text-xs text-slate-400 mt-1">Expected movement</div>
        </div>

        {/* Card 3: Next 15 Days */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-3">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Next 15 Days</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {forecastOverview.next15DaysChange}
          </div>
          <div className="text-xs text-slate-400 mt-1">Expected movement</div>
        </div>

        {/* Card 4: Forecast Confidence */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497] mb-3">
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Forecast Confidence</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {forecastOverview.confidenceScore}
          </div>
          <div className="text-xs text-slate-400 mt-1">{forecastOverview.confidenceSubtitle}</div>
        </div>
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card: Airfare Outlook */}
          <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Airfare Outlook
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                MODERATE INCREASE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div>
                <span className="text-xs text-slate-400 block">Current Average Index</span>
                <span className="text-2xl font-bold text-slate-900 block mt-1">
                  {forecastOverview.currentIndex}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Expected Direction</span>
                <span className="text-lg font-bold text-amber-600 flex items-center gap-1 mt-1">
                  <ArrowUp className="w-4 h-4" />
                  <span>Increasing</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Expected Change</span>
                <span className="text-2xl font-bold text-slate-900 block mt-1">
                  +4–7%
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Forecast Period</span>
                <span className="text-lg font-bold text-slate-900 block mt-1">
                  Next 7 Days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                Current fare patterns indicate a moderate increase in domestic airfare over the next 7 days.
              </span>
            </div>
          </div>

          {/* Card: Forecast Horizons */}
          <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Forecast Horizons
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 text-left border-b border-slate-100">
                    <th className="pb-3 font-medium">Forecast Period</th>
                    <th className="pb-3 font-medium text-left">Expected Change</th>
                    <th className="pb-3 font-medium text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {forecastHorizonsTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 font-medium text-slate-800">{row.period}</td>
                      <td className="py-3.5 font-bold text-slate-900">{row.expectedChange}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${row.badgeClass}`}
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
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card: What May Affect Airfares? */}
          <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                What May Affect Airfares?
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {marketFactors.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${f.iconBg} ${f.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    {f.iconType === 'Users' && <Users className="w-4 h-4" />}
                    {f.iconType === 'Calendar' && <Calendar className="w-4 h-4" />}
                    {f.iconType === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{f.title}</div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Selected Route Outlook */}
          <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-blue-500 -rotate-45" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Selected Route Outlook
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 text-left border-b border-slate-100">
                    <th className="pb-3 font-medium">Route</th>
                    <th className="pb-3 font-medium text-left">Current Fare</th>
                    <th className="pb-3 font-medium text-left">Expected Change</th>
                    <th className="pb-3 font-medium text-right">Outlook</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedRouteOutlook.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-medium text-slate-800">{r.route}</td>
                      <td className="py-3 font-bold text-slate-900">{formatINR(r.currentFare)}</td>
                      <td className="py-3 font-semibold text-rose-600">{r.expectedChange}</td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${r.outlookClass}`}
                        >
                          {r.outlook}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Bottom Overall Outlook Banner & ARIMA Methodology */}
      <div className="bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-900">Overall Outlook</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Domestic airfare is currently showing an upward trend. The next 7–15 days are expected to see moderate price increases if current patterns continue.
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Forecasts are estimates based on historical and recent airfare patterns and may change as new fare data is collected.
          </p>
          <p className="text-[11px] text-slate-500 pt-0.5">
            <strong>Methodology ({forecastOverview.methodology}):</strong> {forecastOverview.methodologyExplanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketForecast;
