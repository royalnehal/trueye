'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '@/lib/data'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-24 bg-[#050A14]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          centered
          className="mb-12"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="glass-card rounded-xl overflow-hidden border border-white/10"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/2 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-[#F0F4FF] text-sm pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#00D4FF]/30 flex items-center justify-center">
                  {openIndex === i ? (
                    <Minus size={12} className="text-[#00D4FF]" />
                  ) : (
                    <Plus size={12} className="text-[#00D4FF]" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[#6B7FA3] text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
