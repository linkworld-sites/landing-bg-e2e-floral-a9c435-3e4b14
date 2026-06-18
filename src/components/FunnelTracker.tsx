'use client';
import { useEffect } from 'react';
import { track } from '@/lib/funnel';

export default function FunnelTracker() {
  useEffect(() => {
    // Auto-accept consent when the platform verify marker is present
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') ?? '';
    if (utmSource.startsWith('lw_accept') && !localStorage.getItem('lw_consent')) {
      localStorage.setItem('lw_consent', 'all');
      window.dispatchEvent(new Event('lw_consent'));
    }

    track('landing');
    const handleEngage = () => {
      track('engage');
      window.removeEventListener('scroll', handleEngage);
      window.removeEventListener('click', handleEngage);
    };
    window.addEventListener('scroll', handleEngage, { passive: true });
    window.addEventListener('click', handleEngage);
    return () => {
      window.removeEventListener('scroll', handleEngage);
      window.removeEventListener('click', handleEngage);
    };
  }, []);

  return null;
}
