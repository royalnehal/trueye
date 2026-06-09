import { cn } from '@/lib/utils'

export function GlowDivider({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-px w-full overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-4 bg-[#00D4FF]/10 blur-md" />
    </div>
  )
}
