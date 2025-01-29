export interface Recipe {
    id: number;
    title: string;
    image: string;
}

export interface SearchState {
    query: string;
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}