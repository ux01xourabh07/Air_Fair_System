import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  Coins,
  MapPin,
  Plane,
  Download,
  Info,
  ArrowRight,
  Plus,
  Calendar,
  AlertTriangle,
  BarChart2,
  X,
  CheckCircle,
} from 'lucide-react';
import {
  reportsOverview,
  availableReportsList,
  latestReportData,
  reportTypesCards,
} from '../data/reports';
import { formatINR } from '../utils/formatters';

export const Reports = () => {
  const outletContext = useOutletContext();
  const showToast = outletContext?.showToast || console.log;

  const [reportType, setReportType] = useState('Airfare Market Summary');
  const [reportPeriod, setReportPeriod] = useState('Last 30 Days');
  const [reportRegion, setReportRegion] = useState('All India');
  const [reportRoute, setReportRoute] = useState('All Routes');
  const [activeReportModal, setActiveReportModal] = useState(null);

  const handleGenerateReport = (e) => {
    e.preventDefault();
    showToast(`Generating ${reportType} for ${reportPeriod}...`, 'success');
  };

  const handleDownload = (report) => {
    showToast(`Downloading PDF: ${report.title} (${report.period})`, 'success');
  };

  const handleViewReport = (report) => {
    setActiveReportModal(report);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and download summarized airfare and market reports.
          </p>
        </div>

        <button
          onClick={() => showToast('Opening Report Builder modal...', 'info')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#004e64] hover:bg-[#003d4f] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Top 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Current Airfare Index */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-[#e8f7f5] flex items-center justify-center text-[#0fa497] mb-3">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Current Airfare Index</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {reportsOverview.currentIndex}
          </div>
        </div>

        {/* Stat 2: Average Fare */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
            <Coins className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Average Fare</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            ₹{reportsOverview.averageFare.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Stat 3: Routes Covered */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-3">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Routes Covered</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {reportsOverview.routesCovered}
          </div>
        </div>

        {/* Stat 4: Airlines Tracked */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef2f6] shadow-xs">
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3">
            <Plane className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500 font-medium">Airlines Tracked</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {reportsOverview.airlinesTracked}
          </div>
        </div>
      </div>

      {/* Card: Create a Report */}
      <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Create a Report
          </h3>
        </div>

        <form onSubmit={handleGenerateReport} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          <div className="lg:col-span-3">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Report Type</span>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="Airfare Market Summary">Airfare Market Summary</option>
              <option value="Airline Pricing Summary">Airline Pricing Summary</option>
              <option value="Price Spike Report">Price Spike Report</option>
              <option value="Seasonal Fare Summary">Seasonal Fare Summary</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Period</span>
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="September 2026">September 2026</option>
              <option value="Year to Date 2026">Year to Date 2026</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Region</span>
            <select
              value={reportRegion}
              onChange={(e) => setReportRegion(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="All India">All India</option>
              <option value="North India">North India</option>
              <option value="South India">South India</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Route</span>
            <select
              value={reportRoute}
              onChange={(e) => setReportRoute(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="All Routes">All Routes</option>
              <option value="Trunk Routes">Trunk Routes</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-[#0070c7] hover:bg-[#005fa8] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
            >
              Generate Report
            </button>
          </div>
        </form>
      </div>

      {/* Middle Row (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Available Reports (~65% / 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Available Reports
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Recently generated reports and summaries.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {availableReportsList.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 mt-0.5">
                    {r.type === 'market' && <FileText className="w-4 h-4" />}
                    {r.type === 'airline' && <Plane className="w-4 h-4 -rotate-45" />}
                    {r.type === 'spike' && <AlertTriangle className="w-4 h-4" />}
                    {r.type === 'seasonal' && <Calendar className="w-4 h-4" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                    <span className="text-xs text-slate-500 block">{r.period}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Covers: {r.covers}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-[11px] text-slate-400">
                    Generated: {r.generatedDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewReport(r)}
                      className="px-3 py-1.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                    >
                      View Report
                    </button>

                    <button
                      onClick={() => handleDownload(r)}
                      className="px-3 py-1.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Latest Report (~35% / 4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Latest Report
              </h3>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                {latestReportData.title}
              </h4>
              <span className="text-xs text-slate-400 block mb-4">
                {latestReportData.period}
              </span>
            </div>

            <div className="space-y-2.5 text-xs py-2 border-y border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Airfare Index</span>
                <span className="font-bold text-slate-900">{latestReportData.airfareIndex}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Average Fare</span>
                <span className="font-bold text-slate-900">
                  ₹{latestReportData.averageFare.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Price Movement</span>
                <span className="font-bold text-rose-600">{latestReportData.priceMovement}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Routes</span>
                <span className="font-bold text-slate-900">{latestReportData.routes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{latestReportData.status}</span>
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">CPI Support Data</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                    {latestReportData.cpiNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <button
              onClick={() => handleViewReport(latestReportData)}
              className="w-full py-3 bg-[#004e64] hover:bg-[#003d4f] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span>View Full Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Report Types */}
      <div className="bg-white rounded-2xl p-6 border border-[#eef2f6] shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Report Types
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose a report type to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {reportTypesCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => showToast(`Selected report template: ${card.title}`, 'info')}
              className="p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                  {card.iconType === 'bar' && <BarChart2 className="w-4 h-4 text-blue-500" />}
                  {card.iconType === 'plane' && <Plane className="w-4 h-4 text-blue-500 -rotate-45" />}
                  {card.iconType === 'spike' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                  {card.iconType === 'calendar' && <Calendar className="w-4 h-4 text-emerald-500" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{card.title}</h4>
                  <span className="text-[11px] text-slate-400 block">{card.subtitle}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* View Full Report Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-slate-900">{activeReportModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveReportModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="font-semibold text-emerald-800">Verification Status</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified & Indexed
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Reporting Coverage:</span>
                  <span className="font-semibold text-slate-800">428 Routes across India</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Methodology:</span>
                  <span className="font-semibold text-slate-800">MoCA CPI Weighted Index (Base 2023=100)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Generated Date:</span>
                  <span className="font-semibold text-slate-800">21 Sep 2026, 6:30 PM</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setActiveReportModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(activeReportModal);
                    setActiveReportModal(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#004e64] hover:bg-[#003d4f] text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
