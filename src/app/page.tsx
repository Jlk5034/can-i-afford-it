import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Can I Afford It? 🤔
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Get clear, judgment-free answers to your money questions in 2 minutes.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/onboarding"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Get Started - It's Free
            </Link>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span>✓</span>
                <span>Never sells your data</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>✓</span>
                <span>Works on any device</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>✓</span>
                <span>No signup required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}