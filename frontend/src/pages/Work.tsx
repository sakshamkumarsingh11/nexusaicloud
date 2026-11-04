import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const caseStudies = [
  {
    industry: 'Financial Services',
    title: 'Cloud-Native Risk Analytics Platform',
    overview:
      'Migrated a legacy on-premise risk calculation system to a cloud-native architecture, enabling real-time portfolio analysis and significantly improving computation performance.',
    challenge:
      'The existing risk analytics platform was built on ageing on-premise infrastructure with scaling limitations. As data volumes grew, batch processing times exceeded acceptable thresholds, and the system could not support real-time analysis.',
    solution:
      'Designed and implemented a microservices-based architecture on AWS, with event-driven data pipelines, containerised compute workloads, and a managed PostgreSQL database layer. Introduced infrastructure-as-code for repeatable deployments.',
    results: [
      'Significantly reduced computation time for risk calculations',
      'Enabled real-time portfolio analysis for the first time',
      'Lowered infrastructure operating costs through cloud optimisation',
      'Improved system reliability with automated scaling and failover',
    ],
    technologies: ['AWS', 'Python', 'PostgreSQL', 'Docker'],
    variant: 'white' as const,
  },
  {
    industry: 'Healthcare',
    title: 'AI-Powered Clinical Decision Support',
    overview:
      'Integrated a large language model into an existing clinical workflow system to surface relevant patient history, flag potential drug interactions, and provide evidence-based treatment suggestions.',
    challenge:
      'Clinicians faced information overload when reviewing patient cases — manually searching across multiple systems for relevant history, research, and drug interaction data was time-consuming and error-prone.',
    solution:
      'Built a retrieval-augmented generation (RAG) system that connects to the hospital\'s electronic health records and medical knowledge bases. The system surfaces relevant context alongside AI-generated summaries within the clinician\'s existing workflow.',
    results: [
      'Reduced time spent on manual information retrieval',
      'Improved consistency in clinical decision documentation',
      'Enhanced drug interaction flagging accuracy',
      'Seamlessly integrated with the existing EHR workflow',
    ],
    technologies: ['OpenAI', 'Azure', 'React', 'FastAPI'],
    variant: 'dark' as const,
  },
  {
    industry: 'Manufacturing',
    title: 'Smart Factory IoT Dashboard',
    overview:
      'Built a real-time monitoring platform connecting IoT sensors across production facilities, enabling predictive maintenance alerts and unified operational visibility.',
    challenge:
      'Production data from IoT sensors was siloed across disconnected systems with no unified view. Equipment failures were detected reactively, leading to unplanned downtime and production losses.',
    solution:
      'Developed a unified dashboard platform that ingests, processes, and visualises real-time data from IoT sensors. Implemented predictive maintenance models to identify potential equipment failures before they occur.',
    results: [
      'Unified real-time visibility across all production lines',
      'Enabled predictive maintenance alerting',
      'Reduced unplanned equipment downtime',
      'Improved overall production efficiency metrics',
    ],
    technologies: ['Google Cloud', 'Node.js', 'TimescaleDB', 'React'],
    variant: 'white' as const,
  },
  {
    industry: 'Technology',
    title: 'Enterprise API Gateway & Integration Hub',
    overview:
      'Designed and built a centralised API management platform with rate limiting, analytics, and developer documentation for a growing technology company.',
    challenge:
      'As the company\'s platform grew, service integrations became fragmented and difficult to manage. There was no centralised API governance, rate limiting, or usage analytics.',
    solution:
      'Built a custom API gateway with authentication, rate limiting, request transformation, and comprehensive analytics. Included a developer portal with auto-generated documentation and sandbox environments.',
    results: [
      'Centralised API governance across all services',
      'Improved API reliability with rate limiting and circuit breakers',
      'Reduced integration onboarding time with developer portal',
      'Enabled data-driven API usage insights and capacity planning',
    ],
    technologies: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
    variant: 'white' as const,
  },
]

export default function Work() {
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
            <SectionLabel className="mb-4">Portfolio</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-6"
          >
            Our Work
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-brand-muted leading-relaxed"
          >
            A selection of technical projects across industries — each one a
            story of complex problems solved with precision engineering.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-6 p-4 rounded-xl bg-brand-lavender border border-brand-border-light"
          >
            <p className="text-sm text-brand-muted italic">
              The following case studies are illustrative examples for
              demonstration purposes. They do not represent actual client
              engagements, partnerships, or verified business results.
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Case Studies */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={gridAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={gridAnim.isInView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {caseStudies.map((study) => (
            <motion.div key={study.title} variants={fadeInUp}>
              <Card
                variant={study.variant}
                padding="lg"
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Overview */}
                  <div className="lg:col-span-1">
                    <SectionLabel
                      variant={study.variant === 'dark' ? 'light' : 'default'}
                      className="mb-3"
                    >
                      {study.industry}
                    </SectionLabel>
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        study.variant === 'dark'
                          ? 'text-white'
                          : 'text-brand-dark'
                      }`}
                    >
                      {study.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        study.variant === 'dark'
                          ? 'text-white/70'
                          : 'text-brand-muted'
                      }`}
                    >
                      {study.overview}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant={
                            study.variant === 'dark' ? 'dark' : 'outline'
                          }
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4
                        className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                          study.variant === 'dark'
                            ? 'text-white/50'
                            : 'text-brand-muted-light'
                        }`}
                      >
                        Challenge
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${
                          study.variant === 'dark'
                            ? 'text-white/80'
                            : 'text-brand-dark'
                        }`}
                      >
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                          study.variant === 'dark'
                            ? 'text-white/50'
                            : 'text-brand-muted-light'
                        }`}
                      >
                        Solution
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${
                          study.variant === 'dark'
                            ? 'text-white/80'
                            : 'text-brand-dark'
                        }`}
                      >
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                          study.variant === 'dark'
                            ? 'text-white/50'
                            : 'text-brand-muted-light'
                        }`}
                      >
                        Results
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result) => (
                          <li
                            key={result}
                            className={`flex items-start gap-2 text-sm ${
                              study.variant === 'dark'
                                ? 'text-white/80'
                                : 'text-brand-dark'
                            }`}
                          >
                            <ArrowUpRight
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                study.variant === 'dark'
                                  ? 'text-white/40'
                                  : 'text-brand-indigo'
                              }`}
                            />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
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
              Start a Conversation
            </SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have a Similar Challenge?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how Nexus can help your organisation solve
              complex technical problems.
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Your Project
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>
    </PageWrapper>
  )
}

