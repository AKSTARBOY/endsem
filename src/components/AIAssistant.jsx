import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'
import { aiAPI } from '../api/mockApi'

export default function AIAssistant() {
  const { todos, suggestions } = useTodo()
  const [improvementTip, setImprovementTip] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGetTip = async () => {
    if (todos.length === 0) {
      alert('Add a task first!')
      return
    }

    setLoading(true)
    try {
      const randomTodo = todos[Math.floor(Math.random() * todos.length)]
      const tip = await aiAPI.improveTitle(randomTodo.title)
      setImprovementTip(tip)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🤖</span>
        <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
          <div className="space-y-1">
            {suggestions.map((suggestion, idx) => (
              <p key={idx} className="text-gray-700">
                {suggestion}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Tip */}
      {improvementTip && (
        <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-700 mb-1">Improvement Tip:</p>
          <p className="text-lg text-blue-600 font-medium">{improvementTip}</p>
        </div>
      )}

      {/* Get Tip Button */}
      <button
        onClick={handleGetTip}
        disabled={loading}
        className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? '⏳ Getting AI Suggestion...' : '💡 Get AI Suggestion'}
      </button>

      {/* Info */}
      <p className="text-xs text-gray-600 mt-3">
        AI tips help you write better, more specific tasks for improved productivity
      </p>
    </div>
  )
}
