import { Link } from "react-router-dom";
import { Recipe } from "../types/types";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block h-full">
      <div className="group bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
        <div className="relative h-48">
          <img
            src={recipe.image || "/images/missing-recipe-placeholder.jpg"}
            alt={recipe.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "/images/missing-recipe-placeholder.jpg";
            }}
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="font-bold mb-2 line-clamp-2">{recipe.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
