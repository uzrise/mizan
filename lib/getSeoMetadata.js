import ru from '@/translations/ru.json';
import en from '@/translations/en.json';
import uz from '@/translations/uz.json';
import tr from '@/translations/tr.json';

const translationsByLocale = {
  ru,
  en,
  uz,
  tr,
};

const defaultLocale = 'ru';

/**
 * Get SEO metadata for a locale (ru, en, uz, tr).
 * Used in generateMetadata in app/[locale]/layout.js
 */
export function getSeoMetadata(locale) {
  const normalized = (locale || defaultLocale).toLowerCase();
  const t = translationsByLocale[normalized] || translationsByLocale[defaultLocale];
  const seo = t?.seo;

  if (!seo) {
    return {
      title: 'Mizan Architecture',
      description: 'Mizan Architecture - innovative architecture and design.',
      keywords: 'architecture, design, Mizan Architecture',
    };
  }

  return {
    title: seo.title || 'Mizan Architecture',
    description: seo.description || '',
    keywords: seo.keywords || 'architecture, design, Mizan Architecture',
  };
}

export const supportedLocales = ['ru', 'en', 'uz', 'tr'];
