import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ExperienceContextArea } from '@/data/portfolioData';

interface ExperienceMapVisualProps {
  contextAreas: ExperienceContextArea[];
  activeAreaId: string;
  onSelectArea: (id: string) => void;
  className?: string;
}

export const ExperienceMapVisual: React.FC<ExperienceMapVisualProps> = ({
  contextAreas,
  activeAreaId,
  onSelectArea,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGGElement>(null);
  const centerRef = useRef<SVGGElement>(null);
  const bgRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeArea =
    contextAreas.find((a) => a.id === activeAreaId) ?? contextAreas[0];

  // Subtle pointer parallax (Zero-re-render with RAF)
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
      if (centerRef.current) {
        centerRef.current.style.transform = `translate3d(${(currentX * 0.35).toFixed(2)}px, ${(currentY * 0.35).toFixed(2)}px, 0)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${(-currentX * 0.25).toFixed(2)}px, ${(-currentY * 0.25).toFixed(2)}px, 0)`;
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

  // Spatial coordinates for the 4 contextual nodes (viewBox: 800 x 425, Center: 400, 205)
  // Top node spacing tuned: 14px separation between descriptor and node circle
  // Compact vertical layout perfectly aligns with left-side column ending
  const nodeLayout = [
    {
      id: 'ai-ml',
      x: 400,
      y: 84,
      labelX: 400,
      labelY: 26,
      textAnchor: 'middle' as const,
      lineTarget: { x1: 400, y1: 152, x2: 400, y2: 114 },
    },
    {
      id: 'data-science',
      x: 130,
      y: 205,
      labelX: 130,
      labelY: 254,
      textAnchor: 'middle' as const,
      lineTarget: { x1: 330, y1: 205, x2: 194, y2: 205 },
    },
    {
      id: 'enterprise-it',
      x: 670,
      y: 205,
      labelX: 670,
      labelY: 254,
      textAnchor: 'middle' as const,
      lineTarget: { x1: 470, y1: 205, x2: 606, y2: 205 },
    },
    {
      id: 'technical-work',
      x: 400,
      y: 326,
      labelX: 400,
      labelY: 372,
      textAnchor: 'middle' as const,
      lineTarget: { x1: 400, y1: 258, x2: 400, y2: 296 },
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[410px] sm:min-h-[440px] lg:min-h-[465px] xl:min-h-[480px] flex flex-col justify-between overflow-hidden select-none rounded-lg border border-white/[0.04] bg-[#02050e]/50 backdrop-blur-sm transition-all duration-300 ${className}`}
      aria-label="Digital Lab Interactive Experience Systems Map"
    >
      {/* Corner Framing Marks */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

      {/* Atmospheric Ambient Radial Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,rgba(56,189,248,0.045),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header Tagging */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/90 animate-pulse" />
        <span className="font-mono text-[11px] sm:text-xs text-text-secondary/90 tracking-wider uppercase font-medium">
          SYSTEMS CONTEXT MAP
        </span>
      </div>

      <div className="absolute top-3.5 right-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="font-mono text-[11px] sm:text-xs text-accent-cyan tracking-wider uppercase font-semibold">
          SLT-MOBITEL · DIGITAL LAB
        </span>
      </div>

      {/* Interactive SVG Network Map Canvas */}
      <div className="relative w-full flex-1 flex items-center justify-center pt-8 sm:pt-9 pb-1 px-2">
        <svg
          viewBox="0 0 800 425"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-w-full origin-center"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="group"
          aria-label="Interactive Context Map"
        >
          <defs>
            <filter id="expCyanGlowRefined" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* =========================================================================
              1. BACKGROUND LAYER: Subtle orbital lines, crosshairs, guides
              ========================================================================= */}
          <g ref={bgRef}>
            {/* Range Orbit Rings */}
            <circle cx="400" cy="205" r="145" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 4" />
            <circle cx="400" cy="205" r="95" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.06" strokeDasharray="2 3" />

            {/* Coordinate Axis Lines */}
            <line x1="110" y1="205" x2="690" y2="205" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.04" />
            <line x1="400" y1="30" x2="400" y2="380" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.04" />

            {/* Micro Alignment Crosshairs */}
            <line x1="390" y1="205" x2="410" y2="205" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.25" />
            <line x1="400" y1="195" x2="400" y2="215" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.25" />
          </g>

          {/* =========================================================================
              2. CENTRAL NODE: SLT-MOBITEL DIGITAL LAB HUB
              ========================================================================= */}
          <g ref={centerRef}>
            {/* Outer Hexagon / Soft Diamond Frame */}
            <polygon
              points="400,152 470,178 470,232 400,258 330,232 330,178"
              fill="#060e1d"
              stroke="#38bdf8"
              strokeWidth="1.35"
              strokeOpacity="0.6"
            />

            {/* Inner Fill with Contrast */}
            <polygon
              points="400,160 460,183 460,227 400,250 340,227 340,183"
              fill="#08152b"
              fillOpacity="0.92"
            />

            {/* Authentic SLT-MOBITEL Brand Mark Inside Central Hub */}
            <g transform="translate(388, 170)">
              <svg width="24" height="24" viewBox="0 0 48 52" fill="none">
                <line x1="22" y1="8" x2="10" y2="28" stroke="#00a2e8" strokeWidth="6" strokeLinecap="round" />
                <line x1="10" y1="34" x2="4" y2="44" stroke="#0054a6" strokeWidth="6" strokeLinecap="round" />
                <circle cx="24" cy="34" r="3.5" fill="#7ac142" />
                <line x1="38" y1="28" x2="28" y2="44" stroke="#43b02a" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </g>

            {/* Central Hub Typography */}
            <text
              x="400"
              y="214"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="13.5"
              fontFamily="monospace"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              DIGITAL LAB
            </text>
            <text
              x="400"
              y="232"
              textAnchor="middle"
              fill="#38bdf8"
              fillOpacity="0.95"
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="600"
              letterSpacing="0.08em"
            >
              SLT-MOBITEL
            </text>
          </g>

          {/* =========================================================================
              3. FOREGROUND: Connecting Vectors & 4 Context Nodes
              ========================================================================= */}
          <g ref={fgRef}>
            {nodeLayout.map((layout) => {
              const area = contextAreas.find((a) => a.id === layout.id)!;
              const isActive = activeAreaId === layout.id;

              return (
                <g
                  key={layout.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${area.title}: ${area.descriptor}`}
                  onClick={() => onSelectArea(layout.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectArea(layout.id);
                    }
                  }}
                  className="cursor-pointer focus:outline-none group select-none"
                >
                  {/* Vector Line Connection to Center */}
                  <line
                    x1={layout.lineTarget.x1}
                    y1={layout.lineTarget.y1}
                    x2={layout.lineTarget.x2}
                    y2={layout.lineTarget.y2}
                    stroke={isActive ? '#38bdf8' : '#f8fafc'}
                    strokeWidth={isActive ? 2 : 0.85}
                    strokeOpacity={isActive ? 0.95 : 0.22}
                    strokeDasharray={isActive ? 'none' : '3 3'}
                    className="transition-all duration-300"
                  />

                  {/* Flow Pulse Particle for Active Connection */}
                  {isActive && (
                    <circle
                      cx={(layout.lineTarget.x1 + layout.lineTarget.x2) / 2}
                      cy={(layout.lineTarget.y1 + layout.lineTarget.y2) / 2}
                      r="2.5"
                      fill="#38bdf8"
                      filter="url(#expCyanGlowRefined)"
                      className={prefersReducedMotion ? '' : 'animate-ping'}
                    />
                  )}

                  {/* Node Anchor Circle */}
                  <circle
                    cx={layout.x}
                    cy={layout.y}
                    r="28"
                    fill="#060c18"
                    stroke={isActive ? '#38bdf8' : '#f8fafc'}
                    strokeWidth={isActive ? 2 : 0.85}
                    strokeOpacity={isActive ? 0.95 : 0.3}
                    className="transition-all duration-300 group-hover:stroke-accent-cyan group-hover:stroke-opacity-80"
                  />

                  {/* Active Highlight Orbit Ring */}
                  {isActive && (
                    <circle
                      cx={layout.x}
                      cy={layout.y}
                      r="35"
                      stroke="#38bdf8"
                      strokeWidth="0.85"
                      strokeOpacity="0.45"
                      strokeDasharray="2 3"
                      className={prefersReducedMotion ? '' : 'animate-spin origin-center'}
                      style={{ transformOrigin: `${layout.x}px ${layout.y}px` }}
                    />
                  )}

                  {/* Step Index (01, 02, 03, 04) */}
                  <text
                    x={layout.x}
                    y={layout.y + 5}
                    textAnchor="middle"
                    fill={isActive ? '#38bdf8' : '#e2e8f0'}
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="700"
                    className="transition-colors duration-200"
                  >
                    {area.step}
                  </text>

                  {/* Primary Node Name Label */}
                  <text
                    x={layout.labelX}
                    y={layout.labelY}
                    textAnchor={layout.textAnchor}
                    fill={isActive ? '#ffffff' : '#f1f5f9'}
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight={isActive ? '700' : '600'}
                    letterSpacing="0.06em"
                    className="transition-colors duration-200 group-hover:fill-white"
                  >
                    {area.title}
                  </text>

                  {/* Grounded Subtitle Label (Tuned contrast & 10% boosted legibility) */}
                  <text
                    x={layout.labelX}
                    y={layout.labelY + 15}
                    textAnchor={layout.textAnchor}
                    fill={isActive ? '#38bdf8' : '#9bb0c1'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="500"
                    letterSpacing="0.03em"
                    className="transition-colors duration-200"
                  >
                    {area.shortTitle}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* =========================================================================
          4. REFINED OPEN EDITORIAL SELECTED-NODE DETAIL (Aligned Baseline)
          ========================================================================= */}
      <div className="relative z-10 mx-4 sm:mx-6 mb-2.5 sm:mb-3 pt-2.5 sm:pt-3 border-t border-white/[0.08] transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-[12.5px] font-bold text-accent-cyan">
              {activeArea.step}
            </span>
            <span className="text-white/30 font-mono text-xs">/</span>
            <span className="font-mono text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-white">
              {activeArea.title}
            </span>
          </div>

          <span className="font-mono text-[10.5px] sm:text-[11px] text-accent-cyan/90 uppercase tracking-wider font-semibold">
            {activeArea.shortTitle}
          </span>
        </div>

        <p className="font-body text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal">
          {activeArea.descriptor}
        </p>
      </div>
    </div>
  );
};
