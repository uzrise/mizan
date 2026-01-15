"use client";
import { useTranslation } from "@/contexts/TranslationContext";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  {
    id: 1,
    name: "Zafarjon Raxmatov",
    roleKey: "team.chiefArchitect",
    image: "/images/team/1.png",
    experience: "6+",
    instagram: " https://www.instagram.com/rakhzaa/",
    telegram: " https://t.me/zakkomusic",
    linkedin: " https://www.linkedin.com/in/zafar-rahmatov-8b4a6b22a/",
    phone: "",
  },
  {
    id: 2,
    name: "Shahzod Rahmatov",
    roleKey: "team.leadDesigner",
    image: "/images/team/2.png",
    experience: "6+",
    
    instagram: "https://www.instagram.com/shakhzod_rakhmatov/",
    telegram: "https://t.me/Shakhzod_Rakhmatov ",
    linkedin: "https://www.linkedin.com/in/shahzod-rahmatov-213262175/",
    phone: "+998998771573",
  },
  {
    id: 3,
    name: "Abdulla Abdullayev",
    roleKey: "team.interiorDesigner",
    image: "/images/team/3.png",
    experience: "6+",
    instagram: "https://www.instagram.com/abdullayev_a21?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    telegram: "https://t.me/DoubleA",
    linkedin: "",
    phone: "+998936343555",
  },
  {
    id: 4,
    name: "Ibrohim Islomov",
    roleKey: "team.constructionEngineer",
    image: "/images/team/4.png",
    experience: "7+",  
    instagram: "https://www.instagram.com/ibrohimislom03/",
    telegram: "https://t.me/ibrohimislomov03",
    linkedin: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit",
    phone: "+998997920007",
  },
  {
    id: 5,
    name: "Ramziddin Muxutdinov",
    roleKey: "team.architectVisualizer",
    image: "/images/team/5.png",
    experience: "16+",
    instagram: "https://www.instagram.com/ramziddin_nizomiddin_ogli/",
    telegram: "https://t.me/Symboldesigner",
    linkedin: "",
    phone: "+998909542611",
  },
  {
    id: 6,
    name: "Aziz Omonov",
    roleKey: "team.constructionEngineer",
    image: "/images/team/6.png",
    experience: "8+",
    instagram: "https://www.instagram.com/azizomonov/",
    telegram: "https://t.me/AzizOmonov",
    linkedin: "",
    phone: "+998946831191",
  },
  {
    id: 7,
    name: "Xasan G’anixo’jayev",
    roleKey: "team.interiorDesigner",
    image: "/images/team/7.png",
    experience: "12+",

    instagram: "https://www.instagram.com/xasanganixojaev/ ",
    telegram: "https://t.me/Mizan_Xasan",
    linkedin: "",
    phone: "+998901234567",
  },

];

export default function Team() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const spacerRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ScrollTrigger for positioning Team over Partners (like Statistics overlays ProjectShowcase)
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

    let partnersOverlayTrigger = null;

    const checkAndInit = () => {
      if (window.__introComplete) {
        const viewportHeight = window.innerHeight;
        const useOverlayPattern = viewportHeight < 900; // Use overlay pattern for height < 900px

        // Faqat overlay pattern uchun ishlaydi
        if (!useOverlayPattern) {
          gsap.set(section, {
            marginTop: '0px',
            zIndex: 1,
          });
          return;
        }

        // Partners sectionni topish
        const partnersSection = document.getElementById('partners-section');
        if (!partnersSection) {
          setTimeout(checkAndInit, 100);
          return;
        }

        // Partners section scroll masofasini hisoblash
        // Partners scroll distance AwardsAndPartners komponentida hisoblanadi
        // Biz xuddi shu formulani ishlatamiz: partners.length * scrollDistancePerItem
        const scrollDistancePerItem = viewportHeight * 0.05;
        const partnersContainer = partnersSection.querySelector('[data-partners-container]');
        if (!partnersContainer) {
          setTimeout(checkAndInit, 100);
          return;
        }

        // Partners items soni (real DOM children length)
        const partnersCount = partnersContainer.children.length || 10;
        const partnersScrollDistance = partnersCount * scrollDistancePerItem;

        partnersOverlayTrigger = ScrollTrigger.create({
          trigger: partnersSection,
          start: 'top top',
          end: () => `+=${partnersScrollDistance}`,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 0,
          onUpdate: (self) => {
            const progress = self.progress;
            // Team overlays Partners during Partners scroll
            const negativeMargin = -partnersScrollDistance * (1 - progress);
            gsap.set(section, {
              marginTop: `${negativeMargin}px`,
              zIndex: 20,
            });
          },
          onLeave: () => {
            // Partners scroll tugagandan keyin Team normal holatga qaytadi
            gsap.set(section, {
              marginTop: '0px',
              clearProps: 'marginTop',
            });
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 0);
          },
          onEnterBack: () => {
            // Orqaga scroll qilganda yana negative margin qo'llanadi
            gsap.set(section, {
              marginTop: `-${partnersScrollDistance}px`,
            });
          },
        });

        // Initial positioning
        gsap.set(section, {
          marginTop: `-${partnersScrollDistance}px`,
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
      if (currentIsMobile && partnersOverlayTrigger) {
        // Mobile ga o'tsa ScrollTrigger-ni o'chirish
        partnersOverlayTrigger.kill();
        partnersOverlayTrigger = null;
        gsap.set(section, {
          marginTop: '0px',
          clearProps: 'marginTop',
          zIndex: 1,
        });
      } else if (!currentIsMobile) {
        if (partnersOverlayTrigger) {
          ScrollTrigger.refresh();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (partnersOverlayTrigger) {
        partnersOverlayTrigger.kill();
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

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !container || !scrollContainer) return;

    // Mobile da pin o'chiriladi va oddiy scroll qiladi
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobile) {
      // Mobile da oddiy scroll - ScrollTrigger yo'q
      gsap.set(scrollContainer, {
        x: 0,
        clearProps: "transform",
      });
      scrollContainer.style.transform = "none";
      scrollContainer.style.overflowX = "auto";
      scrollContainer.style.overflowY = "visible";
      scrollContainer.style.webkitOverflowScrolling = "touch";
      scrollContainer.style.willChange = "auto";
      return;
    }

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

          // Check if scroll is needed
          const maxScroll = getMaxScroll();

          // If no scroll is needed, center the items and remove spacer
          if (maxScroll <= 0) {
            scrollContainer.style.justifyContent = "center";
            scrollContainer.style.paddingLeft = "0";
            scrollContainer.style.paddingRight = "0";
            // Remove spacer if it exists
            if (spacerRef.current && spacerRef.current.parentNode) {
              spacerRef.current.parentNode.removeChild(spacerRef.current);
            }
            return; // Don't create ScrollTrigger
          }

          const viewportHeight = window.innerHeight;
          // Har bir team member uchun scroll masofa
          const scrollDistancePerMember = viewportHeight * 0.3;
          const totalScrollDistance = teamMembers.length * scrollDistancePerMember;

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

    // Handle window resize
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024;
      if (currentIsMobile) {
        // Mobile ga o'tsa ScrollTrigger-ni o'chirish
        if (scrollTrigger) {
          scrollTrigger.kill();
          scrollTrigger = null;
        }
        if (ctx) {
          ctx.revert();
          ctx = null;
        }
        gsap.set(scrollContainer, {
          x: 0,
          clearProps: "transform",
        });
        scrollContainer.style.transform = "none";
        scrollContainer.style.overflowX = "auto";
        scrollContainer.style.overflowY = "visible";
        scrollContainer.style.webkitOverflowScrolling = "touch";
        scrollContainer.style.willChange = "auto";
      } else {
        // Desktop ga o'tsa qayta init qilish
        if (!scrollTrigger && !ctx) {
          checkAndInit();
        } else if (scrollTrigger) {
          ScrollTrigger.refresh();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
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
        className="w-full flex flex-col py-12 md:py-16 lg:py-24 team-container"
        style={{
          backgroundColor: "#00382F",
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
          {t("sections.team")}
        </h2>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-0 overflow-x-auto lg:overflow-x-visible scrollbar-hide"
          style={{
            willChange: "transform",
            gap: "32px",
          }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col shrink-0"
              style={{
                width: "240px",
              }}
            >
              {/* Card with rounded corners */}
              <div
                className="rounded-lg text-center flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  width: "240px",
                  height: "300px",
                  backgroundColor: "#FFFFFF1C",
                  backdropFilter: "blur(4px)",
                  opacity: 1,
                  padding: "24px",
                }}
                onClick={() => {
                  setSelectedMember(member);
                  setIsModalOpen(true);
                }}
              >
                {/* Profile Image */}
                <div className="relative mb-4 rounded-full overflow-hidden " style={{ width: "160px", height: "160px" }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Name */}
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "115%",
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                  }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <p
                  className="text-white/70"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "115%",
                    letterSpacing: "0%",
                    textAlign: "center",
                  }}
                >
                  {t(member.roleKey)}
                </p>
              </div>
            </div>
          ))}
          {/* Spacer to ensure last item is fully visible - only when scroll is needed */}
         
        </div>
      </div>

      {/* Modal - Rendered via Portal */}
      {isModalOpen && selectedMember && typeof window !== "undefined" && createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative rounded-lg text-center flex flex-col items-center"
            style={{
              width: "360px",
              height: "488px",
              backgroundColor: "#fff",
              backdropFilter: "blur(4px)",
              opacity: 1,
              padding: "24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-black hover:text-gray-300 transition-colors"
              style={{
                fontSize: "24px",
                lineHeight: "1",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {/* Profile Image */}
            <div className="relative mb-4 rounded-full overflow-hidden " style={{ width: "200px", height: "200px" }}>
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name */}
            <h3
              className="p-4 mb-2"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "115%",
                letterSpacing: "-0.02em",
                textAlign: "center",
                color: "#344054",

              }}
            >
              {selectedMember.name}
            </h3>

            {/* Experience  */}
            <div className="space-y-1 mb-4" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>
              <div style={{ textAlign: "left" }}>
                <span style={{ 
                  color: "#98A2B3",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>
                  {t("team.role")}:{" "}
                </span>
                <span style={{ 
                  color: "#344054",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>
                  {t(selectedMember.roleKey)}
                </span>
              </div>
              <div style={{ textAlign: "left" }}>
                <span style={{ 
                  color: "#98A2B3",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>
                  {t("team.experience")}:{" "}
                </span>
                <span style={{ 
                  color: "#344054",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>
                  {selectedMember.experience} {t("team.years")}
                </span>
              </div>
              <div style={{ textAlign: "left" }}>


              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 py-5 justify-center">
              {selectedMember.instagram && (
                <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {selectedMember.telegram && (
                <a href={selectedMember.telegram} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM14.0889 6.02051C13.7127 6.02713 13.1355 6.22772 10.3584 7.38281C9.38572 7.78738 7.44148 8.62447 4.52637 9.89453C4.05312 10.0828 3.8048 10.2672 3.78223 10.4473C3.73931 10.7927 4.23731 10.9 4.86328 11.1035C5.37386 11.2695 6.06092 11.464 6.41797 11.4717C6.74172 11.4786 7.10305 11.3452 7.50195 11.0713C10.2257 9.23267 11.6324 8.30324 11.7207 8.2832C11.7829 8.26908 11.8694 8.25088 11.9277 8.30273C11.9862 8.35471 11.9798 8.45407 11.9736 8.48047C11.9204 8.69446 9.37006 11.0143 9.21875 11.1709C8.65612 11.7553 8.01591 12.1131 9.00293 12.7637C9.85713 13.3266 10.3545 13.6859 11.2344 14.2627C11.7967 14.6313 12.2379 15.0688 12.8184 15.0156C13.0856 14.991 13.3618 14.7396 13.502 13.9902C13.8332 12.2192 14.4843 8.38202 14.6348 6.80078C14.6479 6.66226 14.6315 6.48507 14.6182 6.40723C14.6049 6.32951 14.5774 6.21877 14.4766 6.13672C14.3569 6.03959 14.1717 6.01909 14.0889 6.02051Z" fill="currentColor"/>
                  </svg>
                </a>
              )}
              {selectedMember.linkedin && (
                <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {selectedMember.phone && (
                <a href={`tel:${selectedMember.phone}`} className="text-black/70 hover:text-black transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
