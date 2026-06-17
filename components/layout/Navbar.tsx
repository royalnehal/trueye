'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { NAV_LINKS, BRAND } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'h-16 bg-black/70 backdrop-blur-xl border-b border-white/10'
            : 'h-20 bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="TruEye Home">
            <Image
              src="/images/logo-white.webp"
              alt="TruEye"
              width={128}
              height={26}
              priority
              className={cn('w-auto transition-all duration-300', scrolled ? 'h-6' : 'h-8')}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative">
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#6B7FA3] hover:text-[#F0F4FF] transition-colors rounded-lg hover:bg-white/5',
                      activeDropdown === link.label && 'text-[#F0F4FF] bg-white/5'
                    )}
                    onClick={() =>
                      setActiveDropdown(activeDropdown === link.label ? null : link.label)
                    }
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform duration-200',
                        activeDropdown === link.label && 'rotate-180'
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-[#0A1628]/90 backdrop-blur-xl border border-[#00D4FF]/20 rounded-xl overflow-hidden shadow-xl shadow-black/40"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-3 text-sm text-[#6B7FA3] hover:text-[#00D4FF] hover:bg-white/5 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5',
                    pathname === link.href
                      ? 'text-[#00D4FF]'
                      : 'text-[#6B7FA3] hover:text-[#F0F4FF]'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D4FF]" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#requestdemo"
              className="px-5 py-2.5 bg-[#00D4FF] text-black text-sm font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all duration-200"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#6B7FA3] hover:text-[#F0F4FF] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050A14]/98 backdrop-blur-xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 py-6">
              <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <Image src="/images/logo-white.webp" alt="TruEye" width={108} height={22} className="h-6 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#6B7FA3] hover:text-[#F0F4FF]"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile links */}
            <nav className="flex-1 px-6 py-4 flex flex-col gap-2 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.dropdown ? (
                    <div>
                      <div className="text-lg font-medium text-[#6B7FA3] px-3 py-3">
                        {link.label}
                      </div>
                      <div className="pl-4 flex flex-col gap-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-base text-[#6B7FA3] hover:text-[#00D4FF] px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'block text-lg font-medium px-3 py-3 rounded-xl transition-colors',
                        pathname === link.href
                          ? 'text-[#00D4FF] bg-[#00D4FF]/10'
                          : 'text-[#6B7FA3] hover:text-[#F0F4FF] hover:bg-white/5'
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
                className="mt-4"
              >
                <Link
                  href="/#requestdemo"
                  className="block w-full text-center px-6 py-3.5 bg-[#00D4FF] text-black font-semibold rounded-full transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Request Demo
                </Link>
              </motion.div>
            </nav>

            {/* Bottom phone */}
            <div className="px-6 py-8 border-t border-white/10">
              <a
                href={`tel:${BRAND.phone.primary.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
              >
                <Phone size={16} />
                <span className="text-sm">{BRAND.phone.primary}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

