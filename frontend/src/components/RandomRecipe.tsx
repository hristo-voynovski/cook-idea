import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { fetchRandomRecipe } from "../store/slices/randomRecipeSlice";

const RandomRecipe: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const resultFetchRandom = await dispatch(fetchRandomRecipe());
    if (fetchRandomRecipe.fulfilled.match(resultFetchRandom)) {
      const recipeId = resultFetchRandom.payload.id;
      navigate(`/recipe/${recipeId}`);
    }
  };
  return (
    <h2
      className="text-xl font-bold text-green-500 cursor-pointer border-2 border-green-500 rounded-lg px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      onClick={handleClick}
    >
      Random Recipe
    </h2>
  );
};

export default RandomRecipe;
