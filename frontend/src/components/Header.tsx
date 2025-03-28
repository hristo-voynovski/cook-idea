import { useNavigate } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import RandomRecipe from "./RandomRecipe";
import AIRecipeButton from "./AIRecipeButton";
import ThemeToggle from "./LoadingIndicator/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { clearResults } from "../store/slices/searchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-4 py-4">
            <ThemeToggle />
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
