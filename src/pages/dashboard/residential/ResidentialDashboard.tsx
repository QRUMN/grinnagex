import { useState } from 'react'
import { useAuth } from '../../../lib/auth/AuthContext'
import { Wallet, Calendar, FileText, Bell, Settings } from 'lucide-react'

export default function ResidentialDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'documents' | 'payments'>('overview')

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Welcome, {user?.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Residential Dashboard</p>
          </div>
          <nav className="mt-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Wallet className="mr-2" size={20} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'appointments' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Calendar className="mr-2" size={20} />
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'documents' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <FileText className="mr-2" size={20} />
              Documents
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'payments' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Bell className="mr-2" size={20} />
              Payments
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Wallet Balance</h3>
                <p className="text-3xl font-bold text-blue-500">$2,450.00</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Next Payment</h3>
                <p className="text-3xl font-bold text-green-500">$850.00</p>
                <p className="text-sm text-gray-500">Due in 15 days</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Maintenance Requests</h3>
                <p className="text-3xl font-bold text-purple-500">2</p>
                <p className="text-sm text-gray-500">Active requests</p>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
              {/* TODO: Add appointment list/calendar */}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Documents</h2>
              {/* TODO: Add document list/upload */}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Payment History</h2>
              {/* TODO: Add payment history/make payment */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
