import type { Metadata } from 'next'
import PricingClient from './PricingClient'
import { PRICING_TABS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'TruEye Pricing: Discover Affordable Plans for Every Need',
  description:
    'Find detailed pricing information for TruEye platform. Choose the perfect plan for your needs and budget, with transparent costs and no hidden fees. Start now!',
  alternates: {
    canonical: 'https://www.trueye.io/pricing',
    languages: { en: 'https://www.trueye.io/pricing', 'en-IN': 'https://www.trueye.io/pricing' },
  },
  openGraph: {
    title: 'TruEye Pricing — Flexible Video Analytics Plans | Get a Personalised Quote',
    description: 'TruEye pricing is customized to your deployment needs. Contact us for a quote.',
    url: 'https://www.trueye.io/pricing',
    images: [{ url: '/og/pricing.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.trueye.io/pricing' },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#050A14] pt-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="scanline-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-20">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4 px-3 py-1 border border-[#00D4FF]/20 rounded-full bg-[#00D4FF]/5">
            Pricing
          </span>
          <h1 className="font-poppins font-bold text-display-xl md:text-display-2xl text-[#F0F4FF] mb-6">
            Video Analytics Pricing — Custom Plans for Every Scale
          </h1>
          <p className="text-body-lg text-[#6B7FA3]">
            A Plan for Every Level
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-body-lg text-[#6B7FA3] leading-relaxed">
          <p>
            At VertexPlus, we don&apos;t believe in one-size-fits-all pricing. TruEye delivers
            feature-rich, flexible packages calibrated to your specific requirements. For truly unique
            use cases, we build custom modules from scratch.
          </p>
          <p>
            Cost factors include deployment environment, number of cameras, infrastructure scale,
            integrations, and support. We help you invest wisely — not just for today, but for a
            future-proofed surveillance intelligence platform that grows with your organization.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <PricingClient tabs={PRICING_TABS} />

      {/* Bottom CTA */}
      <section className="py-20 bg-[#050A14]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-4">
            Ready to Discuss Your Requirements?
          </h2>
          <p className="text-body-lg text-[#6B7FA3] mb-8">
            Our team will help you design the right deployment at the right cost for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-[#00D4FF] text-black font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all duration-200"
            >
              Get Your Personalised Quote
            </a>
            <a
              href={`tel:+919660326000`}
              className="px-8 py-4 border border-[#00D4FF]/40 text-[#00D4FF] font-medium rounded-full hover:bg-[#00D4FF]/10 transition-all"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

