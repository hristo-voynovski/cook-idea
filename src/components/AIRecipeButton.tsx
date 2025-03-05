import { useNavigate } from "react-router-dom";

const AIRecipeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
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
