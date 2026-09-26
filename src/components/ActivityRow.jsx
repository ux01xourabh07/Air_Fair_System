import React from 'react';
import {
  TrendingUp,
  Plane,
  Search,
  LayoutDashboard,
  ShieldCheck,
  FileDown,
  BellRing,
  Activity,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * Reusable ActivityRow for Audit Logs and Platform History
 */
export const ActivityRow = ({ item, onClick }) => {
  const getIcon = () => {
    switch (item.iconType) {
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-brand-600" />;
      case 'Plane':
        return <Plane className="w-4 h-4 text-indigo-600" />;
      case 'Search':
        return <Search className="w-4 h-4 text-emerald-600" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-4 h-4 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      case 'FileDown':
        return <FileDown className="w-4 h-4 text-amber-600" />;
      case 'BellRing':
        return <BellRing className="w-4 h-4 text-rose-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
          {getIcon()}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-900">{item.action}</span>
            <span className="text-[11px] font-medium px-2 py-0.2 rounded bg-slate-100 text-slate-600">
              {item.category}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.details}</p>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 text-xs">
        <StatusBadge label={item.status} variant={item.status} size="sm" />
        <span className="text-slate-400 text-[11px]">
          {item.date} • {item.time}
        </span>
      </div>
    </div>
  );
};

export default ActivityRow;
