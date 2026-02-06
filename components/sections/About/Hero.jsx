'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[780px] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="/images/bg-about-us.png"
            alt={t('about.hero.imageAlt')}
            fill
            className="object-cover"
            priority
          />
          <div/>
          <div
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0.47)-38.85%,rgba(0,0,0,0.47)100%)]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0 pb-12 md:pb-16 lg:pb-20 w-full">
        <div className="max-w-5xl">
          <h1 className="max-w-[585px] text-2xl sm:text-4xl md:text-5xl lg:text-[36px] font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t('about.hero.title')}
          </h1>
          <div className="max-w-[682px] text-white/95 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:font-normal">
            <p className="text-sm sm:text-lg md:text-xl leading-relaxed">
              {t('about.hero.paragraph1')}
            </p>
            <p className="text-sm sm:text-lg md:text-xl leading-relaxed">
              {t('about.hero.paragraph2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

