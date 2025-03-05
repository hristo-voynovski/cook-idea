import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Groq } from 'groq-sdk';

interface AIRecipeState {
  dishName: string | null;
  description: string | null;
  recipe: string | null;
  loading: boolean;
  error: string | null;
  step: 'summary' | 'full' | null;
}

const initialState: AIRecipeState = {
  dishName: null,
  description: null,
  recipe: null,
  loading: false,
  error: null,
  step: null,
};

export const generateDishSummary = createAsyncThunk(
  'aiRecipe/generateRecipe',
  async (prompt: string, { rejectWithValue }) => {
    try {
      const groq = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a cooking assistant. Given a user prompt, suggest a dish name and on a new line - a brief description for it.',
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

      const response =  completion.choices[0]?.message?.content || 'No response';
      const [name, ...description] = response.split('\n');
      return { dishName: name, description: description.join(' ') };

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
      state.dishName = null;
      state.description = null;
      state.recipe = null;
      state.loading = false;
      state.error = null;
      state.step = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateDishSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.step = 'summary';
      })
      .addCase(generateDishSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.dishName = action.payload.dishName;
        state.description = action.payload.description;
        state.step = 'summary';
      })
      .addCase(generateDishSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRecipe } = aiRecipeSlice.actions;
export default aiRecipeSlice.reducer; 