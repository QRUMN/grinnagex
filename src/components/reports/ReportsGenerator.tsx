import { useState } from 'react'
import { FileText, Download, Calendar, Filter, Printer } from 'lucide-react'

interface ReportConfig {
  type: 'financial' | 'occupancy' | 'maintenance' | 'tenant'
  dateRange: 'week' | 'month' | 'quarter' | 'year' | 'custom'
  startDate?: Date
  endDate?: Date
  format: 'pdf' | 'excel' | 'csv'
  filters: {
    properties: string[]
    categories: string[]
    status: string[]
  }
}

interface ReportTemplate {
  id: string
  name: string
  type: ReportConfig['type']
  description: string
}

const reportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Financial Summary',
    type: 'financial',
    description: 'Overview of revenue, expenses, and profit margins'
  },
  {
    id: '2',
    name: 'Occupancy Report',
    type: 'occupancy',
    description: 'Property occupancy rates and vacancy analysis'
  },
  {
    id: '3',
    name: 'Maintenance Log',
    type: 'maintenance',
    description: 'Summary of maintenance requests and resolutions'
  },
  {
    id: '4',
    name: 'Tenant Directory',
    type: 'tenant',
    description: 'Complete list of current tenants and their details'
  }
]

export default function ReportsGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    type: 'financial',
    dateRange: 'month',
    format: 'pdf',
    filters: {
      properties: [],
      categories: [],
      status: []
    }
  })
  const [showConfig, setShowConfig] = useState(false)

  const handleGenerateReport = () => {
    // In a real implementation, this would:
    // 1. Validate the configuration
    // 2. Make API call to generate report
    // 3. Handle download or display
    console.log('Generating report with config:', reportConfig)
  }

  const handleSaveTemplate = () => {
    // In a real implementation, this would save the current configuration as a new template
    console.log('Saving template:', reportConfig)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reports Generator</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSaveTemplate}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Save as Template
          </button>
          <button
            onClick={handleGenerateReport}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FileText size={20} className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {reportTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => {
              setSelectedTemplate(template)
              setReportConfig({ ...reportConfig, type: template.type })
              setShowConfig(true)
            }}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <h3 className="font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {template.description}
            </p>
          </div>
        ))}
      </div>

      {/* Report Configuration */}
      {showConfig && (
        <div className="border rounded-lg p-4 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Report Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <select
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig({
                  ...reportConfig,
                  dateRange: e.target.value as ReportConfig['dateRange']
                })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {reportConfig.dateRange === 'custom' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    onChange={(e) => setReportConfig({
                      ...reportConfig,
                      startDate: new Date(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    onChange={(e) => setReportConfig({
                      ...reportConfig,
                      endDate: new Date(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </>
            )}

            {/* Format */}
            <div>
              <label className="block text-sm font-medium mb-1">Format</label>
              <select
                value={reportConfig.format}
                onChange={(e) => setReportConfig({
                  ...reportConfig,
                  format: e.target.value as ReportConfig['format']
                })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Properties</label>
                <select
                  multiple
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(option => option.value)
                    setReportConfig({
                      ...reportConfig,
                      filters: {
                        ...reportConfig.filters,
                        properties: selected
                      }
                    })
                  }}
                >
                  <option value="property1">Sunset Apartments</option>
                  <option value="property2">Downtown Office</option>
                  <option value="property3">Riverside Complex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categories</label>
                <select
                  multiple
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(option => option.value)
                    setReportConfig({
                      ...reportConfig,
                      filters: {
                        ...reportConfig.filters,
                        categories: selected
                      }
                    })
                  }}
                >
                  <option value="revenue">Revenue</option>
                  <option value="expenses">Expenses</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  multiple
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(option => option.value)
                    setReportConfig({
                      ...reportConfig,
                      filters: {
                        ...reportConfig.filters,
                        status: selected
                      }
                    })
                  }}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 mt-6">
            <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download size={20} className="mr-2" />
              Download Template
            </button>
            <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <Calendar size={20} className="mr-2" />
              Schedule Report
            </button>
            <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <Printer size={20} className="mr-2" />
              Print Preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
