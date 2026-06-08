const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Recipes")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// Routes
app.use("/api/recipes", recipeRoutes);


app.get("/", (req, res) => {
    res.send("Recipe API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});