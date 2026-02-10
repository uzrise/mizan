'use client';

import { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { formatImageUrl } from '@/utils/imageUtils';
import { ImageWithTimeoutSimple, preloadImage } from '@/components/common/ImageWithTimeout';

/**
 * Get the best available URL for a specific format
 */
function getFormatUrl(index, format, images, imagesFormats) {
  const formats = imagesFormats?.[index];
  if (formats && formats[format]) {
    return formatImageUrl(formats[format]);
  }
  // Fallback to full URL
  return formatImageUrl(images?.[index] || '');
}

const ProjectCard = memo(({ project }) => {
  const { t, locale, safeTranslate } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Get formats arrays
  const imagesFormats = project?.imagesFormats || [];
  const imageFormats = project?.imageFormats;
  
  // Use medium format for card images (faster loading)
  const defaultImage = imageFormats?.medium || imageFormats?.small || project.image || project.images?.[0] || '';
  
  // Memoize slideshowImages to stabilize reference for React Compiler
  const slideshowImages = useMemo(
    () => (project.images?.filter(img => img && img.trim() !== '') || []).slice(0, 5),
    [project.images]
  );
  
  const slideshowCount = slideshowImages.length;
  
  // Build display images with medium format preference
  const displayImages = isHovered && slideshowCount > 0
    ? slideshowImages.map((_, idx) => getFormatUrl(idx, 'medium', project.images, imagesFormats) || slideshowImages[idx])
    : [formatImageUrl(defaultImage)].filter(Boolean);

  const startSlideshow = useCallback(() => {
    if (slideshowCount <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % slideshowCount);
    }, 1200);
  }, [slideshowCount]);

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

  // Preload slug page hero image on hover for faster page load (use medium format - same as Hero)
  const preloadHeroImage = useCallback(() => {
    // Prefer medium format for hero preload (same format used in Hero component)
    const heroImageSrc = imageFormats?.medium || imageFormats?.large || project.image || project.images?.[0];
    if (!heroImageSrc) return;
    const url = formatImageUrl(heroImageSrc);
    if (url) {
      preloadImage(url); // Uses global cache from ImageWithTimeout
    }
  }, [project.image, project.images, imageFormats]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    preloadHeroImage();
  }, [preloadHeroImage]);

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden w-full aspect-457/427 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/10">
          {displayImages.map((img, index) => (
            <ImageWithTimeoutSimple
              key={index}
              src={img}
              alt={`${safeTranslate(project?.titleKey) || 'Project'} - ${index + 1}`}
              width={457}
              height={427}
              timeout={12000}
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

