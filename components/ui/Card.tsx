import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
}

export function Card({ children, className, glow, hover }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6',
        glow && 'border-[#00D4FF]/20 shadow-lg shadow-[#00D4FF]/5',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF]/30 hover:shadow-lg hover:shadow-[#00D4FF]/10',
        className
      )}
    >
      {children}
    </div>
  )
}
