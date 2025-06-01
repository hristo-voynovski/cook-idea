import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RecipeOfTheDay, SupabaseRecipe, Recipe } from "../../types/types";

const initialState: RecipeOfTheDay = {
  recipe: null,
  loading: false,
  error: null,
};

const transformRecipe = (supabaseRecipe: SupabaseRecipe): Recipe => {
  return {
    id: supabaseRecipe.id,
    title: supabaseRecipe.title,
    image: supabaseRecipe.image_url,
    readyInMinutes: supabaseRecipe.ready_in_minutes,
    summary: "", 
    extendedIngredients: supabaseRecipe.ingredients || []
  };
};

export const fetchRecipeOfTheDay = createAsyncThunk(
  "recipeOfTheDay/fetchRecipeOfTheDay",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/recipe-of-the-day`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipe of the day");
      }
      const supabaseRecipe = await response.json();
      // Transform the data to match our Recipe interface
      return transformRecipe(supabaseRecipe);
    } catch (error) {
      return rejectWithValue("Failed to fetch recipe of the day");
    }
  }
);

const recipeOfTheDaySlice = createSlice({
    name: "recipeOfTheDay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRecipeOfTheDay.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRecipeOfTheDay.fulfilled, (state, action) => {
            state.loading = false;
            state.recipe = action.payload;
        });
        builder.addCase(fetchRecipeOfTheDay.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default recipeOfTheDaySlice.reducer;
