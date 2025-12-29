export function isConstantsProject(project) {
  return (
    project?.titleKey &&
    !project?._strapi &&
    typeof project.titleKey === 'string' &&
    project.titleKey.includes('.')
  );
}

