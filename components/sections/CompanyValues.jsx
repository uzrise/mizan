'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

export default function CompanyValues() {
  const { t } = useTranslation();

  const values = [
    {
      titleKey: 'values.innovative.title',
      descriptionKey: 'values.innovative.description',
      image: '/images/values/m.png', // Image with "m" letter
    },
    {
      titleKey: 'values.economical.title',
      descriptionKey: 'values.economical.description',
      image: '/images/values/i.png', // Image with graph and icon
    },
    {
      titleKey: 'values.quality.title',
      descriptionKey: 'values.quality.description',
      image: '/images/values/z.png', // Image with "z" letter
    },
    {
      titleKey: 'values.sustainability.title',
      descriptionKey: 'values.sustainability.description',
      image: '/images/values/a.png', // Image with "a" letter
    },
    {
      titleKey: 'values.clientOriented.title',
      descriptionKey: 'values.clientOriented.description',
      image: '/images/values/n.png', // Image with icon
    },
  ];

  return (
    <section
      id="sustainability"
      className="bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-row gap-3 sm:gap-4 justify-start sm:justify-center items-start overflow-x-auto scrollbar-hide">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col w-[140px] sm:w-[180px] md:w-[220px] lg:w-[256px] shrink-0"
            >
              {/* Image Container */}
              <div className="w-full">
                <Image
                  src={value.image}
                  alt={t(value.titleKey)}
                  className="object-cover w-full h-auto"
                  width={256}
                  height={163}
                />
              </div>

              {/* Text Content - White Background */}
              <div className="bg-white py-4 sm:py-5 md:py-6 border-l border-r border-gray-200">
                {/* Title */}
                <h3 
                  className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {t(value.titleKey)}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {t(value.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
