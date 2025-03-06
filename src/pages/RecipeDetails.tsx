import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipeDetails } from "../store/slices/recipeDetailsSlice";
import { Recipe, AnalyzedInstruction } from "../types/types";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { recipe, analyzedInstructions, loading, error } = useAppSelector(
    (state) => state.recipeDetails
  );
  const aiRecipe = useAppSelector((state) => state.aiRecipe.recipe);
  const aiInstructions = useAppSelector((state) => state.aiRecipe.analyzedInstructions);

  console.log(aiRecipe);
  console.log(aiRecipe?.title);
  console.log(aiRecipe?.extendedIngredients);
  console.log(aiInstructions);
  console.log(id);

  useEffect(() => {
    if (id && id !== 'ai-generated') {
      dispatch(fetchRecipeDetails(id));
    }
  }, [dispatch, id]);

  if (loading)
    return <p className="text-center text-gray-500 mt-5">Loading...</p>;

  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  const displayRecipe = id === 'ai-generated' ? aiRecipe : recipe;
  const displayInstructions = id === 'ai-generated' ? aiInstructions : analyzedInstructions;
  console.log(displayRecipe);
  console.log(displayInstructions);

  if (!displayRecipe || !displayInstructions)
    return <p className="text-center text-red-500 mt-5">Recipe not found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">{displayRecipe.title}</h1>
      
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8 w-full max-w-7xl">
        {displayRecipe.image ? (
          <>
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={displayRecipe.image}
                  alt={displayRecipe.title}
                  className="w-full rounded-lg shadow-lg dark:shadow-gray-500"
                />
              </div>
            </div>

            {/* Ingredients */}
            {displayRecipe.extendedIngredients?.length > 0 && (
              <div className="lg:w-1/2 mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
                <h2 className="text-2xl font-semibold mb-4 text-right dark:text-white">Ingredients:</h2>
                <div className="grid grid-cols-2 gap-4">
                  {displayRecipe.extendedIngredients.map((ingredient: any) => (
                    <div
                      key={ingredient.id}
                      className="bg-white p-3 rounded-lg shadow-sm flex items-center dark:bg-gray-800"
                    >
                      <span className="text-gray-700 dark:text-white">{ingredient.original}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Ingredients without image */
          displayRecipe.extendedIngredients?.length > 0 && (
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">Ingredients:</h2>
              <div className="grid grid-cols-2 gap-4">
                {displayRecipe.extendedIngredients.map((ingredient: any) => (
                  <div
                    key={ingredient.id}
                    className="bg-white p-3 rounded-lg shadow-sm flex items-center dark:bg-gray-800"
                  >
                    <span className="text-gray-700 dark:text-white">{ingredient.original}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Summary */}
      <div className="bg-white shadow-md rounded-lg p-5 max-w-3xl mt-6 dark:bg-gray-800">
        <p
          className="text-gray-700 dark:text-white"
          dangerouslySetInnerHTML={{ __html: displayRecipe.summary }}
        />
      </div>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mt-6 mb-3 dark:text-white">Instructions</h2>
      {displayInstructions.map((instruction: AnalyzedInstruction, index) => (
        <div key={index} className="w-full max-w-3xl">
          {instruction.steps.map((step: { number: number; step: string }) => (
            <div key={step.number} className="flex gap-4 mb-4">
              <span className="font-bold text-green-600">{step.number}.</span>
              <p className="text-gray-700 dark:text-white">{step.step}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;
