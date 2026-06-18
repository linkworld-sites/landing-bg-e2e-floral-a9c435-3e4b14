'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const REASSURANCES = [
  'Shipped in protective archival boxes',
  'Arrives in 2–4 days across the EU',
  'Every arrangement built to last years, not days',
]

export default function ShippingBar() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="bg-bark py-5 px-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        {REASSURANCES.map((text, i) => (
          <motion.span
            key={i}
            className="font-body text-xs text-linen/80 tracking-wide text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            {text}
            {i < REASSURANCES.length - 1 && (
              <span className="hidden sm:inline text-linen/20 ml-12">·</span>
            )}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
