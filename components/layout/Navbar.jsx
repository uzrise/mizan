'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/contexts/TranslationContext';

// Disable blur only when user prefers reduced motion (accessibility). PC blur stays on.
function useReducedBlur() {
  const [reduceBlur, setReduceBlur] = useState(false);
  useEffect(() => {
    const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (!mq) return;
    const update = () => setReduceBlur(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduceBlur;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, locale, changeLanguage, t } = useTranslation();
  const [showLogo, setShowLogo] = useState(() => {
    // Initialize state based on intro completion status
    return typeof window !== 'undefined' && window.__introComplete === true;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceBlur = useReducedBlur();
  const logoContainerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);

  // Portal faqat clientda, hydration tugagach — server/client HTML mos kelishi uchun
  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = ['UZ', 'EN', 'TR', 'RU'];

  useEffect(() => {
    // Listen for intro animation complete event
    const handleIntroComplete = () => {
      // Fade in navbar logo smoothly
      setShowLogo(true);
    };

    window.addEventListener('introComplete', handleIntroComplete);

    // If intro already completed (page refresh), set logo after mount
    if (window.__introComplete) {
      // Defer state update to avoid synchronous setState in effect
      setTimeout(() => {
        setShowLogo(true);
      }, 0);
    }

    return () => {
      window.removeEventListener('introComplete', handleIntroComplete);
    };
  }, []);

  // Scroll event listener for blur effect — throttled to reduce re-renders and jank
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(scrollY > 0);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate logo fade in when showLogo becomes true
  useEffect(() => {
    if (showLogo && logoContainerRef.current) {
      const logoElement = logoContainerRef.current.querySelector('div');
      if (logoElement) {
        gsap.fromTo(
          logoElement,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
    }
  }, [showLogo]);

  // Animate menu open/close
  useEffect(() => {
    if (!menuOverlayRef.current || !menuContentRef.current) return;

    if (isMenuOpen) {
      gsap.set(menuOverlayRef.current, { display: 'flex' });
      gsap.fromTo(
        menuOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        menuContentRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else if (menuOverlayRef.current) {
      gsap.to(menuContentRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.1,
        onComplete: () => {
          if (menuOverlayRef.current) {
            menuOverlayRef.current.style.display = 'none';
          }
        },
      });
    }
  }, [isMenuOpen]);

  // Scroll qilinganda ham orqadagi matn blur bo‘lishi uchun overlay body ga portal qilinadi.
  // ScrollSmoother #smooth-content ga transform beradi — overlay body da bo‘lsa, backdrop barcha qatlamlarni o‘z ichiga oladi.
  const menuOverlay = (
    <div
      ref={menuOverlayRef}
      className="fixed inset-0"
      style={{
        zIndex: 9999,
        backdropFilter: reduceBlur ? 'none' : 'blur(4px)',
        backgroundColor: reduceBlur ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.3)',
        display: 'none',
        minHeight: '100vh',
        height: '100vh',
        isolation: 'isolate',
        transform: 'translateZ(0)',
        willChange: isMenuOpen ? 'backdrop-filter' : 'auto',
      }}
    >
      <div
        ref={menuContentRef}
        className="h-full w-full flex flex-col relative"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(false);
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
          <div className="pt-4">
            <Button
              onClick={() => setIsMenuOpen(false)}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              className="!w-[44px] !h-[44px] !min-w-[44px] !min-h-[44px] !p-0 !gap-0"
              variant="primary"
              aria-label="Close menu"
            />
          </div>

          <nav className="flex flex-col w-fit gap-6 flex-1 pt-10">
            <Link
              href={`/${locale}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2 cursor-pointer"
            >
              {t('nav.home')}
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2 cursor-pointer"
            >
              {t('nav.portfolio')}
            </Link>
            <Link
              href={`/${locale}/durability`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2 cursor-pointer"
            >
              {t('nav.durability')}
            </Link>
            <Link
              href={`/${locale}/about`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2 cursor-pointer"
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2 flex items-center gap-2 cursor-pointer"
            >
              {t('nav.contact')}
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </nav>

          <div className="flex items-center gap-2 justify-end pb-8">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-2 py-1 text-sm font-medium transition-colors cursor-pointer ${
                  language === lang
                    ? 'text-white underline'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mounted && typeof document !== 'undefined' && document.body ? createPortal(menuOverlay, document.body) : null}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-transparent text-white transition-all duration-200"
        style={{
          backdropFilter: reduceBlur || isMenuOpen ? 'none' : (isScrolled ? 'blur(10px)' : 'none'),
          backgroundColor: isMenuOpen ? 'transparent' : (isScrolled ? (reduceBlur ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)') : 'transparent'),
          transform: 'translateZ(0)',
          willChange: isMenuOpen ? 'auto' : (isScrolled && !reduceBlur ? 'backdrop-filter' : 'auto'),
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 md:h-20">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
              className="!w-[44px] !h-[44px] !min-w-[44px] !min-h-[44px] !p-0 !gap-0 relative z-[51]"
              variant="primary"
              aria-label="Toggle menu"
            />

            <div
              ref={logoContainerRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {showLogo ? (
                <Link href={`/${locale}`} className="block w-[160px] sm:w-[190px] md:w-[220px] h-[24px] sm:h-[28px] md:h-[32px]">
                  <Image
                    src="/images/logo.svg"
                    alt="Mizan Logo"
                    width={220}
                    height={32}
                    priority
                    className="w-full h-full object-contain"
                  />
                </Link>
              ) : (
                <div className="w-[160px] sm:w-[190px] md:w-[220px] h-[24px] sm:h-[28px] md:h-[32px] opacity-0 pointer-events-none">
                  <div className="w-full h-full" />
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1 sm:gap-2 ml-auto z-10">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-1.5 sm:px-2 py-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    language === lang
                      ? 'text-white underline'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

