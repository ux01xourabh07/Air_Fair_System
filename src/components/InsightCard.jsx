import React from 'react';
import { AlertTriangle, TrendingUp, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react';

/**
 * Reusable Insight Card for Aviation Intelligence Summary
 */
export const InsightCard = ({ insight, onClick }) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'surge':
        return <TrendingUp className="w-4 h-4 text-rose-600" />;
      case 'airline':
        return <Sparkles className="w-4 h-4 text-brand-600" />;
      case 'volatility':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'forecast':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-slate-600" />;
    }
  };

  const getBorderColor = () => {
    if (insight.priority === 'high') return 'border-l-rose-500';
    if (insight.priority === 'medium') return 'border-l-amber-500';
    return 'border-l-brand-500';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 border-l-4 ${getBorderColor()} p-4 shadow-sm hover:shadow-card-hover transition-all ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-slate-50 border border-slate-100">{getIcon()}</div>
          <span className="text-xs font-semibold text-slate-800 line-clamp-1">
            {insight.title}
          </span>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
          {insight.tag}
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
        {insight.description}
      </p>

      {insight.metric && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Trigger Indicator</span>
          <span className="font-semibold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/70">
            {insight.metric}
          </span>
        </div>
      )}
    </div>
  );
};

export default InsightCard;
