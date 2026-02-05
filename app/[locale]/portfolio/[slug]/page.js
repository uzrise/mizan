import { notFound } from 'next/navigation';
import ProjectPageClient from '@/app/portfolio/[slug]/ProjectPageClient';
import { getProject, getProjects } from '@/lib/strapi';
import { getTranslation } from '@/translations';
import { supportedLocales } from '@/lib/getSeoMetadata';

export const revalidate = 60;

const localeToLang = { ru: 'RU', en: 'EN', uz: 'UZ', tr: 'TR' };

export async function generateStaticParams() {
  try {
    const projects = await getProjects('RU');
    if (!projects || projects.length === 0) return [];
    const slugs = projects
      .filter((p) => p && p.slug)
      .map((p) => p.slug || p.attributes?.slug || '')
      .filter(Boolean);
    const params = [];
    for (const locale of supportedLocales) {
      for (const slug of slugs) {
        params.push({ locale, slug });
      }
    }
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const lang = localeToLang[locale?.toLowerCase()] || 'RU';
  try {
    const project = await getProject(slug, lang);
    if (!project) return { title: 'Project Not Found - Mizan Architecture' };
    let title = project.titleKey;
    if (title && typeof title === 'string' && title.includes('.')) {
      title = getTranslation(lang, title);
    }
    if (!title) {
      title = project.slug?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Project';
    }
    let description = project.descriptionKey;
    if (description && typeof description === 'string' && description.includes('.')) {
      description = getTranslation(lang, description);
    }
    if (!description) description = 'Explore our architectural project details and gallery.';
    return {
      title: `${title} - Mizan Architecture`,
      description,
    };
  } catch (error) {
    return {
      title: 'Project - Mizan Architecture',
      description: 'Explore our architectural project details and gallery.',
    };
  }
}

export default async function ProjectPage({ params }) {
  const { slug, locale } = await params;
  const lang = localeToLang[locale?.toLowerCase()] || 'RU';
  const [project, allProjects] = await Promise.all([
    getProject(slug, lang),
    getProjects(lang),
  ]);
  return (
    <main className="min-h-screen bg-white">
      <ProjectPageClient slug={slug} initialProject={project} initialProjects={allProjects || []} />
    </main>
  );
}
