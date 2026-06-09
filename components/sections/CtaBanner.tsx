'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeUp, inViewConfig } from '@/lib/animations'

export function CtaBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <section className="py-20 bg-[#050A14] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <h2 className="font-poppins font-bold text-display-md md:text-display-lg text-[#F0F4FF] mb-5">
            Ready to Activate Your CCTV&apos;s Full Potential?
          </h2>
          <p className="text-body-lg text-[#6B7FA3] max-w-xl mx-auto mb-8">
            Join organizations worldwide using TruEye to turn surveillance footage into
            intelligent business decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#requestdemo"
              className="px-8 py-4 bg-[#00D4FF] text-black font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all duration-200 inline-flex items-center gap-2"
            >
              Request a Demo <ArrowRight size={16} />
            </Link>
            <Link
              href="/product"
              className="px-8 py-4 border border-[#00D4FF]/40 text-[#00D4FF] font-medium rounded-full hover:bg-[#00D4FF]/10 transition-all"
            >
              Explore the Platform
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

