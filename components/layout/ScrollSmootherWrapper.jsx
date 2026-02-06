'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function ScrollSmootherWrapper({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMobile) return; // Don't initialize ScrollSmoother on mobile

    const initSmoother = () => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;

      if (!wrapper || !content || smootherRef.current) return;

      if (!ScrollSmoother) {
        console.warn('ScrollSmoother is not available.');
        return;
      }

      try {
        smootherRef.current = ScrollSmoother.create({
          wrapper: wrapper,
          content: content,
          smooth: 0.8,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
        });
        window.ScrollSmootherInstance = smootherRef.current;
        wrapper.classList.add('scroll-smoother-active');
      } catch (error) {
        console.error('Error creating ScrollSmoother:', error);
      }
    };

    // Check if intro animation is already complete
    if (window.__introComplete) {
      initSmoother();
    } else {
      // Listen for intro completion event
      const handleIntroComplete = () => {
        initSmoother();
      };
      window.addEventListener('introComplete', handleIntroComplete);
      return () => {
        window.removeEventListener('introComplete', handleIntroComplete);
      };
    }

    return () => {
      if (smootherRef.current) {
        try {
          smootherRef.current.kill();
          window.ScrollSmootherInstance = null;
          smootherRef.current = null;
        } catch (error) {
          console.error('Error killing ScrollSmoother:', error);
        }
      }
    };
  }, [isMobile]);

  // Route o'zgarganda scroll to top
  useEffect(() => {
    if (isMobile) {
      // Mobile'da oddiy scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToTop = () => {
      const smoother = window.ScrollSmootherInstance || (window.ScrollSmoother?.get && window.ScrollSmoother.get());
      if (smoother) {
        // ScrollSmoother ishlatilganda
        smoother.scrollTo(0, true);
      } else {
        // Oddiy scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Kichik delay bilan scroll to top (sahifa yuklangandan keyin)
    const timer = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, isMobile]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
