'use client';

import Hero from './Hero';
import Content from './Content';
import TeamSection from './TeamSection';

export default function About() {
  return (
    <div className="w-full">
      <Hero />
      <Content />
      <TeamSection />
    </div>
  );
}
