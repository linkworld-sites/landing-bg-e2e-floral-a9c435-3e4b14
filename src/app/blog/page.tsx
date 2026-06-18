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
    <div className="min-h-screen bg-linen pt-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="py-24 border-b border-ochre/20 mb-16">
          <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-4">
            Studio Journal
          </p>
          <h1
            className="font-display italic text-bark leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
          >
            From the drying room.
          </h1>
          <p className="font-body text-umber text-base leading-relaxed">
            Seasonal notes, composition studies, and the occasional material obsession.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="font-display italic text-umber text-2xl py-12">
            The first entry is being composed.
          </p>
        ) : (
          <ul className="space-y-12 pb-24">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-ochre/15 pb-12 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-3">
                    {post.date}
                  </p>
                  <h2
                    className="font-display italic text-bark mb-3 group-hover:text-umber transition-colors leading-tight"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.01em' }}
                  >
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="font-body text-umber text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                  )}
                  <span className="font-body text-sm text-ochre group-hover:text-bark transition-colors inline-flex items-center gap-1">
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
