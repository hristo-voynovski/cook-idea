import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipeOfTheDay } from "../store/slices/recipeOfTheDaySlice";

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

  return (
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
    <div>
      <h2>Recipe of the Day</h2>
      <h3>{recipe?.title}</h3>
    </div>
  );
};

export default RecipeOfTheDay;
