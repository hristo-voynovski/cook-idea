import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RecipeDetailsState } from '../../types/types';

const initialState: RecipeDetailsState = {
    recipe: null,
    analyzedInstructions: [],
    loading: false,
    error: null,
};

export const fetchRandomRecipe = createAsyncThunk(
    'randomRecipe/fetchRandomRecipe',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch random recipe');
            }
            const data = await response.json();
            console.log(data);
            return data.recipes[0];
        } catch (error) {
            return rejectWithValue('Failed to fetch random recipe');
        }
    }
);

const randomRecipeSlice = createSlice({
    name: 'randomRecipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomRecipe.fulfilled, (state, action) => {
                state.loading = false;
                state.recipe = action.payload.recipe;
                state.analyzedInstructions = action.payload.analyzedInstructions;
            })
            .addCase(fetchRandomRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export default randomRecipeSlice.reducer;