'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── City data ───────────────────────────────────────────────────────────────
// cx/cy are % positions on the India SVG viewBox (0 0 400 480)

const CITIES = [
  { id: 'delhi',     name: 'Delhi NCR',      cx: 178, cy: 112, clients: 18, modules: ['Intrusion', 'ANPR', 'Crowd'] },
  { id: 'mumbai',    name: 'Mumbai',          cx: 112, cy: 248, clients: 22, modules: ['ANPR', 'Face Recognition', 'Heat Map'] },
  { id: 'bangalore', name: 'Bengaluru',       cx: 160, cy: 338, clients: 16, modules: ['PPE Detection', 'Intrusion', 'ANPR'] },
  { id: 'hyderabad', name: 'Hyderabad',       cx: 178, cy: 296, clients: 14, modules: ['Crowd Analysis', 'Heat Map', 'Face Recognition'] },
  { id: 'chennai',   name: 'Chennai',         cx: 192, cy: 356, clients: 11, modules: ['ANPR', 'Crowd Analysis', 'Intrusion'] },
  { id: 'kolkata',   name: 'Kolkata',         cx: 276, cy: 200, clients: 9,  modules: ['Intrusion', 'PPE Detection', 'ANPR'] },
  { id: 'pune',      name: 'Pune',            cx: 128, cy: 262, clients: 12, modules: ['PPE Detection', 'Heat Map', 'Intrusion'] },
  { id: 'ahmedabad', name: 'Ahmedabad',       cx: 108, cy: 196, clients: 8,  modules: ['ANPR', 'Intrusion', 'Crowd Analysis'] },
  { id: 'jaipur',    name: 'Jaipur',          cx: 152, cy: 148, clients: 7,  modules: ['Intrusion', 'Face Recognition', 'ANPR'] },
  { id: 'surat',     name: 'Surat',           cx: 110, cy: 222, clients: 6,  modules: ['PPE Detection', 'ANPR', 'Heat Map'] },
  { id: 'lucknow',   name: 'Lucknow',         cx: 214, cy: 148, clients: 5,  modules: ['Crowd Analysis', 'Intrusion', 'Face Recognition'] },
  { id: 'chandigarh',name: 'Chandigarh',      cx: 166, cy: 90,  clients: 4,  modules: ['ANPR', 'Intrusion', 'PPE Detection'] },
  { id: 'kochi',     name: 'Kochi',           cx: 152, cy: 388, clients: 5,  modules: ['Heat Map', 'Crowd Analysis', 'Intrusion'] },
  { id: 'nagpur',    name: 'Nagpur',          cx: 188, cy: 242, clients: 6,  modules: ['PPE Detection', 'Intrusion', 'ANPR'] },
]

// ─── Simplified India SVG path ────────────────────────────────────────────────
const INDIA_PATH = `
M 178 18
L 192 22 L 204 18 L 218 24 L 228 32 L 238 28 L 252 34 L 262 42 L 268 52
L 274 58 L 280 68 L 286 78 L 292 88 L 298 96 L 304 108 L 308 120
L 310 130 L 306 142 L 298 152 L 292 158 L 288 168 L 290 180 L 288 192
L 284 200 L 278 208 L 274 218 L 272 228 L 268 236 L 262 246 L 256 252
L 248 258 L 240 264 L 230 268 L 222 274 L 214 282 L 208 292 L 202 302
L 196 312 L 190 322 L 186 332 L 182 342 L 178 352 L 174 362 L 170 370
L 166 378 L 162 386 L 158 394 L 155 402 L 152 410 L 156 418 L 162 424
L 168 428 L 174 432 L 178 436 L 182 432 L 186 428 L 192 424 L 196 418
L 198 412 L 196 404 L 194 396 L 192 388 L 192 378 L 194 368 L 196 358
L 200 348 L 204 338 L 208 330 L 214 322 L 220 314 L 224 306 L 226 296
L 224 286 L 222 276 L 222 266 L 226 258 L 232 250 L 238 244 L 244 238
L 250 230 L 254 222 L 256 212 L 254 202 L 250 194 L 244 186 L 240 176
L 240 166 L 244 158 L 248 150 L 250 140 L 248 130 L 244 120 L 238 112
L 230 104 L 222 98 L 214 92 L 206 86 L 198 80 L 190 74 L 182 68
L 174 62 L 166 56 L 160 50 L 156 44 L 154 36 L 158 28 L 164 22 L 170 18 Z
M 120 148 L 108 158 L 100 170 L 96 182 L 98 194 L 104 204 L 112 212
L 118 218 L 124 226 L 126 236 L 122 244 L 116 250 L 110 254 L 106 262
L 108 270 L 114 276 L 120 280 L 126 278 L 130 272 L 132 264 L 128 256
L 124 248 L 126 240 L 130 234 L 134 226 L 136 218 L 134 208 L 128 200
L 124 192 L 122 182 L 124 172 L 128 164 L 132 156 L 130 148 Z
`

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function CityTooltip({ city }: { city: typeof CITIES[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      className="absolute z-20 bg-[#0D1E38] border border-[#00D4FF]/30 rounded-xl p-4 shadow-xl shadow-black/50 w-52 pointer-events-none"
      style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 10 }}
    >
      <p className="font-poppins font-bold text-[#F0F4FF] text-sm mb-1">{city.name}</p>
      <p className="text-[#00D4FF] text-xs mb-2 font-semibold">{city.clients} active deployments</p>
      <div className="flex flex-wrap gap-1">
        {city.modules.map(m => (
          <span key={m} className="text-[10px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[#6B7FA3]">
            {m}
          </span>
        ))}
      </div>
      {/* Arrow */}
      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0D1E38] border-b border-r border-[#00D4FF]/30 rotate-45" />
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function DeploymentMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  const totalClients = CITIES.reduce((s, c) => s + c.clients, 0)
  const totalCities = CITIES.length

  return (
    <section className="py-24 bg-[#050A14] relative overflow-hidden">
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-4">
            Pan-India Deployments
          </span>
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-4">
            TruEye Across India
          </h2>
          <p className="text-body-lg text-[#6B7FA3] max-w-2xl mx-auto">
            Deployed across {totalCities} cities with {totalClients}+ enterprise clients. Hover a city to explore active modules.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-center">
          {/* ── Map ── */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: 340, height: 460 }}>
              <svg
                viewBox="50 10 300 450"
                width="340"
                height="460"
                fill="none"
                className="overflow-visible"
              >
                {/* Glow filter */}
                <defs>
                  <filter id="city-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0D1E38" />
                    <stop offset="100%" stopColor="#060C1A" />
                  </radialGradient>
                </defs>

                {/* India shape */}
                <path
                  d={INDIA_PATH}
                  fill="url(#mapGrad)"
                  stroke="#00D4FF"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />

                {/* City pins */}
                {CITIES.map((city, i) => (
                  <g
                    key={city.id}
                    transform={`translate(${city.cx}, ${city.cy})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHovered(city.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse ring */}
                    <circle
                      r="10"
                      fill="#00D4FF"
                      opacity="0.08"
                      className="animate-ping"
                      style={{ animationDelay: `${i * 0.3}s`, animationDuration: '2.5s' }}
                    />
                    {/* Outer ring */}
                    <circle
                      r={hovered === city.id ? 7 : 5}
                      fill="#00D4FF"
                      opacity={hovered === city.id ? 0.25 : 0.15}
                      className="transition-all duration-200"
                    />
                    {/* Core dot */}
                    <circle
                      r={hovered === city.id ? 4 : 3}
                      fill={hovered === city.id ? '#00D4FF' : '#0099BB'}
                      filter="url(#city-glow)"
                      className="transition-all duration-200"
                    />
                    {/* Label for larger cities */}
                    {city.clients >= 12 && hovered !== city.id && (
                      <text
                        x="7"
                        y="4"
                        fontSize="7"
                        fill="#6B7FA3"
                        fontFamily="Arial, sans-serif"
                      >
                        {city.name.split(' ')[0]}
                      </text>
                    )}
                  </g>
                ))}
              </svg>

              {/* Tooltips rendered outside SVG for correct stacking */}
              {CITIES.map(city => (
                <div
                  key={city.id}
                  className="absolute"
                  style={{
                    left: city.cx - 50 + (340 - 300) / 2,
                    top: city.cy - 10 + (460 - 450) / 2,
                  }}
                >
                  <AnimatePresence>
                    {hovered === city.id && <CityTooltip city={city} />}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* ── Stats & City List ── */}
          <div className="flex flex-col gap-6">
            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Cities Deployed', value: totalCities + '+', color: 'text-[#00D4FF]' },
                { label: 'Enterprise Clients', value: totalClients + '+', color: 'text-[#A855F7]' },
                { label: 'Cameras Online', value: '4,800+', color: 'text-[#22C55E]' },
                { label: 'Uptime SLA', value: '99.9%', color: 'text-[#F59E0B]' },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                  <p className={`font-poppins font-bold text-2xl ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#6B7FA3] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* City list */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs font-semibold text-[#6B7FA3] uppercase tracking-wider">Top Deployments</p>
              </div>
              <div className="divide-y divide-white/[0.06] max-h-64 overflow-y-auto">
                {[...CITIES]
                  .sort((a, b) => b.clients - a.clients)
                  .slice(0, 8)
                  .map((city, i) => (
                    <div
                      key={city.id}
                      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                        hovered === city.id ? 'bg-[#00D4FF]/5' : 'hover:bg-white/[0.02]'
                      }`}
                      onMouseEnter={() => setHovered(city.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm text-[#F0F4FF] font-medium">{city.name}</p>
                          <p className="text-[10px] text-[#6B7FA3]">{city.modules[0]} · {city.modules[1]}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#00D4FF]">{city.clients} sites</span>
                    </div>
                  ))}
              </div>
            </div>

            <a
              href="/#requestdemo"
              className="w-full py-3.5 rounded-xl border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-semibold text-center hover:bg-[#00D4FF]/10 transition-colors"
            >
              Deploy TruEye in Your City →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
