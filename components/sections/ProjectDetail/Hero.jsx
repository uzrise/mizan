'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { formatImageUrl, shouldSkipOptimization } from '@/utils/imageUtils';


// Inner component that resets when key changes
function HeroImages({ mediumUrl, fullUrl, alt }) {
  const [isFullLoaded, setIsFullLoaded] = useState(false);

  return (
    <>
      {/* Show medium first (instant from cache) */}
      {!isFullLoaded && (
        <Image
          src={mediumUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          fetchPriority="high"
          unoptimized={shouldSkipOptimization(mediumUrl)}
        />
      )}
      {/* Load original (full) in background, show when ready */}
      <Image
        src={fullUrl}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isFullLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="100vw"
        priority
        unoptimized={shouldSkipOptimization(fullUrl)}
        onLoad={() => setIsFullLoaded(true)}
      />
    </>
  );
}

export default function Hero({ project }) {
  const { safeTranslate } = useTranslation();

  // Image URLs
  const imageFormats = project?.imageFormats;
  const mediumUrl = formatImageUrl(imageFormats?.medium || imageFormats?.large || project?.image);
  const fullUrl = formatImageUrl(project?.image); // Original full-size image

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[72vh] bg-[#1a3a2a] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* Key resets component state when image changes */}
          <HeroImages
            key={fullUrl}
            mediumUrl={mediumUrl}
            fullUrl={fullUrl}
            alt={safeTranslate(project?.titleKey)}
          />
        </div>
      </div>
    </section>
  );
}

