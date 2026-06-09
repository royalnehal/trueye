import Link from 'next/link'
import { Linkedin, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react'
import { BRAND, FOOTER_LINKS } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#050A14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="17" stroke="#00D4FF" strokeWidth="1.5" />
                <circle cx="19" cy="19" r="11" stroke="#00D4FF" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
                <circle cx="19" cy="19" r="6" fill="#00D4FF" opacity="0.9" />
                <circle cx="19" cy="19" r="3" fill="#050A14" />
              </svg>
              <span className="font-poppins font-bold text-xl text-white">TruEye</span>
            </Link>
            <p className="text-[#6B7FA3] text-sm leading-relaxed mb-6">
              A Video Analytics Solution by{' '}
              <a
                href="https://www.vertexplus.com/global/en/company"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D4FF] hover:underline"
              >
                VertexPlus Technologies Limited
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href={BRAND.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href={BRAND.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Solution */}
          <div>
            <h3 className="font-poppins font-semibold text-[#F0F4FF] mb-4">Solution</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.solution.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h3 className="font-poppins font-semibold text-[#F0F4FF] mb-4">Resources</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-[#F0F4FF] mb-4">Company & Contact</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BRAND.email.sales}`}
                  className="flex items-center gap-2 text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                >
                  <Mail size={13} />
                  {BRAND.email.sales}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email.general}`}
                  className="flex items-center gap-2 text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                >
                  <Mail size={13} />
                  {BRAND.email.general}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone.primary.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                >
                  <Phone size={13} />
                  {BRAND.phone.primary}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7FA3] text-center md:text-left">
            © {year} TruEye. All Rights Reserved.{' '}
            <span className="block sm:inline">
              TruEye® is a registered trademark of VertexPlus Technologies Limited.
            </span>
          </p>
          <div className="flex items-center gap-4 text-xs text-[#6B7FA3]">
            <Link href="/terms-of-use" className="hover:text-[#00D4FF] transition-colors">
              Terms of Use
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/privacy-policy" className="hover:text-[#00D4FF] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/disclaimer" className="hover:text-[#00D4FF] transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

