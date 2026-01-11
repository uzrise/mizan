"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import Image from "next/image";

const LocationIcon = ({ size = 20 }) => (
  <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.08366 9.58335C8.46437 9.58335 9.58366 8.46407 9.58366 7.08335C9.58366 5.70264 8.46437 4.58335 7.08366 4.58335C5.70295 4.58335 4.58366 5.70264 4.58366 7.08335C4.58366 8.46407 5.70295 9.58335 7.08366 9.58335Z" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.08366 17.0834C10.417 13.75 13.7503 10.7653 13.7503 7.08335C13.7503 3.40146 10.7656 0.416687 7.08366 0.416687C3.40176 0.416687 0.416992 3.40146 0.416992 7.08335C0.416992 10.7653 3.75033 13.75 7.08366 17.0834Z" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


);

export default function Vacancies() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);

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
      salary: 12000000,
    },
    {
      id: 3,
      titleKey: "contact.vacancies.job3.title",
      locationKey: "contact.vacancies.job3.location",
      salary: 44000000,
    },
    {
      id: 4,
      titleKey: "contact.vacancies.job4.title",
      locationKey: "contact.vacancies.job4.location",
      salary: 25000000,
    },
    {
      id: 5,
      titleKey: "contact.vacancies.job4.title",
      locationKey: "contact.vacancies.job4.location",
      salary: 25000000,
    },
  ];

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1); // Mobile: 1 item
      } else if (width < 1280) {
        setItemsPerPage(2); // Tablet: 2 items
      } else {
        setItemsPerPage(4); // Desktop: 4 items
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset currentIndex when itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  // Format salary number with spaces
  const formatSalary = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const totalItems = vacancies.length;
  const showCarousel = totalItems > itemsPerPage;
  const maxIndex = Math.max(0, totalItems - itemsPerPage);

  // Calculate item width percentage based on items per page
  const getItemWidth = () => {
    if (itemsPerPage === 1) return '100%';
    if (itemsPerPage === 2) return 'calc(50% - 8px)';
    return 'calc(25% - 12px)';
  };

  // Calculate transform based on items per page
  const getTransform = () => {
    if (itemsPerPage === 1) {
      return `translateX(calc(-${currentIndex} * (100% + 16px)))`;
    } else if (itemsPerPage === 2) {
      return `translateX(calc(-${currentIndex} * (50% + 8px)))`;
    }
    return `translateX(calc(-${currentIndex} * (25% + 4px)))`;
  };

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
    <div
      className="flex flex-col group cursor-pointer shrink-0"
      style={{ width: getItemWidth() }}
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
        <p className="flex gap-[4px] items-center  text-sm text-[#111927]">
          <LocationIcon/>
          {t(vacancy.locationKey)}
        </p>
      </div>

      {/* Button - 44px height, bg #F3F3F3 */}
      <button className="h-[44px] px-4 py-3 bg-[#F3F3F3] group-hover:bg-[#e5e5e5] transition-colors flex items-center justify-end text-sm font-medium text-gray-900 cursor-pointer">
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
                    transform: getTransform(),
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
                  className="w-12 h-12 rounded-full bg-[#00382F] hover:bg-[#1a4a3a] flex items-center justify-center transition-all duration-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
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
                  className="w-12 h-12 rounded-full bg-[#00382F] hover:bg-[#1a4a3a] flex items-center justify-center transition-all duration-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
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
                  <button className="h-[44px] px-4 py-3 bg-[#F3F3F3] group-hover:bg-[#e5e5e5] transition-colors flex items-center justify-end text-sm font-medium text-gray-900 cursor-pointer">
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
