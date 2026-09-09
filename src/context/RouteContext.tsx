import React, { createContext, useContext } from 'react';
import { useRoute, RouteState } from '../hooks/useRoute';

const RouteContext = createContext<RouteState | null>(null);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const routeState = useRoute();
  return <RouteContext.Provider value={routeState}>{children}</RouteContext.Provider>;
};

export const useAppRoute = (): RouteState => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useAppRoute must be used within a RouteProvider');
  }
  return context;
};
