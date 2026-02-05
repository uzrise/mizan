import { notFound } from 'next/navigation';
import { getSeoMetadata, supportedLocales } from '@/lib/getSeoMetadata';
import { TranslationProvider } from '@/contexts/TranslationContext';
import ScrollSmootherWrapper from '@/components/layout/ScrollSmootherWrapper';
import IntroAnimation from '@/components/common/IntroAnimation';
import SetHtmlLang from '@/components/common/SetHtmlLang';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const rawSiteUrl = 'https://mizanarchitect.uz';
const siteUrl = rawSiteUrl
  ? rawSiteUrl.startsWith('http')
    ? rawSiteUrl
    : `https://${rawSiteUrl}`
  : 'http://localhost:3000';

const ogLocaleMap = {
  ru: 'ru_RU',
  en: 'en_US',
  uz: 'uz_UZ',
  tr: 'tr_TR',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const normalized = (locale || 'ru').toLowerCase();
  if (!supportedLocales.includes(normalized)) {
    return { title: 'Mizan Architecture' };
  }
  const seo = getSeoMetadata(normalized);
  const ogLocale = ogLocaleMap[normalized] || 'ru_RU';
  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: siteUrl,
      siteName: 'Mizan Architecture',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: '/IMG_7634.png',
          width: 1200,
          height: 630,
          alt: 'Mizan Architecture',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/IMG_7634.png'],
    },
  };
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const normalized = (locale || 'ru').toLowerCase();
  if (!supportedLocales.includes(normalized)) {
    notFound();
  }
  return (
    <TranslationProvider initialLocale={normalized}>
      <SetHtmlLang />
      <IntroAnimation />
      <Navbar />
      <ScrollSmootherWrapper>
        {children}
        <Footer />
      </ScrollSmootherWrapper>
    </TranslationProvider>
  );
}
