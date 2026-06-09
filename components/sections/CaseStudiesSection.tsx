'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Shield, HardHat, Package, ArrowRight, Download } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  Shield, HardHat, Package,
}

export function CaseStudiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Case Studies"
          title="Real Deployments. Measurable Outcomes."
          description="See how TruEye has solved real challenges across industries."
          centered
          className="mb-14"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {CASE_STUDIES.map((cs) => {
            const Icon = ICONS[cs.icon]
            return (
              <motion.div
                key={cs.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card-cyan rounded-2xl p-7 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-5">
                  {Icon && <Icon size={24} className="text-[#00D4FF]" />}
                </div>
                <h3 className="font-poppins font-bold text-[#F0F4FF] text-lg mb-4">{cs.title}</h3>

                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider block mb-1">
                      Challenge
                    </span>
                    <p className="text-[#6B7FA3] text-sm leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider block mb-1">
                      Solution
                    </span>
                    <p className="text-[#6B7FA3] text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#00FF94] uppercase tracking-wider block mb-1">
                      Outcome
                    </span>
                    <p className="text-[#6B7FA3] text-sm leading-relaxed">{cs.result}</p>
                  </div>
                </div>

                <a
                  href={cs.pdf}
                  className="inline-flex items-center gap-2 mt-6 text-sm text-[#00D4FF] hover:gap-3 transition-all"
                  download
                >
                  <Download size={14} />
                  Download Case Study
                </a>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#00D4FF] font-medium hover:gap-3 transition-all"
          >
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}


