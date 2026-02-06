'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { getAllProjects, getProjectBySlug, transformProject } from '@/lib/strapi';
import { isConstantsProject } from '@/utils/projectUtils';

// Global cache for raw projects data (all languages included)
let projectsCache = null;
let projectsCachePromise = null;
let projectsCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Global cache for single projects
const projectCache = new Map();
const projectCacheTime = new Map();

/**
 * Fetch all projects once and cache them
 */
async function fetchAllProjectsCached() {
  // Return cached data if still valid
  if (projectsCache && projectsCacheTime && Date.now() - projectsCacheTime < CACHE_DURATION) {
    return projectsCache;
  }

  // If already fetching, return the same promise
  if (projectsCachePromise) {
    return projectsCachePromise;
  }

  return doFetchAllProjects();
}

function doFetchAllProjects() {
  // Fetch and cache
  // getAllProjects() should always return data (either from Strapi or constants fallback)
  projectsCachePromise = getAllProjects()
    .then((data) => {
      projectsCache = data || [];
      projectsCacheTime = Date.now();
      projectsCachePromise = null;
      return projectsCache;
    })
    .catch((error) => {
      projectsCachePromise = null;
      console.error('Unexpected error in fetchAllProjectsCached:', error);
      return projectsCache || [];
    });

  return projectsCachePromise;
}

/** Invalidate projects cache so next fetch gets fresh data (e.g. client retry after server error) */
function invalidateProjectsCache() {
  projectsCache = null;
  projectsCacheTime = null;
  projectsCachePromise = null;
}

async function fetchProjectBySlugCached(slug) {
  const cached = projectCache.get(slug);
  const cacheTime = projectCacheTime.get(slug);
  if (cached && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cached;
  }

  const project = await getProjectBySlug(slug);
  if (project) {
    projectCache.set(slug, project);
    projectCacheTime.set(slug, Date.now());
  }
  return project;
}

export function useProjects() {
  const { language } = useTranslation();
  const [rawProjects, setRawProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchProjects = async (invalidateCache = false) => {
    try {
      setLoading(true);
      if (invalidateCache) invalidateProjectsCache();
      const data = await fetchAllProjectsCached();
      if (data && data.length > 0) {
        setRawProjects(data);
        setError(null);
      } else {
        setError(new Error('No projects available'));
        setRawProjects(null);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err);
      setRawProjects(null);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  const refetch = useCallback(() => {
    fetchProjects(true);
  }, []);

  useEffect(() => {
    fetchProjects(false);
  }, []);

  const projects = useMemo(() => {
    if (!rawProjects || rawProjects.length === 0) {
      return [];
    }
    return rawProjects.map(project => {
      if (isConstantsProject(project)) {
        return project;
      }
      return transformProject(project, language);
    });
  }, [rawProjects, language]);

  return { projects, loading: isInitialLoad && loading, error, refetch };
}

export function useProject(slug, initialProject = null) {
  const { language } = useTranslation();
  const [rawProject, setRawProject] = useState(initialProject);
  const [loading, setLoading] = useState(!initialProject);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(!initialProject);
  const [currentSlug, setCurrentSlug] = useState(slug);

  useEffect(() => {
    if (initialProject && initialProject.slug === slug) {
      setRawProject(initialProject);
      setLoading(false);
      setIsInitialLoad(false);
      setError(null);
    }
  }, [initialProject, slug]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setIsInitialLoad(false);
      setRawProject(null);
      setCurrentSlug(null);
      return;
    }

    if (initialProject && initialProject.slug === slug) {
      return;
    }

    if (slug === currentSlug && rawProject) {
      return;
    }

    async function fetchProject() {
      try {
        setLoading(true);
        setIsInitialLoad(true);
        setCurrentSlug(slug);
        const data = await fetchProjectBySlugCached(slug);
        setRawProject(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err);
        setRawProject(null);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    }

    fetchProject();
  }, [slug, currentSlug, initialProject, rawProject]);

  const project = useMemo(() => {
    if (!rawProject) {
      return null;
    }
    if (isConstantsProject(rawProject)) {
      return rawProject;
    }
    return transformProject(rawProject, language);
  }, [rawProject, language]);

  return { project, loading: isInitialLoad && loading, error };
}


