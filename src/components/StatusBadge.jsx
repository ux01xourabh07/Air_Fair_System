import React from 'react';

/**
 * Reusable Status Badge Component
 */
export const StatusBadge = ({
  label,
  variant = 'neutral',
  size = 'md',
  dot = true,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
      case 'Stable':
      case 'Optimal Fare':
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'warning':
      case 'Moderate':
      case 'Trending Up':
      case 'Spike Detected':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'danger':
      case 'High Volatility':
      case 'High Demand':
      case 'Peak Surge':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'info':
      case 'primary':
      case 'Correction':
        return 'bg-blue-50 text-brand-700 border-brand-200/80';
      case 'purple':
      case 'Charter':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getDotStyles = () => {
    switch (variant) {
      case 'success':
      case 'Stable':
      case 'Optimal Fare':
      case 'Active':
        return 'bg-emerald-500';
      case 'warning':
      case 'Moderate':
      case 'Trending Up':
      case 'Spike Detected':
        return 'bg-amber-500';
      case 'danger':
      case 'High Volatility':
      case 'High Demand':
      case 'Peak Surge':
        return 'bg-rose-500';
      case 'info':
      case 'primary':
      case 'Correction':
        return 'bg-brand-500';
      case 'purple':
      case 'Charter':
        return 'bg-purple-500';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-medium px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${getVariantStyles()} ${
        sizeStyles[size] || sizeStyles.md
      } ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${getDotStyles()}`} />}
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;
