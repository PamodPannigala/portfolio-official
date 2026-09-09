import React from 'react';

interface TechLaneMotifProps {
  type: 'analytics' | 'pipeline' | 'fullstack' | 'databases' | 'workflow';
  isHovered?: boolean;
  className?: string;
}

export const TechLaneMotif: React.FC<TechLaneMotifProps> = ({
  type,
  isHovered = false,
  className = 'w-20 h-9 flex-shrink-0',
}) => {
  switch (type) {
    case 'analytics':
      return (
        <svg
          viewBox="0 0 76 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-65'
          }`}
          aria-hidden="true"
        >
          {/* Faint coordinate baseline */}
          <line x1="4" y1="28" x2="72" y2="28" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="0.85" />
          <line x1="4" y1="6" x2="4" y2="28" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.85" />

          {/* Trend line */}
          <path
            d="M6 24L24 16L44 19L62 6L70 10"
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
          {/* Active Data Points */}
          <circle cx="24" cy="16" r={isHovered ? 2.75 : 2.25} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="44" cy="19" r={isHovered ? 2.5 : 2} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="62" cy="6" r={isHovered ? 3 : 2.5} fill="#38bdf8" className="transition-all duration-300" />
        </svg>
      );

    case 'pipeline':
      return (
        <svg
          viewBox="0 0 76 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-65'
          }`}
          aria-hidden="true"
        >
          {/* Flowing pipeline trace line */}
          <path
            d="M4 16H72"
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeDasharray={isHovered ? 'none' : '4 3'}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          {/* Stage gates */}
          <line x1="24" y1="9" x2="24" y2="23" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.2" />
          <line x1="50" y1="9" x2="50" y2="23" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.2" />

          {/* Moving packet nodes */}
          <circle cx="12" cy="16" r={isHovered ? 2.75 : 2.25} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="37" cy="16" r={isHovered ? 3.25 : 2.75} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="64" cy="16" r={isHovered ? 2.75 : 2.25} fill="#38bdf8" className="transition-all duration-300" />
        </svg>
      );

    case 'fullstack':
      return (
        <svg
          viewBox="0 0 76 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-65'
          }`}
          aria-hidden="true"
        >
          {/* Frontend UI node */}
          <rect x="4" y="10" width="12" height="12" rx="2" stroke="#38bdf8" strokeWidth="1.4" fill={isHovered ? '#06162a' : 'none'} />
          {/* Bidirectional connector */}
          <line x1="18" y1="16" x2="30" y2="16" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* API layer diamond */}
          <polygon points="38,8 45,16 38,24 31,16" fill="#08152b" stroke="#38bdf8" strokeWidth="1.4" />
          {/* Bidirectional connector */}
          <line x1="46" y1="16" x2="58" y2="16" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Backend node */}
          <rect x="60" y="10" width="12" height="12" rx="2" stroke="#38bdf8" strokeWidth="1.4" fill={isHovered ? '#06162a' : 'none'} />
        </svg>
      );

    case 'databases':
      return (
        <svg
          viewBox="0 0 76 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-65'
          }`}
          aria-hidden="true"
        >
          {/* Primary Schema Table */}
          <rect x="6" y="8" width="18" height="16" rx="2" stroke="#38bdf8" strokeWidth="1.3" fill={isHovered ? '#06162a' : 'none'} />
          <line x1="6" y1="13" x2="24" y2="13" stroke="#38bdf8" strokeWidth="1" />
          <line x1="10" y1="18" x2="20" y2="18" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="0.8" />

          {/* Relation connector */}
          <path d="M24 16C36 16 40 16 52 16" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Related Schema / Document Entity */}
          <rect x="52" y="8" width="18" height="16" rx="2" stroke="#38bdf8" strokeWidth="1.3" fill={isHovered ? '#06162a' : 'none'} />
          <line x1="52" y1="13" x2="70" y2="13" stroke="#38bdf8" strokeWidth="1" />
          <line x1="56" y1="18" x2="66" y2="18" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="0.8" />
        </svg>
      );

    case 'workflow':
      return (
        <svg
          viewBox="0 0 76 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-65'
          }`}
          aria-hidden="true"
        >
          {/* Main git trunk */}
          <line x1="8" y1="20" x2="68" y2="20" stroke="#38bdf8" strokeWidth="1.15" strokeLinecap="round" />
          {/* Feature branch fork */}
          <path
            d="M22 20C22 13 30 11 40 11H68"
            stroke="#38bdf8"
            strokeWidth="1.1"
            strokeDasharray={isHovered ? 'none' : '2.5 2'}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          {/* Commit Nodes */}
          <circle cx="22" cy="20" r={isHovered ? 2.25 : 1.75} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="48" cy="20" r={isHovered ? 2.25 : 1.75} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="40" cy="11" r={isHovered ? 2.25 : 1.75} fill="#38bdf8" className="transition-all duration-300" />
          <circle cx="60" cy="11" r={isHovered ? 2.25 : 1.75} fill="#38bdf8" className="transition-all duration-300" />
        </svg>
      );

    default:
      return null;
  }
};
