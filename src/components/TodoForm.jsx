import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { addTodo } = useTodo()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a task')
      return
    }

    setLoading(true)
    try {
      await addTodo(title.trim())
      setTitle('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task... (e.g., Buy groceries, Finish project)"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? '⏳' : '➕ Add'}
      </button>
    </form>
  )
}
