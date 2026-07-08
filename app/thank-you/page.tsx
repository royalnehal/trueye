import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | TruEye',
  description: 'Thank you for reaching out. Our team will get back to you shortly.',
  robots: { index: false },
}

export default function ThankYouPage() {
  return (
    <section className="min-h-screen bg-[#040D1A] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center">
            <CheckCircle className="text-[#00D4FF]" size={48} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-poppins font-bold text-4xl text-[#F0F4FF] mb-4">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-[#6B7FA3] text-lg mb-2">
          Your enquiry has been received successfully.
        </p>
        <p className="text-[#6B7FA3] text-base mb-10">
          Our team will review your message and get back to you within <span className="text-[#F0F4FF] font-medium">1 business day</span>.
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-[#00D4FF]/30 mx-auto mb-10" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 bg-[#00D4FF] text-black font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/product"
            className="px-8 py-3.5 border border-[#00D4FF]/40 text-[#00D4FF] font-medium rounded-full hover:bg-[#00D4FF]/10 transition-all"
          >
            Explore Product
          </Link>
        </div>

      </div>
    </section>
  )
}
