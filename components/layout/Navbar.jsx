'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/contexts/TranslationContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useTranslation();
  const [showLogo, setShowLogo] = useState(() => {
    // Initialize state based on intro completion status
    return typeof window !== 'undefined' && window.__introComplete === true;
  });
  const logoContainerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);

  const languages = ['RU', 'EN', 'UZ', 'TR'];

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
      // Menu ochilganda - tepadan pastga smooth tushish
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
      // Menu yopilganda - smooth animatsiya
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

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Hamburger Menu Button - Menu overlay ichida ko'rinadi */}
          {!isMenuOpen && (
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
              className="!w-[44px] !h-[44px] !min-w-[44px] !min-h-[44px] !p-0 !gap-0"
              variant="primary"
              aria-label="Toggle menu"
            />
          )}

          {/* Logo - Markazda */}
          <div
            ref={logoContainerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {showLogo ? (
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
            ) : (
              <div className="w-[160px] sm:w-[190px] md:w-[220px] h-[24px] sm:h-[28px] md:h-[32px] opacity-0 pointer-events-none">
                {/* Placeholder for layout - same size as final logo */}
                <div className="w-full h-full" />
              </div>
            )}
          </div>

          {/* Language Selector - Desktop only, mobile da menu ichida */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 ml-auto z-10">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-1.5 sm:px-2 py-1 text-xs sm:text-sm font-medium transition-colors ${
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

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-[100]"
        style={{
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'none',
          minHeight: '100vh',
          height: '100vh',
        }}
      >
        {/* Menu Content - Alohida container, lekin orqa fon bir xil */}
        <div
          ref={menuContentRef}
          className="h-full w-full flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Container for content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
            {/* Menu Button - Navbar bilan bir xil joyda */}
            <div className="absolute top-4 left-4 sm:left-6 lg:left-8">
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

            {/* Navigation Links - Chap tomonda vertical */}
            <nav className="flex flex-col gap-6 flex-1 pt-20">
              <a
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2"
              >
                {t('nav.home')}
              </a>
              <a
                href="/portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2"
              >
                {t('nav.portfolio')}
              </a>
              <a
                href="/durability"
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2"
              >
                {t('nav.durability')}
              </a>
              <a
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2"
              >
                {t('nav.about')}
              </a>
              <a
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl font-medium hover:text-[#fbbf24] transition-colors py-2 flex items-center gap-2"
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
              </a>
            </nav>

            {/* Language Selector - Pastda o'ng tomonda */}
            <div className="flex items-center gap-2 justify-end pb-8">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 py-1 text-sm font-medium transition-colors ${
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
    </nav>
  );
}

