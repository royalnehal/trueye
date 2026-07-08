'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { COUNTRIES, INDUSTRIES_LIST, BUSINESS_TYPES } from '@/lib/data'
import { cn } from '@/lib/utils'

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  industry: z.string().min(1, 'Industry is required'),
  businessType: z.string().min(1, 'Business type is required'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to receive communications' }),
  }),
})

type FormData = z.infer<typeof schema>

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0F4FF] text-sm placeholder:text-[#6B7FA3]/50 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/8 transition-all'

const errorClasses = 'text-red-400 text-xs mt-1'

export function DemoForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to send')
    router.push('/thank-you')
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            {...register('firstName')}
            placeholder="First Name *"
            className={cn(inputClasses, errors.firstName && 'border-red-500/50')}
          />
          {errors.firstName && <p className={errorClasses}>{errors.firstName.message}</p>}
        </div>
        <div>
          <input
            {...register('lastName')}
            placeholder="Last Name *"
            className={cn(inputClasses, errors.lastName && 'border-red-500/50')}
          />
          {errors.lastName && <p className={errorClasses}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            {...register('company')}
            placeholder="Company Name *"
            className={cn(inputClasses, errors.company && 'border-red-500/50')}
          />
          {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Work Email *"
            className={cn(inputClasses, errors.email && 'border-red-500/50')}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone Number *"
            className={cn(inputClasses, errors.phone && 'border-red-500/50')}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>
        <div>
          <select
            {...register('country')}
            className={cn(
              inputClasses,
              'appearance-none cursor-pointer',
              errors.country && 'border-red-500/50'
            )}
          >
            <option value="">Select Country *</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-[#0A1628]">
                {c}
              </option>
            ))}
          </select>
          {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <select
            {...register('industry')}
            className={cn(
              inputClasses,
              'appearance-none cursor-pointer',
              errors.industry && 'border-red-500/50'
            )}
          >
            <option value="">Select Industry *</option>
            {INDUSTRIES_LIST.map((ind) => (
              <option key={ind} value={ind} className="bg-[#0A1628]">
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && <p className={errorClasses}>{errors.industry.message}</p>}
        </div>
        <div>
          <select
            {...register('businessType')}
            className={cn(
              inputClasses,
              'appearance-none cursor-pointer',
              errors.businessType && 'border-red-500/50'
            )}
          >
            <option value="">Business Type *</option>
            {BUSINESS_TYPES.map((bt) => (
              <option key={bt} value={bt} className="bg-[#0A1628]">
                {bt}
              </option>
            ))}
          </select>
          {errors.businessType && <p className={errorClasses}>{errors.businessType.message}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00D4FF] rounded"
          />
          <span className="text-sm text-[#6B7FA3]">
            I agree to receive communications from TruEye regarding products, services, and updates.
          </span>
        </label>
        {errors.consent && <p className={cn(errorClasses, 'mt-2')}>{errors.consent.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        className="w-full"
      >
        Submit Request
      </Button>

      <p className="text-xs text-[#6B7FA3] mt-4 text-center">
        Your information is protected. We respect your privacy and will never share your data.{' '}
        <a href="/privacy-policy" className="text-[#00D4FF] hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  )
}

