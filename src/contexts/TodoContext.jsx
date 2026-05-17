import React, { createContext, useState, useEffect } from 'react'
import { todoAPI, aiAPI } from '../api/mockApi'

// Context to share todo state and AI suggestions across the app
export const TodoContext = createContext()

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [suggestions, setSuggestions] = useState([])

  // Load todos when component mounts
  useEffect(() => {
    const loadTodos = async () => {
      const data = await todoAPI.getTodos()
      setTodos(data)
      setLoading(false)
    }
    
    loadTodos()
  }, [])

  // Generate AI suggestions whenever todos change
  useEffect(() => {
    const generateSuggestions = async () => {
      const suggestions = await aiAPI.getSuggestions(todos)
      setSuggestions(suggestions)
    }
    
    generateSuggestions()
  }, [todos])

  const addTodo = async (title) => {
    try {
      const newTodo = await todoAPI.addTodo(title)
      setTodos([...todos, newTodo])
      return newTodo
    } catch (err) {
      console.error('Failed to add todo:', err)
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      const updated = await todoAPI.updateTodo(id, updates)
      setTodos(todos.map(t => t.id === id ? updated : t))
      return updated
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id)
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    await updateTodo(id, { completed: !todo.completed })
  }

  const changePriority = async (id, priority) => {
    await updateTodo(id, { priority })
  }

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      suggestions,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      changePriority
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = React.useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider')
  }
  return context
}
