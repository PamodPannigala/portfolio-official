import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '@/data/portfolioData';
import { useAppRoute } from '@/context/RouteContext';
import { ProjectArchiveRow } from './ProjectArchiveRow';

export const ProjectsArchivePage: React.FC = () => {
  const { projectsArchive, projectsSection } = PORTFOLIO_DATA;
  const allProjects: ProjectItem[] = projectsSection.projects;
  const { navigate } = useAppRoute();

  // Selected filter state (default: 'ALL')
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  // Dynamically extract primary category filters that actually exist in the project dataset
  const availableFilters = useMemo(() => {
    const filterSet = new Set<string>(['ALL']);

    allProjects.forEach((p) => {
      p.categories?.forEach((cat) => {
        const normalized = cat.trim().toUpperCase();
        if (normalized.includes('FULL-STACK')) filterSet.add('FULL-STACK');
        else if (normalized.includes('DATA ENGINEERING')) filterSet.add('DATA ENGINEERING');
        else if (normalized.includes('DATA ANALYSIS')) filterSet.add('DATA ANALYSIS');
        else if (normalized.includes('AI') || normalized.includes('ML')) filterSet.add('AI / ML');
      });
    });

    return Array.from(filterSet);
  }, [allProjects]);

  // Filter projects based on selection
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'ALL') return allProjects;

    return allProjects.filter((project) => {
      const matchCategory = project.category.toUpperCase().includes(selectedFilter);
      const matchCategories = project.categories.some((cat) =>
        cat.toUpperCase().includes(selectedFilter)
      );
      return matchCategory || matchCategories;
    });
  }, [allProjects, selectedFilter]);

  return (
    <div className="relative w-full min-h-screen bg-deep-space pt-28 sm:pt-36 lg:pt-40 pb-24 sm:pb-32 overflow-hidden">
      {/* Subtle Atmospheric Lighting */}
      <div
        className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-accent-cyan/[0.025] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-navy-light/[0.02] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* =========================================================================
            1. EDITORIAL INTRO BLOCK (Spacious, Asymmetrical, Minimal)
            ========================================================================= */}
        <header className="mb-14 sm:mb-20">
          {/* Section Monospace Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_#38bdf8]" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-[13px] tracking-widest text-accent-cyan uppercase font-semibold">
              {projectsArchive.sectionLabel}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.12]">
            {projectsArchive.headingLine1}
            <br />
            <span className="text-slate-300 font-light">
              {projectsArchive.headingLine2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="font-body text-base sm:text-lg text-slate-300/85 max-w-2xl leading-relaxed">
            {projectsArchive.supportingLine}
          </p>

          {/* Hairline Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent mt-10 sm:mt-12" />
        </header>

        {/* =========================================================================
            2. RESTRAINED CATEGORY FILTERING (Future-ready, not overdone)
            ========================================================================= */}
        {availableFilters.length > 1 && (
          <nav
            aria-label="Filter projects by discipline"
            className="mb-10 sm:mb-14 overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center gap-6 sm:gap-8 min-w-max border-b border-white/[0.05] pb-3">
              {availableFilters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`relative font-mono text-xs sm:text-[13px] tracking-wider uppercase transition-colors duration-200 py-1 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded ${
                      isActive
                        ? 'text-accent-cyan font-bold'
                        : 'text-slate-400 hover:text-white font-medium'
                    }`}
                    aria-pressed={isActive}
                  >
                    {filter}
                    {isActive && (
                      <span className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-accent-cyan shadow-[0_0_8px_#38bdf8]" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* =========================================================================
            3. EDITORIAL PROJECT ROWS
            ========================================================================= */}
        <section aria-label="Project list" className="divide-y divide-transparent">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectArchiveRow
                key={project.id}
                project={project}
                index={index}
              />
            ))
          ) : (
            <div className="py-20 text-center text-slate-400 font-mono text-sm">
              No projects found in this category.
            </div>
          )}
        </section>

        {/* =========================================================================
            4. FOOTER RETURN NAVIGATION
            ========================================================================= */}
        <footer className="mt-16 sm:mt-24 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-300 hover:text-white transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
          >
            <span className="text-accent-cyan transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span className="relative">
              BACK TO HOMEPAGE
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover:w-full" />
            </span>
          </button>

          <span className="font-mono text-xs text-slate-400 hidden sm:inline-block">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </span>
        </footer>
      </div>
    </div>
  );
};
