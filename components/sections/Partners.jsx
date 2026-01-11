"use client";
import { useTranslation } from "@/contexts/TranslationContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const partners = [
  { id: 1, name: "Wendy's" },
  { id: 2, name: "SQB" },
  { id: 3, name: "UZTELECOM" },
  { id: 4, name: "DISCOVER INVEST" },
  { id: 5, name: "AHK WORLDWIDE" },
  { id: 6, name: "KOÇ CONSTRUCTION" },
  { id: 7, name: "PRIME TOWER" },
  { id: 8, name: "UZBEKISTAN AIRWAYS" },
  { id: 9, name: "ABOZOR" },
];

export default function Partners() {
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
          // Har bir partner uchun scroll masofa
          const scrollDistancePerPartner = viewportHeight * 0.05;
          const totalScrollDistance = partners.length * scrollDistancePerPartner;

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
          {t("sections.partners")}
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
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col shrink-0 w-[280px] min-h-[280px]"
            >
              {/* White Container with Rounded Top - Fixed 280x280 */}
              <div
                className="bg-white rounded-b-lg overflow-hidden mb-4 flex items-center justify-center"
                style={{
                  borderTopLeftRadius: "200px",
                  borderTopRightRadius: "200px",
                  width: "280px",
                  height: "280px",
                }}
              >
                {/* Partner Name */}
                <div className="text-center px-4">
                  <p
                    className="text-lg font-semibold text-gray-800"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
                  >
                    {partner.name}
                  </p>
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
