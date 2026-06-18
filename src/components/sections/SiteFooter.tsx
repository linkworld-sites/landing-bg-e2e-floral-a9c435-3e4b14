'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const INSTAGRAM_IMAGES = [
  '/images/hero.png',
  '/images/lifestyle.png',
  '/images/environment.png',
  '/images/texture.png',
  '/images/lifestyle.png',
  '/images/hero.png',
]

const NAV_LEFT = [
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Journal' },
  { href: '/#craft', label: 'Craft' },
  { href: '/#workshop', label: 'Workshops' },
]

const NAV_RIGHT = [
  { href: '/legal/impressum', label: 'Impressum' },
  { href: '/legal/datenschutz', label: 'Datenschutz' },
  { href: '/legal/cookies', label: 'Cookies' },
]

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="bg-bark text-linen pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Wordmark */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display italic text-linen text-4xl tracking-tight">Stillbloom</p>
          <p className="font-body text-[10px] tracking-micro uppercase text-linen/40 mt-2">
            Dried Botanical Arrangements · EU
          </p>
        </motion.div>

        {/* Navigation columns */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div>
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/40 mb-4">
              Explore
            </p>
            <ul className="space-y-3">
              {NAV_LEFT.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-linen/70 hover:text-linen transition-colors relative group"
                  >
                    {label}
                    <span className="absolute -bottom-px left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/40 mb-4">
              Legal
            </p>
            <ul className="space-y-3">
              {NAV_RIGHT.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-linen/70 hover:text-linen transition-colors relative group"
                  >
                    {label}
                    <span className="absolute -bottom-px left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <p className="font-body text-[10px] tracking-micro uppercase text-linen/40 mb-4">
              Instagram
            </p>
            {/* 6 tiny Instagram-style squares */}
            <div className="grid grid-cols-6 gap-1 max-w-[320px]">
              {INSTAGRAM_IMAGES.map((src, i) => (
                <div key={i} className="relative w-12 h-12 overflow-hidden">
                  <Image
                    src={src}
                    alt="Stillbloom Instagram"
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom legal strip */}
        <motion.div
          className="border-t border-linen/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <p className="font-body text-[10px] tracking-micro uppercase text-linen/30">
            © {new Date().getFullYear()} Stillbloom. All rights reserved.
          </p>
          <p className="font-body text-[10px] tracking-micro uppercase text-linen/30">
            Dried · Composed · Shipped from Europe
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
