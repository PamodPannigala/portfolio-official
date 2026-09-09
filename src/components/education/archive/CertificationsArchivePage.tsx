import React, { useState } from 'react';
import { PORTFOLIO_DATA, CredentialItem } from '@/data/portfolioData';
import { useAppRoute } from '@/context/RouteContext';
import { CertificationEntry } from '../CertificationEntry';
import { CertificateModal } from '../CertificateModal';

export const CertificationsArchivePage: React.FC = () => {
  const { certificationsArchive, educationSection } = PORTFOLIO_DATA;
  const allCredentials: CredentialItem[] =
    educationSection.credentials || (educationSection.credential ? [educationSection.credential] : []);
  const { navigate } = useAppRoute();

  const [activeModalCredential, setActiveModalCredential] = useState<CredentialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenPreview = (credential: CredentialItem) => {
    setActiveModalCredential(credential);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-deep-space pt-28 sm:pt-36 lg:pt-40 pb-24 sm:pb-32 overflow-hidden">
        {/* Subtle Atmospheric Lighting */}
        <div
          className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-accent-cyan/[0.025] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-navy-light/[0.02] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          {/* =========================================================================
              1. EDITORIAL INTRO BLOCK (Spacious, Minimal, Authoritative)
              ========================================================================= */}
          <header className="mb-12 sm:mb-16">
            {/* Section Monospace Label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_#38bdf8]" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-[13px] tracking-widest text-accent-cyan uppercase font-semibold">
                {certificationsArchive.sectionLabel}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.12]">
              {certificationsArchive.headingLine1}
              <br />
              <span className="text-slate-300 font-light">
                {certificationsArchive.headingLine2}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-body text-base sm:text-lg text-slate-300/85 max-w-2xl leading-relaxed">
              {certificationsArchive.supportingLine}
            </p>

            {/* Hairline Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent mt-10 sm:mt-12" />
          </header>

          {/* =========================================================================
              2. EDITORIAL VERTICAL CREDENTIAL STACK
              ========================================================================= */}
          <section aria-label="Certifications list" className="flex flex-col gap-6 sm:gap-8 w-full">
            {allCredentials.length > 0 ? (
              allCredentials.map((cred) => (
                <CertificationEntry
                  key={cred.id}
                  credential={cred}
                  onOpenPreview={handleOpenPreview}
                />
              ))
            ) : (
              <div className="py-20 text-center text-slate-400 font-mono text-sm">
                No credentials listed.
              </div>
            )}
          </section>

          {/* =========================================================================
              3. FOOTER RETURN NAVIGATION
              ========================================================================= */}
          <footer className="mt-16 sm:mt-24 pt-8 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={() => navigate('/#education')}
              className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-300 hover:text-white transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
            >
              <span className="text-accent-cyan transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span className="relative">
                BACK TO PORTFOLIO
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </button>

            <span className="font-mono text-xs text-slate-400 hidden sm:inline-block">
              {allCredentials.length} {allCredentials.length === 1 ? 'CREDENTIAL' : 'CREDENTIALS'}
            </span>
          </footer>
        </div>
      </div>

      {/* Lightbox / Modal for full certificate view */}
      <CertificateModal
        credential={activeModalCredential}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
