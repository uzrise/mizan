'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

export default function Content() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background Image - lazy loaded for performance */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg-about-content.png"
          alt=""
          fill
          className="object-cover"
          loading="lazy"
          quality={75}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6 md:gap-8">
            {/* First Paragraph */}
            <p className="font-medium text-[16px] leading-[120%] tracking-[-0.02em] text-[#01382F]">
              {t('about.content.leftColumn')}
            </p>

            {/* Second Paragraph */}
            <p className="font-medium text-[16px] leading-[120%] tracking-[-0.02em] text-[#01382F]">
              {t('about.content.rightColumn')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

