import React from 'react';

interface TechLogoProps {
  id: string;
  name?: string;
  className?: string;
}

export const TechLogo: React.FC<TechLogoProps> = ({
  id,
  className = 'w-5 h-5 flex-shrink-0',
}) => {
  const normalizedId = id.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '-');

  switch (normalizedId) {
    // ------------------------------------------------------------------------
    // DATA & ANALYTICS
    // ------------------------------------------------------------------------
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M11.9 2C6.9 2 7.2 4.2 7.2 4.2l.01 2.2h4.8v.7H5.2S2 6.7 2 11.8c0 5 2.8 4.9 2.8 4.9h1.7v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.1 2.7-2.6V4.7S17.1 2 11.9 2zm-2.6 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22c5 0 4.7-2.2 4.7-2.2l-.01-2.2H12v-.7h6.8s3.2.4 3.2-4.7c0-5-2.8-4.9-2.8-4.9h-1.7v2.4s.1 2.8-2.8 2.8h-4.8s-2.7-.1-2.7 2.6v4.2s-.3 2.7 4.9 2.7zm2.6-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'r':
      return (
        <svg className={className} viewBox="0 0 32 24" fill="none">
          <ellipse cx="14.5" cy="12" rx="12.5" ry="9.5" stroke="#276DC3" strokeWidth="2.5" fill="none" />
          <path
            d="M17 6.5h-5.5v11h3.5v-3.5h2l2.5 3.5h4L19.8 13c1.6-.5 2.7-1.6 2.7-3.2s-1.2-3.3-3.5-3.3zm-2 4h-2V8.5h2c.8 0 1.2.4 1.2 1s-.4 1-1.2 1z"
            fill="#848E9C"
          />
        </svg>
      );

    case 'sql':
      // Refined Neutral Technical Database Glyph
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="5" rx="8.5" ry="3" fill="#0078d4" fillOpacity="0.85" />
          <path d="M3.5 5v14c0 1.65 3.8 3 8.5 3s8.5-1.35 8.5-3V5" stroke="#0078d4" strokeWidth="1.5" />
          <path d="M3.5 12c0 1.65 3.8 3 8.5 3s8.5-1.35 8.5-3" stroke="#0078d4" strokeWidth="1.5" />
        </svg>
      );

    case 'power-bi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="2.5" y="11" width="4.2" height="10" rx="1" fill="#F2C811" fillOpacity="0.75" />
          <rect x="9.9" y="7" width="4.2" height="14" rx="1" fill="#F2C811" fillOpacity="0.9" />
          <rect x="17.3" y="3" width="4.2" height="18" rx="1" fill="#F2C811" />
        </svg>
      );

    case 'excel':
    case 'microsoft-excel':
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

    // ------------------------------------------------------------------------
    // DATA ENGINEERING & BI
    // ------------------------------------------------------------------------
    case 'sql-server':
      // Microsoft SQL Server Database Engine Mark
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="18" height="5.5" rx="1.5" fill="#CC292B" />
          <rect x="3" y="9.25" width="18" height="5.5" rx="1.5" fill="#CC292B" fillOpacity="0.85" />
          <rect x="3" y="16.5" width="18" height="5.5" rx="1.5" fill="#CC292B" fillOpacity="0.7" />
          <line x1="6" y1="5" x2="8" y2="5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="12" x2="8" y2="12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="19" x2="8" y2="19" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'ssis':
      // SQL Server Integration Services ETL Pipeline Cube Mark
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 21,7 12,12 3,7" fill="#0078D4" />
          <polygon points="3,7 12,12 12,21 3,16" fill="#005A9E" />
          <polygon points="21,7 12,12 12,21 21,16" fill="#106EBE" />
          <path d="M7 11.5L12 14.5L17 11.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'ssas':
      // SQL Server Analysis Services Multi-dimensional OLAP Cube Mark
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 21,7 12,12 3,7" fill="#2B579A" />
          <polygon points="3,7 12,12 12,21 3,16" fill="#1E3E6E" />
          <polygon points="21,7 12,12 12,21 21,16" fill="#3B72C4" />
          <line x1="12" y1="12" x2="12" y2="21" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.8" />
          <line x1="3" y1="7" x2="12" y2="12" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.8" />
          <line x1="21" y1="7" x2="12" y2="12" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.8" />
        </svg>
      );

    case 'etl':
      // Refined Neutral Technical Pipeline / Stream Glyph
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );

    // ------------------------------------------------------------------------
    // FULL-STACK DEVELOPMENT
    // ------------------------------------------------------------------------
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

    case 'spring-boot':
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

    case 'node-js':
    case 'node':
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2z"
            fill="#339933"
            transform="scale(0.85) translate(2, 0)"
          />
          <path
            d="M12 6.5l6.5 3.8v7.4L12 21.5l-6.5-3.8v-7.4L12 6.5z"
            fill="#02050e"
            fillOpacity="0.4"
          />
        </svg>
      );

    // ------------------------------------------------------------------------
    // DATABASES
    // ------------------------------------------------------------------------
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

    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1.5s-6 5.5-6 11.5c0 5 3.5 8.5 6 9.5 2.5-1 6-4.5 6-9.5 0-6-6-11.5-6-11.5z"
            fill="#47A248"
          />
          <path
            d="M12 1.5v21c.5-.2 1-.4 1.5-.7 2-1 4.5-4 4.5-8.8 0-5.5-6-11.5-6-11.5z"
            fill="#499D4A"
          />
          <path
            d="M12 19.5v3s0-1.5-1-2c-.5-.3-.8-.8-.8-1.3 0-1.2 1.8-1.7 1.8.3z"
            fill="#ffffff"
            fillOpacity="0.4"
          />
        </svg>
      );

    // ------------------------------------------------------------------------
    // TOOLS / WORKFLOW
    // ------------------------------------------------------------------------
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M21.6 10.7l-8.3-8.3c-.8-.8-2.1-.8-2.9 0L8.6 4.2l3.6 3.6c.9-.3 1.9-.1 2.6.6.7.7.9 1.7.6 2.6l3.5 3.5c.9-.3 1.9-.1 2.6.6.9.9.9 2.4 0 3.3s-2.4.9-3.3 0c-.8-.8-.9-1.9-.5-2.9l-3.3-3.3v5.1c.3.2.6.5.7.9.6 1 .2 2.3-.8 2.9-1 .6-2.3.2-2.9-.8-.6-1-.2-2.3.8-2.9.4-.2.8-.3 1.2-.3v-5.2c-.4 0-.8-.1-1.2-.3-.9-.6-1.3-1.8-.8-2.8l-3.5-3.5-6 6c-.8.8-.8 2.1 0 2.9l8.3 8.3c.8.8 2.1.8 2.9 0l8.3-8.3c.8-.8.8-2.1 0-2.9z"
            fill="#F05032"
          />
        </svg>
      );

    case 'github':
      return (
        <svg className={`${className} text-slate-200`} viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'postman':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path
            d="M7.5 12.5l3-3 2 2 4-4"
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16.5" cy="7.5" r="1.5" fill="#ffffff" />
        </svg>
      );

    default:
      return (
        <span className="w-2 h-2 rounded-full bg-accent-cyan/80 flex-shrink-0" />
      );
  }
};
