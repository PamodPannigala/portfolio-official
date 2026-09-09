import React from 'react';
import { ProjectItem } from '@/data/portfolioData';

interface ProjectProgressProps {
  projects: ProjectItem[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  className?: string;
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    const currentIndex = projects.findIndex((p) => p.id === id);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % projects.length;
      onSelectProject(projects[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      onSelectProject(projects[prevIndex].id);
    }
  };

  return (
    <nav
      role="tablist"
      aria-label="Selectable Projects Navigation"
      className={`w-full flex md:grid md:grid-cols-3 items-center justify-start md:justify-items-stretch gap-6 sm:gap-8 md:gap-0 select-none overflow-x-auto md:overflow-visible no-scrollbar pb-1 ${className}`}
    >
      {projects.map((project) => {
        const isActive = project.id === activeProjectId;

        return (
          <div key={project.id} className="flex justify-center w-auto md:w-full">
            <button
              type="button"
              role="tab"
              id={`project-tab-${project.id}`}
              aria-selected={isActive}
              aria-controls={`project-panel-${project.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectProject(project.id)}
              onKeyDown={(e) => handleKeyDown(e, project.id)}
              className="group relative flex flex-col items-center w-full max-w-[240px] pt-1 pb-2 outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/60 rounded cursor-pointer whitespace-nowrap"
            >
              {/* Project Number + Label Pair */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2">
                <span
                  className={`font-mono text-xs sm:text-[13px] tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-accent-cyan font-bold'
                      : 'text-text-secondary/60 group-hover:text-text-secondary/90'
                  }`}
                >
                  {project.id}
                </span>
                <span
                  className={`font-mono text-xs sm:text-[13px] tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {project.navLabel}
                </span>
              </div>

              {/* Hairline Track with Animated Cyan Indicator */}
              <div className="relative w-full h-[1.5px] bg-white/[0.08] overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-accent-cyan transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-full shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                      : 'w-0 group-hover:w-1/3 group-hover:bg-white/30'
                  }`}
                />
              </div>
            </button>
          </div>
        );
      })}
    </nav>
  );
};
