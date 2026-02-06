'use client';

import { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import Button from '@/components/ui/Button';

export default function Form() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log('Form submitted:', formData);
  };

  // Input styles
  const inputClassName = "w-full px-4 py-3 border border-[#D2D6DB] bg-[#fff] rounded-lg focus:ring-2 focus:ring-[#00382F] outline-none transition-all text-base leading-6 placeholder:text-[#D2D6DB] placeholder:font-normal";
  const inputStyle = { boxShadow: '0px 1px 2px 0px #1018280D' };

  return (
    <section className="relative w-full bg-[#F3F3F3] py-16 md:py-24">
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h2 
            className="mb-3"
            style={{
              color: '#1F2A37',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
            }}
          >
            {t('contact.form.title')}
          </h2>
          
          {/* Description */}
          <p 
            className="mb-8"
            style={{
              color: '#6C737F',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            {t('contact.form.description')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Surname Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.form.name')}
                required
                className={inputClassName}
                style={inputStyle}
              />
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder={t('contact.form.surname')}
                required
                className={inputClassName}
                style={inputStyle}
              />
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.email')}
                required
                className={inputClassName}
                style={inputStyle}
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contact.form.phone')}
                required
                className={inputClassName}
                style={inputStyle}
              />
            </div>

            {/* Message */}
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.form.message')}
              rows={6}
              required
              className={`${inputClassName} resize-none`}
              style={inputStyle}
            />

            {/* Submit Button and Disclaimer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Disclaimer */}
              <p 
                style={{
                  color: '#9DA4AE',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                {t('contact.form.disclaimer')}
              </p>
              <Button
                type="submit"
                variant="secondary"
                className="bg-[#00382F]! hover:bg-[#1a3a2a]! text-white border-none"
              >
                {t('contact.form.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
