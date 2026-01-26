import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';
import { getAllProjects } from '@/lib/strapi';

// Revalidate data every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    
    if (!projects || projects.length === 0) {
      console.warn('No projects found for static params generation');
      return [];
    }
    
    return projects
      .filter(project => project && project.slug)
      .map((project) => ({
        slug: project.slug || project.attributes?.slug || '',
      }))
      .filter(param => param.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { getProject } = await import('@/lib/strapi');
  const { getTranslation } = await import('@/translations');
  
  try {
    const project = await getProject(slug, 'RU');
    
    if (!project) {
      return {
        title: 'Project Not Found - Mizan Architecture',
      };
    }

    let title = project.titleKey;
    if (title && typeof title === 'string' && title.includes('.')) {
      title = getTranslation('RU', title);
    }
    
    if (!title) {
      title = project.slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Project';
    }

    let description = project.descriptionKey;
    if (description && typeof description === 'string' && description.includes('.')) {
      description = getTranslation('RU', description);
    }
    
    if (!description) {
      description = 'Explore our architectural project details and gallery.';
    }

    return {
      title: `${title} - Mizan Architecture`,
      description: description,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Project - Mizan Architecture',
      description: 'Explore our architectural project details and gallery.',
    };
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { getProject, getProjects } = await import('@/lib/strapi');
  
  // Fetch both current project and all projects for carousel
  const [project, allProjects] = await Promise.all([
    getProject(slug, 'RU'),
    getProjects('RU')
  ]);
  
  return (
    <main className="min-h-screen bg-white">
      <ProjectPageClient slug={slug} initialProject={project} initialProjects={allProjects} />
    </main>
  );
}

