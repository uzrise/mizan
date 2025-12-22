'use client';

import { useTranslation } from '@/contexts/TranslationContext';

export default function Specifications({ project }) {
  const { t } = useTranslation();

  // Project specifications data - can be moved to project data structure later
  const specifications = project.specifications || {
    leftColumn: [
      {
        labelKey: 'projects.specifications.externalFacadeInspiration',
        valueKey: 'projects.specifications.arkFortressSilhouette',
      },
      {
        labelKey: 'projects.specifications.visualSymbols',
        valueKey: 'projects.specifications.crescentMoonAndStars',
      },
      {
        labelKey: 'projects.specifications.numberOfFloors',
        valueKey: 'projects.specifications.threeFloors',
      },
    ],
    rightColumn: [
      {
        labelKey: 'projects.specifications.functions',
        valueKey: 'projects.specifications.departureArrivalTechnicalZones',
      },
      {
        labelKey: 'projects.specifications.services',
        valueKey: 'projects.specifications.servicesList',
      },
      {
        labelKey: 'projects.specifications.internalZoneAllocation',
        valueKey: 'projects.specifications.fullFunctionalPlanning',
      },
    ],
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24">
      <div className="container max-w-[825px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {specifications.leftColumn.map((spec, index) => (
              <div key={index} className="flex flex-col gap-2">
                <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
                  {t(spec.labelKey)}
                </span>
                <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
                  {t(spec.valueKey)}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {specifications.rightColumn.map((spec, index) => (
              <div key={index} className="flex flex-col gap-2">
                <span className="text-[#98A2B3] font-normal text-[12px] leading-[114.99999999999999%] tracking-[-0.02em]">
                  {t(spec.labelKey)}
                </span>
                <span className="text-[#161616] font-normal text-[16px] leading-[114.99999999999999%] tracking-[-0.02em]">
                  {t(spec.valueKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

