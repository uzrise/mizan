'use client';

import { memo } from 'react';
import BackButton from './BackButton';
import Header from './Header';
import Info from './Info';
import Description from './Description';

function Content({ project, containerRef, contentRef }) {
  return (
    <section ref={containerRef} className="bg-white py-12 sm:py-16 md:py-24">
      <div ref={contentRef} className="container max-w-[825px] mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <Header project={project} />
        <Info project={project} />
        <Description project={project} />
      </div>
    </section>
  );
}

export default memo(Content);

