import React, { useState } from 'react';
import { EducationData } from '@/data/portfolioData';
import { SliitLogo } from './SliitLogo';
import { CourseworkClusterRow } from './CourseworkClusterRow';

interface AcademicPathPanelProps {
  education: EducationData;
}

export const AcademicPathPanel: React.FC<AcademicPathPanelProps> = ({ education }) => {
  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);

  return (
    <div className="group/academic relative w-full rounded-xl border border-white/[0.05] bg-white/[0.008] p-4.5 sm:p-5 lg:p-6 hover:border-accent-cyan/20 hover:bg-white/[0.012] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-0 right-1/4 w-60 h-60 bg-accent-cyan/[0.01] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column: Academic Degree & Institutional Details (approx 52%) */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between h-full">
          <div>
            {/* Top Meta: Chapter Index & SLIIT Official Logo Lockup */}
            <div className="flex items-center justify-between gap-3 pb-2.5 mb-3 border-b border-white/[0.06]">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-cyan tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                <span>ACADEMIC PATH / 01</span>
              </div>
              <SliitLogo />
            </div>

            {/* Degree Title & Specialization */}
            <div className="space-y-0.5 mb-3">
              <div className="font-mono text-[10.5px] uppercase tracking-widest text-text-secondary/70 font-medium">
                Undergraduate Degree
              </div>
              <h3 className="font-display text-lg sm:text-xl lg:text-[22px] font-bold text-white tracking-tight leading-[1.25]">
                {education.degreePrefix}{' '}
                <span className="text-white block sm:inline">{education.degreeSubject}</span>
              </h3>
              <div className="font-sans text-xs sm:text-[13.5px] font-semibold text-accent-cyan tracking-wide pt-0.5">
                {education.specialization}
              </div>
            </div>

            {/* Institution & Location */}
            <div className="space-y-0.5 mb-3 text-xs">
              <div className="text-slate-200 font-medium">
                {education.institution}
              </div>
              <div className="font-mono text-[11px] text-text-secondary/80 flex items-center gap-1.5">
                <span>{education.institutionShort}</span>
                <span className="text-white/20">·</span>
                <span>{education.location}</span>
              </div>
            </div>

            {/* Status & Expected Graduation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.08] font-mono text-[10.5px] font-medium text-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span>{education.status}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.02] font-mono text-[10.5px] text-slate-300">
                <svg className="w-3 h-3 text-text-secondary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{education.expectedCompletion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Academic Coursework Clusters (approx 48%) */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start lg:pl-5 lg:border-l lg:border-white/[0.06]">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.05]">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-text-secondary/80 font-semibold">
              Core Academic Focus & Coursework
            </span>
            <span className="font-mono text-[10px] text-accent-cyan font-medium">
              3 FOCUS AREAS
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            {education.clusters.map((cluster) => (
              <CourseworkClusterRow
                key={cluster.id}
                cluster={cluster}
                isHovered={activeClusterId === cluster.id}
                onHover={setActiveClusterId}
              />
            ))}
          </div>

          <div className="mt-2 pt-1.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-text-secondary/50">
            <span>CURRICULUM: SLIIT FACULTY OF COMPUTING</span>
            <span>DATA SCIENCE SPECIALIZATION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
