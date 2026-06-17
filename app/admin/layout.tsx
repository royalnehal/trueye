'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, FileText, Home, Cpu, DollarSign,
  Briefcase, Menu as MenuIcon, Settings, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/product', label: 'Product', icon: Cpu },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/case-studies', label: 'Case Studies', icon: Briefcase },
  { href: '/admin/navigation', label: 'Navigation', icon: MenuIcon },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  // Don't wrap login page with the sidebar layout
  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#050A14] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col shrink-0 bg-[#0A1628] border-r border-white/10 transition-all duration-300',
          collapsed ? 'w-16' : 'w-56'
        )}
        style={{ minHeight: '100vh', position: 'sticky', top: 0, height: '100vh' }}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 h-16">
          {!collapsed && (
            <span className="font-bold text-[#F0F4FF] text-sm tracking-wide">TruEye CMS</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg mx-2',
                  active
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
                    : 'text-[#6B7FA3] hover:text-[#F0F4FF] hover:bg-white/5'
                )}
              >
                <Icon size={16} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-[#6B7FA3] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
