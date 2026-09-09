import React from 'react';

export const CampusArchitecturePreview: React.FC = () => {
  return (
    <div className="w-full h-28 sm:h-32 bg-[#040915]/80 border border-white/[0.05] rounded-md p-3 relative overflow-hidden flex items-center justify-center group-hover:border-accent-cyan/30 transition-colors duration-300">
      <svg
        viewBox="0 0 360 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-sm select-none"
      >
        <defs>
          <linearGradient id="campusArchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Background Grid Line */}
        <line x1="20" y1="45" x2="340" y2="45" stroke="#38bdf8" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />

        {/* Flow Line */}
        <line x1="45" y1="45" x2="315" y2="45" stroke="url(#campusArchGrad)" strokeWidth="1.2" />

        {/* Animated Pulse */}
        <circle cx="180" cy="45" r="3" fill="#38bdf8" className="animate-pulse" />

        {/* Node 1: Assets & QR */}
        <g transform="translate(15, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="14" cy="16" r="3.5" fill="#38bdf8" fillOpacity="0.8" />
          <text x="14" y="32" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="600">ASSETS</text>
        </g>

        {/* Node 2: Operations */}
        <g transform="translate(105, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.5" />
          <polyline points="12,24 18,16 26,20 34,14" stroke="#38bdf8" strokeWidth="1" fill="none" />
          <text x="10" y="32" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="600">OPS HUB</text>
        </g>

        {/* Node 3: Analytics */}
        <g transform="translate(195, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
          <rect x="12" y="16" width="3" height="8" fill="#38bdf8" fillOpacity="0.6" />
          <rect x="18" y="12" width="3" height="12" fill="#38bdf8" fillOpacity="0.8" />
          <rect x="24" y="8" width="3" height="16" fill="#38bdf8" />
          <text x="9" y="32" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="600">ANALYTICS</text>
        </g>

        {/* Node 4: Intelligence */}
        <g transform="translate(285, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.9" />
          <circle cx="20" cy="16" r="4.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <text x="12" y="32" fill="#f8fafc" fontSize="7.5" fontFamily="monospace" fontWeight="700">AI HEALTH</text>
        </g>
      </svg>
    </div>
  );
};
