'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hero from './Hero';
import Content from './Content';
import Gallery from './Gallery';
import Specifications from './Specifications';
import CarouselWithBackground from './CarouselWithBackground';

export default function ProjectDetail({ project }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const galleryContainerRef = useRef(null);
  const galleryItemsRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimatedRef.current) return;

    gsap.fromTo(
      contentRef.current?.children || [],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          hasAnimatedRef.current = true;
        }
      }
    );
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Project not found</p>
      </div>
    );
  }

  return (
    <>
      <Hero project={project} />
      <Content 
        project={project} 
        containerRef={containerRef}
        contentRef={contentRef}
      />
      <Gallery 
        project={project}
        gallerySectionRef={gallerySectionRef}
        galleryContainerRef={galleryContainerRef}
        galleryItemsRef={galleryItemsRef}
      />
      <Specifications project={project} />
      <CarouselWithBackground project={project} />
    </>
  );
}
