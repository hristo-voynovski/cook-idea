import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipeOfTheDay } from "../store/slices/recipeOfTheDaySlice";
import { Clock } from "lucide-react";

const RecipeOfTheDay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recipe, loading, error } = useAppSelector(
    (state) => state.recipeOfTheDay
  );

  useEffect(() => {
    dispatch(fetchRecipeOfTheDay());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(recipe);

  if (!recipe) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3 dark:text-white">
          Recipe of the Day
        </h2>
        <div className="rounded-lg border border-gray-700 overflow-hidden bg-gray-800 p-6 text-center">
          <p>No recipe available today. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
        <span className="inline-block w-1 h-5 bg-green-500 rounded-full"></span>
        Recipe of the Day
        <span className="ml-auto text-xs font-normal text-green-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </h2>

      <div className="rounded-lg border shadow-sm overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-md">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-[240px] overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "/images/missing-recipe-placeholder.jpg";
              }}
            />
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                {recipe?.title || "Delicious Recipe"}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                {recipe.summary.replace(/<[^>]*>/g, "") ||
                  "A delicious recipe perfect for any occasion."}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-green-500" />
                  <span>{recipe?.readyInMinutes || "30"} mins</span>
                </div>
              </div>
            </div>

            <button className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none">
              View Recipe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeOfTheDay;
