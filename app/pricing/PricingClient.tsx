'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Network, Server, Puzzle } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  Camera, Network, Server, Puzzle,
}

interface Tab {
  id: string
  icon: string
  title: string
  body: string
}

export default function PricingClient({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)

  return (
    <section className="py-16 bg-[#050A14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab, i) => {
            const Icon = ICONS[tab.icon]
            return (
              <button
                key={tab.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active === i
                    ? 'bg-[#00D4FF] text-black'
                    : 'border border-white/10 text-[#6B7FA3] hover:border-[#00D4FF]/30 hover:text-[#F0F4FF]'
                }`}
              >
                {Icon && <Icon size={14} />}
                {tab.title}
              </button>
            )
          })}
        </div>

        <div className="glass-card-cyan rounded-2xl p-8 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-poppins font-bold text-xl text-[#F0F4FF] mb-4">
                {tabs[active].title}
              </h3>
              <p className="text-body-lg text-[#6B7FA3] leading-relaxed">{tabs[active].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

