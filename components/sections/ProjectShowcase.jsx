'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectShowcase({ initialProjects = [] }) {
  const { t, language, safeTranslate } = useTranslation();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const { projects: clientProjects, loading: clientLoading, error } = useProjects();

  // Prioritize server-fetched initialProjects over client-fetched projects
  // This ensures data from Strapi is used when available
  const projectsToUse = initialProjects && initialProjects.length > 0 
    ? initialProjects 
    : clientProjects;

  const loading = initialProjects && initialProjects.length > 0 ? false : clientLoading;

  const projects = projectsToUse?.slice(0, 4) || [];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const projectElements = projectRefs.current.filter(Boolean);
    const totalProjects = projectElements.length;
    if (totalProjects === 0) return;

    let scrollTrigger = null;
    
    const initScrollTrigger = () => {
      const isMobile = window.innerWidth < 640;
      const viewportHeight = window.innerHeight;
      const scrollMultiplier = 0.3;
      const scrollDistance = viewportHeight * totalProjects * scrollMultiplier;
      
      gsap.set(container, {
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      });

      if (isMobile) {
        projectElements.forEach((projectRef) => {
          const imageRef = projectRef.querySelector('[data-project-image]');
          if (!imageRef) return;
          
          gsap.set(imageRef, {
            width: 280,
            height: 200,
            opacity: 1,
          });
        });

        gsap.set([section, container], { opacity: 1, visibility: 'visible' });
        return;
      }

      projectElements.forEach((projectRef, index) => {
        const imageRef = projectRef.querySelector('[data-project-image]');
        if (!imageRef) return;
        
        gsap.set(imageRef, {
          width: index === 0 ? 548 : 256,
          height: 466,
          opacity: 1,
        });
        
        imageRef.style.willChange = 'width';
      });
      
      const quickToFunctions = projectElements.map((projectRef) => {
        const imageRef = projectRef.querySelector('[data-project-image]');
        if (!imageRef) return null;
        return gsap.quickTo(imageRef, 'width', {
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      const pinType = 'transform';
      
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: container,
        pinType: pinType,
        pinReparent: false,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinSpacing: true,
        onEnter: () => {
          gsap.set(container, { 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          });
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const segmentSize = 1 / totalProjects;

          projectElements.forEach((projectRef, index) => {
            const imageRef = projectRef.querySelector('[data-project-image]');
            if (!imageRef) return;
            const quickTo = quickToFunctions[index];
            if (!quickTo) return;

            const segmentStart = index * segmentSize;
            const segmentEnd = (index + 1) * segmentSize;

            let targetWidth = 256;
            
            if (index === 0) {
              if (progress < segmentEnd) {
                targetWidth = 548;
              }
            } else if (index === totalProjects - 1) {
              if (progress >= segmentStart) {
                targetWidth = 548;
              }
            } else {
              if (progress >= segmentStart && progress < segmentEnd) {
                targetWidth = 548;
              }
            }

            quickTo(targetWidth);
            gsap.set(imageRef, { height: 466 });
          });
        },
      });


      if (!isMobile) {
        ScrollTrigger.refresh();
        
        const showSection = () => {
          gsap.to([section, container], {
            opacity: 1,
            visibility: 'visible',
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              section.style.opacity = '';
              section.style.visibility = '';
              container.style.opacity = '';
              container.style.visibility = '';
            }
          });
        };
        
        requestAnimationFrame(() => {
          requestAnimationFrame(showSection);
        });
      }
    };

    const checkAndInit = () => {
      const smoother = window.ScrollSmootherInstance || (window.ScrollSmoother?.get && window.ScrollSmoother.get());
      if (window.__introComplete) {
        initScrollTrigger();
        
        if (smoother) {
          setTimeout(() => {
            try {
              smoother.refresh();
              ScrollTrigger.refresh();
              
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  gsap.to([section, container], {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                      section.style.opacity = '';
                      section.style.visibility = '';
                      container.style.opacity = '';
                      container.style.visibility = '';
                    }
                  });
                });
              });
            } catch (e) {
              console.warn('Error refreshing ScrollSmoother:', e);
            }
          }, 150);
        } else {
          setTimeout(() => {
            ScrollTrigger.refresh();
            
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                gsap.to([section, container], {
                  opacity: 1,
                  visibility: 'visible',
                  duration: 0.3,
                  ease: 'power2.out',
                  onComplete: () => {
                    section.style.opacity = '';
                    section.style.visibility = '';
                    container.style.opacity = '';
                    container.style.visibility = '';
                  }
                });
              });
            });
          }, 100);
        }
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    const timer = setTimeout(checkAndInit, 200);

    const handleResize = () => {
      if (scrollTrigger) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      projectElements.forEach((projectRef) => {
        const imageRef = projectRef.querySelector('[data-project-image]');
        if (imageRef) {
          imageRef.style.willChange = 'auto';
        }
      });
    };
  }, [projects.length]);

  if (loading && (!initialProjects || initialProjects.length === 0)) {
    return (
      <section
        id="portfolio"
        className="relative bg-white overflow-hidden pt-16 sm:pt-20 md:pt-24"
        style={{ 
          minHeight: 'clamp(200px, 50vw, 466px)',
          position: 'relative'
        }}
      >
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
          <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-start sm:justify-center items-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[466px]">
            <div className="text-center text-gray-500">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error && (!initialProjects || initialProjects.length === 0) && (!projects || projects.length === 0)) {
    return (
      <section
        id="portfolio"
        className="relative bg-white overflow-hidden pt-16 sm:pt-20 md:pt-24"
        style={{ 
          minHeight: 'clamp(200px, 50vw, 466px)',
          position: 'relative'
        }}
      >
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
          <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-start sm:justify-center items-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[466px]">
            <div className="text-center text-gray-500">
              Failed to load projects
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section
        id="portfolio"
        className="relative bg-white overflow-hidden pt-16 sm:pt-20 md:pt-24"
        style={{ 
          minHeight: 'clamp(200px, 50vw, 466px)',
          position: 'relative'
        }}
      >
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
          <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-start sm:justify-center items-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[466px]">
            <div className="text-center text-gray-500">
              No projects available
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-white overflow-hidden pt-16 sm:pt-20 md:pt-24"
      style={{ 
        opacity: 0, 
        visibility: 'hidden',
        minHeight: 'clamp(200px, 50vw, 466px)',
        position: 'relative'
      }}
    >
      <div 
        ref={containerRef}
        className="container mx-auto px-0 sm:px-6 lg:px-8 relative z-10"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-start sm:justify-center items-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[466px] overflow-x-auto sm:overflow-x-visible scrollbar-hide pl-4 sm:pl-0 pr-4 sm:pr-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="group relative shrink-0"
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div
                  data-project-image
                  className="relative rounded-lg overflow-hidden bg-gray-200 shadow-lg cursor-pointer"
                  style={{
                    width: 'clamp(280px, 80vw, 548px)',
                    height: 'clamp(200px, 50vw, 466px)',
                  }}
                >
                  <Image
                    src={project.image || '/images/projects/1.jpg'}
                    alt={safeTranslate(project?.titleKey) || 'Project'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 256px, 548px"
                  />
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                  
                  <h3 
                    className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 text-white uppercase text-sm sm:text-base md:text-xl lg:text-2xl"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: '1.15',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}
                  >
                    {safeTranslate(project?.titleKey) || 'Project'}
                  </h3>
                  
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-10">
                    <svg
                      className="w-6 h-6 text-[#1a3a2a]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

