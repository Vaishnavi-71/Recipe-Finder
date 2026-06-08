import { FaHeart, FaRegHeart } from "react-icons/fa";

function RecipeCard({ recipe, openRecipe, toggleFavorite, favorites }) {

    const isFavorite = favorites.some((item) => item._id === recipe._id);

    return (
        <div className="recipe-card">

            <img src={recipe.dishImage} alt={recipe.dish} />

            <div className="recipe-content">

                <h3>{recipe.dish}</h3>

                <p>{recipe.category}</p>

                <div className="card-buttons">

                    <button onClick={() => openRecipe(recipe)}>
                        View Recipe
                    </button>

                    <button
                        className="favorite-btn"
                        onClick={() => toggleFavorite(recipe)}
                    >
                        {
                            isFavorite ? <FaHeart /> : <FaRegHeart />
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default RecipeCard;
