'use client';

import { useEffect, useRef, useState } from 'react';
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
            className={`relative shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] aspect-16/10 md:aspect-4/3 rounded-lg overflow-hidden shadow-2xl ${isMobile ? 'snap-center' : ''}`}
          >
            <Image
              src={image}
              alt={`${t(project.titleKey)} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, 50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

