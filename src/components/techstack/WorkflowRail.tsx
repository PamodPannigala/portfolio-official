import React, { useState } from 'react';
import { TechnologyItem } from '@/data/portfolioData';
import { TechLogo } from './TechLogo';

interface WorkflowRailProps {
  tools: TechnologyItem[];
}

export const WorkflowRail: React.FC<WorkflowRailProps> = ({ tools }) => {
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

  return (
    <div className="relative w-full pt-6 sm:pt-7 lg:pt-8 border-t border-white/[0.08]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-12">
        {/* Rail Label - Aligned with the 28% Left Column on Desktop */}
        <div className="lg:w-[28%] flex-shrink-0 flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-text-secondary/70 tracking-widest uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          <span>TOOLS / WORKFLOW</span>
        </div>

        {/* Workflow Tools List - Aligned with the 72% Right Column */}
        <div className="lg:w-[72%] w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3">
            {tools.map((tool) => {
              const isHovered = hoveredToolId === tool.id;

              return (
                <div
                  key={tool.id}
                  tabIndex={0}
                  role="button"
                  onMouseEnter={() => setHoveredToolId(tool.id)}
                  onMouseLeave={() => setHoveredToolId(null)}
                  onFocus={() => setHoveredToolId(tool.id)}
                  onBlur={() => setHoveredToolId(null)}
                  className={`group/tool relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded border transition-all duration-200 cursor-default select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                    isHovered
                      ? 'border-white/15 bg-white/[0.03] -translate-y-0.5'
                      : 'border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                  aria-label={`${tool.name} (Workflow Tool)`}
                >
                  <div
                    className={`transition-transform duration-200 flex-shrink-0 ${
                      isHovered ? '-translate-y-0.5 scale-105' : 'scale-100'
                    }`}
                  >
                    <TechLogo id={tool.id} name={tool.name} className="w-4 h-4" />
                  </div>
                  <span
                    className={`font-sans text-xs sm:text-[13px] transition-colors duration-200 ${
                      isHovered ? 'text-white font-medium' : 'text-slate-300/90 font-normal'
                    }`}
                  >
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
