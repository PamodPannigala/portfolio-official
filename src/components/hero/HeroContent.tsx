import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CTAButtons } from './CTAButtons';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const HeroContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-hero-item',
        { opacity: 0.35, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="flex flex-col space-y-5 sm:space-y-6 lg:space-y-7 max-w-2xl text-left z-10 py-4 sm:py-6">
      {/* Status Element (Subtle & elegant, reduced panel/border emphasis) */}
      <div className="gsap-hero-item inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-body font-medium tracking-wide w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_6px_#38bdf8]" />
        <span className="text-text-primary/90">{PORTFOLIO_DATA.badgeText}</span>
      </div>

      {/* Intro Greeting & Prominent Name Anchor */}
      <div className="space-y-2 sm:space-y-3">
        <span className="gsap-hero-item block font-body text-sm sm:text-base lg:text-lg text-text-secondary font-medium tracking-wide">
          Hi, I'm
        </span>
        <h1 className="gsap-hero-item font-display font-extrabold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-text-primary leading-[1.06] sm:leading-[1.04]">
          <span className="inline-block">Pamod</span>{' '}
          <span className="inline-block">Pannigala</span>
        </h1>
      </div>

      {/* Job Title / Subtitle */}
      <div className="gsap-hero-item">
        <h2 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-sky-100 to-accent-blue tracking-tight">
          {PORTFOLIO_DATA.title}
        </h2>
      </div>

      {/* Bio Statement */}
      <p className="gsap-hero-item font-body text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl font-normal opacity-90">
        {PORTFOLIO_DATA.tagline}
      </p>

      {/* CTA Buttons */}
      <div className="gsap-hero-item pt-1 sm:pt-2">
        <CTAButtons />
      </div>
    </div>
  );
};
