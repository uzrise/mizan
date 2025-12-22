'use client';

import { useTranslation } from '@/contexts/TranslationContext';

export default function Info({ project }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        {project.categoryKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.category')}
            </span>
            <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t(project.categoryKey)}
            </span>
          </div>
        )}
        {project.clientKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.client')}
            </span>
            <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t(project.clientKey)}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t('projects.architecture')}
          </span>
          <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
            MIZAN
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t('projects.team')}
          </span>
          <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t(project.teamKey || 'projects.defaultTeam')}
          </span>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        {project.locationKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.location')}
            </span>
            <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t(project.locationKey)}
            </span>
          </div>
        )}
        {project.year && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.year')}
            </span>
            <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {project.year}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

