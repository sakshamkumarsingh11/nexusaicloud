import { motion } from 'framer-motion'
import { ArrowRight, Brain, Cloud, Database, Code } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  scaleIn,
} from '@/hooks/useScrollAnimation'

/* ── AI & Cloud Architecture Visualization ── */

const nodes = [
  { label: 'Artificial Intelligence', Icon: Brain, angle: -45 },
  { label: 'Cloud Infrastructure', Icon: Cloud, angle: 45 },
  { label: 'Data Engineering', Icon: Database, angle: 135 },
  { label: 'Software Development', Icon: Code, angle: 225 },
] as const

function ArchitectureVisual() {
  const cx = 240
  const cy = 240
  const orbitR = 155

  return (
    <motion.div
      variants={scaleIn}
      className="relative w-full aspect-square max-w-[480px] mx-auto"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glassmorphism filters */}
          <filter id="glass-center" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
          <filter id="glass-shadow" x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#4F52C8" floodOpacity="0.10" />
          </filter>

          {/* Animated dash for connection lines */}
          <style>{`
            @keyframes dash-flow {
              to { stroke-dashoffset: -24; }
            }
            .conn-line {
              stroke-dasharray: 6 6;
              animation: dash-flow 2s linear infinite;
            }
          `}</style>
        </defs>

        {/* Connection lines from center to each node */}
        {nodes.map(({ label, angle }) => {
          const rad = (angle * Math.PI) / 180
          const nx = cx + orbitR * Math.cos(rad)
          const ny = cy + orbitR * Math.sin(rad)
          return (
            <line
              key={label}
              x1={cx}
              y1={cy}
              x2={nx}
              y2={ny}
              stroke="#C7C8E2"
              strokeWidth="1"
              className="conn-line"
            />
          )
        })}

        {/* Subtle orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={orbitR}
          stroke="#DDDEED"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Center glass hub */}
        <g filter="url(#glass-shadow)">
          <rect
            x={cx - 62}
            y={cy - 40}
            width="124"
            height="80"
            rx="16"
            fill="white"
            fillOpacity="0.85"
            stroke="#DDDEED"
            strokeWidth="1"
          />
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="#111118"
            fontFamily="'Inter', system-ui, sans-serif"
          >
            NEXUS
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="500"
            fill="#6B7280"
            letterSpacing="0.12em"
            fontFamily="'Inter', system-ui, sans-serif"
          >
            AI &amp; CLOUD SOLUTIONS
          </text>
        </g>
      </svg>

      {/* Peripheral technology nodes */}
      {nodes.map(({ label, Icon, angle }, i) => {
        const rad = (angle * Math.PI) / 180
        const pctX = ((cx + orbitR * Math.cos(rad)) / 480) * 100
        const pctY = ((cy + orbitR * Math.sin(rad)) / 480) * 100

        return (
          <motion.div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
            style={{ left: `${pctX}%`, top: `${pctY}%` }}
            animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
            transition={{
              duration: 3.5 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm border border-brand-border-light shadow-card flex items-center justify-center">
              <Icon className="w-5 h-5 text-brand-indigo" strokeWidth={1.6} />
            </div>
            <span className="text-[9px] sm:text-[10px] font-medium text-brand-dark/70 whitespace-nowrap leading-none text-center max-w-[80px]">
              {label}
            </span>
          </motion.div>
        )
      })}
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
            <ArchitectureVisual />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
