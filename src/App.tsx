import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold">
                  Grinnage Ex
                </Link>
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Admin Dashboard
                  </Link>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center">
                  Welcome to Grinnage Ex
                </h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
