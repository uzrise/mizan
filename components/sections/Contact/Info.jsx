'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';

// Location Icon
const LocationIcon = ({ size = 20 }) => (
  <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.08366 9.58335C8.46437 9.58335 9.58366 8.46407 9.58366 7.08335C9.58366 5.70264 8.46437 4.58335 7.08366 4.58335C5.70295 4.58335 4.58366 5.70264 4.58366 7.08335C4.58366 8.46407 5.70295 9.58335 7.08366 9.58335Z" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.08366 17.0834C10.417 13.75 13.7503 10.7653 13.7503 7.08335C13.7503 3.40146 10.7656 0.416687 7.08366 0.416687C3.40176 0.416687 0.416992 3.40146 0.416992 7.08335C0.416992 10.7653 3.75033 13.75 7.08366 17.0834Z" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


);

// Phone Icon
const PhoneIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7084 5.00002C12.5223 5.15882 13.2704 5.5569 13.8568 6.1433C14.4432 6.7297 14.8412 7.47774 15 8.29169M11.7084 1.66669C13.3994 1.85455 14.9764 2.61183 16.1802 3.81419C17.3841 5.01655 18.1434 6.59253 18.3334 8.28335M8.52253 11.5526C7.52121 10.5513 6.73055 9.41906 6.15056 8.21104C6.10067 8.10714 6.07572 8.05518 6.05656 7.98944C5.98846 7.75581 6.03737 7.46893 6.17905 7.27107C6.21892 7.21539 6.26655 7.16776 6.36181 7.0725C6.65315 6.78117 6.79881 6.6355 6.89405 6.48901C7.25322 5.93661 7.25321 5.22446 6.89405 4.67205C6.79881 4.52556 6.65315 4.3799 6.36181 4.08856L6.19942 3.92617C5.75655 3.4833 5.53511 3.26186 5.2973 3.14158C4.82433 2.90235 4.26577 2.90235 3.79281 3.14158C3.55499 3.26186 3.33355 3.4833 2.89069 3.92617L2.75932 4.05753C2.31797 4.49888 2.09729 4.71956 1.92875 5.01958C1.74174 5.35251 1.60727 5.86958 1.60841 6.25143C1.60943 6.59556 1.67618 6.83074 1.80969 7.30111C2.52716 9.82894 3.88089 12.2142 5.87088 14.2042C7.86086 16.1942 10.2462 17.5479 12.774 18.2654C13.2444 18.3989 13.4795 18.4657 13.8237 18.4667C14.2055 18.4678 14.7226 18.3334 15.0555 18.1463C15.3555 17.9778 15.5762 17.7571 16.0176 17.3158L16.1489 17.1844C16.5918 16.7415 16.8132 16.5201 16.9335 16.2823C17.1728 15.8093 17.1728 15.2508 16.9335 14.7778C16.8132 14.54 16.5918 14.3186 16.1489 13.8757L15.9865 13.7133C15.6952 13.422 15.5495 13.2763 15.4031 13.1811C14.8506 12.8219 14.1385 12.8219 13.5861 13.1811C13.4396 13.2763 13.2939 13.422 13.0026 13.7133C12.9073 13.8086 12.8597 13.8562 12.804 13.8961C12.6062 14.0377 12.3193 14.0866 12.0857 14.0185C12.0199 13.9994 11.968 13.9744 11.8641 13.9245C10.656 13.3445 9.52384 12.5539 8.52253 11.5526Z" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

// Email Icon
const EmailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.667 12.0834L11.1313 7.08335M6.36937 7.08335L0.833688 12.0834M0.416992 2.91669L7.22109 7.67956C7.77207 8.06524 8.04756 8.25808 8.34721 8.33278C8.6119 8.39876 8.88875 8.39876 9.15344 8.33278C9.4531 8.25808 9.72858 8.06524 10.2796 7.67956L17.0837 2.91669M4.41699 13.75H13.0837C14.4838 13.75 15.1839 13.75 15.7186 13.4775C16.189 13.2379 16.5715 12.8554 16.8112 12.385C17.0837 11.8502 17.0837 11.1502 17.0837 9.75002V4.41669C17.0837 3.01656 17.0837 2.31649 16.8112 1.78171C16.5715 1.31131 16.189 0.928854 15.7186 0.689171C15.1839 0.416687 14.4838 0.416687 13.0837 0.416687H4.41699C3.01686 0.416687 2.3168 0.416687 1.78202 0.689171C1.31161 0.928854 0.929159 1.31131 0.689476 1.78171C0.416992 2.31649 0.416992 3.01656 0.416992 4.41669V9.75002C0.416992 11.1502 0.416992 11.8502 0.689476 12.385C0.929159 12.8554 1.31161 13.2379 1.78202 13.4775C2.3168 13.75 3.01686 13.75 4.41699 13.75Z" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  
);

// Clock/Time Icon
const TimeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0837 15.8334L13.7503 17.5L17.5003 13.75M18.3213 10.4583C18.3295 10.3066 18.3337 10.1538 18.3337 10C18.3337 5.39765 14.6027 1.66669 10.0003 1.66669C5.39795 1.66669 1.66699 5.39765 1.66699 10C1.66699 14.5295 5.28075 18.215 9.7824 18.3306M10.0003 5.00002V10L13.1156 11.5577" stroke="#F2DA2F" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
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
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-9">

          {/* Glass Card with Contact Info */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 bg-[#FFF6001F] border border-[#F3F3F3] backdrop-blur-sm">
            {/* Title */}
            <h2 className="mb-3 text-[#161616] font-bold text-2xl leading-8">
              {t('contact.info.title')}
            </h2>

            {/* Description */}
            <p className="mb-8 text-[#161616] font-medium text-sm leading-5">
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
                    <TimeIcon size={18} />
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
          {/* <div className="relative w-full lg:w-[550px] h-[300px] sm:h-[350px] lg:h-[400px] shrink-0 overflow-hidden">
            <Image
              src="/images/contact-us2.png"
              alt={t('contact.info.office.imageAlt')}
              fill
              className="object-cover"
              priority
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
