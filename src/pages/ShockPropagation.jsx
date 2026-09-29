import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ArrowUp,
  ArrowRight,
  Calendar,
  Globe,
  Clock,
  Plane,
  Activity,
  BarChart2,
} from 'lucide-react';
import {
  shockEvents,
  shockOverview,
  propagationTimeline,
  shockStats,
  shockRouteResponse,
  shockOverallMovement,
} from '../data/intelligence';

// Status badge helper
const routeStatusClass = (color) => {
  switch (color) {
    case 'green':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'amber':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'orange':
      return 'bg-orange-50 text-orange-700 border border-orange-100';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

// Timeline node colour
const timelineNodeClass = (tagColor) => {
  switch (tagColor) {
    case 'teal':
      return {
        dot: 'bg-[#0fa497]',
        card: 'border-[#e8f7f5]',
        tag: 'bg-[#e8f7f5] text-[#0fa497]',
        icon: 'text-[#0fa497]',
      };
    case 'purple':
      return {
        dot: 'bg-purple-500',
        card: 'border-purple-100',
        tag: 'bg-purple-50 text-purple-700',
        icon: 'text-purple-500',
      };
    default:
      // slate = event
      return {
        dot: 'bg-slate-400',
        card: 'border-slate-200',
        tag: 'bg-slate-100 text-slate-600',
        icon: 'text-slate-500',
      };
  }
};

export const ShockPropagation = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(shockEvents[0].value);
  const [region, setRegion] = useState('All India');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Shock Propagation
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track how a major airfare-related event moves across different routes over time.
          </p>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-medium text-slate-400 uppercase tracking-wide px-1">
              Event
            </label>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef2f6] rounded-xl text-sm text-slate-700 shadow-xs">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer min-w-[220px]"
              >
                {shockEvents.map((ev) => (
                  <option key={ev.id} value={ev.value}>
                    {ev.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-medium text-slate-400 uppercase tracking-wide px-1">
              Region
            </label>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef2f6] rounded-xl text-sm text-slate-700 shadow-xs">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
              >
                <option>All India</option>
                <option>North India</option>
                <option>South India</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Event Date
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1 leading-tight">
            {shockOverview.eventDate}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#e8f7f5] flex items-center justify-center mb-3">
            <Plane className="w-4 h-4 text-[#0fa497] -rotate-45" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            First Route Affected
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1 leading-tight">
            {shockOverview.firstRouteAffected}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Fastest Response
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1 leading-tight">
            {shockOverview.fastestResponse}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Index Movement
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1 leading-tight">
            {shockOverview.indexMovement}
          </div>
        </div>
      </div>

      {/* Propagation Timeline */}
      <div className="bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-[#0fa497]" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            How the Movement Spread
          </h3>
          <span className="text-xs text-slate-400 font-normal ml-1">
            Track the sequence and timing of route-level airfare responses.
          </span>
        </div>

        {/* Timeline row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 overflow-x-auto pb-2">
          {propagationTimeline.map((step, idx) => {
            const cls = timelineNodeClass(step.tagColor);
            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex-1 min-w-[140px] bg-slate-50 rounded-2xl p-3 border ${cls.card}`}
                >
                  <div className="text-[10px] font-semibold text-slate-500 mb-1">
                    {step.date}
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {step.tagColor === 'slate' ? (
                      <Activity className={`w-3.5 h-3.5 ${cls.icon}`} />
                    ) : step.tagColor === 'purple' ? (
                      <BarChart2 className={`w-3.5 h-3.5 ${cls.icon}`} />
                    ) : (
                      <Plane className={`w-3.5 h-3.5 ${cls.icon} -rotate-45`} />
                    )}
                    <span className="text-xs font-semibold text-slate-800">
                      {step.label}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-2">
                    {step.change}
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${cls.tag}`}
                  >
                    {step.tag}
                  </span>
                </div>
                {idx < propagationTimeline.length - 1 && (
                  <div className="hidden sm:flex items-center text-slate-300 px-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-2 mx-auto">
            <Globe className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Routes Affected
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {shockStats.routesAffected}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-2 mx-auto">
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Average Response Time
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {shockStats.avgResponseTime}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mb-2 mx-auto">
            <TrendingUp className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Highest Fare Change
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {shockStats.highestFareChange}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#eef2f6] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-[#e8f7f5] flex items-center justify-center mb-2 mx-auto">
            <Calendar className="w-4 h-4 text-[#0fa497]" />
          </div>
          <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
            Total Duration
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {shockStats.totalDuration}
          </div>
        </div>
      </div>

      {/* Bottom Row: Route-wise Response + Overall Movement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Route-wise Response Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-[#0fa497]" />
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Route-wise Response
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Compare when different routes responded to the selected shock.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 text-left border-b border-slate-100">
                  <th className="pb-2.5 font-normal">Route</th>
                  <th className="pb-2.5 font-normal">First Movement</th>
                  <th className="pb-2.5 font-normal">Fare Change</th>
                  <th className="pb-2.5 font-normal">Response Time</th>
                  <th className="pb-2.5 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {shockRouteResponse.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3 font-medium text-slate-800">{row.route}</td>
                    <td className="py-3 text-slate-600">{row.firstMovement}</td>
                    <td className="py-3 font-semibold text-[#0fa497]">
                      {row.fareChange}
                    </td>
                    <td className="py-3 text-slate-700">{row.responseTime}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${routeStatusClass(
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

        {/* Overall Movement Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#0fa497]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Overall Movement
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {shockOverallMovement.description}
            </p>
          </div>
          <div className="mt-6 bg-[#f0faf9] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0">
              <Calendar className="w-4 h-4 text-[#0fa497]" />
            </div>
            <div>
              <div className="text-xs text-slate-500">
                Total Time to Broader Movement
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">
                {shockOverallMovement.totalTimeToBroaderMovement}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
        <strong>Methodology:</strong> Route-level lag is estimated by comparing the timing of the selected external shock with subsequent statistically significant airfare movements.
      </p>
    </div>
  );
};

export default ShockPropagation;
