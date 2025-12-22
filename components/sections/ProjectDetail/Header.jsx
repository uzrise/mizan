'use client';

import { useTranslation } from '@/contexts/TranslationContext';

export default function Header({ project }) {
  const { t } = useTranslation();

  return (
    <div className="mb-8 md:mb-12">
      <h1 className="font-bold text-[#161616] mb-2" style={{ fontSize: '36px', lineHeight: '114.99999999999999%', letterSpacing: '-0.02em' }}>
        {t(project.titleKey)}
      </h1>
      {project.locationKey && (
        <p className="text-lg md:text-xl text-gray-600 font-light">
          {t(project.locationKey)}
        </p>
      )}
    </div>
  );
}

