import React from 'react';
import { ProjectItem } from '@/data/portfolioData';
import { TechBadge } from './TechBadge';
import { ProjectActions } from './ProjectActions';

interface ProjectMetaProps {
  project: ProjectItem;
  visualSlot?: React.ReactNode;
  className?: string;
}

export const ProjectMeta: React.FC<ProjectMetaProps> = ({
  project,
  visualSlot,
  className = '',
}) => {
  return (
    <div className={`flex flex-col justify-between h-full ${className}`}>
      <div>
        {/* 1. Subtle Concept Phase: 01 / BUILD */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-[13px] tracking-wider text-accent-cyan font-semibold">
          <span>{project.id}</span>
          <span className="text-white/25 font-light">/</span>
          <span className="uppercase text-accent-cyan/90 tracking-widest font-mono">
            {project.conceptPhase}
          </span>
        </div>

        {/* 2. Category */}
        <div className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase text-text-secondary/90 mb-3">
          {project.category}
        </div>

        {/* 3. Project Title */}
        <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white tracking-tight leading-[1.15] mb-2.5">
          {project.title}
        </h3>

        {/* 4. Simple Date Row */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="font-mono text-xs text-text-secondary/75 tracking-wider">
            {project.date}
          </span>
        </div>

        {/* Optional Visual Slot (used for mobile natural stack placement) */}
        {visualSlot}

        {/* 5. Concise Project Description */}
        <p className="font-sans text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal mb-6 max-w-xl">
          {project.description}
        </p>

        {/* 6. Restrained Editorial Capability Matrix */}
        <div className="mb-6 pt-4 border-t border-white/[0.06]">
          <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-secondary/70 font-semibold mb-3">
            Core Capabilities
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5" aria-label="Core Capabilities">
            {project.capabilities.map((cap) => (
              <div key={cap.index} className="flex flex-col">
                <span className="font-mono text-[10.5px] text-accent-cyan font-bold tracking-wider mb-0.5">
                  {cap.index}
                </span>
                <span className="font-sans text-xs sm:text-[13px] text-slate-200 font-medium leading-snug">
                  {cap.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Technologies with Authentic Logo Pairs */}
        <div className="mb-6">
          <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-secondary/70 font-semibold mb-3">
            Technologies Used
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {project.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* 8. Truthful Project Actions */}
      <ProjectActions
        githubUrl={project.githubUrl}
        caseStudyUrl={project.caseStudyUrl}
      />
    </div>
  );
};
