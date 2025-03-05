import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Groq } from 'groq-sdk';

interface AIRecipeState {
  recipe: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AIRecipeState = {
  recipe: null,
  loading: false,
  error: null,
};

export const generateRecipe = createAsyncThunk(
  'aiRecipe/generateRecipe',
  async (prompt: string, { rejectWithValue }) => {
    try {
      console.log(process.env.REACT_APP_GROQ_API_KEY);
      console.log(process.env.REACT_APP_SPOONACULAR_API_KEY);
      const groq = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cooking assistant that generates detailed recipes based on user prompts. Include ingredients, instructions, and cooking tips.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 2048,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to generate recipe');
    }
  }
);

const aiRecipeSlice = createSlice({
  name: 'aiRecipe',
  initialState,
  reducers: {
    clearRecipe: (state) => {
      state.recipe = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(generateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRecipe } = aiRecipeSlice.actions;
export default aiRecipeSlice.reducer; 