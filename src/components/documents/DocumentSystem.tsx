import { useState } from 'react'
import {
  File,
  Folder,
  Upload,
  Download,
  Trash2,
  Edit,
  Share2,
  Search,
  Plus,
  Filter,
  MoreVertical
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: number
  modifiedDate: Date
  owner: string
  shared: boolean
  category?: string
  tags: string[]
  path: string[]
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Lease Agreements',
    type: 'folder',
    modifiedDate: new Date('2025-01-01'),
    owner: 'Admin',
    shared: true,
    tags: ['contracts', 'important'],
    path: ['Documents']
  },
  {
    id: '2',
    name: 'Maintenance Reports',
    type: 'folder',
    modifiedDate: new Date('2025-01-02'),
    owner: 'Admin',
    shared: false,
    tags: ['maintenance'],
    path: ['Documents']
  },
  {
    id: '3',
    name: 'Lease_Agreement_101.pdf',
    type: 'file',
    size: 1024576, // 1MB
    modifiedDate: new Date('2025-01-02'),
    owner: 'Admin',
    shared: true,
    category: 'contract',
    tags: ['lease', 'unit101'],
    path: ['Documents', 'Lease Agreements']
  }
]

export default function DocumentSystem() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all')
  const [currentPath, setCurrentPath] = useState<string[]>(['Documents'])
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const categories = ['all', 'contract', 'maintenance', 'financial', 'other']

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchesPath = JSON.stringify(doc.path) === JSON.stringify(currentPath)
      return matchesSearch && matchesCategory && matchesPath
    })
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1
      }
      
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'date':
          comparison = a.modifiedDate.getTime() - b.modifiedDate.getTime()
          break
        case 'size':
          comparison = (a.size || 0) - (b.size || 0)
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const handleFileUpload = () => {
    // In a real implementation, this would handle file upload
    console.log('Uploading file...')
  }

  const handleDownload = (docId: string) => {
    // In a real implementation, this would handle file download
    console.log('Downloading file:', docId)
  }

  const handleDelete = (docIds: string[]) => {
    setDocuments(documents.filter(doc => !docIds.includes(doc.id)))
    setSelectedDocs([])
  }

  const handleShare = (docId: string) => {
    // In a real implementation, this would open a sharing dialog
    console.log('Sharing document:', docId)
  }

  const navigateToFolder = (folder: Document) => {
    setCurrentPath(folder.path.concat(folder.name))
  }

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Document Management</h2>
        <div className="flex gap-2">
          <button
            onClick={handleFileUpload}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Upload size={20} className="mr-2" />
            Upload
          </button>
          <button
            onClick={() => {}}
            className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Plus size={20} className="mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="size">Size</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        {currentPath.map((path, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
              className="hover:text-blue-500"
            >
              {path}
            </button>
          </div>
        ))}
      </div>

      {/* Document List */}
      <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
        <div className="min-w-full divide-y dark:divide-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="col-span-6 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDocs([...selectedDocs, doc.id])
                      } else {
                        setSelectedDocs(selectedDocs.filter(id => id !== doc.id))
                      }
                    }}
                    className="mr-3"
                  />
                  {doc.type === 'folder' ? (
                    <Folder size={20} className="mr-2 text-yellow-500" />
                  ) : (
                    <File size={20} className="mr-2 text-blue-500" />
                  )}
                  <button
                    onClick={() => doc.type === 'folder' && navigateToFolder(doc)}
                    className="hover:text-blue-500"
                  >
                    {doc.name}
                  </button>
                </div>
                <div className="col-span-2 flex items-center">
                  {doc.modifiedDate.toLocaleDateString()}
                </div>
                <div className="col-span-1 flex items-center">
                  {formatFileSize(doc.size)}
                </div>
                <div className="col-span-2 flex items-center">
                  {doc.owner}
                  {doc.shared && (
                    <Share2 size={16} className="ml-2 text-gray-400" />
                  )}
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  {doc.type === 'file' && (
                    <>
                      <button
                        onClick={() => handleDownload(doc.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => handleShare(doc.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <Share2 size={16} />
                      </button>
                    </>
                  )}
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedDocs.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm">{selectedDocs.length} selected</span>
          <button
            onClick={() => handleDelete(selectedDocs)}
            className="flex items-center px-3 py-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </button>
          <button
            onClick={() => {}}
            className="flex items-center px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
          >
            <Share2 size={16} className="mr-1" />
            Share
          </button>
          <button
            onClick={() => {}}
            className="flex items-center px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
          >
            <Download size={16} className="mr-1" />
            Download
          </button>
        </div>
      )}
    </div>
  )
}
