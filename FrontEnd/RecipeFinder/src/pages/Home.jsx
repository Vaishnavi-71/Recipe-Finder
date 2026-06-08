import { useEffect, useState } from "react";
import API from "../services/api";

import CategoryList from "../components/CategoryList";
import RecipeCard from "../components/RecipeCard";
import RecipeDetails from "../components/RecipeDetails";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

function Home() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [search, setSearch] = useState("");

    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );


    useEffect(() => {

        fetchCategories();

    }, []);


    useEffect(() => {

        if (selectedCategory) {
            fetchRecipes(selectedCategory);
        }

    }, [selectedCategory]);


    const fetchCategories = async () => {

        try {

            const response = await API.get("/categories");

            setCategories(response.data);

        } catch (error) {
            console.log(error);
        }
    };


    const fetchRecipes = async (category) => {

        try {

            setLoading(true);

            const response = await API.get(`/category/${category}`);

            setRecipes(response.data);

            setLoading(false);

        } catch (error) {

            console.log(error);
            setLoading(false);
        }
    };


    const openRecipe = async (recipe) => {

        try {

            const response = await API.get(`/dish/${recipe.dish}`);

            setSelectedRecipe(response.data);

        } catch (error) {
            console.log(error);
        }
    };


    const closeRecipe = () => {
        setSelectedRecipe(null);
    };


    const toggleFavorite = (recipe) => {

        let updatedFavorites;

        const exists = favorites.some((item) => item._id === recipe._id);

        if (exists) {

            updatedFavorites = favorites.filter(
                (item) => item._id !== recipe._id
            );

        } else {

            updatedFavorites = [...favorites, recipe];
        }

        setFavorites(updatedFavorites);

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    };


    const filteredRecipes = recipes.filter((recipe) =>
        recipe.dish.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="home-container">

            <SearchBar search={search} setSearch={setSearch} />

            <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />


            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="recipes-grid">

                        {
                            filteredRecipes.map((recipe) => (

                                <RecipeCard
                                    key={recipe._id}
                                    recipe={recipe}
                                    openRecipe={openRecipe}
                                    toggleFavorite={toggleFavorite}
                                    favorites={favorites}
                                />
                            ))
                        }

                    </div>
                )
            }

            <RecipeDetails
                recipe={selectedRecipe}
                closeRecipe={closeRecipe}
            />

        </div>
    );
}

export default Home;
