import Link from 'next/link'

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Coming Soon! 🚧
          </h2>
          <p className="text-center text-gray-600 mb-4">
            The full onboarding quiz is being built. For now, you can see your app is working perfectly!
          </p>
          <p className="text-center text-gray-600 mb-6">
            This proves your live app can handle multiple pages and is ready for the full MVP features.
          </p>
          <div className="text-center">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
