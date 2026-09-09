import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ProjectsHeaderProps {
  className?: string;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ className = '' }) => {
  const { projectsSection } = PORTFOLIO_DATA;

  return (
    <div className={`relative flex flex-col items-center text-center mx-auto mb-11 sm:mb-12 lg:mb-[50px] ${className}`}>
      {/* Centered Editorial Section Label: SELECTED WORK / 02 */}
      <div
        data-projects-label
        className="inline-flex items-center justify-center gap-3 mb-4 sm:mb-5"
      >
        <span className="h-[1px] w-6 sm:w-8 bg-accent-cyan/60" aria-hidden="true" />
        <span className="font-mono text-xs sm:text-[13px] font-medium tracking-[0.25em] uppercase text-accent-cyan/90">
          {projectsSection.sectionLabel}
        </span>
        <span className="h-[1px] w-6 sm:w-8 bg-accent-cyan/60" aria-hidden="true" />
      </div>

      {/* Strong Editorial Headline in Title Case */}
      <h2
        data-projects-heading
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-text-primary tracking-tight leading-[1.14] max-w-3xl"
      >
        <span className="text-white">{projectsSection.headingLine1} </span>
        <span className="text-text-secondary/90 font-light">{projectsSection.headingLine2}</span>
      </h2>

      {/* Centered Supporting Copy (Controlled Max-Width: ~650px) */}
      <p
        data-projects-sub
        className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal mt-4 sm:mt-5 max-w-[650px] mx-auto text-center"
      >
        {projectsSection.supportingLine}
      </p>
    </div>
  );
};
