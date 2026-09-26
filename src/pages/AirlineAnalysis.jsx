import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Plane,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Lightbulb,
  ArrowRight,
  IndianRupee,
  BarChart2,
  X,
} from 'lucide-react';
import AirlineLogo from '../components/AirlineLogo';
import { airlinesData, getAirlinesSummary } from '../data/airlines';
import { formatINR } from '../utils/formatters';

export const AirlineAnalysis = () => {
  const outletContext = useOutletContext();
  const showToast = outletContext?.showToast || console.log;

  const [period, setPeriod] = useState('7 Days');
  const [selectedRoute, setSelectedRoute] = useState('All Routes');
  const [sortBy, setSortBy] = useState('Average Fare');
  const [selectedAirlineModal, setSelectedAirlineModal] = useState(null);

  const summary = getAirlinesSummary();

  const handleViewRoute = (airline) => {
    setSelectedAirlineModal(airline);
    showToast(`Viewing standardized route matrix for ${airline.name}`, 'info');
  };

  // Primary 4 airlines shown prominently matching reference image 2
  const topAirlines = airlinesData.slice(0, 4);

  // Filter & Sort list
  let displayedAirlines = [...airlinesData];
  if (sortBy === 'Average Fare') {
    displayedAirlines.sort((a, b) => b.avgFare - a.avgFare);
  } else if (sortBy === 'Routes') {
    displayedAirlines.sort((a, b) => b.routesCovered - a.routesCovered);
  } else if (sortBy === 'Price Change') {
    displayedAirlines.sort((a, b) => b.priceChange - a.priceChange);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Airline Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Compare airfare levels and price movement across airlines.
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
        {/* Card 1: Airlines Tracked */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
            <Plane className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Airlines Tracked</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {summary.totalAirlines}
          </div>
          <div className="text-xs text-slate-400 mt-1">Total airlines</div>
        </div>

        {/* Card 2: Average Fare */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Average Fare</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{summary.averageFare.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-1">Across tracked airlines</div>
        </div>

        {/* Card 3: Highest Average */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
            <ArrowUp className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Highest Average</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{summary.highestAverage.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-1">Across tracked airlines</div>
        </div>

        {/* Card 4: Lowest Average */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497] mb-3">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Lowest Average</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{summary.lowestAverage.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-1">Across tracked airlines</div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium">
        {/* Period Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Period:</span>
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs">
            {['7 Days', '30 Days', '3 Months'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  period === p
                    ? 'bg-[#004e64] text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Route & Sort Dropdowns */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Route:</span>
            <div className="relative">
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 pr-8 text-slate-700 shadow-xs focus:outline-none cursor-pointer"
              >
                <option value="All Routes">All Routes</option>
                <option value="DEL-BOM">Delhi - Mumbai</option>
                <option value="BOM-BLR">Mumbai - Bangalore</option>
                <option value="BHO-DEL">Bhopal - Delhi</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 pr-8 text-slate-700 shadow-xs focus:outline-none cursor-pointer"
              >
                <option value="Average Fare">Average Fare</option>
                <option value="Routes">Routes Covered</option>
                <option value="Price Change">Price Change</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card: Current Airline Fares */}
      <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-blue-500">
            <BarChart2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Current Airline Fares
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Average standardized fare across tracked routes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 text-left border-b border-slate-100">
                <th className="pb-3 font-medium">Airline</th>
                <th className="pb-3 font-medium text-left">Average Fare</th>
                <th className="pb-3 font-medium text-left">Price Change</th>
                <th className="pb-3 font-medium text-left">Status</th>
                <th className="pb-3 font-medium text-right pr-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedAirlines.map((airline) => (
                <tr key={airline.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <AirlineLogo type={airline.logoType} size="md" />
                      <span className="font-semibold text-slate-900 text-sm">{airline.name}</span>
                    </div>
                  </td>

                  <td className="py-4 font-bold text-slate-900 text-sm">
                    {formatINR(airline.avgFare)}
                  </td>

                  <td className="py-4 font-semibold text-xs">
                    <span
                      className={`inline-flex items-center gap-0.5 ${
                        airline.priceChangeDirection === 'up' ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {airline.priceChangeDirection === 'up' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      <span>{airline.priceChange}%</span>
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        airline.status === 'Rising'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : airline.status === 'Falling'
                          ? 'bg-[#e8f7f5] text-[#0fa497] border border-[#d2f1ed]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {airline.status}
                    </span>
                  </td>

                  <td className="py-4 text-right pr-2">
                    <button
                      onClick={() => handleViewRoute(airline)}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium text-xs hover:underline cursor-pointer"
                    >
                      <span>View Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: 4 Airline Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topAirlines.map((airline) => (
          <div
            key={airline.id}
            onClick={() => handleViewRoute(airline)}
            className="bg-white rounded-2xl p-5 border border-[#eef2f6] shadow-xs hover:border-slate-300 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <AirlineLogo type={airline.logoType} size="md" />
              <span className="font-bold text-slate-900 text-sm">{airline.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] block">Avg Fare</span>
                <span className="font-bold text-slate-900">{formatINR(airline.avgFare)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Routes</span>
                <span className="font-bold text-slate-900">{airline.routesCovered}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Change</span>
                <span
                  className={`font-bold flex items-center gap-0.5 ${
                    airline.priceChangeDirection === 'up' ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {airline.priceChangeDirection === 'up' ? '↑' : '↓'} {airline.priceChange}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 5: Airline Insight Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">Airline Insight</div>
          <p className="text-xs text-slate-500 mt-0.5">
            Current average fares range from ₹4,620 to ₹5,120 across the tracked airlines.
          </p>
        </div>
      </div>

      {/* Airline Route Details Modal */}
      {selectedAirlineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AirlineLogo type={selectedAirlineModal.logoType} size="md" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedAirlineModal.name}</h3>
                  <p className="text-xs text-slate-400">
                    {selectedAirlineModal.category} • {selectedAirlineModal.routesCovered} Routes Tracked
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAirlineModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Average Sector Fare</span>
                  <span className="text-lg font-bold text-slate-900">{formatINR(selectedAirlineModal.avgFare)}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Lowest Entry Fare</span>
                  <span className="text-lg font-bold text-emerald-600">{formatINR(selectedAirlineModal.lowestFare)}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Market Share:</span>
                  <span className="font-semibold text-slate-800">{selectedAirlineModal.marketShare}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Fleet Strength:</span>
                  <span className="font-semibold text-slate-800">{selectedAirlineModal.fleetSize} Aircraft</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Primary Hub:</span>
                  <span className="font-semibold text-slate-800">{selectedAirlineModal.hub}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Data Coverage:</span>
                  <span className="font-semibold text-[#0fa497]">{selectedAirlineModal.dataCoverage}% Verified</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedAirlineModal(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirlineAnalysis;
