import React from 'react';

interface AcademicProgressionVisualProps {
  activeClusterId?: string | null;
}

const NODES = [
  { id: 'computing-foundations', label: 'COMPUTING', sub: 'Foundations' },
  { id: 'data-systems', label: 'DATA SYSTEMS', sub: 'Architecture' },
  { id: 'analytical-foundations', label: 'ANALYTICS', sub: 'Modeling' },
  { id: 'data-science', label: 'DATA SCIENCE', sub: 'Specialization' },
];

export const AcademicProgressionVisual: React.FC<AcademicProgressionVisualProps> = ({
  activeClusterId,
}) => {
  return (
    <div
      className="relative w-full py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg border border-white/[0.04] bg-white/[0.008] my-4 select-none"
      aria-label="Conceptual Academic Progression"
    >
      <div className="flex items-center justify-between relative">
        {/* Connecting Trace Line */}
        <div className="absolute top-[11px] left-3 right-3 h-[1px] bg-gradient-to-r from-accent-cyan/30 via-accent-cyan/40 to-accent-cyan/80 pointer-events-none" />

        {NODES.map((node) => {
          const isTarget = node.id === 'data-science';
          const isActive = activeClusterId === node.id || (isTarget && activeClusterId === null);

          return (
            <div
              key={node.id}
              className="relative z-10 flex flex-col items-center group/node cursor-default transition-all duration-200"
            >
              {/* Node Dot / Target Marker */}
              <div
                className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-cyan/20 ring-1 ring-accent-cyan'
                    : isTarget
                    ? 'bg-white/10 ring-1 ring-accent-cyan/60'
                    : 'bg-deep-space ring-1 ring-white/20 group-hover/node:ring-accent-cyan/60'
                }`}
              >
                {isTarget ? (
                  <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-accent-cyan' : 'bg-slate-400 group-hover/node:bg-accent-cyan'
                    }`}
                  />
                )}
              </div>

              {/* Node Label */}
              <div className="flex flex-col items-center text-center mt-1.5">
                <span
                  className={`font-mono text-[9.5px] sm:text-[10px] tracking-wider font-semibold transition-colors duration-200 ${
                    isActive ? 'text-accent-cyan' : isTarget ? 'text-white' : 'text-slate-300/80'
                  }`}
                >
                  {node.label}
                </span>
                <span className="font-mono text-[8.5px] text-text-secondary/60 hidden sm:block">
                  {node.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
