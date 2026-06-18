import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-fg text-white/70 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="font-serif text-xl text-white mb-4">
              Still<span className="text-accent">bloom</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-white/55">
              Dried floral arrangements for homes, weddings, and gift-giving — crafted with care, designed to last.
            </p>
          </div>
          <div>
            <h5 className="font-serif text-white text-base mb-4 font-normal">Entdecken</h5>
            <ul className="space-y-2.5">
              {[['Shop', '/shop'], ['Journal', '/blog'], ['Unsere Geschichte', '/#story'], ['Nachhaltigkeit', '/#story']].map(
                ([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/55 hover:text-accent transition-colors">
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h5 className="font-serif text-white text-base mb-4 font-normal">Rechtliches</h5>
            <ul className="space-y-2.5">
              {[
                ['Impressum', '/legal/impressum'],
                ['Datenschutz', '/legal/datenschutz'],
                ['Cookies', '/legal/cookies'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/55 hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-white/35">© 2026 Stillbloom. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            {['Instagram', 'Pinterest'].map((s) => (
              <span key={s} className="text-xs text-white/35 hover:text-accent cursor-pointer transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
