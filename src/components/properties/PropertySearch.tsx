import { useState } from 'react'
import { Search, Filter, MapPin, DollarSign, Home, ArrowUpDown } from 'lucide-react'
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

interface FilterOptions {
  type: 'all' | Property['type']
  status: 'all' | Property['status']
  minRent: number
  maxRent: number
  minSize: number
  maxSize: number
  amenities: string[]
}

export default function PropertySearch() {
  const [properties, setProperties] = useState(mockProperties)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'rent' | 'size'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    status: 'all',
    minRent: 0,
    maxRent: 10000,
    minSize: 0,
    maxSize: 5000,
    amenities: []
  })

  const allAmenities = Array.from(
    new Set(properties.flatMap(p => p.amenities))
  )

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = filters.type === 'all' || property.type === filters.type
      const matchesStatus = filters.status === 'all' || property.status === filters.status
      const matchesRent = property.rent >= filters.minRent && property.rent <= filters.maxRent
      const matchesSize = property.size >= filters.minSize && property.size <= filters.maxSize
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => property.amenities.includes(amenity))

      return matchesSearch && matchesType && matchesStatus && 
        matchesRent && matchesSize && matchesAmenities
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rent':
          comparison = a.rent - b.rent
          break
        case 'size':
          comparison = a.size - b.size
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Filter size={20} className="mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 border rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value as FilterOptions['type'] })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as FilterOptions['status'] })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rent Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={filters.minRent}
                  onChange={(e) => setFilters({ ...filters, minRent: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.maxRent}
                  onChange={(e) => setFilters({ ...filters, maxRent: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size Range (sq ft)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={filters.minSize}
                  onChange={(e) => setFilters({ ...filters, minSize: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.maxSize}
                  onChange={(e) => setFilters({ ...filters, maxSize: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium mb-1">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, amenities: [...filters.amenities, amenity] })
                        } else {
                          setFilters({
                            ...filters,
                            amenities: filters.amenities.filter(a => a !== amenity)
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-medium">Sort by:</span>
        <button
          onClick={() => toggleSort('name')}
          className={`flex items-center px-2 py-1 rounded ${
            sortBy === 'name' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' : ''
          }`}
        >
          Name
          {sortBy === 'name' && (
            <ArrowUpDown size={16} className="ml-1" />
          )}
        </button>
        <button
          onClick={() => toggleSort('rent')}
          className={`flex items-center px-2 py-1 rounded ${
            sortBy === 'rent' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' : ''
          }`}
        >
          Rent
          {sortBy === 'rent' && (
            <ArrowUpDown size={16} className="ml-1" />
          )}
        </button>
        <button
          onClick={() => toggleSort('size')}
          className={`flex items-center px-2 py-1 rounded ${
            sortBy === 'size' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' : ''
          }`}
        >
          Size
          {sortBy === 'size' && (
            <ArrowUpDown size={16} className="ml-1" />
          )}
        </button>
      </div>

      {/* Property List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
              <div className="flex items-center justify-center text-gray-400">
                <Home size={48} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-2">
                <MapPin size={16} className="mr-1" />
                {property.address}
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <DollarSign size={16} className="mr-1" />
                  {property.rent}/month
                </span>
                <span className="text-sm text-gray-500">{property.size} sq ft</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {property.amenities.map((amenity: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  property.status === 'available'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20'
                    : property.status === 'occupied'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20'
                }`}>
                  {property.status}
                </span>
                <span className="text-sm font-medium">{property.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
