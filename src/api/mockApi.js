// This file will be replaced with real API calls to Express backend
// Keep it simple so it's easy to swap out later

// Simulated delay (remove when using real API)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Auth API
export const authAPI = {
  login: async (email, password) => {
    await delay(500)
    
    // Mock validation
    if (email && password.length >= 4) {
      const token = btoa(email)
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify({ email, id: Date.now() }))
      return { success: true, token, user: { email, id: Date.now() } }
    }
    return { success: false, error: 'Invalid credentials' }
  },

  register: async (email, password) => {
    await delay(500)
    
    if (email && password.length >= 4) {
      const token = btoa(email)
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify({ email, id: Date.now() }))
      return { success: true, token, user: { email, id: Date.now() } }
    }
    return { success: false, error: 'Please use valid email and password (min 4 chars)' }
  },

  logout: async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('todos')
    return { success: true }
  },

  getCurrentUser: async () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

// Todo API
export const todoAPI = {
  getTodos: async () => {
    await delay(300)
    const todos = localStorage.getItem('todos')
    return todos ? JSON.parse(todos) : []
  },

  addTodo: async (title) => {
    const todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
    
    return todo
  },

  updateTodo: async (id, updates) => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    const todo = todos.find(t => t.id === id)
    
    if (todo) {
      Object.assign(todo, updates)
      localStorage.setItem('todos', JSON.stringify(todos))
      return todo
    }
    
    throw new Error('Todo not found')
  },

  deleteTodo: async (id) => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    const filtered = todos.filter(t => t.id !== id)
    localStorage.setItem('todos', JSON.stringify(filtered))
    return { success: true }
  }
}

// AI API
export const aiAPI = {
  getSuggestions: async (todos) => {
    await delay(800)
    
    // Smart suggestions based on todos
    const suggestions = []
    
    if (todos.length === 0) {
      suggestions.push('💡 Start by adding your first todo!')
    }
    
    const incompleteTodos = todos.filter(t => !t.completed)
    if (incompleteTodos.length > 5) {
      suggestions.push('📌 You have ' + incompleteTodos.length + ' tasks. Try breaking them into smaller ones!')
    }
    
    const highPriority = todos.filter(t => t.priority === 'high' && !t.completed)
    if (highPriority.length > 0) {
      suggestions.push('⚡ Focus on ' + highPriority.length + ' high-priority tasks first!')
    }
    
    const completed = todos.filter(t => t.completed).length
    if (completed > 0) {
      suggestions.push('🎉 Great! You completed ' + completed + ' tasks!')
    }
    
    return suggestions
  },

  improveTitle: async (title) => {
    await delay(600)
    
    // AI enhancement suggestions
    const improvements = {
      'buy groceries': '🛒 Buy groceries (milk, bread, eggs)',
      'finish project': '📱 Finish project - Add login page',
      'exercise': '💪 Exercise - 30 min cardio + stretching',
      'study': '📚 Study React hooks for 1 hour',
      'call mom': '☎️ Call mom - Catch up on weekend plans'
    }
    
    const lowerTitle = title.toLowerCase()
    for (const [key, value] of Object.entries(improvements)) {
      if (lowerTitle.includes(key)) {
        return value
      }
    }
    
    return title + ' ✓'
  }
}
