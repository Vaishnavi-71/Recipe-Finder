function CategoryList({ categories, selectedCategory, setSelectedCategory }) {

    return (
        <div className="category-container">

            {
                categories.map((category) => (

                    <button
                        key={category}
                        className={selectedCategory === category ? "active-category" : ""}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))
            }

        </div>
    );
}

export default CategoryList;
