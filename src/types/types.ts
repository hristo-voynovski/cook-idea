export interface Recipe {
    id: number;
    title: string;
    image: string;
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