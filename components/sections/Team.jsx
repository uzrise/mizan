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
            </div>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
