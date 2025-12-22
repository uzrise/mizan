'use client';

import { useTranslation } from '@/contexts/TranslationContext';

export default function EmptyState() {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        {t("portfolio.noProjects") || "No projects found"}
      </p>
    </div>
  );
}

