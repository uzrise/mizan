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

// Simple blur placeholder - gray background
export const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k=';

export function shouldSkipOptimization(imageUrl) {
  if (!imageUrl) return false;
  return imageUrl.includes('localhost:1337');
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

