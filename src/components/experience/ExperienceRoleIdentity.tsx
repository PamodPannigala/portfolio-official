import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { ExperienceItem } from '@/data/portfolioData';
import { SltMobitelLogo } from './SltMobitelLogo';

interface ExperienceRoleIdentityProps {
  experience: ExperienceItem;
  className?: string;
}

export const ExperienceRoleIdentity: React.FC<ExperienceRoleIdentityProps> = ({
  experience,
  className = '',
}) => {
  const workingContextItems = [
    { index: '01', title: 'Technical Training' },
    { index: '02', title: 'Enterprise Exposure' },
    { index: '03', title: 'Supervised Technical Work' },
  ];

  return (
    <div className={`flex flex-col justify-between h-full space-y-6 ${className}`}>
      <div>
        {/* 1. Category Tag */}
        <div className="font-mono text-xs tracking-widest uppercase text-accent-cyan font-semibold mb-4">
          ROLE / 01
        </div>

        {/* 2. Company Identity & Role Title with Refined Spacing */}
        <div className="flex flex-col mb-4">
          {/* Subtle Authentic SLT-MOBITEL Company Logo (14-18px from top, 18-22px to title) */}
          <div className="mb-5">
            <SltMobitelLogo />
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-[26px] lg:text-[28px] font-bold text-white tracking-tight leading-snug">
              {experience.role}
            </h3>
            {/* 6-8px separation to company/team metadata */}
            <div className="flex items-center gap-2 mt-1.5 text-sm sm:text-[14.5px] font-semibold text-slate-200">
              <span className="text-accent-cyan/90 font-mono tracking-wide">{experience.company}</span>
              <span className="text-white/20 font-light">/</span>
              <span className="text-slate-300 font-medium">{experience.team}</span>
            </div>
          </div>
        </div>

        {/* 3. Date & Location Metadata Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-[12.5px] font-mono text-text-secondary/80 mb-5 pt-3.5 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-cyan/70" aria-hidden="true" />
            <span>{experience.period}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent-cyan/70" aria-hidden="true" />
            <span>
              {experience.location} · {experience.workMode}
            </span>
          </div>
        </div>

        {/* 4. Grounded Summary */}
        <p className="font-body text-sm sm:text-[14.5px] text-slate-300 leading-relaxed font-normal mb-5 max-w-xl">
          {experience.summary}
        </p>

        {/* 5. Primary Focus Areas */}
        <div className="pt-3.5 border-t border-white/[0.06] mb-5">
          <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-secondary/70 font-semibold mb-2.5">
            Primary Focus Areas
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {experience.contextTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded border border-white/[0.08] bg-white/[0.02] font-mono text-xs text-slate-200 tracking-wide"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80 mr-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 6. Restrained Editorial Working Context (Anchors Lower-Left) */}
        <div className="pt-3.5 border-t border-white/[0.06]">
          <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-secondary/70 font-semibold mb-3">
            Working Context
          </div>
          <div className="flex flex-col divide-y divide-white/[0.05]">
            {workingContextItems.map((item) => (
              <div key={item.index} className="flex items-center gap-3 py-2.5">
                <span className="font-mono text-xs text-accent-cyan font-bold tracking-wider">
                  {item.index}
                </span>
                <span className="font-sans text-xs sm:text-[13px] text-slate-200 font-medium">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
