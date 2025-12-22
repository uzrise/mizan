'use client';

import { useTranslation } from '@/contexts/TranslationContext';

export default function Description({ project }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Project Description - Loyiha tavsifi */}
      <div className="max-w-4xl mb-9">
        <div className="flex flex-col gap-2">
          <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t('projects.projectDescription')}
          </span>
          <p className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] whitespace-pre-line">
            {project.descriptionKey ? t(project.descriptionKey) : t('projects.defaultDescription')}
          </p>
        </div>
      </div>

      {/* Project Approach and Concept - Loyiha yondashuvi va g'oyasi */}
      <div className="max-w-4xl mb-9">
        <div className="flex flex-col gap-2">
          <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t('projects.approachAndConcept')}
          </span>
          <p className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] whitespace-pre-line">
            {project.approachKey ? t(project.approachKey) : t('projects.defaultApproach')}
          </p>
        </div>
      </div>

      {/* Technical Parameters - Texnik parametrlar */}
      <div className="max-w-4xl mb-9">
        <div className="flex flex-col gap-2">
          <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t('projects.technicalParameters')}
          </span>
          <p className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] whitespace-pre-line">
            {project.technicalParamsKey ? t(project.technicalParamsKey) : t('projects.defaultTechnicalParams')}
          </p>
        </div>
      </div>
    </>
  );
}

