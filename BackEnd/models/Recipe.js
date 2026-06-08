const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({

  ingredient: String,
  measure: String,

})

const recipeSchema = new mongoose.Schema({

  category: String,

  dish: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  dishImage: String,

  ingredients: [ingredientSchema],

  procedure: [String],

  youtubeLink: {
    type: String,
    default: null
    },

  feedback: [
    {
      type: String
    }
  ]

})

module.exports = mongoose.model(
  'Recipe',
  recipeSchema
)