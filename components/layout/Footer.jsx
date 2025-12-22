'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

export default function Footer() {
  const { language, changeLanguage, t } = useTranslation();
  const languages = ['RU', 'EN', 'UZ', 'TR'];

  return (
    <>
      {/* White Section - Logo, Navigation, Contact, Language */}
      <div className="bg-transparent relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Logo and Navigation */}
            <div>
              <div className="mb-8">
                <Image
                  src="/images/logo_green.png"
                  alt="Mizan Logo"
                  width={158.95}
                  height={32}
                  className="h-8"
                />
              </div>
              <nav className="flex flex-col gap-3">
                <a
                  href="/"
                  className="text-[#1a3a2a] hover:underline font-medium text-base"
                >
                  {t('nav.home')}
                </a>
                <a
                  href="/portfolio"
                  className="text-[#1a3a2a] hover:underline font-medium text-base"
                >
                  {t('nav.portfolio')}
                </a>
                <a
                  href="#sustainability"
                  className="text-[#1a3a2a] hover:underline font-medium text-base"
                >
                  {t('nav.sustainability')}
                </a>
                <a
                  href="#about"
                  className="text-[#1a3a2a] hover:underline font-medium text-base"
                >
                  {t('nav.about')}
                </a>
              </nav>
            </div>

            {/* Right Side - Contact and Language */}
            <div className="flex flex-col items-start md:items-end">
              <a
                href="#contact"
                className="text-[#1a3a2a] font-medium text-base mb-6 hover:underline flex items-center gap-2"
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
              </a>
              <div className="flex items-center gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-2 py-1 text-sm font-medium transition-colors ${
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

      {/* Yellow Footer Section - Copyright */}
      <footer
        id="contact"
        className="bg-[#fbbf24] py-6 md:py-8"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-[#1a3a2a] text-sm md:text-base text-center">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

