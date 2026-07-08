'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  fullName: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0F4FF] text-sm placeholder:text-[#6B7FA3]/50 focus:outline-none focus:border-[#00D4FF]/50 transition-all'
const errorClasses = 'text-red-400 text-xs mt-1'

export default function ContactForm() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to send')
    router.push('/thank-you')
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="text-[#00D4FF] mx-auto mb-3" size={36} />
        <h3 className="font-poppins font-bold text-lg text-[#F0F4FF] mb-2">Message Sent!</h3>
        <p className="text-[#6B7FA3] text-sm">We&apos;ll get back to you within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <input {...register('fullName')} placeholder="Full Name *" className={cn(inputClasses, errors.fullName && 'border-red-500/50')} />
        {errors.fullName && <p className={errorClasses}>{errors.fullName.message}</p>}
      </div>
      <div>
        <input {...register('email')} type="email" placeholder="Email *" className={cn(inputClasses, errors.email && 'border-red-500/50')} />
        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input {...register('phone')} type="tel" placeholder="Phone" className={inputClasses} />
        <input {...register('company')} placeholder="Company" className={inputClasses} />
      </div>
      <div>
        <textarea {...register('message')} placeholder="Your message *" rows={4} className={cn(inputClasses, 'resize-none', errors.message && 'border-red-500/50')} />
        {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#00D4FF] text-black font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all disabled:opacity-50">
        {isSubmitting ? 'Sending——' : 'Send Message'}
      </button>
    </form>
  )
}

