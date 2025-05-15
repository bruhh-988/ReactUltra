import { useContext } from 'react';
import { I18nContext } from '../providers/I18nProvider';
import { useTranslation as useReactI18nTranslation } from 'react-i18next';

/**
 * Custom hook to access the internationalization context
 * @returns I18n context values and methods
 */
export const useTranslation = () => {
  const context = useContext(I18nContext);
  
  if (context === null) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  
  // Also initialize the react-i18next hook to make sure translations are loaded
  useReactI18nTranslation();
  
  return context;
};