import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface NumberedCardProps {
  number: string
  title: string
  description: string
  href?: string
  variant?: 'light' | 'dark'
  className?: string
}

export default function NumberedCard({
  number,
  title,
  description,
  href,
  variant = 'light',
  className,
}: NumberedCardProps) {
  const isLight = variant === 'light'

  return (
    <div
      className={cn(
        'rounded-2xl p-8 transition-all duration-300 shadow-card',
        isLight
          ? 'bg-white border border-brand-border-light'
          : 'bg-brand-navy text-white',
        className,
      )}
    >
      {/* Large muted number */}
      <span
        className={cn(
          'text-5xl font-bold block mb-6',
          isLight ? 'text-brand-border' : 'text-white/20',
        )}
      >
        {number}
      </span>

      {/* Title */}
      <h3
        className={cn(
          'text-xl font-semibold mb-3',
          isLight ? 'text-brand-dark' : 'text-white',
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          'text-sm leading-relaxed mb-6',
          isLight ? 'text-brand-muted' : 'text-white/70',
        )}
      >
        {description}
      </p>

      {/* Learn More link */}
      {href && (
        <Link
          to={href}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
            isLight
              ? 'text-brand-dark hover:text-brand-indigo'
              : 'text-white/90 hover:text-white',
          )}
        >
          Learn More
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
