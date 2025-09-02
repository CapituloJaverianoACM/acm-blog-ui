// src/core/validators.ts

export function validateTitle(title: string): string | null {
  if (!title.trim()) return "Title is required.";
  if (title.length > 80) return "Title must be ≤ 80 characters.";
  return null;
}

export function validateSlug(slug: string): string | null {
  if (!slug.trim()) return "Slug is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    return "Slug must be lowercase, alphanumeric, kebab-case.";
  if (slug.length < 3 || slug.length > 64)
    return "Slug must be between 3 and 64 characters.";
  return null;
}

export function validateExcerpt(excerpt: string): string | null {
  if (excerpt.length > 160) return "Excerpt must be ≤ 160 characters.";
  return null;
}

export function validateCoordinates(lat?: number, lng?: number): string | null {
  if (lat === undefined || lng === undefined) return null; // optional
  if (lat < -90 || lat > 90) return "Latitude must be between -90 and 90.";
  if (lng < -180 || lng > 180) return "Longitude must be between -180 and 180.";
  return null;
}

export function validateContent(content: string): string | null {
  if (!content.trim()) return "Content is required.";
  return null;
}
