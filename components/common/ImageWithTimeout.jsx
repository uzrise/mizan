'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { shouldSkipOptimization, BLUR_DATA_URL } from '@/utils/imageUtils';

/**
 * Image component with timeout and retry functionality
 * Prevents browser from hanging indefinitely on slow/failed image loads
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {number} timeout - Timeout in ms before showing error state (default: 15000)
 * @param {number} maxRetries - Maximum retry attempts (default: 2)
 * @param {boolean} showRetryButton - Show retry button on error (default: true)
 * @param {function} onLoadSuccess - Callback when image loads successfully
 * @param {function} onLoadError - Callback when image fails to load
 * @param {string} fallbackSrc - Fallback image source (optional)
 * @param {object} ...props - Other Next.js Image props
 */
export default function ImageWithTimeout({
  src,
  alt,
  timeout = 15000,
  maxRetries = 2,
  showRetryButton = true,
  onLoadSuccess,
  onLoadError,
  fallbackSrc,
  className = '',
  ...props
}) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error' | 'timeout'
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Reset state when src changes
  useEffect(() => {
    setStatus('loading');
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

  // Setup timeout
  useEffect(() => {
    if (status !== 'loading') return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (status === 'loading') {
        console.warn(`Image timeout after ${timeout}ms:`, currentSrc);
        setStatus('timeout');
        onLoadError?.({ type: 'timeout', src: currentSrc });
      }
    }, timeout);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status, timeout, currentSrc, onLoadError]);

  const handleLoad = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatus('loaded');
    onLoadSuccess?.();
  }, [onLoadSuccess]);

  const handleError = useCallback((e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    console.error('Image failed to load:', currentSrc);
    
    // Try fallback if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setStatus('loading');
      return;
    }
    
    setStatus('error');
    onLoadError?.({ type: 'error', src: currentSrc, event: e });
  }, [currentSrc, fallbackSrc, onLoadError]);

  const handleRetry = useCallback(() => {
    if (retryCount >= maxRetries) return;
    
    setRetryCount(prev => prev + 1);
    setStatus('loading');
    // Add cache-busting query param for retry
    const separator = currentSrc.includes('?') ? '&' : '?';
    setCurrentSrc(`${src}${separator}_retry=${Date.now()}`);
  }, [retryCount, maxRetries, src, currentSrc]);

  const isError = status === 'error' || status === 'timeout';
  const canRetry = retryCount < maxRetries;

  return (
    <div className={`relative ${props.fill ? 'w-full h-full' : ''}`}>
      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <svg 
              className="w-8 h-8 text-gray-400 animate-spin" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <svg 
              className="w-10 h-10 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-sm text-gray-500">
              {status === 'timeout' ? 'Yuklash vaqti tugadi' : 'Rasm yuklanmadi'}
            </span>
            {showRetryButton && canRetry && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 text-sm bg-[#1a3a2a] text-white rounded-lg hover:bg-[#2a4a3a] transition-colors cursor-pointer"
              >
                Qayta urinish ({maxRetries - retryCount} qoldi)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Actual image */}
      <Image
        src={currentSrc}
        alt={alt}
        className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={shouldSkipOptimization(currentSrc)}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        {...props}
      />
    </div>
  );
}

/**
 * Lightweight version without retry UI - just handles timeout gracefully
 * Use this for thumbnails and less critical images
 */
export function ImageWithTimeoutSimple({
  src,
  alt,
  timeout = 10000,
  onTimeout,
  className = '',
  ...props
}) {
  const [timedOut, setTimedOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setTimedOut(false);
    setLoaded(false);
    
    timeoutRef.current = setTimeout(() => {
      if (!loaded) {
        setTimedOut(true);
        onTimeout?.();
      }
    }, timeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [src, timeout, loaded, onTimeout]);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoaded(true);
  };

  if (timedOut) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${props.fill ? 'absolute inset-0' : ''}`}>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      unoptimized={shouldSkipOptimization(src)}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      {...props}
    />
  );
}
