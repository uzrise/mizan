'use client';

import { memo } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

function Info({ project }) {
  const { t, safeTranslate } = useTranslation();

  const hasInfoFields = 
    project?.categoryKey || 
    project?.clientKey || 
    project?.architectureKey || 
    (project?.teamKey && project.teamKey !== t('projects.defaultTeam')) ||
    project?.locationKey || 
    project?.year;

  if (!hasInfoFields) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
      <div className="flex flex-col gap-6">
        {project?.categoryKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.category')}
            </span>
            <span 
              className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              {safeTranslate(project.categoryKey)}
            </span>
          </div>
        )}
        {project?.clientKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.client')}
            </span>
            <span 
              className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              {safeTranslate(project.clientKey)}
            </span>
          </div>
        )}
        {project?.architectureKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.architecture')}
            </span>
            <span 
              className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              {safeTranslate(project.architectureKey)}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
            {t('projects.team')}
          </span>
          <span 
            className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
            style={{ willChange: 'contents' }}
          >
            {project?.teamKey ? safeTranslate(project.teamKey) : t('projects.defaultTeam')}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {project?.year && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.year')}
            </span>
            <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {project.year}
            </span>
          </div>
        )}
        {project?.locationKey && (
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.location')}
            </span>
            <span 
              className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              {safeTranslate(project.locationKey)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Info);

