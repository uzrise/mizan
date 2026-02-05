'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

const ProjectCard = memo(({ project }) => {
  const { t, locale, safeTranslate } = useTranslation();

  return (
    <div
      key={project.id}
      data-project-card
      className="w-full"
      style={{ opacity: 0, transform: "translateY(40px) scale(0.9)" }}
    >
      <Link
        href={`/${locale}/portfolio/${project.slug}`}
        className="relative block overflow-hidden"
      >
        <div className="relative overflow-hidden w-full aspect-457/427">
          <Image
            src={project.image}
            alt={safeTranslate(project?.titleKey) || 'Project'}
            width={457}
            height={427}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 457px"
            priority={false}
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 
              className="font-semibold text-[#1a3a2a] text-[20px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              {safeTranslate(project?.titleKey)}
            </h3>
            {project.category && project.category.length > 0 && (
              <div className="px-2 flex items-center gap-1 py-1 rounded-2xl bg-white border border-[#DADADA] text-xs font-medium text-[#161616] transition-opacity duration-200">
                <span
                  className="block w-[6px] h-[6px] m-px rounded-full shrink-0 bg-[#DADADA]"
                />
                <span style={{ willChange: 'contents' }}>
                  {project.category[0] === "exterior"
                    ? t("portfolio.exterior")
                    : project.category[0] === "interior"
                    ? t("portfolio.interior")
                    : project.category[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function Grid({ containerRef, filteredProjects }) {
  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-6"
    >
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

