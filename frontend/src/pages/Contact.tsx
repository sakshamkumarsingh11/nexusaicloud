import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { submitEnquiry } from '@/services/enquiry'
import PageWrapper from '@/components/layout/PageWrapper'
import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import SectionLabel from '@/components/ui/SectionLabel'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from '@/hooks/useScrollAnimation'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about your project'),
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = [
  { value: 'cloud-migration', label: 'Cloud Migration & FinOps' },
  { value: 'ai-integration', label: 'Enterprise AI Integration' },
  { value: 'software-development', label: 'Enterprise Software Development' },
  { value: 'managed-it', label: 'Managed IT Services' },
  { value: 'general', label: 'General Enquiry' },
]

const budgetOptions = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 – $25,000' },
  { value: '25k-50k', label: '$25,000 – $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: '100k-plus', label: '$100,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
]

export default function Contact() {
  const [submitState, setSubmitState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const heroAnim = useScrollAnimation()
  const formAnim = useScrollAnimation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: '',
      budget: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    if (submitState === 'loading') return // Prevent duplicate submissions
    setSubmitState('loading')
    setErrorMessage('')

    try {
      await submitEnquiry(data, 'project')
      setSubmitState('success')
    } catch (err) {
      setSubmitState('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.',
      )
    }
  }

  const handleReset = () => {
    reset()
    setSubmitState('idle')
    setErrorMessage('')
  }

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
            <SectionLabel className="mb-4">Get in Touch</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-brand-muted leading-relaxed"
          >
            Have a project in mind or want to learn more about our services?
            Share your requirements and our team will get back to you within 1–2
            business days.
          </motion.p>
        </motion.div>
      </Section>

      {/* Form Section */}
      <Section background="white" spacing="lg">
        <motion.div
          ref={formAnim.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={formAnim.isInView ? 'visible' : 'hidden'}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-4">
              <Card variant="light" padding="lg" className="mb-6">
                <h3 className="text-lg font-semibold text-brand-dark mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-indigo flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-brand-muted mb-1">Email</p>
                      <a
                        href="mailto:hello@nexusaicloud.com"
                        className="text-sm text-brand-dark hover:text-brand-indigo transition-colors"
                      >
                        hello@nexusaicloud.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-indigo flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-brand-muted mb-1">Phone</p>
                      <p className="text-sm text-brand-muted-light italic">
                        [To be updated]
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-indigo flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-brand-muted mb-1">Address</p>
                      <p className="text-sm text-brand-muted-light italic">
                        [To be updated]
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="light" padding="lg">
                <h4 className="text-sm font-semibold text-brand-dark mb-2">
                  What Happens Next?
                </h4>
                <ol className="space-y-3 text-sm text-brand-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-indigo font-semibold">1.</span>
                    We review your enquiry within 1–2 business days
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-indigo font-semibold">2.</span>
                    A technical consultant assesses your requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-indigo font-semibold">3.</span>
                    We schedule a discovery call to discuss your project
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-indigo font-semibold">4.</span>
                    We propose a tailored solution and engagement plan
                  </li>
                </ol>
              </Card>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-8">
              {submitState === 'success' ? (
                <Card variant="light" padding="lg">
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-brand-success mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-brand-dark mb-3">
                      Thank You!
                    </h2>
                    <p className="text-brand-muted max-w-md mx-auto mb-8">
                      Your enquiry has been submitted successfully. Our team
                      will review your requirements and get back to you within
                      1–2 business days.
                    </p>
                    <Button onClick={handleReset} variant="secondary">
                      Send Another Enquiry
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Your full name"
                      required
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@company.com"
                      required
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Company Name"
                      placeholder="Your company"
                      {...register('company')}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...register('phone')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Service Interest"
                      options={serviceOptions}
                      placeholder="Select a service"
                      {...register('service')}
                    />
                    <Select
                      label="Estimated Budget"
                      options={budgetOptions}
                      placeholder="Select budget range"
                      {...register('budget')}
                    />
                  </div>

                  <Textarea
                    label="Project Description"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    required
                    error={errors.message?.message}
                    className="min-h-[160px]"
                    {...register('message')}
                  />

                  {submitState === 'error' && (
                    <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle className="w-5 h-5 text-brand-error flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-brand-error">{errorMessage}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-brand-muted">
                      By submitting, you agree to our{' '}
                      <a
                        href="/privacy"
                        className="underline hover:text-brand-dark transition-colors"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      isLoading={submitState === 'loading'}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Send Enquiry
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </PageWrapper>
  )
}

