import Hero from "@/components/sections/Hero";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Statistics from "@/components/sections/Statistics";
import CompanyValues from "@/components/sections/CompanyValues";
import AwardsAndPartners from "@/components/sections/AwardsAndPartners";
import Team from "@/components/sections/Team";
import { getProjects } from "@/lib/strapi";
import { projects as constantsProjects } from "@/constants/projects";

export const revalidate = 60;

const localeToLang = { ru: 'RU', en: 'EN', uz: 'UZ', tr: 'TR' };

export default async function Home({ params }) {
  const { locale } = await params;
  const lang = localeToLang[locale?.toLowerCase()] || 'RU';

  let initialProjects = [];
  let serverStrapiFailed = false;
  try {
    initialProjects = await getProjects(lang);
    if (!Array.isArray(initialProjects)) initialProjects = [];
  } catch (err) {
    console.warn('Home: getProjects failed, using constants fallback', err?.message);
    serverStrapiFailed = true;
    initialProjects = constantsProjects.slice(-4).reverse();
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="space-y-24">
        <ProjectShowcase initialProjects={initialProjects} serverStrapiFailed={serverStrapiFailed} />
        <Statistics />
        <CompanyValues />
        <div style={{ backgroundColor: "#00382F" }}>
          <AwardsAndPartners />
          <div style={{ marginTop: 0 }}>
            <Team />
          </div>
        </div>
      </div>
    </main>
  );
}
