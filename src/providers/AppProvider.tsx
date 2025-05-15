import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from './I18nProvider';
import { AuthProvider } from './AuthProvider';
import { RouterProvider } from './RouterProvider';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider is the root provider that combines all context providers
 * in the application. It ensures proper ordering of providers where dependencies exist.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </RouterProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};