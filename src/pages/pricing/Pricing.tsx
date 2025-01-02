export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h3 className="text-2xl font-bold mb-4">Basic</h3>
          <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg font-normal">/month</span></p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Workout tracking
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Basic analytics
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Community access
            </li>
          </ul>
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Get Started
          </button>
        </div>
        
        <div className="p-8 bg-indigo-600 rounded-lg shadow-lg text-white transform scale-105">
          <h3 className="text-2xl font-bold mb-4">Pro</h3>
          <p className="text-4xl font-bold mb-6">$19.99<span className="text-lg font-normal">/month</span></p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Everything in Basic
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Personalized plans
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Advanced analytics
            </li>
          </ul>
          <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-gray-100">
            Get Started
          </button>
        </div>
        
        <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h3 className="text-2xl font-bold mb-4">Elite</h3>
          <p className="text-4xl font-bold mb-6">$29.99<span className="text-lg font-normal">/month</span></p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Everything in Pro
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              1-on-1 coaching
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Priority support
            </li>
          </ul>
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
