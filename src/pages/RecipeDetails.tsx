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

  if (error)
    return <p className="text-center text-red-500 mt-5">{error}</p>;

  if (!recipe || !analyzedInstructions)
    return <p className="text-center text-red-500 mt-5">Recipe not found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-center mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-lg rounded-lg shadow-lg"
      />
      <div className="bg-white shadow-md rounded-lg p-5 max-w-3xl mt-6">
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-3">Instructions</h2>
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
                <li key={step.number} className="text-gray-600">
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
