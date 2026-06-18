'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('lw_consent')) setVisible(true);
  }, []);

  function accept(mode: 'all' | 'necessary') {
    localStorage.setItem('lw_consent', mode);
    setVisible(false);
    window.dispatchEvent(new Event('lw_consent'));
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, width: 'min(560px, calc(100vw - 32px))',
        background: '#2c2118', color: '#faf7f2', borderRadius: '14px',
        padding: '20px 24px', boxShadow: '0 8px 40px rgba(44,33,24,0.35)',
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}
    >
      <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'rgba(250,247,242,0.8)', margin: 0 }}>
        Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Mehr dazu in unseren{' '}
        <Link href="/legal/cookies" style={{ color: '#e8d5c4', textDecoration: 'underline' }}>Cookie-Richtlinien</Link>{' '}
        und <Link href="/legal/datenschutz" style={{ color: '#e8d5c4', textDecoration: 'underline' }}>Datenschutzhinweisen</Link>.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => accept('necessary')}
          style={{
            background: 'transparent', border: '1px solid rgba(250,247,242,0.3)',
            color: '#faf7f2', borderRadius: '40px', padding: '8px 18px',
            fontSize: '0.82rem', cursor: 'pointer', fontWeight: 500,
          }}
        >
          Nur notwendige
        </button>
        <button
          onClick={() => accept('all')}
          style={{
            background: '#b5704a', border: 'none',
            color: '#fff', borderRadius: '40px', padding: '8px 18px',
            fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600,
          }}
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
