const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const LOCAL_PUBLIC_PATHS = [
  '/images/',
  '/bg-',
  '/file.svg',
  '/globe.svg',
  '/next.svg',
  '/vercel.svg',
  '/window.svg'
];

// Production Strapi hosts - skip Next.js optimization for direct loading
const STRAPI_HOSTS = [
  'localhost:1337',
  'admin.mizanarchitect.uz',
  'api.mizanarchitect.uz',
];

// Simple blur placeholder - gray background
export const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k=';

/**
 * Check if image should skip Next.js optimization (load directly from Strapi)
 * Returns true for Strapi URLs to avoid Next.js image optimizer overhead and 500 errors
 */
export function shouldSkipOptimization(imageUrl) {
  if (!imageUrl) return false;
  // Check against known Strapi hosts
  for (const host of STRAPI_HOSTS) {
    if (imageUrl.includes(host)) return true;
  }
  // Also check if STRAPI_URL host is in the URL
  if (STRAPI_URL && imageUrl.includes(new URL(STRAPI_URL).host)) return true;
  return false;
}

/**
 * Get image URL for a specific format
 * @param {string | object} media - URL string or object with format URLs { full, thumbnail, small, medium, large }
 * @param {'thumbnail' | 'small' | 'medium' | 'large' | 'full'} format - Desired format
 * @returns {string} - Image URL for the requested format, falls back to full/original
 */
export function getImageUrl(media, format = 'full') {
  if (!media) return '';
  
  // If media is a string, it's the full URL - return as-is
  if (typeof media === 'string') {
    return formatImageUrl(media);
  }
  
  // If media is an object with format URLs
  if (typeof media === 'object') {
    // Try requested format first
    if (format !== 'full' && media[format]) {
      return formatImageUrl(media[format]);
    }
    // Fallback chain: large -> medium -> small -> full
    if (media.large) return formatImageUrl(media.large);
    if (media.medium) return formatImageUrl(media.medium);
    if (media.small) return formatImageUrl(media.small);
    if (media.full) return formatImageUrl(media.full);
    if (media.thumbnail) return formatImageUrl(media.thumbnail);
  }
  
  return '';
}

export function formatImageUrl(image) {
  if (!image || image.trim() === '') return '';
  
  const imageStr = String(image).trim();
  
  if (imageStr.startsWith('http://') || imageStr.startsWith('https://')) {
    const urlWithoutProtocol = imageStr.replace(/^https?:\/\//, '');
    const path = urlWithoutProtocol.includes('/') 
      ? '/' + urlWithoutProtocol.split('/').slice(1).join('/')
      : urlWithoutProtocol;
    
    for (const publicPath of LOCAL_PUBLIC_PATHS) {
      if (path.startsWith(publicPath)) {
        return path;
      }
    }
    
    return imageStr;
  }
  
  for (const publicPath of LOCAL_PUBLIC_PATHS) {
    if (imageStr.startsWith(publicPath)) {
      return imageStr;
    }
  }
  
  if (imageStr.startsWith('/uploads/')) {
    return `${STRAPI_URL}${imageStr}`;
  }
  
  if (imageStr.startsWith('/')) {
    return `${STRAPI_URL}${imageStr}`;
  }
  
  return `${STRAPI_URL}/${imageStr}`;
}

