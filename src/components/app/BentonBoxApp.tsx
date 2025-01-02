import { useState } from 'react'
import {
  Home,
  Box,
  Settings,
  Bell,
  Thermometer,
  Lock,
  Unlock,
  Plus,
  MoreVertical,
  Search,
  ChevronRight
} from 'lucide-react'

interface StorageBox {
  id: string
  name: string
  temperature: number
  humidity: number
  locked: boolean
  items: string[]
  lastAccessed: Date
}

interface Notification {
  id: string
  title: string
  message: string
  time: Date
  read: boolean
}

export default function BentonBoxApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBox, setSelectedBox] = useState<StorageBox | null>(null)

  const [boxes] = useState<StorageBox[]>([
    {
      id: '1',
      name: 'Kitchen Storage',
      temperature: 68,
      humidity: 45,
      locked: true,
      items: ['Plates', 'Utensils', 'Cookware'],
      lastAccessed: new Date('2025-01-02T12:00:00')
    },
    {
      id: '2',
      name: 'Garage Box',
      temperature: 72,
      humidity: 50,
      locked: false,
      items: ['Tools', 'Sports Equipment', 'Camping Gear'],
      lastAccessed: new Date('2025-01-01T15:30:00')
    }
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Temperature Alert',
      message: 'Kitchen Storage temperature is above normal',
      time: new Date('2025-01-02T14:30:00'),
      read: false
    },
    {
      id: '2',
      title: 'Access Notification',
      message: 'Garage Box was accessed',
      time: new Date('2025-01-02T13:15:00'),
      read: true
    }
  ])

  const renderHome = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search boxes or items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h3 className="text-sm opacity-80">Total Boxes</h3>
          <p className="text-2xl font-bold">{boxes.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-sm opacity-80">Items Stored</h3>
          <p className="text-2xl font-bold">
            {boxes.reduce((acc, box) => acc + box.items.length, 0)}
          </p>
        </div>
      </div>

      {/* Boxes List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Boxes</h2>
        <div className="space-y-4">
          {boxes.map((box) => (
            <div
              key={box.id}
              onClick={() => setSelectedBox(box)}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{box.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {box.items.length} items
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {box.locked ? (
                    <Lock size={18} className="text-green-500" />
                  ) : (
                    <Unlock size={18} className="text-yellow-500" />
                  )}
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Thermometer size={16} className="mr-1" />
                  {box.temperature}°F
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {box.humidity}% Humidity
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Box Button */}
      <button className="fixed bottom-20 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg">
        <Plus size={24} />
      </button>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-white dark:bg-gray-800 p-4 rounded-lg ${
            !notification.read ? 'border-l-4 border-blue-500' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {notification.time.toLocaleTimeString()}
              </p>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              john.doe@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
          <span>Notifications</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
          <span>Security</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
          <span>Temperature Units</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
          <span>Help & Support</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
          <span className="text-red-500">Sign Out</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Benton Box</h1>
        <button>
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="flex justify-around p-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center ${
              activeTab === 'home'
                ? 'text-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center ${
              activeTab === 'notifications'
                ? 'text-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Bell size={24} />
            <span className="text-xs mt-1">Notifications</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center ${
              activeTab === 'settings'
                ? 'text-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>

      {/* Box Detail Modal */}
      {selectedBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{selectedBox.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Last accessed{' '}
                  {selectedBox.lastAccessed.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedBox(null)}
                className="text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <Thermometer size={20} className="text-blue-500" />
                  <span className="text-lg font-semibold">
                    {selectedBox.temperature}°F
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Temperature
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-blue-500">💧</div>
                  <span className="text-lg font-semibold">
                    {selectedBox.humidity}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Humidity
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              <div className="space-y-2">
                {selectedBox.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <span>{item}</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg">
                Add Item
              </button>
              <button
                className={`flex-1 ${
                  selectedBox.locked
                    ? 'bg-red-500'
                    : 'bg-green-500'
                } text-white py-3 rounded-lg`}
              >
                {selectedBox.locked ? 'Unlock Box' : 'Lock Box'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
