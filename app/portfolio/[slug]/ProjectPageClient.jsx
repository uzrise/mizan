'use client';

import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/sections/ProjectDetail';
import { useProject } from '@/hooks/useProjects';

export default function ProjectPageClient({ slug, initialProject }) {
  // Use hook which handles language changes and transforms project accordingly
  // Pass initialProject to hook so it can use it as fallback
  const { project } = useProject(slug, initialProject);

  // If no project found, show 404
  if (!project) {
    notFound();
  }

  // Validate required fields
  if (!project.slug || !project.titleKey) {
    console.error('Project missing required fields:', {
      slug: project?.slug,
      hasTitle: !!project?.titleKey,
      project,
    });
    notFound();
  }

  return <ProjectDetail project={project} />;
}

