import Contact from '@/components/sections/Contact';
import { getSeoMetadata, supportedLocales } from '@/lib/getSeoMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const normalized = (locale || 'ru').toLowerCase();
  if (!supportedLocales.includes(normalized)) return { title: 'Contact - Mizan Architecture' };
  const seo = getSeoMetadata(normalized);
  return {
    title: `Contact - Mizan Architecture`,
    description: seo.description,
  };
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Contact />
    </main>
  );
}
