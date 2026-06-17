import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import { BRAND } from '@/lib/data'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'TruEye Contact',
  description: 'Get in touch with the TruEye team for sales enquiries, product demos, partnerships, or general questions about AI video analytics.',
  alternates: {
    canonical: 'https://www.trueye.io/contact',
    languages: { en: 'https://www.trueye.io/contact', 'en-IN': 'https://www.trueye.io/contact' },
  },
  openGraph: {
    title: 'Contact TruEye — Speak to a Video Analytics Expert',
    description: 'Contact TruEye for sales enquiries, demos, or general questions.',
    url: 'https://www.trueye.io/contact',
    images: [{ url: '/og/contact.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.trueye.io/contact' },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative pt-36 pb-8 bg-[#050A14] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-poppins font-bold text-display-xl text-[#F0F4FF] mb-4">
            Contact TruEye — Speak to a Video Analytics Expert
          </h1>
          <p className="text-body-lg text-[#6B7FA3]">
            Our team is ready to help you deploy AI video analytics in your organization.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#050A14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <h2 className="font-poppins font-bold text-xl text-[#F0F4FF] mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <a href={`mailto:${BRAND.email.sales}`} className="flex items-center gap-3 text-[#6B7FA3] hover:text-[#00D4FF] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
                    <Mail size={18} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7FA3]/60 mb-0.5">Sales Enquiries</p>
                    <p className="text-sm text-[#F0F4FF]">{BRAND.email.sales}</p>
                  </div>
                </a>
                <a href={`mailto:${BRAND.email.general}`} className="flex items-center gap-3 text-[#6B7FA3] hover:text-[#00D4FF] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
                    <Mail size={18} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7FA3]/60 mb-0.5">General Contact</p>
                    <p className="text-sm text-[#F0F4FF]">{BRAND.email.general}</p>
                  </div>
                </a>
                <a href={`tel:${BRAND.phone.sales.replace(/\s/g, '')}`} className="flex items-center gap-3 text-[#6B7FA3] hover:text-[#00D4FF] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
                    <Phone size={18} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7FA3]/60 mb-0.5">Sales Phone</p>
                    <p className="text-sm text-[#F0F4FF]">{BRAND.phone.sales}</p>
                  </div>
                </a>
                <a href={`tel:${BRAND.phone.general.replace(/\s/g, '')}`} className="flex items-center gap-3 text-[#6B7FA3] hover:text-[#00D4FF] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
                    <Phone size={18} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7FA3]/60 mb-0.5">General Phone</p>
                    <p className="text-sm text-[#F0F4FF]">{BRAND.phone.general}</p>
                  </div>
                </a>
                <a href={`tel:${BRAND.phone.primary.replace(/\s/g, '')}`} className="flex items-center gap-3 text-[#6B7FA3] hover:text-[#00D4FF] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
                    <Phone size={18} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7FA3]/60 mb-0.5">Main Line</p>
                    <p className="text-sm text-[#F0F4FF]">{BRAND.phone.primary}</p>
                  </div>
                </a>
              </div>

              <div className="mt-8">
                <p className="text-xs text-[#6B7FA3] uppercase tracking-widest mb-3">Follow TruEye</p>
                <div className="flex gap-3">
                  {[
                    { href: BRAND.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                    { href: BRAND.social.instagram, icon: Instagram, label: 'Instagram' },
                    { href: BRAND.social.facebook, icon: Facebook, label: 'Facebook' },
                    { href: BRAND.social.twitter, icon: Twitter, label: 'X' },
                    { href: BRAND.social.youtube, icon: Youtube, label: 'YouTube' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#6B7FA3] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="glass-card-cyan rounded-2xl p-7">
              <h2 className="font-poppins font-bold text-xl text-[#F0F4FF] mb-5">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-bold text-2xl text-[#F0F4FF] mb-2 text-center">Global Offices</h2>
          <p className="text-[#6B7FA3] text-sm text-center mb-10">VertexPlus Technologies Limited — Worldwide presence</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRAND.offices.map((office) => (
              <div key={office.city} className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={15} className="text-[#00D4FF] shrink-0" />
                  <p className="font-poppins font-semibold text-sm text-[#F0F4FF]">
                    {office.city}, <span className="text-[#6B7FA3] font-normal">{office.country}</span>
                  </p>
                </div>
                <p className="text-xs text-[#6B7FA3] leading-relaxed mb-2">{office.address}</p>
                <a href={`tel:${office.phone.replace(/[\s/]/g, '')}`} className="text-xs text-[#00D4FF] hover:underline block">{office.phone}</a>
                <a href={`mailto:${office.email}`} className="text-xs text-[#6B7FA3] hover:text-[#00D4FF] transition-colors">{office.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

