import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, ChevronRight } from 'lucide-react';

/**
 * Reusable KPI Card Component for major metrics
 */
export const KpiCard = ({
  title,
  value,
  subtitle,
  change,
  changeDirection = 'up',
  changePeriod,
  icon: Icon,
  iconBg = 'bg-brand-50 text-brand-600',
  isClickable = false,
  onClick,
  badgeText,
  badgeColor,
  highlight = false,
}) => {
  const getChangeColor = () => {
    if (changeDirection === 'up') return 'text-rose-600 bg-rose-50 border-rose-100';
    if (changeDirection === 'down') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    return 'text-slate-600 bg-slate-50 border-slate-100';
  };

  const getChangeIcon = () => {
    if (changeDirection === 'up') return <ArrowUpRight className="w-3.5 h-3.5" />;
    if (changeDirection === 'down') return <ArrowDownRight className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`relative group bg-white rounded-xl border p-5 transition-all duration-200 ${
        highlight
          ? 'border-brand-300 ring-2 ring-brand-100/80 shadow-md shadow-brand-500/5'
          : 'border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-card-hover'
      } ${isClickable ? 'cursor-pointer active:scale-[0.99]' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            {badgeText && (
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                  badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`p-2.5 rounded-xl border border-slate-100 ${iconBg} transition-transform group-hover:scale-105`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium border text-[11px] ${getChangeColor()}`}
            >
              {getChangeIcon()}
              {change}
            </span>
          )}
          <span className="text-slate-500">{changePeriod || subtitle}</span>
        </div>

        {isClickable && (
          <span className="inline-flex items-center text-brand-600 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
