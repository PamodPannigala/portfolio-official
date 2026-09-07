import { useState, useEffect } from 'react';

/**
 * Custom hook that tracks whether the window scroll Y position has exceeded a given threshold.
 * Only updates state when crossing the threshold boundary to prevent re-renders during continuous scroll.
 */
export function useScrollPosition(threshold: number = 20): boolean {
  const [isScrolled, setIsScrolled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.scrollY > threshold;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrolled = window.scrollY > threshold;
          setIsScrolled((prev) => (prev !== currentScrolled ? currentScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
