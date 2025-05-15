// src/stores/i18nStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ApiService } from '@/services/ApiService';
import { StorageService } from '@/services/StorageService';
import { LoggerService } from '@/services/LoggerService';
import { Language } from '@/types/i18n.types';

interface I18nState {
  language: string;
  languages: Language[];
  translations: Record<string, string>;
  loading: boolean;
  error: string | null;
  setLanguage: (language: string) => void;
  loadTranslations: (language: string) => Promise<void>;
  t: (key: string, options?: Record<string, any>) => string;
}

export const useI18nStore = create<I18nState>()(
  devtools(
    persist(
      (set, get) => ({
        language: 'en',
        languages: [
          { code: 'en', name: 'English' },
          { code: 'es', name: 'Español' },
          { code: 'fr', name: 'Français' },
          { code: 'de', name: 'Deutsch' },
          { code: 'zh', name: '中文' },
        ],
        translations: {},
        loading: false,
        error: null,

        setLanguage: (language: string) => {
          set({ language });
          StorageService.set('language', language);
          get().loadTranslations(language);
        },

        loadTranslations: async (language: string) => {
          set({ loading: true, error: null });

          try {
            // In a real app, this would load from your API or static files
            const response = await ApiService.get<Record<string, string>>(
              `/translations/${language}.json`
            );

            set({
              translations: response.data,
              loading: false,
              error: null,
            });

            LoggerService.info(`Loaded translations for language: ${language}`);
          } catch (error: any) {
            LoggerService.error(`Failed to load translations for language: ${language}`, error);
            
            // Fallback to embedded basic translations
            const basicTranslations: Record<string, Record<string, string>> = {
              en: {
                'common.welcome': 'Welcome',
                'common.login': 'Login',
                'common.logout': 'Logout',
                'common.register': 'Register',
                'common.save': 'Save',
                'common.cancel': 'Cancel',
                'common.error': 'An error occurred',
              },
              es: {
                'common.welcome': 'Bienvenido',
                'common.login': 'Iniciar sesión',
                'common.logout': 'Cerrar sesión',
                'common.register': 'Registrarse',
                'common.save': 'Guardar',
                'common.cancel': 'Cancelar',
                'common.error': 'Ocurrió un error',
              },
            };
            
            set({
              translations: basicTranslations[language] || basicTranslations['en'],
              loading: false,
              error: 'Failed to load translations from server, using fallback',
            });
          }
        },

        t: (key: string, options?: Record<string, any>): string => {
          const translations = get().translations;
          const value = translations[key] || key;

          if (options) {
            return Object.entries(options).reduce((acc, [k, v]) => {
              return acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
            }, value);
          }

          return value;
        },
      }),
      {
        name: 'i18n-storage',
        partialize: (state) => ({ language: state.language }),
      }
    )
  )
);