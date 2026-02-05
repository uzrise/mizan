'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getTranslation, safeTranslate as safeTranslateUtil } from '@/translations';

const TranslationContext = createContext();

const localeToLanguage = { ru: 'RU', en: 'EN', uz: 'UZ', tr: 'TR' };
const languageToLocale = { RU: 'ru', EN: 'en', UZ: 'uz', TR: 'tr' };

export function TranslationProvider({ children, initialLocale = 'ru' }) {
  const pathname = usePathname();
  const langFromUrl = pathname?.split('/')[1]?.toLowerCase();
  const initialLang = localeToLanguage[initialLocale] || localeToLanguage[langFromUrl] || 'RU';
  const [language, setLanguage] = useState(initialLang);
  const hasHydrated = useRef(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const locale = langFromUrl && ['ru', 'en', 'uz', 'tr'].includes(langFromUrl) ? langFromUrl : initialLocale;
      const lang = localeToLanguage[locale] || 'RU';
      queueMicrotask(() => setLanguage(lang));
    }
  }, [pathname, initialLocale, langFromUrl]);

  useEffect(() => {
    if (!hasHydrated.current && typeof window !== 'undefined') {
      hasHydrated.current = true;
      const savedLang = localStorage.getItem('language');
      if (savedLang && ['RU', 'EN', 'UZ', 'TR'].includes(savedLang)) {
        const currentLocale = pathname?.split('/')[1]?.toLowerCase();
        if (!currentLocale || !['ru', 'en', 'uz', 'tr'].includes(currentLocale)) {
          queueMicrotask(() => setLanguage(savedLang));
        }
      }
    }
  }, [pathname]);

  const locale = languageToLocale[language] || 'ru';

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key) => {
    return getTranslation(language, key);
  };

  const safeTranslate = (key) => {
    return safeTranslateUtil(language, key);
  };

  return (
    <TranslationContext.Provider value={{ language, locale, changeLanguage, t, safeTranslate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}

