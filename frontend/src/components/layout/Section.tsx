import { cn } from '@/utils/cn'
import Container from '@/components/ui/Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'default' | 'white' | 'dark' | 'lavender'
  spacing?: 'sm' | 'md' | 'lg'
  containerSize?: 'narrow' | 'default' | 'wide'
  id?: string
}

export default function Section({
  children,
  className,
  background = 'default',
  spacing = 'lg',
  containerSize = 'default',
  id,
}: SectionProps) {
  const backgrounds = {
    default: '',
    white: 'bg-white',
    dark: 'bg-brand-dark text-white',
    lavender: 'bg-brand-lavender',
  }

  const spacings = {
    sm: 'py-12 lg:py-16',
    md: 'py-16 lg:py-20',
    lg: 'py-20 lg:py-28',
  }

  return (
    <section
      id={id}
      className={cn(backgrounds[background], spacings[spacing], className)}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
