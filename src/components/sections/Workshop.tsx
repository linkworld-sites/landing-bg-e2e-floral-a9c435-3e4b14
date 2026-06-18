'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { track } from '@/lib/funnel'

const CLIENT_TYPES = ['Boutique Hotels', 'Fine Dining', 'Corporate Events']

export default function Workshop() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="workshop" className="bg-linen overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* Left: photograph */}
        <motion.div
          className="relative min-h-[400px] md:min-h-0 overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/environment.png"
            alt="Stillbloom workshop installation in a boutique hotel lobby"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-bark/10" />
        </motion.div>

        {/* Right: editorial copy */}
        <motion.div
          className="flex flex-col justify-center px-10 md:px-16 py-20 bg-chamomile"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-4">
            Workshop Programme
          </p>
          <h2
            className="font-display italic text-bark mb-6 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)' }}
          >
            For spaces that understand stillness.
          </h2>
          <div className="w-12 h-px bg-ochre mb-6" />
          <p className="font-body text-bark/70 leading-relaxed text-base mb-4">
            We work with hotels, restaurants and corporate clients to create permanent and seasonal
            botanical installations — arrangements designed to inhabit your space with the same
            authority as an architectural detail.
          </p>
          <p className="font-body text-bark/70 leading-relaxed text-base mb-10">
            Each commission begins with a site visit. We consider light, surface, scale, and the
            people who will live and work alongside the piece. The result is an arrangement that
            belongs exactly where it is.
          </p>

          {/* Client tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CLIENT_TYPES.map((tag) => (
              <span
                key={tag}
                className="font-body text-[10px] tracking-micro uppercase text-umber border border-umber/30 px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => track('intent')}
            className="self-start font-body text-sm text-bark group relative"
          >
            <span className="relative">
              Enquire about a commission
              <span className="absolute -bottom-px left-0 h-px bg-bark w-0 group-hover:w-full transition-all duration-300" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
