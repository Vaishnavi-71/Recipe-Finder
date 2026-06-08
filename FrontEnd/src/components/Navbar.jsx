import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h2>Recipe Finder</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {/* <Link to="/category">Category</Link> */}

        {isLoggedIn && (
          <>
            <Link to="/category">Category</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/addrecipe">Add Recipe</Link>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout {user?.name ? `(${user.name})` : ''}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
