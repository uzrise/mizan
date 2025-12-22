'use client';

import { useTranslation } from '@/contexts/TranslationContext';

export default function Header({ titleRef, descriptionRef }) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <h1
        ref={titleRef}
        className="font-bold text-[#161616] mb-4 md:mb-6 text-[36px] leading-[114.99999999999999%] tracking-[-0.02em]"
      >
        {t("portfolio.title")}
      </h1>
      {t("portfolio.description") && (
        <p
          ref={descriptionRef}
          className="text-[#939393] text-base md:text-lg leading-relaxed max-w-4xl"
        >
          {t("portfolio.description")}
        </p>
      )}
    </div>
  );
}

