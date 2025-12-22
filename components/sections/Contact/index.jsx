'use client';

import Hero from './Hero';
import Info from './Info';
import Form from './Form';
import Vacancies from './Vacancies';

export default function Contact() {
  return (
    <div className="w-full">
      <Hero />
      <Info />
      <Form />
      <Vacancies />
    </div>
  );
}
