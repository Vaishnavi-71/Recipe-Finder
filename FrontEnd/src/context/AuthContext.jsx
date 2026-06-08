import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const API_URL = 'http://localhost:5000/api/auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const saveSession = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
  }

  const updateUserFavorites = (favorites) => {
    const favoriteIds = favorites.map((item) => item._id || item)

    setUser((currentUser) => {
      if (!currentUser) return currentUser

      const updatedUser = {
        ...currentUser,
        favorites: favoriteIds,
      }

      localStorage.setItem('user', JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  })

  const register = async (formData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    saveSession(data)
    return data
  }

  const login = async (formData) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    saveSession(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: Boolean(token),
        register,
        login,
        logout,
        authHeaders,
        updateUserFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
