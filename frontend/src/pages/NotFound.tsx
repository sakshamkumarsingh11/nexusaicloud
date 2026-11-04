import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <PageWrapper>
      <Section background="default" spacing="lg">
        <div className="flex flex-col items-center justify-center text-center min-h-[50vh]">
          <span className="text-8xl font-bold text-brand-border mb-6">404</span>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Page Not Found
          </h1>
          <p className="text-brand-muted text-lg mb-8 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link to="/">
            <Button
              size="lg"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </Section>
    </PageWrapper>
  )
}
