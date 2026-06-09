import type { Metadata } from 'next'
import PartnerForm from './PartnerForm'

export const metadata: Metadata = {
  title: 'Partner With TruEye — Grow Your Business With AI Video Analytics',
  description:
    "Join TruEye's partner program as a reseller, technology partner, VMS integrator, or distributor. Access world-class AI video analytics to expand your offering.",
  alternates: {
    canonical: 'https://www.trueye.io/becomeapartner',
    languages: { en: 'https://www.trueye.io/becomeapartner', 'en-IN': 'https://www.trueye.io/becomeapartner' },
  },
  openGraph: {
    title: 'TruEye Partner Program — Resellers, VMS Partners & Technology Integrators',
    description: "Join TruEye's partner program. Access world-class AI video analytics to expand your offering.",
    url: 'https://www.trueye.io/becomeapartner',
    images: [{ url: '/og/partners.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Become a Partner', item: 'https://www.trueye.io/becomeapartner' },
  ],
}

const PARTNER_TYPES = ['Reseller', 'Technology Partner', 'VMS Partner', 'Distributor', 'Consultant']

const BENEFITS = [
  {
    title: 'Revenue Opportunity',
    description: 'Add enterprise video analytics to your product portfolio and open new revenue streams with a globally recognized AI solution.',
  },
  {
    title: 'Technical Support',
    description: 'Full onboarding, training, and ongoing technical backing from the TruEye team throughout your partnership journey.',
  },
  {
    title: 'Co-Marketing',
    description: 'Joint go-to-market resources, campaign support, and lead generation programs to accelerate your business growth.',
  },
]

export default function BecomeAPartnerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#050A14] pt-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="scanline-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-20">
          <h1 className="font-poppins font-bold text-display-xl md:text-display-2xl text-[#F0F4FF] mb-6">
            Partner With TruEye — Grow Your Business With AI Video Analytics
          </h1>
          <p className="text-body-lg text-[#6B7FA3]">
            Grow With TruEye. Expand your portfolio with the most capable AI video analytics platform in the market.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {BENEFITS.map((b) => (
              <div key={b.title} className="glass-card-cyan p-7 rounded-2xl">
                <h3 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">{b.title}</h3>
                <p className="text-[#6B7FA3] text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] text-center mb-8">
            Partner Types
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTNER_TYPES.map((pt) => (
              <div
                key={pt}
                className="glass-card text-center p-5 rounded-xl border border-white/10 hover:border-[#00D4FF]/30 transition-colors"
              >
                <p className="text-sm font-medium text-[#F0F4FF]">{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 bg-[#050A14]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] text-center mb-3">
            Apply to Become a Partner
          </h2>
          <p className="text-[#6B7FA3] text-center mb-8">
            Fill out the form below and our partnership team will be in touch within 2 business days.
          </p>
          <div className="glass-card-cyan rounded-2xl p-8">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  )
}

