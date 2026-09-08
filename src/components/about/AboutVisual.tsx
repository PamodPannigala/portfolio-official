import React from 'react';

export const AboutVisual: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-2xl border border-white/[0.06] bg-navy-card/40 backdrop-blur-sm p-6 sm:p-8 overflow-hidden group hover:border-accent-cyan/20 transition-colors duration-500"
      aria-label="Abstract Neural Data Topology Diagram"
    >
      {/* Whisper-soft background gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-cyan/[0.04] rounded-full blur-[70px] pointer-events-none" />

      {/* Header telemetry badge */}
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider uppercase text-text-muted">
            DATA MANIFOLD &bull; ARCHITECTURE
          </span>
        </div>
        <span className="font-mono text-[10px] text-accent-cyan/80 bg-accent-cyan/[0.08] px-2 py-0.5 rounded border border-accent-cyan/20">
          CONVERGED
        </span>
      </div>

      {/* Lightweight SVG Vector Node-Graph */}
      <div className="relative w-full aspect-[500/280]">
        <svg
          viewBox="0 0 500 280"
          className="w-full h-full select-none overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for connecting splines */}
            <linearGradient id="dataLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>

            {/* Subtle secondary graph line gradient */}
            <linearGradient id="subtleLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
            </linearGradient>

            {/* Node glow filter */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background precision grid lines (faint) */}
          <g opacity="0.08" stroke="#f8fafc" strokeWidth="0.5" strokeDasharray="3 6">
            <line x1="50" y1="40" x2="450" y2="40" />
            <line x1="50" y1="140" x2="450" y2="140" />
            <line x1="50" y1="240" x2="450" y2="240" />
            <line x1="120" y1="20" x2="120" y2="260" />
            <line x1="260" y1="20" x2="260" y2="260" />
            <line x1="400" y1="20" x2="400" y2="260" />
          </g>

          {/* Secondary architectural connection paths */}
          <path
            d="M 80 180 C 150 240, 200 80, 260 120"
            stroke="url(#subtleLineGrad)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <path
            d="M 260 120 C 320 160, 360 60, 420 100"
            stroke="url(#subtleLineGrad)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* Primary Signal Flow Curve (Smooth Catmull/Bezier Spline) */}
          <path
            id="mainFlowSpline"
            d="M 70 80 C 150 30, 180 200, 260 140 C 340 80, 370 230, 430 180"
            stroke="url(#dataLineGrad)"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-accent-cyan/60"
          />

          {/* Cross-layer feedforward path */}
          <path
            d="M 70 80 Q 250 250 430 180"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.12"
            strokeDasharray="4 6"
          />

          {/* Animated Data Signal Pulse along primary flow path */}
          <circle r="3.5" fill="#38bdf8" filter="url(#nodeGlow)">
            <animateMotion
              dur="6.5s"
              repeatCount="indefinite"
              path="M 70 80 C 150 30, 180 200, 260 140 C 340 80, 370 230, 430 180"
            />
          </circle>

          {/* Second offset data packet */}
          <circle r="2.5" fill="#818cf8" opacity="0.8">
            <animateMotion
              dur="6.5s"
              begin="3.25s"
              repeatCount="indefinite"
              path="M 70 80 C 150 30, 180 200, 260 140 C 340 80, 370 230, 430 180"
            />
          </circle>

          {/* Key Coordinate Nodes */}
          {/* Node 1: Raw Feature Space */}
          <g className="transition-transform duration-300 group-hover:scale-105" style={{ transformOrigin: '70px 80px' }}>
            <circle cx="70" cy="80" r="10" fill="#05070c" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="70" cy="80" r="4.5" fill="#38bdf8" filter="url(#nodeGlow)" />
            <text x="70" y="60" textAnchor="middle" fill="#94a3b8" className="font-mono text-[9px] tracking-wider uppercase font-semibold">
              INPUT x
            </text>
            <text x="70" y="105" textAnchor="middle" fill="#64748b" className="font-mono text-[8px]">
              [ ℝ⁵¹² ]
            </text>
          </g>

          {/* Node 2: Feature Transformation */}
          <g className="transition-transform duration-300 group-hover:scale-105" style={{ transformOrigin: '180px 175px' }}>
            <circle cx="180" cy="175" r="7" fill="#05070c" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="180" cy="175" r="3" fill="#818cf8" />
            <text x="180" y="198" textAnchor="middle" fill="#64748b" className="font-mono text-[8px]">
              W₁ &bull; x + b
            </text>
          </g>

          {/* Node 3: Latent Representation (Central Hub) */}
          <g className="transition-transform duration-300 group-hover:scale-105" style={{ transformOrigin: '260px 140px' }}>
            <circle cx="260" cy="140" r="14" fill="#05070c" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3" />
            <circle cx="260" cy="140" r="6" fill="#38bdf8" filter="url(#nodeGlow)" />
            <circle cx="260" cy="140" r="2" fill="#ffffff" />
            <text x="260" y="116" textAnchor="middle" fill="#f8fafc" className="font-mono text-[9.5px] font-medium tracking-wide">
              LATENT z
            </text>
            <text x="260" y="170" textAnchor="middle" fill="#38bdf8" className="font-mono text-[8.5px] opacity-90">
              μ=0, σ=1
            </text>
          </g>

          {/* Node 4: High-dimensional Optimization */}
          <g className="transition-transform duration-300 group-hover:scale-105" style={{ transformOrigin: '355px 95px' }}>
            <circle cx="355" cy="95" r="7" fill="#05070c" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="355" cy="95" r="3" fill="#6366f1" />
            <text x="355" y="78" textAnchor="middle" fill="#64748b" className="font-mono text-[8px]">
              ∇L(θ)
            </text>
          </g>

          {/* Node 5: Output Prediction Manifold */}
          <g className="transition-transform duration-300 group-hover:scale-105" style={{ transformOrigin: '430px 180px' }}>
            <circle cx="430" cy="180" r="12" fill="#05070c" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
            <circle cx="430" cy="180" r="5" fill="#38bdf8" filter="url(#nodeGlow)" />
            <circle cx="430" cy="180" r="2" fill="#ffffff" />
            <text x="430" y="158" textAnchor="middle" fill="#f8fafc" className="font-mono text-[9.5px] font-medium tracking-wide">
              OUTPUT ŷ
            </text>
            <text x="430" y="206" textAnchor="middle" fill="#38bdf8" className="font-mono text-[8.5px] opacity-90">
              acc: 98.6%
            </text>
          </g>
        </svg>
      </div>

      {/* Footer Metrics Row */}
      <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-text-muted font-mono text-[10.5px]">
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-accent-cyan/80" />
          <span>LOSS: 0.0142</span>
        </span>
        <span className="hidden sm:inline text-white/20">&bull;</span>
        <span className="hidden sm:inline">OPTIMIZER: ADAMW</span>
        <span className="text-white/20">&bull;</span>
        <span className="text-accent-cyan/90 font-medium">PRECISION: FP32</span>
      </div>
    </div>
  );
};
