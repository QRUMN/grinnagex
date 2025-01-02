import { useState } from 'react'
import { CreditCard, DollarSign, Clock, Download, Plus } from 'lucide-react'

interface Payment {
  id: string
  type: 'rent' | 'utilities' | 'deposit' | 'other'
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  date: Date
  method: string
  reference: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank'
  name: string
  last4: string
  isDefault: boolean
}

const mockPayments: Payment[] = [
  {
    id: '1',
    type: 'rent',
    amount: 1500,
    status: 'completed',
    date: new Date('2025-01-01'),
    method: 'Visa ending in 4242',
    reference: 'PAY-1234567'
  },
  {
    id: '2',
    type: 'utilities',
    amount: 150,
    status: 'pending',
    date: new Date('2025-01-05'),
    method: 'Bank Account ending in 9876',
    reference: 'PAY-7654321'
  }
]

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Visa',
    last4: '4242',
    isDefault: true
  },
  {
    id: '2',
    type: 'bank',
    name: 'Chase Bank',
    last4: '9876',
    isDefault: false
  }
]

export default function TenantPayments() {
  const [payments] = useState(mockPayments)
  const [paymentMethods] = useState(mockPaymentMethods)
  const [showNewPayment, setShowNewPayment] = useState(false)
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false)

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'processing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payments</h2>
        <button
          onClick={() => setShowNewPayment(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} className="mr-2" />
          Make Payment
        </button>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <button
            onClick={() => setShowAddPaymentMethod(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            + Add New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="border rounded-lg p-4 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {method.type === 'card' ? (
                    <CreditCard className="mr-3" size={24} />
                  ) : (
                    <DollarSign className="mr-3" size={24} />
                  )}
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">
                      ending in {method.last4}
                    </p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/20 rounded text-xs">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y dark:divide-gray-700">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4">
                    {payment.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 capitalize">{payment.type}</td>
                  <td className="px-6 py-4">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{payment.reference}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      title="Download Receipt"
                    >
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Payment Modal */}
      {showNewPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Make a Payment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Type
                </label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option value="rent">Rent</option>
                  <option value="utilities">Utilities</option>
                  <option value="deposit">Deposit</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Method
                </label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name} ending in {method.last4}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewPayment(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Payment Method</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="**** **** **** ****"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="***"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Set as default payment method
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentMethod(false)}
                  className="px-4 py-2 border rounded-md dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
