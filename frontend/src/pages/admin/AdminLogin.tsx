import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }

    setIsLoading(true)
    try {
      await login(username, password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <Container size="narrow">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="text-2xl font-bold tracking-tight text-brand-dark">
              NEXUS
            </span>
            <span className="block text-[10px] font-medium tracking-[0.12em] text-brand-muted uppercase mt-0.5">
              AI & Cloud Solutions
            </span>
            <p className="text-sm text-brand-muted mt-4">Admin Portal</p>
          </div>

          <Card variant="white" padding="lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-2">
                <h1 className="text-xl font-semibold text-brand-dark">
                  Sign In
                </h1>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                  <AlertCircle className="w-4 h-4 text-brand-error flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-error">{error}</p>
                </div>
              )}

              <Input
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                autoFocus
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
                icon={<LogIn className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>
          </Card>

          <p className="text-xs text-brand-muted text-center mt-6">
            This area is restricted to authorised personnel only.
          </p>
        </div>
      </Container>
    </div>
  )
}

