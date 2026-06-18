import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

const legalDir = path.join(process.cwd(), 'content/legal');

function getLegalPage(slug: string) {
  const filePath = path.join(legalDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    title: (data.title as string) ?? slug,
    content,
  };
}

export function generateStaticParams() {
  if (!fs.existsSync(legalDir)) return [];
  return fs
    .readdirSync(legalDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Stillbloom`,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  const html = await marked(page.content);

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="pt-20 pb-10 border-b border-border mb-10">
          <Link
            href="/"
            className="text-xs font-medium tracking-widest uppercase text-accent mb-6 inline-flex items-center gap-1 hover:text-accent-dark transition-colors"
          >
            ← Home
          </Link>
          <h1
            className="font-serif text-fg leading-tight mt-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            {page.title}
          </h1>
        </div>
        <article
          className="post-body pb-24"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
