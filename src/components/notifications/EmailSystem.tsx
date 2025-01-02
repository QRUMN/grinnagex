import { useState } from 'react'
import {
  Mail,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Calendar,
  Users,
  ToggleLeft,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  type: 'payment' | 'maintenance' | 'lease' | 'announcement' | 'custom'
  variables: string[]
  active: boolean
}

interface EmailRule {
  id: string
  name: string
  event: string
  template: string
  conditions: {
    field: string
    operator: string
    value: string
  }[]
  recipients: {
    type: 'tenant' | 'staff' | 'owner'
    filter?: string
  }[]
  active: boolean
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Payment Reminder',
    subject: 'Rent Payment Reminder for {{property_name}}',
    body: 'Dear {{tenant_name}},\n\nThis is a reminder that your rent payment of {{amount}} for {{property_name}} is due on {{due_date}}.\n\nBest regards,\nProperty Management',
    type: 'payment',
    variables: ['tenant_name', 'amount', 'property_name', 'due_date'],
    active: true
  },
  {
    id: '2',
    name: 'Maintenance Scheduled',
    subject: 'Maintenance Visit Scheduled - {{property_name}}',
    body: 'Dear {{tenant_name}},\n\nA maintenance visit has been scheduled for {{date}} at {{time}}.\n\nIssue: {{issue_description}}\n\nBest regards,\nMaintenance Team',
    type: 'maintenance',
    variables: ['tenant_name', 'property_name', 'date', 'time', 'issue_description'],
    active: true
  }
]

const mockRules: EmailRule[] = [
  {
    id: '1',
    name: 'Payment Due Reminder',
    event: 'payment_due',
    template: '1',
    conditions: [
      {
        field: 'days_until_due',
        operator: '<=',
        value: '7'
      }
    ],
    recipients: [
      {
        type: 'tenant',
        filter: 'has_pending_payment'
      }
    ],
    active: true
  }
]

export default function EmailSystem() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [rules, setRules] = useState(mockRules)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [showRuleEditor, setShowRuleEditor] = useState(false)

  const handleToggleTemplate = (templateId: string) => {
    setTemplates(templates.map(template =>
      template.id === templateId
        ? { ...template, active: !template.active }
        : template
    ))
  }

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule =>
      rule.id === ruleId
        ? { ...rule, active: !rule.active }
        : rule
    ))
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(template => template.id !== templateId))
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Email Notification System</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTemplateEditor(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={20} className="mr-2" />
            New Template
          </button>
          <button
            onClick={() => setShowRuleEditor(true)}
            className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Plus size={20} className="mr-2" />
            New Rule
          </button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Email Templates</h3>
        <div className="grid gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.type === 'payment'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20'
                        : template.type === 'maintenance'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700'
                    }`}>
                      {template.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {template.subject}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleTemplate(template.id)}
                    className={`p-2 rounded-full ${
                      template.active
                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                        : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ToggleLeft size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template)
                      setShowTemplateEditor(true)
                    }}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Rules</h3>
        <div className="grid gap-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="border rounded-lg p-4 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{rule.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>Event: {rule.event}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <Users size={16} />
                    <span>Recipients: {rule.recipients.map(r => r.type).join(', ')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rule.conditions.map((condition, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                      >
                        {condition.field} {condition.operator} {condition.value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`p-2 rounded-full ${
                      rule.active
                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                        : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ToggleLeft size={20} />
                  </button>
                  <button
                    onClick={() => setShowRuleEditor(true)}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Editor Modal */}
      {showTemplateEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              {selectedTemplate ? 'Edit Template' : 'New Template'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  defaultValue={selectedTemplate?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option value="payment">Payment</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="lease">Lease</option>
                  <option value="announcement">Announcement</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  defaultValue={selectedTemplate?.subject}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Body</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={6}
                  defaultValue={selectedTemplate?.body}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Variables</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate?.variables.map((variable) => (
                    <span
                      key={variable}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTemplateEditor(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rule Editor Modal */}
      {showRuleEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">New Rule</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rule Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option value="payment_due">Payment Due</option>
                  <option value="maintenance_scheduled">Maintenance Scheduled</option>
                  <option value="lease_expiring">Lease Expiring</option>
                  <option value="inspection_scheduled">Inspection Scheduled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Template</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recipients</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Tenants
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Staff
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Property Owners
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Conditions</label>
                <div className="border rounded-md p-4 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-2">
                    <select className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                      <option value="days_until_due">Days Until Due</option>
                      <option value="payment_amount">Payment Amount</option>
                      <option value="property_type">Property Type</option>
                    </select>
                    <select className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                      <option value="equals">=</option>
                      <option value="less_than">&lt;</option>
                      <option value="greater_than">&gt;</option>
                    </select>
                    <input
                      type="text"
                      className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Value"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-blue-500 text-sm hover:underline"
                  >
                    + Add Condition
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRuleEditor(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
