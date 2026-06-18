'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const PANELS = [
  {
    step: '01',
    title: 'Harvest',
    image: '/images/texture.png',
    copy:
      'We source from small European growers who cut at peak — when the seed head is full, the colour is at its most saturated. Timing is everything. A week too late and the material becomes brittle. A week too early and the colour has not deepened.',
  },
  {
    step: '02',
    title: 'Dry',
    image: '/images/lifestyle.png',
    copy:
      'Hung in bundles in a north-facing room, away from direct light. The process takes three to six weeks depending on humidity. There is no rushing this part. The material tells you when it is ready.',
  },
  {
    step: '03',
    title: 'Compose',
    image: '/images/environment.png',
    copy:
      'Each arrangement is built by hand with a single compositional intention: balance through asymmetry. We work with the natural behaviour of the material — pampas that wants to drift, lunaria that wants to float, strawflowers that want to cluster.',
  },
  {
    step: '04',
    title: 'Ship',
    image: '/images/hero.png',
    copy:
      'Packed into archival kraft paper and rigid cardboard tubes, each piece arrives as it left — intact, protected, ready to inhabit a space. We ship across the EU within two to four days, with tracking at every stage.',
  },
]

export default function CraftProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="craft" className="bg-chamomile">
      {/* Section header — outside the scroll pin */}
      <div ref={titleRef} className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-3">
            The Process
          </p>
          <h2
            className="font-display text-bark leading-none"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            From field to room.
          </h2>
        </motion.div>
      </div>

      {/* Pinned horizontal scroll — desktop only */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: `${PANELS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div className="flex h-full" style={{ x }}>
            {PANELS.map((panel, i) => (
              <div
                key={panel.step}
                className="relative flex-none w-screen h-full flex items-center"
              >
                <div className="grid grid-cols-2 gap-0 w-full h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-bark/10" />
                  </div>
                  {/* Copy */}
                  <div className="flex flex-col justify-center px-16 bg-chamomile">
                    <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-4">
                      {panel.step} / 04
                    </p>
                    <h3
                      className="font-display italic text-bark mb-6 leading-none"
                      style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)', letterSpacing: '-0.02em' }}
                    >
                      {panel.title}
                    </h3>
                    <div className="w-12 h-px bg-ochre mb-6" />
                    <p className="font-body text-bark/70 leading-relaxed text-base max-w-sm">
                      {panel.copy}
                    </p>
                    <p className="font-body text-[10px] tracking-micro uppercase text-umber/40 mt-8">
                      {i + 1} of {PANELS.length}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-ochre/20">
            <motion.div
              className="h-full bg-ochre"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden px-6 pb-24 space-y-16">
        {PANELS.map((panel, i) => (
          <MobilePanel key={panel.step} panel={panel} index={i} />
        ))}
      </div>
    </section>
  )
}

function MobilePanel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div className="relative h-64 overflow-hidden mb-6">
        <Image
          src={panel.image}
          alt={panel.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-2">
        {panel.step} / 04
      </p>
      <h3 className="font-display italic text-bark text-3xl mb-4">{panel.title}</h3>
      <div className="w-8 h-px bg-ochre mb-4" />
      <p className="font-body text-bark/70 leading-relaxed text-sm">{panel.copy}</p>
    </motion.div>
  )
}
