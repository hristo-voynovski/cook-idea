import { useState } from "react";

const SearchByIngredients: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((selected) => selected !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Search by Ingredients
      </h2>
      <div className="bg-slate-800 rounded-lg p-6">
        <p className="text-slate-400 mb-4">
          Select ingredients you have and find matching recipes
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "Chicken",
            "Beef",
            "Pork",
            "Fish",
            "Rice",
            "Pasta",
            "Tomatoes",
            "Onions",
            "Garlic",
            "Cheese",
            "Eggs",
            "Potatoes",
            "Carrots",
            "Broccoli",
            "Spinach",
            "Mushrooms",
            "Olive Oil",
            "Butter",
            "Milk",
            "Flour",
            "Sugar",
            "Salt",
          ].map((ingredient) => (
            <button
              key={ingredient}
              className={`px-2 py-1.5 rounded-md 
                          ${
                            selectedIngredients.includes(ingredient)
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-transparent text-slate-300 hover:text-white hover:bg-slate-700"
                          }
                          transition-colors
                        `}
              onClick={() => toggleIngredient(ingredient)}
            >
              {ingredient}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            // onClick={searchByIngredients}
            className="bg-green-500 hover:bg-green-600 px-8 py-2 rounded-md"
            disabled={selectedIngredients.length === 0}
          >
            Find Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchByIngredients;
