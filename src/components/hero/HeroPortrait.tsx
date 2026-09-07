import React from 'react';
import pamodPortrait from '@/assets/Pamod.png';

interface HeroPortraitProps {
  imageSrc?: string;
  altText?: string;
  portraitRef?: React.RefObject<HTMLDivElement>;
  haloRef?: React.RefObject<HTMLDivElement>;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({
  imageSrc = pamodPortrait,
  altText = "Pamod Pannigala - Professional Data Science Portrait",
  portraitRef,
  haloRef,
}) => {
  return (
    <div
      className="relative w-full max-w-lg lg:max-w-xl mx-auto lg:mr-auto flex items-center justify-center mt-4 sm:mt-6 lg:-mt-24 z-20"
      style={{ perspective: 1200 }}
    >
      {/* Tightened Backdrop Halo (independent 2.5D shift - z-index: -10) */}
      <div ref={haloRef} className="absolute inset-0 pointer-events-none -z-10 will-change-transform">
        <div className="absolute top-6 sm:top-8 lg:top-14 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-accent-cyan/9 blur-[50px] sm:blur-[60px] lg:blur-[70px] pointer-events-none animate-slow-pulse" />
        <div className="absolute top-8 sm:top-10 lg:top-16 w-36 h-36 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full bg-accent-blue/8 blur-[40px] sm:blur-[48px] lg:blur-[55px] pointer-events-none" />
        <div className="absolute top-6 sm:top-8 inset-x-0 max-w-[16rem] sm:max-w-xs lg:max-w-sm mx-auto aspect-square rounded-full bg-gradient-to-t from-accent-cyan/10 via-transparent to-accent-blue/10 blur-xl opacity-25 pointer-events-none" />
      </div>

      {/* Cutout Container with 2.5D tilt & parallax (overflow-visible to prevent clipping) */}
      <div
        ref={portraitRef}
        className="relative w-64 h-[25rem] sm:w-80 sm:h-[30rem] lg:w-[31rem] lg:h-[37rem] flex items-end justify-center overflow-visible will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Full Opaque Natural Portrait Image - Proportions Preserved */}
        <img
          src={imageSrc}
          alt={altText}
          style={{ opacity: 1, mixBlendMode: 'normal' }}
          className="relative z-10 w-full h-full object-contain object-bottom filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] transition-transform duration-500 hover:scale-[1.01] pointer-events-none select-none"
        />

        {/* Organic Localized Edge Overlays:
            Preserves solid blazer body while organically softening camera frame borders.
            Face, hair, glasses, neck, shirt collar, upper blazer, and shoulders remain 100% crisp and opaque. */}

        {/* 1. Subtle dark background overlay around the absolute bottom edge only */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to top, #05070c 0%, #05070c 18%, rgba(5, 7, 12, 0.85) 45%, rgba(5, 7, 12, 0.3) 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* 2. Localized blend for lower-left outer arm cut (~55px wide, lower torso only, well below shoulder) */}
        <div
          className="absolute left-0 bottom-0 w-14 sm:w-16 h-32 sm:h-36 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, #05070c 0%, rgba(5, 7, 12, 0.85) 25%, rgba(5, 7, 12, 0.3) 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* 3. Localized blend for lower-right outer arm cut (~55px wide, lower torso only, well below shoulder) */}
        <div
          className="absolute right-0 bottom-0 w-14 sm:w-16 h-36 sm:h-40 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to left, #05070c 0%, rgba(5, 7, 12, 0.85) 25%, rgba(5, 7, 12, 0.3) 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
