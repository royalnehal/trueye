import type { Metadata } from 'next'
import { Download, BookOpen, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TruEye Resources: Guides for Platform Success',
  description:
    "Explore TruEye's resources for insightful practical guides on leveraging the TruEye platform to achieve your goals. Start maximizing your success today!",
  alternates: {
    canonical: 'https://www.trueye.io/resources',
    languages: { en: 'https://www.trueye.io/resources', 'en-IN': 'https://www.trueye.io/resources' },
  },
  openGraph: {
    title: 'TruEye Resources — Documentation, Guides & Downloads',
    description: 'Access TruEye documentation, eBook, and product presentation.',
    url: 'https://www.trueye.io/resources',
    images: [{ url: '/og/resources.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.trueye.io/resources' },
  ],
}

const RESOURCES = [
  {
    icon: FileText,
    title: 'Documentation',
    description:
      'Implementation guides, API references, and technical documentation for deploying TruEye across your infrastructure.',
    cta: 'View Documentation',
    href: '#',
    download: false,
  },
  {
    icon: BookOpen,
    title: 'Prime Guide eBook',
    description:
      'The definitive guide to deploying video analytics. Covers technology, use cases, and decision frameworks for IT and security leaders.',
    cta: 'Download Free PDF',
    href: '/images/TruEye-PrimeGuide.pdf',
    download: true,
  },
  {
    icon: FileText,
    title: 'Product Presentation',
    description:
      'Full TruEye product overview with module details, deployment architecture, and ROI framework. Ideal for procurement and leadership review.',
    cta: 'Download PDF',
    href: '/images/TruEye-Product.pdf',
    download: true,
  },
]

export default function ResourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative pt-36 pb-16 bg-[#050A14] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-poppins font-bold text-display-xl text-[#F0F4FF] mb-4">
            TruEye Resources — Documentation, Guides & Downloads
          </h1>
          <p className="text-body-lg text-[#6B7FA3]">
            Everything you need to evaluate, deploy, and scale TruEye in your organization.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#050A14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.title} className="glass-card-cyan rounded-2xl p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-[#00D4FF]" />
                  </div>
                  <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">{r.title}</h2>
                  <p className="text-[#6B7FA3] text-sm leading-relaxed flex-1 mb-6">{r.description}</p>
                  <a
                    href={r.href}
                    download={r.download || undefined}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 transition-all self-start"
                  >
                    <Download size={14} />
                    {r.cta}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

