import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import { AuthProvider, useAuth } from './lib/auth/AuthContext'
import Loading from './components/common/Loading'
import NotificationCenter from './components/notifications/NotificationCenter'
import LoginForm from './components/auth/LoginForm'

// Lazy load components
const AdminDashboard = lazy(() => import('./pages/dashboard/admin/AdminDashboard'))
const ResidentialDashboard = lazy(() => import('./pages/dashboard/residential/ResidentialDashboard'))
const CommercialDashboard = lazy(() => import('./pages/dashboard/commercial/CommercialDashboard'))

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link to="/" className="text-xl font-bold text-indigo-600">
                    Grinnage Ex
                  </Link>
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/admin"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Admin
                    </Link>
                    <Link
                      to="/residential"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Residential
                    </Link>
                    <Link
                      to="/commercial"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Commercial
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <NotificationCenter />
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/residential"
                element={
                  <PrivateRoute>
                    <ResidentialDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/commercial"
                element={
                  <PrivateRoute>
                    <CommercialDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center">
                      Welcome to Grinnage Ex
                    </h1>
                    <div className="mt-8 text-center">
                      <Link
                        to="/login"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
