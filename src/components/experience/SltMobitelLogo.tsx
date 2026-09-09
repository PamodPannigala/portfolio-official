import React from 'react';

interface SltMobitelLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const SltMobitelLogo: React.FC<SltMobitelLogoProps> = ({
  className = '',
  variant = 'full',
}) => {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 48 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className || 'h-6 w-auto'}
        aria-label="SLT-MOBITEL Brand Mark"
      >
        {/* Top-Left Angled Cyan Pill */}
        <line
          x1="22"
          y1="8"
          x2="10"
          y2="28"
          stroke="#00a2e8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Bottom-Left Angled Royal Blue Pill */}
        <line
          x1="10"
          y1="34"
          x2="4"
          y2="44"
          stroke="#0054a6"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Center Green Dot */}
        <circle cx="24" cy="34" r="3.4" fill="#7ac142" />
        {/* Right Angled Vibrant Green Pill */}
        <line
          x1="38"
          y1="28"
          x2="28"
          y2="44"
          stroke="#43b02a"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`} aria-label="SLT-MOBITEL">
      {/* Authentic SLT-MOBITEL Icon Mark (Increased 12-15% scale) */}
      <svg
        viewBox="0 0 48 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 sm:h-[30px] w-auto flex-shrink-0"
        aria-hidden="true"
      >
        <line
          x1="22"
          y1="8"
          x2="10"
          y2="28"
          stroke="#00a2e8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="34"
          x2="4"
          y2="44"
          stroke="#0054a6"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="24" cy="34" r="3.4" fill="#7ac142" />
        <line
          x1="38"
          y1="28"
          x2="28"
          y2="44"
          stroke="#43b02a"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {/* Typographic Identity (Crisp, High-Legibility SLT MOBITEL without unreadable micro-text) */}
      <div className="flex items-baseline font-display font-extrabold text-[17px] sm:text-[19px] tracking-tight leading-none select-none">
        <span className="text-[#0054a6]">SLT</span>
        <span className="text-[#43b02a]">MOBITEL</span>
      </div>
    </div>
  );
};
