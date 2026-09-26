import React from 'react';

/**
 * Reusable Page Header with title, context badge, subtitle, and action buttons
 */
export const PageHeader = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'primary',
  children,
  updatedAt,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1.5 text-sm text-slate-600 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {updatedAt && (
          <span className="text-xs text-slate-500 hidden sm:inline-block">
            Updated: <strong className="text-slate-700 font-medium">{updatedAt}</strong>
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
