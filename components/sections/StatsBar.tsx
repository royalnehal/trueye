'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/data'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

export function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-14 bg-[#0A1628] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="font-poppins font-bold text-4xl md:text-5xl text-[#00D4FF] mb-2 font-mono">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm text-[#6B7FA3] leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

