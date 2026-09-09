import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { VisualTechStack } from '../VisualTechStack';

interface CampusOperationsVisualProps {
  className?: string;
  isCrossFading?: boolean;
}

export const CampusOperationsVisual: React.FC<CampusOperationsVisualProps> = ({
  className = '',
  isCrossFading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGGElement>(null);
  const bgRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Active highlighted flow segment (0: ASSETS & QR, 1: OPERATIONS, 2: ANALYTICS, 3: HEALTH INTEL)
  const [activeFlowIndex, setActiveFlowIndex] = useState<number>(0);

  // Auto-cycle active highlight flow subtly if not reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveFlowIndex((prev) => (prev + 1) % 4);
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

  const flowLabels = ['ASSETS & QR', 'OPERATIONS', 'ANALYTICS', 'HEALTH INTEL'];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[490px] xl:min-h-[530px] flex items-center justify-center overflow-hidden select-none rounded-lg border border-white/[0.025] bg-[#02050e]/40 transition-all duration-300 ${className}`}
      aria-label="Smart Campus Operations Hub Interactive System Architecture"
    >
      {/* Editorial Open Canvas Corner Framing Marks (non-card feeling) */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

      {/* Ambient background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.035),transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Editorial Canvas Header */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/90 animate-pulse" />
        <span className="font-mono text-[10.5px] sm:text-[11.5px] text-text-secondary/85 tracking-wider uppercase">
          SYSTEM ARCHITECTURE
        </span>
      </div>

      <div className="absolute top-3.5 right-4 flex items-center gap-3 pointer-events-none z-10">
        <span className="font-mono text-[10.5px] sm:text-[11.5px] text-accent-cyan tracking-wider uppercase font-semibold">
          STAGE: {flowLabels[activeFlowIndex]}
        </span>
      </div>

      {/* Centered & Balanced Interactive Canvas Footer */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-4 right-4 flex flex-col items-center justify-center gap-2 pt-2.5 border-t border-white/[0.06] z-10 bg-[#02050e]/50 backdrop-blur-[2px]">
        {/* Tier 1: Clean, Centered Stage Navigation Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full no-scrollbar">
          {flowLabels.map((label, idx) => {
            const isActive = activeFlowIndex === idx;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFlowIndex(idx)}
                className={`font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-accent-cyan/15 text-accent-cyan font-bold border border-accent-cyan/40 shadow-[0_0_8px_rgba(56,189,248,0.18)]'
                    : 'text-slate-300/80 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={isActive ? 'text-accent-cyan' : 'text-slate-400/80'}>0{idx + 1}</span>
                <span className="ml-1.5">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Tier 2: Centered Integrated Tech Stack Signature */}
        <VisualTechStack
          technologies={['React', 'Java', 'Spring Boot', 'MySQL', 'REST API']}
          isCrossFading={isCrossFading}
        />
      </div>

      {/* SVG Canvas with Presence Scale Boost (~9-10%) */}
      <svg
        viewBox="60 65 680 340"
        preserveAspectRatio="xMidYMid meet"
        className={`w-full h-full max-w-full scale-[1.08] lg:scale-[1.10] origin-center px-1 pt-2 pb-16 sm:pb-16 transition-all duration-300 ease-out ${
          isCrossFading ? 'opacity-0' : 'opacity-100'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="coWireGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.45" />
          </linearGradient>

          <filter id="coGlowLarge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* BACKGROUND LAYER: Isometric Floor Plane & Coordinate Guides */}
        <g ref={bgRef}>
          <g opacity="0.4">
            <line x1="80" y1="360" x2="720" y2="360" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.08" />
            <line x1="110" y1="310" x2="690" y2="310" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.06" />
            <line x1="140" y1="260" x2="660" y2="260" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.05" />

            <line x1="100" y1="360" x2="190" y2="130" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="3 4" />
            <line x1="280" y1="360" x2="330" y2="130" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="3 4" />
            <line x1="520" y1="360" x2="470" y2="130" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="3 4" />
            <line x1="700" y1="360" x2="610" y2="130" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="3 4" />
          </g>
        </g>

        {/* FOREGROUND LAYER: The 4 Enriched Nodes & Primary Flow */}
        <g ref={fgRef}>
          {/* Main Pipeline Curved Backbone */}
          <path
            d="M 150 220 C 230 180, 270 195, 340 215 S 460 255, 530 195 S 600 160, 650 180"
            stroke="url(#coWireGradLarge)"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Flow Chords connecting nodes with active emphasis */}
          <line
            x1="160"
            y1="230"
            x2="310"
            y2="170"
            stroke="#38bdf8"
            strokeWidth={activeFlowIndex === 0 || activeFlowIndex === 1 ? 2 : 1}
            strokeOpacity={activeFlowIndex === 0 || activeFlowIndex === 1 ? 0.85 : 0.25}
          />
          <line
            x1="310"
            y1="170"
            x2="480"
            y2="170"
            stroke="#38bdf8"
            strokeWidth={activeFlowIndex === 1 || activeFlowIndex === 2 ? 2 : 1}
            strokeOpacity={activeFlowIndex === 1 || activeFlowIndex === 2 ? 0.85 : 0.25}
          />
          <line
            x1="480"
            y1="170"
            x2="630"
            y2="230"
            stroke="#38bdf8"
            strokeWidth={activeFlowIndex === 2 || activeFlowIndex === 3 ? 2 : 1}
            strokeOpacity={activeFlowIndex === 2 || activeFlowIndex === 3 ? 0.85 : 0.25}
          />

          {/* Vertical Drop Residuals */}
          <line x1="160" y1="230" x2="160" y2="330" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="2 3" />
          <line x1="310" y1="170" x2="310" y2="300" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="2 3" />
          <line x1="480" y1="170" x2="480" y2="300" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="2 3" />
          <line x1="630" y1="230" x2="630" y2="330" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="2 3" />

          {/* Footprints */}
          <ellipse cx="160" cy="330" rx="36" ry="12" fill="#38bdf8" fillOpacity="0.05" />
          <ellipse cx="310" cy="300" rx="38" ry="13" fill="#38bdf8" fillOpacity="0.06" />
          <ellipse cx="480" cy="300" rx="38" ry="13" fill="#38bdf8" fillOpacity="0.06" />
          <ellipse cx="630" cy="330" rx="36" ry="12" fill="#38bdf8" fillOpacity="0.05" />

          {/* NODE 1: ASSETS & QR (x: 160, y: 230) */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveFlowIndex(0)}
          >
            <polygon
              points="115,205 160,188 205,205 160,222"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 0 ? 1.75 : 0.85}
              strokeOpacity={activeFlowIndex === 0 ? 0.95 : 0.4}
            />
            <polygon
              points="115,205 115,248 160,265 160,222"
              fill="#081426"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 0 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 0 ? 0.7 : 0.25}
            />
            <polygon
              points="205,205 205,248 160,265 160,222"
              fill="#040a15"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 0 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 0 ? 0.7 : 0.25}
            />

            <circle cx="160" cy="205" r="4.5" fill="#38bdf8" filter="url(#coGlowLarge)" />
            <circle cx="160" cy="205" r="10" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="0.85" />

            <text x="160" y="172" textAnchor="middle" fill="#f8fafc" fillOpacity={activeFlowIndex === 0 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              ASSETS & QR
            </text>
            <text x="160" y="285" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              MySQL Relational Store
            </text>
          </g>

          {/* NODE 2: OPERATIONS (x: 310, y: 170) */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveFlowIndex(1)}
          >
            <polygon
              points="265,145 310,128 355,145 310,162"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 1 ? 1.75 : 0.85}
              strokeOpacity={activeFlowIndex === 1 ? 0.95 : 0.4}
            />
            <polygon
              points="265,145 265,188 310,205 310,162"
              fill="#081426"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 1 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 1 ? 0.7 : 0.25}
            />
            <polygon
              points="355,145 355,188 310,205 310,162"
              fill="#040a15"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 1 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 1 ? 0.7 : 0.25}
            />

            <circle cx="310" cy="145" r="5" fill="#38bdf8" filter="url(#coGlowLarge)" />
            <circle cx="310" cy="145" r="11" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="0.85" />

            <text x="310" y="112" textAnchor="middle" fill="#f8fafc" fillOpacity={activeFlowIndex === 1 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              OPERATIONS
            </text>
            <text x="310" y="225" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              REST Service / Dispatch
            </text>
          </g>

          {/* NODE 3: ANALYTICS (x: 480, y: 170) */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveFlowIndex(2)}
          >
            <polygon
              points="435,145 480,128 525,145 480,162"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 2 ? 1.75 : 0.85}
              strokeOpacity={activeFlowIndex === 2 ? 0.95 : 0.4}
            />
            <polygon
              points="435,145 435,188 480,205 480,162"
              fill="#081426"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 2 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 2 ? 0.7 : 0.25}
            />
            <polygon
              points="525,145 525,188 480,205 480,162"
              fill="#040a15"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 2 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 2 ? 0.7 : 0.25}
            />

            <circle cx="480" cy="145" r="5" fill="#38bdf8" filter="url(#coGlowLarge)" />
            <circle cx="480" cy="145" r="11" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="0.85" />

            <text x="480" y="112" textAnchor="middle" fill="#f8fafc" fillOpacity={activeFlowIndex === 2 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              ANALYTICS
            </text>
            <text x="480" y="225" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              Dashboard / Excel Export
            </text>
          </g>

          {/* NODE 4: HEALTH SCORING (x: 630, y: 230) */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveFlowIndex(3)}
          >
            <polygon
              points="585,205 630,188 675,205 630,222"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 3 ? 1.75 : 0.85}
              strokeOpacity={activeFlowIndex === 3 ? 0.95 : 0.4}
            />
            <polygon
              points="585,205 585,248 630,265 630,222"
              fill="#081426"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 3 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 3 ? 0.7 : 0.25}
            />
            <polygon
              points="675,205 675,248 630,265 630,222"
              fill="#040a15"
              stroke="#38bdf8"
              strokeWidth={activeFlowIndex === 3 ? 1.4 : 0.6}
              strokeOpacity={activeFlowIndex === 3 ? 0.7 : 0.25}
            />

            <circle cx="630" cy="205" r="6" fill="#38bdf8" filter="url(#coGlowLarge)" />
            <circle cx="630" cy="205" r="13" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.2" />
            <circle cx="630" cy="205" r="20" stroke="#38bdf8" strokeOpacity="0.2" strokeWidth="0.85" strokeDasharray="3 3" />

            <text x="630" y="172" textAnchor="middle" fill="#f8fafc" fillOpacity={activeFlowIndex === 3 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              HEALTH SCORING
            </text>
            <text x="630" y="285" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              Predictive Equipment AI
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
