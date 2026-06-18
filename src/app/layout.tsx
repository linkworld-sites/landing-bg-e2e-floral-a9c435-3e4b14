import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import FunnelTracker from '@/components/FunnelTracker';
import CookieConsent from '@/components/CookieConsent';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Stillbloom — Dried Floral Arrangements',
  description:
    'Sustainably sourced dried flower arrangements that bring lasting, natural elegance into everyday spaces and milestone moments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <CartProvider>
          <SmoothScroll>
            <FunnelTracker />
            <CookieConsent />
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
