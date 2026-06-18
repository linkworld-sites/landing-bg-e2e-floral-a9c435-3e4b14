'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-md shadow-sm' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-xl text-fg hover:text-accent transition-colors">
          Still<span className="text-accent">bloom</span>
        </Link>
        <nav className="flex items-center gap-8">
          {[['Collections', '/#collections'], ['Journal', '/blog'], ['Shop', '/shop']].map(
            ([label, href]) => (
              <motion.div key={label} whileHover={{ y: -1 }}>
                <Link
                  href={href}
                  className="text-sm text-fg-muted hover:text-fg transition-colors font-medium"
                >
                  {label}
                </Link>
              </motion.div>
            )
          )}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop"
              className="text-sm font-semibold bg-accent text-white px-5 py-2.5 rounded-full hover:bg-accent-dark transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
