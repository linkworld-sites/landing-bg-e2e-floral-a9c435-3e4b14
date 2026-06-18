'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { track } from '@/lib/funnel';

export default function OrderSuccessPage() {
  useEffect(() => {
    track('checkout');
    track('purchase');
  }, []);

  return (
    <div className="min-h-screen bg-bg pt-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md mx-auto px-6 text-center"
      >
        {/* Botanical accent SVG */}
        <svg
          viewBox="0 0 80 100"
          width="60"
          height="75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-8"
          aria-hidden="true"
        >
          <line x1="40" y1="95" x2="40" y2="15" stroke="#b5704a" strokeWidth="1.2" />
          <circle cx="40" cy="13" r="10" stroke="#b5704a" strokeWidth="1" fill="none" />
          {[0, 60, 120, 180, 240, 300].map((a, i) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={40 + Math.cos(r) * 8}
                y1={13 + Math.sin(r) * 8}
                x2={40 + Math.cos(r) * 14}
                y2={13 + Math.sin(r) * 14}
                stroke="#b5704a"
                strokeWidth="0.8"
              />
            );
          })}
          <path d="M40 50 Q28 42 22 28" stroke="#7a6a58" strokeWidth="1" fill="none" />
          <path
            d="M22 28 Q14 20 20 12 Q30 20 22 28Z"
            stroke="#7a6a58"
            strokeWidth="0.8"
            fill="#f2ece2"
          />
        </svg>

        <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
          Order Received
        </p>
        <h1
          className="font-serif text-fg leading-tight mb-5"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Your arrangement is on its way.
        </h1>
        <p className="text-fg-muted text-base leading-relaxed mb-10">
          We&rsquo;ll send a confirmation to your email shortly. Your piece will be carefully
          packed and shipped within 1&ndash;2 business days.
        </p>
        <p className="text-fg-muted text-sm italic mb-10">
          &ldquo;Arranged to last. Designed to be looked at.&rdquo;
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:text-accent-dark transition-colors"
        >
          ← Return to Stillbloom
        </Link>
      </motion.div>
    </div>
  );
}
