/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module 'react-dom/client' {
  import { Root } from 'react-dom/client';
  export function createRoot(container: Element | DocumentFragment): Root;
}

// Common types used across the application
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date | string;
}

export interface Property {
  id: string;
  name: string;
  title: string;
  description: string;
  address: string;
  amenities: string[];
  price: number;
  rent: number;
  size: number;
  status: string;
  type: string;
  images?: string[];
}

export interface Amenity {
  name: string;
  icon?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: Date | string;
  time: string;
  type: string;
  status: string;
  location: string;
  userId: string;
  propertyId?: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  url: string;
  uploadedAt: string;
  createdAt: Date | string;
  userId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date | string;
  userId: string;
}

export interface Payment {
  id: string;
  amount: number;
  type: string;
  method: string;
  status: string;
  date: Date | string;
  userId: string;
  propertyId?: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: Date | string;
  status: string;
  userId: string;
}
