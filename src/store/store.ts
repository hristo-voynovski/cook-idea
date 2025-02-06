import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import recipeDetailsReducer from "./slices/recipeDetailsSlice";
import randomRecipeReducer from "./slices/randomRecipeSlice";

export const store = configureStore({
    reducer: {
        search : searchReducer,
        recipeDetails : recipeDetailsReducer,
        randomRecipe : randomRecipeReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;