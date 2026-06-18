'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { track } from '@/lib/funnel'

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    track('convert')
    setSubmitted(true)
  }

  return (
    <section ref={ref} className="py-28 px-6 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: small still-life photograph */}
          <motion.div
            className="relative h-72 w-full md:w-[280px] overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/lifestyle.png"
              alt="Stillbloom seasonal still-life — dried botanicals on linen"
              fill
              className="object-cover"
              sizes="280px"
            />
          </motion.div>

          {/* Right: invitation copy + email form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-4">
              Studio Journal
            </p>
            <h2
              className="font-display italic text-bark mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)' }}
            >
              Seasonal notes from the drying room.
            </h2>
            <p className="font-body text-bark/60 text-sm leading-relaxed mb-8 max-w-sm">
              Harvest notes, composition studies, and the occasional material obsession. No
              schedule. Only when something is worth saying.
            </p>

            {submitted ? (
              <p className="font-display italic text-bark text-lg">
                Thank you. You&rsquo;ll hear from us when the season turns.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-stretch border-b border-bark/30 max-w-sm"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-transparent font-body text-sm text-bark placeholder-bark/40 outline-none py-3 pr-3"
                />
                <button
                  type="submit"
                  className="font-body text-sm text-ochre hover:text-bark transition-colors py-3 pl-3"
                >
                  →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
