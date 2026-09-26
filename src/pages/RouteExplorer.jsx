import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Plane,
  MapPin,
  Calendar,
  Search,
  ArrowLeftRight,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Info,
  ChevronRight,
  Sparkles,
  ChevronDown,
  Tag,
  IndianRupee,
} from 'lucide-react';
import AirlineLogo from '../components/AirlineLogo';
import { routesData } from '../data/routeExplorer';
import { formatINR } from '../utils/formatters';

export const RouteExplorer = () => {
  const outletContext = useOutletContext();
  const showToast = outletContext?.showToast || console.log;

  const [fromCity, setFromCity] = useState('BHO-DEL');
  const [originInput, setOriginInput] = useState('Bhopal (BHO)');
  const [destInput, setDestInput] = useState('Delhi (DEL)');
  const [travelDate, setTravelDate] = useState('28 Sep 2026');
  const [sortBy, setSortBy] = useState('Lowest Fare');

  const currentRoute = routesData[fromCity] || routesData['BHO-DEL'];

  const handleSwap = () => {
    const temp = originInput;
    setOriginInput(destInput);
    setDestInput(temp);
    showToast(`Swapped origin and destination.`, 'info');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    showToast(`Searching flights for ${originInput} → ${destInput} on ${travelDate}`, 'info');
  };

  const sortedAirlines = [...currentRoute.airlines].sort((a, b) => {
    if (sortBy === 'Lowest Fare') return a.currentFare - b.currentFare;
    if (sortBy === 'Highest Fare') return b.currentFare - a.currentFare;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Route Explorer
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore current fares, price changes and airline options for any domestic route.
        </p>
      </div>

      {/* Card 1: Search a Route */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eef2f6] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-blue-500 -rotate-45" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Search a Route
          </h3>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* From */}
          <div className="md:col-span-3 relative">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">From</span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={fromCity}
                onChange={(e) => {
                  setFromCity(e.target.value);
                  if (e.target.value === 'BHO-DEL') {
                    setOriginInput('Bhopal (BHO)');
                    setDestInput('Delhi (DEL)');
                  } else if (e.target.value === 'DEL-BOM') {
                    setOriginInput('Delhi (DEL)');
                    setDestInput('Mumbai (BOM)');
                  } else {
                    setOriginInput('Mumbai (BOM)');
                    setDestInput('Bengaluru (BLR)');
                  }
                }}
                className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              >
                <option value="BHO-DEL">Bhopal (BHO)</option>
                <option value="DEL-BOM">Delhi (DEL)</option>
                <option value="BOM-BLR">Mumbai (BOM)</option>
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-5">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/70 transition-colors"
              title="Swap Route"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="md:col-span-3 relative">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">To</span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destInput}
                onChange={(e) => setDestInput(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Travel Date */}
          <div className="md:col-span-3 relative">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Travel Date</span>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 pt-5">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#004e64] hover:bg-[#003d4f] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>Search Route</span>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>Compare standardized fares across available airlines and sources.</span>
        </div>
      </div>

      {/* Route Header Info & 4 Stat Cards */}
      <div className="space-y-4">
        {/* Route Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Plane className="w-4 h-4 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{currentRoute.routeTitle}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                  {currentRoute.category}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{currentRoute.routeCode}</span>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Last updated: {currentRoute.lastUpdated}
          </div>
        </div>

        {/* 4 Stat Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 font-medium">Current Average Fare</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              ₹{currentRoute.currentAvgFare.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-400 mt-1">Standardized fare</div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
              <ArrowUp className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 font-medium">7-Day Change</div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-600 tracking-tight mt-1 flex items-center gap-1">
              <ArrowUp className="w-5 h-5 text-rose-600" />
              <span>{currentRoute.change7D}%</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">vs. previous 7 days</div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
              <ArrowUp className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 font-medium">30-Day Change</div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-600 tracking-tight mt-1 flex items-center gap-1">
              <ArrowUp className="w-5 h-5 text-rose-600" />
              <span>{currentRoute.change30D}%</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">vs. previous 30 days</div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497] mb-3">
              <Tag className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 font-medium">Lowest Fare</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0fa497] tracking-tight mt-1">
              ₹{currentRoute.lowestFare.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-400 mt-1">currently observed</div>
          </div>
        </div>
      </div>

      {/* Middle Row (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (~38% / 5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card: Current Price Status */}
          <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Current Price Status
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <ArrowUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-amber-600 leading-tight block">
                  {currentRoute.priceStatus}
                </span>
                <span className="text-xs text-slate-400">
                  {currentRoute.statusDescription}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Current average</span>
                <span className="font-bold text-slate-900">{formatINR(currentRoute.currentAvgFare)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Recent average</span>
                <span className="font-bold text-slate-900">{formatINR(currentRoute.recentAverage)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Difference</span>
                <span className="font-bold text-rose-600">+{formatINR(currentRoute.difference)}</span>
              </div>
            </div>

            <div className="pt-2 text-xs font-semibold text-amber-600 flex items-center justify-between border-t border-slate-50 cursor-pointer hover:underline">
              <span>Price movement: +{currentRoute.change7D}%</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card: Quick Insights */}
          <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Quick Insights
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              {currentRoute.quickInsights.map((insight, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    {idx === 0 && <TrendingUp className="w-4 h-4" />}
                    {idx === 1 && <Plane className="w-4 h-4 -rotate-45" />}
                    {idx === 2 && <Tag className="w-4 h-4" />}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (~62% / 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-500 -rotate-45" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Airlines on this Route
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="Lowest Fare">Lowest Fare</option>
                <option value="Highest Fare">Highest Fare</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Current standardized fares observed for {currentRoute.routeTitle}.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-100">
                  <th className="pb-3 font-medium">Airline</th>
                  <th className="pb-3 font-medium text-left">Current Fare</th>
                  <th className="pb-3 font-medium text-left">7-Day Change</th>
                  <th className="pb-3 font-medium text-left">Status</th>
                  <th className="pb-3 font-medium text-right pr-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedAirlines.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <AirlineLogo type={a.logoType} size="md" />
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {a.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 font-bold text-slate-900 text-sm">
                      {formatINR(a.currentFare)}
                    </td>

                    <td className="py-3.5 font-semibold">
                      <span
                        className={`inline-flex items-center gap-0.5 ${
                          a.changeDir === 'up' ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {a.changeDir === 'up' ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        <span>{a.change}</span>
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          a.status === 'Higher'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>

                    <td className="py-3.5 text-right pr-2 text-slate-400">
                      <ChevronRight className="w-4 h-4 inline-block hover:text-slate-700 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteExplorer;
