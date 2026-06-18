import Link from 'next/link';

const NAV_COL1 = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/#collection' },
  { label: 'Workshop', href: '/#workshop' },
  { label: 'Journal', href: '/blog' },
];

const NAV_COL2 = [
  { label: 'Impressum', href: '/legal/impressum' },
  { label: 'Datenschutz', href: '/legal/datenschutz' },
  { label: 'Cookies', href: '/legal/cookies' },
];

export default function Footer() {
  return (
    <footer className="bg-bark pt-16 pb-8">
      {/* Centred wordmark */}
      <div className="text-center mb-12 px-6">
        <Link
          href="/"
          className="font-display italic text-linen text-3xl hover:text-ochre transition-colors"
          style={{ letterSpacing: '-0.02em' }}
        >
          Stillbloom
        </Link>
        <div className="w-10 h-px bg-ochre/30 mx-auto mt-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Navigation column 1 */}
          <div>
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/30 mb-4">Navigate</p>
            <ul className="space-y-3">
              {NAV_COL1.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-body text-sm text-linen/55 hover:text-linen transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation column 2 — legal */}
          <div>
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/30 mb-4">Rechtliches</p>
            <ul className="space-y-3">
              {NAV_COL2.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-body text-sm text-linen/55 hover:text-linen transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram footnote grid — two columns wide */}
          <div className="col-span-2 flex flex-col items-start md:items-end">
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/30 mb-3">Instagram</p>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-umber/25 border border-ochre/10" aria-hidden="true" />
              ))}
            </div>
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/20 mt-2">
              @stillbloom.studio
            </p>
          </div>
        </div>

        <div className="border-t border-linen/10 pt-6">
          <p className="font-body text-[10px] tracking-micro uppercase text-linen/25 text-center">
            © 2026 Stillbloom — Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  );
}
