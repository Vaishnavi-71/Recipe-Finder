function Favorites() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return (
        <div className="favorites-page">

            <h1>Favorite Recipes</h1>

            <div className="recipes-grid">

                {
                    favorites.map((recipe) => (

                        <div className="recipe-card" key={recipe._id}>

                            <img
                                src={recipe.dishImage}
                                alt={recipe.dish}
                            />

                            <div className="recipe-content">
                                <h3>{recipe.dish}</h3>
                                <p>{recipe.category}</p>
                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Favorites;
