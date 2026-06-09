import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer — TruEye',
  description: 'Disclaimer for TruEye website and AI video analytics information.',
  alternates: { canonical: 'https://www.trueye.io/disclaimer' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: 'https://www.trueye.io/disclaimer' },
  ],
}

export default function DisclaimerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="pt-36 pb-20 bg-[#050A14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-poppins font-bold text-3xl text-[#F0F4FF] mb-2">Disclaimer</h1>
          <p className="text-[#6B7FA3] text-sm mb-10">Last updated: January 2025</p>
          <div className="space-y-8 text-[#6B7FA3] text-sm leading-relaxed">
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">General Information</h2>
              <p>The information provided on www.trueye.io is for general informational purposes only. While we strive to keep information accurate and up to date, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information on this website.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">Product Information</h2>
              <p>Product features, specifications, and capabilities described on this website are subject to change. Specific performance results may vary depending on deployment environment, camera hardware, network infrastructure, and configuration.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">Third-Party Links</h2>
              <p>This website may contain links to third-party websites. These links are provided for convenience only. VertexPlus Technologies Limited has no control over the content of those websites and accepts no responsibility for them.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">No Professional Advice</h2>
              <p>The content on this website does not constitute legal, technical, or business advice. Always consult qualified professionals before making decisions based on information from this website.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">Contact</h2>
              <p>For questions, contact us at <a href="mailto:contact@trueye.io" className="text-[#00D4FF] hover:underline">contact@trueye.io</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

