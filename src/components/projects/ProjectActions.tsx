import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectActionsProps {
  githubUrl?: string;
  caseStudyUrl?: string | null;
  className?: string;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({
  githubUrl = 'https://github.com/PamodPannigala',
  caseStudyUrl,
  className = '',
}) => {
  const hasValidCaseStudy = Boolean(caseStudyUrl && caseStudyUrl !== '#');

  return (
    <div className={`flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/[0.06] ${className}`}>
      {/* Primary Action: Intentional Minimal GitHub CTA */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-md border border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent-cyan/40 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/60 cursor-pointer select-none"
          aria-label="View Project Source on GitHub"
        >
          <Github
            className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors duration-200 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase text-slate-100 group-hover:text-white transition-colors duration-200">
            VIEW ON GITHUB
          </span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-accent-cyan/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
            aria-hidden="true"
          />
        </a>
      )}

      {/* Case Study Action: Rendered ONLY if a real, valid URL exists (No placeholders) */}
      {hasValidCaseStudy && (
        <a
          href={caseStudyUrl!}
          className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-[12.5px] tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/60 rounded"
          aria-label="View Case Study"
        >
          <span className="relative pb-0.5">
            VIEW CASE STUDY
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-text-secondary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
};
