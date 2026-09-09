import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useAppRoute } from '@/context/RouteContext';
import { ProjectsHeader } from './ProjectsHeader';
import { ProjectProgress } from './ProjectProgress';
import { ProjectMeta } from './ProjectMeta';
import { ProjectVisualStage } from './ProjectVisualStage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection: React.FC = () => {
  const { projectsSection } = PORTFOLIO_DATA;
  const projects = projectsSection.projects.filter((p) => p.featured !== false);
  const { navigate } = useAppRoute();

  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // One single source of truth for active project ("01", "02", "03")
  const [activeProjectId, setActiveProjectId] = useState<string>('01');
  const [isCrossFading, setIsCrossFading] = useState<boolean>(false);

  // Manual selection tracking to prioritize explicit user clicks over scroll positions
  const manualOverrideRef = useRef<string | null>(null);
  const manualScrollYRef = useRef<number>(0);

  // Synchronized Project Selection (Click Navigation)
  const handleSelectProject = useCallback(
    (id: string) => {
      if (id === activeProjectId) return;

      // Immediately switch the active project with a controlled crossfade
      setIsCrossFading(true);
      setActiveProjectId(id);

      // Prioritize manual selection until the user resumes meaningful deliberate scrolling
      manualOverrideRef.current = id;
      manualScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

      setTimeout(() => setIsCrossFading(false), 180);
    },
    [activeProjectId]
  );

  // Desktop Scroll-Driven Sticky Progression (ScrollTrigger)
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const showcase = showcaseRef.current;
    if (!showcase) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: showcase,
        start: 'top top+=80',
        end: '+=600',
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        onUpdate: (self) => {
          // If the user manually clicked a project selector:
          if (manualOverrideRef.current !== null) {
            // Only release the override if the user has resumed meaningful scrolling (> 150px)
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - manualScrollYRef.current) > 150) {
              manualOverrideRef.current = null;
            } else {
              // Respect the user's explicit manual selection; do not overwrite!
              return;
            }
          }

          const progress = self.progress;
          // 3 milestones:
          // [0 .. 0.33) -> "01" (Campus Operations)
          // [0.33 .. 0.66) -> "02" (F1 Analytics)
          // [0.66 .. 1.00] -> "03" (Service Quality)
          let nextId = '01';
          if (progress >= 0.66) {
            nextId = '03';
          } else if (progress >= 0.33) {
            nextId = '02';
          }

          setActiveProjectId((prev) => {
            if (prev !== nextId) {
              setIsCrossFading(true);
              setTimeout(() => setIsCrossFading(false), 180);
              return nextId;
            }
            return prev;
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Derive the active project from the single source of truth: activeProjectId
  const activeProject =
    projects.find((project) => project.id === activeProjectId) ?? projects[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Selected Work and Featured Projects"
      className="relative w-full pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 bg-deep-space scroll-mt-20"
    >
      {/* Section Transition Veil */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-deep-space via-deep-space/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Subtle Atmospheric Lighting */}
      <div
        className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-navy-light/[0.025] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-accent-cyan/[0.02] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Editorial Section Entry Hairline */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-5 sm:mb-6 lg:mb-6" />

        {/* 1. Approved Centered Section Intro (Unchanged) */}
        <ProjectsHeader />

        {/* =========================================================================
            2. DESKTOP CINEMATIC STICKY CASE-STUDY EXPERIENCE (lg and above)
            ========================================================================= */}
        <div className="hidden lg:block">
          <div ref={showcaseRef} className="w-full">
            {/* Obvious Project Navigation Row */}
            <div className="w-full pb-4 mb-6 sm:mb-8 border-b border-white/[0.06] flex justify-center">
              <ProjectProgress
                projects={projects}
                activeProjectId={activeProjectId}
                onSelectProject={handleSelectProject}
                className="w-full lg:w-[80%] max-w-4xl xl:max-w-5xl"
              />
            </div>

            {/* 2-Column Showcase: Left 42% Meta & Actions | Right 58% Enlarged Visual */}
            <div className="grid grid-cols-12 gap-10 xl:gap-14 items-center">
              {/* Left Column: Reorganized Project Meta */}
              <div
                className={`col-span-5 flex flex-col justify-between transition-all duration-300 ease-out ${
                  isCrossFading ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                <ProjectMeta project={activeProject} />
              </div>

              {/* Right Column: Visual Stage (Enlarged presence, non-dashboard canvas) */}
              <div className="col-span-7 w-full flex items-center">
                <ProjectVisualStage
                  activeProjectId={activeProjectId}
                  isCrossFading={isCrossFading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. MOBILE & TABLET: HORIZONTAL SELECTOR + NATURAL STACK (< 1024px)
            Visual placed directly after title, logo technologies, zero scroll trapping
            ========================================================================= */}
        <div className="block lg:hidden">
          {/* Obvious Project Navigation Selector */}
          <div className="pb-4 mb-6 border-b border-white/[0.06] overflow-x-auto no-scrollbar">
            <ProjectProgress
              projects={projects}
              activeProjectId={activeProjectId}
              onSelectProject={handleSelectProject}
            />
          </div>

          {/* Active Project Stacked Presentation */}
          <div
            className={`flex flex-col transition-all duration-300 ease-out ${
              isCrossFading ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            <ProjectMeta
              project={activeProject}
              visualSlot={
                <div className="w-full mb-6 mt-2">
                  <ProjectVisualStage
                    activeProjectId={activeProjectId}
                    isCrossFading={isCrossFading}
                  />
                </div>
              }
            />
          </div>
        </div>

        {/* =========================================================================
            4. SECTION-LEVEL FOOTER ACTION: VIEW ALL PROJECTS ↗
            Single horizontal editorial row: divider line + right-aligned CTA
            ========================================================================= */}
        <div className="w-full mt-8 sm:mt-10 lg:mt-6 flex items-center justify-between gap-6 sm:gap-8">
          {/* Subtle Editorial Divider Line */}
          <div
            className="flex-1 min-w-[24px] sm:min-w-[40px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-white/[0.12] transition-colors duration-300"
            aria-hidden="true"
          />

          {/* Section CTA */}
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              navigate('/projects');
            }}
            className="group flex-shrink-0 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-300 hover:text-white transition-colors duration-300 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
            aria-label="View all projects in the archive"
          >
            <span className="relative">
              VIEW ALL PROJECTS
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <span className="text-accent-cyan transition-transform duration-300 ease-out group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
