import React, { useEffect, Suspense } from "react";
import RecipeCard from "../components/RecipeCard";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes } from "../store/slices/searchSlice";
import SearchByIngredients from "../components/SearchByIngredients";

const RecipeOfTheDay = React.lazy(() => import("../components/RecipeOfTheDay"));
const FeaturedRecipes = React.lazy(() => import("../components/FeaturedRecipes"));

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
      <div className="max-w-6xl mx-auto p-4 mt-5">
        {loading && <p className="text-center w-full">Loading recipes...</p>}
        {error && <p className="text-red-500 text-center w-full">{error}</p>}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <>
              <Suspense fallback={<LoadingIndicator />}>
                <RecipeOfTheDay />
                <FeaturedRecipes />
                <SearchByIngredients />
              </Suspense>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default RecipesHome;
