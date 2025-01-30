// components/Header.tsx
import React from 'react';
import SearchComponent from './SearchComponent';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600">Recipe App</h1>
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