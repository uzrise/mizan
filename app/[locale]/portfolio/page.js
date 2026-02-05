import Portfolio from '@/components/sections/Portfolio';
import { getAllProjectsForPortfolio } from '@/lib/strapi';
import { getSeoMetadata, supportedLocales } from '@/lib/getSeoMetadata';

export const revalidate = 60;

const localeToLang = { ru: 'RU', en: 'EN', uz: 'UZ', tr: 'TR' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const normalized = (locale || 'ru').toLowerCase();
  if (!supportedLocales.includes(normalized)) return { title: 'Portfolio - Mizan Architecture' };
  const seo = getSeoMetadata(normalized);
  return {
    title: `Portfolio - Mizan Architecture`,
    description: seo.description,
  };
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params;
  const lang = localeToLang[locale?.toLowerCase()] || 'RU';
  const initialProjects = await getAllProjectsForPortfolio(lang);

  return (
    <main className="min-h-screen bg-white">
      <Portfolio initialProjects={initialProjects} />
    </main>
  );
}
