import React from 'react';

/**
 * Reusable StatCard component for secondary metrics & compact displays
 */
export const StatCard = ({
  label,
  value,
  secondaryValue,
  icon: Icon,
  iconColor = 'text-brand-600',
  iconBg = 'bg-brand-50',
  description,
  progress,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 p-4 shadow-sm hover:border-slate-300 transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {Icon && (
          <div className={`p-1.5 rounded-lg ${iconBg} ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-xl font-bold text-slate-900 tracking-tight">{value}</span>
        {secondaryValue && (
          <span className="text-xs font-medium text-slate-500">{secondaryValue}</span>
        )}
      </div>

      {description && <p className="mt-1 text-xs text-slate-500 line-clamp-1">{description}</p>}

      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
