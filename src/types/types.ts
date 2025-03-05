export interface Recipe {
    id: number;
    title: string;
    image: string;
    summary: string;
    extendedIngredients: ExtendedIngredient[];
}

export interface SearchState {
    query: string;
    results: Recipe[];
    loading: boolean;
    error: string | null;
}

export interface RecipeDetailsState {
    recipe: any;
    analyzedInstructions: any[];
    loading: boolean;
    error: string | null;
}

export interface ExtendedIngredient {
    id: number;
    name: string;
    original: string;
    amount: number;
    unit: string;
    image?: string;
}

