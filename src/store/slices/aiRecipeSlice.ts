import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Groq } from 'groq-sdk';
import { Recipe, AnalyzedInstruction } from '../../types/types';

interface AIRecipeState {
  dishName: string | null;
  description: string | null;
  recipe: Recipe | null;
  analyzedInstructions: AnalyzedInstruction[];
  loading: boolean;
  error: string | null;
  step: 'summary' | 'full' | null;
}

const initialState: AIRecipeState = {
  dishName: null,
  description: null,
  recipe: null,
  analyzedInstructions: [],
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

      const response = completion.choices[0]?.message?.content || 'No response';
      const [name, ...description] = response.split('\n');
      return { dishName: name, description: description.join(' ') };

    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to generate recipe');
    }
  }
);

export const generateFullRecipe = createAsyncThunk(
  'aiRecipe/generateFullRecipe',
  async ({ dishName, description }: { dishName: string; description: string }, { rejectWithValue }) => {
    try {
      const groq = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a cooking assistant. In the previous prompt, the user requested a suggestion for a dish name and a brief description based on their situation. You recommended ${dishName} with the following description: ${description}. The user accepted the suggestion. 

            Now, based on that suggestion, generate a **detailed recipe** in JSON format following this template:
            
            {
              "recipe": {
                "title": "Dish Name",
                "extendedIngredients": [
                  {
                    "id": 1,
                    "original": "Ingredient 1"
                  },
                  {
                    "id": 2,
                    "original": "Ingredient 2"
                  }
                ],
                "summary": "<strong>Dish Name</strong> short summary in HTML format."
              },
              "analyzedInstructions": [
                {
                  "name": "",
                  "steps": [
                    {
                      "number": 1,
                      "step": "Step 1 description"
                    },
                    {
                      "number": 2,
                      "step": "Step 2 description"
                    }
                  ]
                }
              ]
            }
            
            Return ONLY the JSON object, no markdown formatting or explanations.`,
          },
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 2048,
      });

      const response = completion.choices[0]?.message?.content || 'No response';
      const cleanResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      console.log('Clean response:', cleanResponse);
      const parsedResponse = JSON.parse(cleanResponse);
      return parsedResponse;

    } catch (error: any) {
      console.error('Error generating recipe:', error);
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
      })
      .addCase(generateFullRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.step = 'full';
      })
      .addCase(generateFullRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload.recipe;
        state.analyzedInstructions = action.payload.analyzedInstructions;
        state.step = 'full';
      })
      .addCase(generateFullRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearRecipe } = aiRecipeSlice.actions;
export default aiRecipeSlice.reducer;
