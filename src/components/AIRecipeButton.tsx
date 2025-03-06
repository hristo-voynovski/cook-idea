import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { clearRecipe } from "../store/slices/aiRecipeSlice";

const AIRecipeButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    dispatch(clearRecipe());
    navigate(`/ai-recipe-prompt`);
  };

  return (
    <h2
      className="text-xl font-bold text-green-500 cursor-pointer"
      onClick={handleClick}
    >
      Cook with AI
    </h2>
  );
};

export default AIRecipeButton;
