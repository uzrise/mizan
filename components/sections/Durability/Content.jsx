'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

export default function Content() {
  const { t } = useTranslation();

  const contentBlocks = [
    {
      id: 1,
      image: '/images/durability/1.png',
      imageAltKey: 'durability.content.block1.imageAlt',
      titleKey: 'durability.content.block1.title',
      descriptionKey: 'durability.content.block1.description',
      width: 820,
      height: 520,
    },
    {
      id: 2,
      image: '/images/durability/2.png',
      imageAltKey: 'durability.content.block2.imageAlt',
      titleKey: 'durability.content.block2.title',
      descriptionKey: 'durability.content.block2.description',
      width: 548,
      height: 348,
    },
    {
      id: 3,
      image: '/images/durability/3.png',
      imageAltKey: 'durability.content.block3.imageAlt',
      titleKey: 'durability.content.block3.title',
      descriptionKey: 'durability.content.block3.description',
      width: 548,
      height: 348,
    },
  ];

  return (
    <section className="relative w-full bg-transparent py-16 md:py-24 overflow-visible mb-[-200px] pb-[200px]">
      {/* Background Long Vector - extends into Hero (260px) and Footer (200px) */}
      {/* <div 
        className="absolute left-0 right-0 w-full pointer-events-none z-0"
        style={{ top: '-260px', bottom: '-200px' }}
      >
        <Image
          src="/images/bg-long-vector.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-[96px] relative z-10">
        {contentBlocks.map((block, index) => (
          <div
            key={block.id}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index === 1 ? 'justify-center' : ''}`}
          >
            {/* Image */}
            <div 
              className="relative"
              style={{ width: block.width, height: block.height, maxWidth: '100%' }}
            >
              <Image
                src={block.image}
                alt={t(block.imageAltKey)}
                width={block.width}
                height={block.height}
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Text Content */}
            <div className="w-[240px] text-[#161616]">
              <h2 className="font-semibold text-[16px] leading-[115%] tracking-[-0.02em] mb-4">
                {t(block.titleKey)}
              </h2>
              <p className="font-inter font-normal text-[14px] leading-[115%] tracking-[-0.02em]">
                {t(block.descriptionKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

