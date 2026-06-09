'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, DollarSign, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react'

// ─── helpers ────────────────────────────────────────────────────────────────

function formatINR(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)}Cr`
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`
  return `₹${n.toFixed(0)}`
}

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const [display, setDisplay] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    const start = prev.current
    const end = value
    const duration = 700
    const startTime = performance.now()

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(start + (end - start) * eased)
      if (t < 1) requestAnimationFrame(step)
      else prev.current = end
    }
    requestAnimationFrame(step)
  }, [value])

  return (
    <span>
      {prefix}
      {display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {suffix}
    </span>
  )
}

// ─── Slider ─────────────────────────────────────────────────────────────────

function Slider({
  label, value, min, max, step, unit, onChange, tooltip,
}: {
  label: string; value: number; min: number; max: number
  step: number; unit: string; onChange: (v: number) => void; tooltip?: string
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#6B7FA3] font-medium">{label}</span>
        <span className="text-sm font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-0.5 rounded">
          {value.toLocaleString()} {unit}
        </span>
      </div>
      {tooltip && (
        <p className="text-xs text-[#6B7FA3]/60 mb-2">{tooltip}</p>
      )}
      <div className="relative h-2 bg-white/10 rounded-full">
        <div
          className="absolute h-2 bg-gradient-to-r from-[#00D4FF] to-[#0099BB] rounded-full transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#00D4FF] shadow-lg shadow-[#00D4FF]/30 -translate-y-1/4 transition-all duration-150"
          style={{ left: `calc(${pct}% - 8px)`, top: 0 }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#6B7FA3]/50 mt-1">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  )
}

// ─── Result Card ─────────────────────────────────────────────────────────────

function ResultCard({
  icon: Icon, label, value, sub, color, highlight,
}: {
  icon: React.ElementType; label: string; value: string; sub: string
  color: string; highlight?: boolean
}) {
  return (
    <motion.div
      layout
      className={`rounded-xl p-5 border transition-all duration-300 ${
        highlight
          ? 'bg-gradient-to-br from-[#00D4FF]/15 to-[#0099BB]/5 border-[#00D4FF]/30'
          : 'bg-white/[0.03] border-white/10'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
          <Icon size={16} />
        </div>
        <div>
          <p className="text-[11px] text-[#6B7FA3] uppercase tracking-wider mb-1">{label}</p>
          <p className={`text-2xl font-bold font-poppins ${highlight ? 'text-[#00D4FF]' : 'text-[#F0F4FF]'}`}>
            {value}
          </p>
          <p className="text-xs text-[#6B7FA3] mt-0.5">{sub}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ROICalculator() {
  // Inputs
  const [cameras, setCameras] = useState(20)
  const [guards, setGuards] = useState(8)
  const [incidents, setIncidents] = useState(15)
  const [reviewHours, setReviewHours] = useState(4)
  const [industry, setIndustry] = useState<'manufacturing' | 'retail' | 'hospitality' | 'logistics'>('manufacturing')
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Assumptions
  const guardSalaryMonthly = 18_000          // ₹18K/guard/month
  const trueyeLicensePerCamera = 2_500       // ₹2,500/camera/month (approx)
  const reviewerHourlyCost = 200             // ₹200/hr analyst cost
  const incidentCostMap = {
    manufacturing: 85_000,
    retail: 35_000,
    hospitality: 45_000,
    logistics: 60_000,
  }
  const incidentReductionRate = 0.72         // 72% fewer incidents with AI
  const guardReductionRate = 0.35            // Can reduce 35% of guards
  const reviewTimeReduction = 0.90           // 90% less manual review

  const incidentCost = incidentCostMap[industry]

  // Calculations — monthly
  const guardSavings = Math.round(guards * guardSalaryMonthly * guardReductionRate)
  const incidentSavings = Math.round(incidents * incidentCost * incidentReductionRate / 12)
  const reviewSavings = Math.round(reviewHours * reviewTimeReduction * reviewerHourlyCost * 22)
  const trueyeCost = cameras * trueyeLicensePerCamera

  const totalMonthlySavings = guardSavings + incidentSavings + reviewSavings
  const netMonthlySaving = totalMonthlySavings - trueyeCost
  const annualSavings = netMonthlySaving * 12
  const roi = trueyeCost > 0 ? Math.round((netMonthlySaving / trueyeCost) * 100) : 0
  const paybackMonths = netMonthlySaving > 0 ? Math.ceil(trueyeCost / netMonthlySaving) : 0

  const INDUSTRIES = [
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'retail', label: 'Retail' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'logistics', label: 'Logistics' },
  ] as const

  return (
    <section className="py-24 bg-[#060C1A] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-4">
            ROI Calculator
          </span>
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-4">
            What Will TruEye Save You?
          </h2>
          <p className="text-body-lg text-[#6B7FA3] max-w-2xl mx-auto">
            Adjust the sliders to match your operation and see your projected savings in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: Inputs ── */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
            {/* Industry selector */}
            <div className="mb-8">
              <p className="text-sm text-[#6B7FA3] font-medium mb-3">Industry</p>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind.id}
                    onClick={() => setIndustry(ind.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      industry === ind.id
                        ? 'bg-[#00D4FF]/15 border border-[#00D4FF]/40 text-[#00D4FF]'
                        : 'bg-white/5 border border-white/10 text-[#6B7FA3] hover:border-white/20'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            <Slider
              label="Number of CCTV Cameras"
              value={cameras}
              min={5}
              max={200}
              step={5}
              unit="cameras"
              onChange={setCameras}
              tooltip="Total cameras across your facility"
            />
            <Slider
              label="Security Guards on Payroll"
              value={guards}
              min={2}
              max={100}
              step={1}
              unit="guards"
              onChange={setGuards}
              tooltip={`Avg. ₹18K/month per guard`}
            />
            <Slider
              label="Security Incidents per Year"
              value={incidents}
              min={1}
              max={200}
              step={1}
              unit="incidents"
              onChange={setIncidents}
              tooltip={`Avg. cost per incident in ${industry}: ${formatINR(incidentCost)}`}
            />
            <Slider
              label="Hours Spent Reviewing Footage Daily"
              value={reviewHours}
              min={1}
              max={16}
              step={1}
              unit="hrs/day"
              onChange={setReviewHours}
              tooltip="Staff hours spent manually watching recordings"
            />

            <p className="text-xs text-[#6B7FA3]/50 mt-2 leading-relaxed">
              * Estimates based on industry benchmarks. Actual savings vary by deployment.
            </p>
          </div>

          {/* ── Right: Results ── */}
          <div className="flex flex-col gap-5">
            {/* Big hero number */}
            <motion.div
              key={annualSavings}
              layout
              className="bg-gradient-to-br from-[#00D4FF]/10 to-[#0099BB]/5 border border-[#00D4FF]/20 rounded-2xl p-8 text-center"
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-2">
                Estimated Annual Net Savings
              </p>
              <p className="font-poppins font-bold text-5xl text-[#F0F4FF] mb-1">
                <AnimatedNumber value={annualSavings / 100000} prefix="₹" suffix="L" decimals={1} />
              </p>
              <p className="text-sm text-[#6B7FA3]">per year after TruEye subscription cost</p>
            </motion.div>

            {/* Result cards */}
            <div className="grid grid-cols-2 gap-4">
              <ResultCard
                icon={TrendingUp}
                label="Monthly ROI"
                value={`${roi}%`}
                sub="return on investment"
                color="bg-[#00D4FF]/10 text-[#00D4FF]"
                highlight
              />
              <ResultCard
                icon={Clock}
                label="Payback Period"
                value={paybackMonths > 0 ? `${paybackMonths}mo` : '<1mo'}
                sub="to recover cost"
                color="bg-[#A855F7]/10 text-[#A855F7]"
              />
              <ResultCard
                icon={Shield}
                label="Guard Cost Saved"
                value={formatINR(guardSavings * 12)}
                sub="annually"
                color="bg-[#22C55E]/10 text-[#22C55E]"
              />
              <ResultCard
                icon={DollarSign}
                label="Incident Cost Saved"
                value={formatINR(incidentSavings * 12)}
                sub="annually"
                color="bg-[#F59E0B]/10 text-[#F59E0B]"
              />
            </div>

            {/* Breakdown toggle */}
            <button
              onClick={() => setShowBreakdown(v => !v)}
              className="flex items-center justify-between w-full px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-[#6B7FA3] hover:border-white/20 transition-all"
            >
              <span>Show detailed breakdown</span>
              {showBreakdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border border-white/10 rounded-xl divide-y divide-white/10 text-sm">
                    {[
                      { label: 'Guard headcount reduction (monthly)', value: formatINR(guardSavings), plus: true },
                      { label: 'Incident reduction savings (monthly)', value: formatINR(incidentSavings), plus: true },
                      { label: 'Footage review time savings (monthly)', value: formatINR(reviewSavings), plus: true },
                      { label: 'TruEye subscription cost (monthly)', value: formatINR(trueyeCost), plus: false },
                      { label: 'Net monthly saving', value: formatINR(netMonthlySaving), plus: true, bold: true },
                    ].map(row => (
                      <div key={row.label} className={`flex justify-between px-5 py-3 ${row.bold ? 'bg-white/[0.03]' : ''}`}>
                        <span className={row.bold ? 'text-[#F0F4FF] font-medium' : 'text-[#6B7FA3]'}>{row.label}</span>
                        <span className={
                          row.bold ? 'text-[#00D4FF] font-bold' :
                          row.plus ? 'text-[#22C55E]' : 'text-[#F87171]'
                        }>
                          {row.plus ? '+' : '-'}{row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <a
              href="/#requestdemo"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099BB] text-[#050A14] font-bold text-sm text-center hover:opacity-90 transition-opacity"
            >
              Get a Personalised ROI Report →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
