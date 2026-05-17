import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = isSignUp
        ? await register(email, password)
        : await login(email, password)

      if (!result.success) {
        setError(result.error || 'Authentication failed')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">✨</div>
          <h1 className="text-3xl font-bold text-gray-800">AI Todo</h1>
          <p className="text-gray-600 mt-2">Smart tasks, powered by AI</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min 4 characters"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="text-blue-600 font-medium ml-2 hover:underline"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Test Credentials */}
        <div className="mt-6 bg-blue-50 p-3 rounded text-sm text-gray-600">
          <p className="font-medium mb-1">📝 Test Credentials:</p>
          <p>Email: test@email.com</p>
          <p>Password: test1234</p>
        </div>
      </div>
    </div>
  )
}
