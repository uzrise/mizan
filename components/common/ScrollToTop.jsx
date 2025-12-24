'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const shouldShow = scrollY > 300; // Show button after scrolling 300px
      
      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  // Animate button appearance/disappearance
  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
    }
  }, [isVisible]);

  // Initialize button as hidden
  useEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        pointerEvents: 'none',
      });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40
        w-12 h-12
        rounded-full
        bg-white/10 backdrop-blur-[4px]
        border border-[#DADADA7A]
        flex items-center justify-center
        transition-all duration-200
        hover:bg-white/20
        cursor-pointer
        shadow-lg"
      aria-label="Scroll to top"
      style={{
        backdropFilter: 'blur(4px)',
      }}
    >
      <svg
        className="w-6 h-6 text-[#1a3a2a]"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

