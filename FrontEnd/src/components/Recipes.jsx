import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Recipes() {

  const { ingredient } = useParams()
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])

  useEffect(() => {

    fetch(`http://localhost:5000/api/recipes/category/${ingredient}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.log(err))

  }, [ingredient])

  return (
    <div className="recipes">

      <h1>{ingredient} Recipes</h1>

      <div className="recipe-list">

        {recipes.map((recipe, index) => (

          <button
            key={index}
            onClick={() => navigate(`/procedure/${recipe.dish}`)}
          >
            
            {recipe.dish}
          </button>

        ))}

      </div>

    </div>
  )
}

export default Recipes
