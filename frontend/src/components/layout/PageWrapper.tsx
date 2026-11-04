import { cn } from '@/utils/cn'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      {children}
    </div>
  )
}
