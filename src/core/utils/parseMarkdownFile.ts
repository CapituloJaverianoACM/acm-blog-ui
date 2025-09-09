import matter from "gray-matter";

export type ParsedMarkdown = {
  content: string;
  title?: string;
  excerpt?: string;
  published?: boolean;
};

export function parseMarkdownFile(raw: string): ParsedMarkdown {
  const { data, content } = matter(raw);

  return {
    content,
    title: typeof data.title === "string" ? data.title : undefined,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
    published: typeof data.published === "boolean" ? data.published : undefined,
  };
}
