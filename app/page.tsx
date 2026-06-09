import type { Metadata } from 'next'
import { DemoSimulator } from '@/components/sections/DemoSimulator'
import { ROICalculator } from '@/components/sections/ROICalculator'
import { DeploymentMap } from '@/components/sections/DeploymentMap'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { VideoShowcase } from '@/components/sections/VideoShowcase'
import { HeroSection } from '@/components/sections/HeroSection'
import { WhatIsTruEye } from '@/components/sections/WhatIsTruEye'
import { StatsBar } from '@/components/sections/StatsBar'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { UseCasesGrid } from '@/components/sections/UseCasesGrid'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { IndustriesRow } from '@/components/sections/IndustriesRow'
import { EbookCTA } from '@/components/sections/EbookCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { NewsletterSignup } from '@/components/sections/NewsletterSignup'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { DemoForm } from '@/components/ui/DemoForm'
import { GlowDivider } from '@/components/ui/GlowDivider'

export const metadata: Metadata = {
  title: 'TruEye — AI Video Analytics Solution | 50+ Modules | VertexPlus',
  description:
    'TruEye by VertexPlus Technologies is an enterprise video analytics platform with 50+ AI modules. Convert CCTV footage into real-time intelligence for security, safety, and operations.',
  alternates: {
    canonical: 'https://www.trueye.io',
    languages: { en: 'https://www.trueye.io', 'en-IN': 'https://www.trueye.io' },
  },
  openGraph: {
    title: 'TruEye — AI Video Analytics Solution | 50+ Modules | VertexPlus',
    description:
      'TruEye by VertexPlus Technologies is an enterprise video analytics platform with 50+ AI modules. Convert CCTV footage into real-time intelligence.',
    url: 'https://www.trueye.io',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    title: 'TruEye — AI Video Analytics Solution | 50+ Modules | VertexPlus',
    description:
      'TruEye by VertexPlus Technologies — 50+ AI modules for intelligent surveillance.',
    images: ['/og/home.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is video analytics software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Video analytics software uses AI and computer vision to automatically analyze CCTV footage, extracting actionable intelligence including intrusion alerts, crowd density data, person counts, and behavioral patterns without requiring manual review.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI modules does TruEye include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TruEye includes 50+ AI modules: intrusion detection, crowd detection, face recognition, number plate recognition, safety gear detection, heat map generation, loitering detection, fire and smoke detection, and machine efficiency monitoring, among others.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does TruEye work with existing CCTV cameras?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TruEye integrates with existing CCTV infrastructure and VMS systems. Organizations do not need to replace existing hardware to benefit from AI-powered video analytics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does TruEye video analytics cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TruEye pricing is customized based on deployment scale, number of cameras, hardware, network requirements, and integration needs. Contact sales@trueye.io for a personalised quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is video analytics technology used?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Video analytics is used in manufacturing, retail, healthcare, hospitality, aviation, transportation, government, education, and any location with CCTV cameras requiring intelligent monitoring.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is TruEye by VertexPlus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TruEye is an AI-powered video analytics solution developed by VertexPlus Technologies Limited. It enables organizations to automatically analyze CCTV footage using 50+ AI modules including intrusion detection, face recognition, and real-time alert generation. TruEye is a registered trademark of VertexPlus Technologies Limited.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero section */}
      <HeroSection />

      {/* Trusted by — infinite marquee */}
      <div className="bg-[#0A1628] border-y border-white/5 py-10 overflow-hidden">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7FA3] text-center mb-8">
          Trusted By
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0A1628, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0A1628, transparent)' }} />

          {/* Marquee track */}
          <div className="flex items-center" style={{ animation: 'marquee 28s linear infinite' }}>
            {/* First set */}
            {[
              /* P&G */
              <svg key="pg1" width="60" height="40" viewBox="0 0 60 40" fill="none" aria-label="P&G">
                <text x="2" y="30" fontFamily="Georgia, serif" fontWeight="700" fontSize="28" fill="#F0F4FF">P&amp;G</text>
              </svg>,
              /* Maruti Suzuki */
              <svg key="maruti1" width="110" height="40" viewBox="0 0 110 40" fill="none" aria-label="Maruti Suzuki">
                <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" fill="#F0F4FF" letterSpacing="1.5">MARUTI</text>
                <text x="0" y="36" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="9" fill="#6B7FA3" letterSpacing="3.5">SUZUKI</text>
              </svg>,
              /* Hero Honda */
              <svg key="hero1" width="120" height="40" viewBox="0 0 120 40" fill="none" aria-label="Hero Honda">
                <rect x="0" y="8" width="46" height="22" rx="3" fill="#CC0000" />
                <text x="5" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="white">HERO</text>
                <text x="52" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#F0F4FF">HONDA</text>
              </svg>,
              /* Rajasthan Patrika */
              <svg key="rp1" width="130" height="40" viewBox="0 0 130 40" fill="none" aria-label="Rajasthan Patrika">
                <text x="0" y="18" fontFamily="Georgia, serif" fontWeight="700" fontSize="12" fill="#F0F4FF" letterSpacing="0.5">RAJASTHAN</text>
                <text x="0" y="34" fontFamily="Georgia, serif" fontWeight="400" fontSize="12" fill="#00D4FF" letterSpacing="1">PATRIKA</text>
              </svg>,
              /* Digital Hospitality */
              <svg key="dh1" width="140" height="40" viewBox="0 0 140 40" fill="none" aria-label="Digital Hospitality">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12" fill="#00D4FF" letterSpacing="1">DIGITAL</text>
                <text x="0" y="34" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="12" fill="#F0F4FF" letterSpacing="0.5">HOSPITALITY</text>
              </svg>,
              /* MVM Infotech */
              <svg key="mvm1" width="140" height="40" viewBox="0 0 140 40" fill="none" aria-label="MVM Infotech">
                <rect x="0" y="6" width="36" height="22" rx="3" fill="#00D4FF" opacity="0.15" />
                <text x="4" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" fill="#00D4FF">MVM</text>
                <text x="42" y="22" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="13" fill="#F0F4FF" letterSpacing="0.5">INFOTECH</text>
              </svg>,
              /* Taste of City */
              <svg key="toc1" width="140" height="40" viewBox="0 0 140 40" fill="none" aria-label="Taste of City">
                <circle cx="10" cy="20" r="8" fill="#F59E0B" opacity="0.2" />
                <circle cx="10" cy="20" r="4" fill="#F59E0B" />
                <text x="24" y="17" fontFamily="Georgia, serif" fontWeight="700" fontSize="11" fill="#F59E0B" letterSpacing="0.5">TASTE OF</text>
                <text x="24" y="32" fontFamily="Georgia, serif" fontWeight="400" fontSize="11" fill="#F0F4FF" letterSpacing="1">CITY</text>
              </svg>,
              /* RS Group */
              <svg key="rs1" width="120" height="40" viewBox="0 0 120 40" fill="none" aria-label="RS Group">
                <rect x="0" y="6" width="32" height="26" rx="4" fill="#A855F7" opacity="0.15" />
                <text x="5" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#A855F7">RS</text>
                <text x="38" y="25" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="13" fill="#F0F4FF" letterSpacing="1">GROUP</text>
              </svg>,
            ].map((logo, i) => (
              <div key={i} className="flex-shrink-0 mx-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
                {logo}
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {[
              <svg key="pg2" width="60" height="40" viewBox="0 0 60 40" fill="none" aria-label="P&G">
                <text x="2" y="30" fontFamily="Georgia, serif" fontWeight="700" fontSize="28" fill="#F0F4FF">P&amp;G</text>
              </svg>,
              <svg key="maruti2" width="110" height="40" viewBox="0 0 110 40" fill="none" aria-label="Maruti Suzuki">
                <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" fill="#F0F4FF" letterSpacing="1.5">MARUTI</text>
                <text x="0" y="36" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="9" fill="#6B7FA3" letterSpacing="3.5">SUZUKI</text>
              </svg>,
              <svg key="hero2" width="120" height="40" viewBox="0 0 120 40" fill="none" aria-label="Hero Honda">
                <rect x="0" y="8" width="46" height="22" rx="3" fill="#CC0000" />
                <text x="5" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="white">HERO</text>
                <text x="52" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#F0F4FF">HONDA</text>
              </svg>,
              <svg key="rp2" width="130" height="40" viewBox="0 0 130 40" fill="none" aria-label="Rajasthan Patrika">
                <text x="0" y="18" fontFamily="Georgia, serif" fontWeight="700" fontSize="12" fill="#F0F4FF" letterSpacing="0.5">RAJASTHAN</text>
                <text x="0" y="34" fontFamily="Georgia, serif" fontWeight="400" fontSize="12" fill="#00D4FF" letterSpacing="1">PATRIKA</text>
              </svg>,
              <svg key="dh2" width="140" height="40" viewBox="0 0 140 40" fill="none" aria-label="Digital Hospitality">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12" fill="#00D4FF" letterSpacing="1">DIGITAL</text>
                <text x="0" y="34" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="12" fill="#F0F4FF" letterSpacing="0.5">HOSPITALITY</text>
              </svg>,
              <svg key="mvm2" width="140" height="40" viewBox="0 0 140 40" fill="none" aria-label="MVM Infotech">
                <rect x="0" y="6" width="36" height="22" rx="3" fill="#00D4FF" opacity="0.15" />
                <text x="4" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" fill="#00D4FF">MVM</text>
                <text x="42" y="22" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="13" fill="#F0F4FF" letterSpacing="0.5">INFOTECH</text>
              </svg>,
              <svg key="toc2" width="140" height="40" viewBox="0 0 140 40" fill="none" aria-label="Taste of City">
                <circle cx="10" cy="20" r="8" fill="#F59E0B" opacity="0.2" />
                <circle cx="10" cy="20" r="4" fill="#F59E0B" />
                <text x="24" y="17" fontFamily="Georgia, serif" fontWeight="700" fontSize="11" fill="#F59E0B" letterSpacing="0.5">TASTE OF</text>
                <text x="24" y="32" fontFamily="Georgia, serif" fontWeight="400" fontSize="11" fill="#F0F4FF" letterSpacing="1">CITY</text>
              </svg>,
              <svg key="rs2" width="120" height="40" viewBox="0 0 120 40" fill="none" aria-label="RS Group">
                <rect x="0" y="6" width="32" height="26" rx="4" fill="#A855F7" opacity="0.15" />
                <text x="5" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#A855F7">RS</text>
                <text x="38" y="25" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="13" fill="#F0F4FF" letterSpacing="1">GROUP</text>
              </svg>,
            ].map((logo, i) => (
              <div key={`dup-${i}`} className="flex-shrink-0 mx-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
                {logo}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <WhatIsTruEye />
      <StatsBar />
      <DemoSimulator />
      <ROICalculator />
      <VideoShowcase />
      <TestimonialsSection />
      <FeaturesGrid />
      <UseCasesGrid />
      <CaseStudiesSection />
      <DeploymentMap />
      <BenefitsGrid />

      <GlowDivider />

      <ComparisonTable />
      <IndustriesRow />
      <EbookCTA />

      {/* Demo Request Form */}
      <section id="requestdemo" className="py-24 bg-[#050A14]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-display-md text-[#F0F4FF] mb-3">
              See TruEye in Action
            </h2>
            <p className="text-body-lg text-[#6B7FA3]">
              Schedule a personalized demo with our video analytics experts.
            </p>
          </div>
          <div className="glass-card-cyan rounded-2xl p-8">
            <DemoForm />
          </div>
        </div>
      </section>

      <FAQAccordion />
      <NewsletterSignup />
      <CtaBanner />
    </>
  )
}

