const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    ingredient: String,
    measure: String
});

const recipeSchema = new mongoose.Schema({
    category: String,
    dish: String,
    dishImage: String,

    ingredients: [ingredientSchema],

    procedure: [String],

    youtubeLink: String,

    feedback: []
});

module.exports = mongoose.model("Recipe", recipeSchema);