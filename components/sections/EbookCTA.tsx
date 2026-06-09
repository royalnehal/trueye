'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, BookOpen } from 'lucide-react'
import { EBOOK_BULLETS } from '@/lib/data'
import { slideRight, slideLeft, inViewConfig } from '@/lib/animations'

export function EbookCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      {/* Diagonal top cut */}
      <div
        className="absolute top-0 left-0 right-0 h-16 bg-[#050A14]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
        aria-hidden="true"
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Book mockup */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideRight}
            className="flex justify-center"
          >
            <div className="relative w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-[#00D4FF]/20 bg-gradient-to-br from-[#0D1F3C] to-[#050A14] shadow-2xl shadow-[#00D4FF]/10">
              {/* Book cover design */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full border-2 border-[#00D4FF] flex items-center justify-center mb-6">
                  <BookOpen size={22} className="text-[#00D4FF]" />
                </div>
                <span className="text-xs text-[#00D4FF] uppercase tracking-widest font-mono mb-3">
                  Prime Guide
                </span>
                <h3 className="font-poppins font-bold text-white text-xl leading-tight mb-auto">
                  Deploying Video Analytics
                </h3>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-xs text-[#6B7FA3]">By TruEye · VertexPlus Technologies</span>
                </div>
              </div>
              {/* Spine */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-[#00D4FF]/30 to-[#0066FF]/30" />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideLeft}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#00FF94] mb-4 px-3 py-1 border border-[#00FF94]/30 rounded-full bg-[#00FF94]/5">
              Free Resource
            </span>
            <h2 className="font-poppins font-bold text-display-md md:text-display-lg text-[#F0F4FF] leading-tight mb-5">
              The Prime Guide to Deploying Video Analytics
            </h2>
            <ul className="space-y-3 mb-8">
              {EBOOK_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[#6B7FA3] text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href="/images/TruEye-PrimeGuide.pdf"
              download
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#00D4FF] text-black font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all duration-200"
            >
              <Download size={18} />
              Download Your Free Copy
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

