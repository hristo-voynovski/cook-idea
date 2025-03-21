import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe, SearchState } from '../../types/types';
// import results from '../../mockData.json'; 
import axios from 'axios';

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null
};

export const fetchRecipes = createAsyncThunk(
  'search/fetchRecipes',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            query,
            number: 5,
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
          },
        }
      );
   
      
      return response.data.results as Recipe[];
    } catch (error) {
      return rejectWithValue('Failed to fetch recipes');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.query = '';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Search failed';
      });
  }
});

export const { setSearchQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;