import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — TruEye',
  description: 'Terms and conditions governing the use of TruEye website and services.',
  alternates: { canonical: 'https://www.trueye.io/terms-of-use' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Use', item: 'https://www.trueye.io/terms-of-use' },
  ],
}

export default function TermsOfUsePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="pt-36 pb-20 bg-[#050A14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-poppins font-bold text-3xl text-[#F0F4FF] mb-2">Terms of Use</h1>
          <p className="text-[#6B7FA3] text-sm mb-10">Last updated: January 2025</p>
          <div className="space-y-8 text-[#6B7FA3] text-sm leading-relaxed">
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using www.trueye.io, you agree to be bound by these Terms of Use. If you do not agree, please do not use this website.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">2. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and software, is the property of VertexPlus Technologies Limited or its content suppliers and is protected by applicable intellectual property laws. TruEye® is a registered trademark of VertexPlus Technologies Limited.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">3. Permitted Use</h2>
              <p>You may access and use this website for lawful purposes only. You may not reproduce, distribute, modify, or create derivative works without prior written consent from VertexPlus Technologies Limited.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">4. Disclaimer of Warranties</h2>
              <p>This website is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not guarantee uninterrupted or error-free operation.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">5. Limitation of Liability</h2>
              <p>VertexPlus Technologies Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">6. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">7. Contact</h2>
              <p>Questions about these Terms? Contact us at <a href="mailto:contact@trueye.io" className="text-[#00D4FF] hover:underline">contact@trueye.io</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

