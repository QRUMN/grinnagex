import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import { AuthProvider, useAuth } from './lib/auth/AuthContext'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'
import ResidentialDashboard from './pages/dashboard/residential/ResidentialDashboard'
import CommercialDashboard from './pages/dashboard/commercial/CommercialDashboard'
import LoginForm from './components/auth/LoginForm'
import NotificationCenter from './components/notifications/NotificationCenter'
import Hero from './components/Hero'
import Features from './pages/features/Features'
import Pricing from './pages/pricing/Pricing'
import About from './pages/about/About'

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
                      to="/features"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Features
                    </Link>
                    <Link
                      to="/pricing"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Pricing
                    </Link>
                    <Link
                      to="/about"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      About
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
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

          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<LoginForm isSignup={true} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ResidentialDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <h3 className="text-xl font-bold mb-4 text-indigo-600">Track Progress</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Monitor your fitness journey with detailed analytics and insights.
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <h3 className="text-xl font-bold mb-4 text-indigo-600">Expert Guidance</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Connect with certified trainers for personalized workout plans.
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <h3 className="text-xl font-bold mb-4 text-indigo-600">Community</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Join a supportive community of fitness enthusiasts.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
