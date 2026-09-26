import React from 'react';

/**
 * Renders stylized carrier emblems matching the reference screenshots
 */
export const AirlineLogo = ({ type, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  const dim = sizeMap[size] || sizeMap.md;

  switch (type) {
    case 'indigo':
      return (
        <div
          className={`${dim} rounded-full bg-[#002e6e] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
          title="IndiGo"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="12" r="1.5" />
            <circle cx="12" cy="9" r="1.5" />
            <circle cx="16" cy="6" r="1.5" />
            <circle cx="12" cy="15" r="1.5" />
            <circle cx="16" cy="12" r="1.5" />
            <circle cx="20" cy="9" r="1.5" />
          </svg>
        </div>
      );

    case 'airindia':
      return (
        <div
          className={`${dim} rounded-full bg-[#d91d2a] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
          title="Air India"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16C7 11 12 8 20 6C15 11 12 15 6 18C4 18 3 17 4 16Z" />
          </svg>
        </div>
      );

    case 'akasa':
      return (
        <div
          className={`${dim} rounded-full bg-[#ff6b00] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
          title="Akasa Air"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L12 6L18 18L12 14L6 18Z" />
          </svg>
        </div>
      );

    case 'spicejet':
      return (
        <div
          className={`${dim} rounded-full bg-[#d32f2f] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
          title="SpiceJet"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="12" r="1.2" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="14" cy="8" r="1.8" />
            <circle cx="18" cy="6" r="2.1" />
            <circle cx="10" cy="14" r="1.5" />
            <circle cx="14" cy="12" r="1.8" />
          </svg>
        </div>
      );

    case 'vistara':
      return (
        <div
          className={`${dim} rounded-full bg-[#531034] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
          title="Vistara"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#d4af37]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      );

    case 'aiexpress':
      return (
        <div
          className={`${dim} rounded-full bg-[#ea580c] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
          title="Air India Express"
        >
          <span className="font-extrabold text-[9px] text-white">express</span>
        </div>
      );

    default:
      return (
        <div
          className={`${dim} rounded-full bg-[#0284c7] flex items-center justify-center text-white font-bold shrink-0 shadow-xs ${className}`}
        >
          ✈️
        </div>
      );
  }
};

export default AirlineLogo;
