// components/Header.tsx
import React from "react";
import SearchComponent from "./SearchComponent";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* <nav className="container px-4 py-3 w-[100vw]"> */}
        <div className="grid grid-cols-3 justify-between items-center px-4 py-3">
          <h1
            className="text-2xl font-bold text-green-600 flex grow-2 flex-start cursor-pointer"
            onClick={() => navigate("/")}
          >
            CookIdea
          </h1>
          <div className="flex-grow self-center max-w-3xl">
            <SearchComponent />
          </div>
          {/* Add other navigation items here */}
          <div className="flex justify-end gap-4 grow-2">
            <h2 className="text-xl font-bold text-green-500 cursor-pointer"
            onClick={() => navigate("/")}>Random Recipe</h2>
          </div>
        </div>
      {/* </nav> */}
    </header>
  );
};

export default Header;
