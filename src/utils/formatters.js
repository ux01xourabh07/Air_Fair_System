// Utility formatters for Indian Aviation Airfare Intelligence Platform

export const formatINR = (value) => {
  if (value === null || value === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  if (value === null || value === undefined) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
};

export const formatPercent = (value, showSign = true) => {
  if (value === null || value === undefined) return '0%';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const sign = showSign && num > 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}%`;
};

export const formatIndex = (value) => {
  if (value === null || value === undefined) return '0.0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toFixed(1);
};
