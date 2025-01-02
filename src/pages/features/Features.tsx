export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Workout Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Log your workouts, track your progress, and analyze your performance with detailed metrics and visualizations.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Personalized Plans</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get customized workout and nutrition plans based on your goals, fitness level, and preferences.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Expert Guidance</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with certified trainers for form checks, advice, and motivation to reach your goals.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Community Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join a community of like-minded individuals, share your progress, and get inspired by others.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Progress Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              View detailed analytics of your progress, including charts and trends over time.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Mobile Access</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access your workouts and track your progress on the go with our mobile-friendly platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
