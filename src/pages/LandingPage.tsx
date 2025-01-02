import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Benton Box</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
                Pre-order Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-600"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-600"
              >
                Pricing
              </a>
              <button className="w-full mt-4 bg-black text-white px-6 py-2 rounded-full">
                Pre-order Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              The Future of Smart Storage
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the next generation of storage with AI-powered organization,
              climate control, and seamless connectivity.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 flex items-center">
                Pre-order Now <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
          <div className="mt-16">
            <img
              src="/images/hero-box.png"
              alt="Benton Box"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Intelligent Features for Modern Living
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how Benton Box is revolutionizing storage with cutting-edge technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🧠
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
              <p className="text-gray-600">
                AI-powered organization that learns your preferences and adapts to your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🌡️
              </div>
              <h3 className="text-xl font-semibold mb-2">Climate Control</h3>
              <p className="text-gray-600">
                Perfect temperature and humidity maintenance for your valuable items.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-gray-600">
                Biometric locks and real-time monitoring keep your belongings safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, intuitive, and powerful. Get started with Benton Box in three easy steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">01</div>
              <h3 className="text-xl font-semibold mb-2">Set Up Your Box</h3>
              <p className="text-gray-600">
                Connect your Benton Box to WiFi and customize your preferences through our app.
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">02</div>
              <h3 className="text-xl font-semibold mb-2">Store Your Items</h3>
              <p className="text-gray-600">
                Place your items in the box and let our AI organize them efficiently.
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">03</div>
              <h3 className="text-xl font-semibold mb-2">Monitor & Control</h3>
              <p className="text-gray-600">
                Track conditions and access your items anytime through the mobile app.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect Benton Box for your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-gray-600 ml-2">/unit</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Smart organization
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Basic climate control
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Mobile app access
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  1-year warranty
                </li>
              </ul>
              <button className="w-full py-3 border border-black rounded-full hover:bg-gray-50">
                Pre-order Now
              </button>
            </div>
            <div className="border-2 border-black rounded-2xl p-8 transform scale-105">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-gray-600 ml-2">/unit</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Advanced AI organization
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Premium climate control
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Mobile app access
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Biometric security
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  2-year warranty
                </li>
              </ul>
              <button className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800">
                Pre-order Now
              </button>
            </div>
            <div className="border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">$899</span>
                <span className="text-gray-600 ml-2">/unit</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Custom AI solutions
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Advanced climate system
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Multi-user access
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Enterprise security
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Lifetime warranty
                </li>
              </ul>
              <button className="w-full py-3 border border-black rounded-full hover:bg-gray-50">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              2025 Benton Box. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
