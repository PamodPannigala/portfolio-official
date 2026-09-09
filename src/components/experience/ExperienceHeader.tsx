import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const ExperienceHeader: React.FC = () => {
  const { experienceSection } = PORTFOLIO_DATA;

  return (
    <div className="relative w-full mb-10 sm:mb-12 lg:mb-14">
      {/* 1. Section Indicator */}
      <div
        data-experience-label
        className="flex items-center gap-2 mb-3 sm:mb-3.5 font-mono text-xs sm:text-[13px] tracking-widest text-accent-cyan font-semibold uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/90" />
        <span>{experienceSection.sectionLabel}</span>
      </div>

      {/* 2. Headline & Current Chapter Row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 lg:gap-12 mb-4">
        {/* Editorial Headline with Intentional 2-Line Balance */}
        <h2
          data-experience-heading
          className="font-display text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold text-white tracking-tight leading-[1.15]"
        >
          <span className="block">{experienceSection.headingLine1}</span>
          <span className="text-slate-100 font-light block">
            {experienceSection.headingLine2}
          </span>
        </h2>

        {/* Current Chapter Micro Status (Right-positioned, internally centered) */}
        <div
          data-experience-status
          className="flex-shrink-0 flex flex-col items-center text-center gap-1.5 lg:pt-1 self-start lg:self-auto"
        >
          <div className="font-mono text-[10.5px] sm:text-[11px] tracking-widest uppercase text-text-secondary/75 font-semibold">
            {experienceSection.chapterLabel}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan/60 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-cyan" />
            </span>
            <span className="font-mono text-xs text-slate-200 font-medium tracking-wider">
              {experienceSection.chapterPeriod}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Supporting Copy */}
      <p
        data-experience-intro
        className="font-body text-sm sm:text-base lg:text-[15.5px] text-text-secondary leading-relaxed font-normal max-w-2xl"
      >
        {experienceSection.supportingLine}
      </p>
    </div>
  );
};
