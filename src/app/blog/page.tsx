import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal — Stillbloom',
  description: 'Seasonal notes, composition studies, and the occasional material obsession.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="py-20 border-b border-border mb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
            Journal
          </p>
          <h1
            className="font-serif text-fg leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            From the drying room.
          </h1>
          <p className="text-fg-muted text-base leading-relaxed">
            Seasonal notes, composition studies, and the occasional material obsession.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="font-serif text-fg-muted text-2xl italic py-12">
            The first entry is being composed.
          </p>
        ) : (
          <ul className="space-y-12 pb-24">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border pb-12 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">
                    {post.date}
                  </p>
                  <h2
                    className="font-serif text-fg mb-3 group-hover:text-accent-dark transition-colors leading-tight"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                  >
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-fg-muted text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                  )}
                  <span className="text-sm text-accent group-hover:text-accent-dark transition-colors inline-flex items-center gap-1 font-medium">
                    Read
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
