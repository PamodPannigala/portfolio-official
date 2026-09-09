import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { VisualTechStack } from '../VisualTechStack';

interface F1DataPipelineVisualProps {
  className?: string;
  isCrossFading?: boolean;
}

export const F1DataPipelineVisual: React.FC<F1DataPipelineVisualProps> = ({
  className = '',
  isCrossFading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGGElement>(null);
  const bgRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Active highlighted pipeline stage (0: RAW F1 DATA, 1: ETL, 2: STAR SCHEMA, 3: SSAS / OLAP, 4: POWER BI / EXCEL)
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  // Auto-cycle pipeline stages subtly
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % 5);
    }, 3600);
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

  const pipelineStages = [
    { label: 'RAW F1 DATA', sub: '500,000+ Records' },
    { label: 'ETL', sub: 'SSIS Pipelines' },
    { label: 'STAR SCHEMA', sub: 'Fact & Dim Relational' },
    { label: 'SSAS / OLAP', sub: 'Cube Aggregations' },
    { label: 'POWER BI / EXCEL', sub: 'Analytical Endpoints' },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[490px] xl:min-h-[530px] flex items-center justify-center overflow-hidden select-none rounded-lg border border-white/[0.025] bg-[#02050e]/40 transition-all duration-300 ${className}`}
      aria-label="Formula 1 Analytics Data Warehouse & Pipeline Architecture"
    >
      {/* Editorial Open Canvas Corner Framing Marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

      {/* Ambient background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.035),transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Editorial Canvas Header Micro-tags */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/90 animate-pulse" />
        <span className="font-mono text-[10.5px] sm:text-[11.5px] text-text-secondary/85 tracking-wider uppercase">
          DATA PIPELINE ARCHITECTURE
        </span>
      </div>

      <div className="absolute top-3.5 right-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="font-mono text-[10.5px] sm:text-[11.5px] text-accent-cyan tracking-wider uppercase font-semibold">
          500,000+ F1 RECORDS
        </span>
      </div>

      {/* Centered & Balanced Interactive Canvas Footer */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-4 right-4 flex flex-col items-center justify-center gap-2 pt-2.5 border-t border-white/[0.06] z-10 bg-[#02050e]/50 backdrop-blur-[2px]">
        {/* Tier 1: Clean, Centered Stage Navigation Row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full no-scrollbar">
          {pipelineStages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase px-2 sm:px-2.5 py-1 rounded transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-accent-cyan/15 text-accent-cyan font-bold border border-accent-cyan/40 shadow-[0_0_8px_rgba(56,189,248,0.18)]'
                    : 'text-slate-300/80 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={isActive ? 'text-accent-cyan' : 'text-slate-400/80'}>0{idx + 1}</span>
                <span className="ml-1.5">{stage.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tier 2: Centered Integrated Tech Stack Signature */}
        <VisualTechStack
          technologies={['SQL', 'SSIS', 'SSAS', 'Power BI', 'Excel']}
          isCrossFading={isCrossFading}
        />
      </div>

      {/* SVG Canvas with Horizontal Safe Margins & Balanced Centering */}
      <svg
        viewBox="30 75 765 320"
        preserveAspectRatio="xMidYMid meet"
        className={`w-full h-full max-w-full px-2 sm:px-3 pt-2 pb-16 sm:pb-16 transition-opacity duration-200 ease-out ${
          isCrossFading ? 'opacity-0' : 'opacity-100'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="f1LineGradLarge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
          </linearGradient>

          <filter id="f1GlowLarge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* BACKGROUND LAYER: Pipeline Grid Rails */}
        <g ref={bgRef}>
          <line x1="45" y1="230" x2="785" y2="230" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="4 6" />
          <line x1="45" y1="120" x2="785" y2="120" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="4 6" />
          <line x1="45" y1="340" x2="785" y2="340" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="4 6" />

          {/* Vertical Milestone Dividers */}
          <line x1="192" y1="90" x2="192" y2="370" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="342" y1="90" x2="342" y2="370" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="505" y1="90" x2="505" y2="370" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="645" y1="90" x2="645" y2="370" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.06" />
        </g>

        {/* FOREGROUND LAYER: The 5 Pipeline Stations */}
        <g ref={fgRef}>
          {/* Main Flow Spine line */}
          <line
            x1="125"
            y1="230"
            x2="705"
            y2="230"
            stroke="url(#f1LineGradLarge)"
            strokeWidth={2}
          />

          {/* Animated data packet indicator */}
          <circle
            cx={[125, 260, 425, 585, 705][activeStageIndex]}
            cy="230"
            r="7"
            fill="#38bdf8"
            filter="url(#f1GlowLarge)"
            className="transition-all duration-500 ease-out"
          />
          <circle
            cx={[125, 260, 425, 585, 705][activeStageIndex]}
            cy="230"
            r="14"
            stroke="#38bdf8"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            className="transition-all duration-500 ease-out"
          />

          {/* STATION 1: RAW F1 STREAM */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveStageIndex(0)}
          >
            <rect
              x="70"
              y="185"
              width="110"
              height="90"
              rx="6"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 0 ? 1.75 : 0.85}
              strokeOpacity={activeStageIndex === 0 ? 0.95 : 0.35}
            />
            <line x1="83" y1="210" x2="167" y2="210" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" />
            <line x1="83" y1="225" x2="153" y2="225" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35" />
            <line x1="83" y1="240" x2="163" y2="240" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35" />

            <circle cx="125" cy="230" r="4" fill="#38bdf8" />

            <text x="125" y="165" textAnchor="middle" fill="#f8fafc" fillOpacity={activeStageIndex === 0 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              RAW F1 DATA
            </text>
            <text x="125" y="302" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              Lap & Sector Feeds
            </text>
          </g>

          {/* STATION 2: SSIS ETL ENGINE & SCD2 */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveStageIndex(1)}
          >
            <polygon
              points="260,180 310,230 260,280 210,230"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 1 ? 1.75 : 0.85}
              strokeOpacity={activeStageIndex === 1 ? 0.95 : 0.35}
            />
            <circle cx="260" cy="230" r="4.5" fill="#38bdf8" />

            <text x="260" y="165" textAnchor="middle" fill="#f8fafc" fillOpacity={activeStageIndex === 1 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              SSIS ETL
            </text>
            <text x="260" y="302" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              SCD Type 2 Pipelines
            </text>
          </g>

          {/* STATION 3: STAR SCHEMA CORE */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveStageIndex(2)}
          >
            {/* Chords to Dimension satellites */}
            <line x1="425" y1="200" x2="425" y2="145" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 2" />
            <line x1="425" y1="260" x2="425" y2="315" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 2" />
            <line x1="375" y1="230" x2="340" y2="230" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 2" />
            <line x1="475" y1="230" x2="510" y2="230" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 2" />

            {/* Satellite Dims */}
            <circle cx="425" cy="145" r="9" fill="#081426" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
            <text x="425" y="130" textAnchor="middle" fill="#94a3b8" fillOpacity="0.8" fontSize="8" fontFamily="monospace" fontWeight="600">DimDriver</text>

            <circle cx="425" cy="315" r="9" fill="#081426" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
            <text x="425" y="338" textAnchor="middle" fill="#94a3b8" fillOpacity="0.8" fontSize="8" fontFamily="monospace" fontWeight="600">DimCircuit</text>

            <circle cx="340" cy="230" r="9" fill="#081426" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
            <text x="340" y="250" textAnchor="middle" fill="#94a3b8" fillOpacity="0.8" fontSize="8" fontFamily="monospace" fontWeight="600">DimDate</text>

            <circle cx="510" cy="230" r="9" fill="#081426" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
            <text x="510" y="250" textAnchor="middle" fill="#94a3b8" fillOpacity="0.8" fontSize="8" fontFamily="monospace" fontWeight="600">DimConstructor</text>

            {/* Central Fact Lap Times Table */}
            <rect
              x="375"
              y="200"
              width="100"
              height="60"
              rx="6"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 2 ? 2 : 1}
              strokeOpacity={activeStageIndex === 2 ? 1 : 0.45}
            />
            <text x="425" y="226" textAnchor="middle" fill="#38bdf8" fillOpacity="1" fontSize="9.5" fontFamily="monospace" fontWeight="700">
              FactRaceResults
            </text>
            <text x="425" y="244" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8" fontFamily="monospace">
              500,000+ Records
            </text>

            <text x="425" y="105" textAnchor="middle" fill="#f8fafc" fillOpacity={activeStageIndex === 2 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              STAR SCHEMA
            </text>
          </g>

          {/* STATION 4: SSAS OLAP CUBE */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveStageIndex(3)}
          >
            <polygon
              points="585,190 625,208 585,226 545,208"
              fill="#081426"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 3 ? 1.75 : 0.85}
              strokeOpacity={activeStageIndex === 3 ? 0.95 : 0.4}
            />
            <polygon
              points="545,208 585,226 585,272 545,254"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 3 ? 1.4 : 0.6}
              strokeOpacity={activeStageIndex === 3 ? 0.7 : 0.3}
            />
            <polygon
              points="625,208 585,226 585,272 625,254"
              fill="#040a15"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 3 ? 1.4 : 0.6}
              strokeOpacity={activeStageIndex === 3 ? 0.7 : 0.3}
            />

            <circle cx="585" cy="226" r="4.5" fill="#38bdf8" />

            <text x="585" y="165" textAnchor="middle" fill="#f8fafc" fillOpacity={activeStageIndex === 3 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              SSAS CUBE
            </text>
            <text x="585" y="302" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              Multi-dim OLAP
            </text>
          </g>

          {/* STATION 5: POWER BI & EXCEL */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveStageIndex(4)}
          >
            <rect
              x="655"
              y="185"
              width="100"
              height="90"
              rx="6"
              fill="#060d1d"
              stroke="#38bdf8"
              strokeWidth={activeStageIndex === 4 ? 2 : 0.85}
              strokeOpacity={activeStageIndex === 4 ? 1 : 0.35}
            />

            {/* Sparkline */}
            <polyline
              points="670,248 685,230 700,240 723,212 740,218"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="723" cy="212" r="3.5" fill="#38bdf8" filter="url(#f1GlowLarge)" />

            <text x="705" y="165" textAnchor="middle" fill="#f8fafc" fillOpacity={activeStageIndex === 4 ? 1 : 0.8} fontSize="11" fontFamily="monospace" fontWeight="700">
              POWER BI
            </text>
            <text x="705" y="302" textAnchor="middle" fill="#94a3b8" fillOpacity="0.75" fontSize="8.5" fontFamily="monospace">
              Excel / BI Reports
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
