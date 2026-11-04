import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  scaleIn,
} from '@/hooks/useScrollAnimation'

function OrbitalSphere() {
  return (
    <motion.div
      variants={scaleIn}
      className="relative w-full aspect-square max-w-[480px] mx-auto"
    >
      {/* Main sphere */}
      <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-brand-lavender via-white to-brand-lavender-deep shadow-xl" />

      {/* Dashed orbit 1 — horizontal ellipse */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 480 480"
        fill="none"
      >
        <ellipse
          cx="240"
          cy="240"
          rx="220"
          ry="120"
          stroke="currentColor"
          className="text-brand-border"
          strokeWidth="1"
          strokeDasharray="8 6"
          transform="rotate(-25 240 240)"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="200"
          ry="100"
          stroke="currentColor"
          className="text-brand-border"
          strokeWidth="1"
          strokeDasharray="6 8"
          transform="rotate(35 240 240)"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="180"
          ry="80"
          stroke="currentColor"
          className="text-brand-border-light"
          strokeWidth="1"
          strokeDasharray="4 6"
          transform="rotate(-60 240 240)"
        />
      </svg>

      {/* Floating dots */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-brand-indigo shadow-lg"
        style={{ top: '8%', left: '55%' }}
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-brand-dark"
        style={{ top: '30%', right: '5%' }}
        animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-brand-lavender-deep border border-brand-border"
        style={{ bottom: '18%', right: '10%' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-brand-indigo/60"
        style={{ bottom: '25%', left: '8%' }}
        animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute w-3.5 h-3.5 rounded-full bg-white border border-brand-border shadow-md"
        style={{ top: '20%', left: '10%' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-brand-dark/40"
        style={{ top: '65%', left: '3%' }}
        animate={{ y: [0, 5, 0], x: [0, -3, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </motion.div>
  )
}

export default function HeroSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="bg-brand-lavender overflow-hidden">
      <Container size="wide">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28"
        >
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-indigo mr-2" />
                Technology Consultancy
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] tracking-tight text-brand-dark mb-6"
            >
              Engineering Intelligence.
              <br />
              Accelerating Innovation.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-brand-muted max-w-xl mb-8 leading-relaxed"
            >
              We transform complex business challenges into elegant, scalable
              technology solutions — from enterprise AI integration to
              cloud-native architecture and beyond.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
              <Button variant="secondary" size="lg" href="/services">
                Explore Our Services
              </Button>
            </motion.div>
          </div>

          {/* Visual column */}
          <div className="order-1 lg:order-2">
            <OrbitalSphere />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
