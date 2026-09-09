import React from 'react';
import { CredentialItem } from '@/data/portfolioData';
import { TechLogo } from '../techstack/TechLogo';

interface CertificationEntryProps {
  credential: CredentialItem;
  onOpenPreview: (credential: CredentialItem) => void;
}

export const CertificationEntry: React.FC<CertificationEntryProps> = ({
  credential,
  onOpenPreview,
}) => {
  const statusText = credential.status || 'COMPLETED';
  const captionIssuerText = credential.captionIssuer || `${credential.issuer.toUpperCase()} OFFICIAL`;

  return (
    <div
      className="group/entry relative w-full rounded-xl border border-white/[0.05] bg-white/[0.008] p-4.5 sm:p-5 lg:p-6 hover:border-accent-cyan/20 hover:bg-white/[0.012] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 right-1/4 w-60 h-60 bg-accent-cyan/[0.01] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Credential Meta & Skills (approx 55%) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-2.5">
          {/* Top Meta: Index & Status Badge */}
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-cyan tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              <span>CREDENTIAL / {credential.index || '01'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-accent-cyan/30 bg-accent-cyan/[0.08] font-mono text-[10px] text-accent-cyan font-medium">
              <svg className="w-2.5 h-2.5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{statusText}</span>
            </div>
          </div>

          {/* Title & Issuer */}
          <div className="space-y-1">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover/entry:text-accent-cyan transition-colors duration-200">
              {credential.title}
            </h3>

            {/* Issuer Lockup with 3-tier Fallback: 1) issuerLogo, 2) TechLogo(issuerId), 3) Neutral Icon */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-4.5 h-4.5 rounded bg-white/[0.04] border border-white/[0.08] flex-shrink-0 overflow-hidden">
                {credential.issuerLogo ? (
                  <img
                    src={credential.issuerLogo}
                    alt={credential.issuer}
                    className="w-3 h-3 object-contain"
                    loading="lazy"
                  />
                ) : credential.issuerId ? (
                  <TechLogo id={credential.issuerId} className="w-3 h-3" />
                ) : (
                  <svg className="w-2.5 h-2.5 text-accent-cyan/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                )}
              </div>
              <span className="font-display text-xs sm:text-[13px] font-semibold text-white tracking-wide">
                {credential.issuer}
              </span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-[11px] text-text-secondary/90 font-medium">
                {credential.displayYear}
              </span>
            </div>
          </div>

          {/* Description brief */}
          {credential.description && (
            <p className="font-body text-xs text-text-secondary leading-relaxed font-normal line-clamp-2">
              {credential.description}
            </p>
          )}

          {/* Skill / Competency Tags */}
          <div className="pt-0.5">
            <div className="font-mono text-[9.5px] uppercase tracking-widest text-text-secondary/65 font-semibold mb-1">
              Verified Technical Competencies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {credential.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] font-mono text-[10.5px] text-slate-300 hover:border-accent-cyan/30 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Credential Action CTAs: Modal Trigger, Optional Credential URL, Optional PDF */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/[0.05]">
            <button
              type="button"
              onClick={() => onOpenPreview(credential)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-accent-cyan/40 bg-accent-cyan/[0.08] hover:bg-accent-cyan/20 font-mono text-[11px] font-medium text-accent-cyan transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>View Full Certificate</span>
            </button>

            {/* Optional External Credential Verification URL */}
            {credential.credentialUrl && (
              <a
                href={credential.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.06] hover:bg-accent-cyan/15 font-mono text-[11px] text-accent-cyan hover:text-white transition-colors"
              >
                <span>View Credential</span>
                <span className="text-[9.5px]">↗</span>
              </a>
            )}

            {/* Optional Official Certificate PDF */}
            {credential.certificatePdf && (
              <a
                href={credential.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] font-mono text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                <span>Official PDF</span>
                <span className="text-[9.5px]">↗</span>
              </a>
            )}

            {credential.credentialId && (
              <span className="font-mono text-[10px] text-text-secondary/50 ml-auto hidden sm:inline">
                ID: {credential.credentialId}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Real Certificate Preview Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-center">
          <div
            onClick={() => onOpenPreview(credential)}
            role="button"
            tabIndex={0}
            aria-label={`View certificate for ${credential.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenPreview(credential);
              }
            }}
            className="group/frame relative w-full max-w-[350px] rounded-lg border border-white/[0.08] bg-[#051117] p-2 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.5)] cursor-pointer hover:border-accent-cyan/40 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,240,255,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {/* Inner certificate boundary with crisp aspect ratio and high fidelity */}
            <div className="relative w-full rounded overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img
                src={credential.certificateImage}
                alt={`${credential.title} Certificate`}
                className="w-full h-auto max-h-[235px] object-contain transition-transform duration-300 group-hover/frame:scale-[1.01]"
                loading="lazy"
              />

              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 border border-white/20 font-mono text-[10.5px] font-medium text-white shadow-lg">
                  <svg className="w-3 h-3 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Click to Expand</span>
                </span>
              </div>
            </div>

            {/* Bottom Caption Meta in Frame */}
            <div className="flex items-center justify-between pt-1.5 px-0.5 font-mono text-[9.5px] text-text-secondary/70">
              <span className="truncate">PROOF OF COMPLETION</span>
              <span className="text-accent-cyan font-medium">{captionIssuerText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
