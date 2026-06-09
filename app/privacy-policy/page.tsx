import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — TruEye',
  description: 'TruEye Privacy Policy: how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://www.trueye.io/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — TruEye',
    description: 'TruEye Privacy Policy',
    url: 'https://www.trueye.io/privacy-policy',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://www.trueye.io/privacy-policy' },
  ],
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="pt-36 pb-20 bg-[#050A14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-poppins font-bold text-3xl text-[#F0F4FF] mb-2">Privacy Policy</h1>
          <p className="text-[#6B7FA3] text-sm mb-10">Last updated: January 2025</p>
          <div className="space-y-8 text-[#6B7FA3] text-sm leading-relaxed">
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">1. Introduction</h2>
              <p>VertexPlus Technologies Limited (&ldquo;we&rdquo;, &ldquo;TruEye&rdquo;) respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit www.trueye.io or interact with our services.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">2. Information We Collect</h2>
              <p>We may collect personal information you provide directly, such as your name, email address, phone number, and company name when you request a demo, submit a contact form, or subscribe to our newsletter. We also collect anonymized usage data through analytics tools to improve our website.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">3. How We Use Your Information</h2>
              <p>We use your information to respond to your enquiries, provide product demos, send product updates if you have opted in, and improve our website experience. We do not sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">4. Data Retention</h2>
              <p>We retain personal data for as long as necessary to fulfill the purpose for which it was collected, or as required by applicable law. You may request deletion of your data at any time by contacting contact@trueye.io.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">5. Cookies</h2>
              <p>Our website uses essential cookies to ensure functionality. We may also use analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">6. Security</h2>
              <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>
            <section>
              <h2 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-3">7. Contact Us</h2>
              <p>For privacy-related queries, contact us at <a href="mailto:contact@trueye.io" className="text-[#00D4FF] hover:underline">contact@trueye.io</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

