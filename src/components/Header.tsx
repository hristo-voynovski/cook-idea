// components/Header.tsx
import React from "react";
import SearchComponent from "./SearchComponent";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-green-600"
            onClick={() => navigate("/")}
          >
            CookIdea
          </h1>
          <div className="flex-1 max-w-xl ml-4">
            <SearchComponent />
          </div>
          {/* Add other navigation items here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
