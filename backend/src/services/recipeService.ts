import axios from 'axios';

const API_URL = "https://api.spoonacular.com/recipes/random";
const API_KEY = process.env.SPOONACULAR_API_KEY;
console.log(API_KEY);

export const getRandomRecipe = async () => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                number: 1,
                apiKey: API_KEY,
            },
        });

        if (!response.data.recipes || response.data.recipes.length === 0) {
            throw new Error('No recipe found');
        }
        
        const recipe = response.data.recipes[0];

        console.log(recipe);
    }
    catch (error) {
        console.error('Error fetching random recipe:', error);
        throw error;
    }
}
