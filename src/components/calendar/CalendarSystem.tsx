import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'maintenance' | 'payment' | 'inspection' | 'other'
  description?: string
  location?: string
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Rent Payment Due',
    start: new Date('2025-01-05'),
    end: new Date('2025-01-05'),
    type: 'payment',
    description: 'Monthly rent payment'
  },
  {
    id: '2',
    title: 'Maintenance Visit',
    start: new Date('2025-01-10T10:00:00'),
    end: new Date('2025-01-10T11:00:00'),
    type: 'maintenance',
    description: 'Regular HVAC maintenance',
    location: 'Unit 101'
  }
]

export default function CalendarSystem() {
  const [currentDate, setCurrentDate] = useState(new Date('2025-01-02'))
  const [events] = useState<CalendarEvent[]>(mockEvents)
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'payment':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inspection':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getDayEvents = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const renderCalendarDays = () => {
    const days = []
    const totalDays = firstDayOfMonth + daysInMonth

    for (let i = 0; i < totalDays; i++) {
      if (i < firstDayOfMonth) {
        days.push(<div key={`empty-${i}`} className="h-32" />)
      } else {
        const day = i - firstDayOfMonth + 1
        const dayEvents = getDayEvents(day)
        days.push(
          <div
            key={day}
            className="border dark:border-gray-700 p-2 h-32 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
                    ? 'h-6 w-6 bg-blue-500 text-white rounded-full flex items-center justify-center'
                    : ''
                }
              >
                {day}
              </span>
            </div>
            <div className="space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded truncate ${getEventColor(
                    event.type
                  )}`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )
      }
    }
    return days
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Calendar</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded ${
                view === 'month'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded ${
                view === 'week'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded ${
                view === 'day'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Day
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNewEvent(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={20} className="mr-2" />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-xl font-medium">
            {currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric'
            })}
          </h3>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-px border-b dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px">{renderCalendarDays()}</div>
      </div>

      {/* New Event Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option value="maintenance">Maintenance</option>
                  <option value="payment">Payment</option>
                  <option value="inspection">Inspection</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Event location"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewEvent(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
