import { useNavigate } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import RandomRecipe from "./RandomRecipe";
import AIRecipeButton from "./AIRecipeButton";
import ThemeToggle from "./LoadingIndicator/ThemeToggle";
import { clearResults } from "../store/slices/searchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    dispatch(clearResults());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="grid grid-cols-3 justify-between items-center px-4 py-3">
        <div
          className="flex grow-2 flex-start cursor-pointer"
          onClick={handleClick}
        >
          <img
            src="images/cook_idea_icon.png"
            alt="CookIdea"
            className="w-8 h-8 mr-2"
          />
          <div className="hidden sm:block">
            <span className="text-2xl font-bold text-green-600">Cook</span>
            <span className="text-2xl font-bold text-black dark:text-white">
              Idea
            </span>
          </div>
        </div>
        <div className="flex-grow self-center max-w-3xl">
          <SearchComponent />
        </div>
        {/* Desktop menu */}
        <div className="hidden min-[1305px]:flex justify-end gap-4 grow-2 items-center">
          <ThemeToggle />
          <AIRecipeButton />
          <RandomRecipe />
        </div>
        {/* Mobile menu button */}
        <div className="min-[1305px]:hidden flex justify-end">
          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="px-4">
              <AIRecipeButton />
            </div>
            <div className="px-4">
              <RandomRecipe />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
