import React from 'react'
import { useAuth } from './contexts/AuthContext'
import { TodoProvider } from './contexts/TodoContext'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">✨</div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  ) : (
    <LoginPage />
  )
}
