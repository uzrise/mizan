'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[460px] overflow-hidden flex items-end pb-6 sm:pb-8 md:pb-10 lg:pb-12">
      {/* Background Image */}
      <Image
        src="/images/bg-durability.png"
        alt="Durability background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-white mb-6 font-bold text-[36px] leading-[115%] tracking-[-0.02em]">
            {t('durability.hero.title')}
          </h1>
          <p className="font-normal text-[20px] leading-[115%] tracking-normal text-[#DADADA]">
            {t('durability.hero.description')}
          </p>
        </div>
      </div>
    </section>
  );
}

