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

export default function Awards() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !container || !scrollContainer) return;

    let ctx = null;
    let scrollTrigger = null;

    const checkAndInit = () => {
      if (window.__introComplete) {
        const pinType = "transform";

        // Set initial transform for better performance
        gsap.set(scrollContainer, {
          x: 0,
          force3D: true,
        });

        ctx = gsap.context(() => {
          // Calculate max scroll distance - use callback for dynamic calculation
          const getMaxScroll = () => {
            scrollContainer.offsetHeight; // Force layout recalculation
            return scrollContainer.scrollWidth - scrollContainer.clientWidth;
          };

          const viewportHeight = window.innerHeight;
          const scrollDistancePerAward = viewportHeight* 0.05;
          const totalScrollDistance = awards.length * scrollDistancePerAward;

          // Create GSAP animation for smooth horizontal scroll
          const scrollAnimation = gsap.to(scrollContainer, {
            x: () => -getMaxScroll(),
            ease: "none",
            scrollTrigger: {
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
            },
          });

          scrollTrigger = scrollAnimation.scrollTrigger;
        }, scrollContainer);

        // Refresh ScrollTrigger after setup
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
        backgroundColor: "transparent",
        overscrollBehaviorX: "none",
        overscrollBehaviorY: "auto",
      }}
    >
      <div
        ref={containerRef}
        className="w-full flex flex-col py-12 md:py-16 lg:py-24"
        style={{
          height: "660px",
          backgroundColor: "#00382F",
          willChange: "transform",
          overscrollBehaviorX: "none",
          overscrollBehaviorY: "auto",
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
          ref={scrollContainerRef}
          className="flex mr-4 gap-4 w-full pl-4 sm:pl-6 lg:pl-8"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {awards.map((award) => (
            <div
              key={award.id}
              className="flex flex-col shrink-0 w-[280px] min-h-[280px]"
            >
              {award.hasBackground ? (
                <>
                  {/* White Container with Rounded Top - Fixed 280x280 */}
                  <div
                    className="bg-white rounded-b-lg overflow-hidden mb-4"
                    style={{
                      borderTopLeftRadius: "200px",
                      borderTopRightRadius: "200px",
                      width: "280px",
                      height: "280px",
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

                  {/* Text below - White on dark green */}
                  <p
                    className="text-sm md:text-base text-white text-center"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
                  >
                    {t("awards.internationalAwards")}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

