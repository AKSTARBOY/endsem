import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTodo } from '../contexts/TodoContext'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import AIAssistant from '../components/AIAssistant'

export default function TodoPage() {
  const { user, logout } = useAuth()
  const { todos } = useTodo()

  const handleLogout = async () => {
    await logout()
  }

  const completedCount = todos.filter(t => t.completed).length
  const progressPercent = todos.length === 0 ? 0 : (completedCount / todos.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">✨</span>
            <h1 className="text-2xl font-bold text-gray-800">AI Todo</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-blue-600">{todos.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-orange-600">
              {todos.length - completedCount}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700 font-medium">Progress</p>
              <p className="text-sm text-gray-600">{Math.round(progressPercent)}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* AI Assistant */}
        <AIAssistant />

        {/* Todo Form */}
        <TodoForm />

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow p-6">
          <TodoList />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Built with React + AI • Ready for Express backend integration</p>
        </div>
      </footer>
    </div>
  )
}
