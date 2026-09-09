import { forwardRef } from 'react';

export const EditorialBackgroundText = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute right-4 lg:right-16 bottom-8 sm:bottom-12 lg:top-[46%] lg:bottom-auto lg:-translate-y-1/2 z-0 pointer-events-none select-none overflow-hidden w-full lg:w-[62%] text-right pr-4 lg:pr-14 opacity-[0.05] sm:opacity-[0.08] lg:opacity-[0.13] will-change-transform"
      aria-hidden="true"
    >
      <div className="flex flex-col items-end leading-[0.82] space-y-[-1vw]">
        <span className="font-display font-black text-[17vw] sm:text-[14vw] lg:text-[12.5vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-accent-cyan via-white to-transparent block uppercase">
          DATA
        </span>
        <span className="font-display font-black text-[17vw] sm:text-[14vw] lg:text-[12.5vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-accent-blue via-sky-100 to-transparent block uppercase">
          SCIENCE
        </span>
      </div>
    </div>
  );
});

EditorialBackgroundText.displayName = 'EditorialBackgroundText';
