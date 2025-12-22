"use client";
import { useTranslation } from "@/contexts/TranslationContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const awards = [
  {
    id: 0,
    name: "SHAHAR SOZ 2025",
    logo: "/images/awards/shaharsoz.png",
    width: 230,
    height: 102,
    hasBackground: true,
  },
  {
    id: 1,
    name: "ME'-MOR 2025",
    logo: "/images/awards/meFor.png",
    width: 147,
    height: 138,
    hasBackground: true,
  },
  {
    id: 2,
    name: "SHAHAR SOZ 2025",
    logo: "/images/awards/shaharsoz.png",
    width: 230,
    height: 102,
    hasBackground: true,
  },
  {
    id: 3,
    name: "mizan",
    logo: "/images/logo.svg",
    width: 177,
    height: 71,
    hasBackground: false,
  },
  {
    id: 4,
    name: "IFC",
    logo: "/images/awards/ifc.png",
    width: 177,
    height: 71,
    hasBackground: true,
  },
  {
    id: 5,
    name: "Award",
    logo: "/images/awards/world.png",
    width: 130,
    height: 111,
    hasBackground: true,
  },
  {
    id: 6,
    name: "ME'-MOR 2025",
    logo: "/images/awards/meFor.png",
    width: 147,
    height: 138,
    hasBackground: true,
  },
  {
    id: 7,
    name: "SHAHAR SOZ 2025",
    logo: "/images/awards/shaharsoz.png",
    width: 230,
    height: 102,
    hasBackground: true,
  },
  {
    id: 8,
    name: "IFC",
    logo: "/images/awards/ifc.png",
    width: 177,
    height: 71,
    hasBackground: true,
  },
  {
    id: 9,
    name: "Award",
    logo: "/images/awards/world.png",
    width: 130,
    height: 111,
    hasBackground: true,
  },
];

const partners =  [
    {
      id: 0,
      name: "SHAHAR SOZ 2025",
      logo: "/images/awards/shaharsoz.png",
      width: 230,
      height: 102,
      hasBackground: true,
    },
    {
      id: 1,
      name: "ME'-MOR 2025",
      logo: "/images/awards/meFor.png",
      width: 147,
      height: 138,
      hasBackground: true,
    },
    {
      id: 2,
      name: "SHAHAR SOZ 2025",
      logo: "/images/awards/shaharsoz.png",
      width: 230,
      height: 102,
      hasBackground: true,
    },
    {
      id: 3,
      name: "mizan",
      logo: "/images/logo.svg",
      width: 177,
      height: 71,
      hasBackground: false,
    },
    {
      id: 4,
      name: "IFC",
      logo: "/images/awards/ifc.png",
      width: 177,
      height: 71,
      hasBackground: true,
    },
    {
      id: 5,
      name: "Award",
      logo: "/images/awards/world.png",
      width: 130,
      height: 111,
      hasBackground: true,
    },
    {
      id: 6,
      name: "ME'-MOR 2025",
      logo: "/images/awards/meFor.png",
      width: 147,
      height: 138,
      hasBackground: true,
    },
    {
      id: 7,
      name: "SHAHAR SOZ 2025",
      logo: "/images/awards/shaharsoz.png",
      width: 230,
      height: 102,
      hasBackground: true,
    },
    {
      id: 8,
      name: "IFC",
      logo: "/images/awards/ifc.png",
      width: 177,
      height: 71,
      hasBackground: true,
    },
    {
      id: 9,
      name: "Award",
      logo: "/images/awards/world.png",
      width: 130,
      height: 111,
      hasBackground: true,
    },
  ];

export default function AwardsAndPartners() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const awardsContainerRef = useRef(null);
  const partnersContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const awardsContainer = awardsContainerRef.current;
    const partnersContainer = partnersContainerRef.current;

    if (!section || !container || !awardsContainer || !partnersContainer) return;

    let ctx = null;
    let scrollTrigger = null;

    const checkAndInit = () => {
      if (window.__introComplete) {
          const isMobile = window.innerWidth < 1024; // lg breakpoint

        // Mobile: Simple horizontal scroll (no ScrollTrigger)
        if (isMobile) {
          // Reset any transforms
          gsap.set(awardsContainer, { x: 0 });
          gsap.set(partnersContainer, { x: 0 });
          
          // Enable native horizontal scroll
          awardsContainer.style.overflowX = 'auto';
          partnersContainer.style.overflowX = 'auto';
          awardsContainer.style.overflowY = 'hidden';
          partnersContainer.style.overflowY = 'hidden';
          
          return; // Don't create ScrollTrigger on mobile
        }

        // Desktop: Use ScrollTrigger for vertical scroll with horizontal animation
        const pinType = "transform";

        // Set initial transforms
        gsap.set(awardsContainer, { x: 0, force3D: true });
        gsap.set(partnersContainer, { x: 0, force3D: true });

        ctx = gsap.context(() => {
          const viewportHeight = window.innerHeight;
          const scrollDistancePerItem = viewportHeight * 0.2;

          // Calculate scroll distances
          const getAwardsMaxScroll = () => {
            awardsContainer.offsetHeight;
            return awardsContainer.scrollWidth - awardsContainer.clientWidth;
          };

          const getPartnersMaxScroll = () => {
            partnersContainer.offsetHeight;
            return partnersContainer.scrollWidth - partnersContainer.clientWidth;
          };

          const awardsScrollDistance = awards.length * scrollDistancePerItem;
          const gapScrollDistance = viewportHeight * 0.3; // Gap uchun scroll masofa (Partners ko'rinishi uchun)
          const partnersScrollDistance = partners.length * scrollDistancePerItem;
          const totalScrollDistance = awardsScrollDistance + gapScrollDistance + partnersScrollDistance;

          const awardsMaxScroll = getAwardsMaxScroll();
          const partnersMaxScroll = getPartnersMaxScroll();

          // Calculate progress thresholds
          const awardsProgressEnd = awardsScrollDistance / totalScrollDistance;
          const gapProgressEnd = (awardsScrollDistance + gapScrollDistance) / totalScrollDistance;

          // Create ScrollTrigger with onUpdate for sequential scroll
          scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${totalScrollDistance}`,
            pin: container,
            pinType: pinType,
            pinReparent: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              if (progress <= awardsProgressEnd) {
                // Awards section scrolling
                const awardsProgress = progress / awardsProgressEnd;
                gsap.set(awardsContainer, {
                  x: -awardsMaxScroll * awardsProgress,
                });
                gsap.set(partnersContainer, { x: 0 });
              } else if (progress <= gapProgressEnd) {
                // Gap period - Awards fully scrolled, Partners visible but not scrolling yet
                gsap.set(awardsContainer, { x: -awardsMaxScroll });
                gsap.set(partnersContainer, { x: 0 });
              } else {
                // Partners section scrolling (left scroll - negative x)
                gsap.set(awardsContainer, { x: -awardsMaxScroll });
                const partnersProgress = (progress - gapProgressEnd) / (1 - gapProgressEnd);
                gsap.set(partnersContainer, {
                  x: -partnersMaxScroll * partnersProgress,
                });
              }
            },
          });
        }, container);

        // Refresh ScrollTrigger after setup (desktop only)
        if (!isMobile) {
          const smoother =
            window.ScrollSmootherInstance ||
            (window.ScrollSmoother?.get && window.ScrollSmoother.get());

          if (smoother) {
            setTimeout(() => {
              try {
                ScrollTrigger.refresh();
                smoother.refresh();
              } catch (e) {
                console.warn("Error refreshing ScrollSmoother:", e);
              }
            }, 200);
          } else {
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 150);
          }
        }
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    const timer = setTimeout(checkAndInit, 200);

    return () => {
      clearTimeout(timer);
      if (ctx) {
        ctx.revert();
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full"
      style={{
        backgroundColor: "#00382F",
        overscrollBehaviorX: "none",
        overscrollBehaviorY: "auto",
      }}
    >
      <div
        ref={containerRef}
        className="w-full"
        style={{
          willChange: "transform",
          overscrollBehaviorX: "none",
          overscrollBehaviorY: "auto",
        }}
      >
        {/* Awards Section */}
        <div
          className="flex flex-col pt-12 md:pt-16"
          style={{
            backgroundColor: "#00382F",
          }}
        >
          {/* Title */}
          <h2
            className="text-white text-center mb-16"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 300,
              fontSize: "36px",
              lineHeight: "115%",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            {t("sections.awards")}
          </h2>

          {/* Horizontal Scrollable Container */}
          <div
            ref={awardsContainerRef}
            className="flex mr-4 gap-4 w-full pl-4 sm:pl-6 lg:pl-8 overflow-x-auto lg:overflow-x-visible scrollbar-hide"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            {awards.map((award) => (
            <div
              key={award.id}
              className="flex flex-col shrink-0 min-h-[280px]"
              style={{ width: award.hasBackground ? "256px" : "280px" }}
            >
              {award.hasBackground ? (
                <>
                  {/* White Container with Rounded Top - Fixed 256x256 */}
                  <div
                    className="bg-white rounded-b-lg overflow-hidden mb-4"
                    style={{
                      borderTopLeftRadius: "200px",
                      borderTopRightRadius: "200px",
                      width: "256px",
                      height: "256px",
                    }}
                  >
                      {/* Logo Container */}
                      <div className="w-full h-full flex items-center justify-center pt-[60px]">
                        <Image
                          src={award.logo}
                          alt={award.name}
                          width={award.width}
                          height={award.height}
                          className="object-contain"
                        />
                      </div>
                    </div>

                  {/* Text below - White on dark green */}
                  <p
                    className="text-white text-center"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "115%",
                      letterSpacing: "-0.02em",
                      textAlign: "center",
                    }}
                  >
                    {t("awards.internationalAwards")}
                  </p>
                  </>
                ) : (
                  <>
                    {/* Logo without background */}
                    <div
                      className="w-full flex items-center justify-center mb-4"
                      style={{
                        height: "280px",
                      }}
                    >
                      <Image
                        src={award.logo}
                        alt={award.name}
                        width={award.width}
                        height={award.height}
                        className="object-contain"
                      />
                    </div>

         
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div
          className="flex flex-col pt-12 md:pt-16 "
          style={{
            backgroundColor: "#00382F",
          }}
        >
          {/* Title */}
          <h2
            className="text-white text-center mb-16"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 300,
              fontSize: "36px",
              lineHeight: "115%",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            {t("sections.partners")}
          </h2>

          {/* Horizontal Scrollable Container */}
          <div
            ref={partnersContainerRef}
            className="flex mr-4 gap-4 w-full pl-4 sm:pl-6 lg:pl-8 overflow-x-auto lg:overflow-x-visible scrollbar-hide"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col shrink-0 min-h-[280px]"
              style={{ width: partner.hasBackground ? "256px" : "280px" }}
            >
              {partner.hasBackground ? (
                <>
                  {/* White Container with Rounded Top - Fixed 256x256 */}
                  <div
                    className="bg-white rounded-b-lg overflow-hidden mb-4"
                    style={{
                      borderTopLeftRadius: "200px",
                      borderTopRightRadius: "200px",
                      width: "256px",
                      height: "256px",
                    }}
                  >
                      {/* Logo Container */}
                      <div className="w-full h-full flex items-center justify-center pt-[60px]">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={partner.width}
                          height={partner.height}
                          className="object-contain"
                        />
                      </div>
                    </div>

                  {/* Text below - White on dark green */}
                  <p
                    className="text-white text-center"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "115%",
                      letterSpacing: "-0.02em",
                      textAlign: "center",
                    }}
                  >
                    {t("awards.internationalAwards")}
                  </p>
                  </>
                ) : (
                  <>
                    {/* Logo without background */}
                    <div
                      className="w-full flex items-center justify-center mb-4"
                      style={{
                        height: "280px",
                      }}
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={partner.width}
                        height={partner.height}
                        className="object-contain"
                      />
                    </div>

                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

