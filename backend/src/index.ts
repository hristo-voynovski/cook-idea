import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cron from "node-cron";
import { updateRecipeOfTheDay, updateFeaturedRecipes } from "./services/recipeService";
import recipeRoutes from "./routes/recipeRoutes";
// import authRoutes from "./routes/auth";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to attach Supabase client to request
app.use((req: any, res, next) => {
  req.supabase = supabase;
  next();
});

app.use("/api/recipes", recipeRoutes);
// app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Request received");
});

cron.schedule('0 0 * * *', async () => {
  await updateRecipeOfTheDay();
});

cron.schedule('0 0 * * 1', async () => {
  await updateFeaturedRecipes();
});


