import { motion } from 'framer-motion'
import Section from '@/components/layout/Section'
import { useScrollAnimation, fadeInUp, fadeIn } from '@/hooks/useScrollAnimation'

const technologies = [
  'AWS',
  'Microsoft Azure',
  'Google Cloud',
  'Python',
  'OpenAI',
  'PostgreSQL',
]

export default function TechStripSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <Section background="default" spacing="sm">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted mb-8"
        >
          Built on the technologies shaping tomorrow.
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {technologies.map((tech, i) => (
            <span key={tech} className="flex items-center gap-8">
              <span className="text-sm font-medium text-brand-muted-light whitespace-nowrap">
                {tech}
              </span>
              {i < technologies.length - 1 && (
                <span className="hidden sm:inline text-brand-border" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
