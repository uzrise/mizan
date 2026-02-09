'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

const ProjectCard = memo(({ project }) => {
  const { t, locale, safeTranslate } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const defaultImage = project.image || project.images?.[0] || '';
  const slideshowImages = (project.images?.filter(img => img && img.trim() !== '') || []).slice(0, 5);
  const displayImages = isHovered && slideshowImages.length > 0
    ? slideshowImages
    : [defaultImage].filter(Boolean);

  const startSlideshow = useCallback(() => {
    if (slideshowImages.length <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % slideshowImages.length);
    }, 1200);
  }, [slideshowImages.length]);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    queueMicrotask(() => setCurrentImageIndex(0));
  }, []);

  useEffect(() => {
    if (isHovered) {
      startSlideshow();
    } else {
      stopSlideshow();
    }
    return () => stopSlideshow();
  }, [isHovered, startSlideshow, stopSlideshow]);

  return (
    <div
      key={project.id}
      data-project-card
      className="w-full"
      style={{ opacity: 0, transform: "translateY(40px) scale(0.9)" }}
    >
      <Link
        href={`/${locale}/portfolio/${project.slug}`}
        className="group relative block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden w-full aspect-457/427 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/10">
          {displayImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`${safeTranslate(project?.titleKey) || 'Project'} - ${index + 1}`}
              width={457}
              height={427}
              className={`absolute inset-0 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, 457px"
              priority={index === 0}
            />
          ))}
          
          {isHovered && displayImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {displayImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white w-4' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 px-1">
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

