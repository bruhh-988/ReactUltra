import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ThemeType } from '@/types/theme.types';
import { StorageService } from '@/services/StorageService';

interface ThemeState {
  currentTheme: ThemeType;
  systemTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  detectSystemTheme: () => ThemeType;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        currentTheme: 'system',
        systemTheme: 'light',

        setTheme: (theme: ThemeType) => {
          set({ currentTheme: theme });
          StorageService.set('theme', theme);

          // Apply theme to document
          if (theme === 'system') {
            const systemTheme = get().detectSystemTheme();
            document.documentElement.classList.toggle('dark', systemTheme === 'dark');
          } else {
            document.documentElement.classList.toggle('dark', theme === 'dark');
          }
        },

        toggleTheme: () => {
          const { currentTheme, detectSystemTheme } = get();
          
          if (currentTheme === 'light') {
            get().setTheme('dark');
          } else if (currentTheme === 'dark') {
            get().setTheme('light');
          } else {
            // If system, toggle based on system preference
            const systemTheme = detectSystemTheme();
            get().setTheme(systemTheme === 'dark' ? 'light' : 'dark');
          }
        },

        detectSystemTheme: (): ThemeType => {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const systemTheme = isDark ? 'dark' : 'light';
          set({ systemTheme });
          return systemTheme;
        }
      }),
      {
        name: 'theme-storage',
      }
    )
  )
);