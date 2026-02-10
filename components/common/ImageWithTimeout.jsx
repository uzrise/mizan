'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { shouldSkipOptimization, BLUR_DATA_URL } from '@/utils/imageUtils';

// Delay before showing spinner (ms) - prevents flash for cached images
const SPINNER_DELAY = 250;

// Global cache to track successfully loaded images across component instances
// This prevents showing loading state for already-loaded images
const loadedImagesCache = new Set();

/**
 * Image component with timeout and retry functionality
 * Prevents browser from hanging indefinitely on slow/failed image loads
 * 
 * Uses key-based reset pattern for React Compiler compatibility
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
  const [retryKey, setRetryKey] = useState(0);
  
  const handleRetry = useCallback(() => {
    setRetryKey(prev => prev + 1);
  }, []);

  // Use key to force remount when src or retry changes
  return (
    <ImageWithTimeoutInner
      key={`${src}-${retryKey}`}
      src={src}
      alt={alt}
      timeout={timeout}
      maxRetries={maxRetries}
      currentRetry={retryKey}
      showRetryButton={showRetryButton}
      onLoadSuccess={onLoadSuccess}
      onLoadError={onLoadError}
      fallbackSrc={fallbackSrc}
      className={className}
      onRetry={handleRetry}
      {...props}
    />
  );
}

// Inner component - handles single image lifecycle
function ImageWithTimeoutInner({
  src,
  alt,
  timeout,
  maxRetries,
  currentRetry,
  showRetryButton,
  onLoadSuccess,
  onLoadError,
  fallbackSrc,
  className,
  onRetry,
  ...props
}) {
  // Check if image was already loaded before (from global cache)
  const isAlreadyLoaded = loadedImagesCache.has(src);
  
  const [status, setStatus] = useState(isAlreadyLoaded ? 'loaded' : 'pending');
  const [currentSrc, setCurrentSrc] = useState(src);
  const timeoutRef = useRef(null);
  const spinnerDelayRef = useRef(null);
  const loadedRef = useRef(isAlreadyLoaded);

  // Setup spinner delay and timeout - only if not already loaded
  useEffect(() => {
    // Skip timers if already loaded from cache
    if (isAlreadyLoaded) return;
    
    // Show spinner only after delay (avoids flash for cached images)
    spinnerDelayRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        setStatus('loading');
      }
    }, SPINNER_DELAY);

    // Set timeout for error state
    timeoutRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        console.warn(`Image timeout after ${timeout}ms:`, currentSrc);
        setStatus('timeout');
        onLoadError?.({ type: 'timeout', src: currentSrc });
      }
    }, timeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (spinnerDelayRef.current) clearTimeout(spinnerDelayRef.current);
    };
  }, [timeout, currentSrc, onLoadError, isAlreadyLoaded]);

  const handleLoad = useCallback(() => {
    loadedRef.current = true;
    // Add to global cache so future renders know it's loaded
    loadedImagesCache.add(src);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (spinnerDelayRef.current) clearTimeout(spinnerDelayRef.current);
    setStatus('loaded');
    onLoadSuccess?.();
  }, [onLoadSuccess, src]);

  const handleError = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (spinnerDelayRef.current) clearTimeout(spinnerDelayRef.current);
    
    console.error('Image failed to load:', currentSrc);
    
    // Try fallback if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setStatus('pending');
      loadedRef.current = false;
      return;
    }
    
    setStatus('error');
    onLoadError?.({ type: 'error', src: currentSrc });
  }, [currentSrc, fallbackSrc, onLoadError]);

  const isError = status === 'error' || status === 'timeout';
  const isLoading = status === 'loading';
  const canRetry = currentRetry < maxRetries;

  return (
    <div className={`relative ${props.fill ? 'w-full h-full' : ''}`}>
      {/* Loading skeleton - only shown after SPINNER_DELAY */}
      {isLoading && (
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
                onClick={onRetry}
                className="px-4 py-2 text-sm bg-[#1a3a2a] text-white rounded-lg hover:bg-[#2a4a3a] transition-colors cursor-pointer"
              >
                Qayta urinish ({maxRetries - currentRetry} qoldi)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Actual image - visible immediately for cached, fades in for new */}
      <Image
        src={currentSrc}
        alt={alt}
        className={`${className} ${status === 'loaded' || status === 'pending' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
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
 * 
 * Uses internal wrapper with key-based reset to avoid useEffect setState issues
 */
export function ImageWithTimeoutSimple({
  src,
  alt,
  timeout = 10000,
  onTimeout,
  className = '',
  ...props
}) {
  // Use key to force remount when src changes - cleanest pattern for React Compiler
  return (
    <ImageWithTimeoutSimpleInner
      key={src}
      src={src}
      alt={alt}
      timeout={timeout}
      onTimeout={onTimeout}
      className={className}
      {...props}
    />
  );
}

// Internal component that handles single image lifecycle
function ImageWithTimeoutSimpleInner({
  src,
  alt,
  timeout,
  onTimeout,
  className = '',
  ...props
}) {
  // Check if image was already loaded before (from global cache)
  const isAlreadyLoaded = loadedImagesCache.has(src);
  
  const [timedOut, setTimedOut] = useState(false);
  const timeoutRef = useRef(null);
  const loadedRef = useRef(isAlreadyLoaded);

  // Setup timeout - runs once on mount, skip if already loaded
  useEffect(() => {
    if (isAlreadyLoaded) return;
    
    timeoutRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        setTimedOut(true);
        onTimeout?.();
      }
    }, timeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeout, onTimeout, isAlreadyLoaded]);

  const handleLoad = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    loadedRef.current = true;
    // Add to global cache
    loadedImagesCache.add(src);
  }, [src]);

  if (timedOut) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${props.fill ? 'absolute inset-0' : ''}`}>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  // No spinner for simple version - just show image directly
  // Browser cache handles instant display for cached images
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
