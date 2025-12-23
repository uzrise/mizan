'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery({ project, gallerySectionRef, galleryContainerRef, galleryItemsRef }) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lightboxRef = useRef(null);
  const lightboxImageRef = useRef(null);

  // Open lightbox
  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    // Pause ScrollSmoother if available
    const smoother = window.ScrollSmootherInstance || (window.ScrollSmoother?.get && window.ScrollSmoother.get());
    if (smoother) {
      smoother.paused(true);
    }
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
    // Resume ScrollSmoother if available
    const smoother = window.ScrollSmootherInstance || (window.ScrollSmoother?.get && window.ScrollSmoother.get());
    if (smoother) {
      smoother.paused(false);
    }
  }, []);

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);


  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = gallerySectionRef.current;
    const container = galleryContainerRef.current;
    if (!section || !container || !project?.images || project.images.length === 0) return;

    const items = galleryItemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    let scrollTrigger = null;

    const initScrollTrigger = () => {
      const isMobileView = window.innerWidth < 768;
      
      if (isMobileView) {
        // Mobile: Simple horizontal scroll (no pin, no animation)
        // Just show the section and let native scroll work
        gsap.set([section, container], { opacity: 1, visibility: 'visible' });
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        return;
      }

      // Desktop: Pinned horizontal scroll
      const itemWidth = items[0].offsetWidth || 600;
      const gap = 24; // gap-6 = 24px
      const totalWidth = (itemWidth + gap) * items.length - gap;
      const scrollDistance = totalWidth - window.innerWidth + (itemWidth * 0.5);

      // Set initial states
      gsap.set(container, {
        x: 0,
        willChange: 'transform',
      });

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: container,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.set(container, { willChange: 'transform' });
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const maxTranslate = -(totalWidth - window.innerWidth);
          gsap.set(container, {
            x: progress * maxTranslate,
          });
        },
        onLeave: () => {
          gsap.set(container, { willChange: 'auto' });
        },
        onEnterBack: () => {
          gsap.set(container, { willChange: 'transform' });
        },
      });

      // Show section after ScrollTrigger is ready
      gsap.to([section, container], {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          section.style.opacity = '';
          section.style.visibility = '';
        },
      });

      // Wait for ScrollSmoother if available
      const smoother = window.ScrollSmootherInstance || (window.ScrollSmoother?.get && window.ScrollSmoother.get());
      if (smoother) {
        setTimeout(() => {
          try {
            smoother.refresh();
            ScrollTrigger.refresh();
          } catch (e) {
            console.warn('Error refreshing ScrollSmoother:', e);
          }
        }, 100);
      } else {
        ScrollTrigger.refresh();
      }
    };

    // Wait for intro animation and ScrollSmoother
    const checkAndInit = () => {
      if (window.__introComplete || typeof window.__introComplete === 'undefined') {
        initScrollTrigger();
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    const timer = setTimeout(checkAndInit, 200);

    // Handle resize
    const handleResize = () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
        scrollTrigger = null;
      }
      setTimeout(initScrollTrigger, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      gsap.set(container, { willChange: 'auto', x: 0 });
    };
  }, [project, gallerySectionRef, galleryContainerRef, galleryItemsRef]);

  if (!project?.images || project.images.length === 0) {
    return null;
  }

  return (
    <>
      <section
        ref={gallerySectionRef}
        className={`relative bg-white py-16 md:py-24 ${isMobile ? 'overflow-visible' : 'overflow-hidden'}`}
        style={{ 
          opacity: isMobile ? 1 : 0,
          visibility: isMobile ? 'visible' : 'hidden',
          minHeight: isMobile ? 'auto' : '100vh',
        }}
      >
        <div
          ref={galleryContainerRef}
          className={`flex gap-4 md:gap-6 pl-4 sm:pl-6 lg:pl-8 ${isMobile ? 'overflow-x-auto overflow-y-hidden pb-4 pr-4 snap-x snap-mandatory scrollbar-hide' : 'pr-4 sm:pr-6 lg:pr-8'}`}
          style={{
            willChange: isMobile ? 'auto' : 'transform',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {project.images.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                galleryItemsRef.current[index] = el;
              }}
              onClick={() => openLightbox(index)}
              className={`relative shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] aspect-16/10 md:aspect-4/3 rounded-lg overflow-hidden shadow-2xl cursor-pointer group ${isMobile ? 'snap-center' : ''}`}
            >
              <Image
                src={image}
                alt={`${t(project.titleKey)} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, 50vw"
              />
              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-[#1a3a2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal - Rendered via Portal to document.body */}
      {typeof window !== 'undefined' && lightboxOpen && project?.images && createPortal(
        <div
          ref={lightboxRef}
          className="fixed inset-0 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          style={{ 
            zIndex: 99999,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image container */}
          <div
            ref={lightboxImageRef}
            className="relative w-[90vw] h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <Image
              src={project.images[currentImageIndex]}
              alt={`${t(project.titleKey)} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/30 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          {/* CSS Animations */}
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { transform: scale(0.9); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}

