import { useState } from 'react'
import { FileText, Upload, Trash2, Download, Search } from 'lucide-react'
import { Document } from '../../types'

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Lease Agreement',
    url: '#',
    userId: '1',
    createdAt: new Date('2024-01-01'),
    type: 'contract'
  },
  {
    id: '2',
    title: 'Monthly Invoice - December',
    url: '#',
    userId: '1',
    createdAt: new Date('2024-01-01'),
    type: 'invoice'
  },
  {
    id: '3',
    title: 'Maintenance Report',
    url: '#',
    userId: '1',
    createdAt: new Date('2024-01-01'),
    type: 'other'
  }
]

export default function DocumentManager() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<Document['type'] | 'all'>('all')

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || doc.type === selectedType
    return matchesSearch && matchesType
  })

  const handleUpload = () => {
    // TODO: Implement file upload
    console.log('Upload document')
  }

  const handleDownload = (doc: Document) => {
    // TODO: Implement file download
    console.log('Download document:', doc.title)
  }

  const handleDelete = (doc: Document) => {
    // TODO: Implement file deletion
    console.log('Delete document:', doc.title)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <button
          onClick={handleUpload}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Upload size={20} className="mr-2" />
          Upload
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as Document['type'] | 'all')}
          className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Types</option>
          <option value="contract">Contracts</option>
          <option value="invoice">Invoices</option>
          <option value="receipt">Receipts</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
          >
            <div className="flex items-center">
              <FileText className="mr-3 text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {doc.createdAt.toLocaleDateString()} • {doc.type}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload(doc)}
                className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => handleDelete(doc)}
                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
