import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipeDetails } from "../store/slices/recipeDetailsSlice";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { recipe, analyzedInstructions, loading, error } = useAppSelector(
    (state) => state.recipeDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [dispatch, id]);

  //Create and add a nutrition element for recipe
  if (loading)
    return <p className="text-center text-gray-500 mt-5">Loading...</p>;

  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  if (!recipe || !analyzedInstructions)
    return <p className="text-center text-red-500 mt-5">Recipe not found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8 w-full max-w-7xl">
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-center lg:text-left mb-4 dark:text-white">{recipe.title}</h1>
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full rounded-lg shadow-lg dark:shadow-gray-500"
            />
          </div>
        </div>

        {/* Ingredients */}
        {recipe.extendedIngredients?.length > 0 && (
          <div className="lg:w-1/2 mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-right dark:text-white">Ingredients:</h2>
            <div className="grid grid-cols-2 gap-4">
              {recipe.extendedIngredients.map((ingredient: any) => (
                <div
                  key={ingredient.id}
                  className="bg-white p-3 rounded-lg shadow-sm flex items-center dark:bg-gray-800 "
                >
                  <span className="text-gray-700 dark:text-white">{ingredient.original}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Summary */}
      <div className="bg-white shadow-md rounded-lg p-5 max-w-3xl mt-6 dark:bg-gray-800">
        <p
          className="text-gray-700 dark:text-white"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
      </div>
      {/* Instructions */}
      <h2 className="text-2xl font-semibold mt-6 mb-3 dark:text-white">Instructions</h2>
      <div className="max-w-3xl w-full">
        {analyzedInstructions.map((instruction: any, index: number) => (
          <div key={index} className="mb-5">
            {instruction.name && (
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {instruction.name}
              </h3>
            )}
            <ul className="space-y-2 list-disc list-inside">
              {instruction.steps.map((step: any) => (
                <li key={step.number} className="text-gray-600 dark:text-white">
                  {step.step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
