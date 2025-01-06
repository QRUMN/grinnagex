import { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, Plus, Search, Wrench } from 'lucide-react';

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  property: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
  images?: string[]
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Leaking Faucet',
    description: 'Kitchen sink faucet is leaking and needs repair',
    property: 'Sunset Apartments - Unit 101',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    title: 'AC Not Working',
    description: 'Air conditioning unit is not cooling properly',
    property: 'Downtown Office - Suite 200',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02'),
    assignedTo: 'John Smith'
  }
]

const MaintenanceSystem = () => {
  const [requests, setRequests] = useState(mockRequests)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | MaintenanceRequest['priority']>('all')

  const filteredRequests = requests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const getPriorityColor = (priority: MaintenanceRequest['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20'
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20'
    }
  }

  const getStatusColor = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20'
      case 'in-progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
      case 'pending':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
    }
  }

  const getStatusIcon = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />
      case 'in-progress':
        return <Clock size={16} />
      case 'pending':
        return <AlertTriangle size={16} />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} className="mr-2" />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="border rounded-lg dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{request.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {request.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{request.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Wrench className="w-5 h-5" />
                    {request.property}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {request.createdAt.toLocaleDateString()}
                  </span>
                  {request.assignedTo && (
                    <span>Assigned to: {request.assignedTo}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newStatus = request.status === 'pending' ? 'in-progress' :
                      request.status === 'in-progress' ? 'completed' : 'completed'
                    setRequests(requests.map(r =>
                      r.id === request.id ? { ...r, status: newStatus } : r
                    ))
                  }}
                  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {request.status === 'pending' ? 'Start' :
                    request.status === 'in-progress' ? 'Complete' : 'Completed'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">New Maintenance Request</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Property</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>Select Property</option>
                  <option>Sunset Apartments - Unit 101</option>
                  <option>Downtown Office - Suite 200</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewRequest(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaintenanceSystem;
