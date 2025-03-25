import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedIngredientsState } from '../../types/types';

const loadState = (): SelectedIngredientsState => {
  try {
    const serializedState = localStorage.getItem('selectedIngredients');
    if (serializedState === null) {
      return { ingredients: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return { ingredients: [] };
  }
};

const initialState: SelectedIngredientsState = loadState();

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    toggleIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = action.payload;
      state.ingredients = state.ingredients.includes(ingredient)
        ? state.ingredients.filter(item => item !== ingredient)
        : [...state.ingredients, ingredient];
      
      try {
        localStorage.setItem('selectedIngredients', JSON.stringify(state));
      } catch (err) {
        console.error('Error saving state to localStorage:', err);
      }
    },
    clearIngredients: (state) => {
      state.ingredients = [];
      try {
        localStorage.removeItem('selectedIngredients');
      } catch (err) {
        console.error('Error clearing localStorage:', err);
      }
    }
  }
});

export const { toggleIngredient, clearIngredients } = selectedIngredientsSlice.actions;
export default selectedIngredientsSlice.reducer; 