'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';
import { formatImageUrl } from '@/utils/imageUtils';
import { useProjects } from '@/hooks/useProjects';

export default function CarouselWithBackground({ project }) {
  const { t, safeTranslate } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const { projects: allProjects } = useProjects();

  const showcaseProjects = React.useMemo(() => {
    return allProjects?.slice(0, 4) || [];
  }, [allProjects]);

  const validImages = React.useMemo(() => {
    const imagesWithProjects = [];
    showcaseProjects.forEach((proj) => {
      if (proj?.images && Array.isArray(proj.images) && proj.images.length > 0) {
        const firstImage = proj.images.find(img => img && img.trim() !== '');
        if (firstImage && proj?.slug) {
          imagesWithProjects.push({
            image: firstImage,
            project: proj,
          });
        }
      }
    });
    if (process.env.NODE_ENV === 'development') {
      console.log('CarouselWithBackground - Projects:', showcaseProjects.map(p => ({ slug: p?.slug, title: p?.titleKey })));
      console.log('CarouselWithBackground - Valid Images:', imagesWithProjects.map(i => ({ slug: i.project?.slug, image: i.image })));
    }
    return imagesWithProjects;
  }, [showcaseProjects]);

  if (validImages.length === 0) {
    return null;
  }

  const totalImages = validImages.length;
  const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
  const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;

  const goToPrevious = () => {
    if (isAnimating || totalImages <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating || totalImages <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const itemWidth = 620;

  return (
    <section
      className="relative overflow-hidden isolate"
      style={{ height: '416px', backgroundColor: '#02352D' }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: '#02352D' }}
      />

      <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30">
        <p 
          className="text-white mb-1"
          style={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '115%',
            letterSpacing: '-0.02em',
          }}
        >
          {t('projects.generalPlanSubtitle') || 'General Plan'}
        </p>
        <h2 
          className="text-white"
          style={{
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '115%',
            letterSpacing: '-0.02em',
          }}
        >
          {t('projects.generalPlan')}
        </h2>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center isolate">
        <div 
          className="relative overflow-hidden isolate" 
          style={{ 
            width: '100%',
            maxWidth: '1600px',
            height: '320px',
          }}
        >
          <div 
            className="absolute inset-0 flex items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(50% - ${itemWidth / 2}px - ${currentIndex * itemWidth}px))`,
            }}
          >
            {validImages.map((item, index) => {
              if (!item || !item.image || item.image.trim() === '') return null;
              
              const imageUrl = formatImageUrl(item.image);
              const projectItem = item.project;
              const isCenter = index === currentIndex;
              const isPrev = index === prevIndex;
              const isNext = index === nextIndex;
              const isVisible = isCenter || isPrev || isNext;
              
              const uniqueKey = `${projectItem?.slug || 'project'}-${index}-${item.image}`;
              
              return (
                <Link
                  key={uniqueKey}
                  href={`/portfolio/${projectItem?.slug}`}
                  className="shrink-0 flex items-center justify-center"
                  style={{ 
                    width: `${itemWidth}px`,
                    height: '320px',
                  }}
                >
                  <div
                    className={`relative transition-all duration-500 ease-out rounded-lg overflow-hidden cursor-pointer hover:scale-105 ${
                      isCenter ? 'z-20' : 'z-10'
                    }`}
                    style={{ 
                      width: isCenter ? '596px' : '427px', 
                      height: isCenter ? '320px' : '240px',
                      opacity: isVisible ? (isCenter ? 1 : 0.7) : 0.3,
                      transform: isCenter ? 'scale(1)' : 'scale(0.95)',
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${safeTranslate(projectItem?.titleKey)} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes={isCenter ? '596px' : '427px'}
                      priority={index <= 2}
                      unoptimized={imageUrl.includes('localhost:1337')}
                      onError={(e) => {
                        console.error('Carousel image failed to load:', imageUrl);
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {totalImages > 1 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 z-50">
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full bg-white/40 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full bg-white/40 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

