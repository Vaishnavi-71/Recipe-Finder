
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  return (
    <div className="home">

      {/* <h1>Flavor Fusion</h1>

      <p>
        Explore delicious recipes from different categories,
        discover ingredients, and learn complete cooking procedures
        in one beautiful interactive recipe application.
      </p> */}

      {/* <br/><br/><br/><br/>
      <button
        className="hero-btn"
        onClick={() => navigate('/category')}
      >
        Explore Recipes
      </button> */}

    </div>
  )
}

export default Home
