'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if intro animation is already complete
    if (window.__introComplete) {
      setIntroComplete(true);
      return;
    }

    // Listen for intro completion event
    const handleIntroComplete = () => {
      setIntroComplete(true);
    };

    window.addEventListener('introComplete', handleIntroComplete);

    return () => {
      window.removeEventListener('introComplete', handleIntroComplete);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!introComplete) return; // Wait for intro animation to complete

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;

    // Check if ScrollSmoother is available (premium plugin)
    if (!ScrollSmoother) {
      console.warn('ScrollSmoother is not available. Make sure you have GSAP Club membership or ScrollSmoother plugin installed.');
      return;
    }

    let smoother = null;

    try {
      // Create ScrollSmoother instance after intro animation completes
      smoother = ScrollSmoother.create({
        wrapper: wrapper,
        content: content,
        smooth: 1, // Smooth scroll speed (1-3 recommended)
        effects: true, // Enable data-speed and data-lag effects
        smoothTouch: 0.1, // Smooth scrolling on touch devices (0 = disabled)
      });
      // Store smoother instance globally for other components to access
      window.ScrollSmootherInstance = smoother;
      // Add class to indicate ScrollSmoother is active
      wrapper.classList.add('scroll-smoother-active');
    } catch (error) {
      console.error('Error creating ScrollSmoother:', error);
    }

    return () => {
      if (smoother) {
        try {
          smoother.kill();
          window.ScrollSmootherInstance = null;
          if (wrapperRef.current) {
            wrapperRef.current.classList.remove('scroll-smoother-active');
          }
        } catch (error) {
          console.error('Error killing ScrollSmoother:', error);
        }
      }
    };
  }, [introComplete]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

