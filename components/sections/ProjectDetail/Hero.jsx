'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import { formatImageUrl } from '@/utils/imageUtils';
import ImageWithTimeout from '@/components/common/ImageWithTimeout';

export default function Hero({ project }) {
  const { safeTranslate } = useTranslation();

  // Use large format if available, fallback to medium, then original
  const imageFormats = project?.imageFormats;
  const imageUrl = formatImageUrl(
    imageFormats?.large || imageFormats?.medium || project?.image
  );
  
  // Medium format as fallback for faster retry
  const fallbackUrl = imageFormats?.medium 
    ? formatImageUrl(imageFormats.medium) 
    : undefined;

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[72vh] bg-[#1a3a2a] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <ImageWithTimeout
            src={imageUrl}
            alt={safeTranslate(project?.titleKey)}
            fill
            fallbackSrc={fallbackUrl}
            timeout={20000}
            maxRetries={2}
            className="object-cover"
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

