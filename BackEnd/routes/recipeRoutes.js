const express = require("express");

const router = express.Router();

const Recipe = require('../models/Recipe')
const { protect } = require('../middleware/authMiddleware')

const {
  getCategories,
  getRecipesByCategory,
  getRecipeByDish,
} = require("../controllers/recipeController");

router.get("/categories", getCategories);

router.get("/category/:category", getRecipesByCategory);

router.get("/dish/:dish", getRecipeByDish);

router.put('/feedback', protect, async (req, res) => {
  try {
    const { dish, feedback } = req.body
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { dish: dish },
      {
        $push: {
          feedback: feedback
        }
      },
      { new: true }
    )
    if(!updatedRecipe){

      return res.status(404).json({
        message: 'Dish not found'
      })

    }
    res.json({
      message: 'Feedback added successfully',
      updatedRecipe
    })
  }
  catch(error){
    res.status(500).json({
      message: error.message
    })
  }
})

router.post('/add', protect, async (req, res) => {
  try {
    const existingRecipe = await Recipe.findOne({
      dish: req.body.dish.trim()
    })

    if (existingRecipe) {
      return res.status(400).json({
        message: 'Dish already exists'
      })
    }

    const recipe = new Recipe({
      ...req.body,
      dish: req.body.dish.trim()
    })

    await recipe.save()

    res.json({
      message: 'Recipe added successfully'
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })
  }
})

module.exports = router;