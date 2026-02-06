'use client';

import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/sections/ProjectDetail';
import { useProject } from '@/hooks/useProjects';

export default function ProjectPageClient({ slug, initialProject, initialProjects = [], serverStrapiFailed = false }) {
  const { project, loading } = useProject(slug, initialProject);

  if (loading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500 text-lg">Yuklanmoqda…</div>
      </div>
    );
  }

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

  return <ProjectDetail project={project} initialProjects={initialProjects} />;
}

