'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { language, locale, changeLanguage, t } = useTranslation();
  const languages = ['UZ', 'EN', 'TR', 'RU'];

  return (
    <>
      {/* White Section - Logo, Navigation, Contact, Language */}
      <div className="bg-transparent relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Logo and Navigation */}
            <div>
              <div className="mb-8">
                <Link href={`/${locale}`}>
                  <Image
                    src="/images/logo_green.png"
                    alt="Mizan Logo"
                    width={158.95}
                    height={32}
                    className="h-8"
                  />
                </Link>
              </div>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-[#1a3a2a] hover:underline font-medium text-base cursor-pointer"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  href="/portfolio"
                  className="text-[#1a3a2a] hover:underline font-medium text-base cursor-pointer"
                >
                  {t('nav.portfolio')}
                </Link>
                <Link
                  href="/durability"
                  className="text-[#1a3a2a] hover:underline font-medium text-base cursor-pointer"
                >
                  {t('nav.durability')}
                </Link>
                <Link
                  href="/about"
                  className="text-[#1a3a2a] hover:underline font-medium text-base cursor-pointer"
                >
                  {t('nav.about')}
                </Link>
              </nav>
            </div>

            {/* Right Side - Contact and Language */}
            <div className="flex flex-col items-start md:items-end">
              <Link
                href={`/${locale}/contact`}
                className="text-[#1a3a2a] font-medium text-base mb-6 hover:underline flex items-center gap-2 cursor-pointer"
              >
                {t('nav.contact')}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
              <div className="flex items-center gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-2 py-1 text-sm font-medium transition-colors cursor-pointer ${
                      language === lang
                        ? 'text-[#1a3a2a] underline'
                        : 'text-[#1a3a2a]/60 hover:text-[#1a3a2a]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider Line */}
        <div className="border-t border-gray-200"></div>
        
        {/* Right Edge Vertical Line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
      </div>

      {/* Green Footer Section - Copyright */}
      <footer
        id="contact"
        className="bg-[#00382F] h-[42px] flex items-center justify-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-white text-sm md:text-base text-center">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

