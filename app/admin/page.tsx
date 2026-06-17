'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Cpu, HelpCircle, MapPin, LayoutDashboard, Home, DollarSign, Briefcase } from 'lucide-react'

interface Counts {
  blogPosts: number
  aiModules: number
  faqs: number
  offices: number
  useCases: number
  industries: number
}

const QUICK_LINKS = [
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText, color: 'text-[#00D4FF]' },
  { href: '/admin/homepage', label: 'Homepage', icon: Home, color: 'text-purple-400' },
  { href: '/admin/product', label: 'Product', icon: Cpu, color: 'text-green-400' },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign, color: 'text-yellow-400' },
  { href: '/admin/case-studies', label: 'Case Studies', icon: Briefcase, color: 'text-orange-400' },
  { href: '/admin/settings', label: 'Site Settings', icon: LayoutDashboard, color: 'text-pink-400' },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/blog').then((r) => r.json()),
      fetch('/api/admin/modules').then((r) => r.json()),
      fetch('/api/admin/faqs').then((r) => r.json()),
      fetch('/api/admin/offices').then((r) => r.json()),
      fetch('/api/admin/use-cases').then((r) => r.json()),
      fetch('/api/admin/industries').then((r) => r.json()),
    ]).then(([posts, modules, faqs, offices, useCases, industries]) => {
      setCounts({
        blogPosts: Array.isArray(posts) ? posts.length : 0,
        aiModules: Array.isArray(modules) ? modules.length : 0,
        faqs: Array.isArray(faqs) ? faqs.length : 0,
        offices: Array.isArray(offices) ? offices.length : 0,
        useCases: Array.isArray(useCases) ? useCases.length : 0,
        industries: Array.isArray(industries) ? industries.length : 0,
      })
    })
  }, [])

  const stats = counts
    ? [
        { label: 'Blog Posts', value: counts.blogPosts, icon: FileText, href: '/admin/blog' },
        { label: 'AI Modules', value: counts.aiModules, icon: Cpu, href: '/admin/product' },
        { label: 'FAQs', value: counts.faqs, icon: HelpCircle, href: '/admin/homepage' },
        { label: 'Offices', value: counts.offices, icon: MapPin, href: '/admin/settings' },
        { label: 'Use Cases', value: counts.useCases, icon: Home, href: '/admin/homepage' },
        { label: 'Industries', value: counts.industries, icon: Briefcase, href: '/admin/product' },
      ]
    : []

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-bold text-2xl text-[#F0F4FF]">Dashboard</h1>
        <p className="text-[#6B7FA3] text-sm mt-1">Manage all TruEye website content from here.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {counts === null
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#0D1F3C] rounded-xl p-5 animate-pulse h-24" />
            ))
          : stats.map(({ label, value, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-[#0D1F3C] rounded-xl p-5 border border-white/5 hover:border-[#00D4FF]/20 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6B7FA3] text-xs font-medium uppercase tracking-wide">{label}</span>
                  <Icon size={16} className="text-[#00D4FF] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl font-bold text-[#F0F4FF]">{value}</p>
              </Link>
            ))}
      </div>

      {/* Quick links */}
      <h2 className="text-[#6B7FA3] text-xs font-semibold uppercase tracking-widest mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {QUICK_LINKS.map(({ href, label, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 bg-[#0A1628] border border-white/5 hover:border-[#00D4FF]/20 rounded-xl px-4 py-3 transition-colors group"
          >
            <Icon size={18} className={`${color} shrink-0`} />
            <span className="text-[#F0F4FF] text-sm font-medium group-hover:text-[#00D4FF] transition-colors">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
