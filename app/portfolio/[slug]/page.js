import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';
import { getAllProjects } from '@/lib/strapi';

// Generate static params for all projects
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
      .filter(param => param.slug); // Remove empty slugs
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { getProject } = await import('@/lib/strapi');
  const { getTranslation } = await import('@/translations');
  
  try {
    // Default to RU for metadata, but actual content will be language-aware
    const project = await getProject(slug, 'RU');
    
    if (!project) {
      return {
        title: 'Project Not Found - Mizan Architecture',
      };
    }

    // If titleKey is a translation key (contains dots), translate it
    let title = project.titleKey;
    if (title && typeof title === 'string' && title.includes('.')) {
      title = getTranslation('RU', title);
    }
    
    // Fallback to slug if no title
    if (!title) {
      title = project.slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Project';
    }

    // If descriptionKey is a translation key, translate it
    let description = project.descriptionKey;
    if (description && typeof description === 'string' && description.includes('.')) {
      description = getTranslation('RU', description);
    }
    
    // Fallback description
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
  const { getProject } = await import('@/lib/strapi');
  
  // Fetch project on server-side (with fallback to constants)
  const project = await getProject(slug, 'RU');
  
  return (
    <main className="min-h-screen bg-white">
      <ProjectPageClient slug={slug} initialProject={project} />
    </main>
  );
}

