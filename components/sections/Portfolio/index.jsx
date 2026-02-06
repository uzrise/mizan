"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProjects } from "@/hooks/useProjects";
import { useTranslation } from "@/contexts/TranslationContext";
import { transformProject } from "@/lib/strapi";
import { isConstantsProject } from "@/utils/projectUtils";
import Hero from "./Hero";
import Header from "./Header";
import Filters from "./Filters";
import Grid from "./Grid";
import EmptyState from "./EmptyState";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio({ initialProjects = null }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { language } = useTranslation();
  const { projects: clientProjects, loading: clientLoading } = useProjects();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const filtersRef = useRef(null);
  const sectionRef = useRef(null);

  const transformedInitialProjects = useMemo(() => {
    if (!initialProjects || initialProjects.length === 0) {
      return null;
    }
    return initialProjects.map(project => {
      if (isConstantsProject(project)) {
        return project;
      }
      return transformProject(project, language);
    });
  }, [initialProjects, language]);

  const projects = transformedInitialProjects || clientProjects;
  const loading = initialProjects ? false : clientLoading;

  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0) {
      return [];
    }
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) =>
      project.category && project.category.includes(activeFilter)
    );
  }, [activeFilter, projects]);

  useEffect(() => {
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
      if (titleRef.current && descriptionRef.current) {
        gsap.to([titleRef.current, descriptionRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

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

    if (window.__introComplete) {
      animateInitialContent();
    } else {
      const timer = setTimeout(() => {
        if (!window.__introComplete) {
          animateInitialContent();
        }
      }, 300);

      const handleIntroComplete = () => {
        clearTimeout(timer);
        animateInitialContent();
      };
      window.addEventListener("introComplete", handleIntroComplete);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("introComplete", handleIntroComplete);
      };
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    const setupScrollTrigger = () => {
      const projectElements = container.querySelectorAll(
        "[data-project-card]"
      );

      if (projectElements.length === 0) return;

      gsap.set(Array.from(projectElements), {
        opacity: 0,
        y: 40,
        scale: 0.9,
        rotationX: 15,
      });

      const vectorLogos = container.querySelectorAll("[data-vector-logo]");
      gsap.set(Array.from(vectorLogos), {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
      });

      const gradientOverlays = container.querySelectorAll(
        "[data-gradient-overlay]"
      );
      gsap.set(Array.from(gradientOverlays), {
        opacity: 0,
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
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

          gsap.to(Array.from(vectorLogos), {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: "elastic.out(1, 0.5)",
          });

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

  if (loading) {
    return (
      <>
        <Hero />
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Hero />
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
