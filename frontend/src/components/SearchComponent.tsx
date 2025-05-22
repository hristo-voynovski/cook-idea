import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes } from "../store/slices/searchSlice";
import { setIsMobile, setIsSearchOpen } from "../store/slices/uiSlice";
import { Search, X } from "lucide-react";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isMobile, isSearchOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkIfMobile = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      window.history.pushState({}, "", `?q=${encodeURIComponent(searchTerm)}`);
      dispatch(fetchRecipes(searchTerm));
    }
  };

  return (
    <div className="w-full">
      {!isMobile && (
        <form onSubmit={handleSubmit} className="w-full max-w-[24rem] mx-auto">
          <div className="relative flex h-10 w-full min-w-[200px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for recipes..."
              className="h-full w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2.5 pr-10 text-sm font-normal text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-2 focus:border-green-500 focus:outline-none focus:ring-0"
              aria-label="Search recipes"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      )}

      <div className="flex items-center justify-center">
        {isMobile && (
          <button
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            onClick={() => dispatch(setIsSearchOpen(!isSearchOpen))}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
