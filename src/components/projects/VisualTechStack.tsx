import React from 'react';
import { TechIcon } from './TechBadge';

interface VisualTechStackProps {
  technologies: string[];
  className?: string;
  isCrossFading?: boolean;
}

export const VisualTechStack: React.FC<VisualTechStackProps> = ({
  technologies,
  className = '',
  isCrossFading = false,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 sm:gap-2.5 select-none transition-all duration-300 ease-out ${
        isCrossFading ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      aria-label="Technology signatures"
    >
      {/* Restrained Secondary Label */}
      <span className="font-mono text-[9px] uppercase tracking-wider text-text-secondary/50 font-semibold flex-shrink-0">
        TECH STACK
      </span>

      {/* Subtle Hairline Separator */}
      <span className="w-[1px] h-2.5 bg-white/10 flex-shrink-0" aria-hidden="true" />

      {/* Tiny Authentic Brand Logos Only (Secondary signature treatment, no duplicate text) */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
        {technologies.map((tech) => (
          <div
            key={tech}
            title={tech}
            className="opacity-75 hover:opacity-100 transition-opacity duration-150 cursor-default flex items-center justify-center"
          >
            <TechIcon name={tech} className="w-3.5 h-3.5 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
