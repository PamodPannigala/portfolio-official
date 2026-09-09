import React from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import cvPdf from '@/assets/Pamod_Pannigala_CV.pdf';

export const CTAButtons: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 lg:gap-5 pt-1 sm:pt-2">
      {/* Primary CTA: View Projects */}
      <a
        href={PORTFOLIO_DATA.cta.primary.href}
        className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-full bg-navy-card border border-accent-cyan/70 text-text-primary font-body font-semibold text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-cyan hover:text-deep-space hover:border-accent-cyan hover:shadow-[0_8px_25px_rgba(56,189,248,0.32)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-deep-space"
      >
        <span>{PORTFOLIO_DATA.cta.primary.text}</span>
        <ArrowRight className="w-4 h-4 text-accent-cyan group-hover:text-deep-space transition-all duration-300 group-hover:translate-x-1" />
      </a>

      {/* Secondary Actions Group (Tightened spacing between Contact Me & Download CV) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Secondary CTA: Contact Me */}
        <a
          href={PORTFOLIO_DATA.cta.secondary.href}
          className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] rounded-full bg-white/[0.02] border border-navy-border text-text-primary font-body font-medium text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:bg-white/[0.05] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-deep-space"
        >
          <Mail className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:scale-110" />
          <span>{PORTFOLIO_DATA.cta.secondary.text}</span>
        </a>

        {/* Download CV */}
        <a
          href={cvPdf || PORTFOLIO_DATA.cta.download.href}
          download="Pamod-Pannigala-CV.pdf"
          className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-3.5 min-h-[44px] text-text-secondary font-body font-medium text-sm transition-all duration-300 ease-out hover:text-accent-cyan hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded-md"
        >
          <Download className="w-4 h-4 text-text-muted group-hover:text-accent-cyan transition-colors" />
          <span className="border-b border-transparent group-hover:border-accent-cyan transition-all">
            {PORTFOLIO_DATA.cta.download.text}
          </span>
        </a>
      </div>
    </div>
  );
};
