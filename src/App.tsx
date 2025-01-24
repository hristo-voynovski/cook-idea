import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import RecipesHome from "./components/RecipesHome";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipesHome />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
