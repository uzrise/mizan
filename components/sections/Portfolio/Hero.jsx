'use client';

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[72vh] bg-[#1a3a2a] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-gray-700/40 to-[#1a3a2a]">
            <div className="w-full h-full bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" />
          </div>
        </div>
      </div>
    </section>
  );
}

