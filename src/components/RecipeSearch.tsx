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

  const key:string = process.env.REACT_APP_SPOONACULAR_API_KEY || "";
  console.log(
    `The API key is ${key}`
  );

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
    <div style={{ padding: "20px" }}>
      <h1>Recipe Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
        style={{
          padding: "10px",
          marginRight: "10px",
          width: "300px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={fetchRecipes} style={{ padding: "10px 20px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
              {recipe.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
