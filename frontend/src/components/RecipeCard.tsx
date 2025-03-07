import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-2 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-lg transition-colors duration-200">
      <Link to={`/recipe/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-36 object-cover rounded-lg"
        />
        <h3 className="text-lg mt-2 text-center text-gray-900 dark:text-white">{recipe.title}</h3>
      </Link>
    </div>
  );
};

export default RecipeCard;
