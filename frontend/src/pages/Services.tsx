import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cloud, Brain, Code2, Headphones, ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const services = [
  {
    icon: Cloud,
    title: 'Cloud Migration & FinOps',
    description:
      'Seamlessly migrate your infrastructure to the cloud and optimise ongoing costs with our FinOps practices. We handle assessment, execution, and long-term cost management.',
    href: '/services/cloud-migration',
  },
  {
    icon: Brain,
    title: 'Enterprise AI Integration',
    description:
      'Integrate large language models, retrieval-augmented generation, and intelligent automation into your enterprise workflows to drive efficiency and insight.',
    href: '/services/ai-integration',
  },
  {
    icon: Code2,
    title: 'Enterprise Software Development',
    description:
      'Build custom, scalable software solutions — from backend APIs and system integrations to full-stack applications tailored to your business needs.',
    href: '/services/software-development',
  },
  {
    icon: Headphones,
    title: 'Managed IT Services',
    description:
      'Proactive monitoring, maintenance, and support for your IT infrastructure — so you can focus on your business while we keep your systems running smoothly.',
    href: '/services/managed-it',
  },
]

export default function Services() {
  const heroAnim = useScrollAnimation()
  const gridAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  return (
    <PageWrapper>
      {/* Hero */}
      <Section background="default" spacing="lg">
        <motion.div
          ref={heroAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={heroAnim.isInView ? 'visible' : 'hidden'}
          className="max-w-3xl"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel className="mb-4">What We Do</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-brand-muted leading-relaxed max-w-2xl"
          >
            From cloud infrastructure and AI integration to custom software and
            managed services — we provide end-to-end technology solutions
            designed for real business impact.
          </motion.p>
        </motion.div>
      </Section>

      {/* Services Grid */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={gridAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={gridAnim.isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.href} variants={fadeInUp}>
                <Card variant="light" padding="lg" hover className="h-full flex flex-col">
                  <Icon className="w-10 h-10 text-brand-indigo mb-5" />
                  <h3 className="text-xl font-semibold text-brand-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-brand-muted leading-relaxed text-sm mb-6 flex-1">
                    {service.description}
                  </p>
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark hover:text-brand-indigo transition-colors duration-200"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* CTA */}
      <Section background="dark" spacing="lg">
        <motion.div
          ref={ctaAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={ctaAnim.isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel variant="light" className="mb-4">
              Get Started
            </SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Tell us about your challenge and we&apos;ll help you identify the
              right approach for your organisation.
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>
    </PageWrapper>
  )
}
