'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MODULE_MARQUEE_ROW1, MODULE_MARQUEE_ROW2 } from '@/lib/data'
import { slideRight, slideLeft, inViewConfig } from '@/lib/animations'

function AnalyticsDashboardMockup() {
  return (
    <div className="relative bg-[#0A1628] rounded-2xl border border-white/10 overflow-hidden aspect-[4/3] max-w-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050A14]/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF94]" />
          <span className="text-xs text-[#6B7FA3] font-mono">TruEye — LIVE</span>
        </div>
        <span className="text-xs text-[#00D4FF] font-mono">4 cameras active</span>
      </div>

      {/* Camera grid */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative bg-[#050A14] rounded-lg aspect-video overflow-hidden">
            {/* Fake surveillance feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D1F3C] to-[#050A14]" />
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            {/* Bounding box */}
            {i === 1 && (
              <div
                className="bbox-overlay"
                style={{ top: '25%', left: '20%', width: '35%', height: '50%' }}
              />
            )}
            {i === 3 && (
              <div
                className="bbox-overlay"
                style={{ top: '15%', left: '40%', width: '45%', height: '60%', animationDelay: '0.8s' }}
              />
            )}
            {/* Camera label */}
            <span className="absolute top-1.5 left-2 text-[9px] text-[#6B7FA3] font-mono">
              CAM-0{i}
            </span>
            {/* Alert indicator on cam 1 */}
            {i === 1 && (
              <span className="absolute top-1.5 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] text-red-400 font-mono">ALERT</span>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Heat map panel */}
      <div className="mx-3 mb-3 p-3 bg-[#050A14]/60 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#6B7FA3] font-mono">Activity Heat Map — Zone A</span>
          <span className="text-xs text-[#00D4FF] font-mono">Live</span>
        </div>
        <div className="relative h-8 rounded-lg overflow-hidden">
          <div
            style={{
              background:
                'linear-gradient(90deg, rgba(0,212,255,0.1) 0%, rgba(0,255,148,0.3) 30%, rgba(255,200,0,0.5) 55%, rgba(255,80,0,0.7) 75%, rgba(255,80,0,0.4) 100%)',
            }}
            className="absolute inset-0 rounded-lg"
          />
          {/* Activity blobs */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[55%] w-8 h-6 rounded-full bg-red-500/40 blur-sm" />
          <div className="absolute top-1/2 -translate-y-1/2 left-[30%] w-6 h-5 rounded-full bg-yellow-500/30 blur-sm" />
        </div>
        <div className="flex justify-between text-[9px] text-[#6B7FA3]/50 mt-1 font-mono">
          <span>Low</span><span>Medium</span><span>High</span>
        </div>
      </div>
    </div>
  )
}

export function FeaturesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <>
      {/* Platform overview */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={slideRight}
            >
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] block mb-4">
                Platform Overview
              </span>
              <h2 className="font-poppins font-bold text-display-md md:text-display-lg text-[#F0F4FF] leading-tight mb-5">
                The Intelligence Layer Your CCTV Was Missing
              </h2>
              <p className="text-body-lg text-[#6B7FA3] mb-6 leading-relaxed">
                TruEye adds a powerful AI analytics layer on top of your existing camera
                infrastructure. No rip-and-replace. No new hardware headaches. Just 50+
                intelligent modules activating on the footage you already collect — transforming
                it into decisions, alerts, and competitive advantage.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time alerts under 2 seconds',
                  'Automated compliance monitoring',
                  'Predictive maintenance detection',
                  'Operational dashboards and analytics',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#F0F4FF]/80 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 text-[#00D4FF] font-medium hover:gap-3 transition-all"
              >
                Explore the Full Platform <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={slideLeft}
              className="flex justify-center lg:justify-end"
            >
              <AnalyticsDashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Modules Marquee */}
      <section className="py-20 bg-[#050A14] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <SectionHeading
            label="AI Modules"
            title="50+ AI-Powered Analytics Modules"
            description="Purpose-built intelligence for every surveillance and operational challenge."
            centered
          />
        </div>

        {/* Row 1 — left */}
        <div className="mb-3 flex">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...MODULE_MARQUEE_ROW1, ...MODULE_MARQUEE_ROW1].map((mod, i) => (
              <span
                key={`r1-${i}`}
                className="inline-flex items-center gap-2 mx-2 px-4 py-2 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] text-sm font-mono whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                {mod}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="flex">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...MODULE_MARQUEE_ROW2, ...MODULE_MARQUEE_ROW2].map((mod, i) => (
              <span
                key={`r2-${i}`}
                className="inline-flex items-center gap-2 mx-2 px-4 py-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/5 text-[#6B7FA3] text-sm font-mono whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 px-4">
          <p className="text-[#6B7FA3] text-sm mb-4">
            ——and 30+ more modules tailored to your use case.
          </p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-[#00D4FF] font-medium hover:gap-3 transition-all text-sm"
          >
            View All Modules <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}

