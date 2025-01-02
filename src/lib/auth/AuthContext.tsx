import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string, role: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token and validate
    const checkAuth = async () => {
      try {
        // TODO: Implement actual auth check
        setLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login
    const mockUser: User = {
      id: '1',
      email,
      name: 'Test User',
      role: 'residential',
      createdAt: new Date(),
    }
    setUser(mockUser)
  }

  const logout = async () => {
    // TODO: Implement actual logout
    setUser(null)
  }

  const register = async (email: string, password: string, name: string, role: string) => {
    // TODO: Implement actual registration
    const mockUser: User = {
      id: '1',
      email,
      name,
      role: role as User['role'],
      createdAt: new Date(),
    }
    setUser(mockUser)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
