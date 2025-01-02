import { useState } from 'react'
import { CreditCard, DollarSign, Calendar, ChevronDown, Check } from 'lucide-react'
import { Payment } from '../../types'

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 1500,
    date: new Date('2025-01-01'),
    status: 'completed',
    type: 'rent',
    userId: '1',
    method: 'credit_card'
  },
  {
    id: '2',
    amount: 100,
    date: new Date('2024-12-15'),
    status: 'completed',
    type: 'maintenance',
    userId: '1',
    method: 'bank_transfer'
  }
]

const paymentMethods = [
  {
    id: '1',
    type: 'credit_card',
    last4: '4242',
    expiry: '12/25',
    brand: 'Visa'
  },
  {
    id: '2',
    type: 'bank_account',
    last4: '1234',
    bankName: 'Chase',
    accountType: 'Checking'
  }
]

export default function PaymentProcessor() {
  const [payments, setPayments] = useState(mockPayments)
  const [showNewPayment, setShowNewPayment] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0])
  const [amount, setAmount] = useState('')

  const handlePayment = () => {
    if (!amount) return

    const newPayment: Payment = {
      id: String(Date.now()),
      amount: parseFloat(amount),
      date: new Date(),
      status: 'completed',
      type: 'rent',
      userId: '1',
      method: selectedMethod.type as 'credit_card' | 'bank_transfer'
    }

    setPayments([newPayment, ...payments])
    setShowNewPayment(false)
    setAmount('')
  }

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
        <button
          onClick={() => setShowNewPayment(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <DollarSign size={20} className="mr-2" />
          Make Payment
        </button>
      </div>

      {showNewPayment && (
        <div className="mb-6 p-4 border rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">New Payment</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <div className="relative">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={`flex items-center justify-between p-3 border rounded-md mb-2 cursor-pointer ${
                      selectedMethod.id === method.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <CreditCard size={20} className="mr-3 text-blue-500" />
                      <div>
                        <p className="font-medium">
                          {method.type === 'credit_card'
                            ? `${method.brand} •••• ${method.last4}`
                            : `${method.bankName} •••• ${method.last4}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.type === 'credit_card'
                            ? `Expires ${method.expiry}`
                            : `${method.accountType}`}
                        </p>
                      </div>
                    </div>
                    {selectedMethod.id === method.id && (
                      <Check size={20} className="text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewPayment(false)}
                className="px-4 py-2 border rounded-md dark:border-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <DollarSign size={24} className="text-green-500" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium">${payment.amount.toFixed(2)}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  {payment.date.toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <CreditCard size={16} className="mr-1" />
                  {payment.method}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
