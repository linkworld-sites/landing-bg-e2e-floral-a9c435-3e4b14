'use client';
import { useEffect } from 'react';
import { track } from '@/lib/funnel';

export default function FunnelTracker() {
  useEffect(() => {
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
