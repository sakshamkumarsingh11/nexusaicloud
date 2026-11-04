import { cn } from '@/utils/cn'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'light'
}

export default function SectionLabel({
  children,
  className,
  variant = 'default',
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.15em]',
        variant === 'default' ? 'text-brand-indigo' : 'text-white/60',
        className,
      )}
    >
      {children}
    </span>
  )
}
