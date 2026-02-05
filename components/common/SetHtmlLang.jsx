'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const localeToHtmlLang = {
  ru: 'ru',
  en: 'en',
  uz: 'uz',
  tr: 'tr',
};

export default function SetHtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const segment = pathname?.split('/')[1]?.toLowerCase();
    const lang = localeToHtmlLang[segment] || 'ru';
    document.documentElement.lang = lang;
  }, [pathname]);
  return null;
}
