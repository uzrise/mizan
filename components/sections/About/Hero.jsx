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
          {/* Top gradient - dark */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(360deg, rgba(22, 22, 22, 0) 72.31%, #161616 100%)'
            }}
          />
          {/* Bottom gradient - green */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 56, 47, 0) 41.47%, rgba(0, 56, 47, 0.72) 58.12%, #00382F 70.83%)'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20 w-full">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('about.hero.title')}
          </h1>
          <div className="text-white/95">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              {t('about.hero.paragraph1')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

