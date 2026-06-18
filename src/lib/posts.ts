import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const postsDir = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): Omit<Post, 'content'>[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? '',
        description: (data.description as string) ?? '',
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDir)) return null;
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const filename = files.find((f) => f.includes(slug));
  if (!filename) return null;
  const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? '',
    description: (data.description as string) ?? '',
    content,
  };
}
