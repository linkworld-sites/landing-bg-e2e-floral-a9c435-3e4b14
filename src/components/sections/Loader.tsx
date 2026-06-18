'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setDone(true), 2400)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-linen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dried stem SVG */}
          <motion.div
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <svg width="2" height="220" viewBox="0 0 2 220" fill="none" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="220" stroke="#7A6352" strokeWidth="1.5" />
              {/* Seed pods along the stem */}
              <ellipse cx="1" cy="60" rx="6" ry="10" fill="#C4A882" opacity="0.7" />
              <ellipse cx="1" cy="110" rx="8" ry="13" fill="#D4B8A0" opacity="0.6" />
              <ellipse cx="1" cy="155" rx="5" ry="8" fill="#C4A882" opacity="0.5" />
              <ellipse cx="1" cy="185" rx="10" ry="16" fill="#D4B8A0" opacity="0.8" />
            </svg>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-display italic text-umber text-sm mt-6 tracking-wide"
            >
              Stillbloom
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
