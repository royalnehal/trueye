'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Plane, ShoppingBag, Factory, Heart, Building2, GraduationCap,
  Car, Landmark, Home, Truck, Layers, Network, MapPin, Anchor,
} from 'lucide-react'
import { INDUSTRIES } from '@/lib/data'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  Plane, ShoppingBag, Factory, Heart, Building: Building2, GraduationCap,
  Car, Landmark, Home, Truck, Layers, Network, MapPin, Anchor,
}

export function IndustriesRow() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-20 bg-[#050A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Industries"
          title="Deployed Across Every Major Industry"
          centered
          className="mb-12"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon]
            return (
              <motion.div
                key={ind.name}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 hover:border-[#00D4FF]/20 hover:bg-[#00D4FF]/5 transition-all cursor-default"
              >
                {Icon && <Icon size={22} className="text-[#6B7FA3] group-hover:text-[#00D4FF]" />}
                <span className="text-xs text-[#6B7FA3] text-center leading-tight">{ind.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

