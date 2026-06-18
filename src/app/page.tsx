'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

// ── Botanical SVG ──────────────────────────────────────────────────────────────
function BotanicalHero() {
  return (
    <svg
      viewBox="0 0 420 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Central tall stem */}
      <line x1="210" y1="520" x2="210" y2="60" stroke="#b5704a" strokeWidth="1.5" />
      {/* Main dried flower head */}
      <circle cx="210" cy="58" r="24" stroke="#b5704a" strokeWidth="1.2" fill="none" />
      <circle cx="210" cy="58" r="14" stroke="#b5704a" strokeWidth="0.8" fill="none" />
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 210 + Math.cos(rad) * 18;
        const y1 = 58 + Math.sin(rad) * 18;
        const x2 = 210 + Math.cos(rad) * 34;
        const y2 = 58 + Math.sin(rad) * 34;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b5704a" strokeWidth="1" />;
      })}

      {/* Left branch */}
      <path d="M210 180 Q170 150 140 110" stroke="#7a6a58" strokeWidth="1.2" fill="none" />
      {/* Left leaf */}
      <path d="M140 110 Q120 95 130 75 Q150 90 140 110Z" stroke="#7a6a58" strokeWidth="1" fill="#f2ece2" />
      <line x1="140" y1="110" x2="132" y2="82" stroke="#7a6a58" strokeWidth="0.6" />

      {/* Right branch */}
      <path d="M210 220 Q255 195 285 155" stroke="#7a6a58" strokeWidth="1.2" fill="none" />
      {/* Right leaf */}
      <path d="M285 155 Q305 138 295 118 Q275 132 285 155Z" stroke="#7a6a58" strokeWidth="1" fill="#f2ece2" />
      <line x1="285" y1="155" x2="293" y2="128" stroke="#7a6a58" strokeWidth="0.6" />

      {/* Second left branch */}
      <path d="M210 300 Q160 280 120 245" stroke="#7a6a58" strokeWidth="1.2" fill="none" />
      {/* Dried bloom on second left */}
      <circle cx="120" cy="245" r="8" stroke="#b5704a" strokeWidth="1" fill="none" />
      <circle cx="120" cy="245" r="4" stroke="#b5704a" strokeWidth="0.7" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 120 + Math.cos(rad) * 6;
        const y1 = 245 + Math.sin(rad) * 6;
        const x2 = 120 + Math.cos(rad) * 12;
        const y2 = 245 + Math.sin(rad) * 12;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b5704a" strokeWidth="0.8" />;
      })}

      {/* Second right branch */}
      <path d="M210 350 Q258 330 295 300" stroke="#7a6a58" strokeWidth="1.2" fill="none" />
      {/* Wheat-like dried bloom */}
      <ellipse cx="295" cy="295" rx="6" ry="12" stroke="#b5704a" strokeWidth="1" fill="none" transform="rotate(-20,295,295)" />
      <line x1="295" y1="300" x2="295" y2="283" stroke="#b5704a" strokeWidth="0.8" transform="rotate(-20,295,295)" />

      {/* Bottom grass / stems */}
      <path d="M200 520 Q195 480 185 440" stroke="#7a6a58" strokeWidth="1" fill="none" />
      <path d="M220 520 Q228 478 238 445" stroke="#7a6a58" strokeWidth="1" fill="none" />
      <path d="M190 520 Q182 485 175 460" stroke="#7a6a58" strokeWidth="0.8" fill="none" />

      {/* Small floating seed dots */}
      <circle cx="155" cy="360" r="2" fill="#b5704a" opacity="0.5" />
      <circle cx="270" cy="400" r="2" fill="#b5704a" opacity="0.4" />
      <circle cx="175" cy="420" r="1.5" fill="#7a6a58" opacity="0.4" />
      <circle cx="320" cy="250" r="2" fill="#b5704a" opacity="0.4" />
      <circle cx="100" cy="320" r="1.5" fill="#7a6a58" opacity="0.35" />

      {/* Decorative horizontal lines (pressed-flower style) */}
      <line x1="80" y1="500" x2="340" y2="500" stroke="#ddd0c0" strokeWidth="0.8" />
      <line x1="100" y1="510" x2="320" y2="510" stroke="#ddd0c0" strokeWidth="0.5" />
    </svg>
  );
}

// ── Small botanical accent SVG ─────────────────────────────────────────────────
function BotanicalAccent({ size = 80 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 80 100"
      width={size}
      height={size * 1.25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="40" y1="95" x2="40" y2="15" stroke="#b5704a" strokeWidth="1.2" />
      <circle cx="40" cy="13" r="10" stroke="#b5704a" strokeWidth="1" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={40 + Math.cos(r) * 8}
            y1={13 + Math.sin(r) * 8}
            x2={40 + Math.cos(r) * 14}
            y2={13 + Math.sin(r) * 14}
            stroke="#b5704a"
            strokeWidth="0.8"
          />
        );
      })}
      <path d="M40 50 Q28 42 22 28" stroke="#7a6a58" strokeWidth="1" fill="none" />
      <path d="M22 28 Q14 20 20 12 Q30 20 22 28Z" stroke="#7a6a58" strokeWidth="0.8" fill="#f2ece2" />
      <path d="M40 65 Q54 57 60 44" stroke="#7a6a58" strokeWidth="1" fill="none" />
      <path d="M60 44 Q68 36 62 28 Q52 36 60 44Z" stroke="#7a6a58" strokeWidth="0.8" fill="#f2ece2" />
    </svg>
  );
}

// ── Fade-in section wrapper ────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Marquee strip ──────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'Handcrafted in Berlin',
  '·',
  'Sustainably Sourced',
  '·',
  'Ships across Europe',
  '·',
  'Everlasting Beauty',
  '·',
  'Wedding & Home',
  '·',
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-fg overflow-hidden py-4 select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-sm font-medium ${item === '·' ? 'text-accent' : 'text-white/60'}`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Why Stillbloom cards ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '◎',
    title: 'Lasts Forever',
    body: 'No wilting, no watering. Our arrangements hold their form and colour for years — even decades.',
  },
  {
    icon: '◇',
    title: 'Sustainably Sourced',
    body: 'We partner with small European farms that prioritize soil health and responsible harvesting.',
  },
  {
    icon: '◈',
    title: 'Composed by Hand',
    body: 'Every arrangement is assembled by a single artisan from stem to ribbon. No factory, no rush.',
  },
  {
    icon: '◉',
    title: 'Plastic-Free Packaging',
    body: 'Kraft paper, linen twine, and recycled card. Nothing that harms the world it came from.',
  },
  {
    icon: '◫',
    title: 'Made for Weddings',
    body: 'Bespoke bridal and reception arrangements designed to photograph beautifully and endure forever.',
  },
  {
    icon: '◌',
    title: 'Slow & Intentional',
    body: "We dry slowly, work calmly, and only release pieces we'd be proud to have in our own homes.",
  },
];

// ── Featured products (static matching API catalog) ───────────────────────────
const FEATURED_PRODUCTS = [
  {
    id: 'bloom-bouquet',
    name: 'Bloom',
    price: '78 €',
    description: 'Our signature large statement bouquet — 8–12 curated varieties in a premium ribbon-wrapped box.',
  },
  {
    id: 'pampas-arrangement',
    name: 'Pampas & Wheat',
    price: '52 €',
    description: 'A sculptural arrangement of pale pampas grass and golden wheat stems — effortlessly architectural.',
  },
  {
    id: 'eucalyptus-wreath',
    name: 'Wild Eucalyptus Wreath',
    price: '65 €',
    description: 'A loose botanical wreath with dried eucalyptus, cotton stems, and preserved foliage.',
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "The wreath arrived beautifully wrapped and looked even more stunning than the photos. Six months later it's still perfect on our front door.",
    author: 'Maren S.',
    location: 'Hamburg',
  },
  {
    quote: 'We used Stillbloom for our wedding altar and table arrangements. Guests were still asking about them at the reception dinner.',
    author: 'Léa & Thomas',
    location: 'Lyon → Berlin',
  },
  {
    quote: "Finally, flowers that don't make me feel guilty for leaving town for two weeks. The pampas arrangement is the calmest thing in my apartment.",
    author: 'Katja M.',
    location: 'Amsterdam',
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-bg flex items-center pt-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-64px)]">
            {/* Text */}
            <div className="py-20 lg:py-0 lg:pr-12">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xs font-medium tracking-widest uppercase text-accent mb-6"
              >
                Dried Floral Arrangements
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-fg leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)' }}
              >
                Beauty that doesn&apos;t ask you to let&nbsp;go.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-fg-muted text-lg leading-relaxed mb-10 max-w-md"
              >
                Hand-composed dried arrangements, sustainably sourced from European farms.
                For homes, weddings, and the moments worth keeping.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-accent-dark transition-colors"
                  >
                    Explore the Collection
                    <span className="text-white/70">→</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/#story"
                    className="inline-flex items-center gap-2 border border-border text-fg-muted px-7 py-3.5 rounded-full font-medium text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    Our Story
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-6 mt-12 pt-10 border-t border-border"
              >
                {[['5.0', 'Average rating'], ['2 400+', 'Happy customers'], ['EU', 'Shipping']].map(
                  ([val, label]) => (
                    <div key={label} className="text-center">
                      <p className="font-serif text-2xl text-fg">{val}</p>
                      <p className="text-xs text-fg-muted mt-1">{label}</p>
                    </div>
                  )
                )}
              </motion.div>
            </div>

            {/* SVG botanical */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
              style={{ height: '80vh', maxHeight: 580 }}
            >
              <div
                className="absolute inset-0 rounded-brand"
                style={{ background: 'radial-gradient(ellipse at center, #f2ece2 0%, #faf7f2 70%)' }}
              />
              <div className="relative z-10 w-72 h-96">
                <BotanicalHero />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── Story / About ─────────────────────────────────────────────────── */}
      <section id="story" className="py-24 lg:py-36 bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Botanical grid */}
            <FadeIn className="grid grid-cols-2 gap-4">
              <div className="bg-surface rounded-brand aspect-[3/4] flex items-center justify-center">
                <BotanicalAccent size={100} />
              </div>
              <div className="bg-accent-soft rounded-brand aspect-[3/4] mt-8 flex items-center justify-center">
                <BotanicalAccent size={80} />
              </div>
              <div
                className="col-span-2 bg-surface rounded-brand py-8 px-6 flex items-center gap-4"
              >
                <div className="w-px h-12 bg-accent opacity-40" />
                <p className="font-serif text-fg text-lg italic">
                  &ldquo;Nothing here was grown to be thrown away.&rdquo;
                </p>
              </div>
            </FadeIn>

            {/* Text */}
            <div>
              <FadeIn delay={0.1}>
                <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                  Our Story
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-serif text-fg leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                  A slow studio in the heart of Berlin.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-fg-muted leading-relaxed mb-5">
                  Stillbloom began with a simple refusal: to accept that beautiful things must be
                  temporary. We started pressing and drying flowers in a small Berlin apartment,
                  sourcing from family farms across Germany, France, and the Netherlands.
                </p>
                <p className="text-fg-muted leading-relaxed mb-5">
                  What emerged was a practice that takes time seriously. We dry slowly, compose by
                  hand, and release nothing until it feels right. The result is arrangements that
                  carry the calm of something made with full attention.
                </p>
                <p className="text-fg-muted leading-relaxed mb-8">
                  Today we work from a small studio in Prenzlauer Berg, shipping across Europe to
                  homes, weddings, and everyone who believes a room deserves considered beauty.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:text-accent-dark transition-colors"
                >
                  Read the Journal →
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Stillbloom ────────────────────────────────────────────────── */}
      <section id="collections" className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Why Stillbloom
            </p>
            <h2 className="font-serif text-fg" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Flowers with a different relationship to time.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-bg rounded-brand p-8 border border-border hover:border-accent-soft transition-colors h-full"
                >
                  <div className="text-accent text-2xl mb-4 font-serif">{f.icon}</div>
                  <h3 className="font-serif text-fg text-lg mb-3">{f.title}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed">{f.body}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop Preview ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <FadeIn>
              <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">
                Featured
              </p>
              <h2 className="font-serif text-fg" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                From the collection.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link
                href="/shop"
                className="text-sm text-fg-muted hover:text-accent transition-colors font-medium hidden md:inline-flex items-center gap-1"
              >
                View all →
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  <Link href="/shop">
                    <div className="bg-surface rounded-brand aspect-[4/5] flex items-center justify-center mb-5 border border-border group-hover:border-accent-soft transition-colors overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center w-full h-full"
                      >
                        <BotanicalAccent size={90} />
                      </motion.div>
                    </div>
                    <div className="px-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-serif text-fg text-xl">{product.name}</h3>
                        <span className="text-accent font-medium text-sm">{product.price}</span>
                      </div>
                      <p className="text-fg-muted text-sm leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-border text-fg px-8 py-3.5 rounded-full text-sm font-medium hover:bg-surface transition-colors"
            >
              See all arrangements
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              From Our Customers
            </p>
            <h2 className="font-serif text-fg" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              What they say.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-bg rounded-brand p-8 border border-border flex flex-col"
                >
                  <div className="text-accent text-2xl mb-4 font-serif leading-none">&ldquo;</div>
                  <p className="text-fg-muted text-sm leading-relaxed mb-6 flex-1 italic font-serif">
                    {t.quote}
                  </p>
                  <div>
                    <p className="text-fg text-sm font-medium">{t.author}</p>
                    <p className="text-fg-muted text-xs mt-0.5">{t.location}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-fg">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-8">
              <BotanicalAccent size={60} />
            </div>
            <h2
              className="font-serif text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Ready to bring stillness into your space?
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Browse the full collection — arrangements for homes, gifts, and weddings,
              all composed with care and shipped across Europe.
            </p>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-accent-dark transition-colors"
              >
                Shop the Collection
                <span className="text-white/70">→</span>
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
