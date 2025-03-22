import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Recipe } from "../types/types";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl  bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md h-full flex flex-col">
      <Link to={`/recipe/${recipe.id}`} className="flex flex-col h-full">
        <div className="aspect-video w-full overflow-hidden flex-shrink-0">
          <img
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="line-clamp-2 text-lg font-medium">{recipe.title}</h3>

          {recipe.readyInMinutes && (
            <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
