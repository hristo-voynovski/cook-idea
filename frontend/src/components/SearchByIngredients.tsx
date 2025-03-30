import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  toggleIngredient,
  clearIngredients,
} from "../store/slices/selectedIngredientsSlice";
import { searchByIngredients } from "../store/slices/searchSlice";

const SearchByIngredients: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(
    (state) => state.selectedIngredients.ingredients
  );

  const handleToggleIngredient = (ingredient: string) => {
    dispatch(toggleIngredient(ingredient));
  };

  const handleClearIngredients = () => {
    dispatch(clearIngredients());
  };

  const handleSearchByIngredients = () => {
    dispatch(searchByIngredients(selectedIngredients));
    dispatch(clearIngredients());
  };

  return (
    <section className="mb-12 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Search by Ingredients
      </h2>
      <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-green-500 py-1">
            Select the ingredients you have and find matching recipes:
          </p>
          {selectedIngredients.length > 0 && (
            <button
              className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-white px-4 py-1 rounded-md transition-colors"
              onClick={handleClearIngredients}
            >
              Clear All
            </button>
          )}
        </div>
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
            "Bread",
            "Oats",
            "Cornmeal",
            "Bell Peppers",
            "Lettuce",
            "Cabbage",
            "Cucumber",
            "Zucchini",
            "Cauliflower",
            "Celery",
            "Green Beans",
            "Peas",
            "Chickpeas",
            "Lentils",
            "Black Beans",
            "Black Pepper",
            "Basil",
            "Oregano",
            "Cumin",
            "Cinnamon",
            "Paprika",
            "Thyme",
            "Rosemary",
            "Ginger",
            "Parsley",
            "Nutmeg",
            "Chili Powder",
            "Soy Sauce",
            "Vinegar",
            "Ketchup",
            "Mayonnaise",
            "Mustard",
            "Honey",
            "Lemon",
            "Banana",
            "Almonds",
          ].map((ingredient) => (
            <button
              key={ingredient}
              className={`px-2 py-1.5 rounded-md 
                          ${
                            selectedIngredients.includes(ingredient)
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-200 dark:bg-transparent text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700"
                          }
                          transition-colors
                        `}
              onClick={() => handleToggleIngredient(ingredient)}
            >
              {ingredient}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSearchByIngredients}
            className="bg-green-500 hover:bg-green-600 px-8 py-2 rounded-md text-white transition-colors"
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
