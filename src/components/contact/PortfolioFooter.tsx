import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const PortfolioFooter: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    if (prefersReducedMotion) {
      gsap.set(
        footerEl.querySelectorAll('[data-footer-rail], [data-footer-brand], [data-footer-meta], [data-footer-bottom]'),
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const rail = footerEl.querySelector('[data-footer-rail]');
      const brand = footerEl.querySelector('[data-footer-brand]');
      const meta = footerEl.querySelector('[data-footer-meta]');
      const bottom = footerEl.querySelector('[data-footer-bottom]');

      gsap.set([brand, meta, bottom], { opacity: 0, y: 14 });
      if (rail) gsap.set(rail, { opacity: 0, scaleX: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      if (rail) tl.to(rail, { opacity: 1, scaleX: 1, duration: 0.6 });
      tl.to(brand, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
        .to(meta, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
        .to(bottom, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3');
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const locationText = PORTFOLIO_DATA.location || 'Colombo · Sri Lanka';

  return (
    <footer
      ref={footerRef}
      aria-label="Portfolio Closing and Footer Navigation"
      className="w-full mt-14 sm:mt-16 lg:mt-20 pt-6 pb-12 select-none"
    >
      {/* =========================================================================
          1. SUBTLE SIGNAL RAIL (Visual connection to Signal Field above)
          ========================================================================= */}
      <div
        data-footer-rail
        className="relative w-full h-4 mb-8 sm:mb-10 flex items-center justify-between pointer-events-none"
        aria-hidden="true"
      >
        {/* Base Track Line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Node 1 (Origin) */}
        <div className="relative z-10 flex items-center gap-1.5 pl-2 sm:pl-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80 shadow-[0_0_6px_#38bdf8]" />
          <span className="font-mono text-[9px] text-text-secondary/40 tracking-widest uppercase hidden sm:inline">
            NODE_01
          </span>
        </div>

        {/* Active Segment in Center */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
          <span className="w-1 h-1 rounded-full bg-accent-cyan/60" />
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
        </div>

        {/* Node 2 (Terminal Hub) */}
        <div className="relative z-10 flex items-center gap-1.5 pr-2 sm:pl-4">
          <span className="font-mono text-[9px] text-accent-cyan/60 tracking-widest uppercase hidden sm:inline">
            TERMINAL // ACTIVE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#38bdf8]" />
        </div>
      </div>

      {/* =========================================================================
          2. TOP / SIGNATURE AREA (Clean 3-Zone Composition on Desktop)
          ========================================================================= */}
      <div
        data-footer-brand
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start pb-8 sm:pb-10 border-b border-white/[0.05]"
      >
        {/* Zone 1: Confident Editorial Identity (Col 1-5) */}
        <div className="md:col-span-5 flex flex-col space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#38bdf8]" />
            <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-[30px] text-white tracking-tight leading-none">
              {PORTFOLIO_DATA.brandName}
            </h3>
          </div>
          <div className="font-body text-xs sm:text-[13px] text-text-secondary/80 space-y-0.5 pl-5">
            <div>{PORTFOLIO_DATA.title}</div>
            <div className="text-text-secondary/60">{PORTFOLIO_DATA.badgeText}</div>
          </div>
        </div>

        {/* Zone 2: Technical Metadata Stack (Col 6-9) */}
        <div
          data-footer-meta
          className="md:col-span-4 flex flex-col space-y-1.5 justify-center md:pl-4"
        >
          <div className="font-mono text-[10px] tracking-widest text-accent-cyan/90 uppercase font-semibold flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-cyan/60" />
            <span>BUILT WITH</span>
          </div>
          <p className="font-mono text-xs text-text-secondary/75 leading-relaxed">
            React · TypeScript · Three.js · Tailwind CSS
          </p>
        </div>

        {/* Zone 3: Deliberate Back to Top CTA (Col 10-12) */}
        <div className="md:col-span-3 flex md:justify-end items-center pt-2 md:pt-0">
          <button
            type="button"
            onClick={handleBackToTop}
            className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.05] hover:border-accent-cyan/40 font-mono text-xs sm:text-[13px] tracking-wider uppercase text-slate-200 hover:text-white transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-cyan shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            aria-label="Back to top of page"
          >
            <span className="relative">
              BACK TO TOP
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <span className="text-accent-cyan transition-transform duration-300 ease-out group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. LOWER METADATA ROW (Quiet, Clean, Informative)
          ========================================================================= */}
      <div
        data-footer-bottom
        className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-mono text-xs text-text-secondary/60"
      >
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}</span>
          <span className="text-white/20">·</span>
          <span>All rights reserved.</span>
        </div>

        <div className="flex items-center gap-2 text-text-secondary/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_5px_#34d399]" />
          <span>{locationText}</span>
        </div>
      </div>
    </footer>
  );
};
