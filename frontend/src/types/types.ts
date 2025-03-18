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
    recipe: Recipe | null;
    analyzedInstructions: AnalyzedInstruction[];
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

export interface AnalyzedInstruction {
    name: string;
    steps: {
        number: number;
        step: string;
    }[];
}

export interface RecipeOfTheDay {
    recipe: Recipe | null;
    loading: boolean;
    error: string | null;
}


