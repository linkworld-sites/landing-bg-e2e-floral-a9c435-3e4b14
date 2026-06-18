export function track(step: string): void {
  if (typeof window === 'undefined') return;
  const consent = localStorage.getItem('lw_consent');
  if (!consent) return;
  try {
    const queue: string[] = JSON.parse(localStorage.getItem('lw_funnel') ?? '[]');
    queue.push(JSON.stringify({ step, ts: Date.now() }));
    localStorage.setItem('lw_funnel', JSON.stringify(queue));
  } catch {}
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') console.log('[funnel]', step);
}
