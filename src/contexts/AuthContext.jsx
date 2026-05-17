import React, { createContext, useState, useEffect } from 'react'
import { authAPI } from '../api/mockApi'

// Context to share auth state across the app
export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await authAPI.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const result = await authAPI.login(email, password)
      if (result.success) {
        setUser(result.user)
        return { success: true }
      }
      setError(result.error)
      return { success: false, error: result.error }
    } catch (err) {
      setError('Login failed')
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (email, password) => {
    setError(null)
    try {
      const result = await authAPI.register(email, password)
      if (result.success) {
        setUser(result.user)
        return { success: true }
      }
      setError(result.error)
      return { success: false, error: result.error }
    } catch (err) {
      setError('Registration failed')
      return { success: false, error: 'Registration failed' }
    }
  }

  const logout = async () => {
    setError(null)
    try {
      await authAPI.logout()
      setUser(null)
      return { success: true }
    } catch (err) {
      setError('Logout failed')
      return { success: false, error: 'Logout failed' }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
