import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'white'
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  variant = 'white',
  className,
  hover = false,
  padding = 'lg',
}: CardProps) {
  const variants = {
    white: 'bg-white border border-brand-border-light text-brand-dark',
    light: 'bg-brand-lavender text-brand-dark',
    dark: 'bg-brand-navy text-white',
  }

  const paddings = {
    sm: 'p-5',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'rounded-2xl shadow-card transition-all duration-300',
        variants[variant],
        paddings[padding],
        hover && 'hover:shadow-card-hover hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </div>
  )
}
