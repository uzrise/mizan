'use client';

import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { formatImageUrl } from '@/utils/imageUtils';

export default function Hero({ project }) {
  const { safeTranslate } = useTranslation();

  const imageUrl = formatImageUrl(project?.image);

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[72vh] bg-[#1a3a2a] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={safeTranslate(project?.titleKey)}
            fill
            unoptimized={imageUrl.includes('localhost:1337')}
            className="object-cover"
            sizes="100vw"
            priority
            onError={(e) => {
              console.error('Hero image failed to load:', imageUrl);
            }}
          />
        </div>
      </div>
    </section>
  );
}

