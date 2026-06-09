'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, Clock, TrendingUp, ShieldCheck, Lock, Target } from 'lucide-react'
import { BENEFITS } from '@/lib/data'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  DollarSign, Clock, TrendingUp, ShieldCheck, Lock, Target,
}

export function BenefitsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why TruEye"
          title="Why Organizations Choose TruEye"
          centered
          className="mb-14"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((benefit) => {
            const Icon = ICONS[benefit.icon]
            return (
              <motion.div
                key={benefit.stat}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-7 rounded-2xl border border-white/10 hover:border-[#00D4FF]/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-4">
                  {Icon && <Icon size={24} className="text-[#00D4FF]" />}
                </div>
                <div className="font-poppins font-bold text-xl text-[#F0F4FF] mb-1">
                  {benefit.stat}
                </div>
                <div className="text-sm font-medium text-[#00D4FF] mb-3">{benefit.label}</div>
                <p className="text-[#6B7FA3] text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}


