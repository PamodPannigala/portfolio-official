import React, { useRef } from 'react';
import { DataUniverseCanvas } from '../three/DataUniverseCanvas';
import { EditorialBackgroundText } from './EditorialBackgroundText';
import { HeroContent } from './HeroContent';
import { HeroPortrait } from './HeroPortrait';
import { useHeroParallax } from '@/hooks/useHeroParallax';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const editorialRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useHeroParallax({
    sectionRef,
    editorialRef,
    portraitRef,
    haloRef,
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-start lg:justify-center lg:items-center pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 overflow-x-hidden bg-deep-space w-full"
      aria-label="Hero Section"
    >
      {/* Layer 2 & 3: 3D Canvas Background (Particles & Sparse Lines) */}
      <DataUniverseCanvas />

      {/* Layer 4: Oversized Editorial Stacked Background Typography (2.5D Counter-Parallax) */}
      <EditorialBackgroundText ref={editorialRef} />

      {/* Main Responsive Grid Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-6 items-center">
          {/* Layer 6: Left Column Text Content (Spans 7 cols on desktop) */}
          <div className="lg:col-span-7 flex justify-start">
            <HeroContent />
          </div>

          {/* Layer 5: Right Column Integrated Portrait Area (2.5D Mouse & Scroll Parallax) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroPortrait portraitRef={portraitRef} haloRef={haloRef} />
          </div>
        </div>
      </div>

      {/* Minimal Scroll Down Indicator (hidden on small mobile screens to save vertical space) */}
      <a
        href="#about"
        className="hidden sm:flex absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-text-muted/60 hover:text-accent-cyan transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded-md p-1 group"
        aria-label="Scroll down to About section"
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase font-medium group-hover:text-accent-cyan">
          Scroll
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-accent-cyan/50">
          <div className="w-1 h-1.5 rounded-full bg-accent-cyan animate-bounce" />
        </div>
      </a>
    </section>
  );
};
