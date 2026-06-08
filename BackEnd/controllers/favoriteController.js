const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')
const User = require('../models/User')

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites')
      .select('-passwordHash -salt')

    res.json(user.favorites || [])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites: recipeId } },
      { new: true }
    ).select('-passwordHash -salt')

    res.json({
      message: 'Recipe added to favorites',
      favorites: user.favorites,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipe id' })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: recipeId } },
      { new: true }
    ).select('-passwordHash -salt')

    res.json({
      message: 'Recipe removed from favorites',
      favorites: user.favorites,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
}
