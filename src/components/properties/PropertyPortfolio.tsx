import { useState } from 'react'
import { Building, DollarSign, MapPin, Home, Plus, Edit2, Trash2 } from 'lucide-react'
import { Property } from '../../types'

const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Luxury Apartment',
    title: 'Modern Luxury Apartment in Downtown',
    description: 'Beautiful modern apartment with all amenities',
    address: '123 Main St, City',
    type: 'apartment',
    status: 'available',
    rent: 2500,
    price: 450000,
    size: 1200,
    amenities: ['parking', 'pool', 'gym'],
    images: []
  },
  {
    id: '2',
    name: 'Cozy House',
    title: 'Cozy Family House with Garden',
    description: 'Perfect family home with a beautiful garden',
    address: '456 Oak Ave, Suburb',
    type: 'house',
    status: 'available',
    rent: 3000,
    price: 550000,
    size: 2000,
    amenities: ['garage', 'garden', 'fireplace'],
    images: []
  }
]

export default function PropertyPortfolio() {
  const [properties, setProperties] = useState(mockProperties)
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [filter, setFilter] = useState<'all' | Property['type']>('all')

  const filteredProperties = properties.filter(
    property => filter === 'all' || property.type === filter
  )

  const handleAddProperty = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: String(Date.now())
    }
    setProperties([...properties, newProperty])
    setShowAddProperty(false)
  }

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'occupied':
        return 'bg-blue-100 text-blue-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const PropertyForm = ({ onSubmit, initialData }: { 
    onSubmit: (data: Omit<Property, 'id'>) => void
    initialData?: Property 
  }) => {
    const [formData, setFormData] = useState<Omit<Property, 'id'>>(
      initialData || {
        name: '',
        title: '',
        description: '',
        address: '',
        type: 'residential',
        status: 'available',
        rent: 0,
        price: 0,
        size: 0,
        amenities: [],
        images: []
      }
    )

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Property['type'] })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Property['status'] })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Rent</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: parseFloat(e.target.value) })}
                className="w-full pl-8 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full pl-8 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Size (sq ft)</label>
            <input
              type="number"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amenities</label>
          <input
            type="text"
            value={formData.amenities.join(', ')}
            onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split(',').map(s => s.trim()) })}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Parking, Pool, Gym..."
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowAddProperty(false)}
            className="px-4 py-2 border rounded-md dark:border-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {initialData ? 'Update' : 'Add'} Property
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Property Portfolio</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | Property['type'])}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Properties</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
          <button
            onClick={() => setShowAddProperty(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={20} className="mr-2" />
            Add Property
          </button>
        </div>
      </div>

      {showAddProperty && (
        <div className="mb-6 p-4 border rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Add New Property</h3>
          <PropertyForm onSubmit={handleAddProperty} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg dark:border-gray-700 overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
              {/* TODO: Add image carousel */}
              <div className="flex items-center justify-center text-gray-400">
                <Building size={48} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {property.address}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Size</span>
                  <span className="font-medium">{property.size} sq ft</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Rent</span>
                  <span className="font-medium text-green-500">${property.rent}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Price</span>
                  <span className="font-medium text-green-500">${property.price}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Amenities</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {property.amenities.map((amenity: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="p-2 text-gray-500 hover:text-blue-500"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    setProperties(properties.filter(p => p.id !== property.id))
                  }}
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
