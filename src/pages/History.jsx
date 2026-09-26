import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Search,
  User,
  Plane,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import AirlineLogo from '../components/AirlineLogo';
import { recentSearchesList, loginActivityList } from '../data/history';
import { formatINR } from '../utils/formatters';

export const History = () => {
  const outletContext = useOutletContext();
  const showToast = outletContext?.showToast || console.log;

  const [activeTab, setActiveTab] = useState('Search History');
  const [filterType, setFilterType] = useState('All Searches');
  const [selectedSearchId, setSelectedSearchId] = useState(recentSearchesList[0].id);

  const selectedItem =
    recentSearchesList.find((s) => s.id === selectedSearchId) || recentSearchesList[0];

  const handleSelectSearch = (item) => {
    setSelectedSearchId(item.id);
  };

  const handleViewAgain = () => {
    showToast(`Re-querying live fares for ${selectedItem.route} (${selectedItem.travelDate})...`, 'info');
  };

  const handleLogoutOthers = () => {
    showToast('Logged out of all other active browser sessions.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View your searches and account activity.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#eef2f6] shadow-xs">
            <span>Current Session:</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active now
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Chrome · Windows · India</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher Pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('Search History')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === 'Search History'
              ? 'bg-[#e8f7f5] text-[#0fa497]'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-xs'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search History</span>
        </button>

        <button
          onClick={() => setActiveTab('Login Activity')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === 'Login Activity'
              ? 'bg-[#e8f7f5] text-[#0fa497]'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-xs'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Login Activity</span>
        </button>
      </div>

      {/* Search History View */}
      {activeTab === 'Search History' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Search List (~60% / 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs">
                {['All Searches', 'Routes', 'Airlines'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                      filterType === f
                        ? 'bg-[#e8f7f5] text-[#0fa497] font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/70">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Today</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* List of Recent Searches */}
            <div className="space-y-2.5">
              {recentSearchesList.map((item) => {
                const isSelected = item.id === selectedSearchId;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSearch(item)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#f4fbfb] border-[#a5e6df]'
                        : 'bg-white border-[#f1f5f9] hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <Plane className="w-4 h-4 -rotate-45" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.route}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {item.airlinesCount} airlines · {item.travelDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {item.searchedTime}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSearch(item);
                        }}
                        className="text-xs font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Search Detail Card (~40% / 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                <Plane className="w-5 h-5 text-blue-500 -rotate-45" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {selectedItem.route}
                </h3>
              </div>

              {/* Date & Searched info */}
              <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Travel date</span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedItem.travelDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Searched</span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedItem.searchedTime}</span>
                  </div>
                </div>
              </div>

              {/* Airlines Viewed List */}
              <div className="space-y-3 mb-6">
                <span className="text-xs text-slate-400 block font-medium">Airlines viewed</span>
                <div className="space-y-2">
                  {selectedItem.airlinesViewed.map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <AirlineLogo type={a.logoType} size="sm" />
                        <span className="font-semibold text-slate-800">{a.name}</span>
                      </div>
                      <span className="font-bold text-slate-900">{formatINR(a.fare)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Summary Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 text-xs text-center">
                <div>
                  <span className="text-slate-400 text-[10px] block">Average fare</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">
                    {formatINR(selectedItem.averageFare)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Lowest observed</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">
                    {formatINR(selectedItem.lowestFare)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Price status</span>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${selectedItem.statusClass}`}
                    >
                      ↑ {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button: View Route Again */}
            <div className="pt-4">
              <button
                onClick={handleViewAgain}
                className="w-full py-3 bg-[#004e64] hover:bg-[#003d4f] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>View Route Again</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Activity Card (shown at bottom or when Login tab active) */}
      <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Login Activity
              </h3>
              <p className="text-xs text-slate-400">Review recent sign-ins to your account.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 text-xs">
              <span className="text-slate-500">Current Session</span>
              <span className="font-semibold text-slate-700">Chrome · Windows · India</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-600 font-medium">Active now</span>
            </div>

            <button
              onClick={handleLogoutOthers}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-medium shadow-xs transition-colors"
            >
              Log out of other sessions
            </button>
          </div>
        </div>

        {/* Table of sign-ins */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 text-left border-b border-slate-100">
                <th className="py-2.5 font-medium">Date</th>
                <th className="py-2.5 font-medium">Time</th>
                <th className="py-2.5 font-medium">Device / Browser</th>
                <th className="py-2.5 font-medium">Location</th>
                <th className="py-2.5 font-medium text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loginActivityList.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-semibold text-slate-800">{log.date}</td>
                  <td className="py-3 text-slate-600">{log.time}</td>
                  <td className="py-3 text-slate-600">{log.device}</td>
                  <td className="py-3 text-slate-600">{log.location}</td>
                  <td className="py-3 text-right pr-2">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
