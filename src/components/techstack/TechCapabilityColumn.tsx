import React, { useState } from 'react';
import { TechLane } from '@/data/portfolioData';
import { TechLogo } from './TechLogo';
import { TechLaneMotif } from './TechLaneMotif';

interface TechCapabilityColumnProps {
  lane: TechLane;
}

export const TechCapabilityColumn: React.FC<TechCapabilityColumnProps> = ({ lane }) => {
  const [isColumnHovered, setIsColumnHovered] = useState(false);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setIsColumnHovered(true)}
      onMouseLeave={() => {
        setIsColumnHovered(false);
        setHoveredTechId(null);
      }}
      className="group/col relative h-full flex flex-col justify-between pt-5 sm:pt-6 pb-5 sm:pb-6 px-5 sm:px-6 rounded-xl border border-white/[0.038] bg-white/[0.008] hover:-translate-y-0.5 hover:border-accent-cyan/20 hover:bg-white/[0.012] transition-all duration-300"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Top Meta: Index & Anchored Technical Micro-Motif */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <span className="font-mono text-xs font-semibold text-accent-cyan tracking-wider">
              {lane.index}
            </span>
            <div className="pt-0.5">
              <TechLaneMotif type={lane.motifType} isHovered={isColumnHovered} />
            </div>
          </div>

          {/* Category Title — Strongest Text Element */}
          <h3 className="font-display text-lg sm:text-[19px] font-bold text-white tracking-tight group-hover/col:text-accent-cyan transition-colors duration-200 mb-0.5">
            {lane.title}
          </h3>

          {/* Concise Muted Descriptor */}
          <p className="font-mono text-[11px] sm:text-[11.5px] text-text-secondary/65 tracking-wide font-normal mb-5">
            {lane.descriptor}
          </p>

          {/* Technology Signatures List — Standardized Equal Height Rows */}
          <div className="flex flex-col gap-1.5">
            {lane.technologies.map((tech) => {
              const isTechHovered = hoveredTechId === tech.id;

              return (
                <div
                  key={tech.id}
                  tabIndex={0}
                  role="button"
                  onMouseEnter={() => setHoveredTechId(tech.id)}
                  onMouseLeave={() => setHoveredTechId(null)}
                  onFocus={() => {
                    setIsColumnHovered(true);
                    setHoveredTechId(tech.id);
                  }}
                  onBlur={() => {
                    setIsColumnHovered(false);
                    setHoveredTechId(null);
                  }}
                  className={`group/tech relative flex items-center justify-between h-10 px-2.5 rounded-md border transition-all duration-150 cursor-default select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                    isTechHovered
                      ? 'border-white/10 bg-white/[0.025] -translate-y-[1px]'
                      : 'border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.015]'
                  }`}
                  aria-label={`${tech.name} (${tech.category})`}
                >
                  <div className="flex items-center gap-3">
                    {/* Real Recognizable Logo */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-transform duration-150 ${
                        isTechHovered ? '-translate-y-[1px]' : ''
                      }`}
                    >
                      <TechLogo id={tech.id} name={tech.name} className="w-5 h-5" />
                    </div>

                    {/* Technology Name */}
                    <span
                      className={`font-sans text-xs sm:text-[13px] tracking-wide transition-colors duration-150 ${
                        isTechHovered ? 'text-white font-medium' : 'text-slate-300/90 font-normal'
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>

                  {/* Subtle Inline Indicator on Hover */}
                  {tech.relationshipHint && isTechHovered && (
                    <span className="hidden xl:inline-block font-mono text-[10px] text-accent-cyan/80 tracking-wide">
                      {tech.relationshipHint.split('→')[0].trim()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
