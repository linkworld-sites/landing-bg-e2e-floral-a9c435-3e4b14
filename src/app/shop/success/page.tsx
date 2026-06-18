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
    <div className="min-h-screen bg-linen pt-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md mx-auto px-6 text-center"
      >
        {/* Botanical stem accent */}
        <svg
          viewBox="0 0 80 100"
          width="48"
          height="60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-8 opacity-60"
          aria-hidden="true"
        >
          <line x1="40" y1="95" x2="40" y2="15" stroke="#C4A882" strokeWidth="1.2" />
          <ellipse cx="40" cy="13" rx="10" ry="14" stroke="#C4A882" strokeWidth="0.8" fill="none" />
          <path d="M40 50 Q28 42 22 28" stroke="#7A6352" strokeWidth="0.9" fill="none" />
          <path d="M22 28 Q14 20 20 12 Q30 20 22 28Z" stroke="#7A6352" strokeWidth="0.7" fill="#D4B8A0" />
          <path d="M40 70 Q52 62 58 48" stroke="#7A6352" strokeWidth="0.9" fill="none" />
          <path d="M58 48 Q66 40 60 28 Q50 36 58 48Z" stroke="#7A6352" strokeWidth="0.7" fill="#D4B8A0" />
        </svg>

        <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-4">
          Order Received
        </p>
        <h1
          className="font-display italic text-bark leading-tight mb-5"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}
        >
          Your arrangement is on its way.
        </h1>
        <p className="font-body text-umber text-base leading-relaxed mb-10">
          We&rsquo;ll send a confirmation to your email shortly. Your piece will be carefully
          packed and shipped within 1&ndash;2 business days.
        </p>
        <div className="w-10 h-px bg-ochre/40 mx-auto mb-8" />
        <p className="font-display italic text-bark/50 text-sm mb-10">
          &ldquo;Arranged to last. Designed to be looked at.&rdquo;
        </p>
        <Link
          href="/"
          className="font-body text-sm text-umber hover:text-bark transition-colors inline-flex items-center gap-2"
        >
          ← Return to Stillbloom
        </Link>
      </motion.div>
    </div>
  );
}
