import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import FunnelTracker from '@/components/FunnelTracker';
import CookieConsent from '@/components/CookieConsent';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Stillbloom — Dried Floral Arrangements',
  description:
    'Sustainably sourced dried flower arrangements that bring lasting, natural elegance into everyday spaces and milestone moments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <SmoothScroll>
          <FunnelTracker />
          <CookieConsent />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
