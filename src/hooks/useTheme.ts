import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

/**
 * Custom hook to access the theme context
 * @returns Theme context values and methods
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};