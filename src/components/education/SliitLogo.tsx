import React from 'react';

interface SliitLogoProps {
  className?: string;
}

export const SliitLogo: React.FC<SliitLogoProps> = ({ className = 'h-8' }) => {
  return (
    <div className={`relative inline-flex items-center gap-2.5 select-none ${className}`} aria-label="SLIIT - Sri Lanka Institute of Information Technology">
      {/* Official SLIIT Logo Asset */}
      <div className="flex items-center px-2 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-colors">
        <img
          src="/sliit/sliit_logo.png"
          alt="SLIIT Official Logo"
          className="h-6 w-auto object-contain brightness-110 contrast-125"
          loading="eager"
        />
      </div>
    </div>
  );
};
