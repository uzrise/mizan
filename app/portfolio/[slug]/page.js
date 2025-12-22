import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/sections/ProjectDetail';
import { getProjectBySlug, getAllProjects } from '@/constants/projects';

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found - Mizan Architecture',
    };
  }

  return {
    title: `${project.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Mizan Architecture`,
    description: 'Explore our architectural project details and gallery.',
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ProjectDetail project={project} />
    </main>
  );
}

