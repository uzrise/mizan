import Durability from '@/components/sections/Durability';
import { getSeoMetadata, supportedLocales } from '@/lib/getSeoMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const normalized = (locale || 'ru').toLowerCase();
  if (!supportedLocales.includes(normalized)) return { title: 'Durability - Mizan Architecture' };
  const seo = getSeoMetadata(normalized);
  return {
    title: `Durability - Mizan Architecture`,
    description: seo.description,
  };
}

export default function DurabilityPage() {
  return (
    <main className="min-h-screen bg-white overflow-visible">
      <Durability />
    </main>
  );
}
