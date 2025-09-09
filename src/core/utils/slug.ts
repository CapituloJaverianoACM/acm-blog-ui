// src/core/utils/slug.ts

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-")         // spaces → hyphen
    .replace(/-+/g, "-");         // collapse multiple hyphens
}
