import Portfolio from '@/components/sections/Portfolio';
import { getAllProjectsForPortfolio } from '@/lib/strapi';

// Revalidate data every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: 'Portfolio - Mizan Architecture',
  description: 'Explore our portfolio of architectural projects including exterior and interior designs.',
};

export default async function PortfolioPage() {
  // Server-side fetch all projects with default language (RU)
  // getAllProjectsForPortfolio already handles fallback to constants if Strapi fails
  const initialProjects = await getAllProjectsForPortfolio('RU');

  return (
    <main className="min-h-screen bg-white">
      <Portfolio initialProjects={initialProjects} />
    </main>
  );
}

