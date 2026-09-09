import React, { useEffect } from 'react';
import { CredentialItem } from '@/data/portfolioData';

interface CertificateModalProps {
  credential: CredentialItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  credential,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !credential) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${credential.title} Certificate Preview`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#071318] border border-white/[0.12] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-cyan font-semibold tracking-wider">
              {credential.index ? `CREDENTIAL / ${credential.index}` : 'CREDENTIAL'}
            </span>
            <span className="text-white/20">|</span>
            <span className="font-display text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
              {credential.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {credential.credentialUrl && (
              <a
                href={credential.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent-cyan/30 bg-accent-cyan/[0.08] font-mono text-xs text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
              >
                <span>View Credential</span>
                <span className="text-[11px]">↗</span>
              </a>
            )}
            {credential.certificatePdf && (
              <a
                href={credential.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] font-mono text-xs text-slate-300 hover:text-white transition-colors"
              >
                <span>Open Original PDF</span>
                <span className="text-[11px]">↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close certificate modal"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Certificate Image Frame */}
        <div className="relative p-4 sm:p-6 lg:p-8 bg-[#030a0d] flex items-center justify-center overflow-auto max-h-[78vh]">
          <img
            src={credential.certificateImage}
            alt={`${credential.title} Certificate for Pamod Sachintha Pannigala`}
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl border border-black/20"
            loading="eager"
          />
        </div>

        {/* Bottom Verification Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-white/[0.08] bg-white/[0.01] font-mono text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Issuer:</span>
            <span className="text-white font-medium">{credential.issuer}</span>
            {credential.credentialId && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-slate-400">ID:</span>
                <span className="text-accent-cyan font-medium">{credential.credentialId}</span>
              </>
            )}
          </div>
          <div className="text-slate-400">
            {credential.displayYear}
          </div>
        </div>
      </div>
    </div>
  );
};
