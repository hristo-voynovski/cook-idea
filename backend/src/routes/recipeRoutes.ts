import express from 'express'; 
import { getRecipeOfTheDay, getFeaturedRecipes } from '../controllers/recipeController';

const router = express.Router();

router.get('/recipe-of-the-day', getRecipeOfTheDay);
router.get('/featured-recipes', getFeaturedRecipes);

export default router;



