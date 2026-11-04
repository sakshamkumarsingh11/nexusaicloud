import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-brand-dark mb-1.5"
          >
            {label}
            {props.required && (
              <span className="text-brand-error ml-0.5">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-brand-dark text-sm',
            'placeholder:text-brand-muted-light',
            'focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 focus:border-brand-indigo',
            'transition-all duration-200 resize-y min-h-[120px]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-brand-error focus:ring-brand-error/20 focus:border-brand-error'
              : 'border-brand-border',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-xs text-brand-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-brand-muted">{helperText}</p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
export default Textarea
