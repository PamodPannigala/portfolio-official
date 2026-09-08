import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface StageVisualProps {
  stageIndex: number;
  isCrossFading: boolean;
  compact?: boolean;
  className?: string;
}

export const StageVisual: React.FC<StageVisualProps> = ({
  stageIndex,
  isCrossFading,
  compact = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGGElement>(null);
  const bgRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Subtle zero-re-render pointer parallax: FG moves ~3px, BG moves ~-1.5px
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
      targetX = relX * 6; // Max ~3px foreground
      targetY = relY * 5;
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
        bgRef.current.style.transform = `translate3d(${(-currentX * 0.45).toFixed(2)}px, ${(-currentY * 0.45).toFixed(2)}px, 0)`;
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        compact ? 'h-[180px] sm:h-[200px]' : 'h-[220px] sm:h-[250px] lg:h-[275px]'
      } flex items-center justify-center overflow-hidden select-none rounded-xl border border-white/[0.03] bg-[#040813]/40 backdrop-blur-sm transition-all duration-300 ${className}`}
      aria-hidden="true"
    >
      {/* Restrained ambient backdrop glow behind the active focal zone */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.035),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial canvas stage indicator & abstract truthful status label */}
      <div className="absolute top-2.5 left-3 font-mono text-[9.5px] text-text-secondary/75 tracking-wider pointer-events-none">
        STAGE 0{stageIndex + 1} // ANALYTICAL CANVAS
      </div>
      <div className="absolute top-2.5 right-3 font-mono text-[9.5px] text-text-secondary/85 tracking-wider pointer-events-none">
        {stageIndex === 0 && 'RAW SIGNAL'}
        {stageIndex === 1 && 'PATTERN ISOLATED'}
        {stageIndex === 2 && 'NOISE REDUCED'}
        {stageIndex === 3 && 'INSIGHT DETECTED'}
        {stageIndex === 4 && 'ACTIONABLE OUTPUT'}
      </div>

      <svg
        viewBox="0 0 720 250"
        preserveAspectRatio="xMidYMid meet"
        className={`w-full h-full max-w-full px-2 sm:px-4 py-1 transition-opacity duration-200 ease-out ${
          isCrossFading ? 'opacity-0' : 'opacity-100'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes driftSlowA {
              0%, 100% { transform: translate(0px, 0px); }
              50% { transform: translate(3px, -3px); }
            }
            @keyframes driftSlowB {
              0%, 100% { transform: translate(0px, 0px); }
              50% { transform: translate(-3px, 2px); }
            }
            @keyframes flowDash {
              from { stroke-dashoffset: 40; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes pulseSubtle {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 0.85; }
            }
            @keyframes pulseAura {
              0%, 100% { transform: scale(1); opacity: 0.25; }
              50% { transform: scale(1.1); opacity: 0.55; }
            }
            .anim-drift-a {
              animation: driftSlowA 5.5s ease-in-out infinite;
            }
            .anim-drift-b {
              animation: driftSlowB 6.5s ease-in-out infinite;
            }
            .anim-flow {
              animation: flowDash 3s linear infinite;
            }
            .anim-pulse {
              animation: pulseSubtle 3s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .anim-drift-a, .anim-drift-b, .anim-flow, .anim-pulse {
                animation: none !important;
              }
            }
          `}</style>

          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="convergeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="insightAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ===================================================================
            STAGE 0: DATA — Sparse raw data points, loose distribution, subtle motion
            =================================================================== */}
        {stageIndex === 0 && (
          <>
            {/* Background Grid & Abstract Coordinate Hairlines */}
            <g ref={bgRef}>
              <line x1="40" y1="65" x2="680" y2="65" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.035" strokeDasharray="3 6" />
              <line x1="40" y1="130" x2="680" y2="130" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.045" strokeDasharray="3 6" />
              <line x1="40" y1="195" x2="680" y2="195" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.035" strokeDasharray="3 6" />

              <line x1="160" y1="35" x2="160" y2="225" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.05" />
              <line x1="360" y1="35" x2="360" y2="225" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.05" />
              <line x1="560" y1="35" x2="560" y2="225" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.05" />

              <text x="45" y="48" fill="#94a3b8" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace">
                [space: R^n]
              </text>
              <text x="365" y="48" fill="#94a3b8" fillOpacity="0.5" fontSize="8.5" fontFamily="monospace">
                dim_k // unindexed
              </text>
              <text x="605" y="215" fill="#94a3b8" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace">
                sparse_stream
              </text>
            </g>

            {/* Foreground Raw Data Scatter */}
            <g ref={fgRef}>
              {/* Static background reference points */}
              <circle cx="70" cy="95" r="2" fill="#38bdf8" fillOpacity="0.35" />
              <circle cx="115" cy="170" r="2.5" fill="#38bdf8" fillOpacity="0.45" />
              <circle cx="185" cy="80" r="2" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="230" cy="190" r="2.5" fill="#38bdf8" fillOpacity="0.5" />
              <circle cx="270" cy="115" r="2" fill="#38bdf8" fillOpacity="0.35" />
              <circle cx="320" cy="165" r="2" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="370" cy="90" r="2.5" fill="#38bdf8" fillOpacity="0.55" />
              <circle cx="430" cy="180" r="2" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="480" cy="70" r="2.5" fill="#38bdf8" fillOpacity="0.5" />
              <circle cx="530" cy="155" r="2" fill="#38bdf8" fillOpacity="0.35" />
              <circle cx="590" cy="85" r="2.5" fill="#38bdf8" fillOpacity="0.6" />
              <circle cx="635" cy="175" r="2" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="665" cy="110" r="2" fill="#38bdf8" fillOpacity="0.35" />

              {/* Drifting group A */}
              <g className="anim-drift-a">
                {/* Highlighted node 1 */}
                <circle cx="150" cy="135" r="3.5" fill="#38bdf8" fillOpacity="0.9" />
                <circle cx="150" cy="135" r="7.5" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="0.75" />

                {/* Highlighted node 2 */}
                <circle cx="410" cy="120" r="3.5" fill="#38bdf8" fillOpacity="0.9" />
                <circle cx="410" cy="120" r="8" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="0.75" />
              </g>

              {/* Drifting group B */}
              <g className="anim-drift-b">
                {/* Highlighted node 3 */}
                <circle cx="545" cy="105" r="3" fill="#38bdf8" fillOpacity="0.85" />
                <circle cx="545" cy="105" r="7" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.75" />

                <circle cx="210" cy="70" r="2.5" fill="#38bdf8" fillOpacity="0.65" />
                <circle cx="340" cy="195" r="2.5" fill="#38bdf8" fillOpacity="0.6" />
                <circle cx="490" cy="140" r="3" fill="#38bdf8" fillOpacity="0.7" />
              </g>
            </g>
          </>
        )}

        {/* ===================================================================
            STAGE 1: PATTERN — Points cluster, relationships/links appear, structure visible
            =================================================================== */}
        {stageIndex === 1 && (
          <>
            {/* Background Cluster Envelopes */}
            <g ref={bgRef}>
              {/* Cluster Alpha boundary */}
              <ellipse
                cx="230"
                cy="130"
                rx="145"
                ry="80"
                stroke="#38bdf8"
                strokeOpacity="0.08"
                strokeWidth="1"
                strokeDasharray="4 5"
              />
              {/* Cluster Beta boundary */}
              <ellipse
                cx="510"
                cy="130"
                rx="135"
                ry="75"
                stroke="#38bdf8"
                strokeOpacity="0.08"
                strokeWidth="1"
                strokeDasharray="4 5"
              />

              {/* Inter-cluster bridge guide */}
              <line
                x1="290"
                y1="130"
                x2="435"
                y2="130"
                stroke="#38bdf8"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeDasharray="3 4"
              />

              <text x="140" y="45" fill="#94a3b8" fillOpacity="0.6" fontSize="8.5" fontFamily="monospace">
                cluster_α // local_coherence
              </text>
              <text x="460" y="45" fill="#94a3b8" fillOpacity="0.6" fontSize="8.5" fontFamily="monospace">
                cluster_β // affinity_group
              </text>
              <text x="325" y="122" fill="#94a3b8" fillOpacity="0.55" fontSize="8" fontFamily="monospace">
                pattern_correlation
              </text>
            </g>

            {/* Foreground Structured Nodes & Connecting Chords */}
            <g ref={fgRef}>
              {/* Cluster Alpha internal relationship graph */}
              <g>
                <line x1="140" y1="115" x2="195" y2="90" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />
                <line x1="195" y1="90" x2="245" y2="120" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="0.85" />
                <line x1="195" y1="90" x2="210" y2="165" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="0.75" />
                <line x1="245" y1="120" x2="210" y2="165" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />
                <line x1="245" y1="120" x2="295" y2="105" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="0.75" />
                <line x1="210" y1="165" x2="275" y2="170" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="0.75" />
                <line x1="295" y1="105" x2="275" y2="170" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />

                <circle cx="140" cy="115" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
                <circle cx="195" cy="90" r="3.5" fill="#38bdf8" fillOpacity="0.95" />
                <circle cx="245" cy="120" r="4" fill="#38bdf8" fillOpacity="1" />
                <circle cx="210" cy="165" r="3" fill="#38bdf8" fillOpacity="0.8" />
                <circle cx="295" cy="105" r="3.5" fill="#38bdf8" fillOpacity="0.9" />
                <circle cx="275" cy="170" r="2.5" fill="#38bdf8" fillOpacity="0.7" />

                {/* Alpha centroid reticle */}
                <circle cx="245" cy="120" r="9" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />
              </g>

              {/* Inter-Cluster Link */}
              <line
                x1="295"
                y1="105"
                x2="435"
                y2="125"
                stroke="#38bdf8"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="2 3"
              />

              {/* Cluster Beta internal relationship graph */}
              <g>
                <line x1="435" y1="125" x2="480" y2="95" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="0.75" />
                <line x1="480" y1="95" x2="535" y2="115" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="0.85" />
                <line x1="480" y1="95" x2="470" y2="165" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />
                <line x1="535" y1="115" x2="470" y2="165" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />
                <line x1="535" y1="115" x2="585" y2="135" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="0.75" />
                <line x1="470" y1="165" x2="535" y2="175" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="0.75" />
                <line x1="535" y1="175" x2="585" y2="135" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />

                <circle cx="435" cy="125" r="3" fill="#38bdf8" fillOpacity="0.85" />
                <circle cx="480" cy="95" r="3.5" fill="#38bdf8" fillOpacity="0.95" />
                <circle cx="535" cy="115" r="4" fill="#38bdf8" fillOpacity="1" />
                <circle cx="470" cy="165" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
                <circle cx="535" cy="175" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
                <circle cx="585" cy="135" r="3" fill="#38bdf8" fillOpacity="0.8" />

                {/* Beta centroid reticle */}
                <circle cx="535" cy="115" r="9" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.75" />
              </g>
            </g>
          </>
        )}

        {/* ===================================================================
            STAGE 2: MODEL — Transformation path, elegant curve, processing logic
            =================================================================== */}
        {stageIndex === 2 && (
          <>
            {/* Background Margin Corridors & Boundary Envelopes */}
            <g ref={bgRef}>
              {/* Upper confidence/margin curve */}
              <path
                d="M 50 175 C 160 175, 230 55, 360 65 S 490 165, 660 80"
                stroke="#38bdf8"
                strokeWidth="0.75"
                strokeOpacity="0.12"
                strokeDasharray="3 4"
                fill="none"
              />
              {/* Lower confidence/margin curve */}
              <path
                d="M 50 215 C 160 215, 230 95, 360 105 S 490 205, 660 120"
                stroke="#38bdf8"
                strokeWidth="0.75"
                strokeOpacity="0.12"
                strokeDasharray="3 4"
                fill="none"
              />

              <line x1="50" y1="225" x2="670" y2="225" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.04" />
              <text x="50" y="45" fill="#94a3b8" fillOpacity="0.6" fontSize="8.5" fontFamily="monospace">
                f(x) &rarr; y&#770; // parameter_manifold
              </text>
              <text x="560" y="215" fill="#94a3b8" fillOpacity="0.55" fontSize="8" fontFamily="monospace">
                loss_minimized
              </text>
            </g>

            {/* Foreground Mathematical Spline & Guided Nodes */}
            <g ref={fgRef}>
              {/* Orthogonal projection residuals from sample points to curve */}
              <line x1="170" y1="195" x2="170" y2="150" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="280" y1="55" x2="280" y2="76" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="440" y1="165" x2="440" y2="136" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="560" y1="65" x2="560" y2="114" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="2 2" />

              {/* Sample points being evaluated */}
              <circle cx="170" cy="195" r="2.5" fill="#38bdf8" fillOpacity="0.6" />
              <circle cx="280" cy="55" r="2.5" fill="#38bdf8" fillOpacity="0.6" />
              <circle cx="440" cy="165" r="2.5" fill="#38bdf8" fillOpacity="0.6" />
              <circle cx="560" cy="65" r="2.5" fill="#38bdf8" fillOpacity="0.6" />

              {/* Main Elegant Spline */}
              <path
                d="M 50 195 C 160 195, 230 75, 360 85 S 490 185, 660 100"
                stroke="url(#curveGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Subtle animated flow trace along the curve */}
              <path
                d="M 50 195 C 160 195, 230 75, 360 85 S 490 185, 660 100"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.6"
                strokeDasharray="14 180"
                className="anim-flow"
                fill="none"
              />

              {/* Anchor transformation nodes on the path */}
              <circle cx="170" cy="150" r="3" fill="#38bdf8" fillOpacity="0.85" />
              <circle cx="280" cy="76" r="3" fill="#38bdf8" fillOpacity="0.9" />
              <circle cx="360" cy="85" r="4" fill="#38bdf8" fillOpacity="0.95" />
              <circle cx="440" cy="136" r="3" fill="#38bdf8" fillOpacity="0.9" />
              <circle cx="560" cy="114" r="3" fill="#38bdf8" fillOpacity="0.9" />

              {/* Terminal prediction focal point */}
              <circle cx="660" cy="100" r="5" fill="#38bdf8" filter="url(#softGlow)" />
              <circle cx="660" cy="100" r="10" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
            </g>
          </>
        )}

        {/* ===================================================================
            STAGE 3: INSIGHT — Noise reduces, key signal becomes clear, structure emphasized
            =================================================================== */}
        {stageIndex === 3 && (
          <>
            {/* Background Quiet Noise Floor (drastically reduced) */}
            <g ref={bgRef}>
              {/* Extremely faint residual noise dots */}
              <circle cx="85" cy="75" r="1.5" fill="#94a3b8" fillOpacity="0.06" />
              <circle cx="140" cy="195" r="1.5" fill="#94a3b8" fillOpacity="0.06" />
              <circle cx="205" cy="65" r="1.5" fill="#94a3b8" fillOpacity="0.06" />
              <circle cx="510" cy="65" r="1.5" fill="#94a3b8" fillOpacity="0.06" />
              <circle cx="575" cy="195" r="1.5" fill="#94a3b8" fillOpacity="0.06" />
              <circle cx="635" cy="75" r="1.5" fill="#94a3b8" fillOpacity="0.06" />

              {/* Clean horizontal baseline */}
              <line x1="50" y1="180" x2="670" y2="180" stroke="#f8fafc" strokeWidth="0.5" strokeOpacity="0.06" />

              <text x="50" y="45" fill="#94a3b8" fillOpacity="0.6" fontSize="8.5" fontFamily="monospace">
                signal_extraction // isolated_pattern
              </text>
              <text x="375" y="32" fill="#94a3b8" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                dominant_signal_peak
              </text>
              <text x="575" y="172" fill="#94a3b8" fillOpacity="0.55" fontSize="8" fontFamily="monospace">
                noise_suppressed
              </text>
            </g>

            {/* Foreground Prominent Signal Curve & Key Resonance Peak */}
            <g ref={fgRef}>
              {/* Shaded area beneath the high-signal curve */}
              <path
                d="M 60 180 L 190 180 C 265 180, 305 50, 360 45 C 415 50, 455 180, 530 180 L 660 180 Z"
                fill="url(#insightAreaGrad)"
              />

              {/* Secondary harmonic envelope */}
              <path
                d="M 190 180 C 265 180, 305 85, 360 82 C 415 85, 455 180, 530 180"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeOpacity="0.25"
                strokeDasharray="2 3"
                fill="none"
              />

              {/* Primary high-contrast signal distribution curve */}
              <path
                d="M 60 180 L 190 180 C 265 180, 305 50, 360 45 C 415 50, 455 180, 530 180 L 660 180"
                stroke="url(#cyanGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Vertical projection drop-line from peak to baseline */}
              <line
                x1="360"
                y1="45"
                x2="360"
                y2="180"
                stroke="#38bdf8"
                strokeOpacity="0.4"
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />

              {/* Baseline landing node */}
              <circle cx="360" cy="180" r="2" fill="#38bdf8" fillOpacity="0.8" />

              {/* Focal Peak Node with restrained cyan reticle */}
              <circle cx="360" cy="45" r="5" fill="#38bdf8" filter="url(#softGlow)" />
              <circle cx="360" cy="45" r="11" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
              <circle cx="360" cy="45" r="18" stroke="#38bdf8" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 3" />
            </g>
          </>
        )}

        {/* ===================================================================
            STAGE 4: DECISION — Multiple paths converge, clear actionable output, cyan emphasis
            =================================================================== */}
        {stageIndex === 4 && (
          <>
            {/* Background Converging Coordinate Guides */}
            <g ref={bgRef}>
              <line x1="60" y1="50" x2="330" y2="130" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3 5" />
              <line x1="60" y1="210" x2="330" y2="130" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3 5" />

              <text x="50" y="38" fill="#94a3b8" fillOpacity="0.6" fontSize="8.5" fontFamily="monospace">
                convergent_synthesis
              </text>
              <text x="440" y="108" fill="#94a3b8" fillOpacity="0.65" fontSize="8" fontFamily="monospace">
                actionable_vector &rarr;
              </text>
              <text x="565" y="175" fill="#94a3b8" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                actionable_output
              </text>
            </g>

            {/* Foreground Converging Paths & Unified Action Vector */}
            <g ref={fgRef}>
              {/* Upper Path */}
              <path
                d="M 60 65 C 180 65, 245 130, 330 130"
                stroke="url(#convergeGrad)"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="60" cy="65" r="3" fill="#38bdf8" fillOpacity="0.75" />

              {/* Center Direct Path */}
              <path
                d="M 60 130 L 330 130"
                stroke="url(#convergeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="60" cy="130" r="3.5" fill="#38bdf8" fillOpacity="0.9" />

              {/* Lower Path */}
              <path
                d="M 60 195 C 180 195, 245 130, 330 130"
                stroke="url(#convergeGrad)"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="60" cy="195" r="3" fill="#38bdf8" fillOpacity="0.75" />

              {/* Convergence Nexus Node */}
              <circle cx="330" cy="130" r="4.5" fill="#38bdf8" fillOpacity="0.9" />
              <circle cx="330" cy="130" r="9" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />

              {/* Single Clear Actionable Forward Trajectory Vector */}
              <line
                x1="330"
                y1="130"
                x2="590"
                y2="130"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#softGlow)"
              />

              {/* Directional Chevron Reticle */}
              <path
                d="M 578 122 L 592 130 L 578 138"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Emphasized Terminal Action Node */}
              <circle cx="620" cy="130" r="5.5" fill="#38bdf8" filter="url(#softGlow)" />
              <circle cx="620" cy="130" r="11" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.2" />
              <circle
                cx="620"
                cy="130"
                r="18"
                stroke="#38bdf8"
                strokeOpacity="0.2"
                strokeWidth="0.75"
                strokeDasharray="3 4"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
