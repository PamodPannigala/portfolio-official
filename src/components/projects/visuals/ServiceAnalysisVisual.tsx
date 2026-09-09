import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { VisualTechStack } from '../VisualTechStack';

interface ServiceAnalysisVisualProps {
  className?: string;
  isCrossFading?: boolean;
}

export const ServiceAnalysisVisual: React.FC<ServiceAnalysisVisualProps> = ({
  className = '',
  isCrossFading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGGElement>(null);
  const bgRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Active exploration view (0: OBSERVATIONS, 1: CLEANING, 2: RELATIONSHIPS, 3: REGRESSION, 4: INSIGHT)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3);

  // Auto-cycle steps subtly
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 5);
    }, 3800);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Subtle zero-re-render pointer parallax
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 8;
      targetY = relY * 6;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (fgRef.current) {
        fgRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${(-currentX * 0.35).toFixed(2)}px, ${(-currentY * 0.35).toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const analyticalSteps = [
    { label: 'OBSERVATIONS', sub: 'Sample Distribution' },
    { label: 'CLEANING', sub: 'Validated Schema' },
    { label: 'RELATIONSHIPS', sub: 'Correlation Structure' },
    { label: 'REGRESSION', sub: 'Linear Fit' },
    { label: 'INSIGHT', sub: 'Key Predictor' },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[490px] xl:min-h-[530px] flex items-center justify-center overflow-hidden select-none rounded-lg border border-white/[0.025] bg-[#02050e]/40 transition-all duration-300 ${className}`}
      aria-label="Accommodation Service Quality Statistical Analysis Visualization"
    >
      {/* Editorial Open Canvas Corner Framing Marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

      {/* Ambient gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.035),transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Editorial Canvas Header */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/90 animate-pulse" />
        <span className="font-mono text-[10.5px] sm:text-[11.5px] text-text-secondary/85 tracking-wider uppercase">
          STATISTICAL ANALYSIS
        </span>
      </div>

      <div className="absolute top-3.5 right-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="font-mono text-[10.5px] sm:text-[11.5px] text-accent-cyan tracking-wider uppercase font-semibold">
          STAGE: {analyticalSteps[activeStepIndex].label}
        </span>
      </div>

      {/* Centered & Balanced Interactive Canvas Footer */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-4 right-4 flex flex-col items-center justify-center gap-2 pt-2.5 border-t border-white/[0.06] z-10 bg-[#02050e]/50 backdrop-blur-[2px]">
        {/* Tier 1: Clean, Centered Step Navigation Row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full no-scrollbar">
          {analyticalSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase px-2 sm:px-2.5 py-1 rounded transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-accent-cyan/15 text-accent-cyan font-bold border border-accent-cyan/40 shadow-[0_0_8px_rgba(56,189,248,0.18)]'
                    : 'text-slate-300/80 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={isActive ? 'text-accent-cyan' : 'text-slate-400/80'}>0{idx + 1}</span>
                <span className="ml-1.5">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tier 2: Centered Integrated Tech Stack Signature */}
        <VisualTechStack
          technologies={['R', 'RStudio', 'Excel']}
          isCrossFading={isCrossFading}
        />
      </div>

      {/* SVG Canvas with Presence Scale Boost (~9-10%) */}
      <svg
        viewBox="70 70 700 330"
        preserveAspectRatio="xMidYMid meet"
        className={`w-full h-full max-w-full scale-[1.08] lg:scale-[1.10] origin-center px-1 pt-2 pb-16 sm:pb-16 transition-all duration-300 ease-out ${
          isCrossFading ? 'opacity-0' : 'opacity-100'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="saBandGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.03" />
          </linearGradient>

          <linearGradient id="saLineGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.7" />
          </linearGradient>

          <filter id="saGlowLarge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* BACKGROUND LAYER: Axes & Coordinates */}
        <g ref={bgRef}>
          <line x1="110" y1="355" x2="720" y2="355" stroke="#f8fafc" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="110" y1="85" x2="110" y2="355" stroke="#f8fafc" strokeWidth="1" strokeOpacity="0.15" />

          {/* Grid Subdivisions */}
          <line x1="110" y1="265" x2="720" y2="265" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="3 5" />
          <line x1="110" y1="175" x2="720" y2="175" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="3 5" />
          <line x1="260" y1="85" x2="260" y2="355" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="3 5" />
          <line x1="410" y1="85" x2="410" y2="355" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="3 5" />
          <line x1="560" y1="85" x2="560" y2="355" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="3 5" />

          {/* Clean Credible Axis Labels */}
          <text x="415" y="380" textAnchor="middle" fill="#94a3b8" fillOpacity="0.8" fontSize="9.5" fontFamily="monospace" fontWeight="600">
            RESPONSE TIME &rarr;
          </text>
          <text x="82" y="220" textAnchor="middle" fill="#94a3b8" fillOpacity="0.8" fontSize="9.5" fontFamily="monospace" fontWeight="600" transform="rotate(-90 82 220)">
            CUSTOMER SATISFACTION &uarr;
          </text>
        </g>

        {/* FOREGROUND LAYER: Confidence Band, Regression Line, Scatter Points & Evidence Marker */}
        <g ref={fgRef}>
          {/* Confidence Interval Band */}
          <polygon
            points="130,110 700,320 700,352 130,150"
            fill="url(#saBandGradLarge)"
          />
          <line x1="130" y1="110" x2="700" y2="320" stroke="#38bdf8" strokeWidth="0.85" strokeOpacity="0.3" strokeDasharray="3 3" />
          <line x1="130" y1="150" x2="700" y2="352" stroke="#38bdf8" strokeWidth="0.85" strokeOpacity="0.3" strokeDasharray="3 3" />

          {/* Strong Negative Linear Regression Line */}
          <line
            x1="120"
            y1="125"
            x2="690"
            y2="340"
            stroke="url(#saLineGradLarge)"
            strokeWidth={2.8}
            strokeLinecap="round"
          />

          {/* Residual Projection drop lines */}
          <line x1="210" y1="140" x2="210" y2="160" stroke="#38bdf8" strokeWidth="0.85" strokeOpacity="0.35" strokeDasharray="2 2" />
          <line x1="320" y1="225" x2="320" y2="202" stroke="#38bdf8" strokeWidth="0.85" strokeOpacity="0.35" strokeDasharray="2 2" />
          <line x1="460" y1="280" x2="460" y2="255" stroke="#38bdf8" strokeWidth="0.85" strokeOpacity="0.35" strokeDasharray="2 2" />
          <line x1="580" y1="285" x2="580" y2="300" stroke="#38bdf8" strokeWidth="0.85" strokeOpacity="0.35" strokeDasharray="2 2" />

          {/* Scatter Points Distribution */}
          <circle cx="150" cy="125" r="3" fill="#38bdf8" fillOpacity="0.8" />
          <circle cx="170" cy="115" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
          <circle cx="190" cy="160" r="3" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="210" cy="140" r="4" fill="#38bdf8" fillOpacity="0.95" />
          <circle cx="230" cy="175" r="2.5" fill="#38bdf8" fillOpacity="0.65" />
          <circle cx="250" cy="150" r="3" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="280" cy="185" r="2.5" fill="#38bdf8" fillOpacity="0.7" />

          <circle cx="320" cy="225" r="4.5" fill="#38bdf8" fillOpacity="0.95" />
          <circle cx="350" cy="200" r="3" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="370" cy="240" r="2.5" fill="#38bdf8" fillOpacity="0.65" />
          <circle cx="400" cy="220" r="3.5" fill="#38bdf8" fillOpacity="0.85" />
          <circle cx="430" cy="260" r="3" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="460" cy="280" r="4.5" fill="#38bdf8" fillOpacity="0.95" />

          <circle cx="500" cy="265" r="2.5" fill="#38bdf8" fillOpacity="0.65" />
          <circle cx="530" cy="305" r="3" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="550" cy="280" r="2.5" fill="#38bdf8" fillOpacity="0.65" />
          <circle cx="580" cy="285" r="4" fill="#38bdf8" fillOpacity="0.95" />
          <circle cx="610" cy="330" r="3" fill="#38bdf8" fillOpacity="0.75" />
          <circle cx="640" cy="315" r="2.5" fill="#38bdf8" fillOpacity="0.65" />
          <circle cx="660" cy="340" r="3" fill="#38bdf8" fillOpacity="0.8" />

          {/* FOCAL EVIDENCE FINDING CALLOUT BOX */}
          <g transform="translate(370, 115)">
            <rect
              x="0"
              y="0"
              width="300"
              height="72"
              rx="6"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={1}
              strokeOpacity={0.65}
            />
            <circle cx="18" cy="24" r="4" fill="#38bdf8" filter="url(#saGlowLarge)" />
            <circle cx="18" cy="24" r="9" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="0.85" />

            <text x="36" y="24" fill="#f8fafc" fontSize="11" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.02em">
              Response Time
            </text>
            <text x="36" y="40" fill="#38bdf8" fontSize="9.5" fontFamily="monospace" fontWeight="600">
              Strongest Negative Predictor
            </text>
            <text x="36" y="58" fill="#94a3b8" fillOpacity="0.95" fontSize="9" fontFamily="monospace">
              r = -0.60 &bull; p &lt; 0.001 &bull; Adj. R² = 0.88
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
