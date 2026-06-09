'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ChevronRight } from 'lucide-react'

const VIDEOS = [
  {
    id: 'intrusion',
    title: 'Intrusion Detection',
    desc: 'See how TruEye flags unauthorised zone entry in under 2 seconds, triggering multi-channel alerts to security teams.',
    duration: '1:24',
    tag: 'Security',
    tagColor: '#EF4444',
    thumb: null, // SVG placeholder
    youtubeId: null, // replace with real IDs when available
  },
  {
    id: 'ppe',
    title: 'PPE Compliance Detection',
    desc: 'Watch TruEye identify missing helmets, vests, and gloves on factory floors — in real time, across multiple camera feeds.',
    duration: '1:48',
    tag: 'Safety',
    tagColor: '#F59E0B',
    thumb: null,
    youtubeId: null,
  },
  {
    id: 'crowd',
    title: 'Crowd Density Analytics',
    desc: 'Heat maps and occupancy alerts that tell facility managers exactly where and when crowd pressure is building.',
    duration: '2:05',
    tag: 'Operations',
    tagColor: '#A855F7',
    thumb: null,
    youtubeId: null,
  },
  {
    id: 'anpr',
    title: 'Vehicle ANPR & Gate Control',
    desc: 'Automatic number plate reading integrated with gate management — reducing vehicle entry time from minutes to seconds.',
    duration: '1:37',
    tag: 'Logistics',
    tagColor: '#22C55E',
    thumb: null,
    youtubeId: null,
  },
]

// ─── SVG Thumbnail Placeholder ────────────────────────────────────────────────

function VideoThumb({ color, icon }: { color: string; icon: string }) {
  return (
    <svg viewBox="0 0 320 180" width="320" height="180" fill="none" className="w-full h-full">
      <rect width="320" height="180" fill="#060C1A" />
      {/* Scanline overlay */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect key={i} x="0" y={i * 10} width="320" height="1" fill={color} opacity="0.03" />
      ))}
      {/* Perspective floor grid */}
      {[30, 60, 90, 120].map(y => (
        <line key={y} x1="0" y1={180} x2="160" y2={y} stroke={color} strokeWidth="0.4" opacity="0.12" />
      ))}
      {[80, 160, 240, 290].map(x => (
        <line key={x} x1={x} y1={180} x2="160" y2={60} stroke={color} strokeWidth="0.4" opacity="0.12" />
      ))}
      {/* Bounding box */}
      <rect x="90" y="55" width="80" height="90" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.04" strokeDasharray="4 2" />
      {/* Corner brackets */}
      <path d={`M90,55 L90,65 M90,55 L100,55`} stroke={color} strokeWidth="2" />
      <path d={`M170,55 L170,65 M170,55 L160,55`} stroke={color} strokeWidth="2" />
      <path d={`M90,145 L90,135 M90,145 L100,145`} stroke={color} strokeWidth="2" />
      <path d={`M170,145 L170,135 M170,145 L160,145`} stroke={color} strokeWidth="2" />
      {/* Label */}
      <rect x="90" y="43" width="50" height="14" rx="2" fill={color} />
      <text x="93" y="54" fontFamily="monospace" fontSize="7" fill="#050A14" fontWeight="bold">{icon}</text>
      {/* Confidence */}
      <text x="145" y="54" fontFamily="monospace" fontSize="7" fill={color}>98.7%</text>
      {/* CAM label */}
      <text x="8" y="16" fontFamily="monospace" fontSize="8" fill={color} opacity="0.7">CAM-01 | LIVE</text>
      {/* REC dot */}
      <circle cx="305" cy="11" r="4" fill="#EF4444">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="312" y="15" fontFamily="monospace" fontSize="8" fill="#EF4444" opacity="0.8">REC</text>
      {/* Bottom bar */}
      <rect x="0" y="165" width="320" height="15" fill="#000" opacity="0.4" />
      <text x="8" y="175" fontFamily="monospace" fontSize="7" fill={color} opacity="0.5">TRUEYE AI ANALYTICS</text>
    </svg>
  )
}

const THUMB_CONFIGS: Record<string, { color: string; icon: string }> = {
  intrusion: { color: '#EF4444', icon: 'INTRUDER' },
  ppe:       { color: '#F59E0B', icon: 'NO HELMET' },
  crowd:     { color: '#A855F7', icon: 'HIGH DENSITY' },
  anpr:      { color: '#22C55E', icon: 'MH 04 AB 1234' },
}

// ─── Modal placeholder ────────────────────────────────────────────────────────

function VideoModal({ video, onClose }: { video: typeof VIDEOS[0]; onClose: () => void }) {
  const cfg = THUMB_CONFIGS[video.id]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#0A1628] border border-white/10 rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
      >
        {/* Video area */}
        <div className="relative aspect-video bg-[#060C1A] flex items-center justify-center">
          <VideoThumb color={cfg.color} icon={cfg.icon} />
          {/* Coming soon overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
              <Play size={28} fill="white" className="text-white ml-1" />
            </div>
            <p className="text-white font-semibold text-lg">Demo Video Coming Soon</p>
            <p className="text-[#6B7FA3] text-sm mt-2">Contact us for a live walkthrough</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        {/* Info */}
        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-2 inline-block"
              style={{ background: `${cfg.color}20`, color: cfg.color }}
            >
              {video.tag}
            </span>
            <h3 className="font-poppins font-bold text-[#F0F4FF] text-xl mt-1">{video.title}</h3>
            <p className="text-[#6B7FA3] text-sm mt-2 leading-relaxed">{video.desc}</p>
          </div>
          <a
            href="/#requestdemo"
            onClick={onClose}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-semibold hover:bg-[#00D4FF]/25 transition-colors whitespace-nowrap"
          >
            Book Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function VideoShowcase() {
  const [selected, setSelected] = useState<typeof VIDEOS[0] | null>(null)

  return (
    <section className="py-24 bg-[#050A14] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 30%, rgba(168,85,247,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#A855F7] mb-4">
            See It in Action
          </span>
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-4">
            TruEye Module Walkthroughs
          </h2>
          <p className="text-body-lg text-[#6B7FA3] max-w-2xl mx-auto">
            Watch how each AI module detects, alerts, and learns — in real camera environments.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map(video => {
            const cfg = THUMB_CONFIGS[video.id]
            return (
              <motion.div
                key={video.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelected(video)}
              >
                {/* Thumbnail */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors aspect-video bg-[#060C1A]">
                  <VideoThumb color={cfg.color} icon={cfg.icon} />
                  {/* Hover play overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm">
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white font-mono">
                    {video.duration}
                  </div>
                  {/* Tag */}
                  <div
                    className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: `${cfg.color}30`, color: cfg.color }}
                  >
                    {video.tag}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3 px-1">
                  <h3 className="font-semibold text-[#F0F4FF] text-sm group-hover:text-[#00D4FF] transition-colors flex items-center gap-1">
                    {video.title}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-[#6B7FA3] mt-1 leading-relaxed line-clamp-2">{video.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6B7FA3] text-sm mb-4">
            Want a personalised walkthrough of your specific use case?
          </p>
          <a
            href="/#requestdemo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
          >
            <Play size={14} fill="white" />
            Request a Live Demo
          </a>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
