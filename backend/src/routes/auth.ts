import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, email, password: hashedPassword }]);

  if (error) {
    res.status(500).json({ error: "Failed to register user" });
    return;
  }

  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (!data || error) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, data.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  
  const token = jwt.sign({ id: data.id }, JWT_SECRET!, { expiresIn: "24h"});
  res.json({ token });
});

export default router;
