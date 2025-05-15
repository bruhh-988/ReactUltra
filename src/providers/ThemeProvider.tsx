import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

type ThemeType = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('system');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [nextTheme, setNextTheme] = useState<ThemeType>('system');
  const [themeValue, setThemeValue] = useState<ThemeType>('system');
  
  // Initialize theme based on system preference or saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const themeValue = savedTheme as ThemeType;
      setTheme(themeValue);
      setNextTheme(themeValue);
    }
  }, []);
  
  // Update dark mode state based on media query and theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        setIsDarkMode(mediaQuery.matches);
      } else {
        setIsDarkMode(theme === 'dark');
      }
    };
    
    handleChange(); // Set initial value
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setNextTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Custom theme setter with localStorage persistence
  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setNextTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const value = {
    theme,
    setTheme: handleSetTheme,
    toggleTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <NextThemeProvider attribute="class" value={{ light: 'light', dark: 'dark' }} defaultTheme={nextTheme}>
        {children}
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
};