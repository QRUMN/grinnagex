import { useState } from 'react'
import { Wallet, CreditCard, Plus, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react'
import { Transaction } from '../../types'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 2000,
    date: new Date('2025-01-01'),
    description: 'Bank Transfer',
    status: 'completed'
  },
  {
    id: '2',
    type: 'withdrawal',
    amount: 850,
    date: new Date('2024-12-31'),
    description: 'Rent Payment',
    status: 'completed'
  }
]

export default function DigitalWallet() {
  const [balance, setBalance] = useState(2450)
  const [transactions, setTransactions] = useState(mockTransactions)
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [amount, setAmount] = useState('')

  const handleAddFunds = () => {
    if (!amount) return

    const newTransaction: Transaction = {
      id: String(Date.now()),
      type: 'deposit',
      amount: parseFloat(amount),
      date: new Date(),
      description: 'Added Funds',
      status: 'completed'
    }

    setTransactions([newTransaction, ...transactions])
    setBalance(balance + parseFloat(amount))
    setShowAddFunds(false)
    setAmount('')
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight size={20} className="text-green-500" />
      case 'withdrawal':
        return <ArrowUpRight size={20} className="text-red-500" />
      default:
        return <DollarSign size={20} className="text-gray-500" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Digital Wallet</h2>
        <button
          onClick={() => setShowAddFunds(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} className="mr-2" />
          Add Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Wallet size={24} />
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm opacity-80">Current Balance</p>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {showAddFunds && (
        <div className="mb-6 p-4 border rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Add Funds</h3>
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
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddFunds(false)}
                className="px-4 py-2 border rounded-md dark:border-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFunds}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                className={`font-medium ${
                  transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
