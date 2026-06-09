'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoModal } from '@/components/ui/VideoModal'

const CYCLING_WORDS = ['Surveillance', 'Security', 'Intelligence', 'Analytics']

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; r: number; alpha: number
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!prefersReducedMotion) {
        particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0
        })
      }

      particles.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,212,255,${(1 - dist / 120) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const headlineWords = 'Redefining the Standards of'.split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050A14]">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-[#00D4FF]/20 rounded-full px-4 py-1.5 text-xs text-[#00D4FF] mb-8 bg-[#00D4FF]/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          50+ AI Analytics Modules · Real-Time Intelligence
        </motion.div>

        <h1 className="font-poppins font-bold text-[#F0F4FF] mb-3">
          <span className="block text-4xl sm:text-5xl md:text-display-xl lg:text-display-2xl leading-tight mb-2">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-display-xl lg:text-display-2xl leading-tight">
            <AnimatePresence mode="wait">
              <motion.span
                key={CYCLING_WORDS[wordIndex]}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="text-[#00D4FF]"
              >
                {CYCLING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-body-lg text-[#6B7FA3] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          TruEye converts raw CCTV footage into actionable insights across 50+ AI-driven analytics
          modules — empowering security, operations, and business intelligence in real time.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/#requestdemo" variant="primary" size="lg">
            Request a Demo
          </Button>
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-[#F0F4FF] border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
          >
            <span className="w-7 h-7 rounded-full border border-[#00D4FF]/50 flex items-center justify-center">
              <Play size={12} fill="#00D4FF" className="text-[#00D4FF] ml-0.5" />
            </span>
            Watch Overview
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-xs text-[#6B7FA3] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-[#6B7FA3] animate-bounce-chevron" />
      </motion.div>

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  )
}

