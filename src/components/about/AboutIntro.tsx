import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface AboutIntroProps {
  className?: string;
}

export const AboutIntro: React.FC<AboutIntroProps> = ({ className = '' }) => {
  const { about } = PORTFOLIO_DATA;

  return (
    <div className={`relative flex flex-col justify-between ${className}`}>
      <div className="relative z-10">
        {/* Editorial Section Label: ABOUT / 01 */}
        <div
          data-about-label
          className="flex items-center gap-3 pb-3 mb-5 sm:mb-6 border-b border-transparent"
        >
          <span className="h-[1px] w-6 sm:w-8 bg-accent-cyan/60" aria-hidden="true" />
          <span className="font-mono text-xs sm:text-[13px] font-medium tracking-[0.25em] uppercase text-accent-cyan/90">
            {about.sectionLabel}
          </span>
        </div>

        {/* Strong Editorial Statement Heading */}
        <h2
          data-about-heading
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-text-primary tracking-tight leading-[1.12] mb-6 sm:mb-8"
        >
          <span className="block text-white">{about.headingLine1}</span>
          <span className="block text-text-secondary/90 font-light mt-1">
            {about.headingLine2}
          </span>
        </h2>

        {/* Professional Introduction Paragraph */}
        <p
          data-about-intro
          className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-normal mb-8 sm:mb-10"
        >
          {about.intro}
        </p>

        {/* Core Principle Editorial Callout */}
        <div
          data-about-concept
          className="relative pl-4 border-l-2 border-accent-cyan/40 py-1.5 max-w-lg"
        >
          <div className="text-xs uppercase tracking-wider text-text-muted font-medium mb-1">
            Core Philosophy
          </div>
          <p className="font-display text-base sm:text-lg text-text-primary/95 font-medium italic">
            &ldquo;{about.concept}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
