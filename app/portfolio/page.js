import Portfolio from '@/components/sections/Portfolio';

export const metadata = {
  title: 'Portfolio - Mizan Architecture',
  description: 'Explore our portfolio of architectural projects including exterior and interior designs.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <Portfolio />
    </main>
  );
}

