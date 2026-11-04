import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      isLoading,
      icon,
      iconPosition = 'right',
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-brand-dark text-white hover:bg-brand-navy shadow-sm hover:shadow-md active:scale-[0.98]',
      secondary:
        'bg-white text-brand-dark border border-brand-border hover:border-brand-muted-light hover:bg-brand-bg active:scale-[0.98]',
      ghost:
        'text-brand-dark hover:bg-brand-lavender active:bg-brand-lavender-deep',
      link: 'text-brand-dark hover:text-brand-indigo underline-offset-4 hover:underline p-0',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-2.5 text-sm gap-2',
      lg: 'px-8 py-3.5 text-base gap-2.5',
    }

    const classes = cn(
      baseStyles,
      variants[variant],
      variant !== 'link' && sizes[size],
      className,
    )

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </>
    )

    if (href) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
