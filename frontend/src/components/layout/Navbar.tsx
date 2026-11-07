import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Cloud Migration & FinOps', href: '/services/cloud-migration' },
      { label: 'Enterprise AI Integration', href: '/services/ai-integration' },
      {
        label: 'Enterprise Software Development',
        href: '/services/software-development',
      },
      { label: 'Managed IT Services', href: '/services/managed-it' },
    ],
  },
  { label: 'Industries', href: '/#industries' },
  { label: 'Our Work', href: '/work' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-navbar'
          : 'bg-white',
      )}
    >
      <Container size="wide">
        <nav className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-brand-dark leading-none">
                NEXUS
              </span>
              <span className="text-[9px] font-semibold tracking-[0.12em] text-brand-dark uppercase leading-none mt-0.5">
                AI & Cloud Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                      isActive(item.href)
                        ? 'text-brand-dark'
                        : 'text-brand-muted hover:text-brand-dark',
                    )}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180',
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                      isActive(item.href)
                        ? 'text-brand-dark'
                        : 'text-brand-muted hover:text-brand-dark',
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-72">
                    <div className="bg-white rounded-xl shadow-elevated border border-brand-border-light p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-brand-muted hover:text-brand-dark hover:bg-brand-lavender rounded-lg transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden lg:block">
              <Button size="sm">Discuss Your Project</Button>
            </Link>

            <button
              className="lg:hidden p-2 text-brand-dark hover:bg-brand-lavender rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bg-white border-t border-brand-border-light shadow-elevated transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-6 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label,
                      )
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-brand-dark rounded-lg hover:bg-brand-lavender transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180',
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200 pl-4',
                      activeDropdown === item.label
                        ? 'max-h-60 opacity-100'
                        : 'max-h-0 opacity-0',
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-brand-muted hover:text-brand-dark rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'text-brand-dark bg-brand-lavender'
                      : 'text-brand-muted hover:text-brand-dark hover:bg-brand-lavender',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-4 pb-2">
            <Link to="/contact" className="block">
              <Button className="w-full">Discuss Your Project</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
