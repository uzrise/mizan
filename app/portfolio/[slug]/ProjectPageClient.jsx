'use client';

import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/sections/ProjectDetail';
import { useProject } from '@/hooks/useProjects';

// Skeleton component for loading state - mimics Hero + Content + Gallery layout
function ProjectPageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] min-h-[400px] md:h-[72vh] bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
        {/* Subtitle / location */}
        <div className="h-5 bg-gray-100 rounded w-1/3 mb-8" />
        {/* Description lines */}
        <div className="space-y-3 mb-12">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>
        {/* Specs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded" />
          ))}
        </div>
      </div>

      {/* Gallery skeleton */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shrink-0 w-[60vw] md:w-[50vw] aspect-4/3 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectPageClient({ slug, initialProject, initialProjects = [], serverStrapiFailed = false }) {
  const { project, loading } = useProject(slug, initialProject);

  if (loading && !project) {
    return <ProjectPageSkeleton />;
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

