import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RecipeDetailsState } from "../../types/types";

const initialState: RecipeDetailsState = {
  recipe: null,
  analyzedInstructions: [],
  loading: false,
  error: null,
};

export const fetchRecipeDetails = createAsyncThunk(
  "recipeDetails/fetchRecipeDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const [recipeResponse, InstructionsResponse] = await Promise.all([
        fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        ),
        fetch(
          `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        ),
      ]);

      if (!recipeResponse.ok || !InstructionsResponse.ok) {
        throw new Error("Failed to fetch recipe details");
      }

      const recipe = await recipeResponse.json();
      const analyzedInstructions = await InstructionsResponse.json();
      console.log(recipe);
      console.log(analyzedInstructions);
      return { recipe, analyzedInstructions };
    } catch (error: string | any) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeDetailsSlice = createSlice({
  name: "recipeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipeDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipeDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe = action.payload.recipe;
      state.analyzedInstructions = action.payload.analyzedInstructions;
    });
    builder.addCase(fetchRecipeDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default recipeDetailsSlice.reducer;
