// components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import RandomRecipe from "./RandomRecipe";
import AIRecipeButton from "./AIRecipeButton";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="grid grid-cols-3 justify-between items-center px-4 py-3">
        <div
          className="flex grow-2 flex-start cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold text-green-600">Cook</span>
          <span className="text-2xl font-bold text-black">Idea</span>
        </div>
        <div className="flex-grow self-center max-w-3xl">
          <SearchComponent />
        </div>
        <div className="flex justify-end gap-4 grow-2">
          <AIRecipeButton />
          <RandomRecipe />
        </div>
      </div>
    </header>
  );
};

export default Header;
