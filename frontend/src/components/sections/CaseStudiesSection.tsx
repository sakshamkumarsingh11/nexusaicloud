import { motion } from 'framer-motion'
import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const studies = [
  {
    industry: 'Financial Services',
    title: 'Cloud-Native Risk Analytics Platform',
    description:
      'Migrated a legacy on-premise risk calculation system to a cloud-native architecture, reducing computation time by 85% and enabling real-time portfolio analysis.',
    tech: ['AWS', 'Python', 'PostgreSQL'],
    variant: 'white' as const,
  },
  {
    industry: 'Healthcare',
    title: 'AI-Powered Clinical Decision Support',
    description:
      'Integrated a fine-tuned LLM into an existing EHR workflow, providing clinicians with evidence-based treatment recommendations and reducing diagnostic turnaround time.',
    tech: ['OpenAI', 'Azure', 'React'],
    variant: 'dark' as const,
  },
  {
    industry: 'Manufacturing',
    title: 'Smart Factory IoT Dashboard',
    description:
      'Built a real-time monitoring and alerting platform that ingests data from 2,000+ IoT sensors, enabling predictive maintenance and reducing unplanned downtime by 40%.',
    tech: ['Google Cloud', 'Node.js', 'TimescaleDB'],
    variant: 'white' as const,
  },
]

export default function CaseStudiesSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <Section background="white">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-5">
            Engineering Ideas Into Impact.
          </h2>
          <p className="text-lg text-brand-muted leading-relaxed">
            A selection of technical projects across industries that showcase our
            approach to solving real-world challenges.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {studies.map((study) => (
            <motion.div key={study.title} variants={fadeInUp}>
              <Card variant={study.variant} hover className="flex flex-col h-full">
                <SectionLabel
                  variant={study.variant === 'dark' ? 'light' : 'default'}
                  className="mb-4"
                >
                  {study.industry}
                </SectionLabel>

                <h3
                  className={
                    study.variant === 'dark'
                      ? 'text-xl font-semibold text-white mb-3'
                      : 'text-xl font-semibold text-brand-dark mb-3'
                  }
                >
                  {study.title}
                </h3>

                <p
                  className={
                    study.variant === 'dark'
                      ? 'text-sm text-white/70 leading-relaxed mb-6 flex-1'
                      : 'text-sm text-brand-muted leading-relaxed mb-6 flex-1'
                  }
                >
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {study.tech.map((t) => (
                    <Badge
                      key={t}
                      variant={study.variant === 'dark' ? 'dark' : 'outline'}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={fadeInUp}
          className="text-xs text-brand-muted text-center mt-10 italic"
        >
          These are illustrative case studies for demonstration purposes.
        </motion.p>
      </motion.div>
    </Section>
  )
}
