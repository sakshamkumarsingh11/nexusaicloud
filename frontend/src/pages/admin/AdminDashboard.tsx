import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut,
  Inbox,
  Clock,
  CheckCircle2,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Mail,
  Building2,
  Phone,
  Calendar,
  Tag,
  DollarSign,
  MessageSquare,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getEnquiries, updateEnquiryStatus } from '@/services/admin'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import { cn } from '@/utils/cn'
import type { Enquiry, EnquiryStatus } from '@/types'

const STATUS_CONFIG: Record<
  EnquiryStatus,
  { label: string; color: string; icon: typeof Inbox }
> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Inbox },
  in_progress: {
    label: 'In Progress',
    color: 'bg-amber-100 text-amber-700',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle2,
  },
}

const SOURCE_LABELS: Record<string, string> = {
  contact: 'Contact',
  project: 'Project',
  service: 'Service',
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        config.color,
      )}
    >
      <config.icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminDashboard() {
  const { admin, logout, isLoading: authLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sourceFilter, setSourceFilter] = useState<string>('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [authLoading, isAuthenticated, navigate])

  const fetchEnquiries = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const params: Record<string, string | number> = {}
      if (statusFilter) params.status_filter = statusFilter
      if (sourceFilter) params.source_filter = sourceFilter
      const result = await getEnquiries(params)
      setEnquiries(result.enquiries)
      setTotal(result.total)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load enquiries.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter, sourceFilter])

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries()
    }
  }, [isAuthenticated, fetchEnquiries])

  const handleStatusUpdate = async (id: string, newStatus: EnquiryStatus) => {
    setUpdatingId(id)
    try {
      const updated = await updateEnquiryStatus(id, newStatus)
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? updated : e)),
      )
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(updated)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update status.',
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin', { replace: true })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-border border-t-brand-indigo rounded-full animate-spin" />
      </div>
    )
  }

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    in_progress: enquiries.filter((e) => e.status === 'in_progress').length,
    completed: enquiries.filter((e) => e.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Top bar */}
      <header className="bg-white border-b border-brand-border-light sticky top-0 z-30">
        <Container size="wide">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold tracking-tight text-brand-dark">
                NEXUS
              </span>
              <span className="text-xs text-brand-muted">Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-brand-muted hidden sm:block">
                {admin?.username}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Inbox, color: 'text-brand-dark' },
            { label: 'New', value: stats.new, icon: Inbox, color: 'text-blue-600' },
            { label: 'In Progress', value: stats.in_progress, icon: Clock, color: 'text-amber-600' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600' },
          ].map((stat) => (
            <Card key={stat.label} variant="white" padding="md">
              <div className="flex items-center gap-3">
                <stat.icon className={cn('w-5 h-5', stat.color)} />
                <div>
                  <p className="text-2xl font-bold text-brand-dark">
                    {stat.value}
                  </p>
                  <p className="text-xs text-brand-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters + refresh */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-sm text-brand-muted">
            <Filter className="w-4 h-4" />
            Filters:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-brand-border bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-indigo/20"
          >
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-brand-border bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-indigo/20"
          >
            <option value="">All sources</option>
            <option value="contact">Contact</option>
            <option value="project">Project</option>
            <option value="service">Service</option>
          </select>
          <Button variant="ghost" size="sm" onClick={fetchEnquiries}>
            <RefreshCw className={cn('w-4 h-4 mr-1', isLoading && 'animate-spin')} />
            Refresh
          </Button>
          <span className="text-xs text-brand-muted ml-auto">
            {total} enquir{total === 1 ? 'y' : 'ies'}
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-brand-error">
            {error}
          </div>
        )}

        {/* Enquiries table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-border border-t-brand-indigo rounded-full animate-spin" />
          </div>
        ) : enquiries.length === 0 ? (
          <Card variant="white" padding="lg">
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-brand-border mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-brand-dark mb-2">
                No Enquiries
              </h3>
              <p className="text-sm text-brand-muted">
                {statusFilter || sourceFilter
                  ? 'No enquiries match your filters.'
                  : 'No enquiries have been submitted yet.'}
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {enquiries.map((enquiry) => (
              <Card
                key={enquiry.id}
                variant="white"
                padding="md"
                hover
                className="cursor-pointer"
              >
                <div
                  onClick={() =>
                    setSelectedEnquiry(
                      selectedEnquiry?.id === enquiry.id ? null : enquiry,
                    )
                  }
                >
                  {/* Summary row */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-brand-dark truncate">
                          {enquiry.name}
                        </h3>
                        <StatusBadge status={enquiry.status} />
                        <Badge variant="outline">
                          {SOURCE_LABELS[enquiry.source] || enquiry.source}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-brand-muted">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {enquiry.email}
                        </span>
                        {enquiry.company && (
                          <span className="flex items-center gap-1 hidden sm:flex">
                            <Building2 className="w-3 h-3" />
                            {enquiry.company}
                          </span>
                        )}
                        <span className="flex items-center gap-1 hidden md:flex">
                          <Calendar className="w-3 h-3" />
                          {formatDate(enquiry.created_at)}
                        </span>
                      </div>
                    </div>
                    {selectedEnquiry?.id === enquiry.id ? (
                      <ChevronUp className="w-4 h-4 text-brand-muted flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-muted flex-shrink-0" />
                    )}
                  </div>

                  {/* Expanded detail */}
                  {selectedEnquiry?.id === enquiry.id && (
                    <div
                      className="mt-4 pt-4 border-t border-brand-border-light"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <DetailRow
                            icon={Mail}
                            label="Email"
                            value={enquiry.email}
                          />
                          {enquiry.phone && (
                            <DetailRow
                              icon={Phone}
                              label="Phone"
                              value={enquiry.phone}
                            />
                          )}
                          {enquiry.company && (
                            <DetailRow
                              icon={Building2}
                              label="Company"
                              value={enquiry.company}
                            />
                          )}
                          {enquiry.service && (
                            <DetailRow
                              icon={Tag}
                              label="Service"
                              value={enquiry.service}
                            />
                          )}
                          {enquiry.budget && (
                            <DetailRow
                              icon={DollarSign}
                              label="Budget"
                              value={enquiry.budget}
                            />
                          )}
                          <DetailRow
                            icon={Calendar}
                            label="Submitted"
                            value={formatDate(enquiry.created_at)}
                          />
                          <DetailRow
                            icon={Clock}
                            label="Last Updated"
                            value={formatDate(enquiry.updated_at)}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-2">
                            <MessageSquare className="w-3 h-3" />
                            Message
                          </div>
                          <p className="text-sm text-brand-dark leading-relaxed bg-brand-lavender p-4 rounded-xl">
                            {enquiry.message}
                          </p>
                        </div>
                      </div>

                      {/* Status actions */}
                      <div className="mt-6 pt-4 border-t border-brand-border-light flex flex-wrap items-center gap-3">
                        <span className="text-xs text-brand-muted">
                          Update status:
                        </span>
                        {(
                          Object.keys(STATUS_CONFIG) as EnquiryStatus[]
                        ).map((s) => (
                          <Button
                            key={s}
                            variant={
                              enquiry.status === s ? 'primary' : 'secondary'
                            }
                            size="sm"
                            onClick={() => handleStatusUpdate(enquiry.id, s)}
                            disabled={
                              enquiry.status === s ||
                              updatingId === enquiry.id
                            }
                            isLoading={
                              updatingId === enquiry.id &&
                              enquiry.status !== s
                            }
                          >
                            {STATUS_CONFIG[s].label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-brand-muted">{label}</p>
        <p className="text-sm text-brand-dark">{value}</p>
      </div>
    </div>
  )
}

