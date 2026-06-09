'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield, Settings, CheckCircle, Package, Truck, Zap, Users, Eye,
} from 'lucide-react'
import { USE_CASES } from '@/lib/data'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  Shield, Settings, CheckCircle, Package, Truck, Zap, Users, Eye,
}

export function UseCasesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-24 bg-[#050A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Industrial Use Cases"
          title="Transforming Operations Across Every Industry"
          description="TruEye video analytics delivers measurable impact across the most demanding operational environments."
          centered
          className="mb-14"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {USE_CASES.map((uc) => {
            const Icon = ICONS[uc.icon]
            return (
              <motion.div
                key={uc.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card-cyan p-6 rounded-2xl group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-4 group-hover:animate-pulse-cyan transition-all">
                  {Icon && <Icon size={22} className="text-[#00D4FF]" />}
                </div>
                <h3 className="font-poppins font-semibold text-[#F0F4FF] text-base mb-2">
                  {uc.title}
                </h3>
                <p className="text-[#6B7FA3] text-sm leading-relaxed">{uc.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}


