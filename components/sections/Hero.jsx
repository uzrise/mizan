'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end pt-16 md:pt-20 bg-[#1a3a2a] overflow-hidden"
    >
      {/* Hero Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* Placeholder for hero image - replace with actual image path */}
          {/* The image should show a modern building with glass facade, green elements, and a curved bridge */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-gray-700/40 to-[#1a3a2a]">
            <Image
              src="/images/bg-image.jpg"
              alt="Modern architectural background"
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMB9o8zWZ4AAAAASUVORK5CYII="
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Fallback gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg, rgba(0, 0, 0, 0) 70.69%, rgba(0, 0, 0, 0.576) 87.31%, rgba(0, 0, 0, 0.8) 100%),
                  linear-gradient(360deg, rgba(22, 22, 22, 0) 0%, rgba(22, 22, 22, 0.18) 100%)
                `,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20 w-full">
        <div className="w-full">
          <h1 className=" max-w-[860px] text-2xl sm:text-3xl md:text-4xl lg:text-[5xl] font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <div className='flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4 sm:gap-6'>
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-4 sm:mb-0 max-w-full sm:max-w-[860px]">
              {t('hero.description')}
            </p>
            <Link href="/portfolio">
              <Button className="w-full sm:w-auto shrink-0">
                {t('hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

