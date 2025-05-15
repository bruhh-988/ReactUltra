// src/types/i18n.types.ts
export interface Language {
  code: string;
  name: string;
  flag?: string;
  rtl?: boolean;
}

export interface TranslationEntry {
  key: string;
  defaultValue: string;
  description?: string;
}

export interface TranslationNamespace {
  name: string;
  translations: TranslationEntry[];
}