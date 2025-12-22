'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function BackButton() {
  const { t } = useTranslation();

  return (
    <Link
      href="/portfolio"
      className="inline-flex items-center gap-2 text-[#1a3a2a] hover:text-[#fbbf24] transition-colors mb-8 md:mb-12 group"
    >
      <svg
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-medium">{t('portfolio.backToPortfolio')}</span>
    </Link>
  );
}

