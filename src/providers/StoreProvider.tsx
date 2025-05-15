import React, { ReactNode } from 'react';
// This is primarily a wrapper for potential future state management setup
// For now, it serves as a wrapper for Zustand stores

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  // Zustand doesn't require a provider wrapper like Context or Redux
  // This component exists for architectural consistency and potential future extensions
  return <>{children}</>;
};