import React, { useState } from 'react';
import { EducationData } from '@/data/portfolioData';
import { SliitLogo } from './SliitLogo';
import { AcademicProgressionVisual } from './AcademicProgressionVisual';
import { CourseworkClusterRow } from './CourseworkClusterRow';

interface AcademicPathCardProps {
  education: EducationData;
}

export const AcademicPathCard: React.FC<AcademicPathCardProps> = ({ education }) => {
  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);

  return (
    <div className="group/academic relative h-full flex flex-col justify-between pt-6 sm:pt-7 pb-6 sm:pb-7 px-5 sm:px-7 rounded-xl border border-white/[0.038] bg-white/[0.008] hover:-translate-y-0.5 hover:border-accent-cyan/20 hover:bg-white/[0.012] transition-all duration-300">
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Top Meta: Section Index & SLIIT Logo Lockup */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent-cyan tracking-wider">
              <span>ACADEMIC PATH / 01</span>
            </div>
            <SliitLogo />
          </div>

          {/* Degree Title & Specialization */}
          <div className="mb-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-1">
              {education.degreePrefix}{' '}
              <span className="text-white block sm:inline">{education.degreeSubject}</span>
            </h3>
            <div className="font-sans text-sm sm:text-[15px] font-medium text-accent-cyan tracking-wide mb-2">
              {education.specialization}
            </div>

            {/* Institution & Current Academic Status */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-text-secondary/80">
              <span className="text-slate-300 font-medium">{education.institution}</span>
              <span className="text-white/20">·</span>
              <span>{education.institutionShort}</span>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.08] font-mono text-[11px] font-medium text-accent-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                {education.status}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] font-mono text-[11px] text-slate-300">
                {education.expectedCompletion}
              </span>
            </div>
          </div>

          {/* Conceptual Academic Progression Visual */}
          <AcademicProgressionVisual activeClusterId={activeClusterId} />

          {/* Recruiter-Friendly Coursework Focus Clusters */}
          <div className="flex flex-col gap-1 mt-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-text-secondary/60 font-semibold mb-1 px-1">
              Core Academic Focus & Coursework
            </div>
            {education.clusters.map((cluster) => (
              <CourseworkClusterRow
                key={cluster.id}
                cluster={cluster}
                isHovered={activeClusterId === cluster.id}
                onHover={setActiveClusterId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
