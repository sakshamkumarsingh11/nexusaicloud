import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { ReactNode } from 'react'
import { adminLogin, adminLogout, getAdminMe } from '@/services/admin'

interface AdminUser {
  username: string
  email: string
}

interface AuthContextType {
  admin: AdminUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if already authenticated on mount
  useEffect(() => {
    let cancelled = false
    async function checkAuth() {
      try {
        const user = await getAdminMe()
        if (!cancelled) setAdmin(user)
      } catch {
        // Not authenticated — that's fine
        if (!cancelled) setAdmin(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    checkAuth()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    await adminLogin({ username, password })
    const user = await getAdminMe()
    setAdmin(user)
  }, [])

  const logout = useCallback(async () => {
    await adminLogout()
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading,
        isAuthenticated: admin !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

