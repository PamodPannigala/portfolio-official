import React, { useState } from 'react';
import { TechLane, TechnologyItem } from '@/data/portfolioData';
import { TechLogo } from './TechLogo';
import { TechLaneMotif } from './TechLaneMotif';

interface TechUtilityRowProps {
  databaseLane: TechLane;
  workflowTools: TechnologyItem[];
}

export const TechUtilityRow: React.FC<TechUtilityRowProps> = ({
  databaseLane,
  workflowTools,
}) => {
  const [isDbHovered, setIsDbHovered] = useState(false);
  const [isWorkflowHovered, setIsWorkflowHovered] = useState(false);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 mt-5 sm:mt-6">
      {/* =========================================================================
          LEFT: 04 DATABASES
          ========================================================================= */}
      <div
        onMouseEnter={() => setIsDbHovered(true)}
        onMouseLeave={() => {
          setIsDbHovered(false);
          setHoveredTechId(null);
        }}
        className="group/card relative h-full flex flex-col justify-between pt-5 sm:pt-6 pb-5 sm:pb-6 px-5 sm:px-6 rounded-xl border border-white/[0.038] bg-white/[0.008] hover:-translate-y-0.5 hover:border-accent-cyan/20 hover:bg-white/[0.012] transition-all duration-300"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Top Meta: Index & Anchored Micro-Motif */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="font-mono text-xs font-semibold text-accent-cyan tracking-wider">
                {databaseLane.index}
              </span>
              <div className="pt-0.5">
                <TechLaneMotif type="databases" isHovered={isDbHovered} />
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-lg sm:text-[19px] font-bold text-white tracking-tight group-hover/card:text-accent-cyan transition-colors duration-200 mb-0.5">
              {databaseLane.title}
            </h3>

            {/* Descriptor */}
            <p className="font-mono text-[11px] sm:text-[11.5px] text-text-secondary/65 tracking-wide font-normal mb-5">
              {databaseLane.descriptor}
            </p>

            {/* Databases Grid — Balanced 2-Column Mini-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {databaseLane.technologies.map((tech) => {
                const isHovered = hoveredTechId === tech.id;

                return (
                  <div
                    key={tech.id}
                    tabIndex={0}
                    role="button"
                    onMouseEnter={() => setHoveredTechId(tech.id)}
                    onMouseLeave={() => setHoveredTechId(null)}
                    onFocus={() => {
                      setIsDbHovered(true);
                      setHoveredTechId(tech.id);
                    }}
                    onBlur={() => {
                      setIsDbHovered(false);
                      setHoveredTechId(null);
                    }}
                    className={`group/tech relative flex items-center gap-3 h-10 px-2.5 rounded-md border transition-all duration-150 cursor-default select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                      isHovered
                        ? 'border-white/10 bg-white/[0.025] -translate-y-[1px]'
                        : 'border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.015]'
                    }`}
                    aria-label={`${tech.name} (Database)`}
                  >
                    <div
                      className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-transform duration-150 ${
                        isHovered ? '-translate-y-[1px]' : ''
                      }`}
                    >
                      <TechLogo id={tech.id} name={tech.name} className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-sans text-xs sm:text-[13px] tracking-wide transition-colors duration-150 ${
                        isHovered ? 'text-white font-medium' : 'text-slate-300/90 font-normal'
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT: 05 TOOLS / WORKFLOW
          ========================================================================= */}
      <div
        onMouseEnter={() => setIsWorkflowHovered(true)}
        onMouseLeave={() => {
          setIsWorkflowHovered(false);
          setHoveredTechId(null);
        }}
        className="group/card relative h-full flex flex-col justify-between pt-5 sm:pt-6 pb-5 sm:pb-6 px-5 sm:px-6 rounded-xl border border-white/[0.038] bg-white/[0.008] hover:-translate-y-0.5 hover:border-accent-cyan/20 hover:bg-white/[0.012] transition-all duration-300"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Top Meta: Index in Cyan & Anchored Workflow Micro-Motif */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="font-mono text-xs font-semibold text-accent-cyan tracking-wider">
                05
              </span>
              <div className="pt-0.5">
                <TechLaneMotif type="workflow" isHovered={isWorkflowHovered} />
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-lg sm:text-[19px] font-bold text-white tracking-tight group-hover/card:text-accent-cyan transition-colors duration-200 mb-0.5">
              TOOLS / WORKFLOW
            </h3>

            {/* Descriptor */}
            <p className="font-mono text-[11px] sm:text-[11.5px] text-text-secondary/65 tracking-wide font-normal mb-5">
              Version Control · Collaboration · API Testing
            </p>

            {/* Tools Grid — Balanced 3-Column Mini-Grid aligned with Databases row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {workflowTools.map((tool) => {
                const isHovered = hoveredTechId === tool.id;

                return (
                  <div
                    key={tool.id}
                    tabIndex={0}
                    role="button"
                    onMouseEnter={() => setHoveredTechId(tool.id)}
                    onMouseLeave={() => setHoveredTechId(null)}
                    onFocus={() => {
                      setIsWorkflowHovered(true);
                      setHoveredTechId(tool.id);
                    }}
                    onBlur={() => {
                      setIsWorkflowHovered(false);
                      setHoveredTechId(null);
                    }}
                    className={`group/tech relative flex items-center gap-2.5 h-10 px-2.5 rounded-md border transition-all duration-150 cursor-default select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                      isHovered
                        ? 'border-white/10 bg-white/[0.025] -translate-y-[1px]'
                        : 'border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.015]'
                    }`}
                    aria-label={`${tool.name} (Workflow Tool)`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center flex-shrink-0 transition-transform duration-150 ${
                        isHovered ? '-translate-y-[1px]' : ''
                      }`}
                    >
                      <TechLogo id={tool.id} name={tool.name} className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-sans text-xs sm:text-[13px] tracking-wide transition-colors duration-150 ${
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
    </div>
  );
};
