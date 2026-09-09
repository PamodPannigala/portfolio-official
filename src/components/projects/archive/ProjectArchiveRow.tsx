import React from 'react';
import { ProjectItem } from '@/data/portfolioData';
import { TechBadge } from '../TechBadge';
import { ProjectPreview } from './previews/ProjectPreview';

export interface ProjectArchiveRowProps {
  project: ProjectItem;
  index: number;
}

export const ProjectArchiveRow: React.FC<ProjectArchiveRowProps> = ({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <article
      className="group py-12 sm:py-16 border-b border-white/[0.06] transition-colors duration-300 hover:border-white/[0.12]"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Index, Meta, Title, Narrative, Technologies, Actions */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {/* Project Index, Category & Date */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs tracking-wider">
            <span className="text-accent-cyan font-bold text-sm">
              {formattedIndex}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span className="text-slate-400 font-medium uppercase tracking-widest text-[11px] sm:text-xs">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600 hidden sm:inline-block" aria-hidden="true" />
            <span className="text-slate-400/80 text-[11px] sm:text-xs hidden sm:inline-block">
              {project.date}
            </span>
          </div>

          {/* Project Title */}
          <h2
            id={`project-title-${project.id}`}
            className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-text-primary group-hover:text-white transition-colors duration-200"
          >
            {project.title}
          </h2>

          {/* Mobile/Tablet Inline Preview (shown only on small screens before narrative) */}
          <div className="block lg:hidden w-full my-2">
            <ProjectPreview project={project} />
          </div>

          {/* Short Narrative Description */}
          <p className="font-body text-sm sm:text-[15px] leading-relaxed text-slate-300/85 max-w-2xl">
            {project.shortDescription || project.description}
          </p>

          {/* Technology Badges */}
          <div className="pt-1">
            <div className="text-[10.5px] font-mono tracking-wider uppercase text-slate-400 mb-2">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Project Actions */}
          <div className="pt-3 flex items-center gap-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-300 hover:text-white transition-colors py-1 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
                aria-label={`View ${project.title} source on GitHub`}
              >
                <span className="relative">
                  VIEW ON GITHUB
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover/btn:w-full" />
                </span>
                <span className="text-accent-cyan transition-transform duration-300 ease-out group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}

            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                className="group/btn inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase text-accent-cyan hover:text-white transition-colors py-1 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
                aria-label={`Read case study for ${project.title}`}
              >
                <span className="relative">
                  VIEW CASE STUDY
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover/btn:w-full" />
                </span>
                <span className="text-accent-cyan transition-transform duration-300 ease-out group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Desktop Lightweight Visual Preview */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full pt-6">
          <ProjectPreview project={project} />
        </div>
      </div>
    </article>
  );
};
