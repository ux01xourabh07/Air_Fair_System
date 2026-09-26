import React from 'react';

/**
 * Reusable Chart Container Card
 */
export const ChartCard = ({
  title,
  subtitle,
  actions,
  children,
  footer,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
        </div>

        <div className="pt-5 w-full overflow-hidden">
          {children}
        </div>
      </div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
