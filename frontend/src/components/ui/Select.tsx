import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helperText, options, placeholder, id, ...props },
    ref,
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-brand-dark mb-1.5"
          >
            {label}
            {props.required && (
              <span className="text-brand-error ml-0.5">*</span>
            )}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-brand-dark text-sm',
            'focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 focus:border-brand-indigo',
            'transition-all duration-200 appearance-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-brand-error focus:ring-brand-error/20 focus:border-brand-error'
              : 'border-brand-border',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${selectId}-error`}
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

Select.displayName = 'Select'
export default Select
