export type UserRole = 'admin' | 'residential' | 'commercial'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Appointment {
  id: string
  title: string
  date: Date
  time: string
  location: string
  type: 'viewing' | 'maintenance' | 'meeting'
  userId: string
  status: 'scheduled' | 'completed' | 'cancelled'
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
  date: Date
  status: 'pending' | 'completed' | 'failed'
  type: 'rent' | 'maintenance' | 'deposit'
  userId: string
  method: 'credit_card' | 'bank_transfer'
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  date: Date
  description: string
  status: 'pending' | 'completed' | 'failed'
}

export interface Notification {
  id: string
  title: string
  message: string
  userId: string
  read: boolean
  createdAt: Date
  type: 'appointment' | 'payment' | 'document' | 'maintenance'
}

export interface Property {
  id: string
  name: string
  address: string
  type: 'residential' | 'commercial'
  status: 'available' | 'occupied' | 'maintenance'
  rent: number
  size: number
  amenities: string[]
  images: string[]
}
