// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipesHome from "./pages/RecipesHome";
import RecipeDetails from "./pages/RecipeDetails";
import AIRecipePrompt from "./pages/AIRecipePrompt";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary transition-colors duration-300">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<RecipesHome />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/ai-recipe-prompt" element={<AIRecipePrompt />} />
            <Route path="/recipe/generated" element={<RecipeDetails />} />

            {/* <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;