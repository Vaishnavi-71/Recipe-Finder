import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FAVORITES_API = 'http://localhost:5000/api/favorites'

function Procedure() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn, user, authHeaders, updateUserFavorites } = useAuth()

  const [recipe, setRecipe] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/dish/${name}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.log(err))
  }, [name])

  if (!recipe) {
    return <h2>Loading...</h2>
  }

  const favoriteIds = user?.favorites?.map((item) => item._id || item) || []
  const alreadyFavorite = favoriteIds.includes(recipe._id)

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    try {
      const response = await fetch(`${FAVORITES_API}/${recipe._id}`, {
        method: alreadyFavorite ? 'DELETE' : 'POST',
        headers: authHeaders(),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Favorite update failed')
      }

      updateUserFavorites(data.favorites)
      setMessage(alreadyFavorite ? 'Removed from favorites' : 'Added to favorites')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="procedure">
      <h1>{recipe.dish}</h1>

      <button className={alreadyFavorite ? 'favorite-btn active' : 'favorite-btn'} onClick={toggleFavorite}>
        {alreadyFavorite ? '★ Favorited' : '☆ Add to Favorites'}
      </button>

      {message && <div className="favorite-message">{message}</div>}

      {recipe.dishImage && <img src={recipe.dishImage} alt={recipe.dish} width="300" />}

      <h2>Ingredients</h2>

      <ul>
        {recipe.ingredients?.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>

      <h2>Procedure</h2>

      {Array.isArray(recipe.procedure) ? (
        <ol>
          {recipe.procedure.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      ) : (
        <p>{recipe.procedure}</p>
      )}

      {recipe.youtubeLink && (
        <a href={recipe.youtubeLink} target="_blank" rel="noreferrer">
          <h2>Recipe Video</h2>
        </a>
      )}

      <h2>Feedback</h2>

      <ul>
        {recipe.feedback?.length > 0 ? (
          recipe.feedback.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <p>No feedback yet</p>
        )}
      </ul>
    </div>
  )
}

export default Procedure
