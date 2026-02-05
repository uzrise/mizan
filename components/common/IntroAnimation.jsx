'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function IntroAnimation() {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current) return;

    // Til o'zgarganda (locale nav) intro qayta ishlamasin — faqat birinchi marta
    if (typeof window !== 'undefined' && window.__introComplete === true) {
      overlayRef.current.style.display = 'none';
      if (logoRef.current) logoRef.current.style.display = 'none';
      return;
    }

    let cancelled = false;

    // Disable scroll during intro animation
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    const preloadHeroImage = () =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = '/images/bg-image.jpg';
      });

    const runAnimation = async () => {
      // Wait for hero bg to load or a short timeout to avoid blocking forever
      await Promise.race([
        preloadHeroImage(),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);

      if (cancelled || !overlayRef.current || !logoRef.current) return;

      // Initial states
      gsap.set(overlayRef.current, {
        ' --scale': 0,
        '--coverDisplay': 'block',
      });
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

      // 0️⃣ Initial white background
      tl.to({}, { duration: 0.8 });

      // 1️⃣ Remove white cover
      tl.add(() => {
        overlayRef.current.style.setProperty('--coverDisplay', 'none');
      });

      // 2️⃣ Overlay (hole) + logo appear together
      gsap.set(overlayRef.current, { '--scale': 0.1 });
      tl.to(
        overlayRef.current,
        {
          '--scale': 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        'overlayStart'
      );

      // Logo appears with overlay
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        'overlayStart'
      );

      // 3️⃣ Then hole and logo expand together
      tl.to(
        overlayRef.current,
        {
          '--scale': 25,
          duration: 2.2,
          ease: 'power3.inOut',
        },
        'expand'
      );

      // Logo moves to navbar center (instead of fading out)
      // Wait a bit for overlay to expand, then move logo
      tl.call(() => {
        const navbar = document.querySelector('nav');
        const navbarLogoContainer = navbar?.querySelector('[class*="absolute"]');
        
        if (navbarLogoContainer) {
          const navbarRect = navbarLogoContainer.getBoundingClientRect();
          const navbarCenterX = navbarRect.left + navbarRect.width / 2;
          const navbarCenterY = navbarRect.top + navbarRect.height / 2;
          const currentRect = logoRef.current.getBoundingClientRect();
          const currentCenterX = currentRect.left + currentRect.width / 2;
          const currentCenterY = currentRect.top + currentRect.height / 2;
          
          const deltaX = navbarCenterX - currentCenterX;
          const deltaY = navbarCenterY - currentCenterY;
          
          // Responsive scale calculation - logolar bir xil bo'lishi uchun scale 1.0
          const isMobile = window.innerWidth < 640;
          const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
          
          // Intro va Navbar logolar bir xil o'lchamda bo'lishi kerak
          // Shuning uchun scaleFactor = 1.0 (hech qanday o'zgarish yo'q)
          const scaleFactor = 1.0;

          // Move logo to navbar position
          gsap.to(logoRef.current, {
            x: deltaX,
            y: deltaY,
            scale: scaleFactor,
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => {
              // Hide intro logo after transition, then show navbar logo
              if (logoRef.current) {
                logoRef.current.style.display = 'none';
              }
              // Trigger navbar logo to appear after intro logo is hidden
              if (!window.__introComplete) {
                window.__introComplete = true;
                window.dispatchEvent(new Event('introComplete'));
              }
            },
          });
        } else {
          // Fallback: hide intro logo first, then show navbar logo
          if (logoRef.current) {
            logoRef.current.style.display = 'none';
          }
          // Trigger navbar logo to appear after intro logo is hidden
          if (!window.__introComplete) {
            window.__introComplete = true;
            window.dispatchEvent(new Event('introComplete'));
          }
        }
      }, null, 'expand+=0.5');

      // 4️⃣ Overlay disappears - enable scroll when fade starts
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.8,
          onStart: () => {
            // Re-enable scroll when overlay starts fading out
            document.body.style.overflow = '';
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflow = '';
            document.documentElement.style.overflowX = 'hidden';
          },
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
            }
          },
        }
      );
    };

    runAnimation();

    // Cleanup function to re-enable scroll if component unmounts
    return () => {
      cancelled = true;
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowX = 'hidden';
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[9999] pointer-events-none"
      style={{
        '--scale': 0.1,
        '--coverDisplay': 'block',
      }}
    >
      <div
        ref={logoRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none"
      >
        <div className="w-[160px] sm:w-[190px] md:w-[220px] h-[24px] sm:h-[28px] md:h-[32px]">
          <Image
            src="/images/logo.svg"
            alt="Mizan Logo"
            width={220}
            height={32}
            priority
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

