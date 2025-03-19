import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipeOfTheDay } from "../store/slices/recipeOfTheDaySlice";
import { Clock, ChefHat, Star, BookOpen } from "lucide-react";

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

  // If no recipe is available, show a placeholder
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
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
        <span className="inline-block w-1.5 h-6 bg-green-500 rounded-full"></span>
        Recipe of the Day
        <span className="ml-auto text-sm font-normal text-green-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </h2>

      <div className="rounded-xl border shadow-sm overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-md">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-[300px] md:h-auto overflow-hidden">
            <img
              src={recipe?.image || "/placeholder.svg"}
              alt={recipe?.title}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">
                {recipe?.title || "Delicious Recipe"}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {recipe?.summary?.replace(/<[^>]*>/g, "") ||
                  "A delicious recipe perfect for any occasion. Try this easy-to-make dish today!"}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  <span>{recipe?.readyInMinutes || "30"} mins</span>
                </div>

                {/* <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-500" />
                  <span>{recipe?.servings || "4"} servings</span>
                </div> */}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none">
                View Recipe
              </button>
              <button className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:outline-none">
                <div className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    // V0 template check later
    // <section className="mb-12">
    //   <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3">Recipe of the Day</h2>
    //   <Card className="bg-gray-800 border-gray-700 overflow-hidden">
    //     <div className="grid md:grid-cols-2 gap-6">
    //       <div className="relative h-[300px] md:h-full">
    //         <Image
    //           src={recipeOfTheDay.image || "/placeholder.svg"}
    //           alt={recipeOfTheDay.title}
    //           fill
    //           className="object-cover"
    //         />
    //       </div>
    //       <div className="p-6 flex flex-col justify-between">
    //         <div>
    //           <div className="flex flex-wrap gap-2 mb-3">
    //             {recipeOfTheDay.tags.map((tag) => (
    //               <Badge key={tag} variant="outline" className="bg-gray-700 text-green-400 border-green-500">
    //                 {tag}
    //               </Badge>
    //             ))}
    //           </div>
    //           <h3 className="text-2xl font-bold mb-2">{recipeOfTheDay.title}</h3>
    //           <p className="text-gray-300 mb-4">{recipeOfTheDay.description}</p>

    //           <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
    //             <div className="flex items-center">
    //               <Clock className="w-4 h-4 mr-1 text-green-500" />
    //               {recipeOfTheDay.prepTime}
    //             </div>
    //             <div className="flex items-center">
    //               <ChefHat className="w-4 h-4 mr-1 text-green-500" />
    //               {recipeOfTheDay.difficulty}
    //             </div>
    //             <div className="flex items-center">
    //               <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
    //               {recipeOfTheDay.rating}
    //             </div>
    //           </div>
    //         </div>

    //         <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">View Recipe</Button>
    //       </div>
    //     </div>
    //   </Card>
    // </section>
    // <div>
    //   <h2>Recipe of the Day</h2>
    //   <h3>{recipe?.title}</h3>

    // </div>
  );
};

export default RecipeOfTheDay;
