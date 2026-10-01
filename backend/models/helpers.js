export function parseJson(value, fallback) {
  if (Array.isArray(value) || (value && typeof value === 'object')) {
    return value;
  }
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function stringifyJson(value) {
  return JSON.stringify(value ?? []);
}

export function toBool(value) {
  return value === true || value === 1 || value === '1' || value === 'true';
}

export function mapProject(row) {
  if (!row) return null;
  return {
    ...row,
    featured: Boolean(row.featured),
    technologies: parseJson(row.technologies, []),
    features: parseJson(row.features, []),
  };
}

export function mapExperience(row) {
  if (!row) return null;
  return {
    ...row,
    responsibilities: parseJson(row.responsibilities, []),
    technologies: parseJson(row.technologies, []),
    achievements: parseJson(row.achievements, []),
  };
}
