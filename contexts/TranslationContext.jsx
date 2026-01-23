'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getTranslation, safeTranslate as safeTranslateUtil } from '@/translations';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  // Default to RU on both server and first client render to avoid hydration mismatch.
  const [language, setLanguage] = useState('RU');

  // After mount, sync with any saved preference.
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['RU', 'EN', 'UZ', 'TR'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

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
    <TranslationContext.Provider value={{ language, changeLanguage, t, safeTranslate }}>
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

