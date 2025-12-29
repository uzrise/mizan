'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from '@/contexts/TranslationContext';

function Description({ project }) {
  const { t, safeTranslate } = useTranslation();

  const hasDescriptionFields = 
    project?.descriptionKey || 
    project?.ideaKey || 
    project?.technicalParamsKey;

  if (!hasDescriptionFields) {
    return null;
  }

  return (
    <>
      {project?.descriptionKey && (
        <div className="max-w-4xl mb-9">
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.projectDescription')}
            </span>
            <div 
              className="markdown-content text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {safeTranslate(project.descriptionKey)}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {project?.ideaKey && (
        <div className="max-w-4xl mb-9">
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.idea')}
            </span>
            <div 
              className="markdown-content text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {safeTranslate(project.ideaKey)}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {project?.technicalParamsKey && (
        <div className="max-w-4xl mb-9">
          <div className="flex flex-col gap-2">
            <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
              {t('projects.technicalParameters')}
            </span>
            <div 
              className="markdown-content text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em] transition-opacity duration-200"
              style={{ willChange: 'contents' }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {safeTranslate(project.technicalParamsKey)}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Description);

