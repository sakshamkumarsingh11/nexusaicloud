import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, Shield, TrendingUp } from 'lucide-react'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const differentiators = [
  {
    icon: Users,
    title: 'Cross-Functional Teams',
    description:
      'Engineers, architects, and strategists embedded into your workflow for seamless collaboration.',
  },
  {
    icon: Zap,
    title: 'Accelerated Delivery',
    description:
      'Agile sprints, CI/CD pipelines, and automated testing to ship production-ready solutions faster.',
  },
  {
    icon: Shield,
    title: 'Security-First Mindset',
    description:
      'Every solution is built with enterprise-grade security, compliance, and data governance baked in.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Outcomes',
    description:
      'We align every engagement to KPIs that matter — cost savings, performance gains, and revenue impact.',
  },
]

export default function WhyNexusSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <Section background="dark">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Why Nexus heading */}
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-14"
        >
          Why Nexus?
        </motion.h2>

        {/* Differentiators grid */}
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {differentiators.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <item.icon className="w-8 h-8 text-brand-indigo mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA block */}
        <motion.div
          variants={fadeInUp}
          className="border-t border-white/10 pt-14 text-center"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-5">
            Ready to Transform Your Technology?
          </h3>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how Nexus can architect the right solution for
            your business.
          </p>
          <Button
            variant="secondary"
            size="lg"
            href="/contact"
            icon={<ArrowRight className="w-4 h-4" />}
            className="bg-white text-brand-dark hover:bg-white/90"
          >
            Discuss Your Project
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
