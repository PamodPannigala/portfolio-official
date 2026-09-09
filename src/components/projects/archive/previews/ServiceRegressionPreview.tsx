import React from 'react';

export const ServiceRegressionPreview: React.FC = () => {
  return (
    <div className="w-full h-28 sm:h-32 bg-[#040915]/80 border border-white/[0.05] rounded-md p-3 relative overflow-hidden flex items-center justify-center group-hover:border-accent-cyan/30 transition-colors duration-300">
      <svg
        viewBox="0 0 360 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-sm select-none"
      >
        <defs>
          <linearGradient id="serviceCiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Coordinate Grid axes */}
        <line x1="30" y1="15" x2="30" y2="75" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="1" />
        <line x1="30" y1="75" x2="330" y2="75" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="1" />

        {/* Grid lines */}
        <line x1="30" y1="45" x2="330" y2="45" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="130" y1="15" x2="130" y2="75" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="230" y1="15" x2="230" y2="75" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* 95% Confidence Interval Band */}
        <polygon
          points="40,24 130,34 230,48 315,62 315,74 230,64 130,52 40,40"
          fill="url(#serviceCiGrad)"
        />

        {/* Regression Trendline */}
        <line x1="40" y1="32" x2="315" y2="68" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Empirical Scatter Points */}
        <circle cx="55" cy="30" r="2.5" fill="#38bdf8" fillOpacity="0.75" />
        <circle cx="85" cy="39" r="2.2" fill="#38bdf8" fillOpacity="0.6" />
        <circle cx="115" cy="34" r="2.8" fill="#38bdf8" fillOpacity="0.9" />
        <circle cx="145" cy="46" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
        <circle cx="175" cy="52" r="3" fill="#38bdf8" fillOpacity="0.8" />
        <circle cx="210" cy="49" r="2.2" fill="#38bdf8" fillOpacity="0.5" />
        <circle cx="245" cy="61" r="2.5" fill="#38bdf8" fillOpacity="0.8" />
        <circle cx="275" cy="58" r="2.8" fill="#38bdf8" fillOpacity="0.85" />
        <circle cx="305" cy="66" r="2.5" fill="#38bdf8" fillOpacity="0.75" />

        {/* Analytical Micro Badges */}
        <g transform="translate(195, 14)">
          <rect width="64" height="18" rx="3" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.5" />
          <text x="32" y="12.5" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="600">
            r = -0.60
          </text>
        </g>
        <g transform="translate(265, 14)">
          <rect width="64" height="18" rx="3" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.5" />
          <text x="32" y="12.5" textAnchor="middle" fill="#f8fafc" fontSize="7.5" fontFamily="monospace" fontWeight="600">
            Adj. R² 0.88
          </text>
        </g>
      </svg>
    </div>
  );
};
