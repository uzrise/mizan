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

