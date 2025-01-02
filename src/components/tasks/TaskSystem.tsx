import { useState } from 'react'
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Calendar,
  User,
  Tag,
  Plus,
  Filter,
  Search,
  MoreVertical,
  ChevronDown,
  Flag
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high'
  dueDate: Date
  assignee?: string
  tags: string[]
  category: 'maintenance' | 'leasing' | 'financial' | 'administrative'
  createdAt: Date
  updatedAt: Date
  attachments?: {
    name: string
    url: string
  }[]
  subtasks: {
    id: string
    title: string
    completed: boolean
  }[]
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review lease renewal applications',
    description: 'Process and review pending lease renewal applications for Unit 101 and 102',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2025-01-05'),
    assignee: 'John Doe',
    tags: ['lease', 'urgent'],
    category: 'leasing',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02'),
    subtasks: [
      { id: '1-1', title: 'Review Unit 101 application', completed: false },
      { id: '1-2', title: 'Review Unit 102 application', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Schedule maintenance inspection',
    description: 'Coordinate with maintenance team for quarterly property inspection',
    status: 'in_progress',
    priority: 'medium',
    dueDate: new Date('2025-01-10'),
    assignee: 'Jane Smith',
    tags: ['maintenance', 'inspection'],
    category: 'maintenance',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-02'),
    subtasks: [
      { id: '2-1', title: 'Contact maintenance team', completed: true },
      { id: '2-2', title: 'Send notification to tenants', completed: false }
    ]
  }
]

export default function TaskSystem() {
  const [tasks, setTasks] = useState(mockTasks)
  const [showNewTask, setShowNewTask] = useState(false)
  const [filter, setFilter] = useState<Task['status']>('todo')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Task['category'] | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Task['priority'] | 'all'>('all')

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20'
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20'
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20'
      case 'in_progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
      case 'blocked':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20'
      case 'todo':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-700'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    return matchesSearch && matchesCategory && matchesPriority
  })

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus, updatedAt: new Date() }
        : task
    ))
  }

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map(subtask =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          }
        : task
    ))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <button
          onClick={() => setShowNewTask(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} className="mr-2" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as Task['category'] | 'all')}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Categories</option>
          <option value="maintenance">Maintenance</option>
          <option value="leasing">Leasing</option>
          <option value="financial">Financial</option>
          <option value="administrative">Administrative</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Task['priority'] | 'all')}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {task.description}
                </p>
                
                {/* Task Details */}
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Due: {task.dueDate.toLocaleDateString()}
                  </div>
                  {task.assignee && (
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {task.assignee}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Tag size={16} className="mr-1" />
                    {task.category}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Subtasks */}
                {task.subtasks.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {task.subtasks.map((subtask) => (
                      <label
                        key={subtask.id}
                        className="flex items-center text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => handleSubtaskToggle(task.id, subtask.id)}
                          className="mr-2"
                        />
                        <span className={subtask.completed ? 'line-through text-gray-400' : ''}>
                          {subtask.title}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Task Actions */}
              <div className="flex items-start gap-2">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                  className="px-2 py-1 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>
                <button className="p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Task Modal */}
      {showNewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">New Task</h3>
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
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option value="maintenance">Maintenance</option>
                    <option value="leasing">Leasing</option>
                    <option value="financial">Financial</option>
                    <option value="administrative">Administrative</option>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Assignee</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter assignee name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtasks</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter subtask"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTask(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
