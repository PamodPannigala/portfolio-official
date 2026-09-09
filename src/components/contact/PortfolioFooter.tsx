import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const PortfolioFooter: React.FC = () => {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full mt-16 sm:mt-20 lg:mt-24 pt-8 pb-10 border-t border-white/[0.06] select-none">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        {/* Left Identity & Role */}
        <div className="flex flex-col space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_6px_#38bdf8]" />
            <span className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
              {PORTFOLIO_DATA.brandName}
            </span>
          </div>
          <p className="font-body text-xs text-text-secondary">
            {PORTFOLIO_DATA.title} · {PORTFOLIO_DATA.badgeText}
          </p>
        </div>

        {/* Center Credits */}
        <div className="flex flex-col md:items-center text-left md:text-center space-y-0.5 font-mono text-[11px] text-text-secondary/70">
          <div>Built with React · TypeScript · Three.js · Tailwind CSS</div>
          <div>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.</div>
        </div>

        {/* Right Back to Top CTA */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] tracking-wider uppercase text-slate-300 hover:text-white transition-colors py-1.5 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
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
    </footer>
  );
};
