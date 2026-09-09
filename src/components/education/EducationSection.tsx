import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA, CredentialItem } from '@/data/portfolioData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EducationHeader } from './EducationHeader';
import { AcademicPathPanel } from './AcademicPathPanel';
import { CertificationsChapter } from './CertificationsChapter';
import { CertificateModal } from './CertificateModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const EducationSection: React.FC = () => {
  const { educationSection } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeModalCredential, setActiveModalCredential] = useState<CredentialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPreview = (credential: CredentialItem) => {
    setActiveModalCredential(credential);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      gsap.set(
        sectionEl.querySelectorAll(
          '[data-education-label], [data-education-heading], [data-education-intro], [data-academic-panel], [data-certifications-chapter]'
        ),
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const label = sectionEl.querySelector('[data-education-label]');
      const heading = sectionEl.querySelector('[data-education-heading]');
      const intro = sectionEl.querySelector('[data-education-intro]');
      const academicPanel = sectionEl.querySelector('[data-academic-panel]');
      const certChapter = sectionEl.querySelector('[data-certifications-chapter]');

      // Initial State
      gsap.set([label, heading, intro], { opacity: 0, y: 16 });
      gsap.set([academicPanel, certChapter], { opacity: 0, y: 24 });

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
        .to(intro, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .to(academicPanel, { opacity: 1, y: 0, duration: 0.65 }, '-=0.25')
        .to(certChapter, { opacity: 1, y: 0, duration: 0.65 }, '-=0.35');
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <section
        id="education"
        ref={sectionRef}
        aria-label="Academic Education and Verified Credentials"
        className="relative w-full pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 lg:pb-20 bg-deep-space overflow-hidden scroll-mt-20"
      >
        {/* Section Transition Ambient Veil */}
        <div
          className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-deep-space via-deep-space/90 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Atmospheric Lighting */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-navy-light/[0.02] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-accent-cyan/[0.015] rounded-full blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          {/* Subtle Top Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-6 sm:mb-7" />

          {/* 1. Centered Editorial Header */}
          <EducationHeader />

          {/* 2. Vertical 2-Chapter Layout */}
          <div className="w-full flex flex-col gap-7 sm:gap-8 lg:gap-9">
            {/* Chapter 1: Full-Width Academic Path Panel */}
            <div data-academic-panel className="w-full">
              <AcademicPathPanel education={educationSection.education} />
            </div>

            {/* Chapter 2: Full-Width Scalable Certifications Chapter */}
            <div data-certifications-chapter className="w-full">
              <CertificationsChapter
                credentials={educationSection.credentials || [educationSection.credential]}
                onOpenPreview={handleOpenPreview}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Modal for viewing high-res certificate */}
      <CertificateModal
        credential={activeModalCredential}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
