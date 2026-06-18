import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Stillbloom Journal`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="pt-20 pb-12 border-b border-border mb-12">
          <Link
            href="/blog"
            className="text-xs font-medium tracking-widest uppercase text-accent mb-6 inline-flex items-center gap-1 hover:text-accent-dark transition-colors"
          >
            ← Journal
          </Link>
          <p className="text-xs font-medium tracking-widest uppercase text-accent mt-6 mb-4">
            {post.date}
          </p>
          <h1
            className="font-serif text-fg leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            {post.title}
          </h1>
          {post.description && (
            <p className="text-fg-muted text-base leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        <article
          className="post-body pb-24"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
