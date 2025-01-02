import { useState } from 'react'
import { useAuth } from '../../../lib/auth/AuthContext'
import { Building, FileText, DollarSign, PieChart, Settings } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
]

const propertyData = [
  { name: 'Office A', occupancy: 95 },
  { name: 'Office B', occupancy: 87 },
  { name: 'Retail C', occupancy: 92 },
  { name: 'Warehouse D', occupancy: 78 },
]

export default function CommercialDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'analytics' | 'contracts'>('overview')

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Welcome, {user?.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Commercial Dashboard</p>
          </div>
          <nav className="mt-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <PieChart className="mr-2" size={20} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'properties' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Building className="mr-2" size={20} />
              Properties
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'analytics' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <DollarSign className="mr-2" size={20} />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'contracts' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <FileText className="mr-2" size={20} />
              Contracts
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-blue-500">$328,000</p>
                  <p className="text-sm text-green-500">+12.5% from last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Properties</h3>
                  <p className="text-3xl font-bold text-purple-500">12</p>
                  <p className="text-sm text-gray-500">4 Office, 5 Retail, 3 Warehouse</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Average Occupancy</h3>
                  <p className="text-3xl font-bold text-green-500">88%</p>
                  <p className="text-sm text-gray-500">+2% from last month</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Property Occupancy Rates</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={propertyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="occupancy" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyData.map((property) => (
                  <div key={property.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold mb-2">{property.name}</h4>
                    <p className="text-3xl font-bold text-blue-500">{property.occupancy}%</p>
                    <p className="text-sm text-gray-500">Occupancy Rate</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Financial Analytics</h2>
              {/* TODO: Add detailed analytics */}
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Contract Management</h2>
              {/* TODO: Add contract management interface */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
