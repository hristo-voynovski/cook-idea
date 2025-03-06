import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req,res) => {
    res.send("Request received");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));





