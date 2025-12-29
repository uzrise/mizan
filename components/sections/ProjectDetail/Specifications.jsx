'use client';

import { memo } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

// Specification field component
const SpecField = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2">
      <span 
        className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
        style={{ willChange: 'contents' }}
      >
        {label}
      </span>
      <span 
        className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
        style={{ willChange: 'contents' }}
      >
        {value}
      </span>
    </div>
  );
};

function Specifications({ project }) {
  const { t, safeTranslate } = useTranslation();

  const hasSpecifications = 
    project?.exteriorKey || 
    project?.visualSymbolsKey || 
    project?.numberOfFloorsKey || 
    project?.functionsKey || 
    project?.servicesKey || 
    project?.internalZoneSeparationKey;

  if (!hasSpecifications) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24">
      <div className="container max-w-[825px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="flex flex-col gap-6">
            <SpecField 
              label={t('projects.exterior')} 
              value={project?.exteriorKey ? safeTranslate(project.exteriorKey) : null} 
            />
            <SpecField 
              label={t('projects.numberOfFloors')} 
              value={project?.numberOfFloorsKey ? safeTranslate(project.numberOfFloorsKey) : null} 
            />
            <SpecField 
              label={t('projects.functions')} 
              value={project?.functionsKey ? safeTranslate(project.functionsKey) : null} 
            />
          </div>

          <div className="flex flex-col gap-6">
            <SpecField 
              label={t('projects.visualSymbols')} 
              value={project?.visualSymbolsKey ? safeTranslate(project.visualSymbolsKey) : null} 
            />
            <SpecField 
              label={t('projects.services')} 
              value={project?.servicesKey ? safeTranslate(project.servicesKey) : null} 
            />
            <SpecField 
              label={t('projects.internalZoneSeparation')} 
              value={project?.internalZoneSeparationKey ? safeTranslate(project.internalZoneSeparationKey) : null} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Specifications);

