import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'cyan' | 'green' | 'muted'
}

const variantClasses = {
  cyan: 'border-[#00D4FF]/30 text-[#00D4FF] bg-[#00D4FF]/10',
  green: 'border-[#00FF94]/30 text-[#00FF94] bg-[#00FF94]/10',
  muted: 'border-white/10 text-[#6B7FA3] bg-white/5',
}

export function Badge({ children, className, variant = 'cyan' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border font-mono',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
