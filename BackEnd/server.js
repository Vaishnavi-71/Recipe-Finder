require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/Recipes")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);


app.get("/", (req, res) => {
    res.send("Recipe API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});