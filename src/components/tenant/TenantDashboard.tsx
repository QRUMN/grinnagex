import { DollarSign, Calendar, Tool, Bell } from 'lucide-react'

interface DashboardStat {
  title: string
  value: string
  icon: React.ReactNode
  change?: string
  color: string
}

export default function TenantDashboard() {
  const stats: DashboardStat[] = [
    {
      title: 'Next Payment Due',
      value: '$1,500',
      icon: <DollarSign size={24} />,
      change: 'Due in 5 days',
      color: 'blue'
    },
    {
      title: 'Lease Expiry',
      value: '180 days',
      icon: <Calendar size={24} />,
      change: 'Expires on Jul 2, 2025',
      color: 'green'
    },
    {
      title: 'Open Requests',
      value: '2',
      icon: <Tool size={24} />,
      change: '1 in progress',
      color: 'yellow'
    },
    {
      title: 'Notifications',
      value: '3',
      icon: <Bell size={24} />,
      change: '2 new today',
      color: 'purple'
    }
  ]

  const recentActivity = [
    {
      id: '1',
      type: 'payment',
      title: 'Rent Payment Processed',
      date: '2025-01-01',
      amount: '$1,500'
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'Maintenance Request Updated',
      date: '2024-12-30',
      status: 'In Progress'
    }
  ]

  const announcements = [
    {
      id: '1',
      title: 'Building Maintenance Notice',
      date: '2025-01-02',
      content: 'Scheduled maintenance work in the lobby on January 5th.'
    },
    {
      id: '2',
      title: 'Holiday Office Hours',
      date: '2024-12-28',
      content: 'Modified office hours during the upcoming holiday season.'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                {stat.change && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.change}
                  </p>
                )}
              </div>
              <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0"
              >
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  {activity.amount && (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {activity.amount}
                    </span>
                  )}
                  {activity.status && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-xs">
                      {activity.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="py-3 border-b dark:border-gray-700 last:border-0"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
