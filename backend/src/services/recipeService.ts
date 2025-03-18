import axios from "axios";
import { supabase } from "./supabaseClient";

const API_URL = "https://api.spoonacular.com/recipes/random";
const API_KEY = process.env.SPOONACULAR_API_KEY;

export const fetchRandomRecipe = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        number: 1,
        apiKey: API_KEY,
      },
    });

    if (!response.data.recipes || response.data.recipes.length === 0) {
      throw new Error("No recipe found");
    }

    const recipe = response.data.recipes[0];

    return {
      id: recipe.id,
      title: recipe.title,
      image_url: recipe.image,
      ready_in_minutes: recipe.readyInMinutes,
      ingredients: recipe.extendedIngredients,
    };
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
};

export const updateRecipeOfTheDay = async () => {
  const recipe = await fetchRandomRecipe();
  if (!recipe) return null;

  await supabase.from("recipe_of_the_day").delete().neq("id", 0);

  const { data, error } = await supabase
    .from("recipe_of_the_day")
    .insert([recipe]);

  if (error) {
    console.error("Error inserting recipe of the day:", error);
    return null;
  }

  return data;
};

export const getRecipeOfTheDayFromDB = async () => {
    const { data, error } = await supabase.from('recipe_of_the_day').select('*').single();

    if (error) {
        console.error('Error fetching recipe of the day:', error);
        return null;
    }

    return data;
}
