'use client';

import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';

export const CarouselContext = React.createContext({
  current: 0,
  setCurrent: () => {},
  scrollNext: () => {},
  scrollPrev: () => {},
  canScrollNext: true,
  canScrollPrev: true,
  itemsLength: 0,
});

export function Carousel({ children, className = '', ...props }) {
  const [current, setCurrent] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);

  const scrollNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % itemsLength);
  }, [itemsLength]);

  const scrollPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + itemsLength) % itemsLength);
  }, [itemsLength]);

  const canScrollNext = itemsLength > 1;
  const canScrollPrev = itemsLength > 1;

  const contextValue = useMemo(
    () => ({
      current,
      setCurrent,
      scrollNext,
      scrollPrev,
      canScrollNext,
      canScrollPrev,
      setItemsLength,
      itemsLength,
    }),
    [current, scrollNext, scrollPrev, canScrollNext, canScrollPrev, itemsLength]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className = '', ...props }) {
  const context = React.useContext(CarouselContext);
  const contentRef = React.useRef(null);
  
  // Note: itemsLength should be set by parent component or CarouselContentWithLength
  // This useEffect is disabled to avoid conflicts
  // useEffect(() => {
  //   if (contentRef.current) {
  //     const items = Array.from(contentRef.current.children);
  //     const newLength = items.length;
  //     if (newLength !== itemsLength) {
  //       setItemsLength(newLength);
  //     }
  //   }
  // }, [children, setItemsLength, itemsLength]);

  return (
    <div
      ref={contentRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${context.current * 100}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselItem({ children, className = '', ...props }) {
  return (
    <div className={`min-w-0 shrink-0 ${className}`} style={{ width: '100%' }} {...props}>
      {children}
    </div>
  );
}

export function CarouselPrevious({ className = '', ...props }) {
  const context = React.useContext(CarouselContext);

  return (
    <button
      type="button"
      onClick={context.canScrollPrev ? context.scrollPrev : undefined}
      className={`w-12 h-12 rounded-full bg-white/40 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/20 ${className} ${!context.canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Previous slide"
      disabled={!context.canScrollPrev}
      {...props}
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

export function CarouselNext({ className = '', ...props }) {
  const context = React.useContext(CarouselContext);

  return (
    <button
      type="button"
      onClick={context.canScrollNext ? context.scrollNext : undefined}
      className={`w-12 h-12 rounded-full bg-white/40 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/20 ${className} ${!context.canScrollNext ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Next slide"
      disabled={!context.canScrollNext}
      {...props}
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

