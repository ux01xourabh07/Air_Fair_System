import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Database,
  Shield,
  Info,
  X,
  ChevronRight,
  Search,
  ArrowUp,
  Plane,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import {
  anomalyOverview,
  anomalyClassifications,
  anomalyRecords,
  anomalyFareInvestigation,
  recentIntelligenceSignals,
} from '../data/intelligence';

// Assessment badge helper
const assessmentBadge = (assessment, assessmentColor) => {
  const map = {
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-100',
    red: 'bg-rose-50 text-rose-600 border border-rose-100',
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
        map[assessmentColor] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {assessment}
    </span>
  );
};

const signalSeverityClass = (color) => {
  switch (color) {
    case 'red':
      return 'bg-rose-50 text-rose-600 border border-rose-100';
    case 'teal':
      return 'bg-[#e8f7f5] text-[#0fa497] border border-[#c8ede9]';
    case 'amber':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    default:
      return 'bg-slate-100 text-slate-500';
  }
};

const signalTypeIconColor = (color) => {
  switch (color) {
    case 'red':
      return 'text-rose-500';
    case 'teal':
      return 'text-[#0fa497]';
    case 'amber':
      return 'text-amber-500';
    default:
      return 'text-slate-400';
  }
};

export const AnomalyDetection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(anomalyRecords[0]);
  const [showPanel, setShowPanel] = useState(true);

  const filtered = anomalyRecords.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.route.toLowerCase().includes(q) ||
      r.airline.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Anomaly Detection
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            AI-powered analysis to identify unusual fare movements and validate market changes.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Data updated · 21 Sep 2026, 6:30 PM</span>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Anomalies */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <Shield className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Total Anomalies
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">
            {anomalyOverview.totalAnomalies}
          </div>
          <div className="text-[11px] font-medium text-[#0fa497] flex items-center gap-0.5 mt-1">
            <ArrowUp className="w-3 h-3" />
            <span>{anomalyOverview.anomalyChange} vs. previous period</span>
          </div>
        </div>

        {/* Total Records */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#e8f7f5] flex items-center justify-center mb-3">
            <Database className="w-4 h-4 text-[#0fa497]" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Total Records
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">
            {anomalyOverview.totalRecords}
          </div>
          <div className="text-[11px] font-medium text-[#0fa497] flex items-center gap-0.5 mt-1">
            <ArrowUp className="w-3 h-3" />
            <span>{anomalyOverview.recordsChange} vs. previous period</span>
          </div>
        </div>

        {/* Flagged Records */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Flagged Records
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">
            {anomalyOverview.flaggedRecords.toLocaleString()}
          </div>
          <div className="text-[11px] font-medium text-[#0fa497] flex items-center gap-0.5 mt-1">
            <ArrowUp className="w-3 h-3" />
            <span>{anomalyOverview.flaggedChange} vs. previous period</span>
          </div>
        </div>

        {/* Normal Movements */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Normal Movements
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">
            {anomalyOverview.normalMovements}
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Normal {anomalyOverview.normalCount.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              {anomalyOverview.dataAnomalyCount}
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              {anomalyOverview.marketShockCount}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Classification + Table */}
        <div className="lg:col-span-8 space-y-5">
          {/* AI Classification Overview */}
          <div className="bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0fa497]" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  AI Classification Overview
                </h3>
              </div>
              <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                How it works?
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {anomalyClassifications.map((cls) => {
                const colorMap = {
                  green: {
                    bg: 'bg-emerald-50',
                    border: 'border-emerald-100',
                    icon: 'text-emerald-500',
                    text: 'text-emerald-700',
                  },
                  amber: {
                    bg: 'bg-amber-50',
                    border: 'border-amber-100',
                    icon: 'text-amber-500',
                    text: 'text-amber-700',
                  },
                  red: {
                    bg: 'bg-rose-50',
                    border: 'border-rose-100',
                    icon: 'text-rose-500',
                    text: 'text-rose-600',
                  },
                };
                const c = colorMap[cls.color];
                return (
                  <div
                    key={cls.id}
                    className={`${c.bg} border ${c.border} rounded-xl p-3`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      {cls.color === 'green' ? (
                        <CheckCircle className={`w-4 h-4 ${c.icon}`} />
                      ) : cls.color === 'amber' ? (
                        <AlertTriangle className={`w-4 h-4 ${c.icon}`} />
                      ) : (
                        <AlertTriangle className={`w-4 h-4 ${c.icon}`} />
                      )}
                      <span
                        className={`text-[11px] font-bold ${c.text} tracking-wide uppercase`}
                      >
                        {cls.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cls.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Anomalies Table */}
          <div className="bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Recent Anomalies & Unusual Movements
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 ml-6">
                  AI has flagged the following fare movements for further review.
                </p>
              </div>
              {/* Search */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search route, airline, or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-slate-700 outline-none w-44 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 text-left border-b border-slate-100">
                    <th className="pb-2.5 font-normal">Time</th>
                    <th className="pb-2.5 font-normal">Route</th>
                    <th className="pb-2.5 font-normal">Airline</th>
                    <th className="pb-2.5 font-normal text-right">Fare (₹)</th>
                    <th className="pb-2.5 font-normal">Expected Range (₹)</th>
                    <th className="pb-2.5 font-normal">AI Assessment</th>
                    <th className="pb-2.5 font-normal flex items-center gap-1">
                      Reason
                      <Info className="w-3 h-3 text-slate-300" />
                    </th>
                    <th className="pb-2.5 font-normal"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setSelectedRecord(row);
                        setShowPanel(true);
                      }}
                      className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${
                        selectedRecord?.id === row.id ? 'bg-[#f0faf9]' : ''
                      }`}
                    >
                      <td className="py-2.5 text-slate-500">{row.time}</td>
                      <td className="py-2.5 font-medium text-slate-800">
                        {row.route}
                      </td>
                      <td className="py-2.5 text-slate-600">{row.airline}</td>
                      <td className="py-2.5 text-right font-semibold text-slate-800">
                        {row.fare.toLocaleString()}
                      </td>
                      <td className="py-2.5 text-slate-500">
                        {row.expectedRange}
                      </td>
                      <td className="py-2.5">
                        {assessmentBadge(row.assessment, row.assessmentColor)}
                      </td>
                      <td className="py-2.5 text-slate-500">{row.reason}</td>
                      <td className="py-2.5 text-slate-400">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Fare Investigation Panel + Signals */}
        <div className="lg:col-span-4 space-y-4">
          {/* Fare Investigation Panel */}
          {showPanel && (
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
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Classification + confidence */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {anomalyFareInvestigation.classification}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-300" />
                  Confidence: {anomalyFareInvestigation.confidence}%
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
                <Plane className="w-4 h-4 text-[#0fa497] -rotate-45" />
                <span className="text-base font-bold text-slate-900">
                  {anomalyFareInvestigation.route}
                </span>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <div className="text-slate-400 mb-0.5">Airline</div>
                  <div className="font-semibold text-slate-800">
                    {anomalyFareInvestigation.airline}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-0.5">Observed Fare</div>
                  <div className="font-semibold text-slate-800">
                    {anomalyFareInvestigation.observedFare}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-0.5">Expected Range</div>
                  <div className="font-semibold text-slate-800">
                    {anomalyFareInvestigation.expectedRange}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-0.5">Historical Avg.</div>
                  <div className="font-semibold text-slate-800">
                    {anomalyFareInvestigation.historicalAvg}
                  </div>
                </div>
              </div>

              {/* Why was it flagged */}
              <div className="mb-3">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Why was it flagged?
                </div>
                <div className="space-y-2">
                  {anomalyFareInvestigation.flagReasons.map((reason, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-slate-50 rounded-xl p-2.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#0fa497] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-800">
                          {reason.text}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {reason.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assessment */}
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 mb-0.5">
                    AI Assessment
                  </div>
                  <div className="text-xs font-bold text-rose-600">
                    {anomalyFareInvestigation.aiAssessment}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  Confidence:{' '}
                  <span className="font-bold text-slate-700">
                    {anomalyFareInvestigation.aiConfidence}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recent Intelligence Signals */}
          <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#0fa497]" />
              <span className="text-sm font-bold text-slate-900">
                Recent Intelligence Signals
              </span>
            </div>
            <div className="space-y-2.5">
              {recentIntelligenceSignals.map((sig) => (
                <div
                  key={sig.id}
                  className="flex items-start gap-2.5 py-1.5 border-b border-slate-50 last:border-0"
                >
                  <div
                    className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      sig.typeColor === 'red'
                        ? 'bg-rose-500'
                        : sig.typeColor === 'teal'
                        ? 'bg-[#0fa497]'
                        : sig.typeColor === 'amber'
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-semibold ${signalTypeIconColor(
                          sig.typeColor
                        )}`}
                      >
                        {sig.type}
                      </span>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium ${signalSeverityClass(
                          sig.severityColor
                        )}`}
                      >
                        {sig.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {sig.description}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {sig.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default AnomalyDetection;
