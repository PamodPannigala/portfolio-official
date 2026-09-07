import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseHeroParallaxOptions {
  portraitRef: React.RefObject<HTMLElement | null>;
  haloRef: React.RefObject<HTMLElement | null>;
  editorialRef: React.RefObject<HTMLElement | null>;
  sectionRef: React.RefObject<HTMLElement | null>;
}

/**
 * Premium 2.5D layered optical depth motion system.
 * - Portrait: subtle ±10–14px translation and ±1.5–2 deg rotation
 * - DATA / SCIENCE: moves in OPPOSITE direction (±4–7px) on separate transform layer
 * - Halo: moves independently behind portrait with less movement (±4–6px)
 * - Restrained, slow luxury damping (no fast snapping)
 * - Returns smoothly to neutral when pointer leaves
 * - Subtle scroll interaction (max 1.015 scale, max 10px upward)
 * - Zero React state updates in render loop
 */
export function useHeroParallax({
  portraitRef,
  haloRef,
  editorialRef,
  sectionRef,
}: UseHeroParallaxOptions): void {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafIdRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isMobile) {
      if (portraitRef.current) portraitRef.current.style.transform = '';
      if (haloRef.current) haloRef.current.style.transform = '';
      if (editorialRef.current) editorialRef.current.style.transform = '';
      return;
    }

    // Normalized targets (-1 to 1)
    const targets = { x: 0, y: 0, scrollY: window.scrollY };
    const currents = { x: 0, y: 0, scrollY: window.scrollY };

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize pointer coordinates to center of viewport [-1, 1]
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targets.x = Math.max(-1, Math.min(1, nx));
      targets.y = Math.max(-1, Math.min(1, ny));
    };

    const handleReset = () => {
      // Smoothly ease all layers back to neutral rest position
      targets.x = 0;
      targets.y = 0;
    };

    const handleScroll = () => {
      targets.scrollY = window.scrollY;
    };

    // Pause animation when hero section is not visible
    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(sectionRef.current);
    }

    // Heavy, luxurious calm damping: motion follows pointer slowly and smoothly
    const lerpSpeed = 0.042;
    const scrollLerpSpeed = 0.055;

    const tick = () => {
      if (isVisibleRef.current) {
        currents.x += (targets.x - currents.x) * lerpSpeed;
        currents.y += (targets.y - currents.y) * lerpSpeed;
        currents.scrollY += (targets.scrollY - currents.scrollY) * scrollLerpSpeed;

        // 1. Portrait Layer:
        // - Horizontal translation: approx ±10–14px (12px)
        // - Vertical translation: approx ±5–8px (6.5px)
        // - rotateY: approx ±1.5–2 deg (1.8 deg, max 1.95 deg)
        // - rotateX: approx ±1 deg (1.0 deg, max 1.0 deg)
        // - Scroll: scale max 1.00 -> 1.015, upward movement max 8–12px (10px)
        if (portraitRef.current) {
          const posX = (currents.x * 12.0).toFixed(2);
          const scrollUpward = Math.min(currents.scrollY * 0.025, 10.0);
          const posY = ((currents.y * 6.5) - scrollUpward).toFixed(2);

          const rotY = Math.max(-1.95, Math.min(1.95, currents.x * 1.8)).toFixed(2);
          const rotX = Math.max(-1.0, Math.min(1.0, -(currents.y * 1.0))).toFixed(2);
          const scale = (1 + Math.min(currents.scrollY * 0.00003, 0.015)).toFixed(4);

          portraitRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;
        }

        // 2. Halo Layer:
        // - Moves independently behind portrait with LESS movement: approx ±4–6px (5.0px)
        if (haloRef.current) {
          const haloX = (currents.x * 5.0).toFixed(2);
          const haloScrollUpward = Math.min(currents.scrollY * 0.012, 5.0);
          const haloY = ((currents.y * 3.5) - haloScrollUpward).toFixed(2);

          haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
        }

        // 3. DATA / SCIENCE Typography Layer:
        // - Separate transform layer, does NOT move with portrait
        // - Moves gently in OPPOSITE direction: approx ±4–7px (-5.5px horizontal, -3.5px vertical)
        // - Zero rotation
        if (editorialRef.current) {
          const textX = (-(currents.x * 5.5)).toFixed(2);
          const textScrollUpward = Math.min(currents.scrollY * 0.018, 7.0);
          const textY = (-(currents.y * 3.5) - textScrollUpward).toFixed(2);

          editorialRef.current.style.transform = `translate3d(${textX}px, ${textY}px, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleReset);
    if (sectionRef.current) {
      sectionRef.current.addEventListener('pointerleave', handleReset);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleReset);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('pointerleave', handleReset);
      }
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, [prefersReducedMotion, portraitRef, haloRef, editorialRef, sectionRef]);
}
