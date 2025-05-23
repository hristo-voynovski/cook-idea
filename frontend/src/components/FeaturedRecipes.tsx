import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFeaturedRecipes } from "../store/slices/featuredRecipesSlice";
import { Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedRecipes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { recipes, loading, error } = useAppSelector(
    (state) => state.featuredRecipes
  );

  useEffect(() => {
    dispatch(fetchFeaturedRecipes());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipes && !loading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3 dark:text-white">
          Featured Recipes
        </h2>
        <div className="rounded-lg border border-gray-700 overflow-hidden bg-gray-800 p-6 text-center">
          <p>No featured recipes available today. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3">
        Featured Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-md"
          >
            <div className="relative h-48">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "/images/missing-recipe-placeholder.jpg";
                }}
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold mb-2 line-clamp-2">{recipe.title}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-green-500" />
                  <span>{recipe?.readyInMinutes || "30"} min</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button
                className="inline-flex items-center justify-center text-green-500 hover:text-green-400 p-0 h-auto"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                View Recipe <BookOpen className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
