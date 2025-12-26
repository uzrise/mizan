'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATISTICS_DATA = [
  {
    value: 18,
    labelKey: 'stats.completed',
    image: '/images/stats/1.jpg', // Apartment buildings
  },
  {
    value: 32,
    labelKey: 'stats.currentProjects',
    image: '/images/stats/2.jpg', // Construction site
  },
  {
    value: 120,
    labelKey: 'stats.builtKm2',
    image: '/images/stats/3.jpg', // Office interior
  },
  {
    value: 3,
    labelKey: 'stats.yearsExperience',
    image: '/images/stats/4.jpg', // Office space
  },
];

export default function Statistics() {
  const { t } = useTranslation();
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const statistics = useMemo(() => STATISTICS_DATA, []);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate each number
            statistics.forEach((stat, index) => {
              const duration = 2000; // 2 seconds
              const steps = 60;
              const increment = stat.value / steps;
              const stepDuration = duration / steps;
              let currentStep = 0;

              const timer = setInterval(() => {
                currentStep++;
                const currentValue = Math.min(
                  Math.floor(increment * currentStep),
                  stat.value
                );

                setAnimatedValues((prev) => {
                  const newValues = [...prev];
                  newValues[index] = currentValue;
                  return newValues;
                });

                if (currentStep >= steps) {
                  // Ensure final value is exact
                  setAnimatedValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = stat.value;
                    return newValues;
                  });
                  clearInterval(timer);
                }
              }, stepDuration);
            });
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasAnimated, statistics]);

  // ScrollTrigger for positioning Statistics over ProjectShowcase
  // Bu faqat ProjectShowcase scroll masofasiga qadar ishlaydi va boshqa sectionlarga ta'sir qilmaydi
  // Mobile da bu effect o'chiriladi
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Mobile da ScrollTrigger effect-ni o'chirish
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobile) {
      // Mobile da normal holatda qoldirish
      gsap.set(section, {
        marginTop: '0px',
        zIndex: 1,
      });
      return;
    }

    let scrollTrigger = null;

    const checkAndInit = () => {
      if (window.__introComplete) {
        const projectShowcaseSection = document.getElementById('portfolio');
        if (!projectShowcaseSection) {
          setTimeout(checkAndInit, 100);
          return;
        }

        const viewportHeight = window.innerHeight;
        const totalProjects = 4; // ProjectShowcase-dagi projectlar soni
        const scrollMultiplier = 0.3;
        const projectShowcaseScrollDistance = viewportHeight * totalProjects * scrollMultiplier;

        // Calculate ProjectShowcase section end position
        const projectShowcaseStart = projectShowcaseSection.offsetTop;
        const projectShowcaseEnd = projectShowcaseStart + projectShowcaseScrollDistance;

        scrollTrigger = ScrollTrigger.create({
          trigger: projectShowcaseSection,
          start: 'top top',
          end: () => `+=${projectShowcaseScrollDistance}`,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1, // Higher priority - refresh before AwardsAndPartners
          onUpdate: (self) => {
            const progress = self.progress;
            // ProjectShowcase scroll davomida Statistics-ni ustiga chiqaradi
            // Scroll tugagandan keyin normal holatga qaytadi
            const negativeMargin = -projectShowcaseScrollDistance * (1 - progress);
            gsap.set(section, {
              marginTop: `${negativeMargin}px`,
            });
          },
          onLeave: () => {
            // ProjectShowcase scroll tugagandan keyin Statistics normal holatga qaytadi
            // Va keyingi sectionlarga ta'sir qilmasligi uchun marginTop 0 qilamiz
            gsap.set(section, {
              marginTop: '0px',
              clearProps: 'marginTop', // Clear props to prevent conflicts
            });
            // Ensure AwardsAndPartners is not affected by refreshing its ScrollTrigger
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 0);
          },
          onEnterBack: () => {
            // Orqaga scroll qilganda yana negative margin qo'llanadi
            gsap.set(section, {
              marginTop: `-${projectShowcaseScrollDistance}px`,
            });
          },
        });

        // Initial positioning - faqat ProjectShowcase scroll masofasiga qadar
        gsap.set(section, {
          marginTop: `-${projectShowcaseScrollDistance}px`,
          zIndex: 20,
        });
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    const timer = setTimeout(checkAndInit, 200);

    // Handle window resize
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024;
      if (currentIsMobile && scrollTrigger) {
        // Mobile ga o'tsa ScrollTrigger-ni o'chirish
        scrollTrigger.kill();
        scrollTrigger = null;
        gsap.set(section, {
          marginTop: '0px',
          clearProps: 'marginTop',
          zIndex: 1,
        });
      } else if (!currentIsMobile) {
        if (scrollTrigger) {
          ScrollTrigger.refresh();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      // Cleanup - marginTop-ni tozalash
      if (section) {
        gsap.set(section, {
          marginTop: '0px',
          clearProps: 'marginTop',
        });
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-white relative overflow-hidden py-8 lg:py-0"
      style={{
        position: 'relative',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-4">
          {/* Left side - 2 cards side by side */}
          <div className="flex flex-row gap-2 sm:gap-4 w-full lg:w-auto justify-center lg:justify-start overflow-x-auto lg:overflow-visible scrollbar-hide">
            {statistics.slice(0, 2).map((stat, index) => (
              <div
                key={index}
                className="relative w-[160px] sm:w-[180px] md:w-[220px] lg:w-[256px] h-[240px] sm:h-[280px] md:h-[350px] lg:h-[412px] overflow-hidden group shrink-0"
                style={{
                  borderTopLeftRadius: '200px',
                  borderTopRightRadius: '200px',
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={stat.image}
                    alt={t(stat.labelKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 256px"
                  />
                </div>
                
                {/* Gradient overlay with backdrop filter - image visible at top, white at bottom merging with section */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
              
                  }}
                />
                
                {/* Content - positioned at bottom with padding */}
                <div 
                  className="relative h-full flex flex-col items-center justify-end text-center p-3 sm:p-4 md:p-5 lg:p-6"
                >
                  <div 
                    className="mb-2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[112px]"
                    style={{
                      color: '#00382F',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: '1',
                      letterSpacing: '-2%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    {animatedValues[index]}
                  </div>
                  <div 
                    className="uppercase text-xs sm:text-sm md:text-base lg:text-[20px]"
                    style={{
                      color: '#00382F',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: '1.3',
                      letterSpacing: '-2%',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      minHeight: '2.5em',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {t(stat.labelKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Logo */}
          <div className="w-full sm:w-[200px] lg:w-[280px] flex items-center justify-center px-4 lg:px-8 py-4 lg:py-0">
            <Image
              src="/images/logo_gray.png"
              alt="Mizan Logo"
              width={158.85}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Right side - 2 cards side by side */}
          <div className="flex flex-row gap-2 sm:gap-4 w-full lg:w-auto justify-center lg:justify-start overflow-x-auto lg:overflow-visible scrollbar-hide">
            {statistics.slice(2, 4).map((stat, index) => (
              <div
                key={index + 2}
                className="relative w-[160px] sm:w-[180px] md:w-[220px] lg:w-[256px] h-[240px] sm:h-[280px] md:h-[350px] lg:h-[412px] overflow-hidden group shrink-0"
                style={{
                  borderTopLeftRadius: '200px',
                  borderTopRightRadius: '200px',
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={stat.image}
                    alt={t(stat.labelKey)}
                    fill
                    className="object-cover align-middle"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 256px"
                  />
                </div>
                
                {/* Gradient overlay with backdrop filter - image visible through overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
                  }}
                />
                
                {/* Content - positioned at bottom with padding */}
                <div 
                  className="relative h-full flex flex-col items-center justify-end text-center p-3 sm:p-4 md:p-5 lg:p-6"
                >
                  <div 
                    className="mb-2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[112px]"
                    style={{
                      color: '#00382F',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: '1',
                      letterSpacing: '-2%',
                      textAlign: 'center',
                    }}
                  >
                    {animatedValues[index + 2]}
                  </div>
                  <div 
                    className="uppercase text-xs sm:text-sm md:text-base lg:text-[20px]"
                    style={{
                      color: '#00382F',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: '1.3',
                      letterSpacing: '-2%',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      minHeight: '2.5em',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {t(stat.labelKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
