import { useState, useEffect, useCallback } from 'react';

export type AppRoute = '/' | '/projects';

export interface RouteState {
  currentPath: string;
  isProjectsArchive: boolean;
  navigate: (to: string) => void;
}

export const useRoute = (): RouteState => {
  const getPath = (): string => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/projects' || window.location.hash === '#/projects') {
      return '/projects';
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;

    // Handle hash links when targeting homepage from archive
    if (to.startsWith('/#') || (to.startsWith('#') && currentPath === '/projects')) {
      const targetHash = to.startsWith('/#') ? to.slice(1) : to;
      window.history.pushState({}, '', '/' + targetHash);
      setCurrentPath('/');
      setTimeout(() => {
        const id = targetHash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    if (to === '/projects') {
      window.history.pushState({}, '', '/projects');
      setCurrentPath('/projects');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (to === '/' || to === '') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Default pushState
    window.history.pushState({}, '', to);
    setCurrentPath(getPath());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  return {
    currentPath,
    isProjectsArchive: currentPath === '/projects',
    navigate,
  };
};
