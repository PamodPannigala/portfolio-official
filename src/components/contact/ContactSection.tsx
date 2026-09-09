import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ContactActions } from './ContactActions';
import { SignalConvergenceVisual, ActiveContactChannel } from './SignalConvergenceVisual';
import { PortfolioFooter } from './PortfolioFooter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection: React.FC = () => {
  const { contactSection, socialLinks, email } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeChannel, setActiveChannel] = useState<ActiveContactChannel>(null);

  const linkedinUrl =
    socialLinks.find((s) => s.icon === 'linkedin')?.url || 'https://www.linkedin.com';
  const githubUrl =
    socialLinks.find((s) => s.icon === 'github')?.url || 'https://github.com';

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      gsap.set(
        sectionEl.querySelectorAll(
          '[data-contact-label], [data-contact-heading], [data-contact-copy], [data-contact-actions], [data-contact-focus], [data-contact-visual]'
        ),
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const label = sectionEl.querySelector('[data-contact-label]');
      const heading = sectionEl.querySelector('[data-contact-heading]');
      const copy = sectionEl.querySelector('[data-contact-copy]');
      const actions = sectionEl.querySelector('[data-contact-actions]');
      const focus = sectionEl.querySelector('[data-contact-focus]');
      const visual = sectionEl.querySelector('[data-contact-visual]');

      // Initial State
      gsap.set([label, heading, copy, actions, focus], { opacity: 0, y: 20 });
      gsap.set(visual, { opacity: 0, y: 28 });

      // Clean Entrance Timeline
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
        .to(copy, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .to(actions, { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
        .to(focus, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
        .to(visual, { opacity: 1, y: 0, duration: 0.65 }, '-=0.45');
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact and Professional Inquiries"
      className="relative w-full pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-deep-space overflow-hidden scroll-mt-20"
    >
      {/* Section Transition Ambient Veil */}
      <div
        className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-deep-space via-deep-space/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Atmospheric Lighting */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-cyan/[0.02] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-navy-light/[0.02] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Subtle Top Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-6 sm:mb-7 lg:mb-8" />

        {/* 2-Column Composition: Left Editorial & Actions (58%), Right Signal Convergence Visual (42%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              {/* Section Monospace Label */}
              <div data-contact-label className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_#38bdf8]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-widest text-accent-cyan uppercase">
                  {contactSection.sectionLabel}
                </span>
              </div>

              {/* Main Headline */}
              <h2
                data-contact-heading
                className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12] mb-4 sm:mb-5"
              >
                {contactSection.headingLine1}
                <br />
                <span className="text-slate-300 font-light">{contactSection.headingLine2}</span>
              </h2>

              {/* Supporting Copy */}
              <p
                data-contact-copy
                className="font-body text-base sm:text-lg text-slate-300/85 max-w-xl leading-relaxed font-normal"
              >
                {contactSection.supportingLine}
              </p>
            </div>

            {/* Contact Actions */}
            <div data-contact-actions className="w-full">
              <ContactActions
                email={email}
                linkedinUrl={linkedinUrl}
                githubUrl={githubUrl}
                onHoverChannel={setActiveChannel}
              />
            </div>

            {/* Professional Focus Line */}
            <div
              data-contact-focus
              className="flex items-center gap-2 text-text-secondary/65 font-mono text-[11px] sm:text-xs tracking-wider uppercase pt-4 sm:pt-6 border-t border-white/[0.05]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60" />
              <span>{contactSection.professionalFocus}</span>
            </div>
          </div>

          {/* Right Column: Signal Convergence Field Visual */}
          <div data-contact-visual className="lg:col-span-5 w-full flex justify-center">
            <SignalConvergenceVisual activeChannel={activeChannel} />
          </div>
        </div>

        {/* Integrated Portfolio Footer */}
        <PortfolioFooter />
      </div>
    </section>
  );
};
