import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperienceRoleIdentity } from './ExperienceRoleIdentity';
import { ExperienceMapVisual } from './ExperienceMapVisual';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ExperienceSection: React.FC = () => {
  const { experienceSection } = PORTFOLIO_DATA;
  const currentExperience = experienceSection.experiences[0];

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Active context node in the Digital Lab interactive map
  const [activeAreaId, setActiveAreaId] = useState<string>('ai-ml');

  // GSAP ScrollTrigger Entrance Reveal
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      gsap.set(
        sectionEl.querySelectorAll(
          '[data-experience-label], [data-experience-heading], [data-experience-intro], [data-experience-status], [data-experience-role], [data-experience-map]'
        ),
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const label = sectionEl.querySelector('[data-experience-label]');
      const heading = sectionEl.querySelector('[data-experience-heading]');
      const intro = sectionEl.querySelector('[data-experience-intro]');
      const status = sectionEl.querySelector('[data-experience-status]');
      const roleBlock = sectionEl.querySelector('[data-experience-role]');
      const mapBlock = sectionEl.querySelector('[data-experience-map]');

      // Initial State
      gsap.set([label, heading, intro, status], { opacity: 0, y: 22 });
      gsap.set(roleBlock, { opacity: 0, y: 24 });
      gsap.set(mapBlock, { opacity: 0, y: 28 });

      // Storytelling Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to(label, { opacity: 1, y: 0, duration: 0.65 })
        .to(heading, { opacity: 1, y: 0, duration: 0.75 }, '-=0.4')
        .to(intro, { opacity: 1, y: 0, duration: 0.75 }, '-=0.5')
        .to(status, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .to(roleBlock, { opacity: 1, y: 0, duration: 0.8 }, '-=0.45')
        .to(mapBlock, { opacity: 1, y: 0, duration: 0.85 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="Professional Experience and Current Chapter"
      className="relative w-full pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 bg-deep-space overflow-hidden scroll-mt-20"
    >
      {/* Section Transition Veil */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-deep-space via-deep-space/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Subtle Atmospheric Lighting */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-navy-light/[0.025] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-accent-cyan/[0.02] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Subtle Editorial Section Entry Hairline */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-5 sm:mb-6 lg:mb-7" />

        {/* 1. Balanced Editorial Header (EXPERIENCE / 03) */}
        <ExperienceHeader />

        {/* 2. Main Experience Composition (Desktop Left 46% | Right 54%) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-stretch">
          {/* Left Column: Role Identity & Grounded Professional Context */}
          <div data-experience-role className="lg:col-span-5 flex flex-col justify-between">
            <ExperienceRoleIdentity
              experience={currentExperience}
            />
          </div>

          {/* Right Column: Interactive Experience Map / Digital Lab Visual */}
          <div data-experience-map className="lg:col-span-7 w-full flex items-center">
            <ExperienceMapVisual
              contextAreas={currentExperience.contextAreas}
              activeAreaId={activeAreaId}
              onSelectArea={setActiveAreaId}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
