'use client';

import { memo } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

function Header({ project }) {
  const { safeTranslate } = useTranslation();
  
  return (
    <div className="mb-8 md:mb-12">
      <h1 
        className="font-bold text-[#161616] mb-2 transition-opacity duration-200" 
        style={{ 
          fontSize: '36px', 
          lineHeight: '114.99999999999999%', 
          letterSpacing: '-0.02em',
          willChange: 'contents'
        }}
      >
        {safeTranslate(project?.titleKey)}
      </h1>
      {project?.subtitleKey && (
        <p 
          className="text-lg md:text-xl text-gray-600 font-light mb-2 transition-opacity duration-200"
          style={{ willChange: 'contents' }}
        >
          {safeTranslate(project.subtitleKey)}
        </p>
      )}
 
    </div>
  );
}

export default memo(Header);

