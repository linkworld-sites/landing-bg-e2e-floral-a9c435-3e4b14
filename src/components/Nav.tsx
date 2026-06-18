'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Collections', href: '/#collection' },
  { label: 'Journal', href: '/blog' },
  { label: 'Shop', href: '/shop' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-linen/96 backdrop-blur-md border-b border-ochre/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display italic text-bark text-xl hover:text-umber transition-colors"
          style={{ letterSpacing: '-0.01em' }}
        >
          Stillbloom
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <motion.div key={label} whileHover={{ y: -1 }}>
              <Link
                href={href}
                className="relative font-body text-sm text-bark/70 hover:text-bark transition-colors group"
              >
                {label}
                <span className="absolute -bottom-px left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop"
              className="font-body text-sm text-bark border border-bark/40 px-5 py-2 hover:bg-bark hover:text-linen transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <Link
            href="/shop"
            className="font-body text-xs tracking-micro uppercase text-bark/70 hover:text-bark transition-colors"
          >
            Shop
          </Link>
        </div>
      </div>
    </header>
  );
}
