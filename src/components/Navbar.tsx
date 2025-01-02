import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Grinnage Ex
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link to="/features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              About
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Login
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/features"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              About
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-indigo-600 hover:bg-gray-50"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
