import express from 'express'; 
import { getRecipeOfTheDay } from '../controllers/recipeController';

const router = express.Router();

router.get('/recipe-of-the-day', getRecipeOfTheDay);

export default router;



