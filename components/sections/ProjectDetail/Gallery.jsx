'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { formatImageUrl } from '@/utils/imageUtils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery({ project, gallerySectionRef, galleryContainerRef, galleryItemsRef }) {
  const { t, safeTranslate } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef(null);
  const lightboxImageRef = useRef(null);
  const imageWrapperRef = useRef(null);

  // Open lightbox
  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
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


  // Get valid images
  const validImages = useMemo(() => {
    return project?.images?.filter(img => img && img.trim() !== '') || [];
  }, [project?.images]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [validImages]);

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [validImages]);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback((e) => {
    if (!lightboxImageRef.current) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => {
      const newZoom = Math.max(1, Math.min(prev + delta, 5));
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback((e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [zoom, position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Calculate bounds to prevent dragging too far
    if (lightboxImageRef.current) {
      const container = lightboxImageRef.current;
      const containerRect = container.getBoundingClientRect();
      const scaledWidth = containerRect.width * zoom;
      const scaledHeight = containerRect.height * zoom;
      
      const maxX = (scaledWidth - containerRect.width) / 2;
      const maxY = (scaledHeight - containerRect.height) / 2;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    } else {
      setPosition({
        x: newX,
        y: newY,
      });
    }
  }, [isDragging, zoom, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage, handleZoomIn, handleZoomOut, handleResetZoom]);

  // Mouse wheel zoom
  useEffect(() => {
    if (!lightboxOpen || !lightboxImageRef.current) return;
    const imageElement = lightboxImageRef.current;
    imageElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => imageElement.removeEventListener('wheel', handleWheel);
  }, [lightboxOpen, handleWheel]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  }, [zoom, position]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    // Calculate bounds to prevent dragging too far
    if (lightboxImageRef.current) {
      const container = lightboxImageRef.current;
      const containerRect = container.getBoundingClientRect();
      const scaledWidth = containerRect.width * zoom;
      const scaledHeight = containerRect.height * zoom;
      
      const maxX = (scaledWidth - containerRect.width) / 2;
      const maxY = (scaledHeight - containerRect.height) / 2;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    } else {
      setPosition({
        x: newX,
        y: newY,
      });
    }
  }, [isDragging, zoom, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse events for dragging
  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);


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
    if (!section || !container || validImages.length === 0) return;

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
      const scrollSpeedMultiplier = 0.5; 
      const scrollDistance = (totalWidth - window.innerWidth + (itemWidth * 0.2)) * scrollSpeedMultiplier
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
        scrub: 0.5,
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
  }, [validImages, gallerySectionRef, galleryContainerRef, galleryItemsRef]);

  // Don't render if no images (after all hooks)
  if (validImages.length === 0) {
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
          {validImages.map((image, index) => {
            // Skip if image is empty or invalid
            if (!image || image.trim() === '') return null;
            
            const imageUrl = formatImageUrl(image);
            
            return (
              <div
                key={index}
                ref={(el) => {
                  galleryItemsRef.current[index] = el;
                }}
                onClick={() => openLightbox(index)}
                className={`relative shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] aspect-16/10 md:aspect-4/3 rounded-lg overflow-hidden shadow-2xl cursor-pointer group ${isMobile ? 'snap-center' : ''}`}
              >
                <Image
                  src={imageUrl}
                  alt={`${safeTranslate(project?.titleKey)} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, 50vw"
                  unoptimized={imageUrl.includes('localhost:1337')}
                  onError={(e) => {
                    console.error('Image failed to load:', imageUrl);
                    e.target.style.display = 'none';
                  }}
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
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal - Rendered via Portal to document.body */}
      {typeof window !== 'undefined' && lightboxOpen && validImages.length > 0 && createPortal(
        <div
          ref={lightboxRef}
          className="fixed w-full inset-0 bg-black/95 flex items-center justify-center overflow-hidden"
          onClick={closeLightbox}
          style={{ 
            zIndex: 99999,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Main content container */}
          <div
            className="flex flex-col items-center justify-center w-full px-4 max-w-full py-8 h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div
              ref={lightboxImageRef}
              className="relative w-full h-[75vh] mb-8 overflow-hidden select-none"
              style={{ animation: 'scaleIn 0.3s ease-out', cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={imageWrapperRef}
                className="relative w-full h-full"
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                {(() => {
                  const currentImageUrl = formatImageUrl(validImages[currentImageIndex]);
                  return (
                    <Image
                      src={currentImageUrl}
                      alt={`${safeTranslate(project?.titleKey)} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority
                      unoptimized={currentImageUrl?.includes('localhost:1337')}
                      onError={(e) => {
                        console.error('Lightbox image failed to load:', currentImageUrl);
                      }}
                    />
                  );
                })()}
              </div>
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Zoom in"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Zoom out"
                disabled={zoom <= 1}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              {zoom > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  aria-label="Reset zoom"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="w-full mb-8 max-w-5xl overflow-x-auto overflow-y-hidden scrollbar-hide md:overflow-x-visible md:overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex gap-3 justify-start px-2 flex-nowrap min-w-max md:justify-center md:flex-wrap md:min-w-0">
                {validImages.map((image, index) => {
                  if (!image || image.trim() === '') return null;
                  const thumbnailUrl = formatImageUrl(image);
                  return (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                    className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      index === currentImageIndex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-white/30 hover:border-white/60 hover:scale-105'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={thumbnailUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                      }`}
                      sizes="96px"
                      unoptimized={thumbnailUrl.includes('localhost:1337')}
                      onError={(e) => {
                        console.error('Thumbnail failed to load:', thumbnailUrl);
                      }}
                    />
                    {/* Active indicator overlay */}
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-white/10" />
                    )}
                  </button>
                  );
                })}
              </div>
            </div>

  
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

