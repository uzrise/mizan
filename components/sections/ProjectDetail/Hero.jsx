'use client';

import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export default function Hero({ project }) {
  const { t } = useTranslation();

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[72vh] bg-[#1a3a2a] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={t(project.titleKey)}
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

