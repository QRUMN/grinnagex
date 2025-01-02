export type UserRole = 'residential' | 'commercial' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}

export interface Appointment {
  id: string
  title: string
  description: string
  date: Date
  userId: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface Document {
  id: string
  title: string
  url: string
  userId: string
  createdAt: Date
  type: 'contract' | 'invoice' | 'receipt' | 'other'
}

export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  userId: string
  date: Date
  type: 'rent' | 'maintenance' | 'other'
}

export interface Notification {
  id: string
  title: string
  message: string
  userId: string
  read: boolean
  createdAt: Date
  type: 'appointment' | 'payment' | 'document' | 'system'
}

export interface MaintenanceRequest {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  userId: string
  createdAt: Date
  priority: 'low' | 'medium' | 'high'
}

export interface Property {
  id: string
  name: string
  address: string
  type: 'residential' | 'commercial'
  ownerId: string
  status: 'available' | 'occupied' | 'maintenance'
}
