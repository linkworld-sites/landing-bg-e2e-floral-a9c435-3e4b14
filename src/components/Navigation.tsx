'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useCart } from './CartContext'

export default function Navigation() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      style={{}}
    >
      <motion.div
        className="absolute inset-0 bg-linen/95 backdrop-blur-sm border-b border-chamomile"
        style={{ opacity: bgOpacity }}
      />
      <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display italic text-xl text-bark tracking-tight">
          Stillbloom
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/#craft', label: 'Craft' },
            { href: '/#workshop', label: 'Workshops' },
            { href: '/blog', label: 'Journal' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative font-body text-sm text-bark/70 hover:text-bark transition-colors group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link href="/shop" className="relative">
            <span className="font-body text-sm text-bark/70 hover:text-bark transition-colors">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-3 w-4 h-4 rounded-full bg-umber text-linen text-[10px] flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-px bg-bark transition-transform ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block h-px bg-bark transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-bark transition-transform ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-linen border-b border-chamomile px-6 pb-6 md:hidden"
        >
          <ul className="flex flex-col gap-4 pt-4">
            {[
              { href: '/shop', label: 'Shop' },
              { href: '/#craft', label: 'Craft' },
              { href: '/#workshop', label: 'Workshops' },
              { href: '/blog', label: 'Journal' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-base text-bark"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
