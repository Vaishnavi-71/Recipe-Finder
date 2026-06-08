import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FAVORITES_API = 'http://localhost:5000/api/favorites'

function Favorites() {
  const navigate = useNavigate()
  const { authHeaders, updateUserFavorites } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [message, setMessage] = useState('')

  const loadFavorites = async () => {
    try {
      const response = await fetch(FAVORITES_API, {
        headers: authHeaders(),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not load favorites')
      }

      setFavorites(data)
      updateUserFavorites(data)
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  const removeFavorite = async (recipeId) => {
    try {
      const response = await fetch(`${FAVORITES_API}/${recipeId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not remove favorite')
      }

      const updatedFavorites = favorites.filter((recipe) => recipe._id !== recipeId)
      setFavorites(updatedFavorites)
      updateUserFavorites(data.favorites)
      setMessage('Removed from favorites')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="favorites-page">
      <h1>My Favorite Recipes</h1><br/>
      <p>These recipes are saved to your account and will be available whenever you log in.</p>

      {message && <div className="favorite-message">{message}</div>}

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No favorite recipes yet</h2>
          <button onClick={() => navigate('/category')}>Explore Categories</button>
        </div>
      ) : (
        <div className="favorite-grid">
          {favorites.map((recipe) => (
            <div className="favorite-card" key={recipe._id}>
              {recipe.dishImage && <img src={recipe.dishImage} alt={recipe.dish} />}
              <h2>{recipe.dish}</h2>
              <span>{recipe.category}</span>
              <div className="favorite-actions">
                <button onClick={() => navigate(`/procedure/${recipe.dish}`)}>View Recipe</button>
                <button className="remove-favorite" onClick={() => removeFavorite(recipe._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
