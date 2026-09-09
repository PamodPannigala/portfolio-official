import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const TechStackHeader: React.FC = () => {
  const { techStackSection } = PORTFOLIO_DATA;

  return (
    <div className="relative w-full text-center max-w-2xl mx-auto mb-8 sm:mb-9 lg:mb-10">
      {/* 1. Category Indicator — Standard Editorial Style */}
      <div
        data-techstack-label
        className="inline-flex items-center justify-center gap-2 mb-3 font-mono text-xs sm:text-[13px] tracking-widest text-accent-cyan font-semibold uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/90" />
        <span>{techStackSection.sectionLabel}</span>
      </div>

      {/* 2. Headline */}
      <h2
        data-techstack-heading
        className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.15] mb-2"
      >
        {techStackSection.headingLine1}{' '}
        <span className="text-slate-200 font-light">
          {techStackSection.headingLine2}
        </span>
      </h2>

      {/* 3. Supporting Sentence */}
      <p
        data-techstack-intro
        className="font-body text-sm sm:text-[14.5px] text-text-secondary leading-relaxed font-normal max-w-md mx-auto"
      >
        {techStackSection.supportingLine}
      </p>
    </div>
  );
};
