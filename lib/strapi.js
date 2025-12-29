/**
 * Strapi API Client
 */

import { projects as constantsProjects, getProjectBySlug as getProjectBySlugFromConstants } from '@/constants/projects';
import { isConstantsProject } from '@/utils/projectUtils';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function getLocalizedField(field, language) {
  if (!field) {
    return '';
  }
  
  if (typeof field === 'string') {
    return field;
  }
  
  if (typeof field !== 'object') {
    return '';
  }
  
  let fieldData = field;
  if (field.data) {
    if (Array.isArray(field.data) && field.data.length > 0) {
      fieldData = field.data[0].attributes || field.data[0];
    } else {
      fieldData = field.data.attributes || field.data;
    }
  } else if (field.attributes) {
    fieldData = field.attributes;
  }
  
  if (typeof fieldData === 'object' && fieldData !== null) {
    const lang = language.toLowerCase();
    
    if (fieldData[lang]) {
      return fieldData[lang];
    }
    
    if (fieldData['ru']) return fieldData['ru'];
    if (fieldData['en']) return fieldData['en'];
    if (fieldData['tr']) return fieldData['tr'];
    if (fieldData['uz']) return fieldData['uz'];
  }
  
  return '';
}

export async function getAllProjectsWithoutLimit() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects?populate=*&sort=createdAt:desc`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle Strapi v5 format: { data: [{ id, attributes: {...} }] }
    if (data.data && Array.isArray(data.data)) {
      return data.data.map(item => {
        // If item has attributes, flatten it
        if (item.attributes) {
          return {
            id: item.id,
            ...item.attributes,
          };
        }
        return item;
      });
    }
    
    return data.data || [];
  } catch (error) {
    console.warn('Error fetching projects from Strapi, using constants fallback:', error.message);
    return constantsProjects.slice().reverse();
  }
}

export async function getAllProjects() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects?populate=*&sort=createdAt:desc&pagination[limit]=4`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle Strapi v5 format: { data: [{ id, attributes: {...} }] }
    if (data.data && Array.isArray(data.data)) {
      return data.data.map(item => {
        // If item has attributes, flatten it
        if (item.attributes) {
          return {
            id: item.id,
            ...item.attributes,
          };
        }
        return item;
      });
    }
    
    return data.data || [];
  } catch (error) {
    console.warn('Error fetching projects from Strapi, using constants fallback:', error.message);
    return constantsProjects.slice(-4).reverse();
  }
}

export async function getProjectBySlug(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.warn(`Project with slug "${slug}" not found in Strapi, trying constants fallback`);
      const fallbackProject = getProjectBySlugFromConstants(slug);
      if (fallbackProject) {
        return fallbackProject;
      }
      return null;
    }
    
    let project = data.data[0];
    
    if (project.attributes) {
      project = {
        id: project.id,
        ...project.attributes,
      };
    }
    
    return project;
  } catch (error) {
    console.warn('Error fetching project from Strapi, using constants fallback:', error.message);
    const fallbackProject = getProjectBySlugFromConstants(slug);
    if (fallbackProject) {
      return fallbackProject;
    }
    return null;
  }
}

export function transformProject(strapiProject, language = 'RU') {
  if (!strapiProject) {
    console.warn('transformProject: strapiProject is null or undefined');
    return null;
  }
  
  const sourceProject = strapiProject._strapi && typeof strapiProject._strapi === 'object' 
    ? strapiProject._strapi 
    : strapiProject;
  
  const getField = (field) => getLocalizedField(field, language);
  
  let imageUrl = '/images/projects/1.jpg';
  if (sourceProject.image || strapiProject.image) {
    const imageField = sourceProject.image || strapiProject.image;
    if (imageField.data?.attributes?.url) {
      imageUrl = `${STRAPI_URL}${imageField.data.attributes.url}`;
    }
    else if (imageField.data?.url) {
      imageUrl = `${STRAPI_URL}${imageField.data.url}`;
    }
    else if (imageField.url) {
      imageUrl = `${STRAPI_URL}${imageField.url}`;
    }
    else if (typeof imageField === 'string') {
      imageUrl = imageField.startsWith('http') 
        ? imageField 
        : `${STRAPI_URL}${imageField}`;
    }
  }
  
  let imagesArray = [];
  if (sourceProject.images) {
    if (sourceProject.images.data && Array.isArray(sourceProject.images.data)) {
      imagesArray = sourceProject.images.data
        .map(img => {
          if (img.attributes?.url) {
            return `${STRAPI_URL}${img.attributes.url}`;
          } else if (img.url) {
            return `${STRAPI_URL}${img.url}`;
          } else if (typeof img === 'string') {
            return img.startsWith('http') ? img : `${STRAPI_URL}${img}`;
          }
          return null;
        })
        .filter(url => url && url.trim() !== '');
    }
    else if (Array.isArray(sourceProject.images)) {
      imagesArray = sourceProject.images
        .map(img => {
          if (img && typeof img === 'object') {
            if (img.attributes?.url) {
              return `${STRAPI_URL}${img.attributes.url}`;
            } else if (img.url) {
              return `${STRAPI_URL}${img.url}`;
            }
          }
          else if (typeof img === 'string') {
            const url = img.startsWith('http') ? img : `${STRAPI_URL}${img}`;
            return url.trim() !== '' ? url : null;
          }
          return null;
        })
        .filter(url => url && url.trim() !== '');
    }
  }
  
  if (imagesArray.length === 0 && imageUrl && imageUrl !== '/images/projects/1.jpg' && imageUrl.trim() !== '') {
    imagesArray = [imageUrl];
  }
  
  let slug = sourceProject.slug || sourceProject.attributes?.slug || strapiProject.slug || '';
  
  let category = [];
  if (sourceProject.category) {
    if (Array.isArray(sourceProject.category)) {
      category = sourceProject.category;
    } else {
      category = [sourceProject.category];
    }
  } else if (strapiProject.category) {
    if (Array.isArray(strapiProject.category)) {
      category = strapiProject.category;
    } else {
      category = [strapiProject.category];
    }
  }
  
  if (!slug) {
    console.warn('Project missing slug:', sourceProject);
    const title = getField(sourceProject.title);
    if (title) {
      slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    } else if (sourceProject.id || strapiProject.id) {
      slug = `project-${sourceProject.id || strapiProject.id}`;
    } else {
      console.error('Cannot generate slug for project:', sourceProject);
      return null;
    }
  }
  
  let titleKey = getField(sourceProject.title);
  if (!titleKey) {
    if (slug) {
      titleKey = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else {
      titleKey = 'Untitled Project';
    }
  }
  
  return {
    id: sourceProject.id || strapiProject.id || sourceProject.attributes?.id || '',
    slug: slug,
    category: category,
    titleKey: titleKey,
    subtitleKey: getField(sourceProject.subtitle) || '',
    locationKey: getField(sourceProject.location) || '',
    descriptionKey: getField(sourceProject.description) || '',
    image: imageUrl,
    images: imagesArray,
    categoryKey: getField(sourceProject.category) || '',
    clientKey: getField(sourceProject.client) || '',
    year: (sourceProject.year || strapiProject.year)?.toString() || '',
    teamKey: getField(sourceProject.team) || '',
    ideaKey: getField(sourceProject.idea) || '',
    technicalParamsKey: getField(sourceProject.technicalParams) || '',
    architectureKey: getField(sourceProject.architecture) || '',
    exteriorKey: getField(sourceProject.exterior) || '',
    visualSymbolsKey: getField(sourceProject.visualSymbols) || '',
    numberOfFloorsKey: getField(sourceProject.numberOfFloors) || '',
    functionsKey: getField(sourceProject.functions) || '',
    servicesKey: getField(sourceProject.services) || '',
    internalZoneSeparationKey: getField(sourceProject.internalZoneSeparation) || '',
    _strapi: sourceProject,
  };
}

export async function getProjects(language = 'RU') {
  const projects = await getAllProjects();
  const limitedProjects = projects.slice(0, 4);
  return limitedProjects.map(project => {
    if (isConstantsProject(project)) {
      return project;
    }
    return transformProject(project, language);
  });
}

export async function getAllProjectsForPortfolio(language = 'RU') {
  const projects = await getAllProjectsWithoutLimit();
  return projects.map(project => {
    if (isConstantsProject(project)) {
      return project;
    }
    return transformProject(project, language);
  });
}

export async function getProject(slug, language = 'RU') {
  const project = await getProjectBySlug(slug);
  if (!project) {
    return null;
  }
  if (isConstantsProject(project)) {
    return project;
  }
  return transformProject(project, language);
}

