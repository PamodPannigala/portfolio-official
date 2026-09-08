import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { StageVisual } from './StageVisual';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DataFlowStoryProps {
  className?: string;
}

export const DataFlowStory: React.FC<DataFlowStoryProps> = ({ className = '' }) => {
  const { dataFlowStages } = PORTFOLIO_DATA.about;
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Active stage index (0 to 4: DATA, PATTERN, MODEL, INSIGHT, DECISION)
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [revealedThrough, setRevealedThrough] = useState<number>(0);
  const [isCrossFading, setIsCrossFading] = useState<boolean>(false);

  // Scroll-based progressive reveal timeline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) {
      setRevealedThrough(4);
      setActiveStageIndex(0);
      if (activeLineRef.current) {
        gsap.set(activeLineRef.current, { scaleX: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const line = activeLineRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Continuous line draws gently left-to-right
      if (line) {
        gsap.set(line, { transformOrigin: 'left center', scaleX: 0 });
        tl.to(line, {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
        });
      }

      // Progressively illuminate stages
      [0, 1, 2, 3, 4].forEach((idx) => {
        tl.call(
          () => {
            setRevealedThrough(idx);
          },
          undefined,
          idx * 0.24 + 0.1
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Handle stage selection with subtle fast cross-fade
  const handleSelectStage = useCallback(
    (index: number) => {
      if (index === activeStageIndex) return;
      setIsCrossFading(true);
      setTimeout(() => {
        setActiveStageIndex(index);
        setIsCrossFading(false);
      }, 90);
    },
    [activeStageIndex]
  );

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % dataFlowStages.length;
      handleSelectStage(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + dataFlowStages.length) % dataFlowStages.length;
      handleSelectStage(prevIndex);
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleSelectStage(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      handleSelectStage(dataFlowStages.length - 1);
    }
  };

  const selectedStage = dataFlowStages[activeStageIndex] || dataFlowStages[0];

  return (
    <div
      ref={containerRef}
      data-flow-container
      className={`relative w-full select-none ${className}`}
      aria-label="Interactive Analytical Progression"
    >
      {/* Subtle single ambient background lighting */}
      <div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent-cyan/[0.025] rounded-full blur-[110px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header bar: Clean editorial header */}
      <div className="flex items-center justify-between pb-3 mb-5 sm:mb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          <span className="font-display text-xs sm:text-sm font-semibold tracking-wider text-text-primary uppercase">
            Analytical Progression
          </span>
          <span className="text-white/25 font-sans text-xs hidden sm:inline">&bull;</span>
          <span className="font-sans text-xs text-text-secondary/85 tracking-wide hidden sm:inline">
            Interactive Visual Story
          </span>
        </div>
        <span className="font-mono text-xs text-text-secondary/75 tracking-widest uppercase">
          05 STAGES
        </span>
      </div>

      {/* =========================================================================
          DESKTOP & TABLET: HORIZONTAL FIVE-STAGE PROGRESSION (sm and above)
          DATA → PATTERN → MODEL → INSIGHT → DECISION
          ========================================================================= */}
      <div className="hidden sm:block relative" role="tablist" aria-label="Progression Stages">
        {/* Continuous Progression Line */}
        <div className="relative mb-4 sm:mb-5">
          {/* Static track line */}
          <div
            className="absolute top-2.5 left-6 right-6 h-[1px] bg-white/[0.08]"
            aria-hidden="true"
          />
          {/* Initial draw progression line (ScrollTrigger) */}
          <div
            ref={activeLineRef}
            className="absolute top-2.5 left-6 right-6 h-[1px] bg-gradient-to-r from-accent-cyan/40 via-accent-cyan/70 to-accent-cyan/90"
            aria-hidden="true"
          />
          {/* Active stage highlighted line segment */}
          <div
            className="absolute top-2.5 h-[1.5px] bg-accent-cyan transition-all duration-300 ease-out shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            style={{
              left: '1.5rem',
              width: `${(activeStageIndex / 4) * 100}%`,
              maxWidth: 'calc(100% - 3rem)',
            }}
            aria-hidden="true"
          />

          {/* 5 Aligned Stage Columns */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 xl:gap-4 w-full relative z-10">
            {dataFlowStages.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              const isRevealed = revealedThrough >= idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`stage-tab-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`stage-panel-${stage.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelectStage(idx)}
                  onMouseEnter={() => handleSelectStage(idx)}
                  onFocus={() => handleSelectStage(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="group relative flex flex-col text-left outline-none transition-all duration-200 cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan/60 rounded p-1 -m-1"
                >
                  {/* Top Node on the Line */}
                  <div className="relative flex items-center mb-2.5 sm:mb-3">
                    <div
                      className={`relative flex items-center justify-center w-5 h-5 rounded-full bg-deep-space border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-cyan ring-4 ring-accent-cyan/25 shadow-[0_0_12px_rgba(56,189,248,0.5)] scale-110'
                          : isRevealed
                          ? 'border-accent-cyan/60 group-hover:border-accent-cyan/90'
                          : 'border-white/25 group-hover:border-white/50'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-accent-cyan scale-125'
                            : isRevealed
                            ? 'bg-accent-cyan/80'
                            : 'bg-white/40'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Standardized Typography */}
                  <div
                    className={`transition-transform duration-200 ${
                      isSelected ? '-translate-y-0.5' : 'translate-y-0'
                    }`}
                  >
                    {/* Index */}
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`font-mono text-[11px] transition-colors duration-200 ${
                          isSelected
                            ? 'text-accent-cyan font-semibold'
                            : 'text-text-secondary/70 group-hover:text-text-secondary'
                        }`}
                      >
                        {stage.step}
                      </span>
                    </div>

                    {/* Stage Name */}
                    <h3
                      className={`font-display text-sm sm:text-[15px] xl:text-base font-bold tracking-tight transition-colors duration-200 ${
                        isSelected
                          ? 'text-white'
                          : 'text-text-primary/80 group-hover:text-white'
                      }`}
                    >
                      {stage.name}
                    </h3>

                    {/* Short Role / Descriptor */}
                    <div
                      className={`font-sans text-[10.5px] sm:text-[11px] xl:text-xs font-medium leading-tight mt-0.5 transition-colors duration-200 line-clamp-2 ${
                        isSelected
                          ? 'text-accent-cyan/90'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {stage.role}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            DESKTOP / TABLET: UNIFIED FULL-WIDTH INTERACTIVE VISUAL AREA
            Replaces text detail paragraph with full-width payoff canvas
            ========================================================================= */}
        <div className="mt-5 sm:mt-6 w-full">
          {/* Minimal, concise active-stage label above visual area */}
          <div className="flex items-center justify-between pb-2 mb-2 px-1">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="font-mono text-xs sm:text-[13px] font-semibold text-accent-cyan tracking-wider">
                {selectedStage.step} / {selectedStage.name}
              </span>
              <span className="text-white/25 font-mono text-xs">&bull;</span>
              <span className="font-sans text-xs text-text-secondary/95">
                {selectedStage.role}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80 animate-pulse" />
              <span className="font-mono text-[10px] text-text-secondary/65 tracking-wider">
                {selectedStage.coord}
              </span>
            </div>
          </div>

          {/* Dedicated Full-Width Visual Canvas */}
          <div
            id={`stage-panel-${selectedStage.id}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${selectedStage.id}`}
            className="w-full"
          >
            <StageVisual
              stageIndex={activeStageIndex}
              isCrossFading={isCrossFading}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE: VERTICAL INTERACTIVE PROGRESSION (< 640px)
          Active stage visual appears directly beneath the selected stage
          ========================================================================= */}
      <div
        className="block sm:hidden relative py-1"
        role="tablist"
        aria-label="Progression Stages Mobile"
      >
        <div className="flex flex-col gap-2 relative z-10">
          {dataFlowStages.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;

            return (
              <div key={stage.id} className="flex flex-col">
                <button
                  type="button"
                  role="tab"
                  id={`stage-tab-mob-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`stage-panel-mob-${stage.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelectStage(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group flex items-center justify-between text-left outline-none cursor-pointer py-2.5 px-3 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'border-accent-cyan/50 bg-accent-cyan/[0.06] ring-1 ring-accent-cyan/20'
                      : 'border-white/[0.07] bg-white/[0.015] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-accent-cyan ring-2 ring-accent-cyan/25'
                          : 'border-white/25'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-accent-cyan' : 'bg-white/40'
                        }`}
                      />
                    </div>
                    <span
                      className={`font-mono text-xs ${
                        isSelected ? 'text-accent-cyan font-semibold' : 'text-text-secondary/70'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={`font-display text-sm font-bold tracking-tight ${
                        isSelected ? 'text-white' : 'text-text-primary/80'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>

                  <span
                    className={`font-sans text-[11px] truncate max-w-[140px] ${
                      isSelected ? 'text-accent-cyan/90 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {stage.role}
                  </span>
                </button>

                {/* On mobile: Active visual expands directly beneath the selected stage */}
                {isSelected && (
                  <div
                    id={`stage-panel-mob-${stage.id}`}
                    role="tabpanel"
                    aria-labelledby={`stage-tab-mob-${stage.id}`}
                    className="mt-2 mb-2 w-full transition-all duration-300"
                  >
                    <StageVisual
                      stageIndex={idx}
                      isCrossFading={isCrossFading}
                      compact={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
