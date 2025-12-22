"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllProjects } from "@/constants/projects";
import Hero from "./Hero";
import Header from "./Header";
import Filters from "./Filters";
import Grid from "./Grid";
import EmptyState from "./EmptyState";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const projects = getAllProjects();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const filtersRef = useRef(null);
  const sectionRef = useRef(null);

  // Filter projects based on active filter - use useMemo for derived state
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) =>
      project.category.includes(activeFilter)
    );
  }, [activeFilter, projects]);

  // Initial page animations - wait for IntroAnimation to complete
  useEffect(() => {
    // Set initial states
    if (titleRef.current && descriptionRef.current) {
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      });
    }

    if (filtersRef.current) {
      const filterButtons = filtersRef.current.children;
      gsap.set(Array.from(filterButtons), {
        opacity: 0,
        scale: 0.8,
      });
    }

    const animateInitialContent = () => {
      // Animate title and description
      if (titleRef.current && descriptionRef.current) {
        gsap.to([titleRef.current, descriptionRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      // Animate filter buttons
      if (filtersRef.current) {
        const filterButtons = filtersRef.current.children;
        gsap.to(Array.from(filterButtons), {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
      }
    };

    // Check if intro is already complete
    if (window.__introComplete) {
      animateInitialContent();
    } else {
      // Wait for introComplete event
      const handleIntroComplete = () => {
        animateInitialContent();
      };
      window.addEventListener("introComplete", handleIntroComplete);
      return () => {
        window.removeEventListener("introComplete", handleIntroComplete);
      };
    }
  }, []);

  // Animate project cards with ScrollTrigger when section is visible
  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    const setupScrollTrigger = () => {
      const projectElements = container.querySelectorAll(
        "[data-project-card]"
      );

      if (projectElements.length === 0) return;

      // Set initial state
      gsap.set(Array.from(projectElements), {
        opacity: 0,
        y: 40,
        scale: 0.9,
        rotationX: 15,
      });

      // Set initial state for m-vector logos
      const vectorLogos = container.querySelectorAll("[data-vector-logo]");
      gsap.set(Array.from(vectorLogos), {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
      });

      // Set initial state for gradient overlays
      const gradientOverlays = container.querySelectorAll(
        "[data-gradient-overlay]"
      );
      gsap.set(Array.from(gradientOverlays), {
        opacity: 0,
      });

      // Create ScrollTrigger for cards animation
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          // Animate in new projects with improved animation
          gsap.to(Array.from(projectElements), {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.6,
            stagger: {
              amount: 0.4,
              from: "start",
            },
            ease: "power3.out",
          });

          // Animate m-vector logos in each card
          gsap.to(Array.from(vectorLogos), {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: "elastic.out(1, 0.5)",
          });

          // Animate gradient overlays
          gsap.to(Array.from(gradientOverlays), {
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            delay: 0.2,
            ease: "power2.out",
          });
        },
        once: true,
      });

      return scrollTrigger;
    };

    // Wait for DOM to update with new filtered projects
    const timer = setTimeout(() => {
      setupScrollTrigger();
    }, 50);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [filteredProjects]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <>
      <Hero />
      {/* Portfolio Content Section */}
      <section ref={sectionRef} className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Header 
            titleRef={titleRef}
            descriptionRef={descriptionRef}
          />
          <Filters 
            filtersRef={filtersRef}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <Grid 
            containerRef={containerRef}
            filteredProjects={filteredProjects}
          />
          {filteredProjects.length === 0 && <EmptyState />}
        </div>
      </section>
    </>
  );
}
