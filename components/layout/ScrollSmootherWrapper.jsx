'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
          smooth: 1,
          effects: true,
          smoothTouch: 0.1,
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
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
