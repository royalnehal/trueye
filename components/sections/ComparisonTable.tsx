'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { COMPARISON_TABLE } from '@/lib/data'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, inViewConfig } from '@/lib/animations'

export function ComparisonTable() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-24 bg-[#050A14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Comparison"
          title="AI Video Analytics vs Manual Monitoring"
          description="See exactly how TruEye outperforms traditional surveillance methods across every critical dimension."
          centered
          className="mb-12"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="overflow-x-auto rounded-2xl border border-white/10"
        >
          <table className="comparison-table w-full">
            <thead>
              <tr>
                <th className="w-1/3 text-left">Factor</th>
                <th className="w-1/3">
                  <span className="flex items-center gap-2">
                    <X size={14} className="text-red-400" />
                    Manual Monitoring
                  </span>
                </th>
                <th className="w-1/3">
                  <span className="flex items-center gap-2 text-[#00D4FF]">
                    <Check size={14} className="text-[#00FF94]" />
                    TruEye AI Analytics
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row, i) => (
                <tr key={row.factor} className={i % 2 === 0 ? '' : 'bg-white/2'}>
                  <td className="font-medium text-[#F0F4FF]/80 text-sm">{row.factor}</td>
                  <td className="text-[#6B7FA3] text-sm">{row.manual}</td>
                  <td className="text-[#00D4FF] text-sm font-medium">{row.trueye}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
