import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function AddRecipe() {
  const { token } = useAuth()

  const [category, setCategory] = useState('')
  const [dish, setDish] = useState('')
  const [dishImage, setDishImage] = useState('')
  const [procedure, setProcedure] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')
  const [dishError, setDishError] = useState('')

  const [ingredients, setIngredients] = useState([
    {
      ingredient: '',
      measure: '',
    },
  ])

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }

  const addIngredientField = () => {
    setIngredients([
      ...ingredients,
      {
        ingredient: '',
        measure: '',
      },
    ])
  }

  const addRecipe = async () => {
    setDishError('')

    try {
      const response = await fetch('http://localhost:5000/api/recipes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category,
          dish,
          dishImage,
          ingredients,
          procedure: procedure
            .split('\n')
            .filter((step) => step.trim() !== ''),
          youtubeLink,
          feedback: [],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setDishError(data.message || 'Dish already exists')
        return
      }

      alert(data.message)
    } catch (error) {
      console.log(error)
      setDishError('Something went wrong')
    }
  }

  return (
    <div className="add-recipe">
      <h1>Add Recipe</h1>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dish Name"
        value={dish}
        onChange={(e) => {
          setDish(e.target.value)
          setDishError('')
        }}
      />

      {dishError && <p className="dish-error">{dishError}</p>}

      <input
        type="text"
        placeholder="Dish Image URL"
        value={dishImage}
        onChange={(e) => setDishImage(e.target.value)}
      />

      <h3>Ingredients</h3>

      {ingredients.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Ingredient"
            value={item.ingredient}
            onChange={(e) =>
              handleIngredientChange(index, 'ingredient', e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Measure"
            value={item.measure}
            onChange={(e) =>
              handleIngredientChange(index, 'measure', e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addIngredientField}>Add Ingredient</button>

      <textarea
        rows="6"
        placeholder="Procedure"
        value={procedure}
        onChange={(e) => setProcedure(e.target.value)}
      ></textarea>

      <br />

      <input
        type="text"
        placeholder="YouTube Link (optional)"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
      />

      <br />

      <button onClick={addRecipe}>Add Recipe</button>
    </div>
  )
}

export default AddRecipe