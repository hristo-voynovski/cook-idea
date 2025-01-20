import React, { useState } from "react";
import axios from "axios";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const RecipeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");

  const key: string = process.env.REACT_APP_SPOONACULAR_API_KEY || "";
  console.log(`The API key is ${key}`);

  const fetchRecipes = async () => {
    if (!query) {
      setError("Please enter a search term");
      return;
    }

      try {
        const response = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch",
          {
            params: {
              query,
            number: 5,
              apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
            },
          }
        );

        setRecipes(response.data.results);
        setError("");
      } catch (err) {
        setError("Something went wrong");
      }
  };

  return (
    <div>
      <div className="flex justify-center items-center bg-green-500 rounded-b-lg">
        <div>
          <h1 className="text-center mb-5">Recipe Search</h1>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes..."
              className="p-2 mr-2 w-72 border border-gray-300 rounded-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchRecipes();
                }
              }}
            />
            <button
              onClick={fetchRecipes}
              className="p-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-5">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border border-white p-2 w-52 bg-zinc-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-36 object-cover"
            />
            <h3 className="text-lg mt-2 text-center">{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
