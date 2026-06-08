import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Feedback() {

  const { token } = useAuth()

  const [dish, setDish] = useState('')
  const [feedback, setFeedback] = useState('')

  const submitFeedback = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/recipes/feedback',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dish,
            feedback,
          }),
        }
      )

      const data = await response.json()

      alert(data.message)

      setDish('')
      setFeedback('')

    }

    catch(error){
      console.log(error)
    }

  }

  return (

    <div className="feedback">

      <h1>Feedback</h1>

      <input
        type="text"
        placeholder="Enter Dish Name"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <textarea
        rows="8"
        placeholder="Enter feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>

      <br />

      <button onClick={submitFeedback}>
        Submit
      </button>

    </div>

  )
}

export default Feedback