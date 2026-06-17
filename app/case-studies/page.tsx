import type { Metadata } from 'next'
import { Download, Shield, HardHat, Package } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'TruEye Case Studies',
  description:
    "Explore TruEye's resources for insightful case studies and practical guides on leveraging the TruEye platform to achieve your goals. Start maximizing your success today!",
  alternates: {
    canonical: 'https://www.trueye.io/case-studies',
    languages: { en: 'https://www.trueye.io/case-studies', 'en-IN': 'https://www.trueye.io/case-studies' },
  },
  openGraph: {
    title: 'TruEye Case Studies — Real-World AI Video Analytics in Action',
    description: 'Three documented TruEye deployments with problem, solution, and measurable outcomes.',
    url: 'https://www.trueye.io/case-studies',
    images: [{ url: '/og/case-studies.jpg', width: 1200, height: 630 }],
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  Shield, HardHat, Package,
}

const caseStudiesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'TruEye Video Analytics Case Studies',
  itemListElement: [
    {
      '@type': 'Article',
      position: 1,
      name: 'Intrusion Detection for Theft Control',
      description:
        'TruEye real-time intrusion detection helped eliminate theft in restricted surveillance zones.',
    },
    {
      '@type': 'Article',
      position: 2,
      name: 'Safety Monitoring and Improvement',
      description:
        'Automated safety compliance monitoring reduced manual costs and improved worker safety.',
    },
    {
      '@type': 'Article',
      position: 3,
      name: 'Automated Bag Counting System',
      description:
        'Video analytics replaced manual bag counting, improving inventory accuracy and reducing losses.',
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.trueye.io/case-studies' },
  ],
}

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#050A14] pt-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="scanline-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-20">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4 px-3 py-1 border border-[#00D4FF]/20 rounded-full bg-[#00D4FF]/5">
            Case Studies
          </span>
          <h1 className="font-poppins font-bold text-display-xl md:text-display-2xl text-[#F0F4FF] mb-6">
            TruEye Case Studies — Video Analytics Deployments That Delivered Results
          </h1>
          <p className="text-body-lg text-[#6B7FA3]">
            Real Deployments. Real Results.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#050A14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {CASE_STUDIES.map((cs) => {
              const Icon = ICONS[cs.icon]
              return (
                <article
                  key={cs.id}
                  className="glass-card-cyan rounded-2xl p-8 md:p-10 border border-[#00D4FF]/15"
                >
                  <div className="flex items-start gap-5 mb-7">
                    <div className="w-14 h-14 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon size={28} className="text-[#00D4FF]" />}
                    </div>
                    <div>
                      <h2 className="font-poppins font-bold text-xl md:text-2xl text-[#F0F4FF]">
                        {cs.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
                    <div>
                      <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider block mb-2">
                        Problem
                      </span>
                      <p className="text-[#6B7FA3] text-sm leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider block mb-2">
                        Solution
                      </span>
                      <p className="text-[#6B7FA3] text-sm leading-relaxed">{cs.solution}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#00FF94] uppercase tracking-wider block mb-2">
                        Result
                      </span>
                      <p className="text-[#6B7FA3] text-sm leading-relaxed">{cs.result}</p>
                    </div>
                  </div>

                  <a
                    href={cs.pdf}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium rounded-full hover:bg-[#00D4FF]/20 transition-all"
                  >
                    <Download size={14} />
                    Download Full Case Study PDF
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-4">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-[#6B7FA3] mb-7">
            Contact our team to explore how TruEye can deliver measurable results for your organization.
          </p>
          <a
            href="/#requestdemo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00D4FF] text-black font-semibold rounded-full hover:scale-105 transition-all"
          >
            Request a Demo
          </a>
        </div>
      </section>
    </>
  )
}

