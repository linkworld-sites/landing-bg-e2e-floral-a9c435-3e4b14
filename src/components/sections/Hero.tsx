'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { track } from '@/lib/funnel'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])

  return (
    <section ref={ref} className="relative h-screen flex overflow-hidden bg-linen">
      {/* Left: editorial photograph — 60% */}
      <div className="relative w-full md:w-[60%] h-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src="/images/hero.png"
            alt="A dramatic side-lit dried floral arrangement on parchment linen"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          {/* Deep shadow overlay for Dutch Golden Age feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-bark/20 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Right: wordmark + copy — 40% */}
      <div className="hidden md:flex w-[40%] flex-col justify-center px-12 lg:px-16 bg-linen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 2.6 }}
        >
          <p className="font-body text-xs tracking-micro uppercase text-umber mb-8">
            Dried Botanical Arrangements
          </p>
          <h1
            className="font-display italic text-bark leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            Still
            <br />
            bloom
          </h1>
          <p className="font-body text-bark/60 text-base leading-relaxed max-w-xs mb-10">
            Nothing here was grown to be thrown away. Arranged to last. Designed to be looked at.
          </p>
          <Link
            href="/shop"
            onClick={() => track('intent')}
            className="inline-flex items-center gap-3 font-body text-sm text-bark group"
          >
            <span className="relative">
              Explore the collection
              <span className="absolute -bottom-px left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
            </span>
            <span className="text-ochre group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Mobile wordmark overlay */}
      <div className="absolute inset-0 flex items-end md:hidden p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 2.6 }}
          className="bg-linen/90 backdrop-blur-sm px-6 py-5"
        >
          <h1
            className="font-display italic text-bark leading-none mb-2"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Stillbloom
          </h1>
          <p className="font-body text-bark/60 text-sm leading-relaxed mb-4">
            Arranged to last. Designed to be looked at.
          </p>
          <Link
            href="/shop"
            onClick={() => track('intent')}
            className="font-body text-sm text-bark group inline-flex items-center gap-2"
          >
            <span className="relative">
              Explore the collection
              <span className="absolute -bottom-px left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
            </span>
            <span className="text-ochre">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 3.5 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="font-body text-[10px] tracking-micro uppercase text-bark/40">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-ochre/60 to-transparent" />
      </motion.div>
    </section>
  )
}
