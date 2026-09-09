import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { TechStackHeader } from './TechStackHeader';
import { TechCapabilityColumn } from './TechCapabilityColumn';
import { TechUtilityRow } from './TechUtilityRow';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TechStackSection: React.FC = () => {
  const { techStackSection } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const primaryLanes = techStackSection.lanes.slice(0, 3);
  const databaseLane = techStackSection.lanes[3];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      gsap.set(
        sectionEl.querySelectorAll(
          '[data-techstack-label], [data-techstack-heading], [data-techstack-intro], [data-techstack-col], [data-techstack-utility]'
        ),
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const label = sectionEl.querySelector('[data-techstack-label]');
      const heading = sectionEl.querySelector('[data-techstack-heading]');
      const intro = sectionEl.querySelector('[data-techstack-intro]');
      const cols = sectionEl.querySelectorAll('[data-techstack-col]');
      const utility = sectionEl.querySelector('[data-techstack-utility]');

      // Initial state
      gsap.set([label, heading, intro], { opacity: 0, y: 16 });
      gsap.set(cols, { opacity: 0, y: 20 });
      gsap.set(utility, { opacity: 0, y: 16 });

      // Clean non-blocking entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to(label, { opacity: 1, y: 0, duration: 0.45 })
        .to(heading, { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
        .to(intro, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .to(
          cols,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          '-=0.3'
        )
        .to(utility, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25');
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      aria-label="Core Technical Skills and Technologies"
      className="relative w-full pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 bg-deep-space overflow-hidden scroll-mt-20"
    >
      {/* Section Transition Ambient Veil */}
      <div
        className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-b from-deep-space via-deep-space/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Atmospheric Lighting */}
      <div
        className="absolute top-1/4 left-1/3 w-[520px] h-[520px] bg-navy-light/[0.02] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[460px] h-[460px] bg-accent-cyan/[0.015] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Subtle Top Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-7 sm:mb-8" />

        {/* 1. Centered Editorial Header */}
        <TechStackHeader />

        {/* 2. Balanced 3-Column Capability Matrix */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {primaryLanes.map((lane) => (
            <div key={lane.id} data-techstack-col className="h-full">
              <TechCapabilityColumn lane={lane} />
            </div>
          ))}
        </div>

        {/* 3. Balanced Bottom Utility Row (04 Databases + Tools/Workflow) */}
        <div data-techstack-utility className="w-full">
          <TechUtilityRow
            databaseLane={databaseLane}
            workflowTools={techStackSection.workflowTools}
          />
        </div>
      </div>
    </section>
  );
};
