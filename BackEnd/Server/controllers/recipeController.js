const Recipe = require("../models/Recipe");

const getCategories = async (req, res) => {
  try {
    const categories = await Recipe.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesByCategory = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      category: req.params.category,
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeByDish = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      dish: req.params.dish,
    });

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getRecipesByCategory,
  getRecipeByDish,
};