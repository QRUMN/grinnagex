export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">About Grinnage Ex</h1>
        
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="mb-6">
            Grinnage Ex was founded with a simple mission: to make fitness tracking and personal training accessible to everyone. 
            We believe that everyone deserves access to professional guidance and tools that can help them achieve their fitness goals.
          </p>
          
          <h2 className="text-2xl font-bold text-indigo-600 mt-12 mb-6">Our Mission</h2>
          <p className="mb-6">
            To empower individuals on their fitness journey by providing them with the tools, knowledge, and support they need to succeed.
          </p>
          
          <h2 className="text-2xl font-bold text-indigo-600 mt-12 mb-6">Our Values</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <h3 className="font-bold">Accessibility</h3>
                <p>Making professional fitness guidance available to everyone, regardless of their experience level.</p>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <h3 className="font-bold">Community</h3>
                <p>Building a supportive environment where members can share experiences and motivate each other.</p>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <h3 className="font-bold">Innovation</h3>
                <p>Continuously improving our platform with the latest in fitness science and technology.</p>
              </div>
            </li>
          </ul>
          
          <h2 className="text-2xl font-bold text-indigo-600 mt-12 mb-6">Join Us Today</h2>
          <p className="mb-8">
            Whether you're just starting your fitness journey or looking to take your training to the next level, 
            Grinnage Ex is here to support you every step of the way.
          </p>
          
          <div className="text-center">
            <a
              href="/signup"
              className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
