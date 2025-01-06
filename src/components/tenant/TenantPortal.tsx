import { useState } from 'react'
import { Home, DollarSign, Wrench, FileText, Bell, Settings, LogOut } from 'lucide-react'
import TenantDashboard from './TenantDashboard'
import TenantPayments from './TenantPayments'
import TenantMaintenance from './TenantMaintenance'
import TenantDocuments from './TenantDocuments'
import TenantNotifications from './TenantNotifications'
import TenantSettings from './TenantSettings'

interface MenuItem {
  id: string
  name: string
  icon: React.ReactNode
  component: React.ReactNode
}

export default function TenantPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <Home size={20} />,
      component: <TenantDashboard />
    },
    {
      id: 'payments',
      name: 'Payments',
      icon: <DollarSign size={20} />,
      component: <TenantPayments />
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: <Wrench size={20} />,
      component: <TenantMaintenance />
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <FileText size={20} />,
      component: <TenantDocuments />
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell size={20} />,
      component: <TenantNotifications />
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings size={20} />,
      component: <TenantSettings />
    }
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold">Tenant Portal</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-4 border-t dark:border-gray-700">
            <button
              onClick={() => {/* Handle logout */}}
              className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            >
              <LogOut size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {menuItems.find(item => item.id === activeTab)?.component}
        </div>
      </div>
    </div>
  )
}
