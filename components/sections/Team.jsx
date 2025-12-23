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
    name: "Алексей Громов",
    roleKey: "team.chiefArchitect",
    image: "/images/team/1.jpg",
    experience: "10+",
    specialization: "Commercial",
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    linkedin: "https://linkedin.com",
    phone: "+998901234567",
  },
  {
    id: 2,
    name: "Kamoliddin Yusufov",
    roleKey: "team.leadDesigner",
    image: "/images/team/2.jpg",
    experience: "8+",
    specialization: "Residential",
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    linkedin: "https://linkedin.com",
    phone: "+998901234567",
  },
  {
    id: 3,
    name: "Мария Щербакова",
    roleKey: "team.architectVisualizer",
    image: "/images/team/3.jpg",
    experience: "7+",
    specialization: "Residential",
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    linkedin: "https://linkedin.com",
    phone: "+998901234567",
  },
  {
    id: 4,
    name: "Shahzod Raxmatov",
    roleKey: "team.constructionEngineer",
    image: "/images/team/3.jpg",
    experience: "6+",
    specialization: "Industrial",
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    linkedin: "https://linkedin.com",
    phone: "+998901234567",
  },
  {
    id: 5,
    name: "Светлана Мурадова",
    roleKey: "team.interiorDesigner",
    image: "/images/team/1.jpg",
    experience: "9+",
    specialization: "Residential",
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    linkedin: "https://linkedin.com",
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
          {t("sections.team")}
        </h2>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex w-full pl-4 sm:pl-6 lg:pl-8"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
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
                <div className="relative mb-4 rounded-full overflow-hidden bg-gray-700" style={{ width: "160px", height: "160px" }}>
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
            <div className="relative mb-4 rounded-full overflow-hidden bg-gray-700" style={{ width: "200px", height: "200px" }}>
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

            {/* Experience and Specialization */}
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
                <span style={{ 
                  color: "#98A2B3",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>
                  {t("team.specialization")}:{" "}
                </span>
                <span style={{ 
                  color: "#344054",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>
                  {selectedMember.specialization}
                </span>
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
