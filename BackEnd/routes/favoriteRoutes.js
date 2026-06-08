const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoriteController')

const router = express.Router()

router.get('/', protect, getFavorites)
router.post('/:recipeId', protect, addFavorite)
router.delete('/:recipeId', protect, removeFavorite)

module.exports = router
