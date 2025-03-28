import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useState } from "react";
import { fetchRecipes } from "../store/slices/searchSlice";

const MobileSearchBar = () => {
  const { isMobile, isSearchOpen } = useAppSelector((state) => state.ui);
  const [searchTerm, setSearchTerm] = useState(""); 
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      window.history.pushState({}, "", `?q=${encodeURIComponent(searchTerm)}`);
      dispatch(fetchRecipes(searchTerm));
    }
  };

  if (isMobile && isSearchOpen)
    return (
      <div className="p-3 animate-in slide-in-from-top duration-600">
        <div className="relative">
        <form onSubmit={handleSubmit} className="w-full">
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
        </div>
      </div>
    );
  return null;
};

export default MobileSearchBar;
