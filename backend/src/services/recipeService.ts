import axios from "axios";
import { supabase } from "./supabaseClient";

const API_URL = "https://api.spoonacular.com/recipes/random";
const API_KEY = process.env.SPOONACULAR_API_KEY;

export const fetchRandomRecipe = async (count: number) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                number: count,
                apiKey: API_KEY,
            },
        });

        if (!response.data.recipes || response.data.recipes.length === 0) {
            throw new Error("No recipes found");
        }

        const recipes = response.data.recipes;

        return recipes.map((recipe: any) => ({
            id: recipe.id,
            title: recipe.title,
            image_url: recipe.image,
            ready_in_minutes: recipe.readyInMinutes,
            ingredients: recipe.extendedIngredients,
        }));
    } catch (error) {
        console.error("Error fetching random recipe:", error);
        return null;
    }
};

export const updateRecipeOfTheDay = async () => {
    const recipe = await fetchRandomRecipe(1);
    if (!recipe) return null;

    await supabase.from("recipe_of_the_day").delete().neq("id", 0);

    const { data, error } = await supabase
        .from("recipe_of_the_day")
        .insert([recipe]);

    if (error) {
        if (error.code === 'PGRST204') {
            //if the table is empty, insert the recipe
            await supabase.from('recipe_of_the_day').insert(recipe);
            return data;
        }
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

export const updateFeaturedRecipes = async () => {
    const recipes = await fetchRandomRecipe(5);

    if (!recipes) return null;

    await supabase.from('featured_recipes').delete().neq('id', 0);

    const { data, error } = await supabase.from('featured_recipes').insert(recipes);

    if (error) {
        console.error('Error inserting featured recipes:', error);
        return null;
    }

    return data;
}

export const getFeaturedRecipesFromDB = async () => {
    const { data, error } = await supabase.from('featured_recipes').select('*');

    if (error) {
        console.error('Error fetching featured recipes:', error);
        return null;
    }

    return data;
}
