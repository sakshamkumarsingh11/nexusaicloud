import { cn } from '@/utils/cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

export default function Container({
  children,
  className,
  size = 'default',
}: ContainerProps) {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  }

  return (
    <div className={cn('mx-auto px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  )
}
