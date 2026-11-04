import { motion } from 'framer-motion'
import {
  Landmark,
  HeartPulse,
  Factory,
  Cpu,
  ShoppingCart,
  GraduationCap,
} from 'lucide-react'
import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const industries = [
  {
    icon: Landmark,
    name: 'Financial Services',
    description:
      'Risk analytics, regulatory compliance, fraud detection, and digital banking solutions.',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    description:
      'Clinical decision support, EHR integration, telemedicine platforms, and HIPAA-compliant infrastructure.',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    description:
      'IoT dashboards, predictive maintenance, supply-chain optimization, and smart factory systems.',
  },
  {
    icon: Cpu,
    name: 'Technology',
    description:
      'SaaS platforms, API ecosystems, developer tools, and scalable cloud-native architectures.',
  },
  {
    icon: ShoppingCart,
    name: 'Retail & E-commerce',
    description:
      'Personalization engines, inventory management, omnichannel platforms, and recommendation systems.',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description:
      'Learning management systems, EdTech platforms, AI tutoring, and virtual classroom infrastructure.',
  },
]

export default function IndustriesSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <Section background="default" id="industries">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-5">
            Industries We Empower.
          </h2>
          <p className="text-lg text-brand-muted leading-relaxed">
            We serve a diverse range of industries, bringing deep technical
            expertise and domain-specific insight to every engagement.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((ind) => (
            <motion.div key={ind.name} variants={fadeInUp}>
              <Card variant="light" hover padding="lg">
                <ind.icon className="w-7 h-7 text-brand-indigo mb-5" />
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {ind.name}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {ind.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
