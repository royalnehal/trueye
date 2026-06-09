'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-14 bg-[#0A1628] border-y border-white/5">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#6B7FA3] text-sm mb-4">
          Get video analytics insights in your inbox.
        </p>
        {submitted ? (
          <p className="text-[#00D4FF] font-medium">You&apos;re subscribed. Welcome aboard!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-[#F0F4FF] placeholder:text-[#6B7FA3]/50 focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all flex items-center gap-2 flex-shrink-0"
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
