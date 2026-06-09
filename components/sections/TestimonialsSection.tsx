'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "TruEye cut our false alarm rate by 84% in the first month. Our security team now responds to real threats, not phantom alerts. The ROI was visible within 6 weeks of deployment.",
    name: "Rajiv Sharma",
    title: "Head of Security Operations",
    company: "Maruti Suzuki",
    industry: "Automotive",
    metric: "84% fewer false alarms",
    avatar: "RS",
    color: "#00D4FF",
  },
  {
    id: 2,
    quote: "We deployed TruEye across 3 manufacturing units. The PPE compliance module alone has reduced safety violations by 91%. Our insurance premiums dropped as a result.",
    name: "Anita Menon",
    title: "VP — Environment, Health & Safety",
    company: "P&G India",
    industry: "FMCG Manufacturing",
    metric: "91% PPE compliance rate",
    avatar: "AM",
    color: "#A855F7",
  },
  {
    id: 3,
    quote: "The ANPR module integrated with our gate management system in under 2 days. Vehicle entry time dropped from 4 minutes to under 30 seconds. Completely transformed our logistics flow.",
    name: "Deepak Verma",
    title: "Director — Logistics & Supply Chain",
    company: "Hero Honda",
    industry: "Automotive",
    metric: "87% faster gate clearance",
    avatar: "DV",
    color: "#22C55E",
  },
  {
    id: 4,
    quote: "TruEye's crowd analytics helped us manage peak-hour footfall during festival seasons. We now proactively deploy staff before congestion builds — something no human operator could anticipate.",
    name: "Priya Nair",
    title: "General Manager — Operations",
    company: "Digital Hospitality",
    industry: "Hospitality",
    metric: "38% better crowd management",
    avatar: "PN",
    color: "#F59E0B",
  },
  {
    id: 5,
    quote: "As a media house, we needed tight access control across our editorial and press floors. TruEye's face recognition module made unauthorised entry impossible while keeping the workflow smooth for staff.",
    name: "Suresh Mathur",
    title: "Chief Technology Officer",
    company: "Rajasthan Patrika",
    industry: "Media",
    metric: "Zero unauthorised access incidents",
    avatar: "SM",
    color: "#EF4444",
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B">
          <polygon points="7,1 8.8,5.2 13.4,5.5 10,8.5 11.1,13 7,10.5 2.9,13 4,8.5 0.6,5.5 5.2,5.2" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActive(a => (a + 1) % TESTIMONIALS.length)
    }, 5500)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
    startTimer()
  }

  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => goTo((active + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[active]

  return (
    <section className="py-24 bg-[#060C1A] relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-4">
            Client Stories
          </span>
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-body-lg text-[#6B7FA3] max-w-2xl mx-auto">
            Real results from enterprises that made the switch to AI-powered video analytics.
          </p>
        </div>

        {/* Main card */}
        <div className="relative min-h-[360px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                />

                {/* Quote icon */}
                <Quote
                  size={40}
                  className="absolute top-8 right-8 opacity-5"
                  style={{ color: t.color }}
                />

                <div className="grid md:grid-cols-[1fr_220px] gap-8 items-start">
                  {/* Quote */}
                  <div>
                    <StarRating />
                    <blockquote className="mt-5 text-lg text-[#D4E0F0] leading-relaxed font-light">
                      "{t.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-8">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-[#F0F4FF]">{t.name}</p>
                        <p className="text-sm text-[#6B7FA3]">{t.title}</p>
                        <p className="text-sm font-medium" style={{ color: t.color }}>{t.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metric card */}
                  <div
                    className="rounded-xl p-6 text-center border"
                    style={{ background: `${t.color}08`, borderColor: `${t.color}25` }}
                  >
                    <p className="text-xs text-[#6B7FA3] uppercase tracking-wider mb-3">Key Result</p>
                    <p
                      className="font-poppins font-bold text-xl leading-tight mb-3"
                      style={{ color: t.color }}
                    >
                      {t.metric}
                    </p>
                    <span className="inline-block text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[#6B7FA3]">
                      {t.industry}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 h-2 bg-[#00D4FF]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Company logos row */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <p className="text-xs text-[#6B7FA3] text-center mb-6 uppercase tracking-wider">
            Enterprises that trust TruEye
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goTo(i)}
                className={`text-sm font-bold transition-all duration-200 ${
                  i === active ? 'text-[#F0F4FF] opacity-100' : 'text-[#6B7FA3] opacity-50 hover:opacity-80'
                }`}
              >
                {item.company}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
