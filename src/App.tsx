// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipesHome from "./pages/RecipesHome";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<RecipesHome />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;