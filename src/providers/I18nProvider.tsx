import React, { createContext, useEffect, useState, ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define the language interface
interface Language {
  code: string;
  name: string;
  flag?: string;
}

// Define the context interface
interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  languages: Language[];
  t: (key: string, defaultValue?: string) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);

// Available languages
const availableLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// Mock translations for demo purposes
const mockTranslations = {
  en: {
    translation: {
      'common.loading': 'Loading...',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.saving': 'Saving...',
      'common.close': 'Close',
      'common.search': 'Search',
      'common.more': 'More',
      'common.viewAll': 'View All',
      'common.updatePassword': 'Update Password',
      'common.updating': 'Updating...',
      'common.saveChanges': 'Save Changes',
      
      // Auth
      'auth.login': 'Login',
      'auth.loginTitle': 'Sign in to your account',
      'auth.loginDescription': 'Enter your credentials below to access your account',
      'auth.loginSubtitle': 'Enterprise-grade React Admin Template',
      'auth.register': 'Register',
      'auth.registerTitle': 'Create an account',
      'auth.registerDescription': 'Fill in your details to create your account',
      'auth.registerSubtitle': 'Start your journey with ReactUltra',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.forgotPasswordTitle': 'Forgot your password?',
      'auth.forgotPasswordDescription': 'Enter your email and we\'ll send you a link to reset your password',
      'auth.forgotPasswordSubtitle': 'Password reset instructions',
      'auth.resetLinkSent': 'Reset link sent!',
      'auth.checkEmailForInstructions': 'Please check your email for password reset instructions.',
      'auth.sendResetLink': 'Send Reset Link',
      'auth.backToLogin': 'Back to Login',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.username': 'Username',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
      'auth.rememberMe': 'Remember me',
      'auth.noAccount': 'Don\'t have an account?',
      'auth.registerNow': 'Register now',
      'auth.alreadyHaveAccount': 'Already have an account?',
      'auth.loginHere': 'Login here',
      'auth.passwordsDoNotMatch': 'Passwords do not match',
      'auth.passwordTooShort': 'Password must be at least 8 characters',
      'auth.invalidEmail': 'Please enter a valid email address',
      
      // NotFound
      'notFound.title': 'Page Not Found',
      'notFound.description': 'Sorry, the page you are looking for doesn\'t exist or has been moved.',
      'notFound.goBack': 'Go Back',
      'notFound.goHome': 'Go to Home',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.subtitle': 'Welcome to ReactUltra admin dashboard',
      'dashboard.totalusers': 'Total Users',
      'dashboard.sales': 'Sales',
      'dashboard.revenue': 'Revenue',
      'dashboard.activesessions': 'Active Sessions',
      'dashboard.revenueOverTime': 'Revenue Over Time',
      'dashboard.revenueDescription': 'Monthly revenue for the current year',
      'dashboard.trafficSources': 'Traffic Sources',
      'dashboard.trafficDescription': 'User acquisition channels',
      'dashboard.chartPlaceholder': 'Chart visualization here',
      'dashboard.recentActivity': 'Recent Activity',
      'dashboard.activityPlaceholder': 'Activity feed will be displayed here',
      
      // Profile
      'profile.title': 'My Profile',
      'profile.description': 'Manage your account settings and preferences',
      'profile.memberSince': 'Member since',
      'profile.changeAvatar': 'Change avatar',
      'profile.generalTab': 'General',
      'profile.securityTab': 'Security',
      'profile.personalInfo': 'Personal Information',
      'profile.updatePersonalInfo': 'Update your personal details',
      'profile.firstName': 'First Name',
      'profile.lastName': 'Last Name',
      'profile.email': 'Email Address',
      'profile.emailChangeNote': 'To change your email, please contact support',
      'profile.username': 'Username',
      'profile.changePassword': 'Change Password',
      'profile.updatePassword': 'Update your password',
      'profile.currentPassword': 'Current Password',
      'profile.newPassword': 'New Password',
      'profile.confirmPassword': 'Confirm New Password',
      'profile.updateSuccess': 'Profile updated successfully',
      'profile.passwordUpdateSuccess': 'Password updated successfully',
      
      // Settings
      'settings.title': 'Settings',
      'settings.description': 'Configure your application preferences',
      'settings.appearance': 'Appearance',
      'settings.language': 'Language',
      'settings.notifications': 'Notifications',
      'settings.privacy': 'Privacy',
      'settings.themeSettings': 'Theme Settings',
      'settings.themeDescription': 'Customize the look and feel of the application',
      'settings.themeMode': 'Theme Mode',
      'settings.lightMode': 'Light',
      'settings.darkMode': 'Dark',
      'settings.systemMode': 'System',
      'settings.sidebarPosition': 'Sidebar Position',
      'settings.leftPosition': 'Left',
      'settings.rightPosition': 'Right',
      'settings.compactMode': 'Compact Mode',
      'settings.compactModeDescription': 'Reduce spacing between elements for a more compact view',
      'settings.animations': 'Animations',
      'settings.animationsDescription': 'Enable or disable UI animations throughout the application',
      'settings.reduceMotion': 'Reduce Motion',
      'settings.reduceMotionDescription': 'Minimize animations for accessibility',
      'settings.languageSettings': 'Language Settings',
      'settings.languageDescription': 'Choose your preferred language and regional settings',
      'settings.selectLanguage': 'Select Language',
      'settings.dateFormat': 'Date Format',
      'settings.timeFormat': 'Time Format',
      'settings.selectFormat': 'Select format',
      'settings.notificationPreferences': 'Notification Preferences',
      'settings.notificationDescription': 'Manage how you receive notifications',
      'settings.pushNotifications': 'Push Notifications',
      'settings.pushDescription': 'Receive notifications when the application is in the background',
      'settings.emailNotifications': 'Email Notifications',
      'settings.emailNotificationsDescription': 'Receive notifications to your email address',
      'settings.notificationTypes': 'Notification Types',
      'settings.updateNotifications': 'System Updates',
      'settings.marketingEmails': 'Marketing Emails',
      'settings.privacySettings': 'Privacy & Data',
      'settings.privacyDescription': 'Manage your data and privacy preferences',
      'settings.analytics': 'Usage Analytics',
      'settings.analyticsDescription': 'Help improve the app by sharing anonymous usage data',
      'settings.cookies': 'Cookie Preferences',
      'settings.cookiesDescription': 'Manage how cookies are used to store your preferences',
      'settings.manageCookies': 'Manage Cookies',
      'settings.dataExport': 'Export Your Data',
      'settings.dataExportDescription': 'Download a copy of your data in a portable format',
      'settings.requestData': 'Request Data',
      'settings.accountDeletion': 'Account Deletion',
      'settings.accountDeletionDescription': 'Permanently delete your account and all your data',
      'settings.deleteAccount': 'Delete Account',
      'settings.appearanceSaved': 'Appearance settings saved successfully',
      'settings.languageSaved': 'Language settings saved successfully',
      'settings.notificationsSaved': 'Notification preferences saved successfully',
      'settings.privacySaved': 'Privacy settings saved successfully',
    }
  }
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || navigator.language.split('-')[0] || 'en';
  });

  // Initialize i18next
  useEffect(() => {
    const initializeI18n = async () => {
      await i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources: mockTranslations,
          fallbackLng: 'en',
          debug: false,
          interpolation: {
            escapeValue: false,
          },
          detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
          },
          react: {
            useSuspense: true,
          },
        });

      i18n.changeLanguage(language);
    };

    initializeI18n();
  }, [language]);

  // Change language function
  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  // Translation helper that provides fallbacks
  const translate = (key: string, defaultValue?: string): string => {
    const translation = i18n.exists(key) ? i18n.t(key) : defaultValue || key;
    return translation;
  };

  const value = {
    language,
    setLanguage,
    languages: availableLanguages,
    t: translate,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};