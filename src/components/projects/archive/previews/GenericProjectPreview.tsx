import React from 'react';

export interface GenericProjectPreviewProps {
  title: string;
  category: string;
}

export const GenericProjectPreview: React.FC<GenericProjectPreviewProps> = ({ title }) => {
  return (
    <div className="w-full h-28 sm:h-32 bg-[#040915]/80 border border-white/[0.05] rounded-md p-3 relative overflow-hidden flex items-center justify-center group-hover:border-accent-cyan/30 transition-colors duration-300">
      <svg
        viewBox="0 0 360 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-sm select-none"
      >
        {/* Background Grid */}
        <line x1="20" y1="45" x2="340" y2="45" stroke="#38bdf8" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="180" y1="10" x2="180" y2="80" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3" />

        {/* Blueprint Circuit Connection */}
        <path d="M40 45H120L150 25H210L240 45H320" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" fill="none" />

        <circle cx="120" cy="45" r="3" fill="#38bdf8" />
        <circle cx="150" cy="25" r="3" fill="#38bdf8" />
        <circle cx="210" cy="25" r="3" fill="#38bdf8" />
        <circle cx="240" cy="45" r="3" fill="#38bdf8" />

        {/* Central Core Module */}
        <g transform="translate(135, 42)">
          <rect width="90" height="34" rx="4" fill="#060d1d" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.75" />
          <text x="45" y="21" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="600">
            {title.slice(0, 14).toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  );
};
