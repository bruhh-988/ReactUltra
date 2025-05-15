// src/types/theme.types.ts
export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
}

export interface ThemePreset {
  name: string;
  type: ThemeType;
  config: ThemeConfig;
}