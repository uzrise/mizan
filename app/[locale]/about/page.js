import About from '@/components/sections/About';
import { getSeoMetadata, supportedLocales } from '@/lib/getSeoMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const normalized = (locale || 'ru').toLowerCase();
  if (!supportedLocales.includes(normalized)) return { title: 'About - Mizan Architecture' };
  const seo = getSeoMetadata(normalized);
  return {
    title: `About - Mizan Architecture`,
    description: seo.description,
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <About />
    </main>
  );
}
