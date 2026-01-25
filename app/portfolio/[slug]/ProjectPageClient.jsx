'use client';

import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/sections/ProjectDetail';
import { useProject } from '@/hooks/useProjects';

export default function ProjectPageClient({ slug, initialProject }) {
  const { project } = useProject(slug, initialProject);

  if (!project) {
    notFound();
  }

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

