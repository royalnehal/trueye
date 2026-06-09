import { GEO_ENTITY_PARAGRAPH } from '@/lib/data'

export function WhatIsTruEye() {
  return (
    <section className="py-16 bg-[#050A14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-[#00D4FF] glass-card-cyan pl-8 pr-6 py-8">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] block mb-3">
            What is TruEye?
          </span>
          <p className="text-body-lg text-[#F0F4FF]/90 leading-relaxed">
            {GEO_ENTITY_PARAGRAPH}
          </p>
        </div>
      </div>
    </section>
  )
}
