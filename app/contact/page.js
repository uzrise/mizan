import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Contact Us - Mizan Architecture',
  description: 'Get in touch with Mizan Architecture. Fill out our contact form or visit our office.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Contact />
    </main>
  );
}


