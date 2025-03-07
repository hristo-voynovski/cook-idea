import React, { useEffect } from "react";
// import results from "../mockData.json";
import RecipeCard from "../components/RecipeCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes } from "../store/slices/searchSlice";

const RecipesHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.search);
  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get("q");
    if (urlQuery) {
      dispatch(fetchRecipes(urlQuery));
    }
  }, [dispatch]);

  return (
    <div className="min-h-full">
      <div className="flex flex-wrap justify-center gap-5 mt-5 p-4">
        {loading && <p className="text-center w-full">Loading recipes...</p>}
        {error && <p className="text-red-500 text-center w-full">{error}</p>}
        {results.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {!loading && !error && results.length === 0 && (
          <p className="text-gray-500 text-center w-full">
            No recipes found. Try searching for something!
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipesHome;
