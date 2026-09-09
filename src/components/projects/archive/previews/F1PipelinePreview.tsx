import React from 'react';

export const F1PipelinePreview: React.FC = () => {
  return (
    <div className="w-full h-28 sm:h-32 bg-[#040915]/80 border border-white/[0.05] rounded-md p-3 relative overflow-hidden flex items-center justify-center group-hover:border-accent-cyan/30 transition-colors duration-300">
      <svg
        viewBox="0 0 360 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-sm select-none"
      >
        <defs>
          <linearGradient id="f1PipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Background Grid Line */}
        <line x1="20" y1="45" x2="340" y2="45" stroke="#38bdf8" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 3" />

        {/* Pipeline Spine */}
        <line x1="45" y1="45" x2="315" y2="45" stroke="url(#f1PipelineGrad)" strokeWidth="1.2" />

        {/* Animated Packet */}
        <circle cx="210" cy="45" r="3.5" fill="#38bdf8" className="animate-pulse" />

        {/* Node 1: Raw Stream */}
        <g transform="translate(15, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="12" y1="18" x2="42" y2="18" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="12" y1="24" x2="36" y2="24" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
          <text x="11" y="36" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="600">RAW DATA</text>
        </g>

        {/* Node 2: SSIS ETL */}
        <g transform="translate(105, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.5" />
          <polygon points="32,10 44,22 32,34 20,22" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" />
          <circle cx="32" cy="22" r="2" fill="#38bdf8" />
          <text x="14" y="36" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="600">SSIS ETL</text>
        </g>

        {/* Node 3: Star / Cube */}
        <g transform="translate(195, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
          <polygon points="32,10 46,17 32,24 18,17" fill="#081426" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
          <polygon points="18,17 32,24 32,34 18,27" fill="#040a15" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
          <polygon points="46,17 32,24 32,34 46,27" fill="#040a15" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
          <text x="12" y="36" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="600">SSAS OLAP</text>
        </g>

        {/* Node 4: Power BI */}
        <g transform="translate(285, 23)">
          <rect width="64" height="44" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.9" />
          <polyline points="12,25 22,15 32,21 44,11 52,14" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="44" cy="11" r="2.5" fill="#38bdf8" />
          <text x="14" y="36" fill="#f8fafc" fontSize="7.5" fontFamily="monospace" fontWeight="700">POWER BI</text>
        </g>
      </svg>
    </div>
  );
};
