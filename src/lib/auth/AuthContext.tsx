import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

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

  const login = async (email: string, _password: string) => {
    // Using _password to indicate it's intentionally unused
    const user: User = {
      id: '1',
      email,
      name: 'Test User',
      role: 'residential',
      createdAt: new Date().toISOString()
    }
    setUser(user)
  }

  const logout = async () => {
    // TODO: Implement actual logout
    setUser(null)
  }

  const register = async (email: string, _password: string, name: string, role: string) => {
    // Using _password to indicate it's intentionally unused
    const user: User = {
      id: '1',
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    }
    setUser(user)
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
