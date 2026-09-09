import React, { useState } from 'react';
import { TechLane } from '@/data/portfolioData';
import { TechLogo } from './TechLogo';
import { TechLaneMotif } from './TechLaneMotif';

interface TechCapabilityLaneProps {
  lane: TechLane;
}

export const TechCapabilityLane: React.FC<TechCapabilityLaneProps> = ({ lane }) => {
  const [isLaneHovered, setIsLaneHovered] = useState(false);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setIsLaneHovered(true)}
      onMouseLeave={() => {
        setIsLaneHovered(false);
        setHoveredTechId(null);
      }}
      className="group/lane relative w-full pt-6 sm:pt-7 lg:pt-8 pb-6 sm:pb-7 lg:pb-8 border-t border-white/[0.08] hover:border-accent-cyan/30 transition-colors duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
        {/* =========================================================================
            LEFT: Category Identity (28%)
            ========================================================================= */}
        <div className="lg:w-[28%] flex-shrink-0 flex flex-col justify-between">
          <div>
            {/* Index & Title */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="font-mono text-xs sm:text-[13px] font-bold text-accent-cyan tracking-wider">
                {lane.index}
              </span>
              <span className="text-white/20 font-light text-xs">/</span>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight group-hover/lane:text-accent-cyan transition-colors duration-200">
                {lane.title}
              </h3>
            </div>

            {/* Subtitle Descriptor */}
            <p className="font-mono text-xs sm:text-[12.5px] text-text-secondary/80 tracking-wide font-normal mb-3">
              {lane.descriptor}
            </p>
          </div>

          {/* Enhanced Category-Specific Visual Motif */}
          <div className="hidden lg:block pt-1">
            <TechLaneMotif type={lane.motifType} isHovered={isLaneHovered} />
          </div>
        </div>

        {/* =========================================================================
            RIGHT: Technology Signatures (72%)
            Refined editorial presentation (less boxed chip, pure technical signature)
            ========================================================================= */}
        <div className="lg:w-[72%] w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3">
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
                    setIsLaneHovered(true);
                    setHoveredTechId(tech.id);
                  }}
                  onBlur={() => {
                    setIsLaneHovered(false);
                    setHoveredTechId(null);
                  }}
                  className={`group/tech relative inline-flex items-center gap-2.5 px-3 py-2 rounded border transition-all duration-200 cursor-default select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                    isTechHovered
                      ? 'border-white/15 bg-white/[0.035] -translate-y-0.5 shadow-[0_2px_10px_rgba(56,189,248,0.08)]'
                      : 'border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                  aria-label={`${tech.name} (${tech.category})`}
                >
                  {/* Real Recognizable Logo */}
                  <div
                    className={`transition-transform duration-200 flex-shrink-0 ${
                      isTechHovered ? '-translate-y-0.5 scale-105' : 'scale-100'
                    }`}
                  >
                    <TechLogo id={tech.id} name={tech.name} className="w-5 h-5" />
                  </div>

                  {/* Technology Name */}
                  <span
                    className={`font-sans text-xs sm:text-[13.5px] tracking-wide transition-colors duration-200 ${
                      isTechHovered ? 'text-white font-semibold' : 'text-slate-200 font-medium'
                    }`}
                  >
                    {tech.name}
                  </span>

                  {/* Subtle Decorative Relationship Trace (Active on hover) */}
                  {tech.relationshipHint && isTechHovered && (
                    <span className="hidden xl:inline-block pl-1.5 font-mono text-[10.5px] text-accent-cyan/85 tracking-wide border-l border-white/10">
                      {tech.relationshipHint}
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
