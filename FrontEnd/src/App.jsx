import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Category from './components/Category'
import Recipes from './components/Recipes'
import Procedure from './components/Procedure'
import Feedback from './components/Feedback'
import AddRecipe from './components/AddRecipe'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Favorites from './components/Favorites'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route path="/recipes/:ingredient" element={<Recipes />} />
        <Route path="/procedure/:name" element={<Procedure />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addrecipe"
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
