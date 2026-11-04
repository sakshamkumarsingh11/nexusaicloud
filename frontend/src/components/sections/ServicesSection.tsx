import { motion } from 'framer-motion'
import Section from '@/components/layout/Section'
import SectionLabel from '@/components/ui/SectionLabel'
import NumberedCard from '@/components/ui/NumberedCard'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const services = [
  {
    number: '01',
    title: 'Cloud Migration & FinOps',
    description:
      'Strategic cloud migration with cost optimization, multi-cloud architecture, and ongoing FinOps practices to maximize ROI on cloud spend.',
    href: '/services/cloud-migration',
  },
  {
    number: '02',
    title: 'Enterprise AI Integration',
    description:
      'End-to-end AI solutions from strategy and model selection through deployment, including LLM integration, computer vision, and predictive analytics.',
    href: '/services/ai-integration',
  },
  {
    number: '03',
    title: 'Enterprise Software Development',
    description:
      'Full-cycle software engineering — from microservices and APIs to web platforms and mobile applications — built on modern, maintainable stacks.',
    href: '/services/software-development',
  },
  {
    number: '04',
    title: 'Managed IT Services',
    description:
      'Proactive monitoring, security management, infrastructure support, and 24/7 operations to keep your systems running at peak performance.',
    href: '/services/managed-it',
  },
]

export default function ServicesSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <Section background="white">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid lg:grid-cols-2 gap-12 lg:gap-20"
      >
        {/* Left column — heading */}
        <motion.div variants={fadeInUp} className="lg:sticky lg:top-32 self-start">
          <SectionLabel className="mb-4">What We Build</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            Technology Solutions for Real Business Challenges.
          </h2>
          <p className="text-lg text-brand-muted leading-relaxed max-w-md">
            We deliver outcomes, not just outputs. Every engagement is scoped to
            solve a specific challenge and designed to create lasting value.
          </p>
        </motion.div>

        {/* Right column — stacked cards */}
        <motion.div variants={staggerContainer} className="flex flex-col gap-5">
          {services.map((svc) => (
            <motion.div key={svc.number} variants={fadeInUp}>
              <NumberedCard
                number={svc.number}
                title={svc.title}
                description={svc.description}
                href={svc.href}
                variant="light"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
