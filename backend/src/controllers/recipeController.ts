import { Request, Response } from "express";
import { getRecipeOfTheDayFromDB } from "../services/recipeService";

export const getRecipeOfTheDay = async (req: Request, res: Response) => {
  try {
    const recipe = await getRecipeOfTheDayFromDB();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe of the day" });
  }
};
