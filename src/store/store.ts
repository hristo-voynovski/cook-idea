import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import recipeDetailsReducer from "./slices/recipeDetailsSlice";

export const store = configureStore({
    reducer: {
        search : searchReducer,
        recipeDetails : recipeDetailsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;