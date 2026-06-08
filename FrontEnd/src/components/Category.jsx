import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Category() {

  const navigate = useNavigate()
  const [categories, setCategories] = useState([])

  useEffect(() => {

    fetch('http://localhost:5000/api/recipes/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err))

  }, [])

  return (
    <div className="category-container">

      <h1>Recipe Categories</h1>

      <div className="category-grid">

        {categories.map((category, index) => (

          <button
            key={index}
            className="category-btn"
            onClick={() => navigate(`/recipes/${category}`)}
          >
            {category}
          </button>

        ))}

      </div>

    </div>
  )
}

export default Category
