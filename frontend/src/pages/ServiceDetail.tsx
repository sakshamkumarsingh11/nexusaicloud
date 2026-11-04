import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Cloud,
  Brain,
  Code2,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
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

const servicesData: Record<
  string,
  {
    title: string
    description: string
    icon: typeof Cloud
    features: { title: string; description: string }[]
    benefits: string[]
    technologies: string[]
  }
> = {
  'cloud-migration': {
    title: 'Cloud Migration & FinOps',
    description:
      'Seamlessly migrate your infrastructure to the cloud and optimise ongoing costs with our FinOps practices. We handle assessment, execution, and long-term cost governance.',
    icon: Cloud,
    features: [
      {
        title: 'Cloud Assessment & Readiness',
        description:
          'Comprehensive evaluation of your current infrastructure, applications, and workloads to build a clear migration roadmap.',
      },
      {
        title: 'Migration Strategy & Execution',
        description:
          'End-to-end migration planning and execution — including lift-and-shift, re-platforming, and cloud-native refactoring.',
      },
      {
        title: 'Infrastructure as Code',
        description:
          'Automated, repeatable infrastructure provisioning using Terraform, CloudFormation, and other IaC tools for consistency and reliability.',
      },
      {
        title: 'Cloud Cost Optimisation (FinOps)',
        description:
          'Continuous cost analysis, right-sizing, reserved instance planning, and governance frameworks to maximise your cloud investment.',
      },
      {
        title: 'Security & Compliance',
        description:
          'Implementation of security best practices, identity management, encryption, and compliance frameworks across your cloud environments.',
      },
      {
        title: 'Multi-Cloud Management',
        description:
          'Unified management and orchestration across AWS, Azure, and Google Cloud to avoid vendor lock-in and leverage the best of each platform.',
      },
    ],
    benefits: [
      'Reduced infrastructure costs through optimised cloud spending',
      'Improved scalability and performance for growing workloads',
      'Enhanced security posture with cloud-native controls',
      'Predictable, governed cloud costs with FinOps practices',
    ],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes'],
  },
  'ai-integration': {
    title: 'Enterprise AI Integration',
    description:
      'Integrate large language models, retrieval-augmented generation, and intelligent automation into your enterprise workflows to drive efficiency and insight.',
    icon: Brain,
    features: [
      {
        title: 'LLM Application Development',
        description:
          'Custom applications powered by large language models, tailored to your business context, data, and workflows.',
      },
      {
        title: 'Retrieval-Augmented Generation (RAG)',
        description:
          'Systems that combine LLMs with your enterprise knowledge bases to provide accurate, context-aware responses grounded in your data.',
      },
      {
        title: 'AI-Powered Business Automation',
        description:
          'Intelligent automation of repetitive tasks, document processing, data extraction, and decision support workflows.',
      },
      {
        title: 'Enterprise Data Integration',
        description:
          'Connecting AI systems with your existing databases, APIs, and business applications for seamless data flow.',
      },
      {
        title: 'Intelligent Workflow Design',
        description:
          'End-to-end design of AI-augmented business processes that combine human expertise with machine intelligence.',
      },
      {
        title: 'AI Model Fine-Tuning & Deployment',
        description:
          'Custom model training, fine-tuning, and production deployment with monitoring, versioning, and performance tracking.',
      },
    ],
    benefits: [
      'Automated decision-making that reduces manual overhead',
      'Intelligent customer and employee interactions',
      'Data-driven insights at enterprise scale',
      'Faster processing of documents, queries, and workflows',
    ],
    technologies: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'Pinecone', 'FastAPI'],
  },
  'software-development': {
    title: 'Enterprise Software Development',
    description:
      'Build custom, scalable software solutions — from backend APIs and system integrations to full-stack applications tailored to your business needs.',
    icon: Code2,
    features: [
      {
        title: 'Custom Enterprise Applications',
        description:
          'Purpose-built applications designed around your specific business processes, data models, and user requirements.',
      },
      {
        title: 'Backend Architecture & API Development',
        description:
          'Robust, scalable backend systems and RESTful/GraphQL APIs built for performance, security, and maintainability.',
      },
      {
        title: 'System Integration',
        description:
          'Connecting disparate systems, third-party services, and legacy applications through well-designed integration layers.',
      },
      {
        title: 'Legacy System Modernisation',
        description:
          'Incrementally modernising legacy applications — from monolith decomposition to full re-architecture with modern frameworks.',
      },
      {
        title: 'Performance Engineering',
        description:
          'Load testing, profiling, and optimisation to ensure your applications perform reliably under real-world conditions.',
      },
      {
        title: 'Scalable Database Design',
        description:
          'Data modelling, schema design, and database architecture that supports your current needs and future growth.',
      },
    ],
    benefits: [
      'Purpose-built solutions aligned with business goals',
      'Long-term maintainability with clean, documented code',
      'Seamless integrations with existing systems and workflows',
      'Architectures designed for scale from day one',
    ],
    technologies: ['Python', 'React', 'TypeScript', 'PostgreSQL', 'Node.js', 'FastAPI'],
  },
  'managed-it': {
    title: 'Managed IT Services',
    description:
      'Proactive monitoring, maintenance, and support for your IT infrastructure — so you can focus on your business while we keep your systems running smoothly.',
    icon: Headphones,
    features: [
      {
        title: 'Infrastructure Monitoring & Alerting',
        description:
          'Real-time monitoring of servers, networks, applications, and cloud resources with intelligent alerting and escalation.',
      },
      {
        title: 'Maintenance & Patch Management',
        description:
          'Scheduled maintenance, security patching, and system updates to keep your infrastructure current and secure.',
      },
      {
        title: 'Performance Optimisation',
        description:
          'Continuous analysis and tuning of system performance — from database queries to network throughput and application response times.',
      },
      {
        title: 'Security Monitoring & Incident Response',
        description:
          'Proactive security monitoring, threat detection, and structured incident response to protect your business.',
      },
      {
        title: 'Disaster Recovery Planning',
        description:
          'Backup strategies, failover configurations, and disaster recovery plans to ensure business continuity.',
      },
      {
        title: 'System Reliability Engineering',
        description:
          'SRE practices including SLI/SLO definition, error budgets, and reliability improvements to maximise uptime.',
      },
    ],
    benefits: [
      'Reduced downtime through proactive monitoring',
      'Faster issue resolution with structured support',
      'Predictable IT costs with managed service agreements',
      'Enhanced security with continuous monitoring',
    ],
    technologies: ['AWS CloudWatch', 'Datadog', 'PagerDuty', 'Terraform', 'Ansible', 'Linux'],
  },
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? servicesData[slug] : null

  const heroAnim = useScrollAnimation()
  const featuresAnim = useScrollAnimation()
  const techAnim = useScrollAnimation()
  const benefitsAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  if (!service) {
    return (
      <PageWrapper>
        <Section background="default" spacing="lg">
          <div className="text-center min-h-[40vh] flex flex-col items-center justify-center">
            <span className="text-7xl font-bold text-brand-border mb-4">404</span>
            <h1 className="text-2xl font-bold text-brand-dark mb-3">Service Not Found</h1>
            <p className="text-brand-muted mb-6">The service you're looking for doesn't exist.</p>
            <Link to="/services">
              <Button>View All Services</Button>
            </Link>
          </div>
        </Section>
      </PageWrapper>
    )
  }

  const Icon = service.icon

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
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-dark transition-colors mb-6"
            >
              ← Back to Services
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-brand-lavender">
              <Icon className="w-8 h-8 text-brand-indigo" />
            </div>
            <div>
              <SectionLabel className="mb-2">Service</SectionLabel>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
                {service.title}
              </h1>
            </div>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-brand-muted leading-relaxed"
          >
            {service.description}
          </motion.p>
        </motion.div>
      </Section>

      {/* Features */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={featuresAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={featuresAnim.isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <SectionLabel className="mb-4">Capabilities</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              What We Deliver
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card variant="light" padding="lg" className="h-full">
                  <span className="text-3xl font-bold text-brand-border block mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Technologies */}
      <Section background="default" spacing="sm">
        <motion.div
          ref={techAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={techAnim.isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-muted mb-6"
          >
            Technologies We Use
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* Benefits */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={benefitsAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={benefitsAnim.isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <SectionLabel className="mb-4">Outcomes</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Key Benefits
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit) => (
              <motion.div
                key={benefit}
                variants={fadeInUp}
                className="flex items-start gap-3 p-5 rounded-xl bg-brand-lavender"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-success flex-shrink-0 mt-0.5" />
                <p className="text-brand-dark text-sm leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how our {service.title.toLowerCase()} services
              can help your organisation.
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

