"use client";

import { useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import Image from "next/image";

export default function Vacancies() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const vacancies = [
    {
      id: 1,
      titleKey: "contact.vacancies.job1.title",
      locationKey: "contact.vacancies.job1.location",
      salary: 4000000,
    },
    {
      id: 2,
      titleKey: "contact.vacancies.job2.title",
      locationKey: "contact.vacancies.job2.location",
      salary: 4000000,
    },
    {
      id: 3,
      titleKey: "contact.vacancies.job3.title",
      locationKey: "contact.vacancies.job3.location",
      salary: 4000000,
    },
    {
      id: 4,
      titleKey: "contact.vacancies.job4.title",
      locationKey: "contact.vacancies.job4.location",
      salary: 4000000,
    },
    {
      id: 5,
      titleKey: "contact.vacancies.job4.title",
      locationKey: "contact.vacancies.job4.location",
      salary: 4000000,
    },
  ];

  // Format salary number with spaces
  const formatSalary = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const itemsPerPage = 4;
  const totalItems = vacancies.length;
  const showCarousel = totalItems > itemsPerPage;
  const maxIndex = Math.max(0, totalItems - itemsPerPage);

  const goToPrevious = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // VacancyCard component
  const VacancyCard = ({ vacancy }) => (
    <div className="flex flex-col group cursor-pointer shrink-0 w-full sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]">
      {/* Card - 120px height */}
      <div className="bg-white p-4 h-[120px] flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t(vacancy.titleKey)}
          </h3>
          <p className="text-sm text-gray-500">
            {t("contact.vacancies.salaryFrom")} {formatSalary(vacancy.salary)} {t("contact.vacancies.salaryPerMonth")}
          </p>
        </div>
        <p className="text-sm text-gray-600">{t(vacancy.locationKey)}</p>
      </div>

      {/* Button - 44px height, bg #F3F3F3 */}
      <button className="h-[44px] px-4 py-3 bg-[#F3F3F3] group-hover:bg-[#e5e5e5] transition-colors flex items-center justify-end text-sm font-medium text-gray-900">
        <span className="flex items-center gap-1 group-hover:underline decoration-[#00382F] underline-offset-2">
          {t("contact.vacancies.apply")}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15L15 5M15 5H8.33333M15 5V11.6667"
              stroke="#00382F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg-about-team.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Glass Card Wrapper */}
        <div className="mx-auto p-6 sm:p-8 bg-[#FFF6001F] border border-[#F3F3F3] backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t("contact.vacancies.title")}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("contact.vacancies.subtitle")}
          </p>

          {/* Vacancies Grid or Carousel */}
          {showCarousel ? (
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(calc(-${currentIndex} * (25% + 4px)))`,
                  }}
                >
                  {vacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Bottom Left */}
              <div className="flex items-center gap-2 mt-6">
                <button
                  onClick={goToPrevious}
                  disabled={isAnimating || currentIndex === 0}
                  className="w-12 h-12 rounded-full bg-[#00382F] hover:bg-[#1a4a3a] flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  disabled={isAnimating || currentIndex >= maxIndex}
                  className="w-12 h-12 rounded-full bg-[#00382F] hover:bg-[#1a4a3a] flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* Regular Grid - 4 or less items */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy.id}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Card - 120px height */}
                  <div className="bg-white p-4 h-[120px] flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t(vacancy.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {t("contact.vacancies.salaryFrom")} {formatSalary(vacancy.salary)} {t("contact.vacancies.salaryPerMonth")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t(vacancy.locationKey)}
                    </p>
                  </div>

                  {/* Button - 44px height, bg #F3F3F3 */}
                  <button className="h-[44px] px-4 py-3 bg-[#F3F3F3] group-hover:bg-[#e5e5e5] transition-colors flex items-center justify-end text-sm font-medium text-gray-900">
                    <span className="flex items-center gap-1 group-hover:underline decoration-[#00382F] underline-offset-2">
                      {t("contact.vacancies.apply")}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 15L15 5M15 5H8.33333M15 5V11.6667"
                          stroke="#00382F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
