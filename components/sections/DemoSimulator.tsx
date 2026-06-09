'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, Shield, Users, Car, Eye, Thermometer,
  HardHat, AlertTriangle, CheckCircle, Wifi,
  Activity, ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type ModuleId = 'intrusion' | 'crowd' | 'ppe' | 'face' | 'vehicle' | 'heatmap'
type Severity = 'critical' | 'warning' | 'info'

interface AlertItem {
  id: number; ts: string; cam: string
  msg: string; severity: Severity
}

// â”€â”€â”€ Module Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const MODULES = [
  {
    id: 'intrusion' as ModuleId,
    label: 'Intrusion Detection',
    icon: Shield,
    color: '#FF4444',
    tw: { border: 'border-red-500/40', bg: 'bg-red-500/10', text: 'text-red-400', glow: 'shadow-red-500/20' },
    detections: [
      { x: 14, y: 22, w: 13, h: 36, label: 'INTRUDER', sub: 'Restricted Zone A', confidence: 98.7, severity: 'critical' as Severity, pulse: true },
      { x: 60, y: 28, w: 12, h: 33, label: 'PERSON', sub: 'Zone B â€” Monitored', confidence: 94.2, severity: 'warning' as Severity },
    ],
    alerts: [
      ['Unauthorised entry â€” Zone A3 breached', 'critical' as Severity],
      ['Person detected in restricted perimeter', 'critical' as Severity],
      ['After-hours intrusion â€” Gate 2', 'warning' as Severity],
      ['Motion in no-access zone â€” Building rear', 'warning' as Severity],
      ['Perimeter breach cleared â€” Zone A3', 'info' as Severity],
    ],
    stat: { label: 'Intrusions Blocked', value: '1,247', sub: '+3 today' },
    desc: 'Detects unauthorised entry into restricted zones in real time with <2s alert latency.',
  },
  {
    id: 'crowd' as ModuleId,
    label: 'Crowd Analysis',
    icon: Users,
    color: '#00D4FF',
    tw: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    detections: [
      { x: 8,  y: 28, w: 11, h: 30, label: '#1', sub: '', confidence: 99.1, severity: 'info' as Severity },
      { x: 23, y: 26, w: 11, h: 31, label: '#2', sub: '', confidence: 97.8, severity: 'info' as Severity },
      { x: 38, y: 29, w: 11, h: 29, label: '#3', sub: '', confidence: 96.5, severity: 'info' as Severity },
      { x: 53, y: 27, w: 11, h: 30, label: '#4', sub: '', confidence: 98.3, severity: 'info' as Severity },
      { x: 67, y: 31, w: 11, h: 28, label: '#5', sub: 'Density HIGH', confidence: 95.7, severity: 'warning' as Severity, pulse: true },
    ],
    alerts: [
      ['Crowd density HIGH â€” 47 persons in Zone C', 'critical' as Severity],
      ['Queue length exceeded threshold â€” Exit 3', 'warning' as Severity],
      ['Social distancing violation detected', 'warning' as Severity],
      ['Overcrowding alert â€” Lobby Area', 'critical' as Severity],
      ['Crowd density normalising â€” Zone C', 'info' as Severity],
    ],
    stat: { label: 'People Counted Today', value: '8,432', sub: 'Peak: 2:30 PM' },
    desc: 'Real-time headcount, density heatmaps, and crowd flow analytics across all zones.',
  },
  {
    id: 'ppe' as ModuleId,
    label: 'PPE Detection',
    icon: HardHat,
    color: '#FFB800',
    tw: { border: 'border-yellow-500/40', bg: 'bg-yellow-500/10', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
    detections: [
      { x: 18, y: 18, w: 14, h: 38, label: 'COMPLIANT', sub: 'Helmet + Vest', confidence: 99.3, severity: 'info' as Severity },
      { x: 56, y: 20, w: 14, h: 37, label: 'VIOLATION', sub: 'No Helmet', confidence: 97.6, severity: 'critical' as Severity, pulse: true },
    ],
    alerts: [
      ['PPE violation â€” Worker #4, No helmet', 'critical' as Severity],
      ['Safety gear missing â€” Zone D, Bay 3', 'critical' as Severity],
      ['High-vis vest not detected â€” Forklift area', 'warning' as Severity],
      ['No safety goggles â€” Chemical zone', 'warning' as Severity],
      ['Compliance rate improved â€” Shift 2: 98%', 'info' as Severity],
    ],
    stat: { label: 'Safety Violations Today', value: '12', sub: 'â†“ 34% vs yesterday' },
    desc: 'Automatically detects helmets, vests, goggles, and gloves â€” zero manual inspection.',
  },
  {
    id: 'face' as ModuleId,
    label: 'Face Recognition',
    icon: Eye,
    color: '#00FF94',
    tw: { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    detections: [
      { x: 16, y: 15, w: 15, h: 19, label: 'AUTHORISED', sub: 'Emp. EMP-0042', confidence: 99.8, severity: 'info' as Severity },
      { x: 59, y: 17, w: 14, h: 18, label: 'UNKNOWN', sub: 'No DB match', confidence: 91.2, severity: 'critical' as Severity, pulse: true },
    ],
    alerts: [
      ['Unknown face â€” Server Room entrance', 'critical' as Severity],
      ['Blacklisted individual â€” Alert sent', 'critical' as Severity],
      ['VIP recognised â€” Mr. Sharma, Director', 'info' as Severity],
      ['Tailgating attempt â€” 2 persons, 1 auth', 'warning' as Severity],
      ['Access granted â€” Biometric verified', 'info' as Severity],
    ],
    stat: { label: 'Faces Recognised Today', value: '2,891', sub: '3 unknowns flagged' },
    desc: 'Identifies authorised staff, flags unknown faces, and logs entry/exit events.',
  },
  {
    id: 'vehicle' as ModuleId,
    label: 'Vehicle ANPR',
    icon: Car,
    color: '#FF6B35',
    tw: { border: 'border-orange-500/40', bg: 'bg-orange-500/10', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
    detections: [
      { x: 6, y: 42, w: 40, h: 30, label: 'RJ 14 AB 2341', sub: 'Authorised', confidence: 99.4, severity: 'info' as Severity },
      { x: 52, y: 44, w: 36, h: 28, label: 'DL 4C 9021', sub: 'BLACKLISTED', confidence: 98.8, severity: 'critical' as Severity, pulse: true },
    ],
    alerts: [
      ['Blacklisted plate: DL 4C 9021 detected', 'critical' as Severity],
      ['Unregistered vehicle â€” Parking Zone B', 'warning' as Severity],
      ['Wrong-way vehicle â€” Entrance 1', 'critical' as Severity],
      ['Overspeeding: 42 km/h in 20 zone', 'warning' as Severity],
      ['Vehicle RJ 14 AB 2341 â€” Exit logged', 'info' as Severity],
    ],
    stat: { label: 'Vehicles Processed Today', value: '634', sub: '2 violations flagged' },
    desc: 'Reads number plates in motion, cross-checks against allow/block lists instantly.',
  },
  {
    id: 'heatmap' as ModuleId,
    label: 'Activity Heat Map',
    icon: Thermometer,
    color: '#FF44AA',
    tw: { border: 'border-pink-500/40', bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
    detections: [],
    alerts: [
      ['Hot zone â€” Checkout Area 3 (94% density)', 'critical' as Severity],
      ['Idle zone detected â€” Aisle 7 (low traffic)', 'info' as Severity],
      ['Peak path mapped â€” Entrance to Aisle 2', 'info' as Severity],
      ['Staff gap â€” Zone F, 11AMâ€“1PM window', 'warning' as Severity],
      ['Heat map report generated â€” Last 24h', 'info' as Severity],
    ],
    stat: { label: 'Zones Monitored', value: '24', sub: '6 hot zones active' },
    desc: 'Visualises foot traffic density over time to optimise layouts and staffing.',
  },
]

const CAMERAS = [
  { id: 1, label: 'CAM-01', loc: 'Main Entrance' },
  { id: 2, label: 'CAM-02', loc: 'Warehouse A' },
  { id: 3, label: 'CAM-03', loc: 'Parking Lot' },
  { id: 4, label: 'CAM-04', loc: 'Server Room' },
]

const SEV_COLORS: Record<Severity, string> = {
  critical: '#FF4444',
  warning:  '#FFB800',
  info:     '#00D4FF',
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour12: false })
}

// â”€â”€â”€ Camera Feed SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CameraFeed({
  mod, camId, isMain, onClick,
}: {
  mod: typeof MODULES[0]
  camId: number
  isMain: boolean
  onClick?: () => void
}) {
  const cam = CAMERAS[camId - 1]
  const isHeatmap = mod.id === 'heatmap'

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden bg-[#050A14] border cursor-pointer select-none
        ${isMain ? 'border-white/10' : 'border-white/5 hover:border-white/20 transition-colors'}`}
      style={{ aspectRatio: '16/9' }}
    >
      <svg
        viewBox="0 0 400 225"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`bg-${camId}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0D1F3C" />
            <stop offset="100%" stopColor="#050A14" />
          </radialGradient>
          {/* Heat map gradients */}
          <radialGradient id={`heat1-${camId}`} cx="35%" cy="55%" r="25%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`heat2-${camId}`} cx="65%" cy="50%" r="20%">
            <stop offset="0%" stopColor="#FF8800" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8800" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`heat3-${camId}`} cx="50%" cy="65%" r="30%">
            <stop offset="0%" stopColor="#FFFF00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFF00" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`heat4-${camId}`} cx="20%" cy="40%" r="15%">
            <stop offset="0%" stopColor="#00FF00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FF00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="400" height="225" fill={`url(#bg-${camId})`} />

        {/* Perspective floor grid */}
        {[0.2, 0.35, 0.5, 0.65, 0.8, 1].map((t, i) => (
          <line
            key={`h${i}`}
            x1={200 - 200 * t} y1={90 + 90 * t}
            x2={200 + 200 * t} y2={90 + 90 * t}
            stroke="rgba(0,212,255,0.06)" strokeWidth="0.5"
          />
        ))}
        {[-3, -2, -1, 0, 1, 2, 3].map((v, i) => (
          <line
            key={`v${i}`}
            x1={200 + v * 40} y1={90}
            x2={200 + v * 120} y2={225}
            stroke="rgba(0,212,255,0.06)" strokeWidth="0.5"
          />
        ))}

        {/* Scene objects (walls / furniture silhouettes) */}
        <rect x="0" y="75" width="400" height="8" fill="rgba(255,255,255,0.03)" />
        {camId === 3 && (
          <>
            {/* Parking lot markings */}
            {[50, 110, 170, 230, 290, 350].map(x => (
              <rect key={x} x={x} y="140" width="2" height="60" fill="rgba(255,255,255,0.08)" />
            ))}
          </>
        )}

        {/* Heat map overlay */}
        {isHeatmap && (
          <>
            <rect width="400" height="225" fill={`url(#heat1-${camId})`} />
            <rect width="400" height="225" fill={`url(#heat2-${camId})`} />
            <rect width="400" height="225" fill={`url(#heat3-${camId})`} />
            <rect width="400" height="225" fill={`url(#heat4-${camId})`} />
          </>
        )}

        {/* Detections */}
        {!isHeatmap && mod.detections.map((d, i) => {
          const x = (d.x / 100) * 400
          const y = (d.y / 100) * 225
          const w = (d.w / 100) * 400
          const h = (d.h / 100) * 225
          const col = SEV_COLORS[d.severity]
          const cornerSize = Math.min(w, h) * 0.18

          return (
            <g key={i}>
              {/* Corner brackets */}
              {/* TL */}
              <path d={`M${x + cornerSize},${y} L${x},${y} L${x},${y + cornerSize}`}
                stroke={col} strokeWidth="2" fill="none" opacity="0.9" />
              {/* TR */}
              <path d={`M${x + w - cornerSize},${y} L${x + w},${y} L${x + w},${y + cornerSize}`}
                stroke={col} strokeWidth="2" fill="none" opacity="0.9" />
              {/* BL */}
              <path d={`M${x},${y + h - cornerSize} L${x},${y + h} L${x + cornerSize},${y + h}`}
                stroke={col} strokeWidth="2" fill="none" opacity="0.9" />
              {/* BR */}
              <path d={`M${x + w - cornerSize},${y + h} L${x + w},${y + h} L${x + w},${y + h - cornerSize}`}
                stroke={col} strokeWidth="2" fill="none" opacity="0.9" />

              {/* Label bar */}
              <rect x={x} y={y - 16} width={w} height={16} fill={col} opacity="0.85" rx="2" />
              <text x={x + 4} y={y - 4}
                fontSize="8" fill="black" fontFamily="monospace" fontWeight="bold">
                {d.label}
              </text>
              <text x={x + w - 4} y={y - 4}
                fontSize="7" fill="black" fontFamily="monospace"
                textAnchor="end">
                {d.confidence}%
              </text>

              {/* Sub-label */}
              {d.sub && (
                <>
                  <rect x={x} y={y + h} width={Math.min(w, d.sub.length * 5.5 + 8)} height={13}
                    fill="rgba(0,0,0,0.7)" rx="2" />
                  <text x={x + 4} y={y + h + 9}
                    fontSize="7" fill={col} fontFamily="monospace">
                    {d.sub}
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* Heat map legend */}
        {isHeatmap && isMain && (
          <g>
            <rect x="10" y="175" width="90" height="40" fill="rgba(0,0,0,0.6)" rx="4" />
            <text x="18" y="187" fontSize="7" fill="#aaa" fontFamily="monospace">DENSITY SCALE</text>
            {[['#00FF00', 'Low'], ['#FFFF00', 'Med'], ['#FF8800', 'High'], ['#FF0000', 'Max']].map(([c, l], i) => (
              <g key={i}>
                <rect x={14 + i * 20} y="192" width="14" height="8" fill={c} opacity="0.7" rx="1" />
                <text x={14 + i * 20} y="207" fontSize="6" fill="#888" fontFamily="monospace">{l}</text>
              </g>
            ))}
          </g>
        )}

        {/* Scanline overlay */}
        <rect width="400" height="225"
          fill="url(#scanline)" opacity="0.03"
          style={{ backgroundImage: 'repeating-linear-gradient(transparent 50%,rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 3px' }}
        />
      </svg>

      {/* Camera HUD overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-1.5 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] text-white/80 font-mono">{cam.label}</span>
            <span className="text-[8px] text-white/40 font-mono">|</span>
            <span className="text-[9px] text-white/50 font-mono">{cam.loc}</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi size={8} className="text-green-400 opacity-80" />
            <span className="text-[8px] text-white/40 font-mono">LIVE</span>
          </div>
        </div>

        {/* Bottom timestamp */}
        <div className="absolute bottom-1 left-2">
          <span suppressHydrationWarning className="text-[8px] text-white/30 font-mono">{new Date().toLocaleDateString('en-IN')} {getTime()}</span>
        </div>

        {/* Active module badge */}
        <div className="absolute bottom-1 right-2">
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: mod.color + '30', color: mod.color }}>
            {mod.label.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Selected indicator */}
      {isMain && (
        <div className="absolute inset-0 ring-2 ring-inset pointer-events-none rounded-xl"
          style={{ boxShadow: `inset 0 0 0 2px ${mod.color}50` }} />
      )}
    </div>
  )
}

// â”€â”€â”€ Alert Feed â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function AlertFeed({ alerts }: { alerts: AlertItem[] }) {
  const SevIcon = ({ sev }: { sev: Severity }) => {
    if (sev === 'critical') return <AlertTriangle size={10} className="text-red-400 flex-shrink-0 mt-0.5" />
    if (sev === 'warning')  return <AlertTriangle size={10} className="text-yellow-400 flex-shrink-0 mt-0.5" />
    return <CheckCircle size={10} className="text-cyan-400 flex-shrink-0 mt-0.5" />
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: '200px' }}>
      <AnimatePresence initial={false}>
        {alerts.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: 20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex gap-2 p-2 rounded-lg border text-xs ${
              a.severity === 'critical'
                ? 'bg-red-500/8 border-red-500/20'
                : a.severity === 'warning'
                ? 'bg-yellow-500/8 border-yellow-500/20'
                : 'bg-white/3 border-white/8'
            }`}
          >
            <SevIcon sev={a.severity} />
            <div className="min-w-0">
              <div className="text-[#F0F4FF]/80 leading-snug">{a.msg}</div>
              <div className="text-[#6B7FA3] text-[10px] mt-0.5 font-mono">{a.cam} Â· {a.ts}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function DemoSimulator() {
  const [activeModule, setActiveModule] = useState(0)
  const [mainCam, setMainCam] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [stats, setStats] = useState({ detections: 847, alertsCount: 23, uptime: 99.1 })
  const alertIdRef = useRef(100)
  const tickRef = useRef(0)

  const activeModuleData = MODULES[activeModule]

  // Seed initial alerts
  useEffect(() => {
    const initial: AlertItem[] = activeModuleData.alerts.slice(0, 4).map((a, i) => ({
      id: i,
      ts: getTime(),
      cam: `CAM-0${(i % 4) + 1}`,
      msg: a[0] as string,
      severity: a[1] as Severity,
    }))
    setAlerts(initial.reverse())
  }, [activeModule])

  // Tick: add new alerts periodically
  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      tickRef.current++
      const alertConfig = activeModuleData.alerts[tickRef.current % activeModuleData.alerts.length]
      const newAlert: AlertItem = {
        id: alertIdRef.current++,
        ts: getTime(),
        cam: `CAM-0${(Math.floor(Math.random() * 4) + 1)}`,
        msg: alertConfig[0] as string,
        severity: alertConfig[1] as Severity,
      }
      setAlerts(prev => [newAlert, ...prev].slice(0, 8))
      setStats(prev => ({
        detections: prev.detections + Math.floor(Math.random() * 3 + 1),
        alertsCount: newAlert.severity === 'critical' ? prev.alertsCount + 1 : prev.alertsCount,
        uptime: 99.1,
      }))
    }, 2800)
    return () => clearInterval(timer)
  }, [playing, activeModule, activeModuleData.alerts])

  return (
    <section className="py-24 bg-[#050A14] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: `radial-gradient(ellipse, ${activeModuleData.color}, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 block" style={{ color: activeModuleData.color }}>
            Interactive Demo
          </span>
          <h2 className="font-poppins font-bold text-display-md md:text-display-lg text-[#F0F4FF] leading-tight mb-4">
            See TruEye AI in Action
          </h2>
          <p className="text-[#6B7FA3] text-body-lg max-w-2xl mx-auto">
            Switch between AI modules and watch real-time detections, alerts, and analytics â€” live in your browser.
          </p>
        </div>

        {/* Module Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {MODULES.map((m, i) => {
            const Icon = m.icon
            const active = i === activeModule
            return (
              <button
                key={m.id}
                onClick={() => { setActiveModule(i); tickRef.current = 0 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  active
                    ? 'text-black border-transparent'
                    : 'border-white/10 text-[#6B7FA3] hover:border-white/20 hover:text-[#F0F4FF] bg-transparent'
                }`}
                style={active ? { backgroundColor: m.color, boxShadow: `0 0 20px ${m.color}40` } : {}}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{m.label}</span>
                <span className="sm:hidden">{m.label.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* LEFT â€” Camera feeds */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {/* Control bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#0A1628] rounded-xl border border-white/8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-[#F0F4FF]">TruEye LIVE</span>
                <span className="text-[10px] text-[#6B7FA3] font-mono hidden sm:inline">|</span>
                <span className="text-[10px] font-mono hidden sm:inline" style={{ color: activeModuleData.color }}>
                  {activeModuleData.label.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-[10px] font-mono text-[#6B7FA3]">
                  <span><span className="text-[#F0F4FF]">{stats.detections.toLocaleString()}</span> detected</span>
                  <span className="hidden sm:inline"><span className="text-red-400">{stats.alertsCount}</span> alerts</span>
                  <span className="hidden sm:inline"><span className="text-green-400">{stats.uptime}%</span> uptime</span>
                </div>
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-[#6B7FA3] hover:text-[#F0F4FF] hover:border-white/20 transition-all"
                >
                  {playing ? <Pause size={12} /> : <Play size={12} />}
                  <span>{playing ? 'Pause' : 'Resume'}</span>
                </button>
              </div>
            </div>

            {/* Main camera */}
            <CameraFeed mod={activeModuleData} camId={mainCam} isMain={true} />

            {/* Thumbnail cameras */}
            <div className="grid grid-cols-4 gap-2">
              {CAMERAS.map(cam => (
                <div key={cam.id} className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                  mainCam === cam.id ? 'ring-2' : 'opacity-60 hover:opacity-90'
                }`}
                  style={mainCam === cam.id ? { boxShadow: `0 0 0 2px ${activeModuleData.color}` } : {}}>
                  <CameraFeed
                    mod={activeModuleData}
                    camId={cam.id}
                    isMain={false}
                    onClick={() => setMainCam(cam.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT â€” Info panel */}
          <div className="flex flex-col gap-3">

            {/* Module info card */}
            <div className={`p-4 rounded-xl border ${activeModuleData.tw.border} ${activeModuleData.tw.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                {(() => { const Icon = activeModuleData.icon; return <Icon size={16} style={{ color: activeModuleData.color }} /> })()}
                <span className="font-poppins font-bold text-[#F0F4FF] text-sm">{activeModuleData.label}</span>
              </div>
              <p className="text-[#6B7FA3] text-xs leading-relaxed">{activeModuleData.desc}</p>
              <div className="mt-3 p-3 rounded-lg bg-black/30 border border-white/5">
                <div className="text-2xl font-poppins font-bold" style={{ color: activeModuleData.color }}>
                  {activeModuleData.stat.value}
                </div>
                <div className="text-[#6B7FA3] text-xs">{activeModuleData.stat.label}</div>
                <div className="text-[10px] mt-0.5" style={{ color: activeModuleData.color }}>{activeModuleData.stat.sub}</div>
              </div>
            </div>

            {/* Active detections */}
            {activeModuleData.detections.length > 0 && (
              <div className="p-4 rounded-xl border border-white/8 bg-[#0A1628]">
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={12} className="text-[#6B7FA3]" />
                  <span className="text-xs font-semibold text-[#6B7FA3] uppercase tracking-wider">Active Detections</span>
                  <span className="ml-auto text-[10px] font-mono text-[#00D4FF]">{activeModuleData.detections.length} objects</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {activeModuleData.detections.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: SEV_COLORS[d.severity] }} />
                        <div>
                          <div className="text-[11px] font-mono text-[#F0F4FF] font-semibold">{d.label}</div>
                          {d.sub && <div className="text-[9px] text-[#6B7FA3]">{d.sub}</div>}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: SEV_COLORS[d.severity] }}>
                        {d.confidence}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live alert feed */}
            <div className="p-4 rounded-xl border border-white/8 bg-[#0A1628] flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-[#6B7FA3] uppercase tracking-wider">Live Alert Feed</span>
                <span className="ml-auto text-[10px] font-mono text-[#6B7FA3]">{playing ? 'STREAMING' : 'PAUSED'}</span>
              </div>
              <AlertFeed alerts={alerts} />
            </div>

            {/* CTA */}
            <Link
              href="/#requestdemo"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm text-black transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ backgroundColor: activeModuleData.color, boxShadow: `0 4px 20px ${activeModuleData.color}40` }}
            >
              Get a Live Demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-[#6B7FA3] text-xs mt-6">
          This is a browser-based simulation. In production, TruEye processes real camera feeds in under 2 seconds.
        </p>
      </div>
    </section>
  )
}
