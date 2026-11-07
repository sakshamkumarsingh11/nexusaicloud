import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'

const footerLinks = {
  services: [
    { label: 'Cloud Migration & FinOps', href: '/services/cloud-migration' },
    { label: 'Enterprise AI Integration', href: '/services/ai-integration' },
    { label: 'Software Development', href: '/services/software-development' },
    { label: 'Managed IT Services', href: '/services/managed-it' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  connect: [
    { label: 'LinkedIn', href: '#', external: true },
    { label: 'Twitter', href: '#', external: true },
    { label: 'GitHub', href: '#', external: true },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white mt-auto">
      <Container size="wide">
        <div className="py-16 lg:py-20">
          {/* Top section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <span className="text-xl font-bold tracking-tight text-white">NEXUS</span>
                <span className="block text-[10px] font-semibold tracking-[0.12em] text-white/80 uppercase mt-0.5">
                  AI & Cloud Solutions
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                Engineering intelligent, scalable technology solutions through
                enterprise AI, cloud engineering, and modern software
                development.
              </p>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40 mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40 mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40 mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact placeholder */}
              <div className="mt-8">
                <p className="text-xs text-white/40 mb-1">Email</p>
                <a
                  href="mailto:contact@nexusaicloud.com"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  contact@nexusaicloud.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {currentYear} Nexus AI & Cloud Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-xs text-white/20">·</span>
              <Link
                to="/contact"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
