import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FeaturedRecipes, Recipe, SupabaseRecipe } from "../../types/types";

const initialState: FeaturedRecipes = {
    recipes: [],
    loading: false,
    error: null,
};

const transformRecipe = (DBFeaturedRecipes: SupabaseRecipe[]): Recipe[] => {
    return DBFeaturedRecipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        readyInMinutes: recipe.ready_in_minutes,
        summary: "",
        extendedIngredients: recipe.ingredients || [],
    }));
}

export const fetchFeaturedRecipes = createAsyncThunk(
    "featuredRecipes/fetchFeaturedRecipes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/api/recipes/featured-recipes");
            if (!response.ok) {
                throw new Error("Failed to fetch featured recipes");
            }
            const data: SupabaseRecipe[]  = await response.json();
            return transformRecipe(data);
        } catch (error) {
            return rejectWithValue("Failed to fetch featured recipes");
        }
    }
);

const featuredRecipesSlice = createSlice({
    name: "featuredRecipes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFeaturedRecipes.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFeaturedRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.recipes = action.payload;
        });
        builder.addCase(fetchFeaturedRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default featuredRecipesSlice.reducer;
