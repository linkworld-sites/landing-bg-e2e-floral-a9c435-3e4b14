'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { fetchProducts, formatPrice, type Product } from '@/lib/checkout'
import Link from 'next/link'

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  const isHero = index === 0

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden group cursor-pointer ${
        isHero ? 'md:col-span-2 h-[520px]' : 'h-[380px]'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href="/shop">
        {/* Product visual — placeholder with brand palette */}
        <div className="absolute inset-0 bg-chamomile overflow-hidden">
          {/* Architectural placeholder communicating premium product space */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2/3 h-4/5 border border-ochre/30 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="font-body text-[10px] tracking-micro uppercase text-umber/60 mb-3">
                  Product Photography
                </p>
                <div className="w-8 h-px bg-ochre/40 mx-auto mb-3" />
                <p className="font-body text-xs text-umber/50">Real photo coming soon</p>
              </div>
            </div>
          </div>
          {/* Subtle corner shadows for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bark/10" />
        </div>

        <motion.div
          className="absolute inset-0 bg-linen/5"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Name strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-linen/85 backdrop-blur-sm px-5 py-4">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-1">
              {index === 0 ? 'Featured' : 'Arrangement'}
            </p>
            <h3 className="font-display italic text-bark text-xl leading-tight">{product.name}</h3>
          </motion.div>
          {/* Price — visible on hover only */}
          <motion.p
            className="font-body text-sm text-umber mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: hovered ? 0.2 : 0 }}
          >
            {formatPrice(product.price_cents, product.currency)}
          </motion.p>
        </div>
      </Link>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full py-24 text-center">
      <p className="font-display italic text-bark/40 text-2xl">The collection is being prepared.</p>
      <p className="font-body text-sm text-bark/40 mt-3">New arrangements arriving soon.</p>
    </div>
  )
}

export default function CollectionGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  return (
    <section ref={ref} className="py-24 px-6 bg-linen" id="collection">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-3">
            Seasonal Collection
          </p>
          <h2
            className="font-display text-bark leading-none"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Current Arrangements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            products.slice(0, 5).map((p, i) => (
              <ProductCard key={p.product_id} product={p} index={i} />
            ))
          )}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 font-body text-sm text-bark group"
          >
            <span className="relative">
              View all arrangements
              <span className="absolute -bottom-px left-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
            </span>
            <span className="text-ochre group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
