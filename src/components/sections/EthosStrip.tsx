'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function EthosStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 px-6 bg-linen">
      <div className="max-w-[640px] mx-auto">
        {/* hairline rule above */}
        <motion.div
          className="h-px bg-ochre mb-12"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.p
          className="font-display italic text-bark leading-tight text-center"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Everlasting is not a metaphor. It is a material fact. These arrangements were composed to
          inhabit space with quiet authority — for years, not seasons.
        </motion.p>

        {/* hairline rule below */}
        <motion.div
          className="h-px bg-ochre mt-12"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ transformOrigin: 'right' }}
        />
      </div>
    </section>
  )
}
