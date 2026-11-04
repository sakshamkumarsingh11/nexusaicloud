import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Cloud,
  Brain,
  Server,
  Database,
  Settings,
  Monitor,
  ArrowRight,
} from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import NumberedCard from '@/components/ui/NumberedCard'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const differentiators = [
  {
    number: '01',
    title: 'Technical Depth Over Surface-Level Solutions',
    description:
      'We go beyond quick fixes. Our engineers dig into the root of technical challenges to deliver solutions that are robust, efficient, and built to last.',
  },
  {
    number: '02',
    title: 'Partnership, Not Just Delivery',
    description:
      'We work alongside your teams as an extension of your organisation — sharing knowledge, building capabilities, and aligning with your long-term goals.',
  },
  {
    number: '03',
    title: 'Cloud-Native & AI-First Thinking',
    description:
      'Every solution we architect is designed with modern cloud infrastructure and intelligent automation in mind, ensuring you stay ahead of the curve.',
  },
  {
    number: '04',
    title: 'Built for Scale & Long-Term Growth',
    description:
      'We design systems that grow with your business — scalable architectures, clean codebases, and infrastructure that adapts as your needs evolve.',
  },
]

const approach = [
  {
    number: '01',
    title: 'Discovery & Assessment',
    description:
      'We start by understanding your business objectives, current technology landscape, and key challenges through stakeholder interviews and technical audits.',
  },
  {
    number: '02',
    title: 'Strategy & Architecture',
    description:
      'We design a tailored roadmap and technical architecture that aligns with your goals, timeline, and budget — balancing innovation with pragmatism.',
  },
  {
    number: '03',
    title: 'Engineering & Implementation',
    description:
      'Our engineers build, integrate, and deploy solutions using agile methodologies, with continuous feedback loops and transparent progress reporting.',
  },
  {
    number: '04',
    title: 'Optimisation & Support',
    description:
      'Post-launch, we monitor performance, optimise costs, and provide ongoing support to ensure your systems continue to deliver value.',
  },
]

const techCapabilities = [
  {
    icon: Cloud,
    title: 'Cloud Platforms',
    techs: ['AWS', 'Azure', 'GCP'],
  },
  {
    icon: Brain,
    title: 'AI & ML',
    techs: ['OpenAI', 'LangChain', 'TensorFlow'],
  },
  {
    icon: Server,
    title: 'Backend',
    techs: ['Python', 'Node.js', 'FastAPI'],
  },
  {
    icon: Database,
    title: 'Databases',
    techs: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    icon: Settings,
    title: 'DevOps',
    techs: ['Docker', 'Kubernetes', 'Terraform'],
  },
  {
    icon: Monitor,
    title: 'Frontend',
    techs: ['React', 'TypeScript', 'Next.js'],
  },
]

export default function About() {
  const heroAnim = useScrollAnimation()
  const introAnim = useScrollAnimation()
  const missionAnim = useScrollAnimation()
  const diffAnim = useScrollAnimation()
  const approachAnim = useScrollAnimation()
  const techAnim = useScrollAnimation()
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
            <SectionLabel className="mb-4">About Us</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-6"
          >
            About Nexus AI &amp; Cloud Solutions
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-brand-muted leading-relaxed max-w-2xl"
          >
            We help businesses navigate the complexities of modern technology —
            from cloud infrastructure and enterprise AI to custom software and
            managed services.
          </motion.p>
        </motion.div>
      </Section>

      {/* Company Introduction */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={introAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={introAnim.isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel className="mb-4">Who We Are</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
              We are a technology consulting firm focused on practical,
              results-driven solutions.
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-5">
            <p className="text-brand-muted leading-relaxed">
              Nexus AI &amp; Cloud Solutions was founded on the belief that
              technology should serve business goals — not the other way around.
              We work with organisations of all sizes to design, build, and
              manage the systems that power their operations.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Our team brings together expertise in cloud architecture,
              artificial intelligence, software engineering, and IT operations.
              Whether you&apos;re migrating to the cloud, integrating AI into
              your workflows, or building a new platform from scratch, we
              provide the technical depth and strategic guidance to make it
              happen.
            </p>
            <p className="text-brand-muted leading-relaxed">
              We value clarity, craftsmanship, and long-term thinking — and
              we bring those values to every engagement.
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Mission & Vision */}
      <Section background="default" spacing="lg">
        <motion.div
          ref={missionAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={missionAnim.isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <SectionLabel className="mb-4">Purpose</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Mission &amp; Vision
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp}>
              <Card variant="light" padding="lg" className="h-full">
                <SectionLabel className="mb-4">Our Mission</SectionLabel>
                <h3 className="text-xl font-semibold text-brand-dark mb-3">
                  Empowering Businesses Through Technology
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  To help businesses harness the power of cloud computing,
                  artificial intelligence, and modern software engineering to
                  solve real problems, improve efficiency, and unlock new
                  opportunities for growth.
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card variant="light" padding="lg" className="h-full">
                <SectionLabel className="mb-4">Our Vision</SectionLabel>
                <h3 className="text-xl font-semibold text-brand-dark mb-3">
                  A Trusted Technology Partner
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  To be a trusted partner for organisations seeking to
                  modernise their technology — known for technical excellence,
                  transparent collaboration, and solutions that deliver lasting
                  impact.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* What Makes Nexus Different */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={diffAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={diffAnim.isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <SectionLabel className="mb-4">Why Nexus</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              What Makes Nexus Different
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item) => (
              <motion.div key={item.number} variants={fadeInUp}>
                <NumberedCard
                  number={item.number}
                  title={item.title}
                  description={item.description}
                  variant="light"
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Our Approach */}
      <Section background="dark" spacing="lg">
        <motion.div
          ref={approachAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={approachAnim.isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <SectionLabel variant="light" className="mb-4">
              Process
            </SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Approach
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approach.map((step) => (
              <motion.div key={step.number} variants={fadeInUp}>
                <NumberedCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  variant="dark"
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Technology Capabilities */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={techAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={techAnim.isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <SectionLabel className="mb-4">Expertise</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Technology Capabilities
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCapabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <motion.div key={cap.title} variants={fadeInUp}>
                  <Card variant="light" padding="lg" hover className="h-full">
                    <Icon className="w-8 h-8 text-brand-indigo mb-4" />
                    <h3 className="text-lg font-semibold text-brand-dark mb-4">
                      {cap.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cap.techs.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section background="default" spacing="lg">
        <motion.div
          ref={ctaAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={ctaAnim.isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-brand-muted text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how Nexus can help your organisation achieve
              its technology goals.
            </p>
            <Link to="/contact">
              <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>
    </PageWrapper>
  )
}
