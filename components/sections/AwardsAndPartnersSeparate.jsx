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
    website: "https://uza.uz/oz/posts/shaharsoz-2022-tanlovi-goliblari-taqdirlandi_426626",
  },
  {
    id: 1,
    name: "ME'-MOR 2025",
    logo: "/images/awards/meFor.png",
    width: 147,
    height: 138,
    hasBackground: true,
    website: " https://memorcontest.uz/winners",
  },
  {
    id: 2,
    name: "UGA",
    logo: "/images/awards/uga.png",
    width: 215,
    height: 95,
    hasBackground: true,
    website: "https://undergraduateawards.com/",
  },
  {
    id: 4,
    name: "IFC",
    logo: "/images/awards/ifc.png",
    width: 190,
    height: 79,
    hasBackground: true,
    website: "https://www.ifc.org/en/home",
  },
  {
    id: 5,
    name: "MASA",
    logo: "/images/awards/world.png",
    width: 130,
    height: 111,
    hasBackground: true,
    website: "  https://www.maca.ru/itogi-xxxiii-mezhdunarodnogo-smotra-konkursa-masa-na-luchshuyu-proektnuyu-i-realizovannuyu-rabotu-postroiku-astana-09-12-oktyabrya-2025.html",
  },
  {
    id: 6,
    name: "ME'-MOR 2023",
    logo: "/images/awards/memor2023.png",
    width: 147,
    height: 138,
    hasBackground: true,
    website: "https://example.com/memor",
  },
  {
    id: 7,
    name: "IAAC",
    logo: "/images/awards/iaas.png",
    width: 183,
    height: 69,
    hasBackground: true,
    website: "https://iaac.net/",
  },


];

const partners = [
  {
    id: 0,
    name: "Wendy's",
    logo: "/images/partners/1.png",
    width: 176,
    height: 147,
    hasBackground: true,
    bgColor: "",
    website: "https://www.wendys.com/Home",
  },
  {
    id: 1,
    name: "SQB",
    logo: "/images/partners/2.png",
    width: 128,
    height: 145,
    hasBackground: true,
    bgColor: "",
    website: "https://sqb.uz/uz/homepage/",
  },
  {
    id: 2,
    name: "UZTELECOM ",
    logo: "/images/partners/3.png",
    width: 161,
    height: 140,
    hasBackground: true,
    bgColor: "",
    website: "https://uztelecom.uz/ru",
  },
  {
    id: 4,
    name: "DISCOVER INVEST",
    logo: "/images/partners/4.png",
    width: 170,
    height: 145,
    hasBackground: true,
    bgColor: "",
    website: "https://di.uz/",
  },
  {
    id: 5,
    name: "AHK WORLDWIDE",
    logo: "/images/partners/5.png",
    width: 161,
    height: 115,
    hasBackground: true,
    bgColor: "",
    website: "https://www.ahk.com.tr/",
  },
  {
    id: 6,
    name: "KOÇ CONSTRUCTION",
    logo: "/images/partners/6.png",
    width: 208,
    height: 91,
    hasBackground: true,
    bgColor: "",
    website: "https://kocconstruction.com/",
  },
  {
    id: 7,
    name: "PRIME TOWER",
    logo: "/images/partners/7.png",
    width: 195,
    height: 59,
    hasBackground: true,
    bgColor: "",
    website: "https://primetower.uz/",
  },
  


];

export default function AwardsAndPartnersSeparate() {
  const { t } = useTranslation();
  const awardsSectionRef = useRef(null);
  const partnersSectionRef = useRef(null);
  const awardsContainerRef = useRef(null);
  const partnersContainerRef = useRef(null);
  const awardsPinRef = useRef(null);
  const partnersPinRef = useRef(null);

  useEffect(() => {
    const awardsSection = awardsSectionRef.current;
    const partnersSection = partnersSectionRef.current;
    const awardsContainer = awardsContainerRef.current;
    const partnersContainer = partnersContainerRef.current;
    const awardsPin = awardsPinRef.current;
    const partnersPin = partnersPinRef.current;

    if (!awardsSection || !partnersSection || !awardsContainer || !partnersContainer || !awardsPin || !partnersPin) return;

    let awardsCtx = null;
    let partnersCtx = null;
    let awardsScrollTrigger = null;
    let partnersScrollTrigger = null;
    let overlayScrollTrigger = null;

    const checkAndInit = () => {
      if (window.__introComplete) {
        const isMobile = window.innerWidth < 1024; // lg breakpoint

        // Mobile: Simple horizontal scroll (no ScrollTrigger)
        if (isMobile) {
          // Reset any transforms
          gsap.set(awardsContainer, { x: 0 });
          gsap.set(partnersContainer, { x: 0 });
          
          // Check if scrolling is needed on mobile
          const awardsMaxScrollMobile = awardsContainer.scrollWidth - awardsContainer.clientWidth;
          const partnersMaxScrollMobile = partnersContainer.scrollWidth - partnersContainer.clientWidth;
          
          // Center containers that don't need scrolling
          if (awardsMaxScrollMobile <= 0) {
            awardsContainer.style.justifyContent = 'center';
          } else {
            awardsContainer.style.justifyContent = 'flex-start';
            awardsContainer.style.overflowX = 'auto';
          }
          
          if (partnersMaxScrollMobile <= 0) {
            partnersContainer.style.justifyContent = 'center';
          } else {
            partnersContainer.style.justifyContent = 'flex-start';
            partnersContainer.style.overflowX = 'auto';
          }
          
          // Remove any borders/outlines that might cause lines
          awardsContainer.style.outline = 'none';
          awardsContainer.style.border = 'none';
          awardsContainer.style.boxShadow = 'none';
          awardsContainer.style.overflowY = 'hidden';
          
          partnersContainer.style.outline = 'none';
          partnersContainer.style.border = 'none';
          partnersContainer.style.boxShadow = 'none';
          partnersContainer.style.overflowY = 'hidden';
          
          return; // Don't create ScrollTrigger on mobile
        }

        // Desktop: Separate ScrollTriggers for Awards and Partners
        const pinType = "transform";

        // Set initial transforms
        gsap.set(awardsContainer, { x: 0, force3D: true });
        gsap.set(partnersContainer, { x: 0, force3D: true });

        // Awards Section ScrollTrigger
        awardsCtx = gsap.context(() => {
          const viewportHeight = window.innerHeight;
          const scrollDistancePerItem = viewportHeight * 0.05;

          // Calculate scroll distances for awards
          const getAwardsMaxScroll = () => {
            awardsContainer.offsetHeight;
            return awardsContainer.scrollWidth - awardsContainer.clientWidth;
          };

          const awardsMaxScroll = getAwardsMaxScroll();
          const awardsNeedsScroll = awardsMaxScroll > 0;

          if (!awardsNeedsScroll) {
            gsap.set(awardsContainer, { x: 0 });
            awardsContainer.style.justifyContent = 'center';
            return;
          }

          awardsContainer.style.justifyContent = 'flex-start';
          awardsContainer.style.outline = 'none';
          awardsContainer.style.border = 'none';
          awardsContainer.style.boxShadow = 'none';

          const awardsScrollDistance = awards.length * scrollDistancePerItem;

          awardsScrollTrigger = ScrollTrigger.create({
            trigger: awardsSection,
            start: "top top",
            end: () => `+=${awardsScrollDistance}`,
            pin: awardsPin,
            pinType: pinType,
            pinReparent: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: true,
            scrub: 1,
            refreshPriority: 0,
            onEnter: () => {
              setTimeout(() => {
                const pinSpacer = awardsSection.nextElementSibling;
                if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                }
              }, 0);
            },
            onLeave: () => {
              setTimeout(() => {
                const pinSpacer = awardsSection.nextElementSibling;
                if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                  pinSpacer.style.height = '0';
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                  pinSpacer.style.paddingTop = '0';
                  pinSpacer.style.paddingBottom = '0';
                  pinSpacer.style.overflow = 'hidden';
                }
              }, 0);
            },
            onEnterBack: () => {
              setTimeout(() => {
                const pinSpacer = awardsSection.nextElementSibling;
                if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                  pinSpacer.style.overflow = 'visible';
                }
              }, 0);
            },
            onUpdate: (self) => {
              const progress = self.progress;

              const pinSpacer = awardsSection.nextElementSibling;
              if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                if (progress >= 0.99) {
                  pinSpacer.style.height = '0';
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                } else {
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                }
              }

              gsap.set(awardsContainer, {
                x: -awardsMaxScroll * progress,
              });
            },
          });

          // Partners section overlay on Awards pin space
          // Track Awards scroll and apply negative margin to Partners
          if (awardsNeedsScroll) {
            overlayScrollTrigger = ScrollTrigger.create({
              trigger: awardsSection,
              start: 'top top',
              end: () => `+=${awardsScrollDistance}`,
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: 0,
              onUpdate: (self) => {
                const progress = self.progress;
                const negativeMargin = -awardsScrollDistance * (1 - progress);
                gsap.set(partnersSection, {
                  marginTop: `${negativeMargin}px`,
                  zIndex: 20,
                });
              },
              onLeave: () => {
                gsap.set(partnersSection, {
                  marginTop: '0px',
                  clearProps: 'marginTop',
                  zIndex: 1,
                });
                setTimeout(() => {
                  ScrollTrigger.refresh();
                }, 0);
              },
              onEnterBack: () => {
                gsap.set(partnersSection, {
                  marginTop: `-${awardsScrollDistance}px`,
                  zIndex: 20,
                });
              },
            });

            gsap.set(partnersSection, {
              marginTop: `-${awardsScrollDistance}px`,
              zIndex: 20,
            });
          }
        }, awardsPin);

        // Partners Section ScrollTrigger
        partnersCtx = gsap.context(() => {
          const viewportHeight = window.innerHeight;
          const scrollDistancePerItem = viewportHeight * 0.05;

          // Calculate scroll distances for partners
          const getPartnersMaxScroll = () => {
            partnersContainer.offsetHeight;
            return partnersContainer.scrollWidth - partnersContainer.clientWidth;
          };

          const partnersMaxScroll = getPartnersMaxScroll();
          const partnersNeedsScroll = partnersMaxScroll > 0;

          if (!partnersNeedsScroll) {
            gsap.set(partnersContainer, { x: 0 });
            partnersContainer.style.justifyContent = 'center';
            return;
          }

          partnersContainer.style.justifyContent = 'flex-start';
          partnersContainer.style.outline = 'none';
          partnersContainer.style.border = 'none';
          partnersContainer.style.boxShadow = 'none';

          const partnersScrollDistance = partners.length * scrollDistancePerItem;

          partnersScrollTrigger = ScrollTrigger.create({
            trigger: partnersSection,
            start: "top top",
            end: () => `+=${partnersScrollDistance}`,
            pin: partnersPin,
            pinType: pinType,
            pinReparent: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: true,
            scrub: 1,
            refreshPriority: 0,
            onEnter: () => {
              setTimeout(() => {
                const pinSpacer = partnersSection.nextElementSibling;
                if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                }
              }, 0);
            },
            onLeave: () => {
              setTimeout(() => {
                const pinSpacer = partnersSection.nextElementSibling;
                if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                  pinSpacer.style.height = '0';
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                  pinSpacer.style.paddingTop = '0';
                  pinSpacer.style.paddingBottom = '0';
                  pinSpacer.style.overflow = 'hidden';
                }
              }, 0);
            },
            onEnterBack: () => {
              setTimeout(() => {
                const pinSpacer = partnersSection.nextElementSibling;
                if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                  pinSpacer.style.overflow = 'visible';
                }
              }, 0);
            },
            onUpdate: (self) => {
              const progress = self.progress;

              const pinSpacer = partnersSection.nextElementSibling;
              if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                if (progress >= 0.99) {
                  pinSpacer.style.height = '0';
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                } else {
                  pinSpacer.style.marginTop = '0';
                  pinSpacer.style.marginBottom = '0';
                }
              }

              gsap.set(partnersContainer, {
                x: -partnersMaxScroll * progress,
              });
            },
          });
        }, partnersPin);

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
      if (awardsCtx) {
        awardsCtx.revert();
      }
      if (partnersCtx) {
        partnersCtx.revert();
      }
      if (awardsScrollTrigger) {
        awardsScrollTrigger.kill();
      }
      if (partnersScrollTrigger) {
        partnersScrollTrigger.kill();
      }
      if (overlayScrollTrigger) {
        overlayScrollTrigger.kill();
      }
      if (partnersSection) {
        gsap.set(partnersSection, {
          marginTop: '0px',
          clearProps: 'marginTop',
          zIndex: 1,
        });
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === awardsSection || trigger.vars.trigger === partnersSection) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      {/* Awards Section - Separate Pinned */}
      <section
        ref={awardsSectionRef}
        className="relative overflow-hidden w-full"
        style={{
          backgroundColor: "#00382F",
          overscrollBehaviorX: "none",
          overscrollBehaviorY: "auto",
          marginBottom: 0,
        }}
      >
        <div
          ref={awardsPinRef}
          className="w-full"
          style={{
            willChange: "transform",
            overscrollBehaviorX: "none",
            overscrollBehaviorY: "auto",
          }}
        >
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
              className="flex gap-4 w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 overflow-x-auto lg:overflow-x-visible scrollbar-hide"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
                outline: "none",
                border: "none",
                boxShadow: "none",
                marginRight: "0",
                marginLeft: "0",
              }}
            >
              {awards.map((award) => {
                const CardContent = (
                  <div
                    className={`flex flex-col shrink-0 min-h-[280px] ${award.website ? 'cursor-pointer' : ''}`}
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
                          {award.name || t("awards.internationalAwards")}
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
                );

                return award.website ? (
                  <a
                    key={award.id}
                    href={award.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                    style={{ display: 'contents' }}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div key={award.id}>{CardContent}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Separate Pinned */}
      <section
        id="partners-section"
        ref={partnersSectionRef}
        className="relative overflow-hidden w-full"
        style={{
          backgroundColor: "#00382F",
          overscrollBehaviorX: "none",
          overscrollBehaviorY: "auto",
          marginBottom: 0,
          position: 'relative',
        }}
      >
        <div
          ref={partnersPinRef}
          className="w-full"
          style={{
            willChange: "transform",
            overscrollBehaviorX: "none",
            overscrollBehaviorY: "auto",
          }}
        >
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
              {t("sections.partners")}
            </h2>

            {/* Horizontal Scrollable Container */}
            <div
              data-partners-container
              ref={partnersContainerRef}
              className="flex gap-4 w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 overflow-x-auto lg:overflow-x-visible scrollbar-hide"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
                outline: "none",
                border: "none",
                boxShadow: "none",
                marginRight: "0",
                marginLeft: "0",
              }}
            >
              {partners.map((partner) => {
                const CardContent = (
                  <div
                    className={`flex flex-col shrink-0 min-h-[280px] ${partner.website ? 'cursor-pointer' : ''}`}
                    style={{ width: partner.hasBackground ? "256px" : "280px" }}
                  >
                    {partner.hasBackground ? (
                      <>
                        {/* Colored Container with Rounded Top - Fixed 256x256 */}
                        <div
                          className="rounded-b-lg overflow-hidden mb-4"
                          style={{
                            borderTopLeftRadius: "200px",
                            borderTopRightRadius: "200px",
                            width: "256px",
                            height: "256px",
                            backgroundColor: partner.bgColor || "#FFFFFF",
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
                          {partner.name || t("awards.internationalAwards")}
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
                );

                return partner.website ? (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                    style={{ display: 'contents' }}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div key={partner.id}>{CardContent}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

