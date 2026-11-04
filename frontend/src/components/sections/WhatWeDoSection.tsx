import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const features = [
  {
    number: '01',
    title: 'Intelligence That Scales',
    description:
      'From predictive analytics to generative AI, we architect intelligent systems that grow with your business and deliver measurable ROI.',
    variant: 'white' as const,
    className: 'border-brand-lavender-deep border-2',
  },
  {
    number: '02',
    title: 'Cloud Without Complexity',
    description:
      'Multi-cloud strategies, migration roadmaps, and FinOps practices that cut costs while boosting performance and reliability.',
    variant: 'dark' as const,
  },
  {
    number: '03',
    title: 'Engineering for Tomorrow',
    description:
      'Modern software built with clean architecture, CI/CD pipelines, and future-proof technology stacks designed for longevity.',
    variant: 'dark' as const,
  },
]

export default function WhatWeDoSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <Section background="white">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Header row */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-14">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
              What We Do
            </h2>
            <div className="mt-6">
              <Button
                variant="primary"
                size="md"
                href="/about"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Our Approach
              </Button>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-brand-muted leading-relaxed self-center"
          >
            We partner with forward-thinking organizations to design, build, and
            operate technology that drives competitive advantage. Our expertise
            spans artificial intelligence, cloud infrastructure, and enterprise
            software development.
          </motion.p>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.number} variants={fadeInUp}>
              <Card
                variant={feature.variant}
                hover
                className={feature.className}
              >
                <span
                  className={
                    feature.variant === 'dark'
                      ? 'text-4xl font-bold text-white/20 block mb-5'
                      : 'text-4xl font-bold text-brand-border block mb-5'
                  }
                >
                  {feature.number}
                </span>
                <h3
                  className={
                    feature.variant === 'dark'
                      ? 'text-xl font-semibold text-white mb-3'
                      : 'text-xl font-semibold text-brand-dark mb-3'
                  }
                >
                  {feature.title}
                </h3>
                <p
                  className={
                    feature.variant === 'dark'
                      ? 'text-sm text-white/70 leading-relaxed'
                      : 'text-sm text-brand-muted leading-relaxed'
                  }
                >
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
