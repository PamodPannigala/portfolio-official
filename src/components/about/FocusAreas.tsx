import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface FocusAreasProps {
  className?: string;
}

export const FocusAreas: React.FC<FocusAreasProps> = ({ className = '' }) => {
  const { focusAreas } = PORTFOLIO_DATA.about;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Tiny abstract data-inspired marks associated with each area (minimal SVG, stroke-only)
  const renderAbstractMark = (id: string) => {
    switch (id) {
      case '01': // Data Science: Sparse scatter with regression chord
        return (
          <svg width="30" height="18" viewBox="0 0 30 18" fill="none" className="overflow-visible" aria-hidden="true">
            <circle cx="5" cy="13" r="1.5" fill="currentColor" />
            <circle cx="15" cy="9" r="1.5" fill="currentColor" />
            <circle cx="25" cy="4" r="1.5" fill="currentColor" />
            <line x1="2" y1="14.5" x2="28" y2="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.75" />
          </svg>
        );
      case '02': // Machine Learning: Sigmoid curve with threshold
        return (
          <svg width="30" height="18" viewBox="0 0 30 18" fill="none" className="overflow-visible" aria-hidden="true">
            <path d="M 3 14 C 11 14, 15 3, 27 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="15" cy="8.5" r="1.5" fill="currentColor" />
          </svg>
        );
      case '03': // Artificial Intelligence: 3-node neural triad
        return (
          <svg width="30" height="18" viewBox="0 0 30 18" fill="none" className="overflow-visible" aria-hidden="true">
            <circle cx="5" cy="4" r="1.5" fill="currentColor" />
            <circle cx="5" cy="14" r="1.5" fill="currentColor" />
            <circle cx="25" cy="9" r="2" fill="currentColor" />
            <line x1="6.5" y1="4" x2="23" y2="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" />
            <line x1="6.5" y1="14" x2="23" y2="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" />
          </svg>
        );
      case '04': // Data Analytics: Trend sparkline with apex marker
        return (
          <svg width="30" height="18" viewBox="0 0 30 18" fill="none" className="overflow-visible" aria-hidden="true">
            <polyline points="3,14 10,9 17,11 26,4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="26" cy="4" r="1.75" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-focus-section
      className={`w-full pt-5 sm:pt-6 border-t border-white/[0.08] ${className}`}
      aria-label="Disciplinary Focus Areas"
    >
      {/* Editorial Sub-header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80" />
          <span className="font-display text-xs sm:text-sm font-semibold tracking-wider text-text-primary uppercase">
            CORE CAPABILITIES
          </span>
          <span className="text-white/25 font-sans text-xs hidden sm:inline">&bull;</span>
          <span className="font-sans text-xs text-text-secondary/85 tracking-wide hidden sm:inline">
            Interactive Domains
          </span>
        </div>
        <span className="font-mono text-xs text-text-secondary/75 tracking-widest uppercase">
          04 DOMAINS
        </span>
      </div>

      {/* 4-Column Minimal Line-Based Editorial Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
        {focusAreas.map((area) => {
          const isHovered = hoveredId === area.id;

          return (
            <div
              key={area.id}
              data-focus-pillar
              role="article"
              tabIndex={0}
              onMouseEnter={() => setHoveredId(area.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(area.id)}
              onBlur={() => setHoveredId(null)}
              className="group relative flex flex-col justify-between pt-1 pb-2 transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/60 rounded cursor-pointer select-none"
            >
              {/* Top Hairline with smooth left-to-right draw on hover/focus */}
              <div className="relative mb-4 flex items-center">
                {/* Background static track */}
                <div
                  className="h-[1px] w-full bg-white/[0.08]"
                  aria-hidden="true"
                />
                {/* Animated highlight hairline */}
                <div
                  className={`absolute top-0 left-0 h-[1.5px] bg-gradient-to-r from-accent-cyan via-accent-cyan/90 to-accent-cyan transition-all duration-400 ease-out ${isHovered ? 'w-full shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'w-0'
                    }`}
                  aria-hidden="true"
                />
                {/* Visual anchor node mark */}
                <div
                  className={`absolute left-0 -top-[3px] w-2 h-2 rounded-full border transition-all duration-300 ${isHovered
                      ? 'border-accent-cyan bg-accent-cyan shadow-[0_0_8px_rgba(56,189,248,0.6)] scale-110'
                      : 'border-white/30 bg-deep-space'
                    }`}
                  aria-hidden="true"
                />
              </div>

              {/* Strip Content */}
              <div>
                {/* Number & Revealed Secondary Phrase */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs sm:text-[13px] font-medium tracking-wider transition-colors duration-300 ${isHovered ? 'text-accent-cyan font-semibold' : 'text-text-secondary/70'
                      }`}
                  >
                    {area.id}
                  </span>

                  {/* Secondary phrase revealed on hover / focus */}
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 ${isHovered
                        ? 'opacity-100 text-accent-cyan/90 translate-x-0'
                        : 'opacity-0 -translate-x-1 text-text-muted/40'
                      }`}
                  >
                    {area.secondaryPhrase}
                  </span>
                </div>

                {/* Pillar Title with subtle 2-3px shift */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3
                    className={`font-display text-lg sm:text-xl xl:text-[22px] font-bold tracking-tight transition-all duration-300 ${isHovered
                        ? 'text-white translate-x-1'
                        : 'text-text-primary translate-x-0'
                      }`}
                  >
                    {area.title}
                  </h3>

                  {/* Tiny Abstract Data-Inspired Visual Mark revealed on hover/focus */}
                  <div
                    className={`transition-all duration-300 flex-shrink-0 ${isHovered
                        ? 'opacity-100 translate-y-0 text-accent-cyan scale-105'
                        : 'opacity-0 translate-y-1 text-text-muted/30 scale-95'
                      }`}
                  >
                    {renderAbstractMark(area.id)}
                  </div>
                </div>

                {/* Subtitle Description with refined contrast */}
                <p
                  className={`font-sans text-xs sm:text-[13px] leading-relaxed transition-colors duration-300 ${isHovered ? 'text-slate-100 font-medium' : 'text-slate-300/90 font-normal'
                    }`}
                >
                  {area.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
