const express = require("express");

const router = express.Router();

const {
  getCategories,
  getRecipesByCategory,
  getRecipeByDish,
} = require("../controllers/recipeController");

router.get("/categories", getCategories);

router.get("/category/:category", getRecipesByCategory);

router.get("/dish/:dish", getRecipeByDish);

module.exports = router;