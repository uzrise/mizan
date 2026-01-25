import Hero from "@/components/sections/Hero";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Statistics from "@/components/sections/Statistics";
import CompanyValues from "@/components/sections/CompanyValues";
import AwardsAndPartners from "@/components/sections/AwardsAndPartners";
import Team from "@/components/sections/Team";
import { getProjects } from "@/lib/strapi";

export default async function Home() {
  const initialProjects = await getProjects('RU');

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="space-y-24">
        <ProjectShowcase initialProjects={initialProjects} />   
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
