/**
 * Debug utility for Strapi API
 * Use this to test API endpoints and see response formats
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Test API connection and get projects
 */
export async function testStrapiConnection() {
  try {
    console.log('🔍 Testing Strapi connection...');
    console.log('📍 URL:', `${STRAPI_URL}/api/projects`);
    
    const response = await fetch(`${STRAPI_URL}/api/projects?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return { success: false, error: errorText };
    }
    
    const data = await response.json();
    console.log('✅ Response structure:', {
      hasData: !!data.data,
      dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
      dataLength: Array.isArray(data.data) ? data.data.length : 'N/A',
      firstItem: data.data?.[0] ? {
        id: data.data[0].id,
        hasAttributes: !!data.data[0].attributes,
        hasSlug: !!(data.data[0].slug || data.data[0].attributes?.slug),
      } : null,
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Connection error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Test fetching a single project by slug
 */
export async function testGetProjectBySlug(slug) {
  try {
    console.log(`🔍 Testing get project by slug: ${slug}`);
    
    const response = await fetch(
      `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('📊 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return { success: false, error: errorText };
    }
    
    const data = await response.json();
    console.log('✅ Response:', {
      hasData: !!data.data,
      dataLength: Array.isArray(data.data) ? data.data.length : 'N/A',
      project: data.data?.[0] || null,
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error: error.message };
  }
}

