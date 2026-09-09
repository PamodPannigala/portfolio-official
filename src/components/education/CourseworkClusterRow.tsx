import React from 'react';
import { CourseworkCluster } from '@/data/portfolioData';

interface CourseworkClusterRowProps {
  cluster: CourseworkCluster;
  isHovered?: boolean;
  onHover: (id: string | null) => void;
}

export const CourseworkClusterRow: React.FC<CourseworkClusterRowProps> = ({
  cluster,
  isHovered = false,
  onHover,
}) => {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${cluster.title} Coursework`}
      onMouseEnter={() => onHover(cluster.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(cluster.id)}
      onBlur={() => onHover(null)}
      className={`group/cluster relative py-1.5 sm:py-2 px-2 sm:px-2.5 rounded transition-all duration-200 cursor-default select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan border-b border-white/[0.035] last:border-b-0 ${
        isHovered
          ? 'bg-white/[0.02]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex flex-col gap-0.5">
        {/* Top Meta Line: Index, Title & Descriptor Subtitle */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono text-[11px] font-bold transition-colors duration-200 ${
                isHovered ? 'text-accent-cyan' : 'text-accent-cyan/90'
              }`}
            >
              {cluster.index}
            </span>
            <h4
              className={`font-display text-[12.5px] sm:text-xs font-bold tracking-tight transition-colors duration-200 ${
                isHovered ? 'text-white' : 'text-slate-200'
              }`}
            >
              {cluster.title}
            </h4>
          </div>

          <span className="font-mono text-[10px] text-text-secondary/55 tracking-wide">
            {cluster.subtitle}
          </span>
        </div>

        {/* Course Names List — Scannable, Concise Text */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pl-3.5 sm:pl-4">
          {cluster.courses.map((course, idx) => (
            <div key={idx} className="flex items-center gap-1 font-sans text-[11.5px] text-slate-300">
              <span className="w-1 h-1 rounded-full bg-accent-cyan/50" />
              <span>{course}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
