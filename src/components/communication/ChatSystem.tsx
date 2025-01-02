import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Image, Search, MoreVertical, Phone, Video } from 'lucide-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file'
  status: 'sent' | 'delivered' | 'read'
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

interface Contact {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: Date
  unreadCount: number
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Tenant',
    status: 'online',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Property Manager',
    status: 'away',
    lastSeen: new Date(),
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Maintenance Team',
    status: 'online',
    unreadCount: 1
  }
]

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      sender: 'John Tenant',
      content: 'Hi, I have a question about my lease renewal',
      timestamp: new Date('2025-01-02T16:30:00'),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      sender: 'me',
      content: 'Sure, how can I help you?',
      timestamp: new Date('2025-01-02T16:31:00'),
      type: 'text',
      status: 'delivered'
    }
  ]
}

export default function ChatSystem() {
  const [contacts, setContacts] = useState(mockContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedContact) {
      setMessages(mockMessages[selectedContact.id] || [])
    }
  }, [selectedContact])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'me',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'me',
        content: 'Sent a file',
        timestamp: new Date(),
        type: 'file',
        status: 'sent',
        attachments: [{
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }]
      }
      setMessages([...messages, message])
    }
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[800px] flex">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedContact?.id === contact.id ? 'bg-gray-50 dark:bg-gray-700' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <span className="text-xl">{contact.name[0]}</span>
                  )}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                    contact.status === 'online'
                      ? 'bg-green-500'
                      : contact.status === 'away'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{contact.name}</span>
                  {contact.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {contact.status === 'online'
                    ? 'Online'
                    : contact.lastSeen
                    ? `Last seen ${contact.lastSeen.toLocaleTimeString()}`
                    : 'Offline'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                {selectedContact.avatar ? (
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span>{selectedContact.name[0]}</span>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{selectedContact.name}</h3>
                <span className="text-sm text-gray-500">
                  {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Phone size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Video size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'me'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {message.type === 'text' && <p>{message.content}</p>}
                  {message.type === 'file' && message.attachments && (
                    <div className="flex items-center gap-2">
                      <Paperclip size={16} />
                      <a
                        href={message.attachments[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {message.attachments[0].name}
                      </a>
                    </div>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'me'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={handleFileUpload}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Paperclip size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Image size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a contact to start chatting
        </div>
      )}
    </div>
  )
}
