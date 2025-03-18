import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setSearchQuery, fetchRecipes } from "../store/slices/searchSlice";

const SearchComponent: React.FC = () => {
  //set a type for the searchTerm
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      dispatch(setSearchQuery(trimmedTerm));

      await dispatch(fetchRecipes(trimmedTerm));
      navigate(`/`);

      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
          className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          aria-label="Search recipes"
        />
        <button
          type="submit"
          className="p-2 px-4 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
