import React from 'react';

export interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-3.5 h-3.5 flex-shrink-0' }) => {
  switch (name.toLowerCase()) {
    case 'react':
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'java':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M7.5 5.5c1.2-.8 2 0 1.6 1.2-.4 1.2-1.2 2 0 2.8" stroke="#e76f00" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M11.5 3.8c1.6-1.2 2.4 0 2 1.6-.4 1.6-1.6 2.4 0 3.6" stroke="#e76f00" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M5 13.5c0 3 2.2 5.5 5 5.5h4c2.8 0 5-2.5 5-5.5H5z" fill="#5382a1" />
          <path d="M17 14.5h1.2c.9 0 1.6-.7 1.6-1.5s-.7-1.5-1.6-1.5H17v3z" stroke="#5382a1" strokeWidth="1.2" />
          <path d="M3.5 20.5h17" stroke="#5382a1" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'spring boot':
    case 'spring':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M21.5 12c0 5.247-4.253 9.5-9.5 9.5S2.5 17.247 2.5 12 6.753 2.5 12 2.5s9.5 4.253 9.5 9.5z"
            fill="#1e293b"
          />
          <path
            d="M17.4 8.2c-.4-.5-1.5-.7-2.7-.2-1.8.7-3.8 2.7-4.8 4.7-.6 1.2-.8 2.1-.6 2.5.3.5 1.4.7 2.7.2 1.8-.7 3.8-2.7 4.8-4.7.6-1.2.8-2.1.6-2.5z"
            fill="#6db33f"
          />
          <path
            d="M9.3 15.2c-.4.5-.6 1.1-.5 1.5.2.5.9.6 1.7.3 1.1-.4 2.4-1.6 3-2.8l-1.5-1.5c-.9 1.1-2 2-2.7 2.5z"
            fill="#52992b"
          />
        </svg>
      );

    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 28 20" fill="none">
          <path
            d="M18.8 2.5c-2.4 0-4.8 1.5-6.2 3.8C11.2 8.5 10 11.2 8 13c-1.8 1.6-3.8 2.1-5.5 2.2 2.8.8 6-.2 8.4-2.2 2.5-2.1 4-5.2 6.1-7.8 1.2-1.5 2.8-2.5 4.6-2.6-.9-.7-1.8-1-2.8-1.1z"
            fill="#00758f"
          />
          <path
            d="M22.5 6.8c-.8.8-2 1.1-3 .8 1.2 1.4 3 2 4.8 1.5 1.2-.4 2.2-1.2 2.7-2.3-1.4.3-3.2-.2-4.5-1z"
            fill="#f29111"
          />
        </svg>
      );

    case 'rest api':
    case 'api':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
        </svg>
      );

    case 'sql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#0078d4" fillOpacity="0.85" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#0078d4" strokeWidth="1.5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="#0078d4" strokeWidth="1.5" />
        </svg>
      );

    case 'ssis':
    case 'ssis / etl':
    case 'etl':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );

    case 'ssas':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 21,7 12,12 3,7" fill="#0078d4" fillOpacity="0.85" />
          <polygon points="3,7 12,12 12,21 3,16" fill="#005a9e" />
          <polygon points="21,7 12,12 12,21 21,16" fill="#106ebe" />
        </svg>
      );

    case 'power bi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="4" height="10" rx="1" fill="#F2C811" fillOpacity="0.75" />
          <rect x="10" y="7" width="4" height="14" rx="1" fill="#F2C811" fillOpacity="0.9" />
          <rect x="17" y="3" width="4" height="18" rx="1" fill="#F2C811" />
        </svg>
      );

    case 'excel':
    case 'ms excel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="18" rx="2" fill="#217346" />
          <path
            d="M7.5 7.5L11.5 12M11.5 12L7.5 16.5M11.5 12L16.5 7.5M11.5 12L16.5 16.5"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'r':
      return (
        <svg className={className} viewBox="0 0 32 24" fill="none">
          <ellipse cx="14.5" cy="12" rx="12.5" ry="9" stroke="#276DC3" strokeWidth="2.5" fill="none" />
          <path
            d="M17 7h-5v10h3v-3.5h2l2.5 3.5h3.5L20 13c1.5-.5 2.5-1.5 2.5-3s-1-3-3-3zm-2 4h-2V9h2c.8 0 1.2.4 1.2 1s-.4 1-1.2 1z"
            fill="#848E9C"
          />
        </svg>
      );

    case 'rstudio':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#75AADB" />
          <path d="M12 6L7 16h3l1.5-3.5h3L16 16h3L12 6z" fill="#ffffff" />
          <line x1="10.8" y1="11" x2="13.2" y2="11" stroke="#75AADB" strokeWidth="1.2" />
        </svg>
      );

    default:
      return (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80 flex-shrink-0" />
      );
  }
};

export interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, className = '' }) => {
  return (
    <div
      className={`group inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-white/[0.015] border border-white/[0.045] hover:border-white/15 hover:bg-white/[0.035] transition-all duration-200 cursor-default select-none ${className}`}
    >
      <TechIcon name={name} />
      <span className="font-mono text-[11.5px] sm:text-xs text-slate-200/90 group-hover:text-white tracking-wide transition-colors duration-200">
        {name}
      </span>
    </div>
  );
};
