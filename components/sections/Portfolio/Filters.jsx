'use client';

import { useTranslation } from '@/contexts/TranslationContext';

const filters = [
  { id: "all", key: "portfolio.all" },
  { id: "exterior", key: "portfolio.exterior" },
  { id: "interior", key: "portfolio.interior" },
];

export default function Filters({ filtersRef, activeFilter, onFilterChange }) {
  const { t } = useTranslation();

  return (
    <div ref={filtersRef} className="flex flex-wrap gap-1 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-1 px-2 py-1 cursor-pointer transition-all duration-300 h-[22px] rounded-full text-center font-medium text-[12px] leading-[18px] tracking-[0%] ${
            activeFilter === filter.id
              ? "bg-[#161616] text-white shadow-lg"
              : "bg-[#DADADA] text-[#161616] hover:bg-[#DADADA]"
          }`}
        >
          <span
            className={`w-[6px] h-[6px] m-[1px] rounded-full shrink-0 ${
              activeFilter === filter.id
                ? "bg-[#DADADA]"
                : "bg-[#1616165C]"
            }`}
          />
          {t(filter.key)}
        </button>
      ))}
    </div>
  );
}

