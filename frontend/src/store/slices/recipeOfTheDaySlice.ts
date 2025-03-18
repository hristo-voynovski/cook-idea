import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RecipeOfTheDay } from "../../types/types";

const initialState: RecipeOfTheDay = {
  recipe: null,
  loading: false,
  error: null,
};

export const fetchRecipeOfTheDay = createAsyncThunk(
  "recipeOfTheDay/fetchRecipeOfTheDay",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/recipe-of-the-day`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipe of the day");
      }
      const recipe = await response.json();
      return recipe;
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
