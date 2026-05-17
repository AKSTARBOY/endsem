import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
}

const priorityBg = {
  high: 'bg-red-100',
  medium: 'bg-yellow-100',
  low: 'bg-green-100'
}

export default function TodoList() {
  const { todos, loading, deleteTodo, toggleTodo, changePriority } = useTodo()
  const [filter, setFilter] = useState('all')

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  if (loading) {
    return <div className="text-center text-gray-500 py-8">Loading tasks...</div>
  }

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="text-4xl mb-2">📭</div>
        <p>No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'pending' && ` (${todos.filter(t => !t.completed).length})`}
          </button>
        ))}
      </div>

      {/* Todo Items */}
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`p-4 rounded-lg border-2 transition ${
              todo.completed
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />

              {/* Title */}
              <div className="flex-1">
                <p
                  className={`text-lg ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </p>
              </div>

              {/* Priority */}
              <select
                value={todo.priority}
                onChange={(e) => changePriority(todo.id, e.target.value)}
                className={`px-3 py-1 rounded font-medium text-sm border-0 cursor-pointer ${priorityBg[todo.priority]} ${priorityColors[todo.priority]}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (confirm('Delete this task?')) {
                    deleteTodo(todo.id)
                  }
                }}
                className="text-red-500 hover:text-red-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Filter State */}
      {filteredTodos.length === 0 && todos.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          No {filter} tasks
        </div>
      )}
    </div>
  )
}
