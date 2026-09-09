import React from 'react';
import { CredentialItem } from '@/data/portfolioData';
import { useAppRoute } from '@/context/RouteContext';
import { CertificationEntry } from './CertificationEntry';

interface CertificationsChapterProps {
  credentials: CredentialItem[];
  onOpenPreview: (credential: CredentialItem) => void;
}

export const CertificationsChapter: React.FC<CertificationsChapterProps> = ({
  credentials,
  onOpenPreview,
}) => {
  const { navigate } = useAppRoute();

  // Selection strategy: Homepage ALWAYS renders only the single featured credential
  const featuredCredential = credentials[0];
  const hasCredentials = Boolean(credentials && credentials.length >= 1);

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5">
      {/* Chapter Sub-Header / Identity */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-cyan tracking-wider uppercase mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            <span>CERTIFICATIONS / 02</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
            Professional Credentials
          </h3>
        </div>
        <p className="font-body text-xs text-text-secondary max-w-sm font-normal">
          Industry certifications and technical learning paths.
        </p>
      </div>

      {/* Featured Single Credential on Homepage */}
      {featuredCredential && (
        <div className="w-full">
          <CertificationEntry
            credential={featuredCredential}
            onOpenPreview={onOpenPreview}
          />
        </div>
      )}

      {/* Section-Level CTA: Rendered whenever credentials.length >= 1 */}
      {hasCredentials && (
        <div className="w-full mt-2 sm:mt-3 flex items-center justify-between gap-6 sm:gap-8">
          {/* Subtle Editorial Divider Line */}
          <div
            className="flex-1 min-w-[24px] sm:min-w-[40px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-white/[0.12] transition-colors duration-300"
            aria-hidden="true"
          />

          {/* Section CTA */}
          <a
            href="/certifications"
            onClick={(e) => {
              e.preventDefault();
              navigate('/certifications');
            }}
            className="group flex-shrink-0 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-300 hover:text-white transition-colors duration-300 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent-cyan rounded"
            aria-label="View all certifications in the archive"
          >
            <span className="relative">
              VIEW ALL CERTIFICATIONS
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <span className="text-accent-cyan transition-transform duration-300 ease-out group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

