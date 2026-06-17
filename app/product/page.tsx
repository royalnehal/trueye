import type { Metadata } from 'next'
import { GEO_ENTITY_PARAGRAPH, AI_MODULES, FAQS, BENEFITS } from '@/lib/data'
import { DemoForm } from '@/components/ui/DemoForm'
import { GlowDivider } from '@/components/ui/GlowDivider'
import ProductClient from './ProductClient'

export const metadata: Metadata = {
  title: 'TruEye Product Details: Features & Benefits Overview',
  description:
    'Learn about the TruEye platform\'s features and benefits. Discover how our product can enhance your business with cutting-edge technology and innovative solutions.',
  alternates: {
    canonical: 'https://www.trueye.io/product',
    languages: { en: 'https://www.trueye.io/product', 'en-IN': 'https://www.trueye.io/product' },
  },
  openGraph: {
    title: 'TruEye Product — AI Video Analytics Platform | 50+ Modules',
    description:
      'Full AI analytics platform: intrusion detection, face recognition, crowd monitoring, heat maps, and 45+ more modules. Works with existing CCTV.',
    url: 'https://www.trueye.io/product',
    images: [{ url: '/og/product.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    title: 'TruEye Product — AI Video Analytics Platform | 50+ Modules',
    description: 'TruEye 19+ AI modules for intelligent surveillance. No hardware replacement.',
    images: ['/og/product.jpg'],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TruEye Video Analytics',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Cloud, On-Premise, Edge',
  description:
    'AI-powered video analytics platform with 50+ modules including intrusion detection, face recognition, crowd detection, heat map generation, safety gear compliance, number plate recognition, and machine efficiency monitoring.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '0',
    description: 'Custom pricing. Contact sales@trueye.io.',
  },
  featureList: [
    'Intrusion Detection',
    'Crowd Detection',
    'Camera Tampering Detection',
    'Fire and Smoke Detection',
    'Noise Detection',
    'Person In Out Count',
    'Number Plate Recognition',
    'Safety Gear Detection',
    'Vehicle Speed Monitoring',
    'Heat Map Generation',
    'Face Recognition',
    'Loitering Detection',
    'Machine Efficiency Monitoring',
    'Worker Efficiency Tracking',
    'Phone Detection',
    'Visitor Entry Management',
    'Object Tagging and Tracking',
    'Illegal Parking Detection',
    'Vehicle Direction Monitoring',
  ],
  provider: {
    '@type': 'Organization',
    name: 'VertexPlus Technologies Limited',
    url: 'https://www.trueye.io',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Product', item: 'https://www.trueye.io/product' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function ProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#050A14] pt-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="scanline-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4 px-3 py-1 border border-[#00D4FF]/20 rounded-full bg-[#00D4FF]/5">
            AI Video Analytics Platform
          </span>
          <h1 className="font-poppins font-bold text-display-xl md:text-display-2xl text-[#F0F4FF] mb-6">
            TruEye Video Analytics Platform — 50+ AI-Powered Modules
          </h1>
          <p className="text-body-lg text-[#6B7FA3] max-w-2xl mx-auto">
            Real scenarios at public spaces, homes, industries, and businesses — TruEye Video
            Analytics is built to deliver greater security, operational efficiency, situational
            awareness, and investigation intelligence.
          </p>
        </div>
      </section>

      {/* GEO Entity Block */}
      <section className="py-12 bg-[#050A14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-[#00D4FF] glass-card-cyan pl-8 pr-6 py-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] block mb-3">
              About TruEye
            </span>
            <p className="text-body-lg text-[#F0F4FF]/90 leading-relaxed">{GEO_ENTITY_PARAGRAPH}</p>
          </div>
        </div>
      </section>

      {/* Why Video Analytics Now */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-6">
            The Time for Video Analytics Is Now
          </h2>
          <div className="space-y-5 text-body-lg text-[#6B7FA3] leading-relaxed">
            <p>
              Video data is the largest ignored resource in business today. Every camera in your
              facility is generating a continuous stream of intelligence that currently sits unwatched,
              unanalyzed, and unutilized. Manual monitoring captures fragments. TruEye captures
              everything — automatically, consistently, at scale.
            </p>
            <p>
              AI video analytics tools convert raw footage into competitive advantage — from
              Crowd Detection in retail environments to real-time safety monitoring in manufacturing
              plants. The technology is no longer experimental. It is enterprise-grade, proven across
              industries, and deployable on your existing camera infrastructure today.
            </p>
            <p>
              Start small with a single facility or department. Validate the ROI. Then scale with
              confidence across every site, every camera, every operation. TruEye grows with you —
              from 1 camera to 1000+ — without replacing a single piece of existing hardware.
            </p>
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* Interactive modules + accordions */}
      <ProductClient modules={AI_MODULES} faqs={FAQS} benefits={BENEFITS} />

      {/* Demo section */}
      <section id="requestdemo" className="py-24 bg-[#050A14]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-3">
              Request a Product Demo
            </h2>
            <p className="text-body-lg text-[#6B7FA3]">
              See TruEye&apos;s full platform live. Our experts will walk you through every relevant module.
            </p>
          </div>
          <div className="glass-card-cyan rounded-2xl p-8">
            <DemoForm />
          </div>
        </div>
      </section>

      {/* External credibility links */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-sm text-[#6B7FA3]">
        <p>
          TruEye is developed by{' '}
          <a
            href="https://www.vertexplus.com/global/en/company"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D4FF] hover:underline"
          >
            VertexPlus Technologies Limited
          </a>
          . For camera interoperability standards, see{' '}
          <a
            href="https://www.onvif.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D4FF] hover:underline"
          >
            ONVIF standards
          </a>
          .
        </p>
      </div>
    </>
  )
}

