import PageWrapper from '@/components/layout/PageWrapper'
import Section from '@/components/layout/Section'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Privacy() {
  return (
    <PageWrapper>
      <Section background="default" spacing="lg">
        <div className="max-w-3xl">
          <SectionLabel className="mb-4">Legal</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-brand-muted leading-relaxed">
            Last updated: November 2026
          </p>
        </div>
      </Section>

      <Section background="white" spacing="md">
        <div className="max-w-3xl space-y-10">
          <div className="p-4 rounded-xl bg-brand-lavender border border-brand-border-light">
            <p className="text-sm text-brand-muted italic">
              This privacy policy is a template and will be updated with
              specific legal terms before the website is made publicly
              available. Please review the final version before relying on its
              contents.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              1. Information We Collect
            </h2>
            <p className="text-brand-muted leading-relaxed mb-3">
              When you use our website and services, we may collect the
              following information:
            </p>
            <ul className="space-y-2 text-brand-muted text-sm">
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                <span>
                  <strong className="text-brand-dark">Contact
                  information</strong> — name, email address, phone number, and
                  company name provided through our enquiry forms.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                <span>
                  <strong className="text-brand-dark">Project
                  details</strong> — information about your project
                  requirements, budget range, and service interests submitted
                  through our forms.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                <span>
                  <strong className="text-brand-dark">Usage data</strong> —
                  information about how you interact with our website, including
                  pages visited, time spent, and browser information.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-brand-muted leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-brand-muted text-sm">
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                Respond to your enquiries and provide information about our services.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                Assess your project requirements and prepare proposals.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                Improve our website and services based on usage patterns.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                Communicate with you about our services and relevant updates.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              3. Data Storage & Security
            </h2>
            <p className="text-brand-muted leading-relaxed">
              We take the security of your data seriously. Information submitted
              through our forms is stored in secure, encrypted databases. We
              implement appropriate technical and organisational measures to
              protect your personal data against unauthorised access, alteration,
              disclosure, or destruction. We retain your data only for as long
              as necessary to fulfil the purposes outlined in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-brand-muted leading-relaxed">
              Our website may use third-party services for hosting, analytics,
              and email delivery. These services may process your data in
              accordance with their own privacy policies. We select third-party
              providers that maintain appropriate data protection standards. We
              do not sell, trade, or otherwise transfer your personal
              information to external parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              5. Your Rights
            </h2>
            <p className="text-brand-muted leading-relaxed mb-3">
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="space-y-2 text-brand-muted text-sm">
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                The right to access the personal data we hold about you.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                The right to request correction of inaccurate data.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                The right to request deletion of your personal data.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-indigo mt-1">•</span>
                The right to withdraw consent where processing is based on consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              6. Contact Us About Privacy
            </h2>
            <p className="text-brand-muted leading-relaxed">
              If you have any questions about this privacy policy or wish to
              exercise your data rights, please contact us at{' '}
              <a
                href="mailto:hello@nexusaicloud.com"
                className="text-brand-indigo hover:underline"
              >
                hello@nexusaicloud.com
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </PageWrapper>
  )
}

