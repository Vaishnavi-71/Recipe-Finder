function RecipeDetails({ recipe, closeRecipe }) {

    if (!recipe) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-content">

                <button className="close-btn" onClick={closeRecipe}>
                    X
                </button>

                <img src={recipe.dishImage} alt={recipe.dish} />

                <h2>{recipe.dish}</h2>

                <h3>Ingredients</h3>

                <ul>
                    {
                        recipe.ingredients.map((item, index) => (
                            <li key={index}>
                                {item.ingredient} - {item.measure}
                            </li>
                        ))
                    }
                </ul>

                <h3>Procedure</h3>

                <ol>
                    {
                        recipe.procedure.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))
                    }
                </ol>

                {
                    recipe.youtubeLink && (
                        <a
                            href={recipe.youtubeLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Watch Recipe Video
                        </a>
                    )
                }

            </div>

        </div>
    );
}

export default RecipeDetails;
