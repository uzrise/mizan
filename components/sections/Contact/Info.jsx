'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

// Location Icon
const LocationIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#03322A"/>
  </svg>
);

// Phone Icon
const PhoneIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#03322A"/>
  </svg>
);

// Email Icon
const EmailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#03322A"/>
  </svg>
);

// Clock/Time Icon
const TimeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#03322A"/>
  </svg>
);

export default function Info() {
  const { t } = useTranslation();

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
        {/* Main Flex Container - Card + Image */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-9">
          
          {/* Glass Card with Contact Info */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 bg-[#FFF6001F] border border-[#F3F3F3] backdrop-blur-sm">
            {/* Title */}
            <h2 className="mb-3 text-[#161616] font-semibold text-2xl leading-8">
              {t('contact.info.title')}
            </h2>
            
            {/* Description */}
            <p className="mb-8 text-[#161616] font-normal text-sm leading-5">
              {t('contact.info.description')}
            </p>

            {/* Office & Contact Cards - Side by Side */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Office Card */}
              <div className="bg-white p-5 sm:p-6 flex-1">
                <h3 className="mb-4 uppercase text-[#03322A] font-normal text-base leading-[30px]">
                  {t('contact.info.office.title')}
                </h3>
                
                {/* Address with Location Icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0 mt-0.5">
                    <LocationIcon size={18} />
                  </div>
                  <p className="text-[#111927] font-normal text-sm leading-tight">
                    {t('contact.info.office.address')}
                  </p>
                </div>

                {/* Phone with Phone Icon */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <PhoneIcon size={18} />
                  </div>
                  <p className="text-[#111927] font-normal text-sm leading-tight">
                    {t('contact.info.office.phone')}
                  </p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white p-5 sm:p-6 flex-1">
                <h3 className="mb-4 uppercase text-[#03322A] font-normal text-base leading-[30px]">
                  {t('contact.info.contact.title')}
                </h3>
                
                {/* Phone with Phone Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0">
                    <PhoneIcon size={18} />
                  </div>
                  <p className="text-[#111927] font-normal text-sm leading-tight">
                    {t('contact.info.contact.phone')}
                  </p>
                </div>

                {/* Email with Email Icon */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <EmailIcon size={18} />
                  </div>
                  <p className="text-[#111927] font-normal text-sm leading-tight">
                    {t('contact.info.contact.email')}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Networks Card - Separate */}
            <div className="bg-white p-5 sm:p-6">
              <h3 className="mb-3 uppercase text-[#03322A] font-normal text-base leading-[30px]">
                {t('contact.info.social.title')}
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={t('contact.info.social.telegram.url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#03342C] font-semibold text-sm leading-5 py-2 px-3 border border-[#F3F3F3] rounded-full transition-colors hover:bg-[#03342C] hover:text-white"
                >
                  {t('contact.info.social.telegram.label')}
                </a>
                <a
                  href={t('contact.info.social.instagram.url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#03342C] font-semibold text-sm leading-5 py-2 px-3 border border-[#F3F3F3] rounded-full transition-colors hover:bg-[#03342C] hover:text-white"
                >
                  {t('contact.info.social.instagram.label')}
                </a>
              </div>
            </div>
          </div>

          {/* Office Image - 550x400 at 1440px */}
          <div className="relative w-full lg:w-[550px] h-[300px] sm:h-[350px] lg:h-[400px] shrink-0 overflow-hidden">
            <Image
              src="/images/contact-us2.png"
              alt={t('contact.info.office.imageAlt')}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
