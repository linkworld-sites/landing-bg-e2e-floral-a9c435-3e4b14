'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TESTIMONIALS = [
  {
    quote:
      'The arrangement has been on our entry table for eight months. It looks exactly as it did when it arrived — possibly better. People ask about it every week.',
    name: 'Margaux V.',
    location: 'Amsterdam',
    rotate: -1.2,
  },
  {
    quote:
      "We commissioned Stillbloom for our restaurant's private dining room. The piece sets the tone before a single dish is served. Our guests notice it, and they remember it.",
    name: 'Hôtel des Lys',
    location: 'Paris',
    rotate: 1.4,
  },
  {
    quote:
      "I wanted something for our living room that didn't need watering or replacing. What arrived was something I would have chosen from a gallery.",
    name: 'Sofie K.',
    location: 'Copenhagen',
    rotate: -0.8,
  },
]

function SpecimenCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="relative bg-chamomile p-8 md:p-10 border border-ochre/20 shadow-sm"
      style={{ rotate: testimonial.rotate }}
      initial={{ opacity: 0, rotate: testimonial.rotate > 0 ? 3 : -3, y: 20 }}
      animate={
        inView
          ? { opacity: 1, rotate: testimonial.rotate, y: 0 }
          : {}
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="w-6 h-px bg-ochre mb-6" />
      <blockquote className="font-body text-bark/80 italic leading-relaxed text-sm md:text-base mb-8">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer>
        <p className="font-body text-[10px] tracking-micro uppercase text-umber">
          {testimonial.name}
        </p>
        <p className="font-body text-[10px] tracking-micro uppercase text-umber/50 mt-0.5">
          {testimonial.location}
        </p>
      </footer>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 px-6 bg-linen overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-3">
            From the People Who Live With Them
          </p>
          <h2
            className="font-display italic text-bark"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
          >
            The arrangement, months later.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <SpecimenCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
