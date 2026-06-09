'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus, X, Download } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, inViewConfig } from '@/lib/animations'

interface Module {
  id: number
  name: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface Benefit {
  icon: string
  stat: string
  label: string
  description: string
}

const SIGNIFICANCE = [
  {
    title: 'Safety Monitoring',
    description:
      'TruEye continuously monitors workspaces for PPE violations, restricted zone breaches, and unsafe behaviors. Safety Monitoring is one of the most critical applications of video analytics in industrial scenarios — enabling immediate alerts before accidents occur and reducing workplace incident rates significantly.',
  },
  {
    title: 'Machine Failure Prediction',
    description:
      'By analyzing indicator lights, vibration patterns, and operational anomalies in real time, TruEye flags equipment issues before they become failures. Machine Failure Prediction through video analytics enables predictive maintenance strategies that reduce downtime and extend equipment lifespan.',
  },
  {
    title: 'Quality Control',
    description:
      'TruEye enables automated visual inspection of production lines, detecting defects, misalignments, and non-conforming products without manual inspection. This delivers consistent quality outputs at a speed and scale impossible to achieve through human review.',
  },
  {
    title: 'Inventory Management',
    description:
      'Through automated object counting and tracking, TruEye monitors stock levels, product movement, and storage utilization 24/7. This prevents stockouts, overstocking, and pilferage — providing real-time inventory accuracy without physical counting cycles.',
  },
  {
    title: 'Supply Chain Optimization',
    description:
      'TruEye tracks goods movement from receipt through dispatch, identifying bottlenecks, delays, and inefficiencies across the logistics chain. Organizations gain end-to-end visibility that enables faster decisions and reduces costly operational delays.',
  },
  {
    title: 'Energy Efficiency',
    description:
      'By detecting idle equipment, unused lighting zones, and occupancy patterns, TruEye surfaces energy waste opportunities automatically. This enables targeted interventions that reduce energy costs and environmental footprint without manual energy audits.',
  },
  {
    title: 'Workforce Management',
    description:
      'TruEye analyzes operator presence, movement patterns, task durations, and productivity metrics across operational areas. This enables data-driven staffing decisions, task optimization, and accountability tracking without invasive monitoring.',
  },
  {
    title: 'Security Surveillance',
    description:
      'TruEye provides 24/7 intelligent security monitoring: intrusion detection, camera tampering alerts, unauthorized access, and suspicious behavior flagging. Unlike manual monitoring, TruEye never experiences fatigue, distraction, or lapses in coverage.',
  },
]

export default function ProductClient({
  modules,
  faqs,
  benefits,
}: {
  modules: Module[]
  faqs: FAQ[]
  benefits: Benefit[]
}) {
  const [activeModule, setActiveModule] = useState<Module | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openSig, setOpenSig] = useState<number | null>(null)
  const modulesRef = useRef(null)
  const modulesInView = useInView(modulesRef, inViewConfig)

  return (
    <>
      {/* Industrial Significance Accordion */}
      <section className="py-20 bg-[#050A14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Industrial Significance"
            title="Significance of Video Analytics in Industrial Scenarios"
            className="mb-10"
          />
          <div className="space-y-3">
            {SIGNIFICANCE.map((item, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden border border-white/10">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/2 transition-colors"
                  onClick={() => setOpenSig(openSig === i ? null : i)}
                  aria-expanded={openSig === i}
                >
                  <h3 className="font-poppins font-semibold text-[#F0F4FF] text-sm">
                    {item.title}
                  </h3>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#00D4FF]/30 flex items-center justify-center">
                    {openSig === i ? (
                      <Minus size={12} className="text-[#00D4FF]" />
                    ) : (
                      <Plus size={12} className="text-[#00D4FF]" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openSig === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[#6B7FA3] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19 AI Modules Grid */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="AI Modules"
            title="AI Analytics Modules Built for Real Scenarios"
            description="Click any module to explore its capabilities in detail."
            centered
            className="mb-12"
          />
          <motion.div
            ref={modulesRef}
            initial="hidden"
            animate={modulesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {modules.map((mod) => (
              <motion.button
                key={mod.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setActiveModule(mod)}
                className="glass-card-cyan rounded-xl p-5 text-left hover:border-[#00D4FF]/40 transition-all cursor-pointer group"
              >
                <span className="font-mono text-2xl font-bold text-[#00D4FF]/30 block mb-2">
                  {String(mod.id).padStart(2, '0')}
                </span>
                <h3 className="font-poppins font-semibold text-[#F0F4FF] text-sm group-hover:text-[#00D4FF] transition-colors">
                  {mod.name}
                </h3>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Module Detail Drawer */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModule(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0A1628] border border-[#00D4FF]/20 rounded-2xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModule(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#6B7FA3] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <span className="font-mono text-4xl font-bold text-[#00D4FF]/20 block mb-3">
                {String(activeModule.id).padStart(2, '0')}
              </span>
              <h3 className="font-poppins font-bold text-xl text-[#F0F4FF] mb-4">
                {activeModule.name}
              </h3>
              <p className="text-[#6B7FA3] leading-relaxed mb-6">{activeModule.description}</p>
              <a
                href="/images/TruEye-Product.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 transition-all"
              >
                <Download size={14} />
                Download Full Product Presentation
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits */}
      <section className="py-20 bg-[#050A14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Benefits"
            title="Key Benefits of TruEye Video Analytics"
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.stat}
                className="glass-card p-7 rounded-2xl border border-white/10 hover:border-[#00D4FF]/20 transition-colors"
              >
                <div className="font-poppins font-bold text-xl text-[#F0F4FF] mb-1">{b.stat}</div>
                <div className="text-sm font-medium text-[#00D4FF] mb-3">{b.label}</div>
                <p className="text-[#6B7FA3] text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            centered
            className="mb-10"
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden border border-white/10">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/2 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-[#F0F4FF] text-sm">{faq.question}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#00D4FF]/30 flex items-center justify-center">
                    {openFaq === i ? (
                      <Minus size={12} className="text-[#00D4FF]" />
                    ) : (
                      <Plus size={12} className="text-[#00D4FF]" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[#6B7FA3] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

