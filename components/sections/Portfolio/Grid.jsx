'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export default function Grid({ containerRef, filteredProjects }) {
  const { t } = useTranslation();

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-6"
    >
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          data-project-card
          className="w-full"
          style={{ opacity: 0, transform: "translateY(40px) scale(0.9)" }}
        >
          <Link
            href={`/portfolio/${project.slug}`}
            className="relative block overflow-hidden"
          >
            <div className="relative overflow-hidden w-full aspect-457/427">
              <Image
                src={project.image}
                alt={t(project.titleKey)}
                width={457}
                height={427}
                className="object-cover h-full"
                sizes="(max-width: 768px) 100vw, 457px"
              />
              {/* Gradient Overlay */}
              <div
                data-gradient-overlay
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(180deg, rgba(0, 0, 0, 0) 72.64%, rgba(0, 0, 0, 0.64) 85.77%),
                    linear-gradient(0deg, rgba(0, 0, 0, 0) 75.97%, rgba(0, 0, 0, 0.64) 100%)
                  `,
                  opacity: 0,
                }}
              />
              {/* M-Vector Logo - Centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  data-vector-logo
                  src="/images/m-vector.png"
                  alt="M-Vector"
                  width={202}
                  height={130}
                  className="object-contain"
                  style={{ opacity: 0, transform: "scale(0.5) rotate(-180deg)" }}
                />
              </div>
            </div>

            {/* Project Title */}
            <div className="mt-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-[#1a3a2a] text-[20px] leading-[114.99999999999999%] tracking-[-0.02em]">
                  {t(project.titleKey)}
                </h3>
                {project.category && project.category.length > 0 && (
                  <div className="px-2 flex items-center gap-1 py-1 rounded-2xl bg-white border border-[#DADADA] text-xs font-medium text-[#161616]">
                    <span
                      className="block w-[6px] h-[6px] m-px rounded-full shrink-0 bg-[#DADADA]"
                    />
                    {project.category[0] === "exterior"
                      ? t("portfolio.exterior")
                      : project.category[0] === "interior"
                      ? t("portfolio.interior")
                      : project.category[0]}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

