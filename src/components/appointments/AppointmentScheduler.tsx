import { useState } from 'react'
import { Calendar, Clock, User, MapPin, Plus } from 'lucide-react'
import { Appointment } from '../../types'
import { formatDate } from '../../utils/dateUtils';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
]

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Property Viewing',
    date: new Date('2025-01-03'),
    time: '10:00',
    location: '123 Main St',
    type: 'viewing',
    userId: '1',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Maintenance Check',
    date: new Date('2025-01-04'),
    time: '14:30',
    location: '456 Oak Ave',
    type: 'maintenance',
    userId: '1',
    status: 'scheduled'
  }
]

export default function AppointmentScheduler() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: new Date(),
    time: '09:00',
    location: '',
    type: 'viewing' as Appointment['type']
  })

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleCreateAppointment = () => {
    const appointment: Appointment = {
      id: String(Date.now()),
      ...newAppointment,
      userId: '1',
      status: 'scheduled'
    }
    setAppointments([...appointments, appointment])
    setShowNewAppointmentForm(false)
    setNewAppointment({
      title: '',
      date: new Date(),
      time: '09:00',
      location: '',
      type: 'viewing'
    })
  }

  const getAppointmentTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'viewing':
        return 'bg-blue-100 text-blue-800'
      case 'maintenance':
        return 'bg-green-100 text-green-800'
      case 'meeting':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={() => setShowNewAppointmentForm(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} className="mr-2" />
          New Appointment
        </button>
      </div>

      {showNewAppointmentForm && (
        <div className="mb-6 p-4 border rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">New Appointment</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newAppointment.date.toISOString().split('T')[0]}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: new Date(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <select
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={newAppointment.location}
                onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={newAppointment.type}
                onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value as Appointment['type'] })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="viewing">Viewing</option>
                <option value="maintenance">Maintenance</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewAppointmentForm(false)}
                className="px-4 py-2 border rounded-md dark:border-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAppointment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Calendar size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">{appointment.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {formatDate(appointment.date)} at {appointment.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {appointment.location}
                  </div>
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getAppointmentTypeColor(appointment.type)}`}>
              {appointment.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
