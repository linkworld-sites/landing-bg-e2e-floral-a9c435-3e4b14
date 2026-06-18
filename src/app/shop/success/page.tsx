'use client';
import { useEffect } from 'react';
import { track } from '@/lib/funnel';
import Link from 'next/link';

export default function SuccessPage() {
  useEffect(() => {
    track('convert');
  }, []);
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-md">
        <div className="text-4xl mb-6">🌸</div>
        <h1 className="font-serif text-3xl text-fg mb-4">Thank you for your order</h1>
        <p className="text-fg-muted mb-8">
          Your arrangement is being carefully prepared. You&apos;ll receive a confirmation by email shortly.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors">
          Back to Stillbloom
        </Link>
      </div>
    </div>
  );
}
