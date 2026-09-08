import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutIntro } from './AboutIntro';
import { DataFlowStory } from './DataFlowStory';
import { FocusAreas } from './FocusAreas';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // If user prefers reduced motion, display all elements statically without transforms
    if (prefersReducedMotion) {
      gsap.set(
        sectionEl.querySelectorAll(
          '[data-about-label], [data-about-heading], [data-about-intro], [data-about-concept], [data-about-status], [data-flow-container], [data-flow-step], [data-focus-section], [data-focus-pillar]'
        ),
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const label = sectionEl.querySelector('[data-about-label]');
      const heading = sectionEl.querySelector('[data-about-heading]');
      const intro = sectionEl.querySelector('[data-about-intro]');
      const concept = sectionEl.querySelector('[data-about-concept]');
      const status = sectionEl.querySelector('[data-about-status]');
      const dataFlowContainer = sectionEl.querySelector('[data-flow-container]');
      const flowSteps = sectionEl.querySelectorAll('[data-flow-step]');
      const focusSection = sectionEl.querySelector('[data-focus-section]');
      const focusPillars = sectionEl.querySelectorAll('[data-focus-pillar]');

      // Initial state: subtle offset
      gsap.set([label, heading, intro, concept, status], { opacity: 0, y: 20 });
      gsap.set(dataFlowContainer, { opacity: 0, y: 22 });
      gsap.set(flowSteps, { opacity: 0, y: 12 });
      gsap.set(focusSection, { opacity: 0, y: 20 });
      gsap.set(focusPillars, { opacity: 0, y: 14 });

      // Primary Composition ScrollTrigger Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      mainTl
        .to(label, { opacity: 1, y: 0, duration: 0.7 })
        .to(heading, { opacity: 1, y: 0, duration: 0.8 }, '-=0.45')
        .to(intro, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
        .to([concept, status], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .to(dataFlowContainer, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .to(
          flowSteps,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.45'
        );

      // Secondary Section (Focus Areas) ScrollTrigger Timeline
      if (focusSection) {
        gsap.timeline({
          scrollTrigger: {
            trigger: focusSection,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          defaults: { ease: 'power3.out' },
        })
          .to(focusSection, { opacity: 1, y: 0, duration: 0.8 })
          .to(
            focusPillars,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
            },
            '-=0.5'
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Pamod Pannigala"
      className="relative w-full min-h-screen pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-32 bg-deep-space overflow-hidden scroll-mt-24"
    >
      {/* SECTION TRANSITION VEIL:
          Gently dissipates the 3D Hero environment into calm, deep-space dark atmosphere.
      */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-deep-space via-deep-space/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Subtle Atmospheric Lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-navy-light/[0.025] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-accent-cyan/[0.02] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Subtle section entry hairline */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-7 sm:mb-9 lg:mb-11" />

        {/* =========================================================================
            1. PRIMARY COMPOSITION: 2-COLUMN ASYMMETRIC STORYTELLING
            Left: Editorial Intro (42%) | Right: 5-Stage Continuous Data Flow (58%)
            ========================================================================= */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start mb-6 sm:mb-8 lg:mb-9">
          {/* Left Column: ABOUT / 01, Statement Heading, Intro, Core Principle */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AboutIntro />
          </div>

          {/* Right Column: 5-Stage Continuous Data Flow Story */}
          <div className="lg:col-span-7 w-full">
            <DataFlowStory />
          </div>
        </div>

        {/* =========================================================================
            2. SECONDARY SECTION: 4-COLUMN EDITORIAL FOCUS AREAS
            Positioned with balanced vertical rhythm below the main composition
            ========================================================================= */}
        <FocusAreas />
      </div>
    </section>
  );
};
